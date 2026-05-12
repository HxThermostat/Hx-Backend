import React, { useEffect } from "react";
import { Linking } from "react-native";

import { createNativeStackNavigator } from "react-native-screens/native-stack";

import { addNotificationResponseReceivedListener } from "expo-notifications";

import { useAuth, useController } from "~/contexts";

import { useChangeLocationAwayMutation } from "~/graph";

import i18n from "~/i18n";

import { extractNotificationData } from "~/utils/notifications";

import ModalNavigator, { ModalRouteList } from "./ModalNavigator";
import ModalHeader from "./ModalHeader";
import TabNavigator from "./TabNavigator";
import { NestedNavigatorParams } from "./helpers";

type HomeOwnerNavigatorRouteList = {
  Tabs: undefined;
  ModalNavigator: NestedNavigatorParams<ModalRouteList>;
};

const Stack = createNativeStackNavigator<HomeOwnerNavigatorRouteList>();

const scope = "Screens.ProApp.ProAppNavigator.CustomerView";

export default function HomeOwnerNavigator(): JSX.Element {
  const { isPro } = useAuth();
  const { setControllerId, setControllerIdByLocationId } = useController();

  const [changeAway] = useChangeLocationAwayMutation();

  useEffect(() => {
    // We don't want to register an extra handler when embedding this
    // navigator in the Pro navigation stack
    if (isPro) return;

    const subscription = addNotificationResponseReceivedListener(response => {
      const data = extractNotificationData(response);

      if (!data) return;

      switch (data.type) {
        case "GEOFENCE_LEAVE": {
          changeAway({
            variables: { input: { id: data.locationId, active: true } },
          });
          setControllerIdByLocationId(data.locationId);
          Linking.openURL("hx://home");
          break;
        }
        case "TEMPERATURE_NOTIFICATION":
        case "HUMIDITY_NOTIFICATION": {
          setControllerId(data.controllerId);
          Linking.openURL("hx://home");
          break;
        }
        case "FAULT_NOTIFICATION": {
          setControllerIdByLocationId(data.locationId);
          Linking.openURL("hx://home");
          break;
        }
      }
    });
    return () => subscription.remove();
  }, [changeAway, isPro, setControllerId, setControllerIdByLocationId]);

  return (
    <>
      {isPro && <ModalHeader title={i18n.t("screenTitle", { scope })} />}
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "transparent" },
          headerShown: false,
        }}
      >
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen
          name={"ModalNavigator"}
          component={ModalNavigator}
          options={{ stackPresentation: "formSheet" }}
        />
      </Stack.Navigator>
    </>
  );
}
