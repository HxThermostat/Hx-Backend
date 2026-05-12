import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import TextInputsScreen from "./screens/TextInputsScreen";
import ButtonsScreen from "./screens/ButtonsScreen";
import ComponentLibraryScreen from "./screens/ComponentLibraryScreen";

export type ComponentLibraryNavigatorRouteList = {
  ComponentLibraryScreen: undefined;
  TextInputsScreen: undefined;
  ButtonsScreen: undefined;
};

const Stack = createNativeStackNavigator<ComponentLibraryNavigatorRouteList>();

export default function ComponentLibraryNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        options={{ title: "Library" }}
        name="ComponentLibraryScreen"
        component={ComponentLibraryScreen}
      />
      <Stack.Screen
        options={{ title: "Buttons" }}
        name="ButtonsScreen"
        component={ButtonsScreen}
      />
      <Stack.Screen
        options={{ title: "Text Inputs" }}
        name="TextInputsScreen"
        component={TextInputsScreen}
      />
    </Stack.Navigator>
  );
}
