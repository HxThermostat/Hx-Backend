import React from "react";
import { StyleSheet, Platform } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import i18n from "~/i18n";
import { hasAccess, useNamesQuery } from "~/graph";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import FlatList, { Data } from "~/components/Lists/FlatList";

import spacing from "~/styles/spacing";

import { withQueryData, GoBack, DataHookProp } from "~/screens/withQueryData";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.Names";

export type NamesProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList, "Names">;
  route: RouteProp<SettingsNavigatorRouteList, "Names">;
  data: DataHookProp<typeof useNamesQuery>;
};

function Names({ data: { location }, navigation }: NamesProps): JSX.Element {
  if (!location) throw new GoBack();

  const DATA: Data = [
    {
      title: i18n.t("location", { scope }),
      subtitle: location.name,
      chevron: true,
      navigate: hasAccess(location.controllers[0].accessLevel, "INSTALLER")
        ? {
            name: "RenameLocation",
            params: {
              locationId: location.id,
            },
          }
        : undefined,
    },
    ...(location.controllers.length === 1
      ? [
          {
            title: i18n.t("room", { scope }),
            subtitle: location.controllers[0].name,
            chevron: true,
            navigate: hasAccess(
              location.controllers[0].accessLevel,
              "INSTALLER"
            )
              ? {
                  name: "RenameRoom",
                  params: {
                    controllerId: location.controllers[0].id,
                  },
                }
              : undefined,
          },
        ]
      : [
          {
            title: i18n.t("rooms", { scope }),
            chevron: true,
            navigate: {
              name: "RoomNames",
              params: {
                locationId: location.id,
              },
            },
          },
        ]),
  ];

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

export default withQueryData(useNamesQuery, {
  useVariables: () => {
    const route = useRoute<NamesProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(Names);
