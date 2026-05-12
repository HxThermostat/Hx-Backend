import { Optional } from "utility-types";

import { AccessLevel } from "./graph"
import type {  Maybe, StateFieldsFragment } from "./graph";


type MaybeType<T extends Maybe<unknown>> = T extends Maybe<infer U>
  ? NonNullable<U>
  : never;

type Definitely<T> = { [P in keyof T]-?: MaybeType<T[P]> };

export type Device = StateFieldsFragment;
export type OwnDevice = Definitely<Device>;

export function isOwnDevice(device: Device): device is OwnDevice {
  return device.location.accessLevel === AccessLevel.Owner;
}

interface FanSpeedAttributes {
  supportsFanSpeedPercent: boolean;
}

interface OnOffAttributes {
  queryOnlyOnOff: boolean;
}

export enum ActiveThermostatModes {
  COOL = "cool",
  HEAT = "heat",
  NONE = "none",
  OFF = "off",
}

export enum Status {
  ERROR = "ERROR",
  OFFLINE = "OFFLINE",
  SUCCESS = "SUCCESS",
}

export enum ThermostatModes {
  COOL = "cool",
  HEAT = "heat",
  HEATCOOL = "heatcool",
  OFF = "off",
}

export enum ThermostatTemperatureUnit {
  C = "C",
  F = "F",
}

export interface TemperatureSettingAttributes {
  availableThermostatModes: ThermostatModes[];
  thermostatTemperatureRange: {
    minThresholdCelsius: number;
    maxThresholdCelsius: number;
  };
  thermostatTemperatureUnit: ThermostatTemperatureUnit;
  bufferRangeCelsius: number;
}

export type DeviceAttributes = FanSpeedAttributes & OnOffAttributes & TemperatureSettingAttributes;

export function isThermostatMode(mode: unknown): mode is ThermostatModes {
  return Object.values(ThermostatModes).includes(mode as ThermostatModes);
}


interface ErrorState {
  status: Status.ERROR;
  errorCode: string;
}

interface FanSpeedState {
  currentFanSpeedPercent: number;
}

interface OnOffState {
  on: boolean;
}

interface TemperatureSettingBaseState {
  activeThermostatMode: ActiveThermostatModes;
  thermostatHumidityAmbient?: number;
  thermostatMode: ThermostatModes;
  thermostatTemperatureAmbient: number;
}

export interface TemperatureSettingSingleState {
  thermostatTemperatureSetpoint: number;
}

export interface TemperatureSetttingDualState {
  thermostatTemperatureSetpointHigh: number;
  thermostatTemperatureSetpointLow: number;
}

type TemperatureSettingState = TemperatureSettingBaseState &
  (TemperatureSettingSingleState | TemperatureSetttingDualState);

type SuccessState = {
  online: boolean;
  status: Status.OFFLINE | Status.SUCCESS;
} & Optional<FanSpeedState> &
  OnOffState &
  TemperatureSettingState;

export type DeviceState = ErrorState | SuccessState;

interface BaseCommand {
  ids: string[];
}

export interface CommandSuccess {
  status: "SUCCESS";
  states: Omit<SuccessState, "status">;
}

export interface CommandError {
  status: "ERROR";
  errorCode: string;
}

export type Command = BaseCommand & (CommandSuccess | CommandError);