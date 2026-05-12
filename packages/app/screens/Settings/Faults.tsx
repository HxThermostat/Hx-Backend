import React from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import Background from "~/components/Background";
import ToggleBlock from "~/components/ToggleBlock";

import spacing from "~/styles/spacing";

import i18n from "~/i18n";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

import {
  useLocationNotificationsQuery,
  useToggleFaultNotificationMutation,
} from "~/graph";

import useLazyEffect from "~/hooks/useLazyEffect";
import { usePushNotifications } from "~/hooks/usePushNotifications";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.pythirtytwo,
      android: spacing.mytwenty,
    }),
    ...spacing.pxtwentyfour,
  },
});

type FaultsNavigationProp = NativeStackNavigationProp<
  SettingsNavigatorRouteList,
  "Faults"
>;

export type FaultsProps = {
  navigation: FaultsNavigationProp;
  route: RouteProp<SettingsNavigatorRouteList, "Faults">;
  data: DataHookProp<typeof useLocationNotificationsQuery>;
};

const scope = "Screens.Authenticated.SettingsNavigator.Faults";

function Faults(props: FaultsProps): JSX.Element {
  const {
    data: { location },
  } = props;
  if (!location || !location.faultNotification) throw new GoBack();

  const [notificationEnabled, setNotificationEnabled] = usePushNotifications(
    location.faultNotification.enabled
  );

  const [
    toggleFaultNotificationMutation,
  ] = useToggleFaultNotificationMutation();

  useLazyEffect(() => {
    toggleFaultNotificationMutation({
      variables: {
        input: {
          enabled: notificationEnabled,
          id: location.id,
        },
      },
    });
  }, [notificationEnabled, location.id]);

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
      </ScrollView>
    </Background>
  );
}

export default withQueryData(useLocationNotificationsQuery, {
  options: { fetchPolicy: "cache-and-network" },
  useVariables: () => {
    const route = useRoute<FaultsProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(Faults);
