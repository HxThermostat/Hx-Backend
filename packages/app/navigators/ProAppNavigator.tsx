import React, { useEffect } from "react";
import { Linking, Platform } from "react-native";

import { addNotificationResponseReceivedListener } from "expo-notifications";

import { createNativeStackNavigator } from "react-native-screens/native-stack";

import { StatusSection, useChangeLocationAwayMutation } from "~/graph";

import i18n from "~/i18n";

import { extractNotificationData } from "~/utils/notifications";

import ProHome from "~/screens/ProApp/ProHome/ProHome";
import EquipmentStatus from "~/screens/ProApp/InstallerView/EquipmentStatus";
import EquipmentStatusDetails from "~/screens/ProApp/InstallerView/EquipmentStatusDetails";
import InstallerView from "~/screens/ProApp/InstallerView/InstallerView";
import ZoneAirflowConfig from "~/screens/ProApp/InstallerView/ZoneAirflowConfig";
import AirflowSettings from "~/screens/ProApp/InstallerView/AirflowSettings";
import AirflowInstructions from "~/screens/ProApp/InstallerView/AirflowInstructions";
import Software from "~/screens/Settings/Software";
import SystemLog from "~/screens/Settings/SystemLogUser";

import colors from "~/styles/color";

import { NestedNavigatorParams, largeTitle } from "./helpers";
import ModalNavigator, { ModalRouteList } from "./ModalNavigator";

export type ProAppNavigatorRouteList = {
  ProHome: undefined;
  InstallerView: {
    locationId: string;
  };
  Software: {
    locationId: string;
  };
  SystemLog: {
    locationId: string;
  };
  ZoneAirflowConfig: {
    locationId: string;
  };
  AirflowSettings: {
    controllerId: string;
  };
  AirflowTest: {
    controllerId: string;
  };
  AirflowInstructions: undefined;
  EquipmentStatus: {
    locationId: string;
    zoning?: boolean;
  };
  EquipmentStatusDetails: {
    locationId: string;
    section: StatusSection;
  };
  ModalNavigator: NestedNavigatorParams<ModalRouteList>;
};

const Stack = createNativeStackNavigator<ProAppNavigatorRouteList>();

const scope = "Screens.ProApp.ProAppNavigator";

export default function ProAppNavigator(): JSX.Element {
  const [changeAway] = useChangeLocationAwayMutation();

  useEffect(() => {
    const subscription = addNotificationResponseReceivedListener(response => {
      const data = extractNotificationData(response);

      if (!data) return;

      switch (data.type) {
        case "GEOFENCE_LEAVE": {
          changeAway({
            variables: { input: { id: data.locationId, active: true } },
          });
          Linking.openURL(`hx://pro/customerView/${data.locationId}`);
          break;
        }
        case "TEMPERATURE_NOTIFICATION":
        case "HUMIDITY_NOTIFICATION": {
          Linking.openURL(`hx://pro/customerView/${data.locationId}`);
          break;
        }
        case "FAULT_NOTIFICATION": {
          Linking.openURL(`hx://pro/customerView/${data.locationId}`);
          break;
        }
      }

      switch (data.type) {
        case "GEOFENCE_LEAVE": {
          changeAway({
            variables: { input: { id: data.locationId, active: true } },
          });
          Linking.openURL(`hx://pro/customerView/${data.locationId}`);
        }
      }
    });
    return () => subscription.remove();
  }, [changeAway]);

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.black,
        },
        headerHideShadow: true,
      }}
    >
      <Stack.Screen
        options={{
          title: i18n.t("ProHome.screenTitle", { scope }),
          headerShown: Platform.OS !== "android",
          ...largeTitle,
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: colors.linearBGStart,
          },
        }}
        name="ProHome"
        component={ProHome}
      />
      <Stack.Screen
        name="InstallerView"
        options={{ title: i18n.t("InstallerView.screenTitle", { scope }) }}
        component={InstallerView}
      />
      <Stack.Screen
        name="SystemLog"
        options={{ title: i18n.t("SystemLog.screenTitle", { scope }) }}
        component={SystemLog}
      />
      <Stack.Screen
        name="Software"
        options={{ title: i18n.t("Software.screenTitle", { scope }) }}
        component={Software}
      />
      <Stack.Screen
        name="ZoneAirflowConfig"
        options={{
          headerCenter: () => null,
          title: i18n.t("ZoneAirflowConfig.screenTitle", { scope }),
        }}
        component={ZoneAirflowConfig}
      />
      <Stack.Screen
        name="AirflowSettings"
        options={{
          headerTitle: "",
        }}
        component={AirflowSettings}
      />
      <Stack.Screen
        name="AirflowInstructions"
        options={{
          headerTitle: "",
        }}
        component={AirflowInstructions}
      />
      <Stack.Screen
        name="EquipmentStatus"
        options={{ title: i18n.t("EquipmentStatus.screenTitle", { scope }) }}
        component={EquipmentStatus}
      />
      <Stack.Screen
        name="EquipmentStatusDetails"
        options={{
          title: i18n.t("EquipmentStatus.Detail.screenTitle", { scope }),
        }}
        component={EquipmentStatusDetails}
      />
      <Stack.Screen
        name="ModalNavigator"
        options={{
          stackPresentation: "modal",
          headerShown: false,
        }}
        component={ModalNavigator}
      />
    </Stack.Navigator>
  );
}
