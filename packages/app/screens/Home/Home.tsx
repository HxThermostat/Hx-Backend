import React, { useCallback, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  GestureResponderEvent,
  Platform,
  Animated,
} from "react-native";

import Icon from "react-native-vector-icons/EvilIcons";

import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { HomeNavigatorRouteList } from "~/navigators/Home";

import Glow from "~/components/Dial/Glow";

import { useController, useTemperatureUnit } from "~/contexts";

import {
  Screen_Home_ControllerFragment as ControllerType,
  useCancelTemperatureHoldMutation,
  useCancelFanHoldMutation,
  useChangeVacationMutation,
  useHomeQuery,
  hasAccess,
  useChangeAwayMutation,
  useChangeLocationAwayMutation,
} from "~/graph";

import useLinkToSettings from "~/hooks/useLinkToSettings";
import { useActionSheet, ActionSheetItem } from "~/hooks/useActionSheet";

import i18n, { usersCurrentRegion } from "~/i18n";

import ActivityIndicator from "~/components/ActivityIndicator";
import Background from "~/components/Background";
import NestableSafeAreaView from "~/components/NestableSafeAreaView";
import Text from "~/components/Text";
import LinkTouchable from "~/components/Touchables/LinkTouchable";
import SmallSquareButton from "~/components/Touchables/SmallSquareButton";
import FanIcon from "~/components/Icons/FanIcon";
import HomeTitleBar from "~/components/HomeTitleBar";
import ControlledDial from "~/components/Dial/ControlledDial";
import Touchable from "~/components/Touchables/Touchable";

import colors from "~/styles/color";

import fonts from "~/styles/fonts";
import spacing, { size } from "~/styles/spacing";

import { withQueryData, DataHookProp } from "~/screens/withQueryData";
import { checkGeofence } from "~/utils/background-tasks";
import { useGlowPulseAnimation } from "~/hooks/useGlowPulseAnimation";
import { useKohortTracking } from "~/utils/kohort";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollFlex: {
    ...spacing.pxsixteen,
    flexGrow: 1,
  },
  titleBarContainer: {
    zIndex: 1,
    marginBottom: -18,
  },
  controls: {},
  dialContainer: {
    alignItems: "center",
    ...spacing.mtthirtytwo,
    ...spacing.mbfortytwo,
  },
  temperatureContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  temperatureTitle: {
    ...fonts.largeTemperatureLabel,
    ...spacing.pxtwentyeight,
    textAlign: "center",
  },
  degreeText: {
    ...fonts.largeTemperatureDegreeText,
    position: "absolute",
    top: 2,
    right: 10,
  },
  controlsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  fanAndModeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: { ...fonts.body, color: colors.white },
  chevron: { ...spacing.mttwo, ...spacing.mltwo },
  fanIcon: {
    ...spacing.mreight,
  },
  statusContainer: {
    height: (fonts.caption2L13.lineHeight ?? 13) * 2,
    ...spacing.mtfourteen,
    ...spacing.mbtwenty,
  },
  statusLoading: {
    marginTop: "auto",
  },
  statusText: {
    textAlign: "center",
    ...fonts.caption2L13,
  },
  statusTextButton: {
    textAlign: "center",
    lineHeight: 15,
  },
  surveyContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    ...spacing.mbten,
  },
  thermostatOffline: {
    textAlign: "center",
    ...fonts.caption2R11,
    color: colors.heatRed,
  },
  glow: {
    position: "absolute",
    ...Platform.select({
      android: { top: -5.5, left: -5.5 },
      default: {
        top: -3.5,
        left: -3.5,
      },
    }),
  },
  additionaliOSFanGlow: {
    shadowColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
});
const GLOW_SIZE = Platform.select({
  android: 32,
  default: 28,
});

const scope = "Screens.Authenticated.HomeNavigator.Home";

