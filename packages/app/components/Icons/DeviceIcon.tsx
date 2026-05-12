import * as React from "react";
import { Svg, G, Path, Defs, LinearGradient, Stop } from "react-native-svg";

type ColorStop = {
  offset: number;
  color: string;
};

type DeviceIconProps = {
  stops?: ColorStop[];
};

function DeviceIcon({
  stops = [
    { offset: 0, color: "#39A6E7" },
    { offset: 1, color: "#33B375" },
  ],
}: DeviceIconProps): JSX.Element {
  return (
    <Svg width={57} height={42} viewBox="0 0 57 42" fill="none">
      <G>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 0a3 3 0 00-3 3v28a3 3 0 003 3h42.076a3 3 0 003-3V3a3 3 0 00-3-3H7zm36.847 6.497H12.23v21.006h31.618V6.497zm2.382 10.828h2.382v2.599H46.23v-2.6zm2.382-3.465H46.23v2.599h2.382v-2.6z"
          fill="url(#prefix__paint0_linear)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={28.038}
          y1={0}
          x2={28.038}
          y2={34}
          gradientUnits="userSpaceOnUse"
        >
          {stops.map(({ offset, color }, i) => (
            <Stop key={`stop_${i}`} offset={offset} stopColor={color} />
          ))}
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default DeviceIcon;
