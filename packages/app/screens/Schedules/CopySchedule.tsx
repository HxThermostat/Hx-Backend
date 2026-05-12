import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ModalRouteList } from "~/navigators/ModalNavigator";

import i18n from "~/i18n";

import Background from "~/components/Background";
import ActivityIndicator from "~/components/ActivityIndicator";
import ScheduleCard from "~/components/ScheduleCard";
import HeaderButton from "~/components/Touchables/HeaderButton";
import StandardButton from "~/components/Touchables/StandardButton";
import Text from "~/components/Text";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

import { useCopyScheduleQuery, useMakeScheduleCopyMutation } from "~/graph";

import { GoBack, DataHookProp, withQueryData } from "~/screens/withQueryData";

import { toDate } from "./time";
import DaySelector, { Day } from "./DaySelector";
import { useKohortTracking, KohortFunnelEventStep } from "~/utils/kohort";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...spacing.pxtwentyfour,
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

const scope = "Screens.Authenticated.SchedulesNavigator.CopySchedule";

export type CopyScheduleProps = {
  navigation: NativeStackNavigationProp<ModalRouteList, "CopySchedule">;
  route: RouteProp<ModalRouteList, "CopySchedule">;
  data: DataHookProp<typeof useCopyScheduleQuery>;
};

function CopySchedule(props: CopyScheduleProps): JSX.Element {
  const {
    navigation,
    route,
    data: { controller },
  } = props;

  if (!controller?.schedule) throw new GoBack();
  const controllerId = controller.id;

  const { day } = route.params;
  const [selectedDays, setSelectedDays] = useState<Day[]>([day]);
  const { trackFunnel } = useKohortTracking();

  const schedule = controller.schedule.find(s => s.day === day);

  if (!schedule) {
    throw new Error(`Invalid day: ${day}`);
  }

  const awake = schedule.events.find(s => s.slot === "AWAKE");
  const leave = schedule.events.find(s => s.slot === "LEAVE");
  const arrive = schedule.events.find(s => s.slot === "ARRIVE");
  const bed = schedule.events.find(s => s.slot === "BED");

  const [copySchedule, { loading }] = useMakeScheduleCopyMutation({
    variables: {
      input: {
        id: controllerId,
        source: day,
        destination: selectedDays.filter(d => d !== day),
      },
    },
    onCompleted: ({ copySchedule }) => {
      if (copySchedule.__typename === "CopyScheduleSuccess") {
        navigation.dangerouslyGetParent()?.goBack();
      }
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
            onPress={() => {
              trackFunnel({ step: KohortFunnelEventStep.Action });
              copySchedule();
            }}
            text={i18n.t("button", { scope })}
            disabled={selectedDays.length === 1}
          />
        ),
    });
  }, [navigation, loading, copySchedule, selectedDays.length]);

  function handleDaySelect(day: Day): void {
    // The source schedule's day should always remain selected
    if (schedule?.day === day) return;

    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t("title", { scope })}</Text>
        <DaySelector selected={selectedDays} onPress={handleDaySelect} />
        <ScrollView
          contentContainerStyle={styles.contentScrollView}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {awake && (
            <ScheduleCard
              disabled
              schedule={{
                start: toDate(awake.start),
                stop: toDate(awake.stop),
                heat: awake.setpoints.heat,
                cool: awake.setpoints.cool,
              }}
              status="awake"
            />
          )}
          {leave && (
            <ScheduleCard
              disabled
              schedule={{
                start: toDate(leave.start),
                stop: toDate(leave.stop),
                heat: leave.setpoints.heat,
                cool: leave.setpoints.cool,
              }}
              status="leave"
            />
          )}
          {arrive && (
            <ScheduleCard
              disabled
              schedule={{
                start: toDate(arrive.start),
                stop: toDate(arrive.stop),
                heat: arrive.setpoints.heat,
                cool: arrive.setpoints.cool,
              }}
              status="return"
            />
          )}
          {bed && (
            <ScheduleCard
              disabled
              schedule={{
                start: toDate(bed.start),
                stop: toDate(bed.stop),
                heat: bed.setpoints.heat,
                cool: bed.setpoints.cool,
              }}
              status="sleep"
            />
          )}

          <StandardButton
            style={styles.btn}
            onPress={() => copySchedule()}
            disabled={selectedDays.length === 1 || loading}
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
      </View>
    </Background>
  );
}

export default withQueryData(useCopyScheduleQuery, {
  useVariables: ({ controllerId }) => ({ controllerId }),
})(CopySchedule);
