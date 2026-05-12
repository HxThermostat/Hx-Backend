import React, { useState, useContext, useCallback } from "react";
import {
  Alert,
  Linking,
  ViewStyle,
  TextStyle,
  View,
  StyleSheet,
} from "react-native";

import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ConnectThermostatNavigatorRouteList } from "~/navigators/ConnectThermostatNavigator";

import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, PermissionStatus, BarCodeScanningResult } from "expo-camera";

import { captureException } from "@sentry/react-native";

import { ProvisioningContext } from "~/contexts";

import i18n from "~/i18n";

import { timeoutSignal } from "~/utils/provisioning/utils";

import images from "~/assets/images";
import colors from "~/styles/color";

import Layout from "./Layout";

const scope = "Screens.Authenticated.ConnectThermostatNavigator.ScanQRCode";

type ScanQRCodeScreenNavigationProp = NativeStackNavigationProp<
  ConnectThermostatNavigatorRouteList,
  "ScanQRCode"
>;

export type ScanQRCodeProps = {
  navigation: ScanQRCodeScreenNavigationProp;
  router: RouteProp<ConnectThermostatNavigatorRouteList, "ScanQRCode">;
};

const styles = StyleSheet.create({
  scannerContainer: {
    alignSelf: "center",
  },
  barcodeScanner: {
    width: "80%",
    aspectRatio: 1,
  },
  qrOverlay: {
    position: "absolute",
    borderWidth: 5,
    borderColor: colors.white,
    width: "70%",
    aspectRatio: 1,
    top: "5%",
    left: "5%",
  },
  qrOverlayItem: {
    position: "absolute",
    borderWidth: 5,
    borderColor: colors.white,
    width: "12%",
    aspectRatio: 1,
    marginHorizontal: "4%",
    marginVertical: "4%",
  },
  qrOverlayItemTopLeft: {},
  qrOverlayItemTopRight: {
    right: 0,
  },
  qrOverlayItemBottomLeft: {
    bottom: 0,
  },
});

const hidden: ViewStyle & TextStyle = {
  display: "none",
};

export default function ScanQRCode(props: ScanQRCodeProps): JSX.Element {
  const { navigation } = props;

  const provision = useContext(ProvisioningContext);

  const [scanning, setScanning] = useState(false);

  useFocusEffect(useCallback(() => () => setScanning(false), []));

  useFocusEffect(
    useCallback(() => {
      if (provision.connected) {
        console.debug("Aborting a previous session");
        provision.disconnectFromDevice(false);
      }
    }, [provision])
  );

  async function handleStartScanning(): Promise<void> {
    const { status } = await Camera.requestPermissionsAsync();

    if (status === PermissionStatus.GRANTED) {
      setScanning(true);
    } else if (status === PermissionStatus.DENIED) {
      // If permissions are denied, force user to go to their settings
      // to enable them
      Alert.alert(
        i18n.t("alertTitle", { scope }),
        i18n.t("alertDescription", { scope }),
        [
          {
            text: i18n.t("openSettings", { scope }),
            onPress: () => Linking.openSettings(),
          },
        ],
        { cancelable: false }
      );
    }
  }

  const handleScanComplete = useCallback(
    (scanningResult: BarCodeScanningResult) => {
      if (scanningResult.data.startsWith("RIPL-")) {
        provision
          .connectToDevice(
            scanningResult.data,
            timeoutSignal((2 * 60 + 15) * 1000)
          )
          .catch(captureException);
        navigation.navigate("JoinNetwork", { ssid: scanningResult.data });
      }
    },
    [navigation, provision]
  );

  return (
    <Layout
      image={scanning ? undefined : images.qr}
      imageView={
        scanning ? (
          <View style={styles.scannerContainer}>
            <Camera
              style={styles.barcodeScanner}
              onBarCodeScanned={handleScanComplete}
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
              autoFocus={Camera.Constants.AutoFocus.on}
            />
            <View style={styles.qrOverlay}>
              <View
                style={[styles.qrOverlayItem, styles.qrOverlayItemTopLeft]}
              />
              <View
                style={[styles.qrOverlayItem, styles.qrOverlayItemTopRight]}
              />
              <View
                style={[styles.qrOverlayItem, styles.qrOverlayItemBottomLeft]}
              />
            </View>
          </View>
        ) : (
          undefined
        )
      }
      title={i18n.t("title", { scope })}
      instructions={i18n.t("instructions", { scope })}
      buttonLabel={i18n.t("button", { scope })}
      onPress={scanning ? undefined : handleStartScanning}
      buttonLoading={scanning}
      instructionStyle={scanning ? hidden : undefined}
      secondaryButtonLabel={i18n.t("enterManually", { scope })}
      secondaryOnPress={() => navigation.navigate("SSID")}
      activeIndex={2}
    />
  );
}
