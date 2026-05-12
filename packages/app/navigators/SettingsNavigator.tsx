import React, { useContext } from "react";
import { Platform } from "react-native";

import { createNativeStackNavigator } from "react-native-screens/native-stack";

import SettingsScreen from "~/screens/Settings";

import NamesScreen from "~/screens/Settings/Names";
import ManualsScreen from "~/screens/Settings/Manuals";
import AboutScreen from "~/screens/Settings/About";
import SupportScreen from "~/screens/Settings/Support";
import ProfessionalAccessScreen from "~/screens/Settings/ProfessionalAccess";
import LocationScreen from "~/screens/Settings/Location";
import RenameLocationScreen from "~/screens/Settings/RenameLocation";
import RoomNamesScreen from "~/screens/Settings/RoomNames";
import RenameRoomScreen from "~/screens/Settings/RenameRoom";
import DealerScreen from "~/screens/Settings/Dealer";
import EditDealerScreen from "~/screens/Settings/EditDealer";
import DealerAccessScreen from "~/screens/Settings/DealerAccess";
import GrantAccessScreen from "~/screens/Settings/GrantAccess";
import ScheduleScreen from "~/screens/Settings/Schedule";
import HoldLengthScreen from "~/screens/Settings/HoldLength";
import ScheduleZoneNamesScreen from "~/screens/Settings/ScheduleZoneNames";
import RestoreDefaultScheduleScreen from "~/screens/Settings/RestoreDefaultSchedule";
import NotificationsScreen from "~/screens/Settings/Notifications";
import FaultsScreen from "~/screens/Settings/Faults";
import ServiceRemindersScreen from "~/screens/Settings/ServiceReminders";
import ListTemperaturesScreen from "~/screens/Settings/ListTemperatures";
import TemperatureNotificationScreen from "~/screens/Settings/TemperatureNotification";
import ListHumiditiesScreen from "~/screens/Settings/ListHumidities";
import HumidityNotificationScreen from "~/screens/Settings/HumidityNotification";
import AwayScreen from "~/screens/Settings/Away/Away";
import AdjustAwayScreen from "~/screens/Settings/Away/AdjustAway";
import GeofenceScreen from "~/screens/Settings/Away/Geofence";
import VacationScreen from "~/screens/Settings/Vacation";
import {
  ManageHumidityThresholdScreen,
  ManageDehumidityThresholdScreen,
} from "~/screens/Settings/ManageHumidityThreshold";
import ManageHumiditiesScreen from "~/screens/Settings/ManageHumidities";
import SystemInfoScreen from "~/screens/Settings/SystemInfo";
import SoftwareScreen from "~/screens/Settings/Software";
import SystemLogUserScreen from "~/screens/Settings/SystemLogUser";
import AlexaScreen from "~/screens/Settings/Alexa";
import GoogleHomeScreen from "~/screens/Settings/GoogleHome";
import AccessTypesScreen from "~/screens/Settings/AccessTypes";
import ManageAccountScreen from "~/screens/Settings/ManageAccount";
import ShareAccountScreen from "~/screens/Settings/ShareAccount";
import SplitViewSettings from "~/screens/Settings/SplitViewSettings";

import { useAuth, NavigatorsContext } from "~/contexts";

import i18n from "~/i18n";

import colors from "~/styles/color";

import { largeTitle, NestedNavigatorParams } from "./helpers";
import { Dealer } from "~/graph";
import { ModalRouteList } from "./ModalNavigator";

const scope = "Screens.Authenticated.SettingsNavigator";

export type SettingsNavigatorRouteList = {
  Settings?: undefined;
  SplitViewSettings: SettingsNavigatorRouteList[SettingsScreenNames] & {
    routeName: SettingsScreenNames;
  };
  About: undefined;
  Support: undefined;
  ProfessionalAccess: undefined;
  Manuals: undefined;
  ManageAccount: undefined;
  ShareAccount: undefined;
  Names: { locationId: string };
  Location: { locationId: string };
  RoomNames: { locationId: string };
  RenameLocation: { locationId: string };
  RenameRoom: { controllerId: string };
  Dealer: { locationId: string };
  EditDealer: { locationId: string; field: keyof Dealer };
  DealerAccess: { locationId: string };
  GrantAccess: { locationId: string };
  AccessTypes: undefined;
  Schedule: { locationId: string };
  HoldLength: { locationId: string };
  ScheduleZoneNames: { locationId: string };
  RestoreDefaultSchedule: { controllerId: string };
  Notifications: { locationId: string };
  ListHumidities: { locationId: string };
  ListTemperatures: { locationId: string };
  Faults: { locationId: string };
  ServiceReminders: { locationId: string };
  TemperatureNotification: { controllerId: string };
  HumidityNotification: { controllerId: string };
  Away: { locationId: string };
  Geofence: { locationId: string };
  AdjustAway: { controllerId: string };
  Vacation: { locationId: string };
  ManageHumidityThreshold: {
    controllerId: string;
  };
  ManageDehumidityThreshold: {
    controllerId: string;
  };
  ManageHumidities: { locationId: string };
  SystemInfo: { locationId: string };
  Software: { locationId: string };
  SystemLogUser: { locationId: string };
  Alexa: undefined;
  GoogleHome: undefined;
  ModalNavigator: NestedNavigatorParams<ModalRouteList>;
};

