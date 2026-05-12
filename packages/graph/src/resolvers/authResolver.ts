import {
  isMultiError,
  isSingleError,
  isAxiosError,
  Token,
  Client,
} from "../ayla";

import {
  create,
  decode,
  AccessTokenPayload,
  RefreshTokenPayload,
  encodeTotp,
  decodeTotp,
} from "../utils/auth";
import {
  generatePassword,
  generateKsid,
  RESET_PASSWORD_TOKEN_LENGTH,
  ACCOUNT_CONFIRMATION_TOKEN_LENGTH,
} from "../utils/ayla";

import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  AccountStatus,
} from "../schema/resolvers-types";

const getPassword = async (aylaClient: Client): Promise<[string, string]> => {
  const [{ email }, { ksid }] = await Promise.all([
    aylaClient.profile(),
    aylaClient.userMetadata(),
  ]);

  return [email, generatePassword(email, ksid)];
};

export const resolver: Resolvers = {};

export const queryResolver: QueryResolvers = {};

export const mutationResolver: MutationResolvers = {
  checkEmail: async (_, { input: { email } }, { aylaClient }) => {
    const available = await aylaClient.checkEmail(email);

    return {
      __typename: "CheckEmailResult" as const,
      available,
    };
  },
  sendToken: async (_, { input: { email, skipDeepLink } }, { aylaClient }) => {
    let accountStatus = AccountStatus.Confirmed;
    const includeButton = skipDeepLink !== true;

    if (await aylaClient.checkEmail(email)) {
      return {
        __typename: "NotFound",
        message: "The email address is not registered",
      };
    }

    try {
      await aylaClient.sendPasswordResetEmail(email, { includeButton });
    } catch (e) {
      if (
        isMultiError(e) &&
        e.response.data.errors["base"]?.find(m =>
          m.includes("confirm your account")
        )
      ) {
        await aylaClient.sendConfirmationEmail(email, { includeButton });
        accountStatus = AccountStatus.Unconfirmed;
      } else {
        throw e;
      }
    }

    return {
      __typename: "SendTokenSuccess",
      accountStatus,
    };
  },
  signUp: async (
    _,
    { input: { email, firstName, lastName, country } },
    { aylaClient }
  ) => {
    try {
      await aylaClient.signUp(
        email,
        generatePassword(email),
        firstName,
        lastName,
        country
      );
      return {
        __typename: "SignUpSuccess",
      };
    } catch (e) {
      if (!isMultiError(e)) throw e;

      const { errors } = e.response.data;

      if (errors["email"]?.includes("has already been taken")) {
        return {
          __typename: "EmailTaken",
          message: "Email address has already been taken",
        };
      } else if (errors["email"]?.length) {
        return {
          __typename: "EmailInvalid",
          message: "Email address is invalid",
        };
      }

      if (errors["firstname"]?.length) {
        return {
          __typename: "FirstNameInvalid",
          message: `First name ${errors["firstname"][0]}`,
        };
      }

      if (errors["lastname"]?.length) {
        return {
          __typename: "LastNameInvalid",
          message: `Last name ${errors["lastname"][0]}`,
        };
      }

      if (errors["country"]?.length) {
        return {
          __typename: "CountryInvalid",
          message: `Country ${errors["country"][0]}`,
        };
      }

      throw e;
    }
  },
  signIn: async (_, { input: { email, token } }, { aylaClient }) => {
    const freshKsid = generateKsid();
    const freshPassword = generatePassword(email, freshKsid);

    let password: string | undefined;
    let ksid = freshKsid;

    if (token.startsWith("#")) {
      password = token.substring(1);
    } else {
      password = decodeTotp(email, token);
    }

    if (password) {
      try {
        const { accessToken: tempAccesstoken } = await aylaClient.login(
          email,
          password
        );

        aylaClient.setToken(tempAccesstoken);
      } catch {
        return {
          __typename: "TokenInvalid",
          message: "The token provided is invalid",
        };
      }
    } else {
      password = freshPassword;

      try {
        await aylaClient.resetPassword(
          token.slice(0, RESET_PASSWORD_TOKEN_LENGTH),
          freshPassword
        );
      } catch (e) {
        if (!(isSingleError(e) || isMultiError(e))) throw e;

        try {
          await aylaClient.confirmEmail(
            token.slice(-ACCOUNT_CONFIRMATION_TOKEN_LENGTH)
          );
          password = generatePassword(email);
        } catch (e) {
          if (isMultiError(e)) {
            if (!e.response.data.errors["confirmation_token"]?.length) throw e;

            return {
              __typename: "TokenInvalid",
              message: "The token provided is invalid",
            };
          }
        }
      }
    }

    if (!aylaClient.tokenSet()) {
      try {
        const { accessToken: tempAccesstoken } = await aylaClient.login(
          email,
          password
        );

        aylaClient.setToken(tempAccesstoken);
      } catch {
        return {
          __typename: "EmailInvalid",
          message: "The email provided is invalid",
        };
      }
    }

    try {
      const { ksid: currentKsid } = await aylaClient.userMetadata();

      if (currentKsid != null) {
        ksid = currentKsid;
      }

      if (currentKsid == null) {
        await aylaClient.writeUserMetadata("ksid", ksid);
      }
    } catch (e) {
      // TODO(nleach): Capture in Sentry
      console.error(e);
    }

    try {
      const { accessToken, refreshToken, expiresIn } = await aylaClient.login(
        email,
        password
      );

      const profile = await aylaClient.profile(accessToken);
      const { id } = profile;

      // We're going to prioritize responding to the client instead of
      // requiring that the changePassword request complete. If we
      // respond before that request finishes it will (likely) mean
      // that the accessToken we provide will be short-lived; however,
      // we can be relatively confident that the refreshToken will
      // still be valid because we already (attempted to) set the ksid
      await Promise.race([
        aylaClient.changePassword(password, generatePassword(email, ksid)),
        new Promise(resolve => setTimeout(resolve, 3000)),
      ]);

      return {
        __typename: "SignInSuccess" as const,
        accessToken: create<AccessTokenPayload>(
          { userId: id, email, accessToken },
          "access"
        ),
        refreshToken: create<RefreshTokenPayload>(
          { userId: id, refreshToken, email, ksid },
          "refresh",
          "1y"
        ),
        ttl: expiresIn,
        user: profile,
      };
    } catch {
      return {
        __typename: "EmailInvalid",
        message: "Could not set a new password",
      };
    }
  },
  refreshToken: async (_, { input: { token } }, { aylaClient }) => {
    try {
      const payload = decode<RefreshTokenPayload>(token, "refresh");

      let newToken: Token;

      try {
        newToken = await aylaClient.refreshToken(payload.refreshToken);
      } catch (e) {
        if (isAxiosError(e) && e.response?.status === 401) {
          newToken = await aylaClient.login(
            payload.email,
            generatePassword(payload.email, payload.ksid)
          );
        } else {
          throw e;
        }
      }

      const { accessToken, refreshToken, expiresIn } = newToken;
      const { ksid } = await aylaClient.setToken(accessToken).userMetadata();

      return {
        __typename: "RefreshTokenSuccess" as const,
        accessToken: create<AccessTokenPayload>(
          { userId: payload.userId, email: payload.email, accessToken },
          "access"
        ),
        refreshToken: create<RefreshTokenPayload>(
          { ...payload, ksid: (ksid || "").toString(), refreshToken },
          "refresh",
          "1y"
        ),
        ttl: expiresIn,
      };
    } catch (e) {
      return {
        __typename: "TokenInvalid",
        message: "Token could not be refreshed, sign in again",
      };
    }
  },
  signOut: async (_parent, { input: { token } }, { aylaClient }) => {
    let payload: AccessTokenPayload;

    try {
      payload = decode<AccessTokenPayload>(token, "access");
    } catch {
      return {
        __typename: "AccessTokenInvalid",
        message: "The supplied access token is no longer valid",
      };
    }

    aylaClient.setToken(payload.accessToken);

    const newKsid = generateKsid();
    let currentPassword: string;
    let newPassword: string;

    try {
      const [{ ksid }, { email }] = await Promise.all([
        aylaClient.userMetadata(),
        aylaClient.profile(payload.accessToken),
      ]);

      currentPassword = generatePassword(email, ksid);
      newPassword = generatePassword(email, newKsid);
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 401) {
        return {
          __typename: "AccessTokenInvalid",
          message: "The supplied access token is no longer valid",
        };
      }

      throw e;
    }

    await aylaClient.writeUserMetadata("ksid", newKsid);
    await aylaClient.changePassword(currentPassword, newPassword);

    return {
      __typename: "SignOutSuccess",
    };
  },
  generateLoginToken: async (_parent, _args, { aylaClient }) => {
    const [, token] = await getPassword(aylaClient);

    return {
      __typename: "GenerateLoginTokenSuccess",
      token,
    };
  },
  generateShareToken: async (_parent, _args, { aylaClient }) => {
    const [email, password] = await getPassword(aylaClient);

    const token = encodeTotp(email, password);

    return {
      __typename: "GenerateShareTokenSuccess",
      token,
    };
  },
  removeAccount: async (_parent, _args, { aylaClient }) => {
    await aylaClient.removeAccount();

    return {
      __typename: "RemoveAccountSuccess",
    };
  },
};
