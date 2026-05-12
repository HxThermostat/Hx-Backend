import React, { useState, useLayoutEffect, useCallback } from "react";
import { StyleSheet, ScrollView } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import i18n from "~/i18n";

import Background from "~/components/Background";
import ActivityIndicator from "~/components/ActivityIndicator";
import ScheduleCard from "~/components/ScheduleCard";
import HeaderButton from "~/components/Touchables/HeaderButton";
import StandardButton from "~/components/Touchables/StandardButton";
import Text from "~/components/Text";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

import { useRestoreDefaultScheduleMutation } from "~/graph";

import { toDate } from "../Schedules/time";
import DaySelector, { Day } from "../Schedules/DaySelector";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...spacing.pxtwentyfour,
    ...spacing.mbfortytwo,
  },
  scrollView: {
    ...spacing.mteighteen,
  },
  contentScrollView: {
    ...spacing.pbsixtyfour,
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayText: {
    ...fonts.titleBold,
    opacity: 0.2,
  },
  dayTextSelected: { opacity: 1 },
  title: {
    ...fonts.secondaryHeaderSemibold,
    ...spacing.mbsixteen,
    ...spacing.ptthirty,
  },
  detailsText: { ...fonts.caption2, opacity: 0.7 },

  btn: {
    ...spacing.mtthirty,
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.RestoreDefaultSchedule";

export type RestoreDefaultScheduleleProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "RestoreDefaultSchedule"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "RestoreDefaultSchedule">;
};

export default function RestoreDefaultSchedulele(
  props: RestoreDefaultScheduleleProps
): JSX.Element {
  const { navigation, route } = props;

  const controllerId = route.params.controllerId;

  const [selectedDays, setSelectedDays] = useState<Day[]>([]);

  const awake = {
    start: toDate({
      day: "SUN",
      hour: 6,
      minute: 0,
    }),
    stop: toDate({
      day: "SUN",
      hour: 8,
      minute: 0,
    }),
    heat: 70,
    cool: 78,
  };

  const leave = {
    start: toDate({
      day: "SUN",
      hour: 8,
      minute: 0,
    }),
    stop: toDate({
      day: "SUN",
      hour: 18,
      minute: 0,
    }),
    heat: 62,
    cool: 85,
  };

  const arrive = {
    start: toDate({
      day: "SUN",
      hour: 18,
      minute: 0,
    }),
    stop: toDate({
      day: "SUN",
      hour: 22,
      minute: 0,
    }),
    heat: 70,
    cool: 78,
  };

  const bed = {
    start: toDate({
      day: "SUN",
      hour: 22,
      minute: 0,
    }),
    stop: toDate({
      day: "MON",
      hour: 8,
      minute: 0,
    }),
    heat: 62,
    cool: 82,
  };

  const [
    restoreDefaultSchedule,
    { loading },
  ] = useRestoreDefaultScheduleMutation({
    variables: {
      controllerId,
      days: selectedDays,
    },
    onCompleted() {
      navigation.goBack();
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () =>
        loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <HeaderButton
            onPress={restoreDefaultSchedule}
            text={i18n.t("button", { scope })}
            disabled={!selectedDays.length}
          />
        ),
    });
  }, [navigation, loading, restoreDefaultSchedule, selectedDays.length]);

  const handleDaySelect = useCallback(
    (day: Day) => {
      if (selectedDays.includes(day)) {
        setSelectedDays(selectedDays.filter(d => d !== day));
      } else {
        setSelectedDays([...selectedDays, day]);
      }
    },
    [selectedDays]
  );

  return (
    <Background>
      <ScrollView
        contentInsetAdjustmentBehavior={"automatic"}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>{i18n.t("title", { scope })}</Text>
        <DaySelector selected={selectedDays} onPress={handleDaySelect} />
        <ScrollView
          contentContainerStyle={styles.contentScrollView}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <ScheduleCard disabled schedule={awake} status="awake" />
          <ScheduleCard disabled schedule={leave} status="leave" />
          <ScheduleCard disabled schedule={arrive} status="return" />
          <ScheduleCard disabled schedule={bed} status="sleep" />

          <StandardButton
            style={styles.btn}
            onPress={() => restoreDefaultSchedule()}
            disabled={!selectedDays.length || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={fonts.baseTouchableText}>
                {i18n.t("button", { scope })}
              </Text>
            )}
          </StandardButton>
        </ScrollView>
      </ScrollView>
    </Background>
  );
}
