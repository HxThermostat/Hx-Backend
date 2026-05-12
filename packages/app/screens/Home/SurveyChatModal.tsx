import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  GiftedChat,
  Message as GiftedChatMessage,
  MessageProps,
  Composer,
  ComposerProps,
  InputToolbar,
  InputToolbarProps,
  IMessage,
} from "react-native-gifted-chat";
import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp } from "@react-navigation/native";

import i18n from "~/i18n";

import { useSurveyChatModalQuery, Maybe } from "~/graph";

import { useSurveyFeedbackChat } from "~/hooks/useSurveyFeedbackChat";
import { saveToAsyncStorage } from "~/utils/localStorage";
import Background from "~/components/Background";
import { ModalRouteList } from "~/navigators/ModalNavigator";
import { withQueryData, DataHookProp, GoBack } from "~/screens/withQueryData";

import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";
import color from "~/styles/color";

interface SurveyMessagingProps {
  userId: string;
}

const scope = "Screens.Authenticated.HomeNavigator.Home";

const styles = StyleSheet.create({
  modalContainer: {
    ...spacing.pxten,
    ...spacing.pbtwelve,
    height: "100%",
  },
  modalBodyContainer: {
    flexGrow: 1,
  },
  messagesContainer: {
    ...spacing.pbeight,
  },
  messagesInputToolbar: {
    ...spacing.ptfive,
    ...spacing.mxten,
    alignItems: "center",
    backgroundColor: color.iOSTextInputBG,
    borderRadius: 12,
    borderTopColor: "transparent",
    borderWidth: 0,
    justifyContent: "center",
  },
});

function makeSystemMessage(earliestDate: number): IMessage {
  const exactDate = new Date(earliestDate);
  // Beginning of the day
  const createdAt = new Date(
    exactDate.getFullYear(),
    exactDate.getMonth(),
    exactDate.getDate()
  );
  return {
    _id: 1,
    createdAt,
    system: true,
    text: i18n.t("survey.chat.intro", { scope }),
    user: {
      _id: 1,
      name: "System",
    },
  };
}

class SurveyMessagingNoAvatarMessage extends GiftedChatMessage {
  // This fixes an issue where blank avatars are rendered;
  // https://github.com/FaridSafi/react-native-gifted-chat/issues/2093
  renderAvatar() {
    return null;
  }
}

// Render blank avatar messages
const SurveyMessagingMessage = (props: MessageProps<IMessage>): JSX.Element => (
  <SurveyMessagingNoAvatarMessage {...props} />
);

// Render with gray background and white text
const SurveyMessagingComposer = (props: ComposerProps): JSX.Element => (
  <Composer
    {...props}
    textInputStyle={[props.textInputStyle, fonts.secondaryInputIOS]}
  />
);

// Render with some special padding/margins
const SurveyMessagingInputToolbar = (props: InputToolbarProps) => (
  <InputToolbar
    {...props}
    containerStyle={[props.containerStyle, styles.messagesInputToolbar]}
  />
);

function SurveyMessaging({ userId }: SurveyMessagingProps): JSX.Element {
  const {
    connecting,
    connected,
    connectAndLoadMessages,
    messages,
    sendMessage,
  } = useSurveyFeedbackChat({
    userId,
  });

  // Memoize this to prevent GiftedChat re-renders
  const user = useMemo(
    () => ({
      _id: userId,
    }),
    [userId]
  );

  // Grab a ref to GiftedChat so we can focus the keyboard immediately
  const chatRef = useRef<GiftedChat<IMessage>>(null);

  useEffect(() => {
    if (!connected && !connecting) {
      void connectAndLoadMessages();
      chatRef.current?.focusTextInput();
    }
  }, [connected, connectAndLoadMessages, connecting]);

  const onMessageSend = async (messages: IMessage[]): Promise<void> => {
    for (let i = 0; i < messages.length; i++) {
      await sendMessage(messages[i].text);
    }
    void saveToAsyncStorage(
      "last_survey_response_at",
      new Date().toISOString()
    );
  };

  const earliestMessageTime = useMemo(() => {
    return messages.reduce((earliest, msg) => {
      const msgTime =
        msg.createdAt instanceof Date ? msg.createdAt.getTime() : msg.createdAt;
      if (msgTime < earliest) {
        earliest = msgTime;
      }

      return earliest;
    }, Date.now());
  }, [messages]);

  const displayedMessages = GiftedChat.append(
    [makeSystemMessage(earliestMessageTime)],
    messages
  );

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalBodyContainer}>
        <GiftedChat
          ref={chatRef}
          messages={displayedMessages}
          messagesContainerStyle={styles.messagesContainer}
          onSend={onMessageSend}
          renderComposer={SurveyMessagingComposer}
          renderInputToolbar={SurveyMessagingInputToolbar}
          renderMessage={SurveyMessagingMessage}
          user={user}
        />
      </View>
    </View>
  );
}

export type SurveyChatModalProps = {
  navigation: NativeStackNavigationProp<ModalRouteList, "SurveyChat">;
  router: RouteProp<ModalRouteList, "SurveyChat">;
  data: DataHookProp<typeof useSurveyChatModalQuery>;
};

const SurveyChatModal = (props: SurveyChatModalProps): Maybe<JSX.Element> => {
  const {
    data: { me },
  } = props;

  if (!me) {
    return null;
  }

  return (
    <Background>
      <SurveyMessaging userId={me.id} />
    </Background>
  );
};

export default withQueryData(useSurveyChatModalQuery, {
  options: { fetchPolicy: "cache-and-network" },
})(SurveyChatModal);
