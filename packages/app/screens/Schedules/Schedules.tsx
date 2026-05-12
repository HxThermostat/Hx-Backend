import React, { useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Animated,
  Alert,
  AlertButton,
} from "react-native";

import { SchedulesNavigatorRouteList } from "~/navigators/SchedulesNavigator";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript";
import { RouteProp, useFocusEffect } from "@react-navigation/native";

import { ValuesType, $NonMaybeType } from "utility-types";

import { useAuth, useController } from "~/contexts";

import {
  useSchedulesQuery,
  ScheduleSlot,
  Screen_Schedules_ControllerFragment as ControllerType,
  AccessLevel,
  hasAccess,
  useEnableProgrammableMutation,
} from "~/graph";

import i18n from "~/i18n";

import Touchable from "~/components/Touchables/Touchable";
import Text from "~/components/Text";
import ScheduleCard from "~/components/ScheduleCard";
import ZoneSelector from "~/components/ZoneSelector";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

import DaySelector from "./DaySelector";
import { toDate, days } from "./time";
import NestableSafeAreaView from "~/components/NestableSafeAreaView";
import { useKohortTracking } from "~/utils/kohort";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...fonts.largeTitle,
    ...spacing.mteighteen,
    ...spacing.mbeight,
    ...spacing.mlsixteen,
  },
  scrollView: {
    flex: 1,
  },
  contentScrollView: {
    ...spacing.pbsixtyfour,
  },
  zoneSelector: {
    backgroundColor: colors.linearBGStart,
    ...spacing.pxsixteen,
    ...spacing.pbsixteen,
  },
  stickyHeader: {
    backgroundColor: colors.linearBGStart,
    ...spacing.pxsixteen,
    ...spacing.pysix,
    ...spacing.mbtwelve,
    zIndex: 999,
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.linearBGStart,
  },
  items: {
    ...spacing.pxsixteen,
  },
  dayText: {
    ...fonts.titleBold,
    opacity: 0.2,
  },
  dayTextSelected: { opacity: 1 },
  copyScheduleText: {
    ...fonts.caption2L13,
    opacity: 1,
    textDecorationLine: "underline",
    textAlign: "right",
  },
});

type Day = ValuesType<typeof days>;

const scope = "Screens.Authenticated.SchedulesNavigator.Schedules";

type ScheduleProps = {
  accessLevel: AccessLevel;
  disabled: boolean;
  navigation: SchedulesScreenProps["navigation"];
  schedule: ValuesType<$NonMaybeType<ControllerType["schedule"]>>;
};

function Schedule({
  accessLevel,
  disabled,
  navigation,
  schedule,
}: ScheduleProps): JSX.Element {
  const { trackFeatureUse } = useKohortTracking();
  const { day } = schedule;

  const awake = schedule.events.find(s => s.slot === "AWAKE");
  const leave = schedule.events.find(s => s.slot === "LEAVE");
  const arrive = schedule.events.find(s => s.slot === "ARRIVE");
  const bed = schedule.events.find(s => s.slot === "BED");

  function handlePressCopySchedule(): void {
    navigation.navigate("ModalNavigator", {
      screen: "CopySchedule",
      params: { day },
    });
  }

  function handleSelectSchedule(slot: ScheduleSlot): void {
    trackFeatureUse("View Schedule", slot);
    navigation.navigate("ModalNavigator", {
      screen: "EditSchedule",
      params: { day, slot },
    });
  }
  function handlePressLeaveAndReturn(): void {
    navigation.navigate("ModalNavigator", {
      screen: "CreateLeave",
      params: { slot: "LEAVE", day },
    });
  }

  return (
    <>
      {awake && (
        <ScheduleCard
          schedule={{
            start: toDate(awake.start),
            stop: toDate(awake.stop),
            heat: awake.setpoints.heat,
            cool: awake.setpoints.cool,
          }}
          status="awake"
          disabled={disabled}
          onPress={() => handleSelectSchedule("AWAKE")}
        />
      )}
      {leave && arrive ? (
        <>
          <ScheduleCard
            schedule={{
              start: toDate(leave.start),
              stop: toDate(leave.stop),
              heat: leave.setpoints.heat,
              cool: leave.setpoints.cool,
            }}
            status="leave"
            disabled={disabled}
            onPress={() => handleSelectSchedule("LEAVE")}
          />
          <ScheduleCard
            schedule={{
              start: toDate(arrive.start),
              stop: toDate(arrive.stop),
              heat: arrive.setpoints.heat,
              cool: arrive.setpoints.cool,
            }}
            status="return"
            disabled={disabled}
            onPress={() => handleSelectSchedule("ARRIVE")}
          />
        </>
      ) : (
        <ScheduleCard
          status="leaveAndReturn"
          isLeaveAndReturnBlock={true}
          disabled={disabled}
          onPress={handlePressLeaveAndReturn}
        />
      )}
      {bed && (
        <ScheduleCard
          schedule={{
            start: toDate(bed.start),
            stop: toDate(bed.stop),
            heat: bed.setpoints.heat,
            cool: bed.setpoints.cool,
          }}
          status="sleep"
          disabled={disabled}
          onPress={() => handleSelectSchedule("BED")}
        />
      )}
      <Touchable
        disabled={!hasAccess(accessLevel, "INSTALLER")}
        onPress={handlePressCopySchedule}
      >
        <Text style={styles.copyScheduleText}>
          {i18n.t(`copySchedule.${day}`, { scope })}
        </Text>
      </Touchable>
    </>
  );
}

