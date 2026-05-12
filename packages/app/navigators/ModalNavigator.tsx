import React from "react";
import { Platform } from "react-native";

import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { defaultScreenOptions, CancelModalButton } from "~/navigators/modals";

import { useAuth } from "~/contexts";

import { ScheduleSlot, FanMode, Day, ShareAccessLevel } from "~/graph";

import i18n from "~/i18n";

import DismissModalButton from "~/components/Touchables/DismissModalButton";

import {
  EditSchedule,
  CreateLeave,
  CreateArrive,
} from "~/screens/Schedules/AdjustSchedule";
import CopySchedule from "~/screens/Schedules/CopySchedule";
import SelectFan from "~/screens/Home/SelectFan";
import SelectMode from "~/screens/Home/SelectMode";
import SelectModeAdvanced from "~/screens/Home/SelectModeAdvanced";
import SelectZone from "~/screens/Home/SelectZone";
import SurveyChatModal from "~/screens/Home/SurveyChatModal";
import { ConnectThermostatModalNavigator } from "./ConnectThermostatNavigator";

// Pro app
import NestableSafeAreaView from "~/components/NestableSafeAreaView";
import AccessTypes from "~/screens/Settings/AccessTypes";
import CustomerView from "~/screens/ProApp/InstallerView/CustomerView";
import RequestAccess from "~/screens/ProApp/RequestAccess/RequestAccess";
import Settings from "~/screens/Settings";
import About from "~/screens/Settings/About";
import ManageAccount from "~/screens/Settings/ManageAccount";
import GrantAccess from "~/screens/Settings/GrantAccess";
import Manuals from "~/screens/Settings/Manuals";
import Alexa from "~/screens/Settings/Alexa";

export type ModalRouteList = {
  ConnectThermostat: undefined;
  CopySchedule: {
    day: Day;
  };
  CreateArrive: {
    day: Day;
    slot: "ARRIVE";
    leaveHour: number;
    leaveMinute: number;
    leaveCool: number;
    leaveHeat: number;
    leaveFan: FanMode;
  };
  CreateLeave: {
    day: Day;
    slot: "LEAVE";
  };
  EditSchedule: {
    day: Day;
    slot: ScheduleSlot;
  };
  SelectFan: undefined;
  SelectModeSimple: undefined;
  SelectModeAdvanced: undefined;
  SelectZone: undefined;
  SurveyChat: undefined;
  GrantAccess: {
    accessLevel: ShareAccessLevel;
    email: string;
    limit?: boolean;
  };

  // Pro app
  CustomerView: { locationId: string };
  RequestAccess: undefined;
  AccessTypes: undefined;
  Settings: undefined;
  About: undefined;
  ManageAccount: undefined;
  Manuals: undefined;
  Alexa: undefined;
};

const Stack = createNativeStackNavigator<ModalRouteList>();

const homeScope = "Screens.Authenticated.HomeNavigator";
const proScope = "Screens.ProApp.ProAppNavigator";
const schedulesScope = "Screens.Authenticated.SchedulesNavigator";
const settingsScope = "Screens.Authenticated.SettingsNavigator";

