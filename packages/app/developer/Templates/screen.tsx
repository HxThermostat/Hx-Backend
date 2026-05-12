import React from "react";
import { View, StyleSheet } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "~/i18n";

import { ConnectThermostatNavigatorRouteList } from "~/navigators/ConnectThermostatNavigator";

import Background from "~/components/Background";

import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

// copy-pastable quick screen set up, adjust as things change

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...spacing.pxfiftyfour,
  },
  scrollFlex: {
    flex: 1,
  },
});

const scope = "Screens.Authenticated.ConnectThermostatNavigator.ScreenName";

type ScreenNameScreenNavigationProp = NativeStackNavigationProp<
  ConnectThermostatNavigatorRouteList,
  "ScreenName"
>;

export type ScreenNameProps = {
  navigation: ScreenNameScreenNavigationProp;
  router: RouteProp<ConnectThermostatNavigatorRouteList, "ScreenName">;
};

export default function ScreenName(props: ScreenNameProps): JSX.Element {
  return (
    <Background>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollFlex}>
        <SafeAreaView style={styles.container}></SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
}
