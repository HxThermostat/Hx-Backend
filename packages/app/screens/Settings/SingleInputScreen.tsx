import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Platform, ScrollView } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { systemWeights } from "react-native-typography";

import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import i18n from "~/i18n";

import Background from "~/components/Background";

import TextInputWithLabel, {
  TextInputWithLabelProps,
} from "~/components/Inputs/TextInputWithLabel";
import HeaderButton from "~/components/Touchables/HeaderButton";

import spacing from "~/styles/spacing";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
    ...spacing.pxtwentyfour,
  },
  label: { ...systemWeights.semibold, ...spacing.mbtwenty },
});

type HandleSaveResult = "cancel" | void;

type SingleInputScreenProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList>;
  value: string;
  handleSave: () => HandleSaveResult;
  onChangeText: (value: string) => void;
  label?: string;
} & TextInputWithLabelProps;

export default function SingleInputScreen({
  navigation,
  handleSave,
  value,
  label,
  onChangeText,
  ...rest
}: SingleInputScreenProps): JSX.Element {
  const [initialValueChanged, setInitialValueChanged] = useState<boolean>(
    false
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <HeaderButton
          disabled={!initialValueChanged}
          onPress={() => {
            const result = handleSave();

            if (result === "cancel") return;
            
            // eslint-disable-next-line react/prop-types
            navigation.goBack();
          }}
          text={i18n.t("Common.save")}
        />
      ),
    });
  }, [navigation, handleSave, initialValueChanged]);

  function handleInputChange(value: string): void {
    setInitialValueChanged(true);
    onChangeText(value);
  }

  return (
    <Background>
      <ScrollView
        contentInsetAdjustmentBehavior={"automatic"}
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
      >
        <TextInputWithLabel
          autoFocus={true}
          labelStyle={styles.label}
          onChangeText={handleInputChange}
          clearButtonMode={"always"}
          label={label}
          value={value}
          {...rest}
        />
      </ScrollView>
    </Background>
  );
}
