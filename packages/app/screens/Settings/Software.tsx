import React from "react";
import { StyleSheet, Platform } from "react-native";

import { Constants } from "react-native-unimodules";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import { useSystemInfoQuery } from "~/graph";

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
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerStyle: {
    alignItems: "center",
    ...spacing.ptsixtyfour,
    ...spacing.pbthirtytwo,
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.Software";

export type SoftwareProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList, "Software">;
  route: RouteProp<SettingsNavigatorRouteList, "Software">;
  data: DataHookProp<typeof useSystemInfoQuery>;
};

function Software({ data: { location } }: SoftwareProps): JSX.Element {
  if (!location) throw new GoBack();

  const { version, controllers } = location;

  let primaryZoneVersion: string | undefined;
  if (controllers[0].zoneSensor) {
    primaryZoneVersion = controllers[0].zoneSensor.version;
  }

  const zoneSoftware: Item[] = [];
  controllers.forEach(controller => {
    if (controller.zoneSensor) {
      zoneSoftware.push({
        title: controller.name,
        subtitle: i18n.t("zoneVersion", {
          scope,
          sensor: i18n.t(`sensor.${controller.zoneSensor.sensor}`, { scope }),
          version: controller.zoneSensor.version,
        }),
        rightTitleProps: {
          numberOfLines: undefined,
        },
        rightContentContainerStyle: {
          flex: 1,
        },
        
      });
    }
  });

  const DATA: Sections = [
    {
      data: [
        {
          title: i18n.t("outdoorControl", { scope }),
          subtitle: version.outdoorControl,
        },
        {
          title: i18n.t("thermostat", { scope }),
          subtitle: version.application,
          rightTitleProps: {
            numberOfLines: undefined,
          },
          rightContentContainerStyle: {
            flex: 1,
          },
        },
        ...(primaryZoneVersion
          ? [
              {
                title: i18n.t("primaryZoneControl", { scope }),
                subtitle: primaryZoneVersion,
              },
            ]
          : []),
        {
          title: i18n.t("app", { scope }),
          subtitle: Constants.nativeAppVersion || "",
        },
      ],
    },
    ...(zoneSoftware.length
      ? [
          {
            title: i18n.t("zoneSoftware", { scope }),
            data: zoneSoftware,
          },
        ]
      : []),
  ];

  return (
    <Background>
      <SectionList
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        sections={DATA}
      />
    </Background>
  );
}

export default withQueryData(useSystemInfoQuery, {
  useVariables() {
    const route = useRoute<SoftwareProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(Software);
