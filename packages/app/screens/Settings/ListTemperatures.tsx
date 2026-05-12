import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/lib/typescript";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import FlatList, { Data } from "~/components/Lists/FlatList";

import { useTemperatureUnit } from "~/contexts";

import { useLocationNotificationsQuery } from "~/graph";

import { usePushNotificationsEnabled } from "~/hooks/usePushNotifications";

import { degreesSymbol } from "~/utils/display";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

const styles = StyleSheet.create({
  container: {},
});

export type ListTemperaturesProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "ListTemperatures"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "ListTemperatures">;
  data: DataHookProp<typeof useLocationNotificationsQuery>;
};

function ListTemperatures({
  navigation,
  data: { location },
}: ListTemperaturesProps): JSX.Element {
  if (!location?.controllers) throw new GoBack();

  const { toDisplay } = useTemperatureUnit();
  const notificationsEnabled = usePushNotificationsEnabled();

  const DATA = useMemo(
    (): Data =>
      location.controllers.map(controller => {
        return {
          title: controller.name,
          subtitle:
            controller.temperatureNotification?.enabled &&
            notificationsEnabled !== false
              ? `${toDisplay(
                  controller.temperatureNotification.min
                )}-${toDisplay(
                  controller.temperatureNotification.max
                )}${degreesSymbol}`
              : undefined,
          chevron: true,
          navigate: {
            name: "TemperatureNotification",
            params: {
              controllerId: controller.id,
            },
          },
        };
      }),
    [location.controllers, notificationsEnabled, toDisplay]
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

export default withQueryData(useLocationNotificationsQuery, {
  useVariables: () => {
    const route = useRoute<ListTemperaturesProps["route"]>();
    return {
      locationId: route.params.locationId,
    };
  },
})(ListTemperatures);
