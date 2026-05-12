import React from "react";
import { StyleSheet } from "react-native";

import Touchable, { TouchableProps } from "~/components/Touchables/Touchable";

import spacing from "~/styles/spacing";
import colors from "~/styles/color";

const styles = StyleSheet.create({
  base: {
    borderRadius: 5,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    ...spacing.pysix,
    ...spacing.pxten,
    borderColor: colors.white,
    flexDirection: "row",
    ...spacing.mxsix,
    minWidth: 80,
  },
  disabled: { opacity: 0.5 },
});

export type SmallSquareButtonProps = TouchableProps;

const SmallSquareButton = (props: SmallSquareButtonProps): JSX.Element => {
  const { children, disabled, style, ...rest } = props;

  return (
    <Touchable
      {...rest}
      disabled={disabled}
      style={[styles.base, disabled ? styles.disabled : {}, style]}
    >
      {children}
    </Touchable>
  );
};

export default SmallSquareButton;
