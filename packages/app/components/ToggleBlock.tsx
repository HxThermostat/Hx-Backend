import React from "react";
import { View, StyleSheet } from "react-native";

import { systemWeights } from "react-native-typography";

import Switch from "~/components/Switch";
import Text from "~/components/Text";

import fonts from "~/styles/fonts";
import colors from "~/styles/color";
import spacing from "~/styles/spacing";

const styles = StyleSheet.create({
  container: {
    ...spacing.mbsixtyfour,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    ...fonts.secondaryHeaderSemibold,
    ...spacing.mbten,
  },
  body: {
    ...fonts.body,
    ...systemWeights.light,
    color: colors.white,
    width: "70%",
  },
});

interface ToggleBlockProps {
  title: string;
  body: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  hideToggle?: boolean;
  disabled?: boolean;
}
const ToggleBlock = ({
  title,
  value,
  onValueChange,
  body,
  hideToggle,
  disabled,
}: ToggleBlockProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>{title}</Text>
        {!hideToggle && (
          <Switch
            value={value}
            onValueChange={onValueChange}
            disabled={disabled}
          />
        )}
      </View>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

export default ToggleBlock;
