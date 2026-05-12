import Constants from "expo-constants";

import { version } from "../package.json";

export const nativeVersion = Constants.nativeAppVersion ?? version;
export const nativeBuild = Constants.nativeBuildVersion ?? "1";
export const appVersion = version;
