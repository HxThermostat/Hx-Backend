import { Platform } from "react-native";

import * as Localization from "expo-localization";
import i18n from "i18n-js";

import moment from "moment";
import "moment/locale/fr";

import en from "./en.json";
import fr from "./fr.json";

i18n.defaultLocale = "en";
i18n.fallbacks = true;
i18n.translations = { en, fr };
i18n.locale = Localization.locale;

moment.locale(i18n.locale);

const bestGuessRegionForAndroid = (locale: string): string => {
  // can't grab country code on Android using Localization.region
  if (locale.includes("-")) {
    // es-US, fr-CA, de-DE etc.
    return locale.split("-")[1];
  }
  return "US";
};

export const usersCurrentRegion =
  Platform.OS === "ios"
    ? Localization.region
    : bestGuessRegionForAndroid(i18n.locale);

export default i18n;
