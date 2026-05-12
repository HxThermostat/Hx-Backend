import React, { useState } from "react";
import { Platform } from "react-native";

import { createNativeStackNavigator } from "react-native-screens/native-stack";

import { useApolloClient } from "@apollo/client";

import { ProvisioningContext, useAuth } from "~/contexts";
import Provision, { Network } from "~/utils/provisioning";

import StartScreen from "~/screens/Connect/Start";
import SetupScreen from "~/screens/Connect/Setup";
import ScanQRCodeScreen from "~/screens/Connect/ScanQRCode";
import SSIDScreen from "~/screens/Connect/SSID";
import JoinNetworkScreen from "~/screens/Connect/JoinNetwork";
import SelectWifiScreen from "~/screens/Connect/SelectWifi";
import JoinWifiScreen from "~/screens/Connect/JoinWifi";
import NameDeviceScreen from "~/screens/Connect/NameDevice";
import ConnectedScreen from "~/screens/Connect/Connected";
import ProfessionalAccessScreen from "~/screens/Settings/ProfessionalAccess";

import i18n from "~/i18n";

import Background from "~/components/Background";
import {
  defaultScreenOptions,
  CancelModalButton,
  HeaderLeftAndroid,
} from "./modals";
import HeaderButton from "~/components/Touchables/HeaderButton";
import colors from "~/styles/color";

export type ConnectThermostatNavigatorRouteList = {
  Welcome: undefined;
  Setup: undefined;
  ScanQRCode: undefined;
  SSID: undefined;
  JoinNetwork: { ssid: string } | undefined;
  SelectWifi: { networks: Network[] };
  JoinWifi: { ssid: string };
  NameDevice: { locationId: string };
  Connected: undefined;
  ProfessionalAccess: undefined;
};

const scope = "Screens.Authenticated.ConnectThermostatNavigator.ScreenTitles";
const Stack = createNativeStackNavigator<ConnectThermostatNavigatorRouteList>();

function ConnectThermostatNavigator({
  modal,
}: {
  modal?: boolean;
}): JSX.Element {
  const client = useApolloClient();
  const [provisioner] = useState(new Provision(client));
  const { signOut } = useAuth();

  return (
    <Background>
      <ProvisioningContext.Provider value={provisioner}>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: "transparent" },
            headerHideShadow: true,
            ...(modal ? defaultScreenOptions : {}),
          }}
        >
          <Stack.Screen
            // We want the header element to be rendered but transparent so that the content lines up with screens with the header
            options={
              modal
                ? {
                    title: i18n.t("addThermostat", { scope }),
                    headerBackTitle: i18n.t("Common.cancel"),
                    headerLeft: () => undefined,
                    ...Platform.select({
                      ios: {
                        headerLeft: CancelModalButton,
                      },
                      android: {
                        // eslint-disable-next-line react/display-name
                        headerLeft: (props: { tintColor?: string }) => (
                          <HeaderLeftAndroid
                            {...props}
                            title={i18n.t("addThermostat", { scope })}
                          />
                        ),
                      },
                    }),
                  }
                : {
                    title: "",
                    // transparent header isn't working on android, so we fake it above by hiding the header and offsetting the content
                    headerStyle: { backgroundColor: colors.linearBGStart },
                    // eslint-disable-next-line react/display-name
                    headerRight: () => (
                      <HeaderButton
                        text="Logout"
                        onPress={() => signOut(true, "connect-thermostat-navigator-header-logout")}
                      />
                    ),
                  }
            }
            name="Welcome"
            component={StartScreen}
          />

          <Stack.Screen
            options={{
              title: i18n.t("setup", { scope }),
              headerShown: true,
              headerBackTitle: i18n.t("addThermostatShort", { scope }),
            }}
            name="Setup"
            component={SetupScreen}
          />
          <Stack.Screen
            options={{
              title: i18n.t("findThermostat", { scope }),
              headerShown: true,
              headerBackTitle: i18n.t("setup", { scope }),
            }}
            name="ScanQRCode"
            component={ScanQRCodeScreen}
          />
          <Stack.Screen
            options={{
              title: i18n.t("findThermostat", { scope }),
              headerShown: true,
              headerBackTitle: i18n.t("setup", { scope }),
            }}
            name="SSID"
            component={SSIDScreen}
          />
          <Stack.Screen
            options={{
              title: i18n.t("joinNetwork", { scope }),
              headerShown: true,
              headerBackTitle: i18n.t("setup", { scope }),
            }}
            name="JoinNetwork"
            component={JoinNetworkScreen}
          />
          <Stack.Screen
            options={{
              title: i18n.t("selectWifi", { scope }),
              headerShown: true,
              headerBackTitle: i18n.t("find", { scope }),
            }}
            name="SelectWifi"
            component={SelectWifiScreen}
          />
          <Stack.Screen
            options={{
              title: i18n.t("wifiLogin", { scope }),
              headerShown: true,
              headerBackTitle: i18n.t("selectWifi", { scope }),
            }}
            name="JoinWifi"
            component={JoinWifiScreen}
          />
          <Stack.Screen
            options={{
              title: i18n.t("location", { scope }),
              headerShown: true,
              headerBackTitle: i18n.t("wifiLogin", { scope }),
            }}
            name="NameDevice"
            component={NameDeviceScreen}
          />
          <Stack.Screen
            options={{
              title: i18n.t("connected", { scope }),
              headerShown: true,
              headerBackTitle: i18n.t("location", { scope }),
            }}
            name="Connected"
            component={ConnectedScreen}
          />
          <Stack.Screen
            options={{
              title: i18n.t("professionalAccess", { scope }),
              headerShown: true,
              headerBackTitle: i18n.t("welcome", { scope }),
            }}
            name="ProfessionalAccess"
            component={ProfessionalAccessScreen}
          />
        </Stack.Navigator>
      </ProvisioningContext.Provider>
    </Background>
  );
}

export function ConnectThermostatModalNavigator(): JSX.Element {
  return <ConnectThermostatNavigator modal={true} />;
}

export default ConnectThermostatNavigator;
