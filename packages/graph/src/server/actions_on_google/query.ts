import {
  Headers,
  SmartHomeV1QueryResponse,
  SmartHomeV1QueryRequest,
} from "actions-on-google";

import { asyncForEach } from "./utils";

import { buildExecutor, QueryDocument } from "./graph";

import { deviceState } from "./common";

import { DeviceState } from "./types";

export default async function onQuery(
  body: SmartHomeV1QueryRequest,
  headers: Headers
): Promise<SmartHomeV1QueryResponse> {
  const execute = await buildExecutor(headers);

  const deviceStates: Record<string, DeviceState> = {};

  await asyncForEach(body.inputs, async input => {
    const {
      payload: { devices },
    } = input;

    const { controllers } = await execute(QueryDocument, {});

    devices.forEach(({ id }) => {
      const device = controllers.find(controller => controller.id === id);

      deviceStates[id] = deviceState(device);
    });
  });

  return {
    requestId: body.requestId,
    payload: {
      devices: deviceStates,
    },
  };
}
