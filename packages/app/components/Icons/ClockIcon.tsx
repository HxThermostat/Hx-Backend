import * as React from "react";
import { Svg, Path, Defs, LinearGradient, Stop } from "react-native-svg";

type ColorStop = {
  offset: number;
  color: string;
};

type ClockIconProps = {
  stops?: ColorStop[];
};

function ClockIcon({
  stops = [
    { offset: 0, color: "#FA8A00" },
    { offset: 1, color: "#FF3000" },
  ],
}: ClockIconProps): JSX.Element {
  return (
    <Svg width={44} height={43} viewBox="0 0 44 43" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.565 42.974C9.67 42.974.027 33.354.027 21.487.027 9.62 9.67 0 21.565 0s21.538 9.62 21.538 21.487c0 11.867-9.643 21.487-21.538 21.487zm18.461-21.486c0-10.172-8.265-18.417-18.46-18.417-10.196 0-18.462 8.245-18.462 18.417 0 10.172 8.266 18.417 18.461 18.417 10.197 0 18.461-8.245 18.461-18.417z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M29.813 26.405c-.296.61-.953.82-1.465.468l-.004-.004-6.267-4.308c-.344-.237-.532-.665-.532-1.106h-.005v-8.622c0-.706.48-1.278 1.073-1.278.592 0 1.073.572 1.073 1.278v7.884l5.734 3.943c.513.353.69 1.134.393 1.745z"
        fill="url(#prefix__paint1_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={21.565}
          y1={0}
          x2={21.565}
          y2={42.974}
          gradientUnits="userSpaceOnUse"
        >
          {stops.map(({ offset, color }, i) => (
            <Stop key={`stop_${i}`} offset={offset} stopColor={color} />
          ))}
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={21.565}
          y1={0}
          x2={21.565}
          y2={42.974}
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

export default ClockIcon;
