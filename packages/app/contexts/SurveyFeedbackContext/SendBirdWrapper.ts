import { IMessage } from "react-native-gifted-chat";
import SendBird, { SendBirdInstance } from "sendbird";

import { captureException, captureMessage } from "~/utils/sentry";
import { logSurveyBreadcrumb, logSurveyOperation } from "~/utils/survey";

import {
  SENDBIRD_CHAT_MODERATOR_USER_ID,
  SENDBIRD_CHAT_MODERATOR_PUBLIC_CHANNEL_URL,
} from "~/constants";

/*
Notes:
- Assumption: Only 1 chat connection active at a time.
- Only sending UserMessages (not FileMessage, etc.)
*/

// IMessage is what is expected by GiftedChat
export function convertUserMessage(msg: SendBird.UserMessage): IMessage {
  return {
    _id: msg.messageId,
    text: msg.message,
    createdAt: msg.createdAt,
    user: {
      _id: msg.sender.userId,
      name: msg.sender.nickname,
    },
  };
}

type SendBirdApiAttributes = {
  appId: string;
};

export type SendBirdUserAttributes = {
  userId: string;
};

type SendBirdConnectOptions = SendBirdUserAttributes & {
  sessionToken: string;
};

type SendBirdWrapperParams = SendBirdApiAttributes;

type SendBirdMessageHandler = (message: IMessage) => void;

type SendBirdMetaDataChangeHandler = (metaData: SendBirdMetaData) => void;

type SendBirdMetaData = {
  [key: string]: string;
};

export class SendBirdWrapper {
  public sb: SendBirdInstance;
  private onMessageHandler: SendBirdMessageHandler | undefined;
  private onMetaDataChangeHandler: SendBirdMetaDataChangeHandler | undefined;
  private surveyChannel: SendBird.GroupChannel | undefined;
  private user: SendBird.User | undefined;
  private metaData: SendBirdMetaData;

  constructor({ appId }: SendBirdWrapperParams) {
    this.sb = new SendBird({ appId });
    this.onMessageHandler = undefined;
    this.onMetaDataChangeHandler = undefined;
    this.surveyChannel = undefined;
    this.user = undefined;
    this.metaData = {};
  }

  onMessage = (handler: SendBirdMessageHandler): void => {
    this.onMessageHandler = handler;
  };

  onMetaDataChanged = (handler: SendBirdMetaDataChangeHandler): void => {
    this.onMetaDataChangeHandler = handler;
  };

  connect = async ({
    userId,
    sessionToken,
  }: SendBirdConnectOptions): Promise<void> => {
    if (this.user) {
      return;
    }

    let sbUser: SendBird.User | undefined;
    try {
      sbUser = await this.sb.connect(userId, sessionToken);

      await this.joinPublicChannel();
    } catch (ex) {
      // Reset user and channel handlers on error
      this.user = undefined;
      this.sb.removeChannelHandler("messages");
      this.sb.removeChannelHandler("metaData");

      throw ex;
    }

    this.user = sbUser;
  };

  disconnect = async (): Promise<void> => {
    if (!this.user) {
      return;
    }

    try {
      await this.sb.disconnect();
    } catch (ex) {
      const errorToLog =
        ex instanceof Error
          ? ex
          : new Error("Error disconnecting from SendBird");
      // Silently fail but log the error
      captureException(errorToLog);
    } finally {
      this.user = undefined;
      this.sb.removeChannelHandler("messages");
      this.sb.removeChannelHandler("metaData");
    }
  };

  private searchGroupChannels = async (
    name = "Feedback"
  ): Promise<SendBird.GroupChannel | null> => {
    const channelQuery = this.sb.GroupChannel.createMyGroupChannelListQuery();
    channelQuery.includeEmpty = true;
    channelQuery.channelNameContainsFilter = name;
    channelQuery.limit = 1;

    const foundChannels = await channelQuery.next();

    if (foundChannels.length > 0) {
      return foundChannels[0];
    }

    return null;
  };

  private createGroupChannel = async (
    { userId }: SendBirdUserAttributes,
    name = "Feedback"
  ): Promise<SendBird.GroupChannel> => {
    const newChannelParams = new this.sb.GroupChannelParams();
    newChannelParams.addUserIds([userId, SENDBIRD_CHAT_MODERATOR_USER_ID]);
    // This persists the 1:1 channel instead of creating it every time
    newChannelParams.isDistinct = true;
    newChannelParams.isPublic = false;
    newChannelParams.isEphemeral = false;
    newChannelParams.isSuper = false;
    newChannelParams.name = name;

    return this.sb.GroupChannel.createChannel(newChannelParams);
  };

  private getSurveyChannel = async (
    userInfo: SendBirdUserAttributes
  ): Promise<SendBird.GroupChannel> => {
    if (this.surveyChannel) {
      return this.surveyChannel;
    }

    // Check if channel between user and moderator yet
    let surveyChannel = await this.searchGroupChannels();
    if (!surveyChannel) {
      // Otherwise create the new channel
      surveyChannel = await this.createGroupChannel(userInfo);
    }

    this.surveyChannel = surveyChannel;

    return this.surveyChannel;
  };

  getPublicChannel = (): Promise<SendBird.OpenChannel> =>
    this.sb.OpenChannel.getChannel(SENDBIRD_CHAT_MODERATOR_PUBLIC_CHANNEL_URL);

