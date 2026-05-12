import React, {
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { StyleSheet, Alert } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ProAppNavigatorRouteList } from "~/navigators/ProAppNavigator";

import { useRefreshStatusMutation, useEquipmentStatusQuery } from "~/graph";

import i18n from "~/i18n";

import ActivityIndicator from "~/components/ActivityIndicator";
import Background from "~/components/Background";
import FlatList from "~/components/Lists/FlatList";

import { UnreachableCaseError } from "ts-essentials";
import { Item } from "~/components/Lists/ListItem";
import HeaderButton from "~/components/Touchables/HeaderButton";

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

const scope = "Screens.ProApp.ProAppNavigator.EquipmentStatus";

export type EquipmentStatusProps = {
  navigation: NativeStackNavigationProp<
    ProAppNavigatorRouteList,
    "EquipmentStatus"
  >;
  route: RouteProp<ProAppNavigatorRouteList, "EquipmentStatus">;
};

export default function EquipmentStatus({
  navigation,
  route: {
    params: { locationId, zoning },
  },
}: EquipmentStatusProps): JSX.Element {
  const { data, loading, startPolling, stopPolling } = useEquipmentStatusQuery({
    variables: { locationId },
    fetchPolicy: "cache-and-network",
  });

  const indoorDisabled = !data?.location?.statusIndoor;
  const outdoorDisabled = !data?.location?.statusOutdoor;
  const zoneDisabled = !data?.location?.statusZone;

  const [refreshing, setRefreshing] = useState(false);
  const isLoading = loading || refreshing;

  const items = useMemo(
    (): Item[] => [
      ...[
        {
          title: i18n.t("Detail.screenTitles.INDOOR", { scope }),
          rightElement:
            indoorDisabled && isLoading ? (
              <ActivityIndicator size={"small"} />
            ) : (
              undefined
            ),
          chevron: !indoorDisabled || !isLoading,
          navigate: {
            name: "EquipmentStatusDetails",
            params: {
              locationId,
              section: "INDOOR",
            },
          },
          disabled: indoorDisabled,
        },
        {
          title: i18n.t("Detail.screenTitles.OUTDOOR", { scope }),
          rightElement:
            outdoorDisabled && isLoading ? (
              <ActivityIndicator size={"small"} />
            ) : (
              undefined
            ),
          chevron: !outdoorDisabled || !isLoading,
          navigate: {
            name: "EquipmentStatusDetails",
            params: {
              locationId,
              section: "OUTDOOR",
            },
          },
          disabled: outdoorDisabled,
        },
      ],
      ...(zoning
        ? [
            {
              title: i18n.t("Detail.screenTitles.ZONE", { scope }),
              rightElement:
                zoneDisabled && isLoading ? (
                  <ActivityIndicator size={"small"} />
                ) : (
                  undefined
                ),
              chevron: !zoneDisabled || !isLoading,
              navigate: {
                name: "EquipmentStatusDetails",
                params: {
                  locationId,
                  section: "ZONE",
                },
              },
              disabled: zoneDisabled,
            },
          ]
        : []),
    ],
    [
      indoorDisabled,
      isLoading,
      locationId,
      outdoorDisabled,
      zoning,
      zoneDisabled,
    ]
  );

  const handle = useRef<number>();
  const [refreshStatus] = useRefreshStatusMutation({
    variables: { locationId },
    optimisticResponse: {
      refreshStatus: {
        __typename: "RefreshStatusSuccess",
        location: {
          __typename: "Location",
          id: locationId,
          statusIndoor: null,
          statusIndoorEEV: null,
          statusOutdoor: null,
          statusZone: null,
        },
      },
    },
    onCompleted({ refreshStatus: { __typename } }) {
      switch (__typename) {
        case "NotFound":
          navigation.goBack();
          break;
        case "Offline":
          Alert.alert(
            i18n.t("offlineAlert.title", { scope }),
            i18n.t("offlineAlert.message", { scope })
          );
          break;
        case "RefreshStatusSuccess":
          handle.current = setTimeout(() => {
            stopPolling();
            setRefreshing(false);
          }, 30000);
          startPolling(1000);
          break;
        default:
          throw new UnreachableCaseError(__typename);
      }
    },
  });

  useEffect(
    () => () => {
      stopPolling();
      handle.current && clearTimeout(handle.current);
      handle.current = undefined;
    },
    [stopPolling, handle]
  );

  const handleRefresh = useCallback(() => {
    refreshStatus();
    setRefreshing(true);
  }, [refreshStatus]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <HeaderButton
          disabled={refreshing}
          onPress={handleRefresh}
          text={i18n.t("refresh", { scope })}
        />
      ),
    });
  }, [handleRefresh, navigation, refreshing]);

  const handleItemPress = useCallback(
    (item: Item) => {
      if (item.navigate) {
        navigation.navigate(
          item.navigate.name as keyof ProAppNavigatorRouteList,
          item.navigate.params
        );
      }
    },
    [navigation]
  );

  return (
    <Background>
      <FlatList
        contentContainerStyle={styles.container}
        data={items}
        handleItemPress={handleItemPress}
        onRefresh={handleRefresh}
        refreshing={false}
      />
    </Background>
  );
}
