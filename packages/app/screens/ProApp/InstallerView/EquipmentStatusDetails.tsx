import React, { useCallback, useState, useLayoutEffect, useMemo } from "react";
import { StyleSheet } from "react-native";

import { UnreachableCaseError } from "ts-essentials";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ProAppNavigatorRouteList } from "~/navigators/ProAppNavigator";

import { useEquipmentStatusQuery, StatusFragment } from "~/graph";

import i18n from "~/i18n";

import ActivityIndicator from "~/components/ActivityIndicator";
import Background from "~/components/Background";
import SectionList, { Sections } from "~/components/Lists/SectionList";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  activityIndicator: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export type EquipmentStatusDetailsProps = {
  navigation: NativeStackNavigationProp<
    ProAppNavigatorRouteList,
    "EquipmentStatusDetails"
  >;
  route: RouteProp<ProAppNavigatorRouteList, "EquipmentStatusDetails">;
};
const scope = "Screens.ProApp.ProAppNavigator.EquipmentStatus";
export default function EquipmentStatusDetails({
  navigation,
  route: {
    params: { locationId, section },
  },
}: EquipmentStatusDetailsProps): JSX.Element {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t(`Detail.screenTitles.${section}`, { scope }),
    });
  }, [navigation, section]);

  const variables = useMemo(() => ({ locationId }), [locationId]);

  const { data, refetch } = useEquipmentStatusQuery({
    variables,
    fetchPolicy: "cache-and-network",
  });

  let sections: Sections;

  const mapStatus = (
    statusItems: StatusFragment[] | null | undefined
  ): Sections =>
    statusItems
      ? statusItems.map(status => ({
          title: status.label ?? "",
          data: status.items.map(({ label, value }) => ({
            title: i18n.t(`labels.${status.label ?? ""}.${label}`, {
              scope,
              defaultValue: label,
            }),
            titleProps: { numberOfLines: undefined },
            subtitle: value ?? undefined,
            rightTitleProps: { numberOfLines: undefined },
          })),
        }))
      : [];

  switch (section) {
    case "INDOOR":
      sections = mapStatus(data?.location?.statusIndoor);
      break;
    case "OUTDOOR":
      sections = mapStatus(data?.location?.statusOutdoor);
      break;
    case "ZONE":
      sections = mapStatus(data?.location?.statusZone);
      break;
    case "INDOOREEV":
    case "THERMOSTAT":
      // These types have been deprecated but not yet removed from the Graph
      sections = [];
      break;
    default:
      throw new UnreachableCaseError(section);
  }

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch(variables);
    setRefreshing(false);
  }, [refetch, variables]);

  return (
    <Background>
      <SectionList
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListEmptyComponent={
          <ActivityIndicator size={"small"} style={styles.activityIndicator} />
        }
        sections={sections}
      />
    </Background>
  );
}
