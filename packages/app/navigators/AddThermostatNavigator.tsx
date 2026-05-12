import React from "react";
import { Platform } from "react-native";

import { createNativeStackNavigator } from "react-native-screens/native-stack";

import i18n from "~/i18n";

import ConnectThermostat from "./ConnectThermostatNavigator";

import DismissModalButton from "~/components/Touchables/DismissModalButton";

import { defaultScreenOptions } from "./modals";

export type AddThermostatRouteList = {
  ConnectThermostat: undefined;
};

const Stack = createNativeStackNavigator<AddThermostatRouteList>();

const scope = "Screens.Authenticated.AddThermostatNavigator";

export default function AddThermostatNavigator(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="ConnectThermostat"
        component={ConnectThermostat}
        options={{
          title: i18n.t("screenTitle", { scope: `${scope}.AddThermostat` }),
          headerRight: Platform.select({ ios: DismissModalButton }),
        }}
      />
    </Stack.Navigator>
  );
}
