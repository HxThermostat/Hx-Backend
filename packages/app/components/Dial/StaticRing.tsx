import React, { memo } from "react";
import { StyleSheet } from "react-native";

import { Svg, Path, Circle } from "react-native-svg";

import { ROTATION } from "./constants";
import { toCanvas, normalizeTheta } from "./math";

interface RingProps {
  r: number;
  cx: number;
  cy: number;
  startAngle: number;
  endAngle: number;
  size: number;
  stroke: string;
  strokeWidth: number;
}

function Ring(props: RingProps): JSX.Element {
  const { r, cx, cy, startAngle, endAngle, size, stroke, strokeWidth } = props;

  const [x0, y0] = toCanvas({ r, theta: startAngle }, [cx, cy]);
  const [x1, y1] = toCanvas({ r, theta: endAngle }, [cx, cy]);

  let pathD = "";
  if (startAngle !== endAngle) {
    const largeArcFlag: 1 | 0 =
      normalizeTheta(endAngle) - normalizeTheta(startAngle) >= Math.PI ? 1 : 0;
    pathD = `M ${x0} ${y0} A ${r} ${r} 0 ${largeArcFlag} 0 ${x1} ${y1}`;
  }

  const transform = `rotate(${ROTATION} ${size / 2} ${size / 2})`;

  return (
    <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
      <Circle
        cx={x0}
        cy={y0}
        r={strokeWidth / 2}
        fill={stroke}
        transform={transform}
      />
      <Path
        d={pathD}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={"butt"}
        transform={transform}
      />
      <Circle
        cx={x1}
        cy={y1}
        r={strokeWidth / 2}
        fill={stroke}
        transform={transform}
      />
    </Svg>
  );
}

export default memo(Ring);
