import React from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  Platform,
  TextStyle,
} from "react-native";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";

import Text from "~/components/Text";

import TextInput, { MixedTextInputProps } from "./TextInput";

const styles = StyleSheet.create({
  label: {
    ...fonts.textInputTextLabel,
  },
});

export type TextInputWithLabelProps = MixedTextInputProps & {
  labelStyle?: TextStyle;
};

const TextInputWithLabel = React.forwardRef<
  RNTextInput,
  TextInputWithLabelProps
>(
  (props: TextInputWithLabelProps, ref): JSX.Element => {
    const { style, label, labelStyle, ...rest } = props;
    return (
      <View>
        {Platform.OS === "ios" && (
          <Text style={[styles.label, labelStyle ? labelStyle : {}]}>
            {label}
          </Text>
        )}
        <TextInput
          placeholderTextColor={colors.placeholderText}
          {...rest}
          ref={ref}
          label={label}
          style={[style]}
          theme={{
            colors: {
              disabled: colors.placeholderText,
            },
          }}
        />
      </View>
    );
  }
);

TextInputWithLabel.displayName = "TextInputWithLabel";
export default TextInputWithLabel;
