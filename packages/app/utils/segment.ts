import { PixelRatio, Platform } from "react-native";

import { JsonMap, createClient, Plugin } from "@segment/analytics-react-native";

import { appVersion, nativeVersion } from "~/utils/version";

const WRITE_KEY = __DEV__
  ? "prMxrIQpUJyl9yhrtXsn0HKo8CSs42QY"
  : "ojCDBmpyusYMCtC9GOjdhjXZNFVim8Qx";

// Staging ingestion service
// const CUSTOM_INGESTION_URL = "https://analytics-ingestion-staging.kraftful.com/b";
// Production ingestion service
const CUSTOM_INGESTION_URL = "https://analytics-ingestion.kraftful.com/b";
// Local testing
// const CUSTOM_INGESTION_URL = "http://localhost:3003/b";

// Segment doesn't export the SegmentClient class so we have to define it locally like this
type LocalSegmentClient = ReturnType<typeof createClient>;

let client: LocalSegmentClient | undefined = undefined;
export const initializeSegmentAsync = (): void => {
  const segmentClient = createClient({
    writeKey: WRITE_KEY,
    trackAppLifecycleEvents: true,
    proxy: CUSTOM_INGESTION_URL,
  });

  segmentClient.init();

  client = segmentClient;
};

// A wrapper for accessing the initialized clients in a safe way
const withAnalytics = (cb: (analytics: LocalSegmentClient) => void): void => {
  if (client != null) {
    cb(client);
  }
}

export const trackSegmentScreen = (
  name: string,
  properties?: JsonMap
): void => {
  withAnalytics(analytics => {
    analytics.screen(name, properties);
  });
};

export const identifySegmentUser = (
  userId: string,
  customTraits: JsonMap
): void => {
  const traits = {
    ...customTraits,
    appVersion,
    nativeVersion,
    fontScale: PixelRatio.getFontScale(),
  };
  withAnalytics(analytics => {
    if (!userId) {
      const userInfo = analytics.userInfo.get();
      analytics.identify(userInfo.anonymousId, traits);
    } else {
      analytics.identify(userId, traits);
    }
  });
};

export const resetSegmentForUser = (): void => {
  withAnalytics(analytics => {
    analytics.reset();
  });
};

export const trackSegmentEvent = (
  eventName: string,
  properties?: JsonMap
): void => {
  withAnalytics(analytics => {
    analytics.track(eventName, properties);
  });
};

export const trackSegmentEventIOS: typeof trackSegmentEvent = (
  ...args: Parameters<typeof trackSegmentEvent>
) => {
  if (Platform.OS !== "ios") return;

  trackSegmentEvent(...args);
};

export const trackSegmentEventAndroid: typeof trackSegmentEvent = (
  ...args: Parameters<typeof trackSegmentEvent>
) => {
  if (Platform.OS !== "android") return;

  trackSegmentEvent(...args);
};

export function addPlugin<TPlugin extends Plugin>(plugin: TPlugin): void {
  withAnalytics(analytics => {
    analytics.add({plugin});
  });
}
