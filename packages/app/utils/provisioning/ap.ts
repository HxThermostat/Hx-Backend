import { timeoutSignal } from "./utils";

const GATEWAY_IP = "192.168.0.1";

export interface Status {
  dsn: string;
  mac: string;
}

export interface Network {
  ssid: string;
  type: string;
  security: string;
  bars: number;
}

interface WifiScan {
  wifi_scan: {
    results: Network[];
  };
}

interface WifiStatus {
  wifi_status: {
    connect_history: {
      error: number;
      message: string;
    }[];
  };
}

export const status = async (): Promise<Status> => {
  return (
    await fetch(`http://${GATEWAY_IP}/status.json`, {
      signal: timeoutSignal(1000),
    })
  ).json();
};

export const dsn = async (): Promise<string> => (await status()).dsn;

export const connected = async (): Promise<boolean> => {
  try {
    return typeof (await status()).dsn === "string";
  } catch {
    return false;
  }
};

export const setTime = async (): Promise<void> => {
  await fetch(`http://${GATEWAY_IP}/time.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ time: Math.floor(Date.now() / 1000) }),
    signal: timeoutSignal(1000),
  });
};

export const startScan = async (): Promise<void> => {
  await fetch(`http://${GATEWAY_IP}/wifi_scan.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const scanResults = async (): Promise<WifiScan> => {
  const res = await fetch(`http://${GATEWAY_IP}/wifi_scan_results.json`, {
    signal: timeoutSignal(1000),
  });
  return res.json();
};

export const wifiConnect = async (
  ssid: string,
  key: string,
  token: string
): Promise<void> => {
  await fetch(
    `http://${GATEWAY_IP}/wifi_connect.json?ssid=${encodeURIComponent(
      ssid
    )}&key=${encodeURIComponent(key)}&setup_token=${encodeURIComponent(token)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: timeoutSignal(1000),
    }
  );
};

export const regtoken = async (): Promise<string | undefined> => {
  try {
    const { regtoken } = await (
      await fetch(`http://${GATEWAY_IP}/regtoken.json`, {
        signal: timeoutSignal(1000),
      })
    ).json();

    return typeof regtoken === "string" && regtoken != ""
      ? regtoken
      : undefined;
  } catch {
    return undefined;
  }
};

export const wifiStopAp = async (): Promise<void> => {
  await fetch(`http://${GATEWAY_IP}/wifi_stop_ap.json`, {
    method: "PUT",
    signal: timeoutSignal(1000),
  });
};
