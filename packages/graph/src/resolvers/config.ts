import * as env from "env-var";

export const PRO_EMAILS = env
  .get("PRO_EMAILS")
  .default("kraftfulpro@gmail.com")
  .asArray(",")
  .map(s => s.toLowerCase());

export const PRO_UPGRADE_CODE = env
  .get("PRO_UPGRADE_CODE")
  .default("")
  .asString()
  .trim();

export const REVIEWS_ENABLED = env
  .get("REVIEWS_ENABLED")
  .default(1)
  .required()
  .asBool();

export const REVIEW_DELAY_MS = env
  .get("REVIEW_DELAY_MS")
  .default(2 * 7 * 24 * 60 * 60 * 1000)
  .required()
  .asIntPositive();

export const REVIEW_REPROMPT_DELAY_MS = env
  .get("REVIEW_REPROMPT_DELAY_MS")
  .default(6 * 7 * 24 * 60 * 60 * 1000)
  .required()
  .asIntPositive();

// Exclude a few users from reviews
export const REVIEW_SKIP_USER_IDS = new Set([
  // dsscpro1@gmail.com
  "6cdb00a6-025a-11ea-925f-0e59df4236ef",

  // dssctest1@gmail.com
  "6b7c4b34-91f3-11e9-b781-0a1625047750",

  // dssctest1@yahoo.com
  "384a5312-0297-11eb-9085-0a580ae958b3",

  // Amplitude cohort irbrasv
  "a6c9b0fe-ace7-11ea-bc75-0a580ae97d8b",
  "f0b7bed0-d1e6-11ea-9250-0a580ae9e792",
  "ebe4e44a-29ee-11eb-9bcf-0a580ae9ee8e",
  "b226d374-c38b-11e8-8191-0ea451014b92",
  "ed270440-5ed1-11e8-8b9f-0a3272bbb876",
  "4d2eb562-3a93-11e8-8316-0ee670b4af60",
  "fc4c7978-cd94-11e8-8a34-0ac87158abe6",
  "8fd567aa-b708-11ea-a1b3-0a580ae95fa2",
  "5a3c31ce-fe61-11e9-8a11-0a768a56b0a8",
  "44c3d910-735f-11e9-9d84-0a3364e1ff86",
  "39948dfe-86bb-11e9-8a26-0e403c5a3a78",
  "73951766-e8ae-11ea-bb73-0a580ae9a12f",
  "a59ff86c-cc12-11e8-b62d-0a3272bbb876",
  "8db92660-7d47-11e9-8223-0aec1d66ad4e",
  "6364334c-bb07-11ea-b57a-0a580ae9a214",
  "8c63d8ac-1e20-11eb-86b1-0a580ae970be",
  "93ee3e34-99ea-11e9-922c-0a88a8ee13e0",
  "5e65ed0e-1c82-11eb-a777-0a580ae916d5",
  "a6f9f6e6-96af-11e9-ad93-0e359747d170",
  "03921e78-bb13-11ea-b57a-0a580ae9a214",
  "d56a4666-17c8-11eb-be3c-0a580ae9f608",
  "cf8b4536-4747-11e9-9931-0ab106fe7bbc",
  "7d8f4ee4-81fe-11e8-8f5c-0e9382159dc5",
  "436e88c6-d93b-11e8-b05a-0eb6dafc2a26",
  "eed03428-44f0-11e9-ade9-0e8948ebe5d2",
  "a664775c-1544-11e9-98da-0ef0aee753ea",
  "012b78cc-2e0f-11eb-a77f-0a580ae9472d",
  "5133ea1e-dbe1-11e5-a869-0e148f4d91bf",
  "38f37c18-4286-11e8-8489-0ef7636f67fa",
  "4d5f5da8-bfac-11e9-9ba8-0ee9c4cd21e0",
  "278ec894-828d-11e5-9609-0ee0c870bcec",
  "d7252e9e-2236-11eb-bc1f-0a580ae90962",
  "382e68da-8d0c-11e8-9750-0ef7636f67fa",
  "896d3a9e-4864-11e6-8196-0ab3f06930bb",
  "496d517a-81ef-11e7-8f40-0ee51d704787",
  "21308978-ea1c-11ea-8135-0a580ae94416",
  "f65ae7fe-12ff-11eb-a27a-0a580ae9a6c9",
  "505d8ac2-be33-11e9-ba99-0ee9c4cd21e0",
  "bf0389ea-8b47-11ea-8afa-0a580ae911ce",
  "416fc838-94f2-11e8-9a43-0ea451014b92",
  "696e2664-fdc2-11ea-b2d2-0a580ae9816e",
  "cdc1796e-1682-11e9-87e7-0ef0aee753ea",
  "e17f7cd0-fea2-11ea-a5e7-0a580ae9e8e3",
  "1a4e702a-a67e-11ea-814f-0a580ae98a4d",
  "01957166-aa92-11e9-b6af-0aa78d01bad4",
  "1e22ff70-6de6-11ea-9265-0a580ae90d03",
  "635d9252-080b-11eb-8e04-0a580ae916a0",
  "82c0b456-866c-11ea-9aee-0a580ae9af95",
  "db280d46-13c6-11eb-a9ea-0a580ae954be",
  "7db52ff4-df8a-11e7-9d60-0ab553feed59",
  "f9093f7a-d8c1-11e8-b554-0ab32160e8e4",
  "498f9784-5047-11ea-8dfb-0a580ae90988",
  "eb305d18-ba8d-11e8-9187-0ea451014b92",
  "831c676e-c645-11e6-856c-0efc28165244",
  "16864cf0-0bed-11ea-8bae-0a81a67a115f",
  "91c704a8-b233-11ea-9ecb-0a580ae984cc",
  "fea80d44-7c9b-11e8-85c7-0a3272bbb876",
  "594dd00a-f503-11e8-b091-0ac78a651de0",
  "c1d4f52e-8e12-11e9-afed-0e3bb068b12a",
  "e0dbbb7e-592b-11e7-9fd6-0ab3f06930bb",
  "81db2f88-8a26-11e8-9dc8-0e9382159dc5",
  "b03d26d4-0b46-11e7-b353-0e9382159dc5",
  "1a1ce81a-98ab-11ea-a752-0a580ae9fe40",
  "f782a080-759b-11e8-a024-0a5d62639812",
  "df50acd2-10b3-11ea-91be-0a81a67a115f",
  "662d8cf6-5800-11e9-9f9d-0ec5cfa6485a",
  "25983676-dc09-11ea-8149-0a580ae95019",
  "113ce2c8-7e30-11e8-a413-0ea451014b92",
  "ce6bb730-c8fd-11e8-badf-0ee51d704787",
  "21c2cc5a-c9c7-11e9-a7d8-0e7661900370",
  "90139dcc-766e-11e8-bb3b-0ef7636f67fa",
  "1fbd9106-d35d-11ea-8ef0-0a580ae95cdf",
  "ffce1950-592f-11e8-94bb-0a3272bbb876",
  "12ceeb14-c834-11e9-b989-0a639097d146",
  "1f8ee220-fe88-11e9-a9d5-0eeeac4e5622",
  "aac2ccd2-20fe-11eb-af84-0a580ae988de",
  "d1781b80-10cc-11eb-bf54-0a580ae948b0",
  "4e459bb0-7b29-11e8-a42b-0ac87158abe6",
  "e25c3b24-f548-11ea-9527-0a580ae99c23",
  "a6b3a766-ba41-11ea-afe0-0a580ae95fa2",
  "71e1cd80-6c52-11e9-8c14-0e2c9e47c4de",
  "77d8b04c-4ea0-11ea-a99b-0a580ae9def4",
  "edb5d1e4-07fd-11ea-90c5-0a81a67a115f",
  "aa14f140-4c4a-11ea-9b7d-0a580ae9ec18",
  "10d140b4-4226-11e7-b05d-0ab3f06930bb",
  "fdb5b5be-4eac-11ea-8a09-0a580ae9d66f",
  "73e9ea16-c9a7-11e8-b443-0ab3f06930bb",
  "6b38dda6-b27f-11ea-ab8c-0a580ae934a5",
  "fb3b5b60-21d1-11eb-95ad-0a580ae91690",
  "3c60c518-6f71-11e9-b0a7-0abf7a2a263c",
  "899cc916-4dfc-11ea-9a41-0a580ae9098a",
  "a83186b8-5dfe-11e8-aa2d-0ef7636f67fa",
  "2e412326-e0de-11ea-8a28-0a580ae95e88",
  "e6b1c9dc-1cad-11eb-98f7-0a580ae916d5",
  "c88462ee-d0e6-11e9-bec0-0ac27b70bc14",
  "43dbb426-082f-11eb-9a11-0a580ae9ea4d",
  "85f5fe06-4b52-11ea-9ada-0a580ae9d78b",
  "32007a5a-2c70-11e7-9133-0ab553feed59",
  "4d81e52a-2b4f-11eb-9453-0a580ae9472d",
  "0bd225e0-fe04-11ea-9ad6-0a580ae9e3b4",
  "50ddcb16-c22d-11ea-a06d-0a580ae99189",
  "dda5f4ce-605f-11e8-99ae-0a3272bbb876",
]);

