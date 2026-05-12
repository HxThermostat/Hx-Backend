import React, { useState, useLayoutEffect, useCallback } from "react";
import { StyleSheet, ScrollView, Text, View, Platform } from "react-native";

import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import Background from "~/components/Background";
import ToggleBlock from "~/components/ToggleBlock";
import AdjustHumidityBlock from "~/components/AdjustHumidityBlock";

import useLazyEffect from "~/hooks/useLazyEffect";
import { usePushNotifications } from "~/hooks/usePushNotifications";
import useRangeSafe, { Range } from "~/hooks/useRangeSafe";

import {
  useControllerNotificationsQuery,
  useToggleHumidityNotificationMutation,
  useAdjustHumidityNotificationThresholdMutation,
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
  humidityBlock: {
    ...spacing.mxthirtytwo,
  },
});

type HumidityNotificationNavigationProp = NativeStackNavigationProp<
  SettingsNavigatorRouteList,
  "HumidityNotification"
>;

export type HumidityNotificationProps = {
  navigation: HumidityNotificationNavigationProp;
  route: RouteProp<SettingsNavigatorRouteList, "HumidityNotification">;
  data: DataHookProp<typeof useControllerNotificationsQuery>;
};

const scope = "Screens.Authenticated.SettingsNavigator.HumidityNotification";

// TODO(nleach): These three configuration values should really come
// from the Graph
const MAX_RANGE = { min: 20, max: 65 };
const MIN_RANGE = { min: 15, max: 60 };
const DEADBAND = 5;

function HumidityNotification(props: HumidityNotificationProps): JSX.Element {
  const {
    navigation,
    data: { controller },
  } = props;
  if (!controller?.humidityNotification) throw new GoBack();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: controller.name,
    });
  }, [navigation, controller.name]);

  const [min, setMinTo] = useState(
    Math.trunc(controller.humidityNotification.min * 100)
  );
  const [max, setMaxTo] = useState(
    Math.trunc(controller.humidityNotification.max * 100)
  );

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
    controller.humidityNotification.enabled
  );

  const [
    toggleHumidityNotificationMutation,
  ] = useToggleHumidityNotificationMutation();

  useLazyEffect(() => {
    toggleHumidityNotificationMutation({
      variables: {
        input: {
          enabled: notificationEnabled,
          id: controller.id,
        },
      },
    });
  }, [notificationEnabled, controller.id]);

  const [
    adjustHumidityNotificationThresholdMutation,
    { callPending },
  ] = useDebouncedMutation(useAdjustHumidityNotificationThresholdMutation(), {
    delay: 1000,
    leading: false,
  });

  useLazyEffect(() => {
    adjustHumidityNotificationThresholdMutation({
      variables: {
        input: { id: controller.id, min: min / 100, max: max / 100 },
      },
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
                {i18n.t("higherThan", { scope })}
              </Text>
              <AdjustHumidityBlock
                handleDecreasePress={() => decreaseRangeSafe("max")}
                handleIncreasePress={() => increaseRangeSafe("max")}
                value={max}
                containerStyle={styles.humidityBlock}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.heading}>
                {i18n.t("lowerThan", { scope })}
              </Text>
              <AdjustHumidityBlock
                handleDecreasePress={() => decreaseRangeSafe("min")}
                handleIncreasePress={() => increaseRangeSafe("min")}
                value={min}
                containerStyle={styles.humidityBlock}
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
    const route = useRoute<HumidityNotificationProps["route"]>();

    return {
      controllerId: route.params.controllerId,
    };
  },
})(HumidityNotification);
