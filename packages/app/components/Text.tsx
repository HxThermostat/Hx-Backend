import React from "react";
import { Text as RNText, TextProps } from "react-native";

/**
 * Override Text to provide a single entry to easily adjust things like default font, color, accessibility options across app for future proofing etc.
 */
interface HXTextProps extends TextProps {
  children: React.ReactNode | React.ReactNode[];
}
const Text = (props: HXTextProps): JSX.Element => {
  const { children, style, ...rest } = props;
  return (
    <RNText {...rest} style={[style]}>
      {children}
    </RNText>
  );
};

export default Text;
