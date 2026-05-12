import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";

import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import RNCSlider, { SliderProps } from "@react-native-community/slider";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import moment from "moment";
import { useDebouncedCallback } from "use-debounce";

import i18n from "~/i18n";

import { ProAppNavigatorRouteList } from "~/navigators/ProAppNavigator";

import Background from "~/components/Background";

import colors from "~/styles/color";
import spacing, { size } from "~/styles/spacing";
import fonts from "~/styles/fonts";
import Touchable from "~/components/Touchables/Touchable";
import SmallSquareButton from "~/components/Touchables/SmallSquareButton";
import LinkTouchable from "~/components/Touchables/LinkTouchable";
import { withQueryData, DataHookProp, GoBack } from "~/screens/withQueryData";
import {
  useAirflowSettingsQuery,
  useChangeAirflowMutation,
  useStartAirflowTestMutation,
  useStopAirflowTestMutation,
  useDebouncedMutation,
} from "~/graph";
import HeaderButton from "~/components/Touchables/HeaderButton";
import useAppState from "~/hooks/useAppState";

const scope = "Screens.ProApp.ProAppNavigator.AirflowSettings";

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
    ...spacing.pxtwentyfour,
  },
  headerContainer: {
    ...spacing.mtfiftyfour,
    ...spacing.mbtwentryfour,
  },
  heading: {
    ...fonts.largeTitle,
    ...spacing.mbfive,
  },
  subheading: {
    ...fonts.caption2L13,
  },
  midScreenContainer: {},
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...spacing.mtfourteen,
    ...spacing.mbtwentyfour,
  },
  currentValueRow: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    height: 50,
  },
  currentValueText: {
    flex: 1,
    textAlign: "right",
    ...fonts.largeTemperatureDegreeText,
    alignSelf: "center",
    fontVariant: ["tabular-nums"],
  },
  currentValueSuffix: {
    alignSelf: "flex-end",
    ...fonts.secondaryHeader,
    ...spacing.mbeight,
    ...spacing.mlfour,
  },
  sliderRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    ...spacing.mytwentyfour,
  },
  slider: {
    flex: 1,
  },
  minMaxText: {
    ...fonts.caption2,
    color: colors.offGray,
    ...spacing.mxeight,
  },
  testButton: {
    borderColor: colors.tint,
  },
  testText: {
    color: colors.tint,
  },
  stopButton: {
    borderColor: colors.stopRed,
  },
  stopText: {
    color: colors.stopRed,
  },
  iconButton: {
    width: size.thirtytwo,
    height: size.thirtytwo,
    borderRadius: size.thirtytwo,
    backgroundColor: colors.iconButtonBackground,
    justifyContent: "center",
    alignItems: "center",
    ...spacing.mxtwentyfour,
  },
  defaultValue: {
    ...spacing.mlfour,
    ...fonts.caption2L13,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 54,
    ...spacing.mtfortyeight,
  },
  statusHeading: {
    ...fonts.caption2B13,
    ...spacing.mbfourteen,
    fontVariant: ["tabular-nums"],
  },
  statusCaption: {
    ...fonts.caption2L13,
    fontVariant: ["tabular-nums"],
  },
});

const STEP = 10;
const DEFAULT = 400;

// Duration is 15 Minutes in milliseconds
const TEST_DURATION = 15 * 60 * 1000;

const noop = (): void => undefined;

function Slider(props: SliderProps): JSX.Element {
  const [value, setValue] = useState(props.value);
  const [sliding, setSliding] = useState(false);

  const [onValueChange] = useDebouncedCallback(
    props.onValueChange ?? noop,
    16,
    { leading: true, maxWait: 16 }
  );

  const _onSlidingStart = props.onSlidingStart;
  const onSlidingStart = useCallback(
    (value: number) => {
      setSliding(true);
      _onSlidingStart && _onSlidingStart(value);
    },
    [_onSlidingStart]
  );

  const _onSlidingComplete = props.onSlidingComplete;
  const onSlidingComplete = useCallback(
    (value: number) => {
      setSliding(false);
      _onSlidingComplete && _onSlidingComplete(value);
    },
    [_onSlidingComplete]
  );

  useEffect(() => {
    console.debug({ sliding, value, pvalue: props.value });
    if (!sliding) {
      setValue(props.value);
    }
  }, [sliding, props.value, value]);

  return (
    <RNCSlider
      {...props}
      value={value}
      onValueChange={onValueChange}
      onSlidingStart={onSlidingStart}
      onSlidingComplete={onSlidingComplete}
      ref={undefined} // Silly hack to address TS issue
    />
  );
}

function Timer({
  startTimestamp,
  duration,
}: {
  startTimestamp: number;
  duration: number;
}): JSX.Element {
  const countdown = Math.max(0, duration - (Date.now() - startTimestamp));

  // Force an update every 100ms
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    const interval = setInterval(forceUpdate, 100);
    return () => clearInterval(interval);
  }, [forceUpdate]);

  return (
    <Text style={styles.statusHeading}>
      {i18n.t("testInProgress", {
        scope,
        remaining: moment("2020-01-01") // Any arbitrary date
          .milliseconds(countdown)
          .format("mm:ss"),
      })}
    </Text>
  );
}

