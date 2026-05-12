import { Alert } from "react-native";
import WifiManager from "react-native-wifi-reborn";

import i18n from "~/i18n";

import { connected } from "./ap";
import { isRNWifiError, sleep, timeoutSignal } from "./utils";

const scope = "Utils.provisioning.connect.ios";

export const connect = async (
  ssid?: string,
  signal?: AbortSignal
): Promise<string | null> => {
  if (ssid && !ssid.startsWith("RIPL-"))
    throw new Error("SSID must start with RIPL-");

  if (ssid === "RIPL-") throw new Error("SSID must not be a prefix");

  const ssidOrPrefix = ssid ?? "RIPL-";

  try {
    if (ssidOrPrefix === "RIPL-") {
      // Prefix connections are only available on iOS 13+
      console.debug(`Connecting to best match for ${ssidOrPrefix}`);
      await WifiManager.connectToSSIDPrefix(ssidOrPrefix);
    } else {
      console.debug(`Connecting to exact match for ${ssidOrPrefix}`);
      await WifiManager.connectToSSID(ssidOrPrefix);
    }
  } catch (e) {
    if (await connected()) null;

    if (isRNWifiError(e)) {
      // Retry when possible
      switch (e.code) {
        case "couldNotDetectSSID":
        case "unableToConnect":
        case "invalid":
          if (signal) {
            await sleep(1000, signal);

            if (!signal.aborted) {
              // Only retry for up to 30s (or the existing timeout,
              // whichever is first)
              return connect(ssid, timeoutSignal(30000, signal));
            }
          }
      }

      switch (e.code) {
        case "unableToConnect":
          Alert.alert(
            i18n.t("unableToConnectAlert.title", { scope }),
            i18n.t("unableToConnectAlert.message", { scope })
          );
          break;
      }
    }

    throw e;
  }

  return null;
};

export const disconnect = async (ssid: string): Promise<void> => {
  console.debug(`Disconnecting from ${ssid}...`);
  await WifiManager.disconnectFromSSID(ssid);

  console.debug("Disconnected");
};
