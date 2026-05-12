import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/lib/typescript";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import FlatList, { Data } from "~/components/Lists/FlatList";

import { useLocationNotificationsQuery } from "~/graph";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";
import { usePushNotificationsEnabled } from "~/hooks/usePushNotifications";

const styles = StyleSheet.create({
  container: {},
});

export type ListHumiditiesProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "ListHumidities"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "ListHumidities">;
  data: DataHookProp<typeof useLocationNotificationsQuery>;
};

function ListHumidities({
  navigation,
  data: { location },
}: ListHumiditiesProps): JSX.Element {
  if (!location?.controllers) throw new GoBack();

  const notificationsEnabled = usePushNotificationsEnabled();

  const DATA = useMemo(
    (): Data =>
      location.controllers.map(controller => {
        return controller.humidityNotification
          ? {
              title: controller.name,
              subtitle:
                controller.humidityNotification?.enabled &&
                notificationsEnabled !== false
                  ? `${Math.trunc(
                      controller.humidityNotification.min * 100
                    )}-${Math.trunc(
                      controller.humidityNotification.max * 100
                    )}%`
                  : undefined,
              chevron: true,
              navigate: {
                name: "HumidityNotification",
                params: {
                  controllerId: controller.id,
                },
              },
            }
          : {
              title: controller.name,
              disabled: true,
            };
      }),
    [location.controllers, notificationsEnabled]
  );

  function handleItemPress(item: Item): void {
    if (item.navigate) {
      navigation.navigate(item.navigate.name, item.navigate.params);
    }
  }
  return (
    <Background>
      <FlatList
        contentContainerStyle={styles.container}
        handleItemPress={handleItemPress}
        data={DATA}
      />
    </Background>
  );
}

export default withQueryData(useLocationNotificationsQuery, {
  options: { fetchPolicy: "cache-and-network" },
  useVariables: () => {
    const route = useRoute<ListHumiditiesProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(ListHumidities);
