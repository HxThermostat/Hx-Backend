import {
  CONNECT_ERRORS,
  DISCONNECT_ERRORS,
  FORCE_WIFI_USAGE_ERRORS,
  IS_REMOVE_WIFI_NETWORK_ERRORS,
  LOAD_WIFI_LIST_ERRORS,
} from "react-native-wifi-reborn";

export type RNWifiErrorCodes =
  | keyof typeof CONNECT_ERRORS
  | keyof typeof DISCONNECT_ERRORS
  | keyof typeof IS_REMOVE_WIFI_NETWORK_ERRORS
  | keyof typeof FORCE_WIFI_USAGE_ERRORS
  | keyof typeof LOAD_WIFI_LIST_ERRORS;

interface RNWifiError {
  code: RNWifiErrorCodes;
  message: string;
}

export function isRNWifiError(e: unknown): e is RNWifiError {
  const code = (e as RNWifiError)?.code;

  return [
    ...Object.values(CONNECT_ERRORS),
    ...Object.values(DISCONNECT_ERRORS),
    ...Object.values(IS_REMOVE_WIFI_NETWORK_ERRORS),
    ...Object.values(FORCE_WIFI_USAGE_ERRORS),
    ...Object.values(LOAD_WIFI_LIST_ERRORS),
  ].includes(code);
}

export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise(resolve => {
    if (signal && signal.aborted) return resolve();

    const handle = setTimeout(resolve, ms);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(handle);
        resolve();
      });
    }
  });
}

export const timeoutSignal = (
  timeout: number,
  existing?: AbortSignal
): AbortSignal => {
  const controller = new AbortController();
  const { signal } = controller;

  const handle = setTimeout(() => controller.abort(), timeout);

  if (existing) {
    existing.addEventListener("abort", () => {
      clearTimeout(handle);
      controller.abort();
    });
  }

  return signal;
};
