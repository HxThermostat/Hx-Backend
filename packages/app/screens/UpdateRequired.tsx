import React from "react";

import { View, StyleSheet, Text, Platform } from "react-native";

import i18n from "~/i18n";

import Background from "~/components/Background";

import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

const scope = "Screens.Unauthenticated.UpdateRequired";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...spacing.pxthirty,
  },
  title: {
    ...fonts.primaryHeaderSemibold,
    textAlign: "center",
  },
  instructions: {
    ...fonts.body,
    textAlign: "center",
    ...spacing.mttwenty,
  },
});

export default function UpdateRequired(): JSX.Element {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t("updateRequired", { scope })}</Text>
        <Text style={styles.instructions}>
          {i18n.t("downloadUpdate", {
            scope,
            store: Platform.select({ android: "Play Store", ios: "App Store" }),
          })}
        </Text>
      </View>
    </Background>
  );
}
