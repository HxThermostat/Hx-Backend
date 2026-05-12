import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { ComponentLibraryNavigatorRouteList } from "../ComponentLibraryNavigator"; // didn't like this import?

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

import Text from "~/components/Text";
import TextInput from "~/components/Inputs/TextInput";
import Background from "~/components/Background";
import TextInputWithLabel from "~/components/Inputs/TextInputWithLabel";
import TextInputPassword from "~/components/Inputs/TextInputPassword";
import TextInputClearable from "~/components/Inputs/TextInputClearable";
import TextField from "~/components/Inputs/TextField";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...spacing.pxfiftyfour,
  },
  scrollFlex: {
    flex: 1,
  },
  titleText: {
    ...fonts.largeTitle,
    textAlign: "center",
    ...spacing.mbfortytwo,
    ...spacing.mtfortyeight,
  },
});

const EXTRA_KEYBOARD_OFFSET_HEIGHT = 25;

type TextInputsScreenNavigationProp = NativeStackNavigationProp<
  ComponentLibraryNavigatorRouteList,
  "TextInputsScreen"
>;

export type TextInputsNavigationProps = {
  navigation: TextInputsScreenNavigationProp;
};

export default function TextInputsScreen(): JSX.Element {
  const [clearInputValue, setClearInputValue] = useState("");
  const [textFieldValue, setTextFieldValue] = useState("Tom Scott");

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={styles.scrollFlex}
          extraScrollHeight={EXTRA_KEYBOARD_OFFSET_HEIGHT}
        >
          <Text style={styles.titleText}>Text Inputs</Text>

          <TextInput
            placeholder={"Base text input component"}
            keyboardType={"email-address"}
            autoCapitalize={"none"}
            returnKeyType="done"
          />
          <TextInputWithLabel label="First Name" />
          <TextInputPassword
            label="New password"
            placeholder="Enter a password"
          />
          <TextInputClearable
            onChangeText={v => setClearInputValue(v)}
            value={clearInputValue}
            onPressClearInput={() => setClearInputValue("")}
            label="Clearable Input"
            placeholder="Enter some text and clear it"
            theme={{ colors: { primary: "blue" } }}
          />
          <TextField
            label="Dealer Name"
            onChangeText={v => setTextFieldValue(v)}
            value={textFieldValue}
            onPressClearInput={() => setTextFieldValue("")}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Background>
  );
}
