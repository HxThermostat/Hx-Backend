import React from "react";
import { Svg, Path } from "react-native-svg";

function SchedulesIcon({ color }: { color: string }): JSX.Element {
  return (
    <Svg width="23" height="23" viewBox="0 0 24 23" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.035 23C5.675 23 .52 17.851.52 11.5S5.675 0 12.035 0 23.55 5.149 23.55 11.5 18.395 23 12.035 23zm9.87-11.5c0-5.443-4.419-9.856-9.87-9.856s-9.87 4.413-9.87 9.857c0 5.444 4.419 9.857 9.87 9.857s9.87-4.413 9.87-9.857z"
        fill={color}
      />
      <Path
        d="M16.445 14.132c-.159.327-.51.439-.784.25l-.002-.001-3.35-2.306c-.185-.127-.285-.356-.285-.592h-.002V6.868c0-.377.256-.683.573-.683.317 0 .573.306.573.683v4.22l3.067 2.11c.274.19.368.607.21.934z"
        fill={color}
      />
    </Svg>
  );
}

export default SchedulesIcon;