function TestStatus({
  controllerId,
  running,
  setRunning,
}: {
  controllerId: string;
  running: boolean;
  setRunning: (running: boolean) => void;
}): JSX.Element {
  const navigation = useNavigation();

  const { data } = useAirflowSettingsQuery({
    variables: { controllerId },
    fetchPolicy: "cache-and-network",
    pollInterval: 1000,
  });

  const controller = data?.controller;
  if (!controller) throw new Error();

  const { location } = controller;
  const activeAirflow = location.airflow?.active ?? 0;

  const [startTimestamp, setStartTimestamp] = useState<Date | undefined>();

  useEffect(() => {
    setRunning(controller.airflowTestActive ?? false);
  }, [controller.airflowTestActive, setRunning]);

  const [startAirflowTest] = useStartAirflowTestMutation({
    variables: { controllerId: controller.id },
    optimisticResponse: {
      toggleAirflowTest: {
        __typename: "ToggleAirflowTestSuccess",
        controller: {
          ...controller,
          airflowTestActive: true,
        },
      },
    },
  });

  const [stopAirflowTest] = useStopAirflowTestMutation({
    variables: { controllerId: controller.id },
    optimisticResponse: {
      toggleAirflowTest: {
        __typename: "ToggleAirflowTestSuccess",
        controller: {
          ...controller,
          airflowTestActive: false,
        },
      },
    },
  });

  const startTest = useCallback((): void => {
    if (running) return;
    setRunning(true);
    startAirflowTest();
  }, [running, setRunning, startAirflowTest]);

  const stopTest = useCallback((): void => {
    if (!running) return;
    setRunning(false);
    setStartTimestamp(undefined);
    stopAirflowTest();
  }, [running, setRunning, stopAirflowTest]);

  useEffect(() => {
    // The countdown only starts once there is active airflow in the system
    if (!activeAirflow) return;
    if (!running || startTimestamp != null) return;

    setStartTimestamp(new Date());

    const timeout = setTimeout(stopTest, TEST_DURATION);
    return () => clearTimeout(timeout);
  }, [activeAirflow, running, startTimestamp, stopTest]);

  const appState = useAppState();

  useEffect(() => {
    if (appState !== "active") {
      stopTest();
    }
  }, [appState, stopTest]);

  // Restore the latest saved value whenever the user navigates away
  // from this screen
  useEffect(() => {
    return navigation.addListener("beforeRemove", stopTest);
  }, [navigation, running, stopTest]);

  const onButtonPress = useCallback((): void => {
    if (running) {
      stopTest();
    } else {
      Alert.alert(
        i18n.t("onsiteAlert.title", { scope }),
        i18n.t("onsiteAlert.message", { scope }),
        [
          {
            text: i18n.t("onsiteAlert.cancel", { scope }),
            style: "cancel",
          },
          {
            text: i18n.t("onsiteAlert.default", { scope }),
            onPress() {
              startTest();
            },
          },
        ]
      );
    }
  }, [running, startTest, stopTest]);

  return (
    <View style={styles.statusContainer}>
      <View>
        {running &&
          (startTimestamp ? (
            <Timer
              duration={TEST_DURATION}
              startTimestamp={startTimestamp.getTime()}
            />
          ) : (
            <Text style={styles.statusHeading}>
              {i18n.t("waitingToStart", { scope })}
            </Text>
          ))}
        {running && (
          <Text style={styles.statusCaption}>
            {i18n.t("activeCfm", {
              scope,
              cfm: controller.location.airflow?.active ?? 0,
            })}
          </Text>
        )}
        {!running && <View />}
      </View>
      <SmallSquareButton
        style={[styles.testButton, running ? styles.stopButton : null]}
        onPress={onButtonPress}
      >
        <Text style={[styles.testText, running ? styles.stopText : null]}>
          {i18n.t(running ? "stop" : "test", { scope })}
        </Text>
      </SmallSquareButton>
    </View>
  );
}

export type AirflowSettingsProps = {
  navigation: NativeStackNavigationProp<
    ProAppNavigatorRouteList,
    "AirflowSettings"
  >;
  route: RouteProp<ProAppNavigatorRouteList, "AirflowSettings">;
  data: DataHookProp<typeof useAirflowSettingsQuery>;
};

