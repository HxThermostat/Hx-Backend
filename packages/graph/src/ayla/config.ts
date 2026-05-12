import * as env from "env-var";

export const AYLA_APP_ID = env
  .get("AYLA_APP_ID")
  .required(true)
  .asString();

export const AYLA_APP_SECRET = env
  .get("AYLA_APP_SECRET")
  .required(true)
  .asString();

export const AYLA_USER_SERVICE_URL = env
  .get("AYLA_USER_SERVICE_URL")
  .default("https://user-field.aylanetworks.com")
  .asUrlString();

export const AYLA_DEVICE_SERVICE_URL = env
  .get("AYLA_DEVICE_SERVICE_URL")
  .default("https://ads-field.aylanetworks.com")
  .asUrlString();

export const AYLA_RULES_SERVICE_URL = env
  .get("ALYA_RULES_SERVICE_URL")
  .default("https://rulesservice-field.aylanetworks.com/rulesservice")
  .asUrlString();

export const AYLA_RULES_SERVICE_WEBHOOK_URL = env
  .get("AYLA_RULES_WEBHOOK_URL")
  .default("https://hx.kraftful.cloud/ars_webhook")
  .asUrlString();
