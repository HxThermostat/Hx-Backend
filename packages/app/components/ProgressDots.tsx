import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "~/styles/color";
import spacing from "~/styles/spacing";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...spacing.mytwentyfour,
  },
  dot: {
    ...spacing.mxfive,
    width: 7,
    height: 7,
    backgroundColor: colors.white,
    opacity: 0.5,
    borderRadius: 3.5,
  },
  active: {
    opacity: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

interface ProgressDotsProps {
  dots: number;
  activeIndex: number;
}

const ProgressDots = (props: ProgressDotsProps): JSX.Element => {
  const { dots, activeIndex } = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {Array.from(Array(dots).keys()).map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex ? styles.active : {}]}
          />
        ))}
      </View>
    </View>
  );
};

export default ProgressDots;
