import React, { useState } from "react";
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  Insets,
  useWindowDimensions,
} from "react-native";

import useLazyEffect from "~/hooks/useLazyEffect";

import fonts from "~/styles/fonts";

import Touchable from "./Touchable";

import ActivityIndicator from "../ActivityIndicator";
import Text from "../Text";

const styles = StyleSheet.create({
  text: {
    ...fonts.headerRightButton,
  },
});

interface HeaderButtonProps {
  children?: JSX.Element;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  hitSlop?: Insets;
}

export default function HeaderButton({
  children,
  text,
  textStyle,
  onPress,
  disabled,
  loading,
  hitSlop,
}: HeaderButtonProps): JSX.Element {
  const [renderButton, setRenderButton] = useState(true);
  // We don't actually care about the dimensions, this is just a
  // convenient way to respond to orientation changes / multitasking
  // changes which may require a header button to layout again
  const { width } = useWindowDimensions();

  useLazyEffect(() => {
    setRenderButton(false);
    const handle = setTimeout(() => setRenderButton(true), 200);
    return () => clearTimeout(handle);
  }, [width]);

  if (!renderButton) {
    return <></>;
  }

  if (loading) {
    return <ActivityIndicator size={"small"} />;
  }

  return (
    <Touchable onPress={onPress} disabled={disabled} hitSlop={hitSlop}>
      {children ? (
        children
      ) : (
        <Text style={[styles.text, textStyle]}>{text ?? " "}</Text>
      )}
    </Touchable>
  );
}
