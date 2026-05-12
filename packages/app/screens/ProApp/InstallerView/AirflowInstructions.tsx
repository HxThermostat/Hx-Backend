import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ProAppNavigatorRouteList } from "~/navigators/ProAppNavigator";

import { useAuth } from "~/contexts";

import i18n from "~/i18n";

import images from "~/assets/images";

import Background from "~/components/Background";
import ImageIcon from "~/components/ImageIcon";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

const scope = "Screens.ProApp.ProAppNavigator.AirflowInstructions";

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    ...spacing.pxtwentyfour,
  },
  header: {
    ...fonts.largeTitle,
    ...spacing.pyfiftyfour,
  },
  instruction: {
    flexDirection: "row",
    alignItems: "center",
    ...spacing.mbtwentyfour,
  },
  checkmark: {
    ...spacing.mrtwentyfour,
    tintColor: colors.tint,
  },
  instructionLabel: {
    flexShrink: 1,
    ...fonts.caption2L13,
    lineHeight: 20,
  },
});

function Instruction({ text }: { text: string }): JSX.Element {
  return (
    <View style={styles.instruction}>
      <ImageIcon image={images.checkmark} style={styles.checkmark} />

      <Text style={styles.instructionLabel}>{text}</Text>
    </View>
  );
}

export type AirflowInstructionsProps = {
  navigation: NativeStackNavigationProp<
    ProAppNavigatorRouteList,
    "AirflowInstructions"
  >;
  route: RouteProp<ProAppNavigatorRouteList, "AirflowInstructions">;
};

export default function AirflowInstructions(): JSX.Element {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { readAirflowInstructions } = useAuth();

  useEffect(readAirflowInstructions, [readAirflowInstructions]);

  return (
    <Background>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={[styles.scrollView, { paddingBottom }]}
      >
        <Text style={styles.header}>{i18n.t("screenTitle", { scope })}</Text>
        <View>
          <Instruction text={i18n.t("performedOnsite", { scope })} />
          <Instruction text={i18n.t("ozoneExposure", { scope })} />
          <Instruction text={i18n.t("adjacentBleeding", { scope })} />
          <Instruction text={i18n.t("bypassDamper", { scope })} />
          <Instruction text={i18n.t("excessDemand", { scope })} />
          <Instruction text={i18n.t("installerAccess", { scope })} />
        </View>
      </ScrollView>
    </Background>
  );
}