export type SchedulesScreenProps = {
  navigation: NativeStackNavigationProp<
    SchedulesNavigatorRouteList,
    "Schedules"
  >;
  route: RouteProp<SchedulesNavigatorRouteList, "Schedules">;
  data: DataHookProp<typeof useSchedulesQuery>;
};

function Schedules(props: SchedulesScreenProps): JSX.Element {
  const { isPro } = useAuth();
  const {
    navigation,
    data: { controller, controllers },
  } = props;

  if (!controller) throw new GoBack();

  const { location } = controller;

  const { locationId } = useController();
  const singleController =
    controllers.filter(c => {
      return !locationId || c.location.id === locationId;
    }).length === 1;

  const [enableProgrammable] = useEnableProgrammableMutation({
    variables: { locationId: location.id },
  });

  useFocusEffect(
    useCallback(() => {
      if (location.programmable === false) {
        if (hasAccess(controller.accessLevel, "INSTALLER")) {
          Alert.alert(
            i18n.t("notProgrammableAlert.title", { scope }),
            i18n.t("notProgrammableAlert.message", { scope }),
            [
              {
                style: "cancel",
                text: i18n.t("notProgrammableAlert.goBack", { scope }),
                onPress: () => navigation.goBack(),
              },
              {
                style: "default",
                text: i18n.t("notProgrammableAlert.turnOn", { scope }),
                onPress: () => enableProgrammable(),
              },
            ]
          );
        } else {
          Alert.alert(
            i18n.t("notProgrammableAlert.title", { scope }),
            i18n.t("notProgrammableAlert.messagePro", { scope }),
            [
              {
                style: "cancel",
                text: i18n.t("notProgrammableAlert.ok", { scope }),
                onPress: () => navigation.goBack(),
              },
            ]
          );
        }
      }
    }, [
      enableProgrammable,
      location.programmable,
      controller.accessLevel,
      navigation,
    ])
  );

  const [selectedDay, setSelectedDay] = useState<Day>(
    days[new Date().getDay()]
  );

  const dayIndex = days.indexOf(selectedDay);
  const schedule = controller.schedule && controller.schedule[dayIndex];

  function handlePressSelectZone(): void {
    navigation.navigate("ModalNavigator", { screen: "SelectZone" });
  }

  function handleDaySelect(day: Day): void {
    setSelectedDay(day);
  }

  // NOTE(nleach): This is based on limited experimentation and is
  // very possibly broken!
  // When using the react-native-screens largeTitle on iOS, the
  // stickyHeader behavior for ScrollView doesn't work as expected.
  // https://github.com/software-mansion/react-native-screens/issues/542#issuecomment-671835098
  // To accomodate, We're manually translating the DaySelector element
  // to mimic the stickyHeader behavior.
  const scrollY = useRef(new Animated.Value(0)).current;

  let translateY: Animated.AnimatedInterpolation | null = null;
  if (Platform.OS === "ios") {
    translateY = scrollY.interpolate({
      inputRange: [8 - (isPro ? 13 : 0), Number.MAX_SAFE_INTEGER],
      outputRange: [0, Number.MAX_SAFE_INTEGER],
      extrapolate: "clamp",
    });
  }

  return (
    <NestableSafeAreaView
      edges={["top", "right", "left"]}
      style={styles.container}
    >
      {Platform.OS === "android" && (
        <Text style={styles.title}>{i18n.t("title", { scope })}</Text>
      )}

      <Animated.ScrollView
        contentContainerStyle={styles.contentScrollView}
        contentInsetAdjustmentBehavior={"automatic"}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        stickyHeaderIndices={Platform.select({ android: [1] })}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <ZoneSelector
          zone={controller.name}
          location={location.name}
          onPress={handlePressSelectZone}
          disabled={singleController}
          size={"compact"}
          containerStyle={styles.zoneSelector}
        />
        <View style={styles.stickyHeader}>
          <Animated.View
            style={{ transform: [{ translateY: translateY ?? 0 }] }}
          >
            <DaySelector
              containerStyle={styles.weekdays}
              selected={selectedDay}
              onPress={handleDaySelect}
            />
          </Animated.View>
        </View>
        <View style={styles.items}>
          {schedule ? (
            <Schedule
              accessLevel={controller.accessLevel}
              disabled={!hasAccess(controller.accessLevel, "INSTALLER")}
              navigation={navigation}
              schedule={schedule}
            />
          ) : (
            <ScheduleCard status="statusAccess" disabled={true} />
          )}
        </View>
      </Animated.ScrollView>
    </NestableSafeAreaView>
  );
}

export default withQueryData(useSchedulesQuery, {
  options: { fetchPolicy: "cache-and-network" },
  useVariables: ({ controllerId }) => ({ controllerId }),
})(Schedules);
