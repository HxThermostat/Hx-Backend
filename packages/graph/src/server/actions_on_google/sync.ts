import {
  SmartHomeV1SyncRequest,
  SmartHomeV1SyncResponse,
  Headers,
} from "actions-on-google";

import {
  buildExecutor,
  AccessLevel,
  Mode,
  TemperatureUnit,
  SyncDocument,
} from "./graph";

import { fToC, isNotNull } from "./utils";

import {
  DeviceAttributes,
  isThermostatMode,
  ThermostatModes,
  ThermostatTemperatureUnit,
} from "./types";

export default async function onSync(
  body: SmartHomeV1SyncRequest,
  headers: Headers
): Promise<SmartHomeV1SyncResponse> {
  const execute = await buildExecutor(headers);

  const { controllers, me } = await execute(SyncDocument, {});

  if (!me) throw new Error();

  return {
    requestId: body.requestId,
    payload: {
      agentUserId: me.id,
      devices: controllers
        .filter(
          ({ location: { accessLevel } }) => accessLevel === AccessLevel.Owner
        )
        .map(controller => {
          const attributes: DeviceAttributes = {
            availableThermostatModes: controller.modes
              .map(mode => {
                switch (mode) {
                  case Mode.Off:
                    return ThermostatModes.OFF;
                  case Mode.Heat:
                    return ThermostatModes.HEAT;
                  case Mode.Cool:
                    return ThermostatModes.COOL;
                  case Mode.Auto:
                    return ThermostatModes.HEATCOOL;
                  default:
                    return null;
                }
              })
              .filter(isThermostatMode),
            thermostatTemperatureRange: {
              minThresholdCelsius: fToC(controller.coolRange.min),
              maxThresholdCelsius: fToC(controller.heatRange.max),
            },
            thermostatTemperatureUnit:
              me.temperatureUnit === TemperatureUnit.C
                ? ThermostatTemperatureUnit.C
                : ThermostatTemperatureUnit.F,
            bufferRangeCelsius: fToC(controller.deadband, false),
            supportsFanSpeedPercent: controller.fan?.cfm != null,
            queryOnlyOnOff: true,
          };

          return {
            id: controller.id,
            type: "action.devices.types.THERMOSTAT",
            traits: [
              attributes.supportsFanSpeedPercent
                ? "action.devices.traits.FanSpeed"
                : null,
              "action.devices.traits.OnOff",
              "action.devices.traits.TemperatureSetting",
            ].filter(isNotNull),
            name: {
              defaultNames: ["Hx Thermostat"],
              name: controller.name,
              nicknames: [],
            },
            willReportState: true,
            attributes: attributes,
            roomHint: controller.name,
            deviceInfo: {
              hwVersion: controller.location.version.outdoorControl,
              manufacturer: controller.location.brand,
              model: controller.location.model,
              swVersion: controller.location.version.application,
            },
          };
        }),
    },
  };
}
