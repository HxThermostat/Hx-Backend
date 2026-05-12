import React, { useMemo } from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";

import Icon from "react-native-vector-icons/EvilIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import LinearGradient from "react-native-linear-gradient";

import { useTemperatureUnit } from "~/contexts";

import i18n from "~/i18n";

import Touchable from "~/components/Touchables/Touchable";
import Text from "~/components/Text";

import spacing, { size } from "~/styles/spacing";
import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import { DateFormatter, degreesSymbol } from "~/utils/display";

const styles = StyleSheet.create({
  container: {
    ...spacing.pxtwenty,
    ...spacing.pyfourteen,
  },
  wrapper: {
    ...spacing.mbtwentysix,
  },
  border: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 9.5,
  },
  roundedGradient: {
    borderRadius: 9.5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowSpaced: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  columnCentered: {
    flexDirection: "column",
    alignItems: "center",
  },
  chevron: {},
  addIcon: {
    ...spacing.mrten,
  },
  accessStatusText: { ...fonts.caption2L13 },
  titleText: { ...fonts.primaryHeaderSemibold, textTransform: "capitalize" },
  detailsText: { ...fonts.caption2, opacity: 0.7 },
  bottomText: {
    ...fonts.body,
    color: colors.white,
    ...spacing.pttwentyfour,
  },
  fullOpacity: {
    opacity: 1,
  },
});

type GradientScheduleCard = {
  colors: string[];
  locations: number[];
  angle: number;
};

const GRADIENTS: Record<string, GradientScheduleCard> = {
  empty: {
    angle: 0,
    locations: [0.0, 0.9],
    colors: ["transparent", "transparent"],
  },
  statusAccess: {
    angle: 0,
    locations: [0.0, 0.9],
    colors: ["transparent", "transparent"],
  },
  awake: {
    angle: 42.36,
    locations: [0.4035, 0.9785],
    colors: [colors.linearAwakeStart, colors.linearAwakeEnd],
  },
  leave: {
    angle: 45.27,
    locations: [0.367, 0.9843],
    colors: [colors.linearLeaveStart, colors.linearLeaveEnd],
  },
  return: {
    angle: 113.26,
    locations: [0.337, 0.967],
    colors: [colors.linearReturnStart, colors.linearReturnEnd],
  },
  sleep: {
    angle: 134.64,
    locations: [0.244, 0.7267],
    colors: [colors.linearSleepStart, colors.linearSleepEnd],
  },
};

const scope = "Common.ScheduleOptions";

const formatDate = DateFormatter("h:mm A");

interface ScheduleCardProps {
  onPress?: () => void;
  disabled?: boolean;
  status: keyof typeof GRADIENTS;
  isLeaveAndReturnBlock?: boolean;
  schedule?: {
    heat: number;
    cool: number;
    start: Date;
    stop: Date;
  };
  containerStyle?: StyleProp<ViewStyle>;
}

const ScheduleCard = ({
  onPress,
  disabled,
  status,
  schedule,
  isLeaveAndReturnBlock,
  containerStyle,
}: ScheduleCardProps): JSX.Element => {
  const { toDisplay } = useTemperatureUnit();

  const isDisabledOrLeaveAndReturnSection = useMemo(() => {
    return disabled || isLeaveAndReturnBlock;
  }, [disabled, isLeaveAndReturnBlock]);

  const gradientSection = useMemo(
    () =>
      isDisabledOrLeaveAndReturnSection
        ? GRADIENTS["empty"]
        : GRADIENTS[status],
    [status, isDisabledOrLeaveAndReturnSection]
  );

  return (
    <LinearGradient
      useAngle={true}
      colors={gradientSection.colors}
      locations={gradientSection.locations}
      angle={gradientSection.angle}
      style={[styles.wrapper, styles.roundedGradient, containerStyle]}
    >
      <Touchable
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.container,
          isDisabledOrLeaveAndReturnSection ? styles.border : {},
          styles.fullOpacity,
        ]}
      >
        {status === "statusAccess" ? (
          <View style={styles.columnCentered}>
            <Text style={styles.titleText}> </Text>
            <Text style={styles.accessStatusText}>
              {i18n.t(status, { scope })}
            </Text>
            <Text style={styles.bottomText}> </Text>
          </View>
        ) : (
          <View>
            <View style={styles.rowSpaced}>
              <View style={styles.row}>
                {isLeaveAndReturnBlock && (
                  <MaterialIcon
                    name="add-circle-outline"
                    color={colors.white}
                    size={size.twentysix}
                    style={styles.addIcon}
                  />
                )}
                <Text style={styles.titleText}>
                  {i18n.t(status, { scope })}
                </Text>
              </View>
              {!isDisabledOrLeaveAndReturnSection && (
                <Icon
                  name="chevron-right"
                  style={styles.chevron}
                  size={size.thirtytwo}
                  color={colors.white}
                />
              )}
            </View>
            {schedule ? (
              <>
                <Text style={styles.detailsText}>
                  {formatDate(schedule.start)} -{" "}
                  {schedule.stop.getDate() == schedule.start.getDate()
                    ? formatDate(schedule.stop)
                    : "next day"}
                </Text>
                <Text style={styles.bottomText}>
                  {toDisplay(schedule.heat)}
                  {degreesSymbol} - {toDisplay(schedule.cool)}
                  {degreesSymbol}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.detailsText}> </Text>
                <Text style={styles.bottomText}> </Text>
              </>
            )}
          </View>
        )}
      </Touchable>
    </LinearGradient>
  );
};

export default ScheduleCard;
