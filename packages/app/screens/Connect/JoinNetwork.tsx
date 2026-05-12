import React, { useContext, useCallback } from "react";
import { View, StyleSheet, StyleProp, TextStyle } from "react-native";

import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ConnectThermostatNavigatorRouteList } from "~/navigators/ConnectThermostatNavigator";

import { captureException } from "@sentry/react-native";

import { ProvisioningContext } from "~/contexts";

import i18n from "~/i18n";

import ActivityIndicator from "~/components/ActivityIndicator";

import Layout from "./Layout";

const scope = "Screens.Authenticated.ConnectThermostatNavigator.JoinNetwork";

export type JoinNetworkProps = {
  navigation: NativeStackNavigationProp<
    ConnectThermostatNavigatorRouteList,
    "JoinNetwork"
  >;
  route: RouteProp<ConnectThermostatNavigatorRouteList, "JoinNetwork">;
};

const styles = StyleSheet.create({
  alertPlaceholder: {
    height: 180,
    justifyContent: "center",
  },
});

const titleStyle: StyleProp<TextStyle> = {
  width: 290,
};

export default function JoinNetwork(props: JoinNetworkProps): JSX.Element {
  const { navigation, route } = props;
  const ssid = route.params?.ssid;

  const provision = useContext(ProvisioningContext);

  const getNetworks = useCallback(
    async (signal: AbortSignal): Promise<void> => {
      try {
        // We expect the previous screen to have initiated (or completed) the connection process
        if (!provision.connecting && !provision.connected) {
          return navigation.navigate("Setup");
        }

        console.debug("Waiting for connection");

        if (!(await provision.waitForConnection(60000))) {
          return navigation.navigate("ScanQRCode");
        }

        if (signal.aborted) {
          console.debug("Aborting scan");
          provision.disconnectFromDevice(false);
          return;
        }

        console.debug("Connected, waiting for device");

        try {
          await provision.waitForDevice(ssid, 10000, signal);
        } catch (e) {
          if (signal.aborted) {
            console.debug("Waiting for device failed after abort");
            provision.disconnectFromDevice(false);
            return;
          }
          console.debug(e);
          captureException(e);
          navigation.navigate("ScanQRCode");
          return;
        }

        console.debug("Device is ready, loading networks");

        const networks = await provision.networks(20000, signal);

        if (signal.aborted) {
          console.debug("Aborting scan");
          provision.disconnectFromDevice(false);
          return;
        }

        if (networks.length) {
          navigation.navigate("SelectWifi", { networks });
        } else {
          console.debug("No networks found");
          provision.disconnectFromDevice(false);
          navigation.navigate("ScanQRCode");
        }
      } catch (e) {
        console.debug(e);
        captureException(e);
        navigation.navigate("ScanQRCode");
      }
    },
    [navigation, provision, ssid]
  );

  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();
      const { signal } = controller;

      getNetworks(signal);

      return () => controller.abort();
    }, [getNetworks])
  );

  return (
    <Layout
      content={
        <View style={styles.alertPlaceholder}>
          <ActivityIndicator size="large" />
        </View>
      }
      title={i18n.t("title", { scope })}
      titleStyle={titleStyle}
      instructions={i18n.t("instructions", { scope })}
      activeIndex={2}
    />
  );
}
