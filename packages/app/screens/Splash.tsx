import React from "react";

import { View, StyleSheet } from "react-native";

import colors from "~/styles/color";

import ActivityIndicator from "~/components/ActivityIndicator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.splashBG,
  },
});

export default function Splash(): JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}
