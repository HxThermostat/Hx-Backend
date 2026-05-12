import { Alert, PermissionsAndroid } from "react-native";

import WifiManager from "react-native-wifi-reborn";
import AndroidOpenSettings from "react-native-android-open-settings";

import i18n from "~/i18n";

import { connected } from "./ap";
import { isRNWifiError, sleep, timeoutSignal } from "./utils";

const scope = "Utils.provisioning.connect.android";

export const connect = async (
  ssid?: string,
  signal?: AbortSignal
): Promise<string | null> => {
  if (ssid && !ssid.startsWith("RIPL-"))
    throw new Error("SSID must start with RIPL-");

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: i18n.t("locationPermission.title", { scope }),
      message: i18n.t("locationPermission.message", { scope }),
      buttonNegative: i18n.t("locationPermission.deny", { scope }),
      buttonPositive: i18n.t("locationPermission.allow", { scope }),
    }
  );

  if (granted !== PermissionsAndroid.RESULTS.GRANTED)
    throw new Error("Location permission not granted");

  let currentSsid: string | null = null;
  let riplSsid = ssid;

  try {
    if (riplSsid == null) {
      let networks = await WifiManager.loadWifiList();

      if (!networks.map(n => n.SSID).find(ssid => ssid.startsWith("RIPL-"))) {
        networks = await WifiManager.reScanAndLoadWifiList();
      }

      riplSsid = networks
        .sort((a, b) => b.level - a.level) // We want to tie-break between networks by finding the one with the strongest signal
        .find(network => network.SSID.startsWith("RIPL-"))?.SSID;

      if (riplSsid == null) throw new Error("Could not find a RIPL network");
    }

    const onWifi = await WifiManager.connectionStatus();

    if (onWifi) {
      currentSsid = await WifiManager.getCurrentWifiSSID();

      if (currentSsid === riplSsid) {
        return null;
      }
    }

    console.debug("Connecting...");

    await WifiManager.connectToProtectedSSID(riplSsid, "", false);
  } catch (e) {
    if (await connected()) null;

    if (isRNWifiError(e)) {
      console.debug(e.code);
      switch (e.code) {
        case "locationServicesOff":
          Alert.alert(
            i18n.t("locationServicesOffAlert.title", { scope }),
            i18n.t("locationServicesOffAlert.message", { scope }),
            [
              {
                text: i18n.t("locationServicesOffAlert.openSettings", {
                  scope,
                }),
                style: "default",
                onPress: () => AndroidOpenSettings.locationSourceSettings(),
              },
            ]
          );
          break;
        case "couldNotEnableWifi":
          Alert.alert(
            i18n.t("couldNotEnableWifiAlert.title", { scope }),
            i18n.t("couldNotEnableWifiAlert.message", { scope }),
            [
              {
                text: i18n.t("couldNotEnableWifiAlert.openSettings", {
                  scope,
                }),
                style: "default",
                onPress: () => AndroidOpenSettings.wifiSettings(),
              },
            ]
          );
          break;
        case "couldNotScan":
          if (signal) {
            await sleep(1000, signal);

            if (!signal.aborted) {
              return connect(riplSsid, signal);
            }
          }

          Alert.alert(
            i18n.t("couldNotScanAlert.title", { scope }),
            i18n.t("couldNotScanAlert.message", { scope })
          );
          break;
        case "didNotFindNetwork":
        case "unableToConnect":
        case "timeoutOccurred":
          if (signal) {
            await sleep(1000, signal);

            if (!signal.aborted) {
              // Only retry for up to 30s (or the existing timeout,
              // whichever is first)
              return connect(riplSsid, timeoutSignal(30000, signal));
            }
          }
      }
    }

    throw e;
  }

  console.debug("Connected");

  console.debug("Enforcing WiFi usage");
  await WifiManager.forceWifiUsageWithOptions(true, { noInternet: true });

  return currentSsid;
};

export const disconnect = async (ssid: string): Promise<void> => {
  console.debug(`Disconnecting from ${ssid}...`);

  await WifiManager.forceWifiUsageWithOptions(false, { noInternet: false });
  console.debug("Unenforcing WiFi usage");

  await WifiManager.isRemoveWifiNetwork(ssid);

  console.debug("Disconnected");
};
