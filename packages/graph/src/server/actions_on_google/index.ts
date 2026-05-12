import {
  smarthome,
  SmartHomeV1ExecuteRequest,
  Headers,
} from "actions-on-google";

import express from "express";

import { isEmpty, merge } from "lodash";

import { v4 as uuidv4 } from "uuid";

import { MiddlewareOptions } from "../middleware";
import { SMARTHOME_SERVICE_ACCOUNT_JWT } from "../../config";
import { AccessTokenPayload, decode } from "../../utils/auth";

import onExecute from "./execute";
import onQuery from "./query";
import onSync from "./sync";
import { StateFieldsFragment } from "./graph";
import { getBearerToken } from "./utils";

const actions = smarthome({
  jwt: SMARTHOME_SERVICE_ACCOUNT_JWT,
});

const wrappedOnExecute = async (
  body: SmartHomeV1ExecuteRequest,
  headers: Headers
): ReturnType<typeof onExecute> => {
  const result = await onExecute(body, headers);

  try {
    const token = getBearerToken(headers);
    const { userId } = decode<AccessTokenPayload>(token ?? "", "access");

    const states: Record<string, StateFieldsFragment> = {};

    result.payload.commands.forEach(command => {
      const [id] = command.ids;
      const state = command.states;

      if (command.status === "SUCCESS" && id && state) {
        states[id] = merge({}, states[id], state);
      }
    });

    if (!isEmpty(states)) {
      actions
        .reportState({
          agentUserId: userId,
          requestId: uuidv4(),
          payload: {
            devices: {
              states,
            },
          },
        })
        .catch(() => {
          // TODO: Log in Sentry
        });
    }
  } catch {
    // The request wasn't properly authenticated with a Bearer token
  }

  return result;
};

actions.onExecute(wrappedOnExecute);
actions.onQuery(onQuery);
actions.onSync(onSync);

export default function applyMiddleware({
  app,
  path = "/fulfillment",
}: MiddlewareOptions): void {
  app.use(path, express.json({ strict: false }));

  // The return type is a Promise because the same value is intended
  // to be compatible with multiple execution interfaces (e.g.
  // Express, Lambda, etc)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.post(path, actions);

  return;
}
