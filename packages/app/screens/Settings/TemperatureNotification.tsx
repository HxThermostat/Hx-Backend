import React, { useState, useLayoutEffect, useCallback } from "react";
import { StyleSheet, ScrollView, Text, View, Platform } from "react-native";

import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import Background from "~/components/Background";
import ToggleBlock from "~/components/ToggleBlock";
import AdjustTemperatureBlock from "~/components/AdjustTemperatureBlock";

import useLazyEffect from "~/hooks/useLazyEffect";
import { usePushNotifications } from "~/hooks/usePushNotifications";
import useRangeSafe, { Range } from "~/hooks/useRangeSafe";

import { useTemperatureUnit } from "~/contexts";

import {
  useControllerNotificationsQuery,
  useToggleTemperatureNotificationMutation,
  useAdjustTemperatureNotificationThresholdMutation,
  useDebouncedMutation,
} from "~/graph";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

import i18n from "~/i18n";

import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.pythirtytwo,
      android: spacing.mytwenty,
    }),
    ...spacing.pxtwentyfour,
  },
  row: {
    ...spacing.mbsixtyfour,
  },
  temperatureBlock: {
    ...spacing.mteighteen,
  },
  heading: {
    ...fonts.secondaryHeaderSemibold,
    ...spacing.mbten,
  },
});

type TemperatureNotificationNavigationProp = NativeStackNavigationProp<
  SettingsNavigatorRouteList,
  "TemperatureNotification"
>;

export type TemperatureNotificationProps = {
  navigation: TemperatureNotificationNavigationProp;
  route: RouteProp<SettingsNavigatorRouteList, "TemperatureNotification">;
  data: DataHookProp<typeof useControllerNotificationsQuery>;
};

const scope = "Screens.Authenticated.SettingsNavigator.TemperatureNotification";

// TODO(nleach): These three configuration values should really come
// from the Graph
const MAX_RANGE = { min: 15, max: 90 };
const MIN_RANGE = { min: 40, max: 88 };
const DEADBAND = 2;

function TemperatureNotification(
  props: TemperatureNotificationProps
): JSX.Element {
  const {
    navigation,
    data: { controller },
  } = props;
  if (!controller?.temperatureNotification) throw new GoBack();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: controller.name,
    });
  }, [navigation, controller.name]);

  const { toDisplay } = useTemperatureUnit();

  const [min, setMinTo] = useState(controller.temperatureNotification.min);
  const [max, setMaxTo] = useState(controller.temperatureNotification.max);

  const onValuesChange = useCallback((newRange: Partial<Range>) => {
    if (newRange.max != null) setMaxTo(newRange.max);
    if (newRange.min != null) setMinTo(newRange.min);
  }, []);

  const { increaseRangeSafe, decreaseRangeSafe } = useRangeSafe(
    { min, max },
    MAX_RANGE,
    MIN_RANGE,
    DEADBAND,
    onValuesChange
  );

  const [notificationEnabled, setNotificationEnabled] = usePushNotifications(
    controller.temperatureNotification.enabled
  );

  const [
    toggleTemperatureNotificationMutation,
  ] = useToggleTemperatureNotificationMutation();

  useLazyEffect(() => {
    toggleTemperatureNotificationMutation({
      variables: {
        input: {
          enabled: notificationEnabled,
          id: controller.id,
        },
      },
    });
  }, [notificationEnabled, controller.id]);

  const [
    adjustTemperatureNotificationThresholdMutation,
    { callPending },
  ] = useDebouncedMutation(
    useAdjustTemperatureNotificationThresholdMutation(),
    { delay: 1000, leading: false }
  );

  useLazyEffect(() => {
    adjustTemperatureNotificationThresholdMutation({
      variables: { input: { id: controller.id, min, max } },
    });
  }, [min, max]);

  // Flush any outstanding updates when the user navigates away from
  // this screen
  useFocusEffect(useCallback(() => () => callPending(), [callPending]));

  return (
    <Background>
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior={"automatic"}
        alwaysBounceVertical={false}
      >
        <ToggleBlock
          title={i18n.t("title", { scope })}
          value={notificationEnabled}
          onValueChange={setNotificationEnabled}
          body={i18n.t("body", { scope })}
        />

        {notificationEnabled && (
          <>
            <View style={styles.row}>
              <Text style={styles.heading}>
                {i18n.t("warmerThan", { scope })}
              </Text>
              <AdjustTemperatureBlock
                currentTemperature={toDisplay(max)}
                onIncreasePress={() => increaseRangeSafe("max")}
                onDecreasePress={() => decreaseRangeSafe("max")}
                containerStyle={styles.temperatureBlock}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.heading}>
                {i18n.t("coolerThan", { scope })}
              </Text>
              <AdjustTemperatureBlock
                currentTemperature={toDisplay(min)}
                onIncreasePress={() => increaseRangeSafe("min")}
                onDecreasePress={() => decreaseRangeSafe("min")}
                containerStyle={styles.temperatureBlock}
              />
            </View>
          </>
        )}
      </ScrollView>
    </Background>
  );
}

export default withQueryData(useControllerNotificationsQuery, {
  options: { fetchPolicy: "cache-and-network" },
  useVariables: () => {
    const route = useRoute<TemperatureNotificationProps["route"]>();

    return {
      controllerId: route.params.controllerId,
    };
  },
})(TemperatureNotification);
