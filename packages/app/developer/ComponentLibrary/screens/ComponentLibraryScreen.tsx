import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { ComponentLibraryNavigatorRouteList } from "../ComponentLibraryNavigator";

import Text from "~/components/Text";
import Background from "~/components/Background";
import Touchable from "~/components/Touchables/Touchable";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";
import colors from "~/styles/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...spacing.pxfiftyfour,
  },
  scrollFlex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    ...spacing.mttwenty,
  },
  text: { ...fonts.body, color: colors.white },
});

const EXTRA_KEYBOARD_OFFSET_HEIGHT = 25;

type ComponentLibraryScreenNavigationProp = NativeStackNavigationProp<
  ComponentLibraryNavigatorRouteList,
  "ComponentLibraryScreen"
>;

export type ComponentLibraryNavigationProps = {
  navigation: ComponentLibraryScreenNavigationProp;
};

export default function ComponentLibraryScreen(
  props: ComponentLibraryNavigationProps
): JSX.Element {
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={styles.scrollFlex}
          extraScrollHeight={EXTRA_KEYBOARD_OFFSET_HEIGHT}
        >
          <Touchable
            style={styles.row}
            onPress={() => props.navigation.navigate("ButtonsScreen")}
          >
            <Text style={styles.text}>Go to Buttons</Text>
          </Touchable>
          <Touchable
            style={styles.row}
            onPress={() => props.navigation.navigate("TextInputsScreen")}
          >
            <Text style={styles.text}>Go to Text Inputs</Text>
          </Touchable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Background>
  );
}
