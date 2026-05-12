import React, { useState } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  Platform,
} from "react-native";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import images from "~/assets/images/index";

import Text from "~/components/Text";
import Touchable from "~/components/Touchables/Touchable";
import ImageIcon from "~/components/ImageIcon";

import TextInput, { MixedTextInputProps } from "./TextInput";

const styles = StyleSheet.create({
  label: {
    ...fonts.textInputTextLabel,
  },
  pwBtn: {
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
  icon: { height: 16, width: 23 },
});

type TextInputPasswordProps = MixedTextInputProps & {
  label?: string;
};

const TextInputPassword = React.forwardRef<RNTextInput, TextInputPasswordProps>(
  (props: TextInputPasswordProps, ref): JSX.Element => {
    const [hidePassword, setHidePassword] = useState(true);

    const { style, label, ...rest } = props;
    return (
      <View>
        {Boolean(Platform.OS === "ios" && label) && (
          <Text style={styles.label}>{label}</Text>
        )}
        <View>
          <TextInput
            label={label}
            placeholderTextColor={colors.placeholderText}
            {...rest}
            ref={ref}
            style={[style]}
            secureTextEntry={hidePassword}
            autoCapitalize={"none"}
            autoCompleteType={"password"}
            autoCorrect={false}
            keyboardType={Platform.select({
              ios: "default",
              android: hidePassword ? "default" : "visible-password",
            })}
            textContentType={"password"}
          />
          <Touchable
            hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.pwBtn}
          >
            <ImageIcon image={images.eye} style={styles.icon} />
          </Touchable>
        </View>
      </View>
    );
  }
);

TextInputPassword.displayName = "TextInputPassword";
export default TextInputPassword;
