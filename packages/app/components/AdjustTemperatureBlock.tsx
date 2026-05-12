import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

import Text from "~/components/Text";
import StepperButton from "~/components/Touchables/StepperButton";

import images from "~/assets/images";
import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

import { degreesSymbol } from "~/utils/display";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  temperatureText: {
    ...fonts.largeTemperatureDegreeText,
    ...spacing.pxtwenty,
    fontVariant: ["tabular-nums"],
  },
});

interface AdjustTemperatureBlockProps {
  currentTemperature: number | string;
  onIncreasePress: () => void;
  onDecreasePress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const AdjustTemperatureBlock = (
  props: AdjustTemperatureBlockProps
): JSX.Element => {
  const {
    currentTemperature,
    onIncreasePress,
    onDecreasePress,
    containerStyle,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <StepperButton onPress={onDecreasePress} image={images.decrease} />
      <Text style={styles.temperatureText}>
        {currentTemperature}
        {degreesSymbol}
      </Text>
      <StepperButton image={images.increase} onPress={onIncreasePress} />
    </View>
  );
};

export default AdjustTemperatureBlock;
