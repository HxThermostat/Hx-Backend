import React from "react";
import { View, StyleSheet } from "react-native";

import SettingsNavigator from "~/navigators/SettingsNavigator";

import SettingsScreen from "~/screens/Settings";
import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

// @TODO zibs this styling could use some improvement eventually
const styles = StyleSheet.create({
  tabletRoot: { flex: 1, flexDirection: "row" },
  tabletMasterView: {
    flex: 1,
    flexDirection: "column",
    maxWidth: 400,
    borderRightColor: colors.divider,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  tabletSettingsHeader: {
    ...fonts.largeTitle,
    ...spacing.plsixteen,
    ...spacing.pbeight,
    ...spacing.ptsixtyfour,
  },
  tabletDetailView: {
    flex: 1,
    overflow: "hidden",
  },
});

const SettingsSplitViewScreen = (): JSX.Element => {
  return (
    <View style={styles.tabletRoot}>
      <View style={styles.tabletMasterView}>
        <SettingsScreen />
      </View>
      <View style={styles.tabletDetailView}>
        <SettingsNavigator />
      </View>
    </View>
  );
};

export default SettingsSplitViewScreen;
