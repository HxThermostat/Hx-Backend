import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  useMemo,
} from "react";
import { View, StyleSheet, ScrollView, findNodeHandle } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ModalRouteList } from "~/navigators/ModalNavigator";

import { ValuesType, $NonMaybeType } from "utility-types";

import { useActionSheet } from "~/hooks/useActionSheet";
import useSetpointsSafe from "~/hooks/useSetpointsSafe";

import i18n from "~/i18n";

import ActivityIndicator from "~/components/ActivityIndicator";

import Background from "~/components/Background";

import HeaderButton from "~/components/Touchables/HeaderButton";
import LinkTouchable from "~/components/Touchables/LinkTouchable";
import StandardButton from "~/components/Touchables/StandardButton";

import Text from "~/components/Text";

import AdjustTemperatureBlock from "~/components/AdjustTemperatureBlock";
import DateTimePicker from "~/components/Picker/DateTimePicker";
import Picker from "~/components/Picker/Picker";

import { useController, useTemperatureUnit } from "~/contexts";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

import {
  useAdjustScheduleQuery,
  FanMode,
  ScheduleSlot,
  ScheduleEventFieldsFragment,
  Day,
  useChangeScheduleMutation,
  useAddLeaveArriveMutation,
  useRemoveLeaveArriveMutation,
  Screen_AdjustSchedule_ControllerFragment as ControllerType,
  Setpoints,
  getSupportedModes,
} from "~/graph";

import { transformSetpointRange, transformSetpoints } from "~/utils/display";
import { FAN_SETTINGS } from "~/utils/fanSettings";

import { withQueryData, DataHookProp, GoBack } from "~/screens/withQueryData";

import { toDate, days } from "./time";
import { useKohortTracking, KohortFunnelEventStep } from "~/utils/kohort";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentScrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
    ...spacing.ptfortytwo,
    ...spacing.pxtwentyfour,
  },
  label: {
    ...fonts.secondaryHeaderSemibold,
  },
  pickerValue: {
    ...fonts.secondaryHeader,
    opacity: 0.5,
  },
  row: {
    ...spacing.mbfortytwo,
  },
  rowSpaced: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsText: {
    ...fonts.caption2R11,
    opacity: 0.7,
  },
  footerText: {
    textAlign: "center",
  },
  dateText: {
    ...fonts.secondaryHeader,
    opacity: 0.5,
  },
  pickerSpacing: {},
  btn: {},
  temperatureBlock: {
    ...spacing.mttwentyeight,
  },
  footer: {
    ...spacing.mteighteen,
  },
});

/*

Schedule defaults defined in JCI's spec

| Setting    | Start Time | Heat Setpoint | Cool Setpoint |
|------------|------------|---------------|---------------|
| 1st Period | 6 a.m.     | 70℉           | 78℉           |
| 2nd Period | 8 a.m.     | 62℉           | 85℉           |
| 3rd Period | 6 p.m.     | 70℉           | 78℉           |
| 4th Period | 10 p.m.    | 62℉           | 82℉           |
*/

const defaultEvent = (
  slot: ScheduleSlot,
  day: Day
): ScheduleEventFieldsFragment => {
  const dayIndex = days.indexOf(day);
  const nextDay = days[dayIndex === 6 ? 0 : dayIndex + 1];
  const fanMode = "AUTO";

  switch (slot) {
    case "AWAKE":
      return {
        slot,
        fanMode,
        setpoints: {
          heat: 70,
          cool: 78,
        },
        start: {
          day,
          hour: 6,
          minute: 0,
        },
        stop: {
          day,
          hour: 8,
          minute: 0,
        },
      };
    case "LEAVE":
      return {
        slot,
        fanMode,
        setpoints: {
          heat: 62,
          cool: 85,
        },
        start: {
          day,
          hour: 8,
          minute: 0,
        },
        stop: {
          day,
          hour: 18,
          minute: 0,
        },
      };
    case "ARRIVE":
      return {
        slot,
        fanMode,
        setpoints: {
          heat: 70,
          cool: 78,
        },
        start: {
          day,
          hour: 18,
          minute: 0,
        },
        stop: {
          day,
          hour: 22,
          minute: 0,
        },
      };
    case "BED":
      return {
        slot,
        fanMode,
        setpoints: {
          heat: 62,
          cool: 82,
        },
        start: {
          day,
          hour: 22,
          minute: 0,
        },
        stop: {
          day: nextDay,
          hour: 22,
          minute: 0,
        },
      };
  }
};

