import { RouteProp } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import i18n from "~/i18n";

import {
  SettingsNavigatorRouteList,
  SettingsScreens,
} from "~/navigators/SettingsNavigator";

const scope = "Screens.Authenticated.SettingsNavigator";

type SplitViewSettingsNavigationProp = NativeStackNavigationProp<
  SettingsNavigatorRouteList,
  "SplitViewSettings"
>;

export type SplitViewSettingsProps = {
  navigation: SplitViewSettingsNavigationProp;
  route: RouteProp<SettingsNavigatorRouteList, "SplitViewSettings">;
};

const SplitViewSettings = (props: SplitViewSettingsProps): JSX.Element => {
  const screenName = props.route.params.routeName;
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: i18n.t(`${screenName}.screenTitle`, {
        scope,
      }),
    });
  }, [props.navigation, screenName]);

  const Screen: any = SettingsScreens[screenName];
  return <Screen {...props} />;
};

export default SplitViewSettings;