function ControlledDialWrapper({
  controller,
  goToSettings,
}: {
  controller: ControllerType;
  goToSettings: (mode: "awayMode" | "vacationMode") => void;
}): JSX.Element {
  let mode: "awayMode" | "vacationMode" | undefined;
  if (controller.away?.active) {
    mode = "awayMode";
  } else if (controller.location.override === "VACATION") {
    mode = "vacationMode";
  }

  const showAlert = useCallback(() => {
    if (mode == null) return;

    Alert.alert(
      i18n.t(`${mode}Alert.title`, { scope }),
      i18n.t(`${mode}Alert.message`, { scope }),
      [
        {
          text: i18n.t(`${mode}Alert.cancel`, { scope }),
          style: "cancel",
        },
        {
          text: i18n.t(`${mode}Alert.openSettings`, { scope }),
          style: "default",
          onPress: () => {
            mode && goToSettings(mode);
          },
        },
      ]
    );
  }, [mode, goToSettings]);

  // Prevent children to respond to touches when mode is enabled
  const onStartShouldSetResponderCapture = useCallback(
    (ev: GestureResponderEvent) => {
      if (!mode) return false;

      ev.stopPropagation();
      showAlert();

      return true;
    },
    [mode, showAlert]
  );

  return (
    <View onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}>
      <ControlledDial controllerId={controller.id} />
    </View>
  );
}

function OverrideRow({
  controller,
}: {
  controller: ControllerType;
}): JSX.Element {
  const period = i18n.t(`period.${controller.scheduleOverride}`, { scope });

  let overrideLabel: string | undefined;
  if (controller.tempOverride || controller.fan?.override) {
    overrideLabel = i18n.t("overrideSchedule", { period, scope });
  }

  const [
    cancelTemperatureHold,
    { loading: cancelTemperatureHoldLoading },
  ] = useCancelTemperatureHoldMutation({
    variables: {
      input: {
        id: controller.id,
      },
    },
  });

  const [
    cancelFanHold,
    { loading: cancelFanHoldLoading },
  ] = useCancelFanHoldMutation({
    variables: {
      input: {
        id: controller.id,
      },
    },
  });

  const { showActionSheetWithOptions } = useActionSheet();
  const { trackFeatureUse } = useKohortTracking();

  const backToSchedule = (): void => {
    trackFeatureUse("Back to Schedule");
    const items: ActionSheetItem[] = [
      {
        label: i18n.t("Common.cancel"),
        cancel: true,
      },
    ];

    if (controller.tempOverride && controller.fan?.override) {
      items.push({
        label: i18n.t("backTo.both", { scope }),
        onPress: async () => {
          const { data } = await cancelTemperatureHold();

          // I don't think this _really_ matters, but if the first
          // mutation didn't work, the second shouldn't either. If a
          // failure really as transient, we're also better off
          // leaving the user's mental model in a consistent state
          // (i.e. something didn't work vs something half-worked)
          if (
            data?.cancelTemperatureHold.__typename ===
            "CancelTemperatureHoldSuccess"
          ) {
            cancelFanHold();
          }
        },
      });
    }

    if (controller.tempOverride) {
      items.push({
        label: i18n.t("backTo.temperature", { scope }),
        onPress: async () => {
          await cancelTemperatureHold();
        },
      });
    }

    if (controller.fan?.override) {
      items.push({
        label: i18n.t("backTo.fan", { scope }),
        onPress: async () => {
          await cancelFanHold();
        },
      });
    }

    // Short-circuit if there is only one item in the list
    // (The first item is awalys the cancel item)
    if (items.length === 2) {
      items[1].onPress && items[1].onPress();
      return;
    }

    showActionSheetWithOptions({
      items,
    });
  };

  if (!overrideLabel) return <View />;

  if (cancelTemperatureHoldLoading || cancelFanHoldLoading)
    return <ActivityIndicator size={"small"} style={styles.statusLoading} />;

  return (
    <View>
      <Text style={styles.statusText}>{overrideLabel}</Text>
      <LinkTouchable
        disabled={
          !hasAccess(controller.accessLevel, "INSTALLER") || controller.disabled
        }
        onPress={backToSchedule}
        textStyle={styles.statusTextButton}
        text={i18n.t("backToSchedule", { scope })}
      />
    </View>
  );
}

