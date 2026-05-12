import React, { memo, useRef, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import {
  CURSOR_WIDTH,
  CURSOR_RADIUS,
  ROTATION_RAD,
  ARC_RAD,
} from "./constants";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import { lerp, toCanvas, interpolateColor } from "./math";
import {
  displayableDecimalValueOfNumber,
  displayValueWithoutDecimal,
  hasDecimalPlace,
} from "~/utils/display";

const BORDER_WIDTH = 2;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -CURSOR_WIDTH / 2,
    marginTop: -CURSOR_WIDTH / 2,
    width: CURSOR_WIDTH,
    height: CURSOR_WIDTH,
  },
  containerActive: {
    zIndex: 1,
  },
  cursor: {
    width: CURSOR_WIDTH,
    height: CURSOR_WIDTH,
    borderRadius: CURSOR_RADIUS,
    overflow: "hidden",
    borderWidth: BORDER_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.splashBG,
    borderColor: colors.dialInactive,
  },
  label: {
    ...fonts.caption2R11,
    textAlign: "center",
    fontVariant: ["tabular-nums"],
  },
  celciusDecimal: {
    ...fonts.tinyDegree,
    fontVariant: ["tabular-nums"],
    top: 2,
    left: 1,
  },
  row: { flexDirection: "row" },
});

interface CursorProps {
  active?: boolean;
  colors: [string, string];
  cx: number;
  cy: number;
  offset: number;
  r: number;
  value?: string | number;
  onTap: () => void;
  onDrag: (dragPosX: number, dragPosY: number) => void;
}

function Cursor({
  active,
  colors: [start, stop],
  cx,
  cy,
  offset,
  r,
  value,
  onTap,
  onDrag,
}: CursorProps): JSX.Element {
  const theta = lerp(-ROTATION_RAD, ARC_RAD - ROTATION_RAD, offset);

  const [translateX, translateY] = toCanvas({ r: r, theta }, [cx, cy]);

  // Handle Tap Gesture
  const tapRef = React.createRef<TapGestureHandler>();
  const handleTapGestureEvent = useCallback(
    (e: TapGestureHandlerGestureEvent) => {
      if (e.nativeEvent.state === State.BEGAN) {
        onTap();
      }
    },
    [onTap]
  );

  // Handle Pan Gesture
  const panRef = React.createRef<PanGestureHandler>();
  const panStartPosRef = useRef({ x: translateX, y: translateY });
  const handlePanGestureEvent = useCallback(
    (e: PanGestureHandlerGestureEvent) => {
      const {
        nativeEvent: { state, translationX, translationY },
      } = e;

      // Ignore terminating events
      if (state !== State.ACTIVE && state !== State.BEGAN) {
        return;
      }

      // Use the start position of the detected pan gesture
      const panStartPos = panStartPosRef.current;
      if (state === State.BEGAN) {
        panStartPos.x = translateX;
        panStartPos.y = translateY;
      }

      const panPosX = panStartPos.x + translationX;
      const panPosY = panStartPos.y + translationY;
      onDrag(panPosX, panPosY);
    },
    [panStartPosRef, translateX, translateY, onDrag]
  );

  return (
    <PanGestureHandler
      ref={panRef}
      waitFor={tapRef}
      onGestureEvent={handlePanGestureEvent}
      onHandlerStateChange={handlePanGestureEvent}
      shouldCancelWhenOutside={false}
      maxPointers={1}
    >
      <TapGestureHandler
        ref={tapRef}
        onHandlerStateChange={handleTapGestureEvent}
      >
        <View
          style={[
            styles.container,
            { top: translateY, left: translateX },
            active ? styles.containerActive : null,
          ]}
        >
          <View
            style={[
              styles.cursor,
              active
                ? {
                    borderColor: interpolateColor(
                      start,
                      stop,
                      translateY / (2 * r)
                    ),
                  }
                : null,
            ]}
          >
            {value != null && (
              <View style={styles.row}>
                <Text style={styles.label}>
                  {displayValueWithoutDecimal(value)}
                  {!hasDecimalPlace(value) && "°"}
                </Text>
                {hasDecimalPlace(value) && (
                  <Text style={styles.celciusDecimal}>
                    {displayableDecimalValueOfNumber(value)}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </TapGestureHandler>
    </PanGestureHandler>
  );
}

export default memo(Cursor);
