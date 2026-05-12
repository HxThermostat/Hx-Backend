import React from "react";
import { View, StyleSheet } from "react-native";

import Slider from "@react-native-community/slider";

import Text from "~/components/Text";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";
import colors from "~/styles/color";

const styles = StyleSheet.create({
  rowSlider: {
    ...spacing.mttwenty,
    ...spacing.mbfortyeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  slider: {
    width: "80%",
  },
  sliderText: {
    ...fonts.caption2,
    color: colors.modalHeaderDivider,
  },
});

interface SliderRowProps {
  minValue: number;
  minText: string | number;
  maxValue: number;
  maxText: string | number;
  value: number;
  onValueChange: (value: number) => void;
  handleSlideComplete: (value: number) => void;
  step: number;
}
const SliderRow = (props: SliderRowProps): JSX.Element => {
  const {
    minValue,
    minText,
    maxValue,
    maxText,
    value,
    onValueChange,
    handleSlideComplete,
    step = 1,
  } = props;
  return (
    <View style={styles.rowSlider}>
      <Text style={styles.sliderText}>{minText}</Text>
      <Slider
        style={styles.slider}
        value={value}
        onValueChange={onValueChange}
        onSlidingComplete={handleSlideComplete}
        step={step}
        minimumValue={minValue}
        maximumValue={maxValue}
        minimumTrackTintColor={colors.tint}
      />
      <Text style={styles.sliderText}>{maxText}</Text>
    </View>
  );
};

export default SliderRow;
