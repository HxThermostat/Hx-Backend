import React, { useMemo, useCallback, useLayoutEffect } from "react";

import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ProAppNavigatorRouteList } from "~/navigators/ProAppNavigator";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuth } from "~/contexts";

import { useInstallerViewQuery, useReturnAccessMutation } from "~/graph";

import { useActionSheet } from "~/hooks/useActionSheet";

import i18n from "~/i18n";

import ActivityIndicator from "~/components/ActivityIndicator";
import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import SectionList, { Sections } from "~/components/Lists/SectionList";

import { DataHookProp, withQueryData, GoBack } from "~/screens/withQueryData";

import { DateFormatter } from "~/utils/display";

const scope = "Screens.ProApp.ProAppNavigator.InstallerView";

const format = DateFormatter("L");

export type InstallerViewProps = {
  navigation: NativeStackNavigationProp<
    ProAppNavigatorRouteList,
    "InstallerView"
  >;
  route: RouteProp<ProAppNavigatorRouteList, "InstallerView">;
  data: DataHookProp<typeof useInstallerViewQuery>;
};

function InstallerView({
  navigation,
  data: { location },
}: InstallerViewProps): JSX.Element {
  const { reload } = useAuth();
  if (!location || !location.controllers[0]) throw new GoBack();

  const share = location.share;

  const locationId = location.id;

  const { showActionSheetWithOptions } = useActionSheet();

  const [
    returnAccess,
    { loading: removeAccessLoading },
  ] = useReturnAccessMutation({
    variables: { shareId: share?.id ?? "" },
    update() {
      reload(true);
    },
  });

  const handlePressReturnAccess = useCallback(() => {
    showActionSheetWithOptions({
      items: [
        {
          label: i18n.t("returnAccessSheet.destructive", {
            scope,
          }),
          onPress: () => {
            (async () => {
              await returnAccess();
              navigation.goBack();
              returnAccess();
            })();
          },
          destructive: true,
        },
        {
          label: i18n.t("Common.cancel"),
          cancel: true,
        },
      ],
      title: i18n.t("returnAccessSheet.title", {
        scope,
        location: location.name,
      }),
      message: i18n.t("returnAccessSheet.message", {
        scope,
      }),
    });
  }, [location.name, navigation, returnAccess, showActionSheetWithOptions]);

  const accessItems = useMemo(
    (): Item[] | undefined =>
      share
        ? [
            {
              title: i18n.t("accessType", { scope }),
              subtitle: i18n.t(`access.${share.accessLevel}`, {
                scope,
              }),
            },
            {
              title: i18n.t("accessDuration", { scope }),
              subtitle: i18n.t(
                `duration.${share.expiresAt ? "temporary" : "permanent"}`,
                {
                  scope,
                  expiresAt: share.expiresAt
                    ? format(new Date(share.expiresAt))
                    : null,
                }
              ),
            },
            {
              title: i18n.t("returnAccess", { scope }),
              onPress: handlePressReturnAccess,
              ...(removeAccessLoading
                ? {
                    disabled: true,
                    rightIcon: <ActivityIndicator size={"small"} />,
                  }
                : {}),
            },
          ]
        : undefined,
    [handlePressReturnAccess, removeAccessLoading, share]
  );

  const generalItems = useMemo(
    (): Item[] => [
      {
        title: i18n.t("thermostatSoftware", { scope }),
        chevron: true,
        navigate: {
          name: "Software",
          params: { locationId },
        },
      },
      {
        title: i18n.t("systemLog", { scope }),
        chevron: true,
        navigate: {
          name: "SystemLog",
          params: { locationId },
        },
      },
      {
        title: i18n.t("equipmentStatus", { scope }),
        chevron: true,
        disabled: location.connectionStatus === "OFFLINE",
        navigate: {
          name: "EquipmentStatus",
          params: { locationId, zoning: location.zoning },
        },
      },
      ...(location.airflow
        ? [
            {
              title: i18n.t("zoneAirflowConfiguration", { scope }),
              chevron: true,
              disabled: location.connectionStatus === "OFFLINE",
              navigate: {
                name: "ZoneAirflowConfig",
                params: { locationId },
              },
            },
          ]
        : []),
      {
        title: i18n.t("customerView", { scope }),
        chevron: true,
        navigate: {
          name: "ModalNavigator",
          params: { screen: "CustomerView", params: { locationId } },
        },
      },
    ],
    [location.airflow, location.connectionStatus, location.zoning, locationId]
  );

  const items = useMemo((): Sections => {
    const sections: Sections = [];

    if (accessItems) {
      sections.push({
        title: i18n.t("sectionHeadings.access", { scope }),
        data: accessItems,
      });
    }

    sections.push({
      title: accessItems ? i18n.t("sectionHeadings.general", { scope }) : "",
      data: generalItems,
    });

    return sections;
  }, [accessItems, generalItems]);

  function handleItemPress(item: Item): void {
    item.onPress && item.onPress();
    item.navigate &&
      navigation.navigate(
        item.navigate.name as keyof ProAppNavigatorRouteList,
        item.navigate.params
      );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: location.name,
    });
  }, [navigation, location.name]);

  const { bottom } = useSafeAreaInsets();

  return (
    <Background>
      <SectionList
        alwaysBounceVertical={false}
        contentContainerStyle={{ paddingBottom: bottom }}
        contentInsetAdjustmentBehavior={"automatic"}
        handleItemPress={handleItemPress}
        sections={items}
      />
    </Background>
  );
}

export default withQueryData(useInstallerViewQuery, {
  useVariables: () => {
    const route = useRoute<InstallerViewProps["route"]>();
    return {
      locationId: route.params.locationId,
    };
  },
})(InstallerView);
