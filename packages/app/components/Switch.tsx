import React from "react";
import { Platform } from "react-native";

import { Switch as PaperSwitch } from "react-native-paper";

import colors from "~/styles/color";

type SwitchProps = React.ComponentProps<typeof PaperSwitch>;

const Switch = (props: SwitchProps): JSX.Element => {
  const trackColorProps: Pick<SwitchProps, "trackColor"> = {};
  if (props.disabled && Platform.OS === "android") {
    trackColorProps.trackColor = { false: "gray", true: "gray" };
  }

  return <PaperSwitch color={colors.tint} {...props} {...trackColorProps} />;
};

export default Switch;
