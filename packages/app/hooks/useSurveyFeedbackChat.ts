import { useCallback, useState, useMemo } from "react";
import { IMessage, GiftedChat } from "react-native-gifted-chat";

import { SendBirdUserAttributes, useSurveyFeedback } from "~/contexts";

import { captureException } from "~/utils/sentry";
import { logSurveyBreadcrumb, logSurveyOperation } from "~/utils/survey";

export type UseSurveyFeedbackChatOptions = SendBirdUserAttributes;

export type UseSurveyFeedbackChatResult = {
  connecting: boolean;
  connected: boolean;
  connect: () => Promise<void>;
  connectAndLoadMessages: () => Promise<void>;
  disconnect: () => Promise<void>;
  messages: IMessage[];
  loadMessages: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  isChatAvailable: boolean;
  sessionToken: string | undefined;
};

export type UseSurveyFeedbackChatConnectOptions = {
  sessionToken: string;
};

export const useSurveyFeedbackChat = ({
  userId,
}: UseSurveyFeedbackChatOptions): UseSurveyFeedbackChatResult => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isChatAvailable, setIsChatAvailable] = useState(false);

  const user: SendBirdUserAttributes = useMemo(() => ({ userId }), [userId]);

  const {
    sendbird: sb,
    sessionToken,
    invalidateSessionToken,
  } = useSurveyFeedback();
  sb.onMessage(
    useCallback(
      message => {
        setMessages(GiftedChat.append(messages, [message]));
      },
      [messages, setMessages]
    )
  );
  sb.onMetaDataChanged(
    useCallback(
      ({ chatting_user }) => {
        const chatAvailability =
          chatting_user === "open" || chatting_user === userId;
        logSurveyBreadcrumb(chatAvailability ? "chatAvailable" : "chatClosed");
        setIsChatAvailable(chatAvailability);
      },
      [setIsChatAvailable, userId]
    )
  );

  const connect = useCallback(
    async function connect() {
      if (sessionToken) {
        try {
          await logSurveyOperation(
            () => sb.connect({ ...user, sessionToken }),
            "connect"
          );
        } catch (ex) {
          if (!(ex instanceof Error)) {
            throw new Error(`SendBird connection error; ${String(ex)}`);
          }

          if (ex.message.includes("token is not valid")) {
            captureException(ex);
            // Invalidate the local token so it can be requested again on next load
            // This should not happen regularly, but if a user is deleted/changed on the SendBird
            // dashboard we can end up in this state.
            await invalidateSessionToken();
            return;
          }

          throw ex;
        }

        await logSurveyOperation(
          () => sb.joinSurveyChannel(user),
          "joinSurveyChannel"
        );
      }
    },
    [sessionToken, sb, user]
  );

  const disconnect = useCallback(async () => {
    await sb.disconnect();
  }, [sb]);

  const loadMessages = useCallback(
    async function loadMessages() {
      const channelMessages = await logSurveyOperation(
        () => sb.getSurveyChannelMessages(),
        "loadMessages"
      );

      setMessages(GiftedChat.append(messages, channelMessages));
    },
    [sb, messages, setMessages]
  );

  const connectAndLoadMessages = useCallback(async () => {
    if (!sessionToken) return;

    await connect();
    await loadMessages();
  }, [sessionToken, connect, loadMessages]);

  const sendMessage = useCallback(
    async (message: string) => {
      await logSurveyOperation(
        () => sb.setChattingUser(user.userId),
        "setChattingUser"
      );
      const newMessage = await logSurveyOperation(
        () => sb.sendMessage(user, message),
        "sendMessage"
      );

      setMessages(GiftedChat.append(messages, [newMessage]));
    },
    [sb, user, messages, setMessages]
  );

  // These exposed functions have state setters wrapped around the connecting logic
  const exposedConnect = useCallback(async () => {
    if (!sessionToken) return;

    setConnecting(true);
    await connect();
    setConnected(true);
    setConnecting(false);
  }, [sessionToken, connect, setConnected, setConnecting]);

  const exposedConnectAndLoad = useCallback(async () => {
    if (!sessionToken) return;

    setConnecting(true);
    await connectAndLoadMessages();
    setConnected(true);
    setConnecting(false);
  }, [sessionToken, connectAndLoadMessages, setConnecting, setConnected]);

  const exposedDisconnect = useCallback(async () => {
    await disconnect();
    setConnecting(false);
    setConnected(false);
  }, [disconnect, setConnecting, setConnected]);

  return {
    connecting,
    connected,
    connect: exposedConnect,
    connectAndLoadMessages: exposedConnectAndLoad,
    disconnect: exposedDisconnect,
    messages,
    loadMessages,
    sendMessage,
    sessionToken,
    isChatAvailable,
  };
};
