import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useSurveyFeedback } from "~/contexts/SurveyFeedbackContext";
import { ChatIcon } from "~/components/Icons/VectorIcon";
import { useSurveyFeedbackChat } from "~/hooks/useSurveyFeedbackChat";

import i18n from "~/i18n";

import { trackSegmentEvent } from "~/utils/segment";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

const scope = "Screens.Authenticated.HomeNavigator.Home";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  promptText: {
    ...spacing.prten,
    ...fonts.scaledSecondaryHeader,
  },
});

type SurveyPromptProps = {
  onPress: () => void;
  userId: string;
};

export function SurveyPrompt({
  onPress,
  userId,
}: SurveyPromptProps): JSX.Element {
  const {
    connected,
    connecting,
    connect,
    isChatAvailable,
  } = useSurveyFeedbackChat({
    userId,
  });
  const {
    showPrompt,
    sessionToken,
    requestSurveySession,
  } = useSurveyFeedback();
  const [trackedPrompting, setTrackedPrompting] = useState(false);
  const animatedOpacityVal = useRef(new Animated.Value(0)).current;
  const animatedOpacity = animatedOpacityVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const show: boolean = connected && isChatAvailable && showPrompt;

  useEffect(() => {
    if (!sessionToken) requestSurveySession();
  }, [sessionToken, requestSurveySession]);

  useEffect(() => {
    if (sessionToken && !connected && !connecting) {
      void connect();
    }
  }, [sessionToken, connected, connect, connecting]);

  useEffect(() => {
    Animated.timing(animatedOpacityVal, {
      toValue: show ? 1 : 0,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [animatedOpacityVal, show]);

  useEffect(() => {
    if (show && !trackedPrompting) {
      trackSegmentEvent("Survey Feedback Prompt Shown", {
        trigger: "SurveyPrompt",
        locale: i18n.currentLocale(),
      });
      setTrackedPrompting(true);
    }
  }, [show, trackedPrompting, setTrackedPrompting]);

  return (
    <Animated.View
      style={{ opacity: animatedOpacity }}
      testID="survey-prompt-container"
    >
      <TouchableOpacity onPress={show ? onPress : undefined}>
        <View style={styles.container}>
          <Text style={styles.promptText}>
            {i18n.t("survey.prompt", { scope })}
          </Text>
          <ChatIcon color={colors.iosSystemBlue} size={30} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
