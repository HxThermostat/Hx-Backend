import { AndroidMarket } from "react-native-rate";

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const EXPIRES_AT_KEY = "accessTokenExpiresAt";

export const GRAPH_URL = "https://hx.yoursysteminfo.com/";

export const RATE_OPTIONS = {
  AppleAppID: "1105092523",
  GooglePackageName: "com.jci.RIPL",
  preferredAndroidMarket: AndroidMarket.Google,
};

// These are from the Sendbird dashboard
export const SENDBIRD_APP_ID = "53D6F28C-E0B9-428C-9F82-43AA6DB22034";
export const SENDBIRD_CHAT_MODERATOR_USER_ID =
  process.env.SENDBIRD_CHAT_MODERATOR_USER_ID ?? "223471";
export const SENDBIRD_CHAT_MODERATOR_PUBLIC_CHANNEL_URL =
  process.env.SENDBIRD_CHAT_MODERATOR_PUBLIC_CHANNEL_URL ??
  "sendbird_open_channel_11538_ed494552067593a39760fc79149736c30a39d30e";
