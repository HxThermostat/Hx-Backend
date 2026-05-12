import { ConnectionStatus, Demand, Mode, StateFieldsFragment } from "./graph";

import { fToC } from "./utils";

import {
  ActiveThermostatModes,
  DeviceState,
  isOwnDevice,
  OwnDevice,
  Status,
  TemperatureSettingSingleState,
  TemperatureSetttingDualState,
  ThermostatModes,
} from "./types";

export function activeThermostatMode(device: OwnDevice): ActiveThermostatModes {
  switch (device.activeDemand) {
    case Demand.Heat:
      return ActiveThermostatModes.HEAT;
    case Demand.Cool:
      return ActiveThermostatModes.COOL;
    default:
      if (effectiveMode(device.mode) === "off") {
        return ActiveThermostatModes.OFF;
      }
      return ActiveThermostatModes.NONE;
  }
}

export function deviceState(device?: StateFieldsFragment): DeviceState {
  if (!device) {
    return {
      status: Status.ERROR,
      errorCode: "deviceNotFound",
    };
  }

  if (!isOwnDevice(device)) {
    return {
      status: Status.ERROR,
      errorCode: "authFailure",
    };
  }

  return {
    status:
      device.location.connectionStatus === ConnectionStatus.Online
        ? Status.SUCCESS
        : Status.OFFLINE,
    online: device.location.connectionStatus === ConnectionStatus.Online,
    currentFanSpeedPercent: device.fan.cfm
      ? Math.round(device.fan.cfm * 100)
      : undefined,
    on: device.mode !== Mode.Off,
    activeThermostatMode: activeThermostatMode(device),
    thermostatHumidityAmbient: device.humidity,
    thermostatMode: effectiveMode(device.mode),
    thermostatTemperatureAmbient: fToC(device.indoorTemp),
    ...thermostatTemperatureSetpoint(device),
  };
}

export function effectiveMode(mode: Mode): ThermostatModes {
  switch (mode) {
    case Mode.Auto:
      return ThermostatModes.HEATCOOL;
    case Mode.Cool:
    case Mode.Maxcool:
      return ThermostatModes.COOL;
    case Mode.Heat:
    case Mode.Eheat:
    case Mode.Maxheat:
      return ThermostatModes.HEAT;
    case Mode.Off:
    default:
      return ThermostatModes.OFF;
  }
}

export function thermostatTemperatureSetpoint(
  device: OwnDevice
): TemperatureSettingSingleState | TemperatureSetttingDualState {
  switch (effectiveMode(device.mode)) {
    case "cool":
      return { thermostatTemperatureSetpoint: fToC(device.setpoints.cool) };
    case "heat":
      return { thermostatTemperatureSetpoint: fToC(device.setpoints.heat) };
    default:
      return {
        thermostatTemperatureSetpointHigh: fToC(device.setpoints.cool),
        thermostatTemperatureSetpointLow: fToC(device.setpoints.heat),
      };
  }
}