  joinPublicChannel = async (): Promise<SendBird.OpenChannel> => {
    const openChannel = await logSurveyOperation(async () => {
      const channel = await this.getPublicChannel();
      await channel.enter();

      return channel;
    }, "joinPublicChannel");

    // Grab current metadata first
    this.metaData = await logSurveyOperation(
      async () => (await openChannel.getAllMetaData()) as SendBirdMetaData,
      "getMetaData"
    );
    if (this.onMetaDataChangeHandler) {
      this.onMetaDataChangeHandler(this.metaData);
    }

    // Metadata update handling
    const channelHandler = new this.sb.ChannelHandler();
    channelHandler.onMetaDataCreated = (channel, metaData) => {
      if (
        channel.url === SENDBIRD_CHAT_MODERATOR_PUBLIC_CHANNEL_URL &&
        this.onMetaDataChangeHandler
      ) {
        logSurveyBreadcrumb("metaDataCreated");
        this.metaData = metaData as SendBirdMetaData;
        this.onMetaDataChangeHandler(this.metaData);
      }
    };
    channelHandler.onMetaDataUpdated = (channel, metaData) => {
      if (
        channel.url === SENDBIRD_CHAT_MODERATOR_PUBLIC_CHANNEL_URL &&
        this.onMetaDataChangeHandler
      ) {
        logSurveyBreadcrumb("metaDataUpdated");
        this.metaData = metaData as SendBirdMetaData;
        this.onMetaDataChangeHandler(this.metaData);
      }
    };
    channelHandler.onMetaDataDeleted = (channel, deletedKeys) => {
      if (
        channel.url === SENDBIRD_CHAT_MODERATOR_PUBLIC_CHANNEL_URL &&
        this.onMetaDataChangeHandler
      ) {
        logSurveyBreadcrumb("metaDataDeleted");
        deletedKeys.forEach(key => {
          if (Object.prototype.hasOwnProperty.call(this.metaData, key)) {
            delete this.metaData[key];
          }
        });

        this.onMetaDataChangeHandler(this.metaData);
      }
    };

    this.sb.removeChannelHandler("metaData");
    this.sb.addChannelHandler("metaData", channelHandler);

    return openChannel;
  };

  joinSurveyChannel = async (
    user: SendBirdUserAttributes
  ): Promise<SendBird.GroupChannel> => {
    const surveyChannel = await this.getSurveyChannel(user);

    // Message handling
    const channelHandler = new this.sb.ChannelHandler();
    channelHandler.onMessageReceived = (channel, message) => {
      // Only handle UserMessage type
      if (message.messageType !== "user") return;

      // Only handle our group 1:1 channel messages
      if (channel.url !== surveyChannel.url) return;

      logSurveyBreadcrumb("messageReceived");

      this.onMessageHandler?.(convertUserMessage(message));
    };
    this.sb.removeChannelHandler("messages");
    this.sb.addChannelHandler("messages", channelHandler);

    return surveyChannel;
  };

  private getChannelPreviousMessages(
    channel: SendBird.GroupChannel
  ): Promise<SendBird.UserMessage[]> {
    // Wrapping this query because it does not implement promises the way other sendbird api methods do 🤷
    return new Promise<SendBird.UserMessage[]>((resolve, reject) => {
      const prevMessagesQuery = channel.createPreviousMessageListQuery();
      prevMessagesQuery.limit = 100;
      prevMessagesQuery.reverse = true;
      prevMessagesQuery.includeMetaArray = false;
      prevMessagesQuery.includeReactions = false;
      prevMessagesQuery.load((messages, err) => {
        if (err) {
          return reject(err);
        }

        resolve(
          messages.filter(
            (msg): msg is SendBird.UserMessage => msg.messageType === "user"
          )
        );
      });
    });
  }

  getSurveyChannelMessages = async (): Promise<IMessage[]> => {
    if (!this.surveyChannel) return [];

    const prevMessages = await logSurveyOperation(
      () => this.getChannelPreviousMessages(this.surveyChannel!),
      "prevMessagesQuery"
    );

    return prevMessages.map(msg => convertUserMessage(msg));
  };

  private sendUserMessage(
    channel: SendBird.GroupChannel,
    message: string
  ): Promise<SendBird.UserMessage> {
    // Have to wrap this sendUserMessage call in a promise because it doesn't
    // return a promise like the other methods in this api
    // 🤷 x 2
    return new Promise<SendBird.UserMessage>((resolve, reject) => {
      const userMessage = new this.sb.UserMessageParams();
      userMessage.message = message;

      channel.sendUserMessage(userMessage, (resultMessage, err) => {
        if (err) {
          return reject(err);
        } else if (resultMessage.messageType !== "user") {
          return reject(
            new Error(
              `Unexpected result message type: ${resultMessage.messageType}`
            )
          );
        }

        resolve(resultMessage);
      });
    });
  }

  sendMessage = async (
    user: SendBirdUserAttributes,
    message: string
  ): Promise<IMessage> => {
    const surveyChannel = await logSurveyOperation(
      () => this.joinSurveyChannel(user),
      "joinSurveyChannel"
    );

    const sentMessage = await logSurveyOperation(
      () => this.sendUserMessage(surveyChannel, message),
      "sendChannelMessage"
    );

    return convertUserMessage(sentMessage);
  };

  setChattingUser = async (userId: string): Promise<void> => {
    if (this.metaData["chatting_user"] === userId) {
      return;
    }

    if (this.metaData["chatting_user"] !== "open") {
      captureMessage("Unable to set chatting_user; not open");
      return;
    }

    const openChannel = await this.getPublicChannel();

    this.metaData["chatting_user"] = userId;
    this.metaData = await logSurveyOperation(
      async () =>
        (await openChannel.updateMetaData(this.metaData)) as SendBirdMetaData,
      "updateMetaData"
    );
    if (this.onMetaDataChangeHandler) {
      this.onMetaDataChangeHandler(this.metaData);
    }
  };
}
