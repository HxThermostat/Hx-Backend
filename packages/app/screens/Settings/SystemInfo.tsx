import React, { useMemo } from "react";
import { StyleSheet, Platform } from "react-native";

import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp } from "@react-navigation/native";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import FlatList, { Data } from "~/components/Lists/FlatList";

import spacing from "~/styles/spacing";

import i18n from "~/i18n";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
  },
});

export type SystemInfoProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "SystemInfo"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "SystemInfo">;
};
const scope = "Screens.Authenticated.SettingsNavigator.SystemInfo";
export default function SystemInfo({
  route: {
    params: { locationId },
  },
  navigation,
}: SystemInfoProps): JSX.Element {
  const DATA = useMemo(
    (): Data => [
      {
        title: i18n.t("thermostatSoftware", { scope }),
        chevron: true,
        navigate: {
          name: i18n.t("software", { scope }),
          params: {
            locationId,
          },
        },
      },
      {
        title: i18n.t("systemLog", { scope }),
        chevron: true,
        navigate: {
          name: "SystemLogUser",
          params: {
            locationId,
          },
        },
      },
    ],
    [locationId]
  );

  function handleItemPress(item: Item): void {
    if (item.navigate) {
      navigation.navigate(item.navigate.name, item.navigate.params);
    }
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
