import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import {
  hasAccess,
  ScheduleOverride,
  useChangeScheduleOverrideMutation,
  useSettingsScheduleLocationQuery,
} from "~/graph";

import i18n from "~/i18n";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import FlatList, { Data } from "~/components/Lists/FlatList";
import Picker from "~/components/Picker/Picker";

import useCleanupScreen from "~/hooks/useCleanupScreen";

import fonts from "~/styles/fonts";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

const styles = StyleSheet.create({
  container: {},
});

const scope = "Screens.Authenticated.SettingsNavigator.HoldLength";

const HOLD_LENGTHS: ScheduleOverride[] = [
  "CANCELLED",
  "NEXT_EVENT",
  "HOURS_01",
  "HOURS_02",
  "HOURS_03",
  "HOURS_04",
  "HOURS_05",
  "HOURS_06",
  "HOURS_07",
  "HOURS_08",
  "HOURS_09",
  "HOURS_10",
  "HOURS_11",
  "HOURS_12",
];
export const pickerOptions = HOLD_LENGTHS.map(value => ({
  value,
  label: i18n.t(`holdLengths.${value}`, { scope }),
}));

export type HoldLengthProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "HoldLength"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "HoldLength">;
  data: DataHookProp<typeof useSettingsScheduleLocationQuery>;
};

function HoldLength({
  data: { location },
  navigation,
}: HoldLengthProps): JSX.Element {
  if (!location) throw new GoBack();

  const { controllers } = location;

  const [changeScheduleOverride] = useChangeScheduleOverrideMutation();

  const [pickerLocalValues, setPickerLocalValues] = useState<
    Record<string, string>
  >({});
  useCleanupScreen(() => {
    // Execute mutation to save local values in the server
    Object.entries(pickerLocalValues).forEach(([controllerId, value]) => {
      const controller = controllers.find(c => c.id === controllerId);
      if (value && controller && value !== controller.scheduleOverride) {
        const scheduleOverride = value as ScheduleOverride;
        changeScheduleOverride({
          variables: { input: { id: controllerId, scheduleOverride } },
          optimisticResponse: {
            changeScheduleOverride: {
              __typename: "ChangeScheduleOverrideSuccess",
              controller: {
                ...controller,
                scheduleOverride,
              },
            },
          },
        });
      }
    });

    // Clear picker local value
    setPickerLocalValues({});
  });

  const DATA: Data = controllers.map(controller => ({
    title: controller.name,
    rightElement: (
      <Picker
        value={pickerLocalValues[controller.id] || controller.scheduleOverride}
        options={pickerOptions}
        disabled={!hasAccess(location.accessLevel, "INSTALLER")}
        onValueChange={value => {
          setPickerLocalValues({
            ...pickerLocalValues,
            [controller.id]: value,
          });
        }}
        labelStyle={fonts.listSublabel}
      />
    ),
  }));

  function handleItemPress(item: Item): void {
    if (item.navigate) {
      navigation.navigate(item.navigate.name, item.navigate.params);
    }

    if (item.onPress) {
      item.onPress();
    }
  }
  return (
    <Background>
      <FlatList
        contentContainerStyle={styles.container}
        handleItemPress={handleItemPress}
        data={DATA}
      />
    </Background>
  );
}

export default withQueryData(useSettingsScheduleLocationQuery, {
  useVariables: () => {
    const route = useRoute<HoldLengthProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(HoldLength);
