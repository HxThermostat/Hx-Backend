import React from "react";
import { StyleSheet, Platform } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import { hasAccess, useHumiditLocationQuery } from "~/graph";

import i18n from "~/i18n";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import SectionList, { Sections } from "~/components/Lists/SectionList";

import spacing from "~/styles/spacing";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.ManageHumidities";

export type ManageHumiditiesProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "ManageHumidities"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "ManageHumidities">;
  data: DataHookProp<typeof useHumiditLocationQuery>;
};

function ManageHumidities({
  data: { location },
  navigation,
}: ManageHumiditiesProps): JSX.Element {
  if (!location) throw new GoBack();

  const DATA: Sections = location.controllers
    .map(({ id, name, humidification, dehumidification }) => ({
      title: name,
      data: [
        ...(humidification
          ? [
              {
                title: i18n.t("humidify", { scope }),
                subtitle:
                  humidification?.mode === "MANUAL"
                    ? `${Math.round(humidification.value * 100)}%`
                    : i18n.t("auto", { scope }),
                chevron: true,
                navigate: hasAccess(location.accessLevel, "INSTALLER")
                  ? {
                      name: "ManageHumidityThreshold",
                      params: {
                        controllerId: id,
                      },
                    }
                  : undefined,
              },
            ]
          : []),
        ...(dehumidification
          ? [
              {
                title: i18n.t("dehumidify", { scope }),
                subtitle:
                  dehumidification?.mode === "MANUAL"
                    ? `${Math.round(dehumidification.value * 100)}%`
                    : i18n.t("auto", { scope }),
                chevron: true,
                navigate: hasAccess(location.accessLevel, "INSTALLER")
                  ? {
                      name: "ManageDehumidityThreshold",
                      params: {
                        controllerId: id,
                      },
                    }
                  : undefined,
              },
            ]
          : []),
      ],
    }))
    .map(item => {
      if (item.data.length === 0) {
        return {
          ...item,
          data: [
            {
              title: i18n.t("na", { scope }),
            },
          ],
        };
      }

      return item;
    });

  function handleItemPress(item: Item): void {
    if (item.navigate) {
      navigation.navigate(item.navigate.name, item.navigate.params);
    }
  }
  return (
    <Background>
      <SectionList
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        handleItemPress={handleItemPress}
        sections={DATA}
      />
    </Background>
  );
}

export default withQueryData(useHumiditLocationQuery, {
  useVariables: () => {
    const route = useRoute<ManageHumiditiesProps["route"]>();
    return { locationId: route.params.locationId };
  },
})(ManageHumidities);