function StatusRow({
  controller,
  goToConnectThermostat,
}: {
  controller: ControllerType;
  goToConnectThermostat: () => void;
}): JSX.Element {
  const { location } = controller;
  const [
    turnOffVacationMode,
    { loading: turnOffVacationLoading },
  ] = useChangeVacationMutation({
    variables: { input: { id: location.id, active: false } },
  });

  const [
    turnOffAwayZone,
    { loading: turnOffAwayZoneLoading },
  ] = useChangeAwayMutation({
    variables: {
      input: {
        id: controller.id,
        active: false,
      },
    },
  });

  const [
    turnOffAwayHome,
    { loading: turnOffAwayHomeLoading },
  ] = useChangeLocationAwayMutation({
    variables: {
      input: {
        id: location.id,
        active: false,
      },
    },
  });

  if (
    turnOffVacationLoading ||
    turnOffAwayZoneLoading ||
    turnOffAwayHomeLoading
  ) {
    return <ActivityIndicator size={"small"} style={styles.statusLoading} />;
  }

  if (location.connectionStatus === "OFFLINE") {
    return (
      <Touchable onPress={goToConnectThermostat}>
        <Text style={styles.thermostatOffline}>
          {i18n.t("thermostatOffline", { scope })}
        </Text>
      </Touchable>
    );
  }

  if (location.override === "VACATION") {
    return (
      <LinkTouchable
        disabled={controller.disabled}
        onPress={turnOffVacationMode}
        textStyle={styles.statusTextButton}
        text={i18n.t("turnOffVacationMode", { scope })}
      />
    );
  }

  if (controller.away?.active) {
    return (
      <LinkTouchable
        disabled={controller.disabled}
        onPress={
          location.override === "AWAY" ? turnOffAwayHome : turnOffAwayZone
        }
        textStyle={styles.statusTextButton}
        text={i18n.t("turnOffAwayMode", { scope })}
      />
    );
  }

  return <OverrideRow controller={controller} />;
}

const GLOW_SCALE_MIN = 0.6;
const GLOW_SCALE_MAX = 1;
const GLOW_SCALE_DURATION = 4000;

export type HomeProps = {
  navigation: NativeStackNavigationProp<HomeNavigatorRouteList, "Home">;
  route: RouteProp<HomeNavigatorRouteList, "Home">;
  data: DataHookProp<typeof useHomeQuery>;
};

