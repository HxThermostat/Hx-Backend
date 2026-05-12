import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Platform, ScrollView } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import i18n from "~/i18n";

import Background from "~/components/Background";

import HeaderButton from "~/components/Touchables/HeaderButton";

import spacing from "~/styles/spacing";
import PickerRow from "~/components/Picker/PickerRow";
import { PickerOption } from "~/components/Picker/Picker";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
    ...spacing.pxtwentyfour,
  },
});

type NameSettingsScreenProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList>;
  value: string;
  handleSave: () => void;
  onValueChange: (value: string) => void;
  label: string;
  inputLabel: string;
  inputPlaceholder: string;
  options: PickerOption[];
};

export default function NameSettingsScreen({
  navigation,
  handleSave,
  value,
  label,
  inputLabel,
  inputPlaceholder,
  options,
  onValueChange,
}: NameSettingsScreenProps): JSX.Element {
  const [initialValueChanged, setInitialValueChanged] = useState<boolean>(
    false
  );

  const valueSet = value.trim().length > 0;
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <HeaderButton
          disabled={!initialValueChanged || !valueSet}
          onPress={() => {
            handleSave();
            // eslint-disable-next-line react/prop-types
            navigation.goBack();
          }}
          text={i18n.t("Common.save")}
        />
      ),
    });
  }, [handleSave, initialValueChanged, navigation, valueSet]);

  function handleInputChange(value: string): void {
    setInitialValueChanged(true);
    onValueChange(value);
  }

  return (
    <Background>
      <ScrollView
        contentInsetAdjustmentBehavior={"automatic"}
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
      >
        <PickerRow
          label={label}
          inputLabel={inputLabel}
          inputPlaceholder={inputPlaceholder}
          options={options}
          value={value}
          onValueChange={handleInputChange}
          onInputChangeText={handleInputChange}
        />
      </ScrollView>
    </Background>
  );
}
