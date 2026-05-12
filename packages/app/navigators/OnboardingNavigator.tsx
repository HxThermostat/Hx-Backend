import React from "react";

import { createNativeStackNavigator } from "react-native-screens/native-stack";

import colors from "~/styles/color";

import { NestedNavigatorParams } from "./helpers";
import ModalNavigator, { ModalRouteList } from "./ModalNavigator";
import ConnectThermostatNavigator from "./ConnectThermostatNavigator";
import Welcome from "~/screens/ProApp/Welcome";
import HeaderButton from "~/components/Touchables/HeaderButton";
import { useAuth } from "~/contexts";

export type OnboardingNavigatorRouteList = {
  Pro: undefined;
  Homeowner: undefined;
  ModalNavigator: NestedNavigatorParams<ModalRouteList>;
};

const Stack = createNativeStackNavigator<OnboardingNavigatorRouteList>();

export default function OnboardingNavigator(): JSX.Element {
  const { signOut, isPro } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
        headerHideShadow: true,
      }}
    >
      {isPro ? (
        <Stack.Screen
          options={{
            title: "",
            // transparent header isn't working on android, so we fake it above by hiding the header and offsetting the content
            headerStyle: { backgroundColor: colors.linearBGStart },
            // eslint-disable-next-line react/display-name
            headerRight: () => (
              <HeaderButton text="Logout" onPress={() => signOut(true, "onboarding-navigator-header-logout")} />
            ),
          }}
          name="Pro"
          component={Welcome}
        />
      ) : (
        <Stack.Screen
          name="Homeowner"
          component={ConnectThermostatNavigator}
          options={{ headerShown: false }}
        />
      )}
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