const Stack = createNativeStackNavigator<SettingsNavigatorRouteList>();

// We map through the shared screens to add them to the split view navigator as well
export type SettingsScreenNames = Exclude<
  keyof SettingsNavigatorRouteList,
  "SplitViewSettings" | "Settings" | "ModalNavigator"
>;
export const SettingsScreens = {
  About: AboutScreen,
  Support: SupportScreen,
  ProfessionalAccess: ProfessionalAccessScreen,
  Manuals: ManualsScreen,
  ManageAccount: ManageAccountScreen,
  ShareAccount: ShareAccountScreen,
  Names: NamesScreen,
  Location: LocationScreen,
  RoomNames: RoomNamesScreen,
  RenameLocation: RenameLocationScreen,
  RenameRoom: RenameRoomScreen,
  Dealer: DealerScreen,
  EditDealer: EditDealerScreen,
  DealerAccess: DealerAccessScreen,
  GrantAccess: GrantAccessScreen,
  AccessTypes: AccessTypesScreen,
  Schedule: ScheduleScreen,
  HoldLength: HoldLengthScreen,
  RestoreDefaultSchedule: RestoreDefaultScheduleScreen,
  ScheduleZoneNames: ScheduleZoneNamesScreen,
  Notifications: NotificationsScreen,
  Faults: FaultsScreen,
  ServiceReminders: ServiceRemindersScreen,
  ListTemperatures: ListTemperaturesScreen,
  TemperatureNotification: TemperatureNotificationScreen,
  ListHumidities: ListHumiditiesScreen,
  HumidityNotification: HumidityNotificationScreen,
  Away: AwayScreen,
  AdjustAway: AdjustAwayScreen,
  Geofence: GeofenceScreen,
  Vacation: VacationScreen,
  ManageHumidityThreshold: ManageHumidityThresholdScreen,
  ManageDehumidityThreshold: ManageDehumidityThresholdScreen,
  ManageHumidities: ManageHumiditiesScreen,
  SystemInfo: SystemInfoScreen,
  Software: SoftwareScreen,
  SystemLogUser: SystemLogUserScreen,
  Alexa: AlexaScreen,
  GoogleHome: GoogleHomeScreen,
};

const IS_ANDROID = Platform.OS === "android";

export default function Settings(): JSX.Element {
  const { isPro } = useAuth();
  const { isTablet } = useContext(NavigatorsContext);
  return (
    <Stack.Navigator
      initialRouteName={isTablet ? "SplitViewSettings" : "Settings"}
      screenOptions={{
        ...largeTitle,
        headerTopInsetEnabled: !isPro,
        headerTranslucent: !isTablet && !IS_ANDROID,
      }}
    >
      {isTablet ? (
        <Stack.Screen
          name="SplitViewSettings"
          component={SplitViewSettings}
          initialParams={{ routeName: "About" }}
          options={{
            headerStyle: {
              backgroundColor: colors.black,
            },
          }}
        />
      ) : (
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: Platform.OS !== "android",
            headerLargeTitle: true,
            title: i18n.t("screenTitle", {
              scope: `${scope}.Settings`,
            }),
          }}
        />
      )}
      {Object.entries(SettingsScreens).map(
        ([screenName, screenComponent], index) => (
          <Stack.Screen
            key={index}
            name={screenName as SettingsScreenNames} // object.entries is TS unfriendly here
            component={screenComponent}
            options={{
              title: i18n.t(`${screenName}.screenTitle`, {
                scope,
              }),
              headerStyle: {
                backgroundColor: colors.black,
              },
              headerHideBackButton:
                screenName === "About" && isTablet && IS_ANDROID,
            }}
          />
        )
      )}
    </Stack.Navigator>
  );
}
