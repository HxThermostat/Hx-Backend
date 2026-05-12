import React, { useEffect, useState, memo, useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  Animated,
} from "react-native";

import MaskedView from "@react-native-community/masked-view";

import RNLinearGradient from "react-native-linear-gradient";

import { UnreachableCaseError } from "ts-essentials";

import { useDebouncedCallback } from "use-debounce";

import useSetpointsSafe from "~/hooks/useSetpointsSafe";
import { useGlowPulseAnimation } from "~/hooks/useGlowPulseAnimation";

import { Mode, Setpoints } from "~/graph";

import i18n from "~/i18n";

import { hapticSelectionIOS } from "~/utils/haptics";

import images from "~/assets/images";

import StepperButton from "~/components/Touchables/StepperButton";

import color from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing, { size } from "~/styles/spacing";

import {
  CURSOR_RADIUS,
  ARC_RAD,
  ROTATION_RAD,
  INNER_STROKE_WIDTH,
  STROKE_WIDTH,
  GLOW_BLEED,
} from "./constants";
import { toCartesian, deriveNewValueFromDial } from "./math";

import Cursor from "./StaticCursor";
import Ring from "./StaticRing";
import Glow from "./Glow";
import {
  displayableDecimalValueOfNumber,
  displayValueWithoutDecimal,
  hasDecimalPlace,
} from "~/utils/display";
import { systemWeights } from "react-native-typography";
import { useTemperatureUnit } from "~/contexts";

const scope = "Screens.Authenticated.HomeNavigator.Home";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  controlsContainer: {
    marginTop: -28,
    flexDirection: "row",
    justifyContent: "center",
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    marginTop: -GLOW_BLEED / 2,
    marginLeft: -GLOW_BLEED / 2,
  },
  temperatureContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  temperatureTitle: {
    ...fonts.largeTemperatureLabel,
    ...spacing.pxtwentyeight,
    textAlign: "center",
  },
  degreeText: {
    ...fonts.largeTemperatureDegreeText,
    position: "absolute",
    top: size.two,
    right: size.ten,
  },
  celciusDecimal: {
    ...fonts.title,
    ...systemWeights.regular,
    position: "absolute",
    top: size.eighteen,
    right: size.fifteen,
  },
  button: {
    ...spacing.pxeight,
  },
});

// More-or-less the height of the header on the home screen
// We'll extend the dial this amount for landscape aspect ratios
const GROW_UP = 100;

const COLORS: Record<Exclude<Mode | "DISABLED", "OFF">, [string, string]> = {
  HEAT: [color.linearRedOrangeStart, color.linearRedOrangeEnd],
  MAXHEAT: [color.linearRedOrangeStart, color.linearRedOrangeEnd],
  EHEAT: [color.linearRedOrangeStart, color.linearRedOrangeEnd],
  COOL: [color.linearGreenBlueStart, color.linearGreenBlueEnd],
  MAXCOOL: [color.linearGreenBlueStart, color.linearGreenBlueEnd],
  AUTO: [color.tint, color.tint],
  DISABLED: [color.dialInactive, color.dialInactive],
};

const GLOW_COLORS = {
  HEAT: color.glowHeat,
  COOL: color.glowCool,
};

const GLOW_SCALE_MIN = 0.6;
const GLOW_SCALE_MAX = 1;
const GLOW_SCALE_DURATION = 5000;

interface StaticDialProps {
  active?: "HEAT" | "COOL";
  deadband: number;
  disabled?: boolean;
  indoorTemp?: number;
  max: number;
  min: number;
  mode?: Mode;
  onChange: (variables: { heat?: number; cool?: number }) => void;
  heat?: number;
  cool?: number;
}

