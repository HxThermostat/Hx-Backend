import { ApolloClient } from "@apollo/client";

import {
  RegisterLocationMutation,
  RegisterLocationMutationVariables,
  RegisterLocationDocument,
} from "~/graph";

import { addBreadcrumbException } from "~/utils/sentry";

import {
  dsn,
  regtoken,
  scanResults,
  setTime,
  startScan,
  status,
  wifiConnect,
  wifiStopAp,
  Status,
  Network,
} from "./ap";
import { connect, disconnect } from "./connect";
import { sleep, timeoutSignal } from "./utils";

export default class Provision {
  public connected: boolean;
  public connecting: boolean;

  protected apolloClient: ApolloClient<object>;
  protected deviceSsid: string | null;
  protected dsn: string | null;
  protected setupToken: string;
  protected scannedNetworks: Map<string, Network> = new Map();

  constructor(apolloClient: ApolloClient<object>) {
    this.apolloClient = apolloClient;
    this.connected = false;
    this.connecting = false;
    this.deviceSsid = null;
    this.dsn = null;
    this.setupToken = Math.random()
      .toString(16)
      .substr(2, 8);
  }

  public async connectToDevice(
    ssid?: string,
    signal?: AbortSignal
  ): Promise<void> {
    this.connected = false;
    this.connecting = true;

    try {
      // Sanity check to see if we're already on the device's network
      console.debug("Making sure we're not on the RIPL network");
      if ((await dsn()) != null) {
        console.debug("We're on the RIPL network!");
        this.connecting = false;
        this.connected = true;
        return;
      }
    } catch {
      // We _really_ don't care about the error here since we generally expect it to fail
    }

    console.debug("We're not on the RIPL network");
    try {
      await connect(ssid, signal);
    } finally {
      this.connecting = false;
    }

    this.connected = true;
  }

  public async waitForConnection(timeout = 10000): Promise<boolean | null> {
    const signal = timeoutSignal(timeout);

    while (!signal.aborted) {
      if (!this.connecting) {
        return this.connected;
      }
      await sleep(100);
    }

    return null;
  }

  public async waitForDevice(
    ssid?: string,
    timeout = 5000,
    manualAbort = new AbortSignal()
  ): Promise<void> {
    const signal = timeoutSignal(timeout);
    let lastError: Error | null = null;

    let res: Status | null = null;

    while (!(signal.aborted || manualAbort.aborted)) {
      try {
        res = await status();
        break;
      } catch (e) {
        lastError = e;
      }
    }

    if (manualAbort.aborted) {
      console.debug("Manually aborted");
      return;
    }

    if (!this.connected) throw new Error("Not connected to device");
    if (!res) throw lastError;

    this.dsn = res.dsn;

    if (ssid && ssid.startsWith("RIPL-")) {
      this.deviceSsid = ssid;
    } else {
      this.deviceSsid = `RIPL-${res.mac.replace(/:/g, "")}`;
    }

    try {
      await setTime();
    } catch (e) {
      addBreadcrumbException(e);
    }

    console.debug("DSN", this.dsn);
    console.debug("Device SSID", this.deviceSsid);

    await startScan();
  }

  public async isConnected(): Promise<boolean> {
    try {
      await status();
      return true;
    } catch {
      return false;
    }
  }

  public async networks(
    timeout = 10000,
    manualAbort: AbortSignal
  ): Promise<Network[]> {
    const signal = timeoutSignal(timeout);

    let lastSize = 0;
    while (lastSize === 0 || lastSize != this.scannedNetworks.size) {
      lastSize = this.scannedNetworks.size;

      try {
        console.debug("Scanning for networks...");
        const result = await scanResults();

        result.wifi_scan.results.map(r => this.scannedNetworks.set(r.ssid, r));
      } catch {
        //
      }

      if (this.scannedNetworks.size > 10) break;
      if (signal.aborted || manualAbort.aborted) break;

      await sleep(200);
    }

    return Array.from(this.scannedNetworks.values()).sort(
      (a, b) => b.bars - a.bars
    );
  }

  public async connectDeviceToNetwork(
    ssid: string,
    password: string,
    timeout = 30000
  ): Promise<boolean> {
    try {
      const signal = timeoutSignal(timeout);

      await wifiConnect(ssid, password, this.setupToken);

      while (!signal.aborted) {
        try {
          console.debug("Checking registration status...");
          const token = await regtoken();
          if (token != null) {
            return true;
          }
        } catch (e) {
          addBreadcrumbException(e);
        }

        await sleep(500);
      }

      return false;
    } catch (e) {
      addBreadcrumbException(e);
      return false;
    }
  }

  public async disconnectFromDevice(
    stopAp = true,
    timeout = 30000
  ): Promise<void> {
    if (!this.deviceSsid) return;

    if (stopAp) {
      console.debug("Asking device to stop broadcasting AP...");
      try {
        await wifiStopAp();
      } catch (e) {
        addBreadcrumbException(e);
      }
    }

    const signal = timeoutSignal(timeout);

    console.debug(`Disconnecting from ${this.deviceSsid}...`);
    await disconnect(this.deviceSsid);

    console.debug("Waiting for status endpoint to fail");

    while (!signal.aborted) {
      try {
        await status();
      } catch {
        break;
      }

      await sleep(1000);
    }
  }

  public async register(timeout = 30000): Promise<string | false | undefined> {
    if (!this.dsn) return false;

    const signal = timeoutSignal(timeout);

    let lastError: Error | undefined;

    while (!signal.aborted) {
      lastError = undefined;
      try {
        console.debug("Attempting to register device...");
        console.debug({
          dsn: this.dsn,
          setupToken: this.setupToken,
        });
        const { data } = await this.apolloClient.mutate<
          RegisterLocationMutation,
          RegisterLocationMutationVariables
        >({
          mutation: RegisterLocationDocument,
          variables: {
            input: {
              dsn: this.dsn,
              setupToken: this.setupToken,
            },
          },
        });

        if (data?.registerLocation.__typename === "RegisterLocationSuccess") {
          return data.registerLocation.location.id;
        }
      } catch (e) {
        lastError = e;
      }

      await sleep(500);
    }

    return lastError ? undefined : false;
  }
}
