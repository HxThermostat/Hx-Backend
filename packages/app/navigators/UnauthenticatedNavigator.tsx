import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import EnterEmailAddress from "~/screens/Unauthenticated/EnterEmailAddress";
import EnterNewSignUpInfo from "~/screens/Unauthenticated/EnterNewSignUpInfo";
import EmailConfirmation from "~/screens/Unauthenticated/EnterEmailConfirmation";

import i18n from "~/i18n";

export type UnauthenticatedNavigatorRouteList = {
  EnterEmailAddress: undefined;
  EnterNewSignUpInfo: {
    email: string;
  };
  EnterEmailConfirmation: {
    email: string;
    emailToken?: string; // the deep link will contain the token and the email
  };
};
const scope = "Screens.Unauthenticated";

const Stack = createNativeStackNavigator<UnauthenticatedNavigatorRouteList>();

export default function UnauthenticatedNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
        headerHideShadow: true,
      }}
      initialRouteName={"EnterEmailAddress"}
    >
      <Stack.Screen
        options={{ title: "", headerShown: false }}
        name="EnterEmailAddress"
        component={EnterEmailAddress}
      />
      <Stack.Screen
        name="EnterNewSignUpInfo"
        options={{
          title: i18n.t("screenTitle", {
            scope: `${scope}.EnterNewSignUpInfo`,
          }),
          headerBackTitle: i18n.t("headerBackTitle", {
            scope: `${scope}.EnterNewSignUpInfo`,
          }),
        }}
        component={EnterNewSignUpInfo}
      />
      <Stack.Screen
        name="EnterEmailConfirmation"
        options={{
          title: i18n.t("screenTitle", {
            scope: `${scope}.EnterEmailConfirmation`,
          }),
          headerBackTitle: i18n.t("headerBackTitle", {
            scope: `${scope}.EnterEmailConfirmation`,
          }),
        }}
        component={EmailConfirmation}
      />
    </Stack.Navigator>
  );
}
