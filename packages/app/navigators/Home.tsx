import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import HomeScreen from "~/screens/Home/Home";
import { ModalRouteList } from "./ModalNavigator";
import { NestedNavigatorParams } from "./helpers";

export type HomeNavigatorRouteList = {
  Home: undefined;
  ModalNavigator: NestedNavigatorParams<ModalRouteList>;
};

const Stack = createNativeStackNavigator<HomeNavigatorRouteList>();

export default function HomeNavigator(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
