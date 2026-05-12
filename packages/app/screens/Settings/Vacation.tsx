import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, ScrollView, View, Platform, Text } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import { useTemperatureUnit } from "~/contexts";

import {
  Screen_Settings_Vacation_LocationFragment as LocationType,
  useChangeVacationMutation,
  useChangeVacationSetpointsMutation,
  useDebouncedMutation,
  useVacationQuery,
  getSupportedModes,
} from "~/graph";

import useLazyEffect from "~/hooks/useLazyEffect";
import useSetpointsSafe from "~/hooks/useSetpointsSafe";

import i18n from "~/i18n";

import AdjustTemperatureBlock from "~/components/AdjustTemperatureBlock";
import Background from "~/components/Background";
import ToggleBlock from "~/components/ToggleBlock";

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
  row: {
    ...spacing.mbsixtyfour,
  },
  temperatureBlock: {
    ...spacing.mteighteen,
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.Vacation";

export type VacationProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList, "Vacation">;
  route: RouteProp<SettingsNavigatorRouteList, "Vacation">;
  data: DataHookProp<typeof useVacationQuery>;
};

function Vacation({ data: { location } }: VacationProps): JSX.Element {
  const controller = location?.controllers[0];
  if (!location?.vacation || !controller) throw new GoBack();

  const { toDisplay } = useTemperatureUnit();

  const activeServer = location.vacation.active;
  const [activeLocal, setActiveLocal] = useState<boolean>();

  const { heatingSupported, coolingSupported } = getSupportedModes(
    location.modes
  );

  // Use local value if it is overriding the server value
  const active = activeLocal == undefined ? activeServer : activeLocal;
  useEffect(() => {
    // Clear the local value if it was saved in the server
    if (activeServer === activeLocal) {
      setActiveLocal(undefined);
    }
  }, [activeServer, activeLocal]);

  const [cool, setCoolTo] = useState(location.vacation.setpoints.cool);
  const [heat, setHeatTo] = useState(location.vacation.setpoints.heat);

  const optimisticLocation: LocationType = {
    ...location,
    vacation: {
      ...location.vacation,
      active,
      setpoints: {
        ...location.vacation.setpoints,
        heat: heat,
        cool: cool,
      },
    },
  };

  const [
    changeVacation,
    { callPending: callPendingChangeVacation },
  ] = useDebouncedMutation(
    useChangeVacationMutation({
      variables: { input: { id: location.id, active } },
      optimisticResponse: {
        changeVacation: {
          __typename: "ChangeVacationSuccess",
          location: optimisticLocation,
        },
      },
    })
  );

  useLazyEffect(() => {
    if (activeLocal !== undefined) {
      changeVacation();
    }
  }, [activeLocal]);

  const [
    changeVacationSetpoints,
    { callPending: callPendingChangeVacationSetpoints },
  ] = useDebouncedMutation(
    useChangeVacationSetpointsMutation({
      variables: {
        input: { id: location.id, heat: heat, cool: cool },
      },
      optimisticResponse: {
        changeVacationSetpoints: {
          __typename: "ChangeVacationSetpointsSuccess",
          location: optimisticLocation,
        },
      },
    })
  );

  useLazyEffect(changeVacationSetpoints, [heat, cool]);

  // Run the mutation when the screen _loses_ focus
  useFocusEffect(
    useCallback(
      () => () => {
        callPendingChangeVacation();
        callPendingChangeVacationSetpoints();
      },
      [callPendingChangeVacation, callPendingChangeVacationSetpoints]
    )
  );

  function handleValueChange(active: boolean): void {
    setActiveLocal(active);
  }

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
        <ToggleBlock
          title={i18n.t("title", { scope })}
          value={active}
          onValueChange={handleValueChange}
          body={i18n.t("body", { scope })}
        />

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

export default withQueryData(useVacationQuery, {
  useVariables() {
    const route = useRoute<VacationProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(Vacation);