export default function ModalNavigator(): JSX.Element {
  const { isPro } = useAuth();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <NestableSafeAreaView edges={["right", "left"]} style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          ...defaultScreenOptions,
          // Don't add a headerTopInset in Android if it is inside ProApp.CustomerView
          headerTopInsetEnabled: !isPro,
          contentStyle: { borderTopWidth: 0 },
        }}
      >
        <Stack.Screen
          name="ConnectThermostat"
          component={ConnectThermostatModalNavigator}
          options={{
            headerShown: false,
            stackPresentation: "formSheet",
          }}
        />
        <Stack.Screen
          name="EditSchedule"
          component={EditSchedule}
          options={({ route }) => ({
            title: i18n.t(`AdjustSchedule.title.${route.params.slot}`, {
              scope: schedulesScope,
            }),
            headerLeft: Platform.select({ ios: CancelModalButton }),
          })}
        />
        <Stack.Screen
          name="CreateLeave"
          component={CreateLeave}
          options={({ route }) => ({
            title: i18n.t(`AdjustSchedule.title.${route.params.slot}`, {
              scope: schedulesScope,
            }),
            headerLeft: Platform.select({ ios: CancelModalButton }),
          })}
        />
        <Stack.Screen
          name="CreateArrive"
          component={CreateArrive}
          options={({ route }) => ({
            title: i18n.t(`AdjustSchedule.title.${route.params.slot}`, {
              scope: schedulesScope,
            }),
          })}
        />
        <Stack.Screen
          name="CopySchedule"
          component={CopySchedule}
          options={{
            title: i18n.t("CopySchedule.screenTitle", {
              scope: schedulesScope,
            }),
            headerLeft: Platform.select({ ios: CancelModalButton }),
          }}
        />
        <Stack.Screen
          name="SelectZone"
          component={SelectZone}
          options={{
            title: i18n.t("screenTitle", {
              scope: `${homeScope}.SelectZone`,
            }),
            headerRight: Platform.select({ ios: DismissModalButton }),
          }}
        />
        <Stack.Screen
          name="SelectModeSimple"
          component={SelectMode}
          options={{
            title: i18n.t("screenTitle", {
              scope: `${homeScope}.SelectModeSimple`,
            }),
            headerRight: Platform.select({ ios: DismissModalButton }),
          }}
        />
        <Stack.Screen
          name="SelectModeAdvanced"
          component={SelectModeAdvanced}
          options={{
            title: i18n.t("screenTitle", {
              scope: `${homeScope}.SelectModeAdvanced`,
            }),
            headerRight: Platform.select({ ios: DismissModalButton }),
          }}
        />
        <Stack.Screen
          name="SelectFan"
          component={SelectFan}
          options={{
            title: i18n.t("screenTitle", { scope: `${homeScope}.SelectFan` }),
            headerRight: Platform.select({ ios: DismissModalButton }),
          }}
        />
        <Stack.Screen
          name="SurveyChat"
          component={SurveyChatModal}
          options={{
            title: i18n.t("screenTitle", {
              scope: `${homeScope}.Home.survey.chat`,
            }),
            headerRight: Platform.select({ ios: DismissModalButton }),
          }}
        />
        <Stack.Screen
          name="GrantAccess"
          component={GrantAccess}
          options={{
            title: i18n.t("screenTitle", {
              scope: `${settingsScope}.GrantAccess`,
            }),
            headerRight: Platform.select({ ios: DismissModalButton }),
          }}
        />

        {/* Pro app */}
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerRight: Platform.select({ ios: DismissModalButton }),
            headerTopInsetEnabled: true,
            title: i18n.t("screenTitle", {
              scope: `${settingsScope}.Settings`,
            }),
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerTopInsetEnabled: true,
            title: i18n.t("screenTitle", {
              scope: `${settingsScope}.About`,
            }),
          }}
        />
        <Stack.Screen
          name="ManageAccount"
          component={ManageAccount}
          options={{
            headerTopInsetEnabled: true,
            title: i18n.t("screenTitle", {
              scope: `${settingsScope}.ManageAccount`,
            }),
          }}
        />
        <Stack.Screen
          name="Manuals"
          component={Manuals}
          options={{
            headerTopInsetEnabled: true,
            title: i18n.t("screenTitle", {
              scope: `${settingsScope}.Manuals`,
            }),
          }}
        />
        <Stack.Screen
          name="Alexa"
          component={Alexa}
          options={{
            headerTopInsetEnabled: true,
            title: i18n.t("screenTitle", {
              scope: `${settingsScope}.Alexa`,
            }),
          }}
        />
        <Stack.Screen
          name="RequestAccess"
          component={RequestAccess}
          options={{
            headerLeft: Platform.select({ ios: CancelModalButton }),
            headerTopInsetEnabled: true,
            title: i18n.t("screenTitle", {
              scope: `${proScope}.RequestAccess`,
            }),
          }}
        />
        <Stack.Screen
          name="AccessTypes"
          component={AccessTypes}
          options={{
            headerTopInsetEnabled: true,
            title: i18n.t("screenTitle", {
              scope: `${settingsScope}.AccessTypes`,
            }),
          }}
        />
        <Stack.Screen
          name="CustomerView"
          component={CustomerView}
          options={{
            headerShown: false,
            headerRight: Platform.select({ ios: DismissModalButton }),
            title: i18n.t("screenTitle", {
              scope: `${proScope}.CustomerView`,
            }),
          }}
        />
      </Stack.Navigator>
    </NestableSafeAreaView>
  );
}
