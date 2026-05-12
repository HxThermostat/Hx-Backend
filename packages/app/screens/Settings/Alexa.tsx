import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Platform, Linking } from "react-native";

import Clipboard from "@react-native-community/clipboard";

import { systemWeights } from "react-native-typography";

import { useGenerateLoginTokenMutation } from "~/graph";

import i18n from "~/i18n";

import ActivityIndicator from "~/components/ActivityIndicator";
import Background from "~/components/Background";
import StandardButton from "~/components/Touchables/StandardButton";
import Text from "~/components/Text";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";
import colors from "~/styles/color";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.pythirtytwo,
      android: spacing.mytwenty,
    }),
    ...spacing.pxtwentyfour,
  },
  body: {
    ...fonts.body,
    color: colors.white,
    ...spacing.mbtwentyeight,
  },
  activityIndicator: {
    alignSelf: "center",
    ...spacing.mbtwentyeight,
  },
  code: {
    ...fonts.title,
    ...systemWeights.bold,
    color: colors.white,
    ...spacing.mbtwentyeight,
    textAlign: "center",
    letterSpacing: 8,
  },
  btn: {},
});
const scope = "Screens.Authenticated.SettingsNavigator.Alexa";

const ALEXA_DEEP_LINK = Platform.select({
  android: "https://alexa.amazon.com/?fragment=skills/dp/B07B9JGWT5/",
  ios: "alexa://alexa?fragment=skills/dp/B07B9JGWT5/",
});

const ALEXA_URL =
  "https://skills-store.amazon.com/deeplink/dp/B07B9JGWT5?deviceType=app&share";

export default function Alexa(): JSX.Element {
  const [code, setCode] = useState<string>();
  const [generateLoginToken] = useGenerateLoginTokenMutation({
    onCompleted: ({ generateLoginToken }) => {
      setCode(generateLoginToken.token);
    },
  });

  useEffect(() => {
    generateLoginToken();
  }, [generateLoginToken]);

  const [codeCopied, setCodeCopied] = useState(false);
  function handlePressCopyCode(): void {
    if (code != null) {
      Clipboard.setString(code);
      setCodeCopied(true);
    }
  }

  async function handlePressOpenAlexa(): Promise<void> {
    if (ALEXA_DEEP_LINK && (await Linking.canOpenURL(ALEXA_DEEP_LINK))) {
      Linking.openURL(ALEXA_DEEP_LINK);
    } else {
      Linking.openURL(ALEXA_URL);
    }
  }

  return (
    <Background>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior={"automatic"}
      >
        <Text style={styles.body}>{i18n.t("instructions", { scope })}</Text>
        <Text style={styles.body}>{i18n.t("step1", { scope })}</Text>
        <Text style={styles.body}>{i18n.t("step2", { scope })}</Text>
        {code ? (
          <Text selectable style={styles.code}>
            {code}
          </Text>
        ) : (
          <ActivityIndicator size={"small"} style={styles.activityIndicator} />
        )}
        <Text style={styles.body}>{i18n.t("step3", { scope })}</Text>
        <Text style={styles.body}>{i18n.t("step4", { scope })}</Text>
        <Text style={styles.body}>{i18n.t("step5", { scope })}</Text>
        {codeCopied && (
          <StandardButton style={styles.btn} onPress={handlePressOpenAlexa}>
            <Text style={fonts.baseTouchableText}>
              {i18n.t("openAlexaApp", { scope })}
            </Text>
          </StandardButton>
        )}
        {!codeCopied && code && (
          <StandardButton style={styles.btn} onPress={handlePressCopyCode}>
            <Text style={fonts.baseTouchableText}>
              {i18n.t("copyToken", { scope })}
            </Text>
          </StandardButton>
        )}
      </ScrollView>
    </Background>
  );
}
