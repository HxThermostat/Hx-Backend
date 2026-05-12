import moment from "moment";

import { SetpointRange, Setpoints, Mode } from "~/graph";

export const degreesSymbol = "\u00B0";

export const numberToDegreesDisplay = (
  value: number | string | undefined
): string => {
  if (numberToDegreesDisplay == null) {
    return "-";
  }
  return `${value}${degreesSymbol}`;
};

export const fromFahrenheitToCelsius = (
  temperatureInF: number,
  absolute = true
): string => {
  const result =
    Math.round((((temperatureInF - (absolute ? 32 : 0)) * 5) / 9) * 10) / 10;
  return result.toFixed(1);
};

export const fromCelsiusToFahrenheit = (
  temperatureInC: number,
  absolute = true
): number => {
  return Math.round((temperatureInC * 9) / 5 + (absolute ? 32 : 0));
};

export const floatToPercentDisplay = (value: number, precision = 0): string =>
  `${(value * 100).toFixed(precision)}%`;

export const capitalize = (str: string): string =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

export const setpointRange = (
  setpoints: Setpoints,
  toDisplay: typeof fromFahrenheitToCelsius | ((temp: number) => number)
): string =>
  `${toDisplay(setpoints.heat)}-${toDisplay(setpoints.cool)}${degreesSymbol}`;

export const transformSetpoints = (setpoints: Setpoints): Setpoints => {
  return {
    cool: setpoints.cool,
    heat: setpoints.heat,
  };
};

export const transformSetpointRange = (
  setpointRange: SetpointRange
): SetpointRange => {
  return {
    max: setpointRange.max,
    min: setpointRange.min,
  };
};

export const DateFormatter = (format: string): ((date: Date) => string) => (
  date: Date
) => moment(date).format(format);

export const VALID_EMAIL = new RegExp(/^\S+@\S+$/);

export const isValidEmail = (email: string | undefined | null): boolean =>
  !!email && VALID_EMAIL.test(email);

const convertTemperatureToNumber = (value: string | number): number =>
  typeof value === "string" ? parseFloat(value) : value;

export const displayValueWithoutDecimal = (
  value: number | undefined | string
): number | undefined => {
  if (value) {
    const temperature = convertTemperatureToNumber(value);
    return Math.trunc(temperature);
  }
};

export const hasDecimalPlace = (
  value: number | undefined | string
): boolean => {
  if (value) {
    const temperature = convertTemperatureToNumber(value);
    return temperature % 1 !== 0;
  }
  return false;
};

export const displayableDecimalValueOfNumber = (
  value: number | undefined | string
): number | undefined => {
  if (value) {
    const temperature = convertTemperatureToNumber(value);
    const result = Math.abs(Math.round((temperature % 1) * 10));
    if (result === 10) {
      return 9; // don't roll over to 10, e.g 12.96, 12.98, 12.99 etc.
    } else {
      return result;
    }
  }
};
