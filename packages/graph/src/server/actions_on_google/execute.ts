import {
  Headers,
  SmartHomeV1ExecuteResponse,
  SmartHomeV1ExecuteRequest,
} from "actions-on-google";

import { deviceState, effectiveMode } from "./common";

import {
  buildExecutor,
  ChangeBothSetpointsDocument,
  ChangeOneSetpointDocument,
  ChangeOneSetpointMutation,
  ControllerDocument,
  Executor,
  LocationIdDocument,
  Mode,
  QueryDocument,
  SetFanSpeedDocument,
  SetModeDocument,
  Setpoint,
  StateFieldsFragment,
} from "./graph";

import { cToF } from "./utils";

import {
  Command,
  CommandSuccess,
  isOwnDevice,
  Status,
  ThermostatModes,
} from "./types";

export class ExecutionError extends Error {
  constructor(public errorCode: string = "hardError") {
    super(errorCode);
    Object.setPrototypeOf(this, ExecutionError.prototype);
  }
}

function isExecutionError(e: Error): e is ExecutionError {
  return (e as ExecutionError).errorCode != null;
}

function executionState(device: StateFieldsFragment): CommandSuccess["states"] {
  const state = deviceState(device);

  if (state.status !== Status.SUCCESS) {
    throw new ExecutionError();
  }

  const { status: _, ...rest } = state;

  // Remove any optionals since Google's Report State API doesn't like
  // nulls
  let prop: keyof typeof rest;
  for (prop in rest) {
    if (rest[prop] == null) {
      delete rest[prop];
    }
  }

  return rest;
}

async function SetFanSpeed(
  execute: Executor,
  id: string,
  cfm: number,
  locationId?: string
): Promise<StateFieldsFragment> {
  if (locationId == null) {
    const { controller } = await execute(LocationIdDocument, {
      controllerId: id,
    });

    if (!controller) {
      throw new ExecutionError("deviceNotFound");
    }

    locationId = controller.location.id;
  }

  const { changeFanCfm } = await execute(SetFanSpeedDocument, {
    locationId,
    cfm: Math.trunc(cfm) / 100,
  });

  switch (changeFanCfm.__typename) {
    case "NotFound":
      throw new ExecutionError("deviceNotFound");
    case "NotSupported":
      throw new ExecutionError("functionNotSupported");
    case "ChangeFanCfmSuccess": {
      const controller = changeFanCfm.location.controllers.find(
        ({ id: controllerId }) => controllerId === id
      );

      if (!controller) {
        throw new ExecutionError();
      }

      return controller;
    }
  }
}

async function SetFanSpeedRelative(
  execute: Executor,
  id: string,
  relative: number
): Promise<StateFieldsFragment> {
  const { controllers } = await execute(QueryDocument, {});
  const controller = controllers.find(controller => controller.id === id);

  if (!controller) {
    throw new ExecutionError("deviceNotFound");
  }

  const currentCfm = controller.fan?.cfm;

  if (currentCfm == null) {
    throw new ExecutionError("functionNotSupported");
  }

  return SetFanSpeed(
    execute,
    id,
    currentCfm + relative,
    controller.location.id
  );
}

async function OnOff(
  execute: Executor,
  controllerId: string,
  on: boolean
): Promise<StateFieldsFragment> {
  const { changeMode } = await execute(SetModeDocument, {
    controllerId,
    mode: on ? Mode.Auto : Mode.Off,
  });

  switch (changeMode.__typename) {
    case "NotFound":
      throw new ExecutionError("deviceNotFound");
    case "ChangeModeSuccess":
      return changeMode.controller;
  }
}

async function ThermostatTemperatureSetpoint(
  execute: Executor,
  controllerId: string,
  setpoint: number,
  controller?: StateFieldsFragment
): Promise<StateFieldsFragment> {
  if (controller == null) {
    ({ controller } = await execute(ControllerDocument, { controllerId }));
  }

  if (!controller || !isOwnDevice(controller)) {
    throw new ExecutionError("deviceNotFound");
  }

  let mutation: ChangeOneSetpointMutation;
  switch (effectiveMode(controller.mode)) {
    case ThermostatModes.COOL:
      mutation = await execute(ChangeOneSetpointDocument, {
        controllerId,
        setpoint: Setpoint.Cool,
        value: setpoint,
      });
      break;
    case ThermostatModes.HEAT:
      mutation = await execute(ChangeOneSetpointDocument, {
        controllerId,
        setpoint: Setpoint.Heat,
        value: setpoint,
      });
      break;
    case ThermostatModes.HEATCOOL:
      throw new ExecutionError("inAutoMode");
    case ThermostatModes.OFF:
      throw new ExecutionError("turnedOff");
  }

  const { changeSetpoint } = mutation;

  switch (changeSetpoint.__typename) {
    case "AwayModeActive":
    case "VacationModeActive":
      throw new ExecutionError("inAwayMode");
    case "NotFound":
      throw new ExecutionError("deviceNotFound");
    case "ChangeSetpointSuccess":
      return changeSetpoint.controller;
  }
}

async function ThermostatTemperatureSetRange(
  execute: Executor,
  controllerId: string,
  high: number,
  low: number,
  controller?: StateFieldsFragment
): Promise<StateFieldsFragment> {
  if (controller == null) {
    ({ controller } = await execute(ControllerDocument, { controllerId }));
  }

  if (!controller || !isOwnDevice(controller)) {
    throw new ExecutionError("deviceNotFound");
  }

  switch (effectiveMode(controller.mode)) {
    case ThermostatModes.COOL:
    case ThermostatModes.HEAT:
      throw new ExecutionError("inHeatOrCool");
    case ThermostatModes.OFF:
      throw new ExecutionError("inOffMode");
  }

  const { changeSetpoint } = await execute(ChangeBothSetpointsDocument, {
    controllerId,
    heat: low,
    cool: high,
  });

  switch (changeSetpoint.__typename) {
    case "AwayModeActive":
    case "VacationModeActive":
      throw new ExecutionError("inAwayMode");
    case "NotFound":
      throw new ExecutionError("deviceNotFound");
    case "ChangeSetpointSuccess":
      return changeSetpoint.controller;
  }
}

async function ThermostatSetMode(
  execute: Executor,
  controllerId: string,
  thermostatMode: string,
  controller?: StateFieldsFragment
): Promise<StateFieldsFragment> {
  if (controller == null) {
    ({ controller } = await execute(ControllerDocument, { controllerId }));
  }

  if (!controller || !isOwnDevice(controller)) {
    throw new ExecutionError("deviceNotFound");
  }

  if (
    controller.mode === Mode.Maxcool &&
    thermostatMode === ThermostatModes.HEAT
  ) {
    throw new ExecutionError("stillCoolingDown");
  }

  if (
    controller.mode === Mode.Maxheat &&
    thermostatMode === ThermostatModes.COOL
  ) {
    throw new ExecutionError("stillWarmingUp");
  }

  let mode: Mode;
  switch (thermostatMode) {
    case ThermostatModes.COOL:
      mode = Mode.Cool;
      break;
    case ThermostatModes.HEAT:
      mode = Mode.Heat;
      break;
    case ThermostatModes.OFF:
      mode = Mode.Off;
      break;
    default:
      mode = Mode.Auto;
      break;
  }

  const { changeMode } = await execute(SetModeDocument, { controllerId, mode });

  switch (changeMode.__typename) {
    case "NotFound":
      throw new ExecutionError("deviceNotFound");
    case "ChangeModeSuccess":
      return changeMode.controller;
  }
}

async function TemperatureRelative(
  execute: Executor,
  controllerId: string,
  degree: number
): Promise<StateFieldsFragment> {
  const { controller } = await execute(ControllerDocument, { controllerId });

  if (!controller || !isOwnDevice(controller)) {
    throw new ExecutionError("deviceNotFound");
  }

  let setpoint: number;
  switch (effectiveMode(controller.mode)) {
    case ThermostatModes.COOL:
      setpoint = controller.setpoints.cool + degree;
      break;
    case ThermostatModes.HEAT:
      setpoint = controller.setpoints.heat + degree;
      break;
    case ThermostatModes.HEATCOOL:
      throw new ExecutionError("inAutoMode");
    case ThermostatModes.OFF:
      throw new ExecutionError("turnedOff");
  }

  return ThermostatTemperatureSetpoint(
    execute,
    controllerId,
    setpoint,
    controller
  );
}

