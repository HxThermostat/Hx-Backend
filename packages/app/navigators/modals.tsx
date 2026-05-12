import React, { useCallback } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "react-native-screens/native-stack";

import colors from "~/styles/color";

import HeaderButton from "~/components/Touchables/HeaderButton";
import i18n from "~/i18n";
import {
  HeaderBackButton,
  HeaderTitle,
  StackHeaderLeftButtonProps,
} from "@react-navigation/stack";

export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.modalHeaderBackground,
  },
  contentStyle: {
    borderTopColor: colors.modalHeaderDivider,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  headerHideShadow: true,
  stackPresentation: "push",
};

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerBackButton: {
    left: -15,
  },
});

export const CancelModalButton = (): JSX.Element => {
  const navigation = useNavigation();
  const onPress = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <HeaderButton
      onPress={onPress}
      text={i18n.t("cancel", { scope: "Common" })}
    />
  );
};

CancelModalButton.displayName = "CancelModalButton";

export const HeaderLeftAndroid = (
  props: StackHeaderLeftButtonProps & { title: string }
): JSX.Element => {
  const navigation = useNavigation();
  const onPress = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <View style={styles.headerLeft}>
      <HeaderBackButton
        {...props}
        onPress={onPress}
        style={styles.headerBackButton}
      />
      <HeaderTitle>{props.title}</HeaderTitle>
    </View>
  );
};

HeaderLeftAndroid.displayName = "HeaderLeftAndroid";