const getEvent = (
  schedule: ValuesType<$NonMaybeType<ControllerType["schedule"]>>,
  slot: ScheduleSlot
):
  | ValuesType<ValuesType<$NonMaybeType<ControllerType["schedule"]>>["events"]>
  | undefined => schedule.events.find(e => e.slot === slot);

export type AdjustScheduleProps = {
  buttonDisabled?: boolean;
  buttonLabel: string;
  footer?: React.ReactElement;
  handleButtonPress: (
    startAt: Date,
    heatTo: number,
    coolTo: number,
    fanMode: FanMode
  ) => void;
  loading?: boolean;
  requireChanges?: boolean;
  data: DataHookProp<typeof useAdjustScheduleQuery>;
};

const scope = "Screens.Authenticated.SchedulesNavigator.AdjustSchedule";

function WrappedAdjustSchedule({
  buttonDisabled,
  buttonLabel,
  footer,
  handleButtonPress,
  loading,
  requireChanges = true,
  data: { controller },
}: AdjustScheduleProps): JSX.Element {
  const route = useRoute<
    RouteProp<ModalRouteList, "EditSchedule" | "CreateLeave" | "CreateArrive">
  >();

  const navigation = useNavigation<
    NativeStackNavigationProp<
      ModalRouteList,
      "EditSchedule" | "CreateLeave" | "CreateArrive"
    >
  >();

  const { toDisplay } = useTemperatureUnit();

  const { slot, day } = route.params;

  if (!controller?.schedule) throw new GoBack();

  const schedule = controller.schedule.find(s => s.day === day);

  if (!schedule) {
    throw new Error(`Invalid day: ${day}`);
  }

  const event = getEvent(schedule, slot) ?? defaultEvent(slot, day);

  const [hasNewChanges, setHasNewChanges] = useState(!requireChanges);
  const [startAt, setStartAt] = useState(toDate(event.start));
  const [setpoints, setSetpoints] = useState(
    transformSetpoints(event.setpoints)
  );
  const onValuesChange = useCallback(
    (newSetpoints: Partial<Setpoints>) => {
      setSetpoints({
        cool: newSetpoints.cool || setpoints.cool,
        heat: newSetpoints.heat || setpoints.heat,
      });
      setHasNewChanges(true);
    },
    [setpoints]
  );

  const coolRange = useMemo(
    () => transformSetpointRange(controller.coolRange),
    [controller.coolRange]
  );
  const heatRange = useMemo(
    () => transformSetpointRange(controller.heatRange),
    [controller.heatRange]
  );
  const { decreaseSetpointSafe, increaseSetpointSafe } = useSetpointsSafe(
    setpoints,
    coolRange,
    heatRange,
    controller.deadband,
    onValuesChange
  );
  const [fanMode, setFanMode] = useState<FanMode>(event.fanMode);

  const onPress = useCallback(() => {
    handleButtonPress(startAt, setpoints.heat, setpoints.cool, fanMode);
  }, [handleButtonPress, startAt, setpoints.heat, setpoints.cool, fanMode]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () =>
        loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <HeaderButton
            onPress={onPress}
            text={buttonLabel}
            disabled={buttonDisabled || !hasNewChanges}
          />
        ),
    });
  }, [
    navigation,
    slot,
    onPress,
    buttonLabel,
    loading,
    buttonDisabled,
    hasNewChanges,
  ]);

  const { heatingSupported, coolingSupported } = getSupportedModes(
    controller.modes
  );

  const { bottom } = useSafeAreaInsets();

  return (
    <Background>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentScrollView}
        contentInsetAdjustmentBehavior={"automatic"}
        showsVerticalScrollIndicator={false}
        style={[styles.scrollView, { paddingBottom: bottom }]}
      >
        <View style={styles.row}>
          <View style={styles.rowSpaced}>
            <Text style={styles.label}>{i18n.t("startAt", { scope })}</Text>
            <DateTimePicker
              mode={"time"}
              value={startAt}
              onValueChange={date => {
                setHasNewChanges(true);
                setStartAt(date);
              }}
              minuteInterval={15}
              labelStyle={styles.pickerValue}
            />
          </View>
          <Text style={styles.detailsText}>
            {i18n.t("scheduleEnds", { scope })}
          </Text>
        </View>

        {coolingSupported && (
          <View style={styles.row}>
            <Text style={styles.label}>{i18n.t("coolTo", { scope })}</Text>
            <AdjustTemperatureBlock
              currentTemperature={toDisplay(setpoints.cool)}
              onDecreasePress={() => decreaseSetpointSafe("cool")}
              onIncreasePress={() => increaseSetpointSafe("cool")}
              containerStyle={styles.temperatureBlock}
            />
          </View>
        )}
        {heatingSupported && (
          <View style={styles.row}>
            <Text style={styles.label}>{i18n.t("heatTo", { scope })}</Text>
            <AdjustTemperatureBlock
              currentTemperature={toDisplay(setpoints.heat)}
              onDecreasePress={() => decreaseSetpointSafe("heat")}
              onIncreasePress={() => increaseSetpointSafe("heat")}
              containerStyle={styles.temperatureBlock}
            />
          </View>
        )}
        <View style={[styles.row, styles.rowSpaced]}>
          <Text style={styles.label}>Fan schedule</Text>
          <Picker
            value={fanMode}
            options={Object.keys(FAN_SETTINGS).map(value => ({
              value,
              label: i18n.t(`fanSettings.${value}.label`, { scope }),
              itemLabel: i18n.t(`fanSettings.${value}.itemLabel`, { scope }),
            }))}
            onValueChange={value => {
              setHasNewChanges(true);
              setFanMode(value as FanMode);
            }}
            labelStyle={styles.pickerValue}
          />
        </View>
        <View style={styles.row}>
          <StandardButton
            style={styles.btn}
            onPress={onPress}
            disabled={buttonDisabled || !hasNewChanges}
          >
            {loading ? (
              <ActivityIndicator size={"small"} />
            ) : (
              <Text style={fonts.baseTouchableText}>{buttonLabel}</Text>
            )}
          </StandardButton>
          {footer}
        </View>
      </ScrollView>
    </Background>
  );
}

