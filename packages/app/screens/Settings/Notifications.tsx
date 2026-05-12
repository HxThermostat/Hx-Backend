import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import FlatList, { Data } from "~/components/Lists/FlatList";

import { useTemperatureUnit } from "~/contexts";

import { useLocationNotificationsQuery } from "~/graph";

import { usePushNotificationsEnabled } from "~/hooks/usePushNotifications";

import i18n from "~/i18n";

import { DataHookProp, withQueryData } from "~/screens/withQueryData";

const styles = StyleSheet.create({
  container: {},
});

const scope = "Screens.Authenticated.SettingsNavigator.Notifications";

export type NotificationsProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "Notifications"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "Notifications">;
  data: DataHookProp<typeof useLocationNotificationsQuery>;
};

function Notifications({
  route: {
    params: { locationId },
  },
  navigation,
  data: { location },
}: NotificationsProps): JSX.Element {
  const { toDisplay } = useTemperatureUnit();
  const notificationsEnabled = usePushNotificationsEnabled();

  const controller =
    location?.controllers.length === 1 ? location.controllers[0] : undefined;
  const controllerId = controller?.id;

  const faultNotification = !!location?.faultNotification;
  const faultNotificationSubtitle =
    location?.faultNotification?.enabled && notificationsEnabled !== false
      ? i18n.t("notificationEnabled", { scope })
      : undefined;

  const serviceRemindersSubtitle = location?.serviceReminder?.enabled
    ? i18n.t("notificationEnabled", { scope })
    : undefined;

  const temperatureNotification = !!location?.controllers?.some(
    c => c.temperatureNotification
  );
  const temperatureNotificationSubtitle =
    controller?.temperatureNotification?.enabled &&
    notificationsEnabled !== false
      ? `${toDisplay(controller.temperatureNotification.min)}-${toDisplay(
          controller.temperatureNotification.max
        )}°`
      : undefined;

  const humidityNotification = !!location?.controllers?.some(
    c => c.humidityNotification
  );
  const humidityNotificationSubtitle =
    controller?.humidityNotification?.enabled && notificationsEnabled !== false
      ? `${Math.trunc(controller.humidityNotification.min * 100)}-${Math.trunc(
          controller.humidityNotification.max * 100
        )}%`
      : undefined;

  const DATA: Data = useMemo(
    () => [
      {
        title: i18n.t("temperatureThreshold", { scope }),
        subtitle: temperatureNotificationSubtitle,
        chevron: temperatureNotification,
        disabled: !temperatureNotification,
        navigate: controllerId
          ? { name: "TemperatureNotification", params: { controllerId } }
          : {
              name: "ListTemperatures",
              params: { locationId },
            },
      },
      {
        title: i18n.t("humidityThreshold", { scope }),
        subtitle: humidityNotificationSubtitle,
        chevron: humidityNotification,
        disabled: !humidityNotification,
        navigate: controllerId
          ? { name: "HumidityNotification", params: { controllerId } }
          : {
              name: "ListHumidities",
              params: { locationId },
            },
      },
      {
        title: i18n.t("serviceReminders", { scope }),
        subtitle: serviceRemindersSubtitle,
        chevron: true,
        navigate: {
          name: "ServiceReminders",
          params: { locationId },
        },
      },
      {
        title: i18n.t("faults", { scope }),
        subtitle: faultNotificationSubtitle,
        chevron: faultNotification,
        disabled: !faultNotification,
        navigate: {
          name: "Faults",
          params: { locationId },
        },
      },
    ],
    [
      controllerId,
      faultNotification,
      faultNotificationSubtitle,
      humidityNotification,
      humidityNotificationSubtitle,
      locationId,
      serviceRemindersSubtitle,
      temperatureNotification,
      temperatureNotificationSubtitle,
    ]
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
    const route = useRoute<NotificationsProps["route"]>();
    return {
      locationId: route.params.locationId,
    };
  },
})(Notifications);
