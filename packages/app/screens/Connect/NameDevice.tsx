import React, { useLayoutEffect, useCallback } from "react";

import { View, StyleSheet } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ConnectThermostatNavigatorRouteList } from "~/navigators/ConnectThermostatNavigator";

import {
  useNameDeviceQuery,
  useRenameControllerMutation,
  useRenameLocationMutation,
} from "~/graph";

import i18n from "~/i18n";

import { PickerOption } from "~/components/Picker/Picker";
import PickerRow from "~/components/Picker/PickerRow";
import HeaderButton from "~/components/Touchables/HeaderButton";

import spacing from "~/styles/spacing";

import Layout from "./Layout";
import { cleanseText } from "~/utils/text";

const scope = "Screens.Authenticated.ConnectThermostatNavigator.NameDevice";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    ...spacing.mtfortytwo,
    alignItems: "center",
  },
  pickerRow: {
    maxWidth: 320,
  },
});

const LOCATION_OPTIONS: PickerOption[] = [
  {
    label: i18n.t("picker.home", { scope }),
    value: i18n.t("picker.home", { scope }),
  },
  {
    label: i18n.t("picker.vacation", { scope }),
    value: i18n.t("picker.vacation", { scope }),
  },
];

const ROOM_OPTIONS: PickerOption[] = [
  {
    label: i18n.t("picker.living", { scope }),
    value: i18n.t("picker.living", { scope }),
  },
  {
    label: i18n.t("picker.hallway", { scope }),
    value: i18n.t("picker.hallway", { scope }),
  },
  {
    label: i18n.t("picker.bedroom", { scope }),
    value: i18n.t("picker.bedroom", { scope }),
  },
  {
    label: i18n.t("picker.upstairs", { scope }),
    value: i18n.t("picker.upstairs", { scope }),
  },
  {
    label: i18n.t("picker.downstairs", { scope }),
    value: i18n.t("picker.downstairs", { scope }),
  },
  {
    label: i18n.t("picker.basement", { scope }),
    value: i18n.t("picker.basement", { scope }),
  },
];

export type NameDeviceProps = {
  navigation: NativeStackNavigationProp<
    ConnectThermostatNavigatorRouteList,
    "NameDevice"
  >;
  route: RouteProp<ConnectThermostatNavigatorRouteList, "NameDevice">;
};

export default function NameDevice({
  navigation,
  route,
}: NameDeviceProps): JSX.Element {
  const { data } = useNameDeviceQuery({
    variables: { locationId: route.params.locationId },
  });

  const location = data?.location;

  if (!location) throw new Error();

  const { controllers } = location;

  const handlePressDone = useCallback(() => {
    navigation.navigate("Connected");
  }, [navigation]);

  const [
    renameLocationMutation,
    { loading: renameContollerLoading },
  ] = useRenameLocationMutation();

  const [
    renameControllerMutation,
    { loading: renameLocationLoading },
  ] = useRenameControllerMutation();

  const loading = renameContollerLoading || renameLocationLoading;

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <HeaderButton
          loading={loading}
          onPress={handlePressDone}
          text={i18n.t("Common.done")}
        />
      ),
    });
  }, [navigation, handlePressDone, loading]);
  const handleLocationNameChange = useCallback(
    (name: string): void => {
      const cleansedName = cleanseText(name);
      renameLocationMutation({
        variables: {
          input: {
            id: location.id,
            name: cleansedName,
          },
        },
      });
    },
    [location.id, renameLocationMutation]
  );

  const handleControllerNameChange = useCallback(
    (id: string, name: string): void => {
      const cleansedName = cleanseText(name);
      renameControllerMutation({
        variables: {
          input: {
            id,
            name: cleansedName,
          },
        },
      });
    },
    [renameControllerMutation]
  );

  return (
    <>
      <Layout
        title={i18n.t("title", { scope, count: controllers.length })}
        content={
          <View style={styles.container}>
            <PickerRow
              style={styles.pickerRow}
              label={i18n.t("location", { scope })}
              inputLabel={i18n.t("labels.location", { scope })}
              inputPlaceholder={i18n.t("placeholders.location", { scope })}
              options={LOCATION_OPTIONS}
              value={location.name}
              onValueChange={handleLocationNameChange}
            />

            {controllers.map((controller, i) => (
              <PickerRow
                key={controller.id}
                style={styles.pickerRow}
                label={
                  i === 0
                    ? i18n.t("room", { scope, count: controllers.length })
                    : undefined
                }
                inputLabel={i18n.t("labels.room", { scope })}
                inputPlaceholder={i18n.t(
                  controllers.length === 1
                    ? "placeholders.room"
                    : "placeholders.zone",
                  { scope, number: i + 1 }
                )}
                options={[
                  ...ROOM_OPTIONS,
                  {
                    label: i18n.t("picker.zone", { scope, number: i + 1 }),
                    value: i18n.t("picker.zone", { scope, number: i + 1 }),
                  },
                ]}
                value={controller.name}
                onValueChange={name => handleControllerNameChange(controller.id, name)}
              />
            ))}
          </View>
        }
        buttonLabel={i18n.t("Common.done")}
        onPress={handlePressDone}
        autoScroll={false}
        activeIndex={5}
      />
    </>
  );
}