export const REVIEW_PROBABILITY = env
  .get("REVIEW_PROBABILITY")
  .default(0.1)
  .required()
  .asFloatPositive();

/** (2 weeks) Delay after install date before we prompt */
export const SURVEY_DELAY_MS = env
  .get("SURVEY_DELAY_MS")
  // 2 weeks
  .default(2 * 7 * 24 * 60 * 60 * 1000)
  .required()
  .asIntPositive();

export const SURVEY_PROBABILITY = env
  .get("SURVEY_PROBABILITY")
  .default(1.0)
  .required(false)
  .asFloatPositive();

/** (6 weeks) Delay before reprompting once a user has been prompted */
export const SURVEY_REPROMPT_DELAY_MS = env
  .get("SURVEY_REPROMPT_DELAY_MS")
  // 6 weeks
  .default(6 * 7 * 24 * 60 * 60 * 1000)
  .required()
  .asIntPositive();

/** (1 day) How long after the last response to show the prompt */
export const SURVEY_RESPONSE_KEEPAROUND_DELAY_MS = env
  .get("SURVEY_RESPONSE_KEEPAROUND_DELAY_MS")
  // 1 day
  .default(1 * 24 * 60 * 60 * 1000)
  .required()
  .asIntPositive();

export const SURVEY_SKIP_USER_IDS = new Set<string>([
  "842f5986-c155-11ea-8e76-0a580ae99189", // intelltest15@gmail (App Review)
  "4c1b068c-84cc-11ea-b979-0a580ae994a6", // kraftfulho@gmail (App Review)
]);

export const SURVEY_DOGFOOD_USER_IDS = new Set<string>([
  "6b7c4b34-91f3-11e9-b781-0a1625047750", // dssctest1@gmail
  "384a5312-0297-11eb-9085-0a580ae958b3", // dssctest1@yahoo
  "a86ae006-0b67-11ec-9673-0a580ae95b28", // jacob@kraftful
  "6ab9c8a4-8386-11ea-9acb-0a580ae90ed0", // nicky@kraftful
  "20ce91d8-0b67-11ec-8252-0a580ae93d56", // renat@kraftful
  "9b7ab740-8387-11ea-865b-0a580ae93c94", // yana@kraftful
  "bb6560e4-b5ac-11ea-9a9f-0a580ae9458b", // yanawelinder@gmail
]);

export const SURVEYS_ENABLED: boolean = env
  .get("SURVEYS_ENABLED")
  .default(1)
  .required(false)
  .asBool();
