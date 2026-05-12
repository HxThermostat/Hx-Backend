import React from "react";
import { Text, StyleSheet, View, StyleProp, ViewStyle } from "react-native";

import Touchable from "~/components/Touchables/Touchable";

import fonts from "~/styles/fonts";

import { days } from "./time";
import { ValuesType } from "utility-types";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayText: {
    ...fonts.titleBold,
    opacity: 0.2,
  },
  dayTextSelected: { opacity: 1 },
});

export type Day = ValuesType<typeof days>;

type DaySelectorProps = {
  selected: Day | Day[];
  onPress: (day: Day) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const DaySelector = (props: DaySelectorProps): JSX.Element => {
  const { containerStyle, onPress } = props;
  const selected =
    typeof props.selected === "string" ? [props.selected] : props.selected;

  return (
    <View style={[styles.container, containerStyle]}>
      {days.map((day, i) => {
        const isSelected = selected.includes(day);
        return (
          <Touchable key={i} onPress={() => onPress(day)}>
            <Text
              style={[styles.dayText, isSelected ? styles.dayTextSelected : {}]}
            >
              {day[0]}
            </Text>
          </Touchable>
        );
      })}
    </View>
  );
};

export default DaySelector;