function StaticDial({
  active: activeState,
  deadband,
  disabled,
  indoorTemp,
  onChange,
  max,
  min,
  mode,
  ...props
}: StaticDialProps): JSX.Element {
  const { height, width } = useWindowDimensions();
  const { toDisplay } = useTemperatureUnit();

  const growUp = width > height * 1.3 ? GROW_UP : 0;

  const size = Math.min(width - 32, height * 0.44) + growUp;

  const r = size / 2 - CURSOR_RADIUS;
  const cx = size / 2;
  const cy = size / 2;

  const range = max - min;

  // We're going to keep the state of intermediate values inside the
  // component, but want to ensure that prop changes from external
  // updates can still be reflected here
  const [heat, setHeatUnsafe] = useState(props.heat);
  const [cool, setCoolUnsafe] = useState(props.cool);

  useEffect(() => setHeatUnsafe(props.heat), [props.heat]);
  useEffect(() => setCoolUnsafe(props.cool), [props.cool]);

  // Debounce the UI updates, capping to ~60 updates/second
  const [setHeatDebounced] = useDebouncedCallback(setHeatUnsafe, 16, {
    leading: true,
    maxWait: 16,
  });
  const [setCoolDebounced] = useDebouncedCallback(setCoolUnsafe, 16, {
    leading: true,
    maxWait: 16,
  });

  // Apply some sanity checks to new values before comitting them
  const onValuesChange = useCallback(
    ({ cool: newCool, heat: newHeat }: Partial<Setpoints>) => {
      if (newCool) {
        setCoolDebounced(newCool);
      }
      if (newHeat) {
        setHeatDebounced(newHeat);
      }

      onChange({ heat: newHeat ?? heat, cool: newCool ?? cool });
    },
    [cool, heat, onChange, setCoolDebounced, setHeatDebounced]
  );

  const {
    setSetpointSafe,
    increaseSetpointSafe,
    decreaseSetpointSafe,
  } = useSetpointsSafe(
    { cool, heat },
    { min, max },
    { min, max },
    deadband,
    onValuesChange
  );
  // The active cursor can be changed by the user when then are more
  // than one, but also needs to be computed for single-cursor modes
  const [active, setActive] = useState<"heat" | "cool">();

  const derriveActive = useCallback(
    (mode: Mode | undefined, disabled: boolean | undefined) => {
      if (disabled) {
        setActive(undefined);
        return;
      }
      switch (mode) {
        case "COOL":
        case "MAXCOOL":
          setActive("cool");
          break;
        case "HEAT":
        case "MAXHEAT":
        case "EHEAT":
          setActive("heat");
          break;
        case "AUTO":
          setActive(active => active ?? "heat");
          break;
        case "OFF":
        case undefined:
          break;
        default:
          throw new UnreachableCaseError(mode);
      }
    },
    []
  );

  useEffect(() => derriveActive(mode, disabled), [
    derriveActive,
    disabled,
    mode,
  ]);

  const showHeat = mode && ["AUTO", "HEAT", "EHEAT"].includes(mode);
  const showCool = mode && ["AUTO", "COOL"].includes(mode);

  // Offset and highlight represent the proportional (in the range
  // [0,1]) values which determine the position + length of the color
  // band
  const offset = cool && showCool ? 1 - (cool - min) / range : 0;
  const highlight = heat && showHeat ? 1 - (heat - min) / range : 1;

  // When the mode is "OFF" don't display any color bar, otherwise
  // select the appropriate gradient from the list
  let colors: [string, string] | null = null;

  if (activeState) {
    colors = COLORS[activeState];
  } else if (mode === "OFF") {
    colors = null;
  } else if (mode) {
    colors = COLORS[mode];
  } else {
    colors = COLORS["DISABLED"];
  }
  const tempDragRef = useRef({ heat: props.heat, cool: props.cool });

  const onDrag = useCallback(
    (dragPosX: number, dragPosY: number, cursor: "heat" | "cool"): void => {
      if (disabled) return;

      // Get the x,y coordinates of the touch relative to the center of the element
      const [x, y] = toCartesian([dragPosX, dragPosY], [cx, cy]);
      const theta = Math.atan2(y, x) + ROTATION_RAD;
      const value = deriveNewValueFromDial(theta, range, min);

      if (
        (cursor === "heat" && tempDragRef?.current[cursor] !== value) ||
        (cursor === "cool" && tempDragRef?.current[cursor] !== value)
      ) {
        hapticSelectionIOS();
      }

      if (cursor !== active) {
        setActive(cursor);
      } else {
        setSetpointSafe(cursor, value);
      }
      tempDragRef.current[cursor] = value;
    },
    [active, cx, cy, disabled, min, range, setSetpointSafe]
  );
  const onDragCool = useCallback(
    (dragPosX: number, dragPosY: number) => onDrag(dragPosX, dragPosY, "cool"),
    [onDrag]
  );
  const onDragHeat = useCallback(
    (dragPosX: number, dragPosY: number) => onDrag(dragPosX, dragPosY, "heat"),
    [onDrag]
  );

  const onTap = useCallback(
    (cursor: "heat" | "cool") => {
      if (disabled) return;
      if (active !== cursor) {
        setActive(cursor);
      }
    },
    [active, disabled, setActive]
  );
  const onTapCool = useCallback(() => onTap("cool"), [onTap]);
  const onTapHeat = useCallback(() => onTap("heat"), [onTap]);

  const onDecreasePress = useCallback(() => {
    if (active) {
      decreaseSetpointSafe(active);
      hapticSelectionIOS();
    }
  }, [active, decreaseSetpointSafe]);
  const onIncreasePress = useCallback(() => {
    if (active) {
      increaseSetpointSafe(active);
      hapticSelectionIOS();
    }
  }, [active, increaseSetpointSafe]);

  const glowAnimScale = useGlowPulseAnimation(
    GLOW_SCALE_MIN,
    GLOW_SCALE_MAX,
    GLOW_SCALE_DURATION,
    !!activeState
  );

  return (
    <View style={{ marginTop: -growUp }}>
      {activeState && (
        <Animated.View
          style={[
            styles.glow,
            {
              transform: [
                {
                  scale: glowAnimScale?.current ?? 1,
                },
              ],
            },
          ]}
        >
          <Glow size={size + GLOW_BLEED} color={GLOW_COLORS[activeState]} />
        </Animated.View>
      )}
      <View style={styles.temperatureContainer}>
        <View>
          <Text maxFontSizeMultiplier={1.1} style={styles.temperatureTitle}>
            {indoorTemp
              ? displayValueWithoutDecimal(toDisplay(indoorTemp))
              : "-"}
          </Text>
          {indoorTemp && hasDecimalPlace(toDisplay(indoorTemp)) ? (
            <Text maxFontSizeMultiplier={1.1} style={styles.celciusDecimal}>
              {displayableDecimalValueOfNumber(toDisplay(indoorTemp))}
            </Text>
          ) : (
            <Text maxFontSizeMultiplier={1.1} style={styles.degreeText}>
              °
            </Text>
          )}
        </View>
        <Text maxFontSizeMultiplier={1.2} style={fonts.caption2L13}>
          {i18n.t("indoor", { scope })}
        </Text>
      </View>
      <View style={[styles.container, { width: size, height: size }]}>
        <Ring
          size={size}
          r={r}
          cx={cx}
          cy={cy}
          startAngle={0}
          endAngle={ARC_RAD}
          stroke={color.dialInactive}
          strokeWidth={INNER_STROKE_WIDTH}
        />
        {mode && colors && (
          <MaskedView
            maskElement={
              <Ring
                size={size}
                r={r}
                cx={cx}
                cy={cy}
                startAngle={ARC_RAD * offset}
                endAngle={ARC_RAD * highlight}
                stroke={"white"}
                strokeWidth={STROKE_WIDTH}
              />
            }
          >
            <RNLinearGradient
              colors={colors}
              style={{
                width: size,
                height: size,
              }}
            />
          </MaskedView>
        )}
        {cool != null && showCool && colors && (
          <Cursor
            colors={colors}
            cx={cx}
            cy={cy}
            offset={offset}
            r={r}
            value={toDisplay<number>(cool)}
            active={active === "cool"}
            onTap={onTapCool}
            onDrag={onDragCool}
          />
        )}
        {heat != null && showHeat && colors && (
          <Cursor
            colors={colors}
            cx={cx}
            cy={cy}
            offset={highlight}
            r={r}
            value={toDisplay<number>(heat)}
            active={active === "heat"}
            onTap={onTapHeat}
            onDrag={onDragHeat}
          />
        )}
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.button}>
          <StepperButton
            disabled={disabled}
            image={images.decrease}
            onPress={onDecreasePress}
          />
        </View>
        <View style={styles.button}>
          <StepperButton
            disabled={disabled}
            image={images.increase}
            onPress={onIncreasePress}
          />
        </View>
      </View>
    </View>
  );
}

export default memo(StaticDial);
