import React from "react";
import { StyleSheet, Platform, View } from "react-native";

import { systemWeights } from "react-native-typography";

import Touchable, { TouchableProps } from "~/components/Touchables/Touchable";
import Text from "~/components/Text";

import spacing from "~/styles/spacing";
import colors from "~/styles/color";
import fonts from "~/styles/fonts";

const styles = StyleSheet.create({
  base: {
    borderRadius: 9,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    ...spacing.pysix,
    ...spacing.pxtwelve,
    borderColor: colors.tint,
    alignSelf: "flex-start",
  },
  text: {
    textAlign: "center",
    ...fonts.scaledSecondaryHeader,
    color: colors.tint,
    ...systemWeights.semibold,
    letterSpacing: Platform.select({
      // the letterSpacing fn from rn-typography doesn't calculate this as figma has it
      ios: -0.408,
      default: 0,
    }),
  },
  disabled: { opacity: 0.5 },
});

export type SmallRoundButtonProps = Pick<
  TouchableProps,
  Exclude<keyof TouchableProps, "children">
> & {
  text: string;
};

const SmallRoundButton = (props: SmallRoundButtonProps): JSX.Element => {
  const { text, disabled, style, ...rest } = props;

  return (
    <Touchable
      {...rest}
      disabled={disabled}
      style={[styles.base, disabled ? styles.disabled : {}, style]}
    >
      <Text style={styles.text}>{text}</Text>
    </Touchable>
  );
};

export default SmallRoundButton;
