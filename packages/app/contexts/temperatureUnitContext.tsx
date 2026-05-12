import React, { useContext, useState } from "react";

import { TemperatureUnit } from "~/graph";

import {
  fromCelsiusToFahrenheit,
  fromFahrenheitToCelsius,
} from "~/utils/display";

function identity<T>(arg: T): T {
  return arg;
}

export interface TemperatureUnitProps {
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
  toDisplay: typeof fromFahrenheitToCelsius | typeof identity;
  toGraph: typeof fromCelsiusToFahrenheit;
}

const TemperatureUnitContext = React.createContext<
  TemperatureUnitProps | undefined
>(undefined);

interface TemperatureUnitProviderProps {
  children: React.ReactNode;
  unit?: TemperatureUnit;
}

export function TemperatureUnitProvider({
  children,
  ...props
}: TemperatureUnitProviderProps): JSX.Element {
  const [unit, setUnit] = useState<TemperatureUnit>(props.unit || "F");
  return (
    <TemperatureUnitContext.Provider
      value={{
        unit,
        setUnit,
        toDisplay: unit === "C" ? fromFahrenheitToCelsius : identity,
        toGraph: unit === "C" ? fromCelsiusToFahrenheit : identity,
      }}
    >
      {children}
    </TemperatureUnitContext.Provider>
  );
}

export function useTemperatureUnit(): TemperatureUnitProps {
  const context = useContext(TemperatureUnitContext);

  if (context === undefined) {
    throw new Error(
      "useTemperatureUnit must be used within a TemperatureUnitProvider"
    );
  }

  return context;
}
