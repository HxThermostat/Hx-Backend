import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "~/components/Text";
import Switch from "~/components/Switch";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";
import colors from "~/styles/color";

const styles = StyleSheet.create({
  container: {
    ...spacing.pxfifteen,
    ...spacing.pytwenty,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: colors.modalHeaderDivider,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  leftText: {
    color: colors.white,
    ...fonts.secondaryHeader,
    ...spacing.mrtwenty,
    minWidth: 70,
  },
  centerText: { flex: 1, ...fonts.caption2, ...spacing.mrtwenty },
});

interface ToggleableSwitchRowProps {
  title: string;
  description: string;
  selected: boolean;
  disabled?: boolean;
  onValueChange: (value: boolean) => void;
}
const ToggleableSwitchRow = (props: ToggleableSwitchRowProps): JSX.Element => {
  const { onValueChange, title, description, selected, disabled } = props;
  return (
    <View style={[styles.container]}>
      <Text style={[styles.leftText]}>{title}</Text>
      <Text style={[styles.centerText]}>{description}</Text>
      <Switch
        disabled={disabled}
        onValueChange={onValueChange}
        value={selected}
      />
    </View>
  );
};

export default ToggleableSwitchRow;
