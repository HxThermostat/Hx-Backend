import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import {
  useChangeProgrammableMutation,
  ScheduleOverride,
  useChangeScheduleOverrideMutation,
  useSettingsScheduleLocationQuery,
  hasAccess,
} from "~/graph";

import i18n from "~/i18n";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import FlatList, { Data } from "~/components/Lists/FlatList";
import Picker from "~/components/Picker/Picker";

import useCleanupScreen from "~/hooks/useCleanupScreen";

import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

import { pickerOptions } from "./HoldLength";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.Schedule";

export type ScheduleProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList, "Schedule">;
  route: RouteProp<SettingsNavigatorRouteList, "Schedule">;
  data: DataHookProp<typeof useSettingsScheduleLocationQuery>;
};

function Schedule({
  route: {
    params: { locationId },
  },
  data: { location },
  navigation,
}: ScheduleProps): JSX.Element {
  if (!location) throw new GoBack();

  const { controllers } = location;

  const [changeProgrammable] = useChangeProgrammableMutation();

  const [changeScheduleOverride] = useChangeScheduleOverrideMutation();

  const [pickerLocalVal, setPickerLocalVal] = useState<string>();
  useCleanupScreen(() => {
    // Execute mutation to save local value in the server
    if (pickerLocalVal && pickerLocalVal !== controllers[0].scheduleOverride) {
      const scheduleOverride = pickerLocalVal as ScheduleOverride;
      changeScheduleOverride({
        variables: {
          input: { id: controllers[0].id, scheduleOverride },
        },
        optimisticResponse: {
          changeScheduleOverride: {
            __typename: "ChangeScheduleOverrideSuccess",
            controller: {
              ...controllers[0],
              scheduleOverride,
            },
          },
        },
      });
    }
    // Clear picker local value
    setPickerLocalVal(undefined);
  });

  const DATA: Data = [
    {
      title: i18n.t("programmable", { scope }),
      chevron: false,
      switch:
        location.programmable != null
          ? {
              value: location.programmable,
              disabled: !hasAccess(location.accessLevel, "INSTALLER"),
              onValueChange: programmable => {
                changeProgrammable({
                  variables: { input: { id: locationId, programmable } },
                  optimisticResponse: {
                    changeProgrammable: {
                      __typename: "ChangeProgrammableSuccess",
                      location: {
                        ...location,
                        programmable,
                      },
                    },
                  },
                });
              },
            }
          : undefined,
    },
    {
      title: i18n.t("holdLength", { scope }),
      disabled:
        !hasAccess(location.accessLevel, "INSTALLER") || !location.programmable,
      ...(controllers.length === 1
        ? {
            rightElement: (
              <Picker
                value={pickerLocalVal || controllers[0].scheduleOverride}
                options={pickerOptions}
                disabled={
                  !hasAccess(location.accessLevel, "INSTALLER") ||
                  !location.programmable
                }
                onValueChange={setPickerLocalVal}
                labelStyle={fonts.listSublabel}
              />
            ),
          }
        : {
            chevron: true,
            navigate: {
              name: "HoldLength",
              params: { locationId: location.id },
            },
          }),
    },
    {
      title: i18n.t("restoreDefaults", { scope }),
      chevron: true,
      disabled:
        !hasAccess(location.accessLevel, "INSTALLER") || !location.programmable,
      ...(controllers.length === 1
        ? {
            navigate: {
              name: "RestoreDefaultSchedule",
              params: { controllerId: controllers[0].id },
            },
          }
        : {
            navigate: {
              name: "ScheduleZoneNames",
              params: { locationId: location.id },
            },
          }),
    },
  ];

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
  useVariables() {
    const route = useRoute<ScheduleProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(Schedule);
