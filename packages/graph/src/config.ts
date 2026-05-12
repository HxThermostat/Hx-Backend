import { SmartHomeJwt } from "actions-on-google";

import * as env from "env-var";

export const IS_PRODUCTION =
  env
    .get("NODE_ENV")
    .default("development")
    .asString()
    .toLowerCase() === "production";

export const PORT = env
  .get("PORT")
  .default("3000")
  .asInt();

export const PASSWORD_LENGTH = 8;

export const ENABLE_DATADOG = env
  .get("ENABLE_DATADOG")
  .required(false)
  .default(0)
  .asBool();

export const OAUTH_CREDENTIALS = env
  .get("OAUTH_CREDENTIALS")
  .default("")
  .asString()
  .split(";")
  .map(pair => {
    const [clientId, clientSecret] = pair.split("=");
    return { clientId, clientSecret };
  });

export const PUSH_IOS_ARN = env
  .get("PUSH_IOS_ARN")
  .required()
  .asString();

export const PUSH_ANDROID_ARN = env
  .get("PUSH_ANDROID_ARN")
  .required()
  .asString();

export const PUSH_ARN_BASE = env
  .get("PUSH_ARN_BASE")
  .default(PUSH_IOS_ARN)
  .required()
  .asString();

export const SMARTHOME_SERVICE_ACCOUNT_JWT = JSON.parse(
  Buffer.from(
    env
      .get("SMARTHOME_SERVICE_ACCOUNT_JWT")
      .required()
      .asString(),
    "base64"
  ).toString("ascii")
) as SmartHomeJwt;