function Home(props: HomeProps): JSX.Element {
  const { locationId } = useController();
  const { toDisplay } = useTemperatureUnit();

  const {
    data: { controller, controllers, me },
  } = props;

  // TODO(nleach): Need to tie back into the ControllerContext to reset with a valid ID
  if (!controller || !me) throw new Error();

  const singleController =
    controllers.filter(c => {
      return !locationId || c.location.id === locationId;
    }).length === 1;

  useFocusEffect(
    useCallback(() => {
      // We need to apply a small delay here so that the notification
      // handler can run first
      const handle = setTimeout(
        () => checkGeofence(controller.location.id),
        1500
      );
      return () => clearTimeout(handle);
    }, [controller.location.id])
  );

  const { location } = controller;

  const { navigation } = props;

  function goToSelectZone(): void {
    navigation.navigate("ModalNavigator", {
      screen: "SelectZone",
    });
  }
  function goToSelectFan(): void {
    navigation.navigate("ModalNavigator", {
      screen: "SelectFan",
    });
  }
  function goToSelectMode(): void {
    navigation.navigate("ModalNavigator", {
      screen: "SelectModeSimple",
    });
  }
  function goToSurveyChat(): void {
    navigation.navigate("ModalNavigator", {
      screen: "SurveyChat",
    });
  }

  const linkToSettings = useLinkToSettings();

  const currentLocationId = controller.location.id;
  const currentControllerId = controller.id;
  const multipleLocations =
    new Set(controllers.map(c => c.location.id)).size > 1 && locationId == null;

  const goToSettings = useCallback(
    (mode: "awayMode" | "vacationMode"): void => {
      const locationPath = `settings/${
        multipleLocations ? `location/${currentLocationId}` : ""
      }`;
      const path =
        mode === "awayMode"
          ? `${locationPath}/away/${currentLocationId}/adjustAway/${currentControllerId}`
          : `${locationPath}/vacation/${currentLocationId}`;
      linkToSettings(path);
    },
    [currentControllerId, currentLocationId, linkToSettings, multipleLocations]
  );

  const goToFaults = useCallback(() => {
    linkToSettings(
      `settings/${
        multipleLocations ? `location/${currentLocationId}` : ""
      }/systemInfo/${currentLocationId}/logs/${currentLocationId}`
    );
  }, [currentLocationId, linkToSettings, multipleLocations]);

  const goToConnectThermostat = (): void => {
    navigation.navigate("ModalNavigator", {
      screen: "ConnectThermostat",
    });
  };

  const outdoorTemp =
    controller.outdoorTemp == null
      ? controller.outdoorTemp
      : toDisplay<number>(controller.outdoorTemp);

  const glowAnimScale = useGlowPulseAnimation(
    GLOW_SCALE_MIN,
    GLOW_SCALE_MAX,
    GLOW_SCALE_DURATION,
    !!controller.fan?.active
  );

  return (
    <Background>
      <NestableSafeAreaView
        edges={["top", "right", "left"]}
        style={styles.container}
      >
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollFlex}
        >
          <View style={styles.titleBarContainer}>
            <HomeTitleBar
              onPress={goToSelectZone}
              disabled={singleController}
              currentZone={controller.name}
              location={location.name}
              outdoorTemp={outdoorTemp}
              humidity={controller.humidity}
              hideMetadata={!hasAccess(controller.accessLevel, "STATUS")}
              activeFault={
                location.activeFault
                  ? i18n.t("thermostatFault", { scope })
                  : undefined
              }
              onPressFault={goToFaults}
            />
          </View>
          <View style={styles.controlsContainer}>
            <View style={styles.dialContainer}>
              <ControlledDialWrapper
                controller={controller}
                goToSettings={goToSettings}
              />
            </View>
            <View>
              <View style={styles.fanAndModeContainer}>
                <SmallSquareButton
                  disabled={
                    !hasAccess(controller.accessLevel, "INSTALLER") ||
                    !controller.mode ||
                    controller.disabled
                  }
                  onPress={goToSelectMode}
                >
                  <Text style={[styles.text]}>
                    {i18n.t(
                      controller.mode ? `modes.${controller.mode}` : "mode",
                      { scope }
                    )}
                  </Text>
                  <Icon
                    name="chevron-down"
                    style={styles.chevron}
                    size={size.twenty}
                    color={colors.white}
                  />
                </SmallSquareButton>
                <SmallSquareButton
                  onPress={goToSelectFan}
                  disabled={!controller.fan || controller.disabled}
                >
                  <View>
                    {controller.fan?.active && (
                      <Animated.View
                        style={[
                          styles.glow,
                          {
                            transform: [
                              {
                                scale: glowAnimScale?.current ?? 1,
                              },
                            ],
                          },
                        ]}
                      >
                        <Glow color={"white"} size={GLOW_SIZE} />
                      </Animated.View>
                    )}
                    <FanIcon
                      style={[
                        styles.fanIcon,
                        controller.fan?.active
                          ? styles.additionaliOSFanGlow
                          : {},
                      ]}
                      showArrows={
                        controller.fan ? controller.fan.mode !== "AUTO" : false
                      }
                    />
                  </View>
                  <Text style={[styles.text]}>{i18n.t("Common.fan")}</Text>
                </SmallSquareButton>
              </View>
              <View style={styles.statusContainer}>
                <StatusRow
                  controller={controller}
                  goToConnectThermostat={goToConnectThermostat}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </NestableSafeAreaView>
    </Background>
  );
}

export default withQueryData(useHomeQuery, {
  options: { fetchPolicy: "cache-and-network" },
  useVariables: ({ controllerId }) => ({ controllerId }),
})(Home);
