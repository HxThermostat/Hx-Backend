import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";

import fonts from "~/styles/fonts";

import Touchable from "./Touchable";

const styles = StyleSheet.create({
  text: {
    ...fonts.textButton,
  },
});

export interface LinkTouchableProps {
  text: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const LinkTouchable = (props: LinkTouchableProps): JSX.Element => {
  const { text, onPress, containerStyle, textStyle, disabled } = props;
  return (
    <Touchable onPress={onPress} disabled={disabled} style={containerStyle}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Touchable>
  );
};

export default LinkTouchable;
