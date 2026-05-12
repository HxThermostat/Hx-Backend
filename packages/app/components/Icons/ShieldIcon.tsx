import * as React from "react";
import { Svg, G, Path, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

type ColorStop = {
  offset: number;
  color: string;
};

type ShieldIconProps = {
  stops?: ColorStop[];
};

export default function ShieldIcon({
  stops = [
    { offset: 0, color: "#02D6FF" },
    { offset: 1, color: "#029BFF" },
  ],
}: ShieldIconProps): JSX.Element {
  return (
    <Svg width={53} height={61} viewBox="0 0 53 61" fill="none">
      <G>
        <Path
          d="M48.262 10.203a.8.8 0 00-.53-.88A2359.99 2359.99 0 0127.03.122a1.113 1.113 0 00-1.002 0A12964.04 12964.04 0 015.252 9.339a.72.72 0 00-.53.784c.048 4.717-.005 9.44.048 14.156a30.321 30.321 0 006.042 18.02c3.763 5.067 8.575 8.698 14.676 10.531a3.36 3.36 0 002.019 0 27.687 27.687 0 0014.12-9.789 30.433 30.433 0 006.624-19.08v-6.116c-.021-2.544-.021-5.093.01-7.642zm-3.742 9.126v5.067a25.223 25.223 0 01-5.48 15.815 22.95 22.95 0 01-11.708 8.13 2.782 2.782 0 01-1.675 0 23.22 23.22 0 01-12.163-8.74 25.132 25.132 0 01-5.014-14.94c-.042-3.912 0-7.823 0-11.734a.6.6 0 01.43-.647c5.72-2.533 11.447-5.083 17.182-7.648a.922.922 0 01.832 0 3004.419 3004.419 0 0017.161 7.627.663.663 0 01.435.731v6.34z"
          fill="url(#prefix__paint0_linear)"
        />
        <Path
          d="M33.92 18.624a.758.758 0 00-1.15.122c-.196.196-.371.414-.562.615l-6.46 6.89-2.12 2.242-.175-.122-2.253-1.776c-.403-.318-.806-.63-1.219-.932a.72.72 0 00-.864-.075c-.314.21-.609.447-.88.71a.598.598 0 00-.08.732c.1.195.212.385.335.567l4.51 6.567a.795.795 0 001.394 0c3.282-4.403 6.565-8.8 9.847-13.192.212-.286.403-.594.589-.9a.588.588 0 00-.096-.785 6.505 6.505 0 00-.816-.663z"
          fill="url(#prefix__paint1_linear)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={26.494}
          y1={0.003}
          x2={26.494}
          y2={52.986}
          gradientUnits="userSpaceOnUse"
        >
          {stops.map(({ offset, color }, i) => (
            <Stop key={`stop_${i}`} offset={offset} stopColor={color} />
          ))}
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={26.504}
          y1={18.414}
          x2={26.504}
          y2={34.576}
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
