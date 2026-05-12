import React, { useCallback, useContext, useRef, useState } from "react";

import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ConnectThermostatNavigatorRouteList } from "~/navigators/ConnectThermostatNavigator";

import { captureException } from "@sentry/react-native";

import images from "~/assets/images";

import { ProvisioningContext } from "~/contexts";

import i18n from "~/i18n";

import {
  isRNWifiError,
  sleep,
  timeoutSignal,
} from "~/utils/provisioning/utils";

import Layout from "./Layout";

const scope = "Screens.Authenticated.ConnectThermostatNavigator.Setup";

type SetupScreenNavigationProp = NativeStackNavigationProp<
  ConnectThermostatNavigatorRouteList,
  "Setup"
>;

export type SetupProps = {
  navigation: SetupScreenNavigationProp;
  router: RouteProp<ConnectThermostatNavigatorRouteList, "Setup">;
};

export default function Setup(props: SetupProps): JSX.Element {
  const { navigation } = props;

  const [connecting, setConnecting] = useState(false);
  const continueTapped = useRef(false);

  useFocusEffect(
    useCallback(() => {
      setConnecting(false);
    }, [])
  );

  const provision = useContext(ProvisioningContext);

  async function onPressContinue(): Promise<void> {
    setConnecting(true);

    // This is an arbitrary buffer to allow the thermostat to prepare
    // for connection the first time the user taps "Continue"
    if (!continueTapped.current) {
      await sleep(5000);
    } else {
      continueTapped.current = true;
    }

    try {
      await provision.connectToDevice(undefined, timeoutSignal(10000));
      navigation.navigate("JoinNetwork");
    } catch (e) {
      if (isRNWifiError(e)) {
        // Some of the WiFi errors are going to be unrecoverable for
        // us because they relate to the way the user's device is
        // configured (as opposed to the network the user is
        // connecting to), so it's likely better to leave the user on
        // this screen while they sort them out
        switch (e.code) {
          case "unavailableForOSVersion":
          case "userDenied":
          case "locationPermissionDenied":
          case "locationPermissionRestricted":
          case "locationPermissionMissing":
          case "locationServicesOff":
          case "couldNotEnableWifi":
            captureException(e);
            return;
        }
      }
      navigation.navigate("ScanQRCode");
    } finally {
      setConnecting(false);
    }
  }

  return (
    <Layout
      image={images.setup}
      title={i18n.t("title", { scope })}
      instructions={i18n.t("instructions", { scope })}
      buttonLabel={i18n.t("Common.continue")}
      buttonLoading={connecting}
      onPress={onPressContinue}
      activeIndex={1}
    />
  );
}
