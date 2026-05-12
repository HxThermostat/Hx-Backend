import React from "react";
import { StyleSheet, Platform } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import { useSettingsLocationQuery } from "~/graph";

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

export type ScheduleZoneNamesProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "ScheduleZoneNames"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "ScheduleZoneNames">;
  data: DataHookProp<typeof useSettingsLocationQuery>;
};

function ScheduleZoneNames({
  data: { location },
  navigation,
}: ScheduleZoneNamesProps): JSX.Element {
  if (!location) throw new GoBack();
  const { controllers } = location;

  const DATA: Data = controllers.map(controller => ({
    title: controller.name,
    chevron: true,
    navigate: {
      name: "RestoreDefaultSchedule",
      params: { controllerId: controller.id },
    },
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

export default withQueryData(useSettingsLocationQuery, {
  useVariables: () => {
    const route = useRoute<ScheduleZoneNamesProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(ScheduleZoneNames);
