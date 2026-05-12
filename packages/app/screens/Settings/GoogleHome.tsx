import React, { useCallback, useState, useEffect } from "react";
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
  btn: {
    ...spacing.mbtwentyeight,
  },
});
const scope = "Screens.Authenticated.SettingsNavigator.GoogleHome";

const DEEP_LINK =
  "https://madeby.google.com/home-app/?deeplink=setup%2Fha_linking%3Fagent_id%3Dhx-thermostat-289021";

function Code({ code }: { code?: string }): JSX.Element {
  return code ? (
    <Text selectable style={styles.code}>
      {code}
    </Text>
  ) : (
    <ActivityIndicator size={"small"} style={styles.activityIndicator} />
  );
}

export default function GoogleHome(): JSX.Element {
  const [code, setCode] = useState<string>();
  const [generateLoginToken] = useGenerateLoginTokenMutation({
    onCompleted: ({ generateLoginToken }) => {
      setCode("#" + generateLoginToken.token);
    },
  });

  useEffect(() => {
    generateLoginToken();
  }, [generateLoginToken]);

  const [step, setStep] = useState<0 | 1 | 2>(0);

  const handlePressCopyCode = useCallback(() => {
    if (code != null) {
      Clipboard.setString(code);
      setStep(step => (step > 1 ? step : 1));
    }
  }, [code]);

  const handlePressOpenGoogleHome = useCallback(async () => {
    await Linking.openURL(DEEP_LINK);
    setTimeout(() => setStep(step => (step > 2 ? step : 2)), 1000);
  }, []);

  return (
    <Background>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior={"automatic"}
      >
        <Text style={styles.body}>{i18n.t("instructions", { scope })}</Text>
        <Text style={styles.body}>{i18n.t("step1", { scope })}</Text>
        <Code code={code} />
        {step >= 0 && (
          <StandardButton style={styles.btn} onPress={handlePressCopyCode}>
            <Text style={fonts.baseTouchableText}>
              {i18n.t("copyToken", { scope })}
            </Text>
          </StandardButton>
        )}
        {step >= 1 && (
          <>
            <Text style={styles.body}>{i18n.t("step2", { scope })}</Text>
            <StandardButton
              style={styles.btn}
              onPress={handlePressOpenGoogleHome}
            >
              <Text style={fonts.baseTouchableText}>
                {i18n.t("openGoogleHomeApp", { scope })}
              </Text>
            </StandardButton>
          </>
        )}
        {step === 2 && (
          <>
            <Text style={styles.body}>{i18n.t("step3", { scope })}</Text>
            <Text style={styles.body}>{i18n.t("step4", { scope })}</Text>
          </>
        )}
      </ScrollView>
    </Background>
  );
}
