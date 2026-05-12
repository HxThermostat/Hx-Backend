import React from "react";
import { StyleSheet, ScrollView, Platform, View } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";
import { RouteProp } from "@react-navigation/native";

import Background from "~/components/Background";
import Text from "~/components/Text";

import i18n from "~/i18n";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";
import colors from "~/styles/color";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
    ...spacing.pxtwenty,
  },
  title: {
    ...fonts.largeTitle,
    ...spacing.pbfortyeight,
  },
  sectionText: {
    ...fonts.textInputTextLabelSemi,
    textTransform: "uppercase",
  },
  detailText: {
    ...spacing.mtsix,
    ...fonts.caption2L13,
    lineHeight: 22,
    opacity: 0.5,
  },
  tableText: {
    ...fonts.caption2,
    lineHeight: 18,
    color: colors.black,
    textAlign: "center",
  },
  headerStyle: {
    ...fonts.caption2R13,
    textAlign: "center",
  },
  section: {
    ...spacing.mbthirtytwo,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  pill: {
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    ...spacing.mxeight,
  },
  control: {
    backgroundColor: colors.accessControl,
  },
  viewOnly: {
    backgroundColor: colors.accessViewOnly,
  },
  noAccess: {
    backgroundColor: colors.noAccess,
  },
  accessTypeTable: {
    ...spacing.mttwentyfour,
  },
  tableColumnHeader: {
    textAlign: "center",
  },
  tableRowHeader: {
    ...fonts.caption2R13,
    ...spacing.preight,
    flexShrink: 1,
    flexWrap: "wrap",
    opacity: 0.5,
  },
  tableCell: {
    flex: 1,
    justifyContent: "center",
    height: 36,
  },
});

type AccessTypesNavigationProp = NativeStackNavigationProp<
  SettingsNavigatorRouteList,
  "AccessTypes"
>;

export type AccessTypesProps = {
  navigation: AccessTypesNavigationProp;
  route: RouteProp<SettingsNavigatorRouteList, "AccessTypes">;
};

const scope = "Screens.Authenticated.SettingsNavigator.AccessTypes";

type Access = "control" | "viewOnly" | "noAccess";

const tableData: [string, [Access, Access, Access]][] = [
  ["mode", ["control", "viewOnly", "noAccess"]],
  ["setpoints", ["control", "viewOnly", "noAccess"]],
  ["schedules", ["control", "viewOnly", "noAccess"]],
  ["fan", ["control", "viewOnly", "noAccess"]],
  ["vacation", ["control", "viewOnly", "noAccess"]],
  ["settings", ["control", "viewOnly", "noAccess"]],
  ["zones", ["control", "viewOnly", "viewOnly"]],
  ["locations", ["control", "viewOnly", "viewOnly"]],
  ["airflow", ["control", "viewOnly", "viewOnly"]],
  ["faults", ["control", "control", "control"]],
  ["dealer", ["control", "control", "control"]],
  ["service", ["viewOnly", "viewOnly", "viewOnly"]],
];

export default function AccessTypes(): JSX.Element {
  return (
    <Background>
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior={"automatic"}
      >
        <Text style={styles.title}>{i18n.t("title", { scope })}</Text>
        {["INSTALLER", "DIAGNOSTIC", "STATUS", "TEMPORARY"].map(key => (
          <View style={styles.section} key={`optionDescriptions.${key}`}>
            <Text style={styles.sectionText}>
              {i18n.t(`optionDescriptions.${key}.title`, { scope })}
            </Text>
            <Text style={styles.detailText}>
              {i18n.t(`optionDescriptions.${key}.description`, { scope })}
            </Text>
          </View>
        ))}
        <View style={styles.section}>
          <Text style={styles.sectionText}>
            {i18n.t("tableTitle", { scope })}
          </Text>
          <View style={styles.accessTypeTable}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell]}>
                <Text style={[styles.tableText, styles.headerStyle]}> </Text>
              </View>
              {["INSTALLER", "DIAGNOSTIC", "STATUS"].map(key => (
                <View style={[styles.tableCell]} key={`columnHeadings.${key}`}>
                  <Text
                    ellipsizeMode={"tail"}
                    numberOfLines={1}
                    style={[styles.tableText, styles.headerStyle]}
                  >
                    {i18n.t(`columnHeadings.${key}`, { scope })}
                  </Text>
                </View>
              ))}
            </View>
            {tableData.map(([property, [installer, diagnostic, status]]) => {
              return (
                <View key={`row.${property}`} style={styles.tableRow}>
                  <View style={[styles.tableCell]}>
                    <Text
                      ellipsizeMode={"tail"}
                      numberOfLines={2}
                      style={styles.tableRowHeader}
                      textBreakStrategy={"simple"}
                    >
                      {i18n.t(`rowLabels.${property}`, { scope })}
                    </Text>
                  </View>
                  <View style={[styles.tableCell]}>
                    <Text
                      ellipsizeMode={"middle"}
                      numberOfLines={1}
                      style={[styles.tableText, styles.pill, styles[installer]]}
                    >
                      {i18n.t(`tableValues.${installer}`, { scope })}
                    </Text>
                  </View>
                  <View style={[styles.tableCell]}>
                    <Text
                      style={[
                        styles.tableText,
                        styles.pill,
                        styles[diagnostic],
                      ]}
                    >
                      {i18n.t(`tableValues.${diagnostic}`, { scope })}
                    </Text>
                  </View>
                  <View style={[styles.tableCell]}>
                    <Text
                      style={[styles.tableText, styles.pill, styles[status]]}
                    >
                      {i18n.t(`tableValues.${status}`, { scope })}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}
