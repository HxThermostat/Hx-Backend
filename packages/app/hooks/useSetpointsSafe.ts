import { useCallback, useMemo } from "react";

import { SetpointRange, Setpoints } from "~/graph";

import useRangeSafe, { Range } from "./useRangeSafe";

type setpointType = "heat" | "cool";

type SetpointSafe = {
  setSetpointSafe: (type: setpointType, newValue: number) => void;
  increaseSetpointSafe: (type: setpointType) => void;
  decreaseSetpointSafe: (type: setpointType) => void;
};

export const getRangeKey = (type: keyof Setpoints): keyof Range =>
  type === "heat" ? "min" : "max";

export default function useSetpointsSafe(
  setpoints: Partial<Setpoints>,
  coolRange: SetpointRange,
  heatRange: SetpointRange,
  deadband: number,
  onValuesChange: (newSetpoints: Partial<Setpoints>) => void
): SetpointSafe {
  const range: Partial<Range> = useMemo(
    () => ({
      [getRangeKey("heat")]: setpoints["heat"],
      [getRangeKey("cool")]: setpoints["cool"],
    }),
    [setpoints]
  );

  const onRangeValuesChange = useCallback(
    (newRange: Partial<Range>) => {
      const newSetpoints: Partial<Setpoints> = {
        heat: newRange[getRangeKey("heat")],
        cool: newRange[getRangeKey("cool")],
      };
      onValuesChange(newSetpoints);
    },
    [onValuesChange]
  );

  const { editRangeSafe, increaseRangeSafe, decreaseRangeSafe } = useRangeSafe(
    range,
    coolRange,
    heatRange,
    deadband,
    onRangeValuesChange
  );

  const setSetpointSafe = useCallback(
    (type: setpointType, newValue: number) =>
      editRangeSafe(getRangeKey(type), newValue),
    [editRangeSafe]
  );
  const increaseSetpointSafe = useCallback(
    (type: setpointType) => increaseRangeSafe(getRangeKey(type)),
    [increaseRangeSafe]
  );
  const decreaseSetpointSafe = useCallback(
    (type: setpointType) => decreaseRangeSafe(getRangeKey(type)),
    [decreaseRangeSafe]
  );

  return {
    setSetpointSafe,
    increaseSetpointSafe,
    decreaseSetpointSafe,
  };
}