const AdjustSchedule = withQueryData(useAdjustScheduleQuery, {
  useVariables: ({ controllerId }) => ({ controllerId }),
})(WrappedAdjustSchedule);

export default AdjustSchedule;

type EditScheduleProps = {
  navigation: NativeStackNavigationProp<ModalRouteList, "EditSchedule">;
  route: RouteProp<ModalRouteList, "EditSchedule">;
};

export const EditSchedule = ({
  navigation,
  route,
}: EditScheduleProps): JSX.Element => {
  const { controllerId } = useController();
  const { trackFeatureUse, trackFunnel } = useKohortTracking();

  const { day, slot } = route.params;

  const { showActionSheetWithOptions } = useActionSheet();

  const [changeSchedule, { loading }] = useChangeScheduleMutation({
    onCompleted: ({ changeSchedule }) => {
      if (changeSchedule.__typename === "ChangeScheduleSuccess") {
        navigation.dangerouslyGetParent()?.goBack();
      }
    },
  });

  const [
    removeLeaveArrive,
    { loading: removeLoading },
  ] = useRemoveLeaveArriveMutation({
    variables: {
      input: {
        id: controllerId,
        day,
      },
    },
    onCompleted: ({ removeLeaveArrive }) => {
      if (removeLeaveArrive.__typename === "RemoveLeaveArriveSuccess") {
        navigation.dangerouslyGetParent()?.goBack();
      }
    },
  });

  const anchorRef = useRef<View>(null);

  const handlePressDeleteSchedule = (): void => {
    showActionSheetWithOptions({
      items: [
        {
          label: i18n.t("Common.cancel"),
          cancel: true,
        },
        {
          label: i18n.t("Common.delete"),
          onPress: () => {
            removeLeaveArrive();
          },
          destructive: true,
        },
      ],
      anchor: anchorRef.current
        ? findNodeHandle(anchorRef.current) ?? undefined
        : undefined,
    });
  };

  return (
    <AdjustSchedule
      buttonDisabled={removeLoading}
      buttonLabel={i18n.t("Common.save")}
      loading={loading}
      handleButtonPress={(startAt, heat, cool, fanMode) => {
        trackFeatureUse("Change Schedule", slot);
        trackFunnel({ step: KohortFunnelEventStep.Action });
        changeSchedule({
          variables: {
            input: {
              id: controllerId,
              day,
              slot,
              heat,
              cool,
              fanMode,
              hour: startAt.getHours(),
              minute: startAt.getMinutes(),
            },
          },
        });
      }}
      footer={
        slot === "LEAVE" || slot === "ARRIVE" ? (
          <View style={styles.footer} ref={anchorRef}>
            {removeLoading ? (
              <ActivityIndicator size={"small"} />
            ) : (
              <LinkTouchable
                onPress={handlePressDeleteSchedule}
                textStyle={[styles.detailsText, styles.footerText]}
                text={i18n.t("leaveAndReturnDelete", { scope })}
                disabled={loading}
              />
            )}
          </View>
        ) : (
          undefined
        )
      }
    />
  );
};

