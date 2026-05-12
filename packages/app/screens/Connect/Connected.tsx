import React, { useCallback, useState } from "react";

import { RouteProp } from "@react-navigation/native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ConnectThermostatNavigatorRouteList } from "~/navigators/ConnectThermostatNavigator";

import { useAuth } from "~/contexts";

import i18n from "~/i18n";

import images from "~/assets/images";

import Layout from "./Layout";
import {
  useKohortTracking,
  KohortFunnel,
  KohortFunnelEventStep,
} from "~/utils/kohort";

const scope = "Screens.Authenticated.ConnectThermostatNavigator.Connected";

export type ConnectedProps = {
  navigation: NativeStackNavigationProp<
    ConnectThermostatNavigatorRouteList,
    "Connected"
  >;
  router: RouteProp<ConnectThermostatNavigatorRouteList, "Connected">;
};

export default function Connected({ navigation }: ConnectedProps): JSX.Element {
  const { bootstrap, completeOnboarding, isOnboarding } = useAuth();
  const [loading, setLoading] = useState(false);
  const { trackFunnel } = useKohortTracking();

  const onPress = useCallback(async () => {
    trackFunnel({
      funnel: KohortFunnel.Adoption,
      step: KohortFunnelEventStep.Connection,
    });
    trackFunnel({
      funnel: KohortFunnel.Connection,
      step: KohortFunnelEventStep.ConnectionSuccess,
    });
    setLoading(true);
    await bootstrap();
    if (isOnboarding) {
      completeOnboarding();
    } else {
      navigation.dangerouslyGetParent()?.goBack();
    }
  }, [bootstrap, completeOnboarding, isOnboarding, navigation]);

  return (
    <Layout
      image={images.connected}
      title={i18n.t("title", { scope })}
      instructions={i18n.t("instructions", { scope })}
      buttonLabel={i18n.t("button", { scope })}
      buttonLoading={loading}
      onPress={onPress}
      activeIndex={6}
    />
  );
}
