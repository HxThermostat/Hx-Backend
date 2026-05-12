import { JWT, JWE, JWK } from "jose";
import { JWT_SIG_KEY, JWT_ENCRYPT_KEY, JWT_ISSUER } from "./config";

export * from "./totp";

const sigKey = JWK.asKey(JWT_SIG_KEY);
const encryptKey = JWK.asKey(JWT_ENCRYPT_KEY);

export interface GenericPayload {
  email: string;
  userId: string;
}

export type AccessTokenPayload = {
  accessToken: string;
} & GenericPayload;

export type RefreshTokenPayload = {
  refreshToken: string;
  ksid: string;
} & GenericPayload;

export const create = <T extends GenericPayload>(
  payload: T,
  iss: string,
  expiresIn = "1d"
): string => {
  const token = JWT.sign(payload, sigKey, {
    subject: payload.userId,
    expiresIn: expiresIn,
    issuer: `${JWT_ISSUER}.${iss}`,
  });

  return JWE.encrypt(token, encryptKey);
};

export const decode = <T extends GenericPayload>(
  payload: string,
  iss: string
): T => {
  const token = JWE.decrypt(payload, encryptKey);

  return JWT.verify(token.toString("utf8"), sigKey, {
    issuer: `${JWT_ISSUER}.${iss}`,
  }) as T;
};
