import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, Platform, Text } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import { useTemperatureUnit } from "~/contexts";

import {
  useChangeAwaySetpointsMutation,
  useDebouncedMutation,
  useAwayControllerQuery,
  getSupportedModes,
} from "~/graph";

import useLazyEffect from "~/hooks/useLazyEffect";
import useSetpointsSafe from "~/hooks/useSetpointsSafe";

import i18n from "~/i18n";

import Background from "~/components/Background";
import AdjustTemperatureBlock from "~/components/AdjustTemperatureBlock";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

import { transformSetpointRange } from "~/utils/display";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
    ...spacing.pxtwentyfour,
  },
  heading: {
    ...fonts.secondaryHeaderSemibold,
    ...spacing.mbten,
  },
  description: {
    ...fonts.bodyL,
  },
  controls: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  row: {
    ...spacing.mbsixtyfour,
  },
  temperatureBlock: {
    ...spacing.mteighteen,
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.AdjustAway";

export type AdjustAwayProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "AdjustAway"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "AdjustAway">;
  data: DataHookProp<typeof useAwayControllerQuery>;
};

function AdjustAway({
  route: {
    params: { controllerId },
  },
  data: { controller },
}: AdjustAwayProps): JSX.Element {
  if (!controller?.away) throw new GoBack();

  const { toDisplay } = useTemperatureUnit();

  const [cool, setCoolTo] = useState(controller.away.setpoints.cool);
  const [heat, setHeatTo] = useState(controller.away.setpoints.heat);

  const { heatingSupported, coolingSupported } = getSupportedModes(
    controller.modes
  );

  const [changeAwaySetpoints, { callPending }] = useDebouncedMutation(
    useChangeAwaySetpointsMutation({
      variables: {
        input: { id: controllerId, cool, heat },
      },
      optimisticResponse: {
        changeAwaySetpoints: {
          __typename: "ChangeAwaySetpointsSuccess",
          controller: {
            ...controller,
            away: controller.away && {
              ...controller.away,
              setpoints: {
                ...controller.away.setpoints,
                heat,
                cool,
              },
            },
          },
        },
      },
    })
  );

  useLazyEffect(changeAwaySetpoints, [heat, cool]);

  // Run the mutation when the screen _loses_ focus
  useFocusEffect(useCallback(() => () => callPending(), [callPending]));

  const onValuesChange = useCallback(
    ({ cool, heat }: { cool?: number; heat?: number }) => {
      if (cool != null) {
        setCoolTo(cool);
      }

      if (heat != null) {
        setHeatTo(heat);
      }
    },
    []
  );

  const { increaseSetpointSafe, decreaseSetpointSafe } = useSetpointsSafe(
    { cool, heat },
    transformSetpointRange(controller.coolRange),
    transformSetpointRange(controller.heatRange),
    controller.deadband,
    onValuesChange
  );

  return (
    <Background>
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior={"automatic"}
        alwaysBounceVertical={false}
      >
        <View style={styles.row}>
          <Text style={styles.heading}>{i18n.t("awayMode", { scope })}</Text>
          <Text style={styles.description}>
            {i18n.t("saveEnergyDescription", { scope })}
          </Text>
        </View>

        {coolingSupported && (
          <View style={styles.row}>
            <Text style={styles.heading}>{i18n.t("coolTo", { scope })}</Text>
            <AdjustTemperatureBlock
              currentTemperature={toDisplay(cool)}
              onIncreasePress={() => increaseSetpointSafe("cool")}
              onDecreasePress={() => decreaseSetpointSafe("cool")}
              containerStyle={styles.temperatureBlock}
            />
          </View>
        )}
        {heatingSupported && (
          <View style={styles.row}>
            <Text style={styles.heading}>{i18n.t("heatTo", { scope })}</Text>
            <AdjustTemperatureBlock
              currentTemperature={toDisplay(heat)}
              onIncreasePress={() => increaseSetpointSafe("heat")}
              onDecreasePress={() => decreaseSetpointSafe("heat")}
              containerStyle={styles.temperatureBlock}
            />
          </View>
        )}
      </ScrollView>
    </Background>
  );
}

export default withQueryData(useAwayControllerQuery, {
  useVariables() {
    const route = useRoute<AdjustAwayProps["route"]>();

    return {
      controllerId: route.params.controllerId,
    };
  },
})(AdjustAway);
