import React from "react";
import { StyleSheet } from "react-native";
import spacing from "~/styles/spacing";
import colors from "~/styles/color";
import Touchable, { TouchableProps } from "~/components/Touchables/Touchable";

/**
 * Override Touchable to provide a single entry to easily adjust things like default font, color, accessibility options etc.
 */

const styles = StyleSheet.create({
  base: {
    minWidth: 150,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    ...spacing.pysixteen,
    ...spacing.pxsixteen,
    borderColor: colors.white,
  },
  disabled: { opacity: 0.5 },
});

export type StandardButtonProps = TouchableProps;

const StandardButton = (props: StandardButtonProps): JSX.Element => {
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

export default StandardButton;
