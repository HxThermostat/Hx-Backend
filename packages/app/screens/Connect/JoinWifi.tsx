import React, { useState, useContext, useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ConnectThermostatNavigatorRouteList } from "~/navigators/ConnectThermostatNavigator";

import { captureMessage, Severity } from "@sentry/react-native";

import { ProvisioningContext } from "~/contexts";

import i18n from "~/i18n";

import TextInputWithLabel from "~/components/Inputs/TextInputWithLabel";
import TextInputPassword from "~/components/Inputs/TextInputPassword";

import spacing from "~/styles/spacing";

import Layout from "./Layout";
import { KohortFunnelEventStep, useKohortTracking } from "~/utils/kohort";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  inputs: {
    ...spacing.mttwentyeight,
    maxWidth: 320,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const scope = "Screens.Authenticated.ConnectThermostatNavigator.JoinWifi";

type JoinWifiScreenNavigationProp = NativeStackNavigationProp<
  ConnectThermostatNavigatorRouteList,
  "JoinWifi"
>;

export type JoinWifiProps = {
  navigation: JoinWifiScreenNavigationProp;
  route: RouteProp<ConnectThermostatNavigatorRouteList, "JoinWifi">;
};

export default function JoinWifi(props: JoinWifiProps): JSX.Element {
  const { navigation, route } = props;
  const { ssid } = route.params;

  const provision = useContext(ProvisioningContext);

  const [password, setPassword] = useState<string>("");
  const [connecting, setConnecting] = useState<boolean>(false);
  const { trackFunnel } = useKohortTracking();

  const registerDevice = useCallback(async (): Promise<void> => {
    trackFunnel({ step: KohortFunnelEventStep.Action });
    const locationId = await provision.register();

    if (!locationId) {
      captureMessage("Could not register device with Ayla", {
        level: Severity.Error,
      });

      if (locationId === undefined) {
        return Alert.alert(
          i18n.t("setupIncompleteAlert.title", { scope }),
          i18n.t("setupIncompleteAlert.message", { scope }),
          [
            {
              text: i18n.t("setupIncompleteAlert.restart", { scope }),
              style: "default",
              onPress: () => navigation.navigate("Setup"),
            },
            {
              text: i18n.t("setupIncompleteAlert.tryAgain", { scope }),
              onPress: registerDevice,
            },
          ]
        );
      }

      return Alert.alert(
        i18n.t("setupFailedAlert.title", { scope }),
        i18n.t("setupFailedAlert.message", { scope }),
        [
          {
            text: i18n.t("setupFailedAlert.tryAgain", { scope }),
            onPress: () => navigation.navigate("Setup"),
          },
        ]
      );
    }

    navigation.navigate("NameDevice", { locationId });
  }, [navigation, provision]);

  const handleLogin = useCallback(async (): Promise<void> => {
    setConnecting(true);
    const connected = await provision.connectDeviceToNetwork(ssid, password);

    captureMessage("Could not connect device to WiFi network", {
      level: Severity.Error,
    });

    if (!connected) {
      let onPress: () => Promise<void>;

      if (await provision.isConnected()) {
        // If the user is still connected to the device, let them try a different password
        onPress = () => {
          setConnecting(false);
          setPassword("");
          return Promise.resolve();
        };
      } else {
        // Otherwise kick them back to the beginning of the flow
        onPress = async () => {
          await provision.disconnectFromDevice();
          navigation.navigate("Setup");
        };
      }

      return Alert.alert(
        i18n.t("loginFailedAlert.title", { scope }),
        i18n.t("loginFailedAlert.message", { scope }),
        [
          {
            text: i18n.t("loginFailedAlert.tryAgain", { scope }),
            onPress,
          },
        ]
      );
    }

    console.warn("Connected to device, waiting for disconnect");

    await provision.disconnectFromDevice();

    console.warn("Disconnected, waiting for register");

    await registerDevice();
  }, [navigation, password, provision, registerDevice, ssid]);

  return (
    <Layout
      title={i18n.t("title", { scope })}
      content={
        <View style={styles.container}>
          <View style={styles.inputs}>
            <TextInputWithLabel
              editable={false}
              value={route.params.ssid}
              label={i18n.t("ssidLabel", { scope })}
            />
            <TextInputPassword
              onChangeText={v => setPassword(v)}
              value={password}
              label={i18n.t("passwordLabel", { scope })}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
          </View>
        </View>
      }
      buttonLabel={i18n.t("button", { scope })}
      buttonLoading={connecting}
      onPress={handleLogin}
      activeIndex={4}
    />
  );
}
