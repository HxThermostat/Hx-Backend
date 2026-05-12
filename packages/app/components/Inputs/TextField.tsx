import React from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  Platform,
} from "react-native";

import fonts from "~/styles/fonts";

import Text from "~/components/Text";
import spacing from "~/styles/spacing";

import { TextInputAndroid } from "./TextInput";
import TextInputClearable, {
  TextInputClearableProps,
} from "./TextInputClearable";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    ...spacing.prtwo,
  },
  right: {
    flex: 1,
  },
  text: {
    ...fonts.textFieldText,
  },
  input: {
    ...fonts.textFieldText,
    textAlign: "right",
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    marginBottom: 0,
  },
});

export type TextFieldIOSProps = TextInputClearableProps;

const TextFieldIOS = React.forwardRef<RNTextInput, TextFieldIOSProps>(
  (props: TextFieldIOSProps, ref): JSX.Element => {
    const { label, style, containerStyle, ...rest } = props;
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.text}>{label}</Text>
        </View>
        <View style={styles.right}>
          <TextInputClearable
            {...rest}
            ref={ref}
            style={[styles.text, styles.input, style]}
            numberOfLines={1}
            containerStyle={[styles.inputContainer, containerStyle]}
          />
        </View>
      </View>
    );
  }
);

TextFieldIOS.displayName = "TextFieldIOS";

const TextFieldAndroid = TextInputAndroid;
TextFieldAndroid.displayName = "TextFieldAndroid";

const TextField = Platform.select({
  default: TextFieldIOS,
  android: TextInputClearable,
});

export default TextField;
