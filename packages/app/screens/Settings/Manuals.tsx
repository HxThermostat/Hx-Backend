import React from "react";
import { StyleSheet, Platform, Linking } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import i18n from "~/i18n";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import FlatList, { Data } from "~/components/Lists/FlatList";

import spacing from "~/styles/spacing";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.Manuals";

const openUrl = (url: string): (() => void) => {
  return () => {
    Linking.openURL(url);
  };
};

export type ManualsProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList, "Manuals">;
  route: RouteProp<SettingsNavigatorRouteList, "Manuals">;
};

export default function Manuals(): JSX.Element {
  const DATA: Data = [
    {
      title: i18n.t("thermostatManual", { scope }),
      onPress: openUrl(
        "https://files.hvacnavigator.com/p/5407935-uum-e-1020.pdf"
      ),
    },
    {
      title: i18n.t("zoningManual", { scope }),
      onPress: openUrl(
        "https://files.hvacnavigator.com/p/5594278-uum-a-1119.pdf"
      ),
    },
    {
      title: i18n.t("techGuide", { scope }),
      onPress: openUrl(
        "https://files.hvacnavigator.com/p/5835771-utg-a-0220.pdf"
      ),
    },
    {
      title: i18n.t("quickReference", { scope }),
      onPress: openUrl(
        "https://files.hvacnavigator.com/p/5594279-urg-a-1019.pdf"
      ),
    },
  ];

  function handleItemPress(item: Item): void {
    item.onPress && item.onPress();
  }

  return (
    <Background>
      <FlatList
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        handleItemPress={handleItemPress}
        data={DATA}
      />
    </Background>
  );
}
