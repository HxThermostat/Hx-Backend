import React from "react";
import { StyleSheet, Platform } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import { hasAccess, useNamesQuery } from "~/graph";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import FlatList, { Data } from "~/components/Lists/FlatList";

import spacing from "~/styles/spacing";

import { withQueryData, DataHookProp, GoBack } from "~/screens/withQueryData";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
  },
});

export type RoomNamesProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList, "Names">;
  route: RouteProp<SettingsNavigatorRouteList, "Names">;
  data: DataHookProp<typeof useNamesQuery>;
};

function RoomNames({
  data: { location },
  navigation,
}: RoomNamesProps): JSX.Element {
  if (!location) throw new GoBack();
  const { controllers } = location;

  const DATA: Data = controllers.map(controller => ({
    title: controller.name,
    chevron: true,
    navigate: hasAccess(controller.accessLevel, "INSTALLER")
      ? {
          name: "RenameRoom",
          params: { controllerId: controller.id },
        }
      : undefined,
  }));

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
    const route = useRoute<RoomNamesProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(RoomNames);
