import React from "react";
import { Platform } from "react-native";

import { createNativeStackNavigator } from "react-native-screens/native-stack";

import i18n from "~/i18n";

import SchedulesScreen from "~/screens/Schedules/Schedules";

import Background from "~/components/Background";

import { NestedNavigatorParams, largeTitle } from "./helpers";

import { ModalRouteList } from "./ModalNavigator";

export type SchedulesNavigatorRouteList = {
  Schedules: undefined;
  ModalNavigator: NestedNavigatorParams<ModalRouteList>;
};

const scope = "Screens.Authenticated.SchedulesNavigator.Schedules";
const Stack = createNativeStackNavigator<SchedulesNavigatorRouteList>();

export default function SchedulesNavigator(): JSX.Element {
  return (
    <Background>
      <Stack.Navigator
        screenOptions={{
          ...largeTitle,
        }}
      >
        <Stack.Screen
          name="Schedules"
          component={SchedulesScreen}
          options={{
            title: i18n.t("title", {
              scope,
            }),
            headerShown: Platform.OS !== "android",
            headerLargeTitle: true,
          }}
        />
      </Stack.Navigator>
    </Background>
  );
}