function AirflowSettings({
  data,
  navigation,
}: AirflowSettingsProps): JSX.Element {
  const controller = data.controller;

  if (
    !controller ||
    controller.airflow == null ||
    controller.location.airflow == null
  )
    throw new GoBack();

  const minimumValue = controller.location.airflow.min;
  const maximumValue = controller.location.airflow.max;

  const [initialValue, setInitialValue] = useState(controller.airflow);
  const [currentValue, setCurrentValue] = useState(controller.airflow);

  const changed = initialValue !== currentValue;

  const [running, setRunning] = useState(controller.airflowTestActive ?? false);

  const onMinusPress = useCallback((): void => {
    setCurrentValue(currentValue =>
      Math.max(minimumValue, currentValue - STEP)
    );
  }, [minimumValue]);

  const onPlusPress = useCallback((): void => {
    setCurrentValue(currentValue =>
      Math.min(maximumValue, currentValue + STEP)
    );
  }, [maximumValue]);

  const onSlidingComplete = useCallback((value: number): void => {
    setCurrentValue(value);
  }, []);

  const [
    changeAirflowDebounced,
    { cancel: cancelPending },
  ] = useDebouncedMutation(
    useChangeAirflowMutation({
      update() {
        // Don't update the cache for these requests, we'll "commit"
        // our value when the user taps the save button
      },
    })
  );

  useEffect(() => {
    if (currentValue === initialValue) return;

    changeAirflowDebounced({
      variables: {
        controllerId: controller.id,
        value: currentValue,
      },
    });
  }, [changeAirflowDebounced, currentValue, controller.id, initialValue]);

  const [changeAirflow, { loading: saving }] = useChangeAirflowMutation({
    variables: {
      controllerId: controller.id,
      value: currentValue,
    },
    optimisticResponse: {
      changeAirflow: {
        __typename: "ChangeAirflowSuccess",
        controller: {
          ...controller,
          airflow: currentValue,
        },
      },
    },
  });

  const handleSave = useCallback(() => {
    cancelPending();
    changeAirflow();
    setInitialValue(currentValue);
  }, [cancelPending, changeAirflow, currentValue]);

  // This is a little funky, but we're using this state variable +
  // useEffect to actually run the mutation to restore the values.
  // This let's us leverage the fact that the mutation function is
  // built from the `currentValue` to avoid building our own
  // `optimisticResponse` for this call
  const [restoreDefault, setRestoreDefault] = useState(false);

  useEffect(() => {
    if (!restoreDefault) return;
    handleSave();
    setRestoreDefault(false);
  }, [handleSave, restoreDefault]);

  const handleRestoreDefault = useCallback(() => {
    setCurrentValue(DEFAULT);
    setRestoreDefault(true);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <HeaderButton
          disabled={!changed}
          loading={saving}
          onPress={handleSave}
          text={i18n.t("Common.save")}
        />
      ),
    });
  }, [changed, handleSave, navigation, saving]);

  const restoreValues = useCallback(() => {
    if (!changed) return;
    changeAirflow({
      variables: {
        controllerId: controller.id,
        value: initialValue,
      },
      optimisticResponse: {
        changeAirflow: {
          __typename: "ChangeAirflowSuccess",
          controller: {
            ...controller,
            airflow: initialValue,
          },
        },
      },
    });
  }, [changeAirflow, changed, controller, initialValue]);

  // Restore the latest saved value whenever the user navigates away
  // from this screen
  useEffect(() => {
    return navigation.addListener("beforeRemove", restoreValues);
  }, [navigation, restoreValues]);

  const { bottom: paddingBottom } = useSafeAreaInsets();

  return (
    <Background>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={[styles.scrollView, { paddingBottom }]}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>{controller.name}</Text>
          <Text style={styles.subheading}>
            {i18n.t("zone", {
              scope,
              zone: controller.zone ?? 1,
            })}
          </Text>
        </View>
        <View style={styles.midScreenContainer}>
          <View style={styles.currentValueRow}>
            <Touchable
              disabled={running}
              style={styles.iconButton}
              onPress={onMinusPress}
            >
              <Icon name="remove" size={size.twentyfour} color={colors.white} />
            </Touchable>

            <Text
              style={[styles.currentValueText]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
            >
              {currentValue}
            </Text>
            <Text style={styles.currentValueSuffix}>CFM</Text>

            <Touchable
              disabled={running}
              style={styles.iconButton}
              onPress={onPlusPress}
            >
              <Icon name="add" size={size.twentyfour} color={colors.white} />
            </Touchable>
          </View>

          <View style={styles.sliderRow}>
            <Text style={styles.minMaxText}>{minimumValue}</Text>
            <Slider
              style={styles.slider}
              value={currentValue}
              onValueChange={setCurrentValue}
              onSlidingComplete={onSlidingComplete}
              step={STEP}
              minimumValue={minimumValue}
              maximumValue={maximumValue}
              minimumTrackTintColor={colors.tint}
              disabled={running}
            />
            <Text style={styles.minMaxText}>{maximumValue}</Text>
          </View>

          <TestStatus
            controllerId={controller.id}
            running={running}
            setRunning={setRunning}
          />
        </View>

        <View></View>

        <View
          style={[
            styles.footerContainer,
            {
              opacity: +(changed || currentValue !== DEFAULT),
            },
          ]}
        >
          <LinkTouchable
            text={i18n.t("restoreDefault", { scope })}
            onPress={handleRestoreDefault}
          />
          <Text style={styles.defaultValue}>
            {i18n.t("defaultCfm", {
              scope,
              cfm: DEFAULT,
            })}
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}

export default withQueryData(useAirflowSettingsQuery, {
  options: {
    fetchPolicy: "cache-and-network",
  },
  useVariables() {
    const route = useRoute<AirflowSettingsProps["route"]>();

    return { controllerId: route.params.controllerId };
  },
})(AirflowSettings);
