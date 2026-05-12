import React from "react";
import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";

import DismissModalButton from "~/components/Touchables/DismissModalButton";

import colors from "~/styles/color";
import spacing, { size } from "~/styles/spacing";
import fonts from "~/styles/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.modalHeaderBackground,
    ...spacing.pytwelve,
    ...spacing.pxsixteen,
    ...Platform.select({
      android: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.black,
        marginTop: StatusBar.currentHeight as number,
        borderTopLeftRadius: size.twelve,
        borderTopRightRadius: size.twelve,
      },
    }),
  },
  leftHiddenView: {
    width: size.thirty,
  },
  title: {
    ...fonts.modalHeaderTitle,
  },
});

interface ModalHeaderProps {
  title: string;
}

export default function ModalHeader({ title }: ModalHeaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.leftHiddenView} />
      <Text style={styles.title}>{title}</Text>
      <DismissModalButton />
    </View>
  );
}
