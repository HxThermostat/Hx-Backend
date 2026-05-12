import express from "express";

import { v4 as uuidv4 } from "uuid";

import {
  buildExecutor,
  CheckEmailDocument,
  RefreshTokenDocument,
  SendTokenDocument,
  SignInDocument,
} from "./graph";

import { MiddlewareOptions } from "../middleware";

import { OAUTH_CREDENTIALS } from "../../config";
import { create, decode, RefreshTokenPayload } from "../../utils/auth";

interface AuthorizationParams {
  client_id?: string;
  redirect_uri?: string;
  state?: string;
  response_type?: string;
}

interface SignInBody {
  email: string;
  token?: string;
}

interface ExchangeBody {
  client_id?: string;
  client_secret?: string;
  grant_type?: "authorization_code";
  code?: string;
  redirect_uri?: string;
}

interface RefreshBody {
  client_id?: string;
  client_secret?: string;
  grant_type?: "refresh_token";
  refresh_token?: string;
}

type TokenBody = ExchangeBody | RefreshBody;

export default async function applyMiddleware({
  app,
  path: prefix = "",
}: MiddlewareOptions): Promise<void> {
  const execute = await buildExecutor();

  app.get<unknown, unknown, unknown, AuthorizationParams>(
    `${prefix}/auth`,
    (req, res) => {
      const clientId = req.query.client_id ?? req.cookies.client_id;
      const redirectUri =
        req.query.redirect_uri ?? req.cookies.redirect_uri ?? "";
      const state = req.query.state ?? req.cookies.state;

      /* Verify that the client_id matches the Google client ID you
         registered with Google, and that the redirect_uri matches the
         redirect URL provided by Google for your service. */
      let valid = false;
      switch (clientId) {
        case "com.google.smarthome_actions":
          // TODO(nleach): We should figure out a reasonable way to
          // also include the project ID in this test (possibly
          // including it in the source if we feel like that
          // information is git-safe)
          valid =
            valid ||
            redirectUri.includes(
              "https://oauth-redirect.googleusercontent.com/r/"
            );
          valid =
            valid ||
            redirectUri.includes(
              "https://oauth-redirect-sandbox.googleusercontent.com/r/"
            );
          break;
        case undefined:
          valid = false;
          break;
        default:
          valid = true;
      }

      // Even though we're hard-coding the clientId, we should make
      // sure we've actually configured the application with the
      // proper clientId + clientSecret pair
      valid =
        valid &&
        OAUTH_CREDENTIALS.some(({ clientId }) => clientId === clientId);

      if (!valid) {
        return res.render("pages/error", {
          title: "Error - Hx Thermostat",
        });
      }

      res.cookie("client_id", clientId, { maxAge: 1000 * 60 * 10 });
      res.cookie("redirect_uri", redirectUri, { maxAge: 1000 * 60 * 10 });
      res.cookie("state", state, { maxAge: 1000 * 60 * 10 });

      return res.render("pages/email", {
        title: "Sign In - Hx Thermostat",
      });
    }
  );

  app.use(`${prefix}/auth`, express.urlencoded());
  app.post<unknown, unknown, SignInBody>(
    `${prefix}/auth`,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (req, res) => {
      const {
        body: { email, token },
      } = req;
      if (token == null) {
        const {
          checkEmail: { available },
        } = await execute(CheckEmailDocument, {
          email,
        });

        if (available) {
          return res.render("pages/email", {
            title: "Sign In - Hx Thermostat",
            error: "email",
          });
        }

        await execute(SendTokenDocument, { email });
        return res.render("pages/code", {
          title: "Sign In - Hx Thermostat",
          email,
        });
      } else {
        const { signIn } = await execute(SignInDocument, {
          email,
          token,
        });

        switch (signIn.__typename) {
          case "SignInSuccess":
            /* Generate an authorization code for Google to use to
              access your API. The authorization code can be any
              string value, but it must uniquely represent the user,
              the client the token is for, and the code's expiration
              time, and it must not be guessable. You typically issue
              authorization codes that expire after approximately 10
              minutes. */
            res.cookie(
              "code",
              encodeURIComponent(
                create<RefreshTokenPayload>(
                  decode<RefreshTokenPayload>(signIn.refreshToken, "refresh"),
                  req.cookies.redirect_uri,
                  "10m"
                )
              ),
              { maxAge: 1000 * 60 * 10 }
            );
            return res.redirect(`${prefix}/connect`);
          case "EmailInvalid":
            return res.render("pages/email", {
              title: "Sign In - Hx Thermostat",
              error: true,
            });
          case "TokenInvalid":
            await execute(SendTokenDocument, { email });
            return res.render("pages/code", {
              title: "Sign In - Hx Thermostat",
              email,
              error: true,
            });
          default:
            return res.redirect(`${prefix}/auth`);
        }
      }
    }
  );

  app.get(`${prefix}/connect`, (req, res) => {
    if (!req.cookies.code) {
      return res.redirect(`${prefix}/auth`);
    }

    return res.render("pages/connect", {
      title: "Sign In - Hx Thermostat",
      url: `${req.cookies.redirect_uri}?code=${req.cookies.code}&state=${req.cookies.state}`,
    });
  });

  app.post(`${prefix}/connect`, (req, res) => {
    res.clearCookie("client_id");
    res.clearCookie("code");
    res.clearCookie("redirect_uri");
    res.clearCookie("state");

    return res.redirect(
      `${req.cookies.redirect_uri}?code=${req.cookies.code}&state=${req.cookies.state}`
    );
  });

  app.use(`${prefix}/token`, express.json({ strict: false }));
  app.use(`${prefix}/token`, express.urlencoded());
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.post<unknown, unknown, TokenBody>(`${prefix}/token`, async (req, res) => {
    try {
      let token: string;
      switch (req.body.grant_type) {
        case "authorization_code":
          token = create<RefreshTokenPayload>(
            decode<RefreshTokenPayload>(
              req.body.code ?? uuidv4(),
              req.body.redirect_uri ?? uuidv4()
            ),
            "refresh",
            "1y"
          );
          break;
        case "refresh_token":
          token = req.body.refresh_token ?? "";
          break;
        default:
          token = "";
          break;
      }

      const { refreshToken: result } = await execute(RefreshTokenDocument, {
        token,
      });

      if (result.__typename !== "RefreshTokenSuccess") {
        throw new Error(result.__typename);
      }

      /* eslint-disable @typescript-eslint/camelcase */
      return res.json({
        token_type: "BEARER",
        access_token: result.accessToken,
        refresh_token: result.refreshToken,
        expires_in: result.ttl,
      });
      /* eslint-enable @typescript-eslint/camelcase */
    } catch (e) {
      return res.json({
        error: "invalid_grant",
      });
    }
  });

  return;
}
