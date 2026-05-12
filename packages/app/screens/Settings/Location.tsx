import React, { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import { TemperatureUnitProps, useAuth, useTemperatureUnit } from "~/contexts";

import {
  useSettingsLocationQuery,
  Screen_Settings_LocationFragment as LocationType,
  hasAccess,
} from "~/graph";

import i18n from "~/i18n";

import Background from "~/components/Background";
import FlatList from "~/components/Lists/FlatList";
import { Item } from "~/components/Lists/ListItem";

import { setpointRange } from "~/utils/display";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";
import { useActionSheet } from "~/hooks/useActionSheet";

const styles = StyleSheet.create({
  container: {},
});

const scope = "Screens.Authenticated.SettingsNavigator.Location";

export const locationItem = (
  location: LocationType,
  toDisplay: TemperatureUnitProps["toDisplay"],
  { showActionSheetWithOptions }: ReturnType<typeof useActionSheet>,
  removeLocation: () => void
): Item[] => [
  {
    title: i18n.t("names", { scope }),
    chevron: true,
    navigate: {
      name: "Names",
      params: { locationId: location.id },
    },
  },
  {
    title: i18n.t("dealer", { scope }),
    subtitle: location.dealer.name,
    chevron: true,
    navigate: {
      name: "Dealer",
      params: { locationId: location.id },
    },
  },
  {
    title: i18n.t("schedule", { scope }),
    chevron: true,
    disabled: !hasAccess(location.accessLevel, "DIAGNOSTIC"),
    navigate: {
      name: "Schedule",
      params: { locationId: location.id },
    },
  },
  {
    title: i18n.t("notifications", { scope }),
    disabled: !hasAccess(location.accessLevel, "OWNER"),
    chevron: true,
    navigate: {
      name: "Notifications",
      params: { locationId: location.id },
    },
  },
  {
    title: i18n.t("away", { scope }),
    chevron: true,
    subtitle:
      location.controllers.length === 1 && location.controllers[0].away
        ? setpointRange(location.controllers[0].away.setpoints, toDisplay)
        : undefined,
    disabled: !hasAccess(location.accessLevel, "DIAGNOSTIC"),
    navigate: {
      name: "Away",
      params: {
        locationId: location.id,
      },
    },
  },
  ...(location.vacation
    ? [
        {
          title: i18n.t("vacation", { scope }),
          subtitle: setpointRange(location.vacation.setpoints, toDisplay),
          chevron: true,
          navigate: hasAccess(location.accessLevel, "INSTALLER")
            ? {
                name: "Vacation",
                params: {
                  locationId: location.id,
                  vacation: location.vacation,
                },
              }
            : undefined,
        },
      ]
    : []),
  ...(location.controllers.find(c => c.humidification || c.dehumidification)
    ? [
        {
          title: i18n.t("humidity", { scope }),
          chevron: true,
          disabled: !hasAccess(location.accessLevel, "DIAGNOSTIC"),
          navigate: {
            name: "ManageHumidities",
            params: {
              locationId: location.id,
            },
          },
        },
      ]
    : []),
  {
    title: i18n.t("systemInfo", { scope }),
    chevron: true,
    navigate: {
      name: "SystemInfo",
      params: {
        locationId: location.id,
      },
    },
  },
  {
    title: i18n.t("deleteThermostat", { scope }),
    disabled: !hasAccess(location.accessLevel, "OWNER"),
    button: true,
    destructive: true,
    onPress() {
      showActionSheetWithOptions({
        items: [
          {
            label: i18n.t("Common.cancel"),
            cancel: true,
          },
          {
            label: i18n.t("deleteThermostatSheet.confirm", { scope }),
            destructive: true,
            onPress: () => {
              removeLocation();
            },
          },
        ],
        title: i18n.t("deleteThermostatSheet.title", { scope }),
        message: i18n.t("deleteThermostatSheet.message", { scope }),
      });
    },
  },
];

type LocationNavigationProp = NativeStackNavigationProp<
  SettingsNavigatorRouteList,
  "Location"
>;

export type LocationProps = {
  navigation: LocationNavigationProp;
  route: RouteProp<SettingsNavigatorRouteList, "Location">;
  data: DataHookProp<typeof useSettingsLocationQuery>;
};

function Location({
  navigation,
  data: { location },
}: LocationProps): JSX.Element {
  if (!location) throw new GoBack();

  const { toDisplay } = useTemperatureUnit();
  const { removeLocation } = useAuth();

  const items: Item[] = locationItem(
    location,
    toDisplay,
    useActionSheet(),
    () => removeLocation(location.id)
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: location.name,
    });
  }, [navigation, location.name]);

  function handleItemPress(item: Item): void {
    if (item.navigate) {
      navigation.navigate(item.navigate.name, item.navigate.params);
    }
    if (item.onPress) {
      item.onPress();
    }
  }
  return (
    <Background>
      <FlatList
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        data={items}
        handleItemPress={handleItemPress}
      />
    </Background>
  );
}

export default withQueryData(useSettingsLocationQuery, {
  useVariables: () => {
    const route = useRoute<LocationProps["route"]>();
    return { locationId: route.params.locationId };
  },
})(Location);