export default async function onExecute(
  body: SmartHomeV1ExecuteRequest,
  headers: Headers
): Promise<SmartHomeV1ExecuteResponse> {
  const execute = await buildExecutor(headers);

  const commands: Promise<Command>[] = [];

  body.inputs.forEach(input => {
    input.payload.commands.forEach(command => {
      command.devices.forEach(device => {
        command.execution.forEach(execution => {
          const c: Promise<Command> = (async () => {
            try {
              let state: StateFieldsFragment;
              switch (execution.command) {
                case "action.devices.commands.SetFanSpeed":
                  {
                    if (execution.params?.["fanSpeed"]) {
                      throw new ExecutionError("functionNotSupported");
                    }

                    const cfm = execution.params?.["fanSpeedPercent"];

                    if (typeof cfm !== "number") {
                      throw new ExecutionError();
                    }

                    state = await SetFanSpeed(execute, device.id, cfm);
                  }
                  break;
                case "action.devices.commands.SetFanSpeedRelative":
                  {
                    const weight = execution.params?.["fanSpeedRelativeWeight"];
                    const percent =
                      execution.params?.["fanSpeedRelativePercent"];

                    let relative: number;
                    if (typeof weight === "number") {
                      relative = weight * 5;
                    } else if (typeof percent === "number") {
                      relative = percent;
                    } else {
                      throw new ExecutionError();
                    }

                    state = await SetFanSpeedRelative(
                      execute,
                      device.id,
                      relative
                    );
                  }
                  break;
                case "action.devices.commands.OnOff":
                  {
                    const on = execution.params?.["on"];

                    if (typeof on !== "boolean") {
                      throw new ExecutionError();
                    }

                    state = await OnOff(execute, device.id, on);
                  }
                  break;
                case "action.devices.commands.ThermostatTemperatureSetpoint":
                  {
                    const setpoint =
                      execution.params?.["thermostatTemperatureSetpoint"];

                    if (typeof setpoint !== "number") {
                      throw new ExecutionError();
                    }

                    state = await ThermostatTemperatureSetpoint(
                      execute,
                      device.id,
                      cToF(setpoint)
                    );
                  }
                  break;
                case "action.devices.commands.ThermostatTemperatureSetRange":
                  {
                    const high =
                      execution.params?.["thermostatTemperatureSetpointHigh"];

                    const low =
                      execution.params?.["thermostatTemperatureSetpointLow"];

                    if (typeof high !== "number" || typeof low !== "number") {
                      throw new ExecutionError();
                    }

                    state = await ThermostatTemperatureSetRange(
                      execute,
                      device.id,
                      cToF(high),
                      cToF(low)
                    );
                  }
                  break;
                case "action.devices.commands.ThermostatSetMode":
                  {
                    const mode = execution.params?.["thermostatMode"];

                    if (typeof mode !== "string") {
                      throw new ExecutionError();
                    }

                    state = await ThermostatSetMode(execute, device.id, mode);
                  }
                  break;
                case "action.devices.commands.TemperatureRelative":
                  {
                    let degree =
                      execution.params?.["thermostatTemperatureRelativeDegree"];
                    const weight =
                      execution.params?.["thermostatTemperatureRelativeWeight"];

                    if (typeof degree === "number") {
                      degree = cToF(degree, false);
                    }

                    if (typeof weight === "number") {
                      degree = weight * 1;
                    }

                    if (typeof degree !== "number") {
                      throw new ExecutionError();
                    }

                    state = await TemperatureRelative(
                      execute,
                      device.id,
                      degree
                    );
                  }
                  break;
                default:
                  throw new ExecutionError("functionNotSupported");
              }

              return {
                ids: [device.id],
                status: "SUCCESS" as const,
                states: executionState(state),
              };
            } catch (e) {
              let errorCode: string;
              if (isExecutionError(e)) {
                errorCode = e.errorCode;
              } else {
                errorCode = "hardError";
              }
              return {
                ids: [device.id],
                status: "ERROR" as const,
                errorCode,
              };
            }
          })();
          commands.push(c);
        });
      });
    });
  });

  const resolved = await Promise.all(commands);

  return {
    requestId: body.requestId,
    payload: {
      commands: resolved,
    },
  };
}
