import axios, { AxiosRequestConfig } from "axios";
import crypto from "crypto";
import {
  uniqueNamesGenerator,
  Config,
  colors,
  animals,
} from "unique-names-generator";

import { RequestSurveySessionResult } from "../../schema/resolvers-types";

import { SENDBIRD_APP_ID, SENDBIRD_API_TOKEN } from "../config";

interface SendBirdUserResponse {
  user_id: string;
  nickname: string;
}

interface SendBirdErrorResponse {
  message: string;
  code: number;
  error: boolean;
}

interface SendBirdSessionToken {
  token: string;
  expires_at: number;
}

const SENDBIRD_API_URL_BASE = `https://api-${SENDBIRD_APP_ID}.sendbird.com/v3/`;

export const SENDBIRD_API_DEFAULTS: AxiosRequestConfig = {
  baseURL: SENDBIRD_API_URL_BASE,
  headers: {
    "Content-Type": "application/json; charset=utf8",
    "Api-Token": SENDBIRD_API_TOKEN,
  },
  // Resolve if the status code is less than 500 (handles 401's from checkIfUserExists gracefully)
  validateStatus: status => status < 500,
};

export const sendbirdClient = axios.create({
  ...SENDBIRD_API_DEFAULTS,
});

const animalNameConfig: Config = {
  dictionaries: [colors, animals],
  separator: "",
  style: "capital",
};

const isSendBirdErrorResponse = (
  response: unknown
): response is SendBirdErrorResponse => {
  if (response == null) return false;

  return Object.prototype.hasOwnProperty.call(response, "error");
};

export const generateUserNameFromEmail = (email: string): string => {
  const seed = crypto
    .createHash("sha256")
    .update(email)
    .digest()
    .readInt32LE();

  return uniqueNamesGenerator({
    ...animalNameConfig,
    seed,
  });
};

const checkIfUserExists = async (
  userId: string
): Promise<SendBirdUserResponse | null> => {
  const {
    data: userFindResponse,
    status,
  }: {
    data: SendBirdUserResponse | SendBirdErrorResponse;
    status: number;
  } = await sendbirdClient
    // https://sendbird.com/docs/chat/v3/platform-api/guides/user#2-create-a-user-3-http-request
    .get(`users/${userId}`);

  if (status === 401) return null;

  if (!userFindResponse) {
    throw new Error("Invalid find response");
  }

  if (isSendBirdErrorResponse(userFindResponse)) return null;

  if (!userFindResponse.user_id || !userFindResponse.nickname) {
    throw new Error("Invalid find response fields");
  }

  if (userFindResponse.user_id !== userId) {
    throw new Error(
      `Invalid find response user_id: ${userFindResponse.user_id}`
    );
  }

  return userFindResponse;
};

const findOrCreateUser = async (
  userId: string,
  userName: string
): Promise<SendBirdUserResponse> => {
  const foundUser = await checkIfUserExists(userId);

  if (foundUser) return foundUser;

  // Create the user if necessary
  const {
    data: userCreateResponse,
  }: {
    data: SendBirdUserResponse | SendBirdErrorResponse;
  } = await sendbirdClient.post(
    // https://sendbird.com/docs/chat/v3/platform-api/guides/user#2-create-a-user-3-http-request
    "users",
    {
      // eslint-disable-next-line @typescript-eslint/camelcase
      user_id: userId,
      nickname: userName,
      // eslint-disable-next-line @typescript-eslint/camelcase
      profile_url: "",
    }
  );

  if (!userCreateResponse) {
    throw new Error("Invalid create response");
  }

  if (isSendBirdErrorResponse(userCreateResponse)) {
    throw new Error(`Invalid create response; ${userCreateResponse.message}`);
  }

  if (!userCreateResponse.user_id || !userCreateResponse.nickname) {
    throw new Error("Invalid create response fields");
  }

  if (userCreateResponse.user_id !== userId) {
    throw new Error(
      `Invalid create response user_id: ${userCreateResponse.user_id}`
    );
  }

  return userCreateResponse;
};

export const createUserSession = async (
  userId: string,
  userName: string
): Promise<RequestSurveySessionResult> => {
  await findOrCreateUser(userId, userName);

  // Create the session token
  const {
    data: userTokenResponse,
  }: {
    data: SendBirdSessionToken | SendBirdErrorResponse;
  } = await sendbirdClient.post(
    // https://sendbird.com/docs/chat/v3/platform-api/guides/user#2-issue-a-session-token-3-http-request
    `users/${userId}/token`,
    {
      // eslint-disable-next-line @typescript-eslint/camelcase
      user_id: userId,
    }
  );

  if (!userTokenResponse) {
    throw new Error("Invalid token response");
  }

  if (isSendBirdErrorResponse(userTokenResponse)) {
    throw new Error(`Invalid token response; ${userTokenResponse.message}`);
  }

  if (!userTokenResponse.token) {
    throw new Error("Invalid token response; token");
  }

  if (
    !userTokenResponse.expires_at ||
    !Number.isInteger(userTokenResponse.expires_at)
  ) {
    throw new Error("Invalid token response; expires_at");
  }

  return {
    userId,
    userName,
    sessionToken: userTokenResponse.token,
    sessionExpiresAt: new Date(userTokenResponse.expires_at).toISOString(),
  };
};
