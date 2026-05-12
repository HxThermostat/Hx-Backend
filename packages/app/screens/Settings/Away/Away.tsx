import React, { useCallback, useState } from "react";
import { StyleSheet, Platform } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import { useTemperatureUnit } from "~/contexts";

import { hasAccess, useAwayLocationQuery } from "~/graph";

import i18n from "~/i18n";

import ActivityIndicator from "~/components/ActivityIndicator";
import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import SectionList, { Sections } from "~/components/Lists/SectionList";

import spacing from "~/styles/spacing";

import { setpointRange } from "~/utils/display";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

import { currentGeofence } from "./Geofence/helpers";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.Away";

export type AwayProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList, "Away">;
  route: RouteProp<SettingsNavigatorRouteList, "Away">;
  data: DataHookProp<typeof useAwayLocationQuery>;
};

function Away({ data: { location }, navigation }: AwayProps): JSX.Element {
  if (!location) throw new GoBack();

  const { toDisplay } = useTemperatureUnit();

  const [geofenceEnabled, setGeofenceEnabled] = useState<boolean>();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setGeofenceEnabled(!!(await currentGeofence(location.id)));
      })();

      return () => setGeofenceEnabled(undefined);
    }, [location.id])
  );

  const DATA: Sections = [
    {
      title: "",
      data: [
        {
          title: i18n.t("geofencing", { scope }),
          subtitle:
            geofenceEnabled === true
              ? i18n.t("geofencingEnabled", { scope })
              : undefined,
          rightElement:
            geofenceEnabled == null ? (
              <ActivityIndicator size={"small"} />
            ) : (
              undefined
            ),
          chevron: true,
          disabled: !hasAccess(location.accessLevel, "OWNER"),
          navigate: {
            name: "Geofence",
            params: {
              locationId: location.id,
            },
          },
        },
      ],
    },
    {
      title: i18n.t("temperatureRange", { scope }),
      data: location.controllers.map(({ id, name, away }) => ({
        title: name,
        subtitle: away ? setpointRange(away.setpoints, toDisplay) : undefined,
        chevron: !!away,
        navigate:
          hasAccess(location.accessLevel, "INSTALLER") && away
            ? {
                name: "AdjustAway",
                params: {
                  controllerId: id,
                },
              }
            : undefined,
      })),
    },
  ];

  function handleItemPress(item: Item): void {
    if (item.navigate) {
      navigation.navigate(item.navigate.name, item.navigate.params);
    }
  }

  return (
    <Background>
      <SectionList
        contentContainerStyle={styles.container}
        handleItemPress={handleItemPress}
        sections={DATA}
      />
    </Background>
  );
}

export default withQueryData(useAwayLocationQuery, {
  useVariables() {
    const route = useRoute<AwayProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(Away);
