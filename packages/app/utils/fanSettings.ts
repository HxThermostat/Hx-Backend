import { FanMode } from "~/graph";
import i18n from "~/i18n";

export const FAN_SETTINGS: Record<FanMode, string> = {
  AUTO: i18n.t("AUTO", { scope: "Common.fanModeTitles" }),
  ALWAYS: i18n.t("ALWAYS", { scope: "Common.fanModeTitles" }),
  FIFTEEN: i18n.t("FIFTEEN", { scope: "Common.fanModeTitles" }),
  THIRTY: i18n.t("THIRTY", { scope: "Common.fanModeTitles" }),
  FORTYFIVE: i18n.t("FORTYFIVE", { scope: "Common.fanModeTitles" }),
};

export const getFanSettingForSelectedOption = (value: string): FanMode =>
  Object.keys(FAN_SETTINGS).find(
    key => FAN_SETTINGS[key as FanMode] === value
  ) as FanMode;
