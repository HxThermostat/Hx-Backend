import React from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  Platform,
} from "react-native";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import images from "~/assets/images";

import Text from "~/components/Text";
import Touchable from "~/components/Touchables/Touchable";
import ImageIcon from "~/components/ImageIcon";

import TextInput, { MixedTextInputProps } from "./TextInput";

const styles = StyleSheet.create({
  label: {
    ...fonts.textInputTextLabel,
  },
  clearBtn: {
    position: "absolute",
    ...Platform.select({
      android: {
        top: 24,
        right: 10,
      },
      default: {
        top: 11,
        right: 10,
      },
    }),
  },
  icon: { height: 16, width: 16 },
  input: {
    paddingRight: 24,
  },
});

export type TextInputClearableProps = MixedTextInputProps & {
  onPressClearInput?: () => void;
};

const TextInputClearable = React.forwardRef<
  RNTextInput,
  TextInputClearableProps
>(
  (props: TextInputClearableProps, ref): JSX.Element => {
    const { style, label, onPressClearInput, ...rest } = props;

    return (
      <View>
        {Boolean(Platform.OS === "ios" && label) && (
          <Text style={styles.label}>{label}</Text>
        )}
        <View>
          <TextInput
            {...rest}
            placeholderTextColor={colors.placeholderText}
            label={label}
            ref={ref}
            style={[styles.input, style]}
          />
          <Touchable
            hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
            onPress={onPressClearInput}
            style={styles.clearBtn}
          >
            <ImageIcon image={images.clear} style={styles.icon} />
          </Touchable>
        </View>
      </View>
    );
  }
);

TextInputClearable.displayName = "TextInputClearable";
export default TextInputClearable;
