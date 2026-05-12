import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  Platform,
  View,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  TextInputSubmitEditingEventData,
  TextInputEndEditingEventData,
} from "react-native";

import { TextInput as PaperTextInput } from "react-native-paper";

import colors from "~/styles/color";
import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";
import ActivityIndicator from "../ActivityIndicator";

/**
 * Override TextInput to provide a single entry to easily adjust things like default font, color, accessibility options etc.
 */
const stylesIOS = StyleSheet.create({
  container: {
    borderWidth: 1,
    ...spacing.mbtwenty,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.iOSTextInputBG,
    borderColor: "transparent",
    borderRadius: 10,
  },
  input: {
    ...fonts.secondaryInputIOS,
    ...spacing.mxten,
    ...spacing.pyeight,
    flex: 1,
  },
  loading: {
    ...spacing.mrten,
  },
});

export type TextInputIOSProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
};

export type TextInputAndroidProps = React.ComponentProps<
  typeof PaperTextInput
> & {
  loading?: boolean;
};

export type MixedTextInputProps = TextInputAndroidProps & TextInputIOSProps;

export const TextInputIOS = React.forwardRef<RNTextInput, MixedTextInputProps>(
  (props: MixedTextInputProps, ref): JSX.Element => {
    // we will also add common stylings for things like validations etc here to be shared
    const {
      style,
      containerStyle,
      clearButtonMode,
      loading,
      editable,
      ...rest
    } = props;
    return (
      <View style={[stylesIOS.container, containerStyle]}>
        <RNTextInput
          {...rest}
          ref={ref}
          placeholderTextColor={colors.inputIOSPlaceholderText}
          style={[stylesIOS.input, style]}
          clearButtonMode={loading ? "never" : clearButtonMode}
          editable={loading ? false : editable}
        />
        {loading && (
          <ActivityIndicator size={"small"} style={stylesIOS.loading} />
        )}
      </View>
    );
  }
);

TextInputIOS.displayName = "TextInputIOS";

const stylesAndroid = StyleSheet.create({
  base: {
    height: 56,
    ...fonts.textInputTextAndroid,
    backgroundColor: colors.androidTextInputBG,
    ...spacing.mbtwenty,
  },
  loading: {
    position: "absolute",
    top: 14,
    right: 12,
  },
});

export const TextInputAndroid = React.forwardRef<
  RNTextInput,
  MixedTextInputProps
>(
  (props: MixedTextInputProps, ref): JSX.Element => {
    const {
      containerStyle,
      style,
      label,
      onFocus,
      onBlur,
      onSubmitEditing,
      onEndEditing,
      loading,
      editable,
      clearButtonMode,
      ...rest
    } = props;

    const [focused, setFocused] = useState(false);

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        onFocus && onFocus(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        onBlur && onBlur(e);
      },
      [onBlur]
    );

    const handleOnSubmitEditing = useCallback(
      (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        setFocused(false);
        onSubmitEditing && onSubmitEditing(e);
      },
      [onSubmitEditing]
    );

    const handleEndEditing = useCallback(
      (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        setFocused(false);
        onEndEditing && onEndEditing(e);
      },
      [onEndEditing]
    );

    return (
      <View style={containerStyle}>
        <PaperTextInput
          {...rest}
          label={label ? label : ""}
          placeholderTextColor={colors.placeholderText}
          ref={ref}
          style={[stylesAndroid.base, style]}
          underlineColor={
            focused && !loading
              ? colors.tint
              : colors.androidTextInputUnderlineInactive
          }
          onSubmitEditing={handleOnSubmitEditing}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onEndEditing={handleEndEditing}
          clearButtonMode={loading ? "never" : clearButtonMode}
          editable={loading ? false : editable}
        />
        {loading && (
          <ActivityIndicator size={"small"} style={stylesAndroid.loading} />
        )}
      </View>
    );
  }
);

TextInputAndroid.displayName = "TextInputAndroid";

const TextInput = Platform.select({
  default: TextInputIOS,
  android: TextInputAndroid,
});

export default TextInput;
