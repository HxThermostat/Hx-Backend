import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

import Text from "~/components/Text";
import Touchable from "~/components/Touchables/Touchable";

import spacing, { size } from "~/styles/spacing";
import colors from "~/styles/color";
import fonts from "~/styles/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...spacing.mtfortyeight,
    ...spacing.pxtwentyfour,
    ...spacing.mbthirtytwo,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: size.five,
      height: size.five,
    },
    shadowOpacity: 0.47,
    shadowRadius: 4.65,
    elevation: size.six,

    backgroundColor: colors.iconButtonBackground,
    borderRadius: size.thirty / 2,
    height: size.thirty,
    width: size.thirty,
  },
  row: {
    flexDirection: "row",
    ...spacing.pxtwenty,
    alignItems: "baseline",
  },
  body: {
    ...fonts.body,
    color: colors.white,
    ...spacing.mltwo,
    ...spacing.pbthree,
  },
  humidityText: {
    ...fonts.humidityText,
    fontVariant: ["tabular-nums"],
  },
});

interface AdjustHumidtyBlockProps {
  handleDecreasePress: () => void;
  handleIncreasePress: () => void;
  value: number | string;
  containerStyle?: StyleProp<ViewStyle>;
}

const SLOP = 40;
const hitSlop = { top: SLOP, left: SLOP, right: SLOP, bottom: SLOP };

const AdjustHumidtyBlock = (props: AdjustHumidtyBlockProps): JSX.Element => {
  const {
    handleDecreasePress,
    handleIncreasePress,
    value,
    containerStyle,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Touchable
        onPress={handleDecreasePress}
        style={styles.btn}
        hitSlop={hitSlop}
      >
        <Icon name="remove" size={size.twentyfour} color={colors.white} />
      </Touchable>
      <View style={styles.row}>
        <Text style={styles.humidityText}>{value}</Text>
        <Text style={styles.body}>%</Text>
      </View>
      <Touchable
        onPress={handleIncreasePress}
        style={styles.btn}
        hitSlop={hitSlop}
      >
        <Icon name="add" size={size.twentyfour} color={colors.white} />
      </Touchable>
    </View>
  );
};

export default AdjustHumidtyBlock;
