import React, { ComponentProps } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type VectorIconProps = ComponentProps<typeof Ionicons>;
export type IconProps = Omit<VectorIconProps, "name">;

export const ChatIcon = (props: IconProps): JSX.Element => (
  <MaterialIcons name="message" {...props} />
);
