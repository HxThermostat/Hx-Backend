import React from "react";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ConnectThermostatNavigatorRouteList } from "~/navigators/ConnectThermostatNavigator";

import i18n from "~/i18n";

import images from "~/assets/images";

import Layout from "./Layout";
import {
  KohortFunnel,
  KohortFunnelEventStep,
  useKohortTracking,
} from "~/utils/kohort";

const scope = "Screens.Authenticated.ConnectThermostatNavigator.Welcome";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  ConnectThermostatNavigatorRouteList,
  "Welcome"
>;

export type WelcomeProps = {
  navigation: WelcomeScreenNavigationProp;
  router: RouteProp<ConnectThermostatNavigatorRouteList, "Welcome">;
};

export default function Welcome(props: WelcomeProps): JSX.Element {
  const { navigation } = props;
  const { trackFunnel } = useKohortTracking();

  return (
    <Layout
      image={images.connect}
      title={i18n.t("title", { scope })}
      instructions={i18n.t("instructions", { scope })}
      buttonLabel={i18n.t("Common.continue")}
      onPress={() => {
        trackFunnel({
          funnel: KohortFunnel.Connection,
          step: KohortFunnelEventStep.ConnectionStart,
        });
        navigation.navigate("Setup");
      }}
      activeIndex={0}
      secondaryButtonLabel={i18n.t("secondaryButtonLabel", { scope })}
      secondaryOnPress={() => {
        trackFunnel({
          funnel: KohortFunnel.Connection,
          step: KohortFunnelEventStep.ConnectionStart,
        });
        navigation.navigate("ProfessionalAccess");
      }}
    />
  );
}
