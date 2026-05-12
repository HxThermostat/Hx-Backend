import * as SentryExpo from "sentry-expo";
import { Breadcrumb, CaptureContext } from "@sentry/types";

import { appVersion, nativeBuild, nativeVersion } from "~/utils/version";

const DSN =
  "https://2f8a53c6d6e74d50a0647f4b2b2268e5@o419848.ingest.sentry.io/5336970";

enum SENTRY_TAG {
  App = "app",
}

export function initSentry(): void {
  SentryExpo.init({
    enableInExpoDevelopment: true,
    dsn: DSN,
    environment: __DEV__ ? "dev" : "production",
    release: `com.kraftful.dev.hx.homeowner@${nativeVersion}+${nativeBuild}`,
    dist: nativeBuild,
  });
}

export function setApp(app: "homeowner" | "pro"): void {
  SentryExpo.Native.setTag(SENTRY_TAG.App, app);
}

export function setSentryUser(user: SentryExpo.Native.User | null): void {
  SentryExpo.Native.setUser(user);
}

export function logMessage(message: string): void {
  SentryExpo.Native.captureMessage(message);
}

export function addGenericBreadcrumb(breadcrumb: Breadcrumb): void {
  SentryExpo.Native.addBreadcrumb(breadcrumb);
}

export function addTransitionBreadcrumb(
  to: string,
  from?: string | undefined | null
): void {
  SentryExpo.Native.addBreadcrumb({
    type: "navigation",
    category: "navigation",
    data: {
      to,
      from: from ?? "N/A",
    },
  });
}

export function addBreadcrumbException(e: Error): void {
  SentryExpo.Native.addBreadcrumb({
    type: "debug",
    category: "Exception",
    data: {
      name: e.name,
      message: e.message,
    },
  });
}

export function captureException(e: Error, context: CaptureContext = {}): void {
  SentryExpo.Native.captureException(e, context);
}

export function captureMessage(
  message: string,
  context: CaptureContext = {}
): void {
  SentryExpo.Native.captureMessage(message, context);
}

export function forceSentryCrash(): void {
  SentryExpo.Native.nativeCrash();
}