type CreateLeaveProps = {
  navigation: NativeStackNavigationProp<ModalRouteList, "CreateLeave">;
  route: RouteProp<ModalRouteList, "CreateLeave">;
};

export const CreateLeave = ({
  navigation,
  route,
}: CreateLeaveProps): JSX.Element => {
  const { day } = route.params;

  return (
    <AdjustSchedule
      buttonLabel={i18n.t("Common.continue")}
      handleButtonPress={(startAt, heatTo, coolTo, fanMode) => {
        navigation.push("CreateArrive", {
          slot: "ARRIVE",
          day,
          leaveHour: startAt.getHours(),
          leaveMinute: startAt.getMinutes(),
          leaveCool: coolTo,
          leaveHeat: heatTo,
          leaveFan: fanMode,
        });
      }}
      footer={
        <View style={styles.footer}>
          <Text style={[styles.detailsText, styles.footerText]}>
            {i18n.t("leaveNeedsReturn", { scope })}
          </Text>
        </View>
      }
      requireChanges={false}
    />
  );
};

type CreateArriveProps = {
  navigation: NativeStackNavigationProp<ModalRouteList, "CreateArrive">;
  route: RouteProp<ModalRouteList, "CreateArrive">;
};

export const CreateArrive = ({
  navigation,
  route,
}: CreateArriveProps): JSX.Element => {
  const { controllerId } = useController();

  const {
    day,
    leaveHeat,
    leaveCool,
    leaveFan: leaveFanMode,
    leaveHour,
    leaveMinute,
  } = route.params;
  const [addLeaveArrive, { loading }] = useAddLeaveArriveMutation({
    onCompleted: ({ addLeaveArrive }) => {
      if (addLeaveArrive.__typename === "AddLeaveArriveSuccess") {
        navigation.dangerouslyGetParent()?.goBack();
      }
    },
  });
  return (
    <AdjustSchedule
      buttonLabel={i18n.t("Common.save")}
      handleButtonPress={(startAt, arriveHeat, arriveCool, arriveFanMode) => {
        addLeaveArrive({
          variables: {
            input: {
              id: controllerId,
              day,
              leaveHeat,
              leaveCool,
              leaveFanMode,
              leaveHour,
              leaveMinute,
              arriveHeat,
              arriveCool,
              arriveFanMode,
              arriveHour: startAt.getHours(),
              arriveMinute: startAt.getMinutes(),
            },
          },
        });
      }}
      loading={loading}
      requireChanges={false}
    />
  );
};
