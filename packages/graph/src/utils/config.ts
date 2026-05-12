import * as env from "env-var";

export { PASSWORD_LENGTH } from "../config";

export const PASSWORD_SALT = env
  .get("PASSWORD_SALT")
  .required(true)
  .asString();

export const SENDBIRD_API_TOKEN = env
  .get("SENDBIRD_API_TOKEN")
  .default("DEFAULT_SENDBIRD_TOKEN")
  .required()
  .asString();

export const SENDBIRD_APP_ID = env
  .get("SENDBIRD_APP_ID")
  .default("DEFAULT_SENDBIRD_APP_ID")
  .required()
  .asString();
