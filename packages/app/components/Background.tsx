import React, { PropsWithChildren } from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import colors from "~/styles/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

export default function Background({
  containerStyle,
  children,
}: PropsWithChildren<Props>): JSX.Element {
  return (
    <LinearGradient
      style={[styles.container, containerStyle]}
      colors={[colors.linearBGStart, colors.linearBGEnd]}
      // Pushing the start point down a bit makes it much easier to deal with the iOS headers
      locations={[0.2, 1]}
    >
      {children}
    </LinearGradient>
  );
}
