import { useCallback } from "react";
import { insideRange } from "~/components/Dial/math";

export interface Range {
  max: number;
  min: number;
}

type valueType = "min" | "max";

type RangeSafe = {
  editRangeSafe: (type: valueType, newValue: number) => void;
  increaseRangeSafe: (type: valueType) => void;
  decreaseRangeSafe: (type: valueType) => void;
};

export default function useRangeSafe(
  range: Partial<Range>,
  maxRange: Range,
  minRange: Range,
  deadband: number,
  onValuesChange: (newRange: Partial<Range>) => void
): RangeSafe {
  const setMinSafe = useCallback(
    (min: number) => {
      // Check if the new min is inside valid minRange
      if (!insideRange(min, minRange.min, minRange.max)) {
        return;
      }

      // Check if updating min is going to push max out of valid maxRange
      if (!insideRange(min + deadband, maxRange.min, maxRange.max)) {
        return;
      }

      const newRange: Partial<Range> = { min };
      // Update max if needed because of deadband
      if (range.max && range.max < min + deadband) {
        newRange.max = min + deadband;
      }
      onValuesChange(newRange);
    },
    [minRange, maxRange.min, maxRange.max, deadband, onValuesChange, range.max]
  );

  const setMaxSafe = useCallback(
    (max: number) => {
      // Check if the new max is inside valid maxRange
      if (!insideRange(max, maxRange.min, maxRange.max)) {
        return;
      }

      // Check if updating max is going to push min out of valid minRange
      if (!insideRange(max - deadband, minRange.min, minRange.max)) {
        return;
      }

      const newRange: Partial<Range> = { max };
      // Update min if needed because of deadband
      if (range.min && range.min > max - deadband) {
        newRange.min = max - deadband;
      }
      onValuesChange(newRange);
    },
    [maxRange, minRange.min, minRange.max, deadband, onValuesChange, range.min]
  );

  // Shortcut to increase/decrease range values
  const editRangeSafe = useCallback(
    (type: valueType, newValue: number) => {
      type === "max" ? setMaxSafe(newValue) : setMinSafe(newValue);
    },
    [setMaxSafe, setMinSafe]
  );
  const increaseRangeSafe = useCallback(
    (type: valueType) => {
      const currentValue = range[type];
      if (currentValue) {
        editRangeSafe(type, currentValue + 1);
      }
    },
    [editRangeSafe, range]
  );
  const decreaseRangeSafe = useCallback(
    (type: valueType) => {
      const currentValue = range[type];
      if (currentValue) {
        editRangeSafe(type, currentValue - 1);
      }
    },
    [editRangeSafe, range]
  );

  return {
    editRangeSafe,
    increaseRangeSafe,
    decreaseRangeSafe,
  };
}
