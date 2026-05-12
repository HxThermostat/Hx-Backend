import { GraphQLResolveInfo } from "graphql";
import {
  UserMapper,
  LocationMapper,
  DeviceMapper,
  ShareMapper,
  PushTokenMapper,
} from "./mappers";
import { AppContext } from "./context";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum AccessLevel {
  Owner = "OWNER",
  Installer = "INSTALLER",
  Diagnostic = "DIAGNOSTIC",
  Status = "STATUS",
}

export enum Platform {
  Ios = "IOS",
  Android = "ANDROID",
}

export type Query = {
  __typename?: "Query";
  _?: Maybe<Scalars["Boolean"]>;
  controller?: Maybe<Controller>;
  controllers: Array<Controller>;
  location?: Maybe<Location>;
  locations: Array<Location>;
  me?: Maybe<User>;
  requestRating: Scalars["Boolean"];
  requestSurveyFeedback: Scalars["Boolean"];
  updateRequired: Scalars["Boolean"];
};

export type QueryControllerArgs = {
  id: Scalars["ID"];
};

export type QueryLocationArgs = {
  id: Scalars["ID"];
};

export type QueryRequestRatingArgs = {
  input?: Maybe<RequestRatingInput>;
};

export type QueryRequestSurveyFeedbackArgs = {
  input: RequestSurveyFeedbackInput;
};

export type QueryUpdateRequiredArgs = {
  input: UpdateRequiredInput;
};

export type Mutation = {
  __typename?: "Mutation";
  _?: Maybe<Scalars["Boolean"]>;
  addLeaveArrive: AddLeaveArriveResult;
  adjustHumidityNotificationThreshold: AdjustHumidityNotificationThresholdResult;
  adjustServiceReminderDates: AdjustServiceReminderDatesResult;
  adjustTemperatureNotificationThreshold: AdjustTemperatureNotificationThresholdResult;
  cancelFanHold: CancelFanHoldResult;
  cancelTemperatureHold: CancelTemperatureHoldResult;
  changeAirflow: ChangeAirflowResult;
  changeAway: ChangeAwayResult;
  changeAwaySetpoints: ChangeAwaySetpointsResult;
  changeDealer: ChangeDealerResult;
  changeDehumidification: ChangeHumidificationResult;
  changeDehumidificationMode: ChangeHumidificationModeResult;
  changeFanCfm: ChangeFanCfmResult;
  changeFanMode: ChangeFanModeResult;
  changeHumidification: ChangeHumidificationResult;
  changeHumidificationMode: ChangeHumidificationModeResult;
  changeLocationAway: ChangeLocationAwayResult;
  changeMode: ChangeModeResult;
  changeProgrammable: ChangeProgrammableResult;
  changeSchedule: ChangeScheduleResult;
  changeScheduleOverride: ChangeScheduleOverrideResult;
  changeSetpoint: ChangeSetpointResult;
  changeTemperatureUnit: ChangeTemperatureUnitResult;
  changeVacation: ChangeVacationResult;
  changeVacationSetpoints: ChangeVacationSetpointsResult;
  checkEmail: CheckEmailResult;
  convertToHomeownerAccount: ConvertToHomeownerAccountResult;
  convertToProAccount: ConvertToProAccountResult;
  copySchedule: CopyScheduleResult;
  generateLoginToken: GenerateLoginTokenResult;
  generateShareToken: GenerateShareTokenResult;
  refreshStatus: RefreshStatusResult;
  refreshToken: RefreshTokenResult;
  registerLocation: RegisterLocationResult;
  removeAccount: RemoveAccountResult;
  removeLeaveArrive: RemoveLeaveArriveResult;
  removeLocation: RemoveLocationResult;
  renameController: RenameControllerResult;
  renameLocation: RenameLocationResult;
  requestShare: RequestShareResult;
  requestSurveySession: RequestSurveySessionResult;
  resetLogs: ResetLogsResult;
  restoreDefaultSchedule: RestoreDefaultScheduleResult;
  revokeShare: RevokeShareResult;
  sendToken: SendTokenResult;
  setAppActive: SetAppActiveResult;
  shareLocation: ShareLocationResult;
  signIn: SignInResult;
  signOut: SignOutResult;
  signUp: SignUpResult;
  subscribeToNotifications: SubscribeToNotificationsResult;
  toggleAirflowTest: ToggleAirflowTestResult;
  toggleFaultNotification: ToggleFaultNotificationResult;
  toggleHumidityNotification: ToggleHumidityNotificationResult;
  toggleServiceReminder: ToggleServiceReminderResult;
  toggleTemperatureNotification: ToggleTemperatureNotificationResult;
  unsubscribeFromNotifications: UnsubscribeFromNotificationsResult;
};

export type MutationAddLeaveArriveArgs = {
  input: AddLeaveArriveInput;
};

export type MutationAdjustHumidityNotificationThresholdArgs = {
  input: AdjustHumidityNotificationThresholdInput;
};

export type MutationAdjustServiceReminderDatesArgs = {
  input: AdjustServiceReminderDatesInput;
};

export type MutationAdjustTemperatureNotificationThresholdArgs = {
  input: AdjustTemperatureNotificationThresholdInput;
};

export type MutationCancelFanHoldArgs = {
  input: CancelFanHoldInput;
};

export type MutationCancelTemperatureHoldArgs = {
  input: CancelTemperatureHoldInput;
};

export type MutationChangeAirflowArgs = {
  input: ChangeAirflowInput;
};

export type MutationChangeAwayArgs = {
  input: ChangeAwayInput;
};

export type MutationChangeAwaySetpointsArgs = {
  input: ChangeAwaySetpointsInput;
};

export type MutationChangeDealerArgs = {
  input: ChangeDealerInput;
};

export type MutationChangeDehumidificationArgs = {
  input: ChangeHumidificationInput;
};

export type MutationChangeDehumidificationModeArgs = {
  input: ChangeHumidificationModeInput;
};

export type MutationChangeFanCfmArgs = {
  input: ChangeFanCfmInput;
};

export type MutationChangeFanModeArgs = {
  input: ChangeFanModeInput;
};

export type MutationChangeHumidificationArgs = {
  input: ChangeHumidificationInput;
};

export type MutationChangeHumidificationModeArgs = {
  input: ChangeHumidificationModeInput;
};

export type MutationChangeLocationAwayArgs = {
  input: ChangeLocationAwayInput;
};

export type MutationChangeModeArgs = {
  input: ChangeModeInput;
};

export type MutationChangeProgrammableArgs = {
  input: ChangeProgrammableInput;
};

export type MutationChangeScheduleArgs = {
  input: ChangeScheduleInput;
};

export type MutationChangeScheduleOverrideArgs = {
  input: ChangeScheduleOverrideInput;
};

export type MutationChangeSetpointArgs = {
  input: ChangeSetpointInput;
};

export type MutationChangeTemperatureUnitArgs = {
  input: ChangeTemperatureUnitInput;
};

export type MutationChangeVacationArgs = {
  input: ChangeVacationInput;
};

export type MutationChangeVacationSetpointsArgs = {
  input: ChangeVacationSetpointsInput;
};

export type MutationCheckEmailArgs = {
  input: CheckEmailInput;
};

export type MutationConvertToProAccountArgs = {
  input: ConvertToProAccountInput;
};

export type MutationCopyScheduleArgs = {
  input: CopyScheduleInput;
};

export type MutationRefreshStatusArgs = {
  input: RefreshStatusInput;
};

export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};

export type MutationRegisterLocationArgs = {
  input: RegisterLocationInput;
};

export type MutationRemoveAccountArgs = {
  input: RemoveAccountInput;
};

export type MutationRemoveLeaveArriveArgs = {
  input: RemoveLeaveArriveInput;
};

export type MutationRemoveLocationArgs = {
  input: RemoveLocationInput;
};

export type MutationRenameControllerArgs = {
  input: RenameControllerInput;
};

export type MutationRenameLocationArgs = {
  input: RenameLocationInput;
};

export type MutationRequestShareArgs = {
  input: RequestShareInput;
};

export type MutationResetLogsArgs = {
  input: ResetLogsInput;
};

export type MutationRestoreDefaultScheduleArgs = {
  input: RestoreDefaultScheduleInput;
};

export type MutationRevokeShareArgs = {
  input: RevokeShareInput;
};

export type MutationSendTokenArgs = {
  input: SendTokenInput;
};

export type MutationSetAppActiveArgs = {
  input: SetAppActiveInput;
};

export type MutationShareLocationArgs = {
  input: ShareLocationInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationSignOutArgs = {
  input: SignOutInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationSubscribeToNotificationsArgs = {
  input: SubscribeToNotificationsInput;
};

export type MutationToggleAirflowTestArgs = {
  input: ToggleAirflowTestInput;
};

export type MutationToggleFaultNotificationArgs = {
  input: ToggleFaultNotificationInput;
};

export type MutationToggleHumidityNotificationArgs = {
  input: ToggleHumidityNotificationInput;
};

export type MutationToggleServiceReminderArgs = {
  input: ToggleServiceReminderInput;
};

export type MutationToggleTemperatureNotificationArgs = {
  input: ToggleTemperatureNotificationInput;
};

export type MutationUnsubscribeFromNotificationsArgs = {
  input: UnsubscribeFromNotificationsInput;
};

export type RequestSurveySessionResult = {
  __typename?: "RequestSurveySessionResult";
  userId: Scalars["String"];
  userName: Scalars["String"];
  sessionToken: Scalars["String"];
  sessionExpiresAt: Scalars["String"];
};

export type RequestRatingInput = {
  build: Scalars["String"];
  installedAt: Scalars["String"];
  lastDisplayedAt?: Maybe<Scalars["String"]>;
  platform: Platform;
  version: Scalars["String"];
};

export type RequestSurveyFeedbackInput = {
  build: Scalars["String"];
  installedAt: Scalars["String"];
  lastDisplayedAt?: Maybe<Scalars["String"]>;
  lastResponseAt?: Maybe<Scalars["String"]>;
  platform: Platform;
  version: Scalars["String"];
};

export type UpdateRequiredInput = {
  platform: Platform;
  version: Scalars["String"];
  build: Scalars["String"];
};

export type CheckEmailInput = {
  email: Scalars["String"];
};

export type CheckEmailResult = {
  __typename?: "CheckEmailResult";
  available: Scalars["Boolean"];
};

export type SendTokenInput = {
  email: Scalars["String"];
  skipDeepLink?: Maybe<Scalars["Boolean"]>;
};

export enum AccountStatus {
  Confirmed = "CONFIRMED",
  Unconfirmed = "UNCONFIRMED",
}

export type SendTokenSuccess = {
  __typename?: "SendTokenSuccess";
  accountStatus?: Maybe<AccountStatus>;
};

export type SendTokenResult = SendTokenSuccess | NotFound;

export type SignUpInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  country: Scalars["String"];
};

export type SignUpSuccess = {
  __typename?: "SignUpSuccess";
  _?: Maybe<Scalars["Boolean"]>;
};

export type EmailInvalid = Error & {
  __typename?: "EmailInvalid";
  message: Scalars["String"];
};

export type EmailTaken = Error & {
  __typename?: "EmailTaken";
  message: Scalars["String"];
};

export type FirstNameInvalid = Error & {
  __typename?: "FirstNameInvalid";
  message: Scalars["String"];
};

export type LastNameInvalid = Error & {
  __typename?: "LastNameInvalid";
  message: Scalars["String"];
};

export type CountryInvalid = Error & {
  __typename?: "CountryInvalid";
  message: Scalars["String"];
};

export type SignUpResult =
  | SignUpSuccess
  | EmailInvalid
  | EmailTaken
  | FirstNameInvalid
  | LastNameInvalid
  | CountryInvalid;

export type SignInInput = {
  email: Scalars["String"];
  token: Scalars["String"];
};

export type SignInSuccess = {
  __typename?: "SignInSuccess";
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
  ttl: Scalars["Int"];
  user: User;
};

export type TokenInvalid = Error & {
  __typename?: "TokenInvalid";
  message: Scalars["String"];
};

export type SignInResult = SignInSuccess | TokenInvalid | EmailInvalid;

export type RefreshTokenInput = {
  token: Scalars["String"];
};

export type RefreshTokenSuccess = {
  __typename?: "RefreshTokenSuccess";
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
  ttl: Scalars["Int"];
};

export type RefreshTokenResult = RefreshTokenSuccess | TokenInvalid;

export type SignOutInput = {
  token: Scalars["String"];
};

export type AccessTokenInvalid = Error & {
  __typename?: "AccessTokenInvalid";
  message: Scalars["String"];
};

export type SignOutSuccess = {
  __typename?: "SignOutSuccess";
  _?: Maybe<Scalars["Boolean"]>;
};

export type SignOutResult = SignOutSuccess | AccessTokenInvalid;

export type GenerateLoginTokenSuccess = {
  __typename?: "GenerateLoginTokenSuccess";
  token: Scalars["String"];
};

export type GenerateLoginTokenResult = GenerateLoginTokenSuccess;

export type GenerateShareTokenSuccess = {
  __typename?: "GenerateShareTokenSuccess";
  token: Scalars["String"];
};

export type GenerateShareTokenResult = GenerateShareTokenSuccess;

export type RemoveAccountInput = {
  token: Scalars["String"];
};

export type RemoveAccountSuccess = {
  __typename?: "RemoveAccountSuccess";
  _?: Maybe<Scalars["Boolean"]>;
};

export type RemoveAccountResult = RemoveAccountSuccess | TokenInvalid;

export enum Mode {
  Off = "OFF",
  Auto = "AUTO",
  Heat = "HEAT",
  Cool = "COOL",
  Eheat = "EHEAT",
  Maxheat = "MAXHEAT",
  Maxcool = "MAXCOOL",
}

export enum FanMode {
  Auto = "AUTO",
  Fifteen = "FIFTEEN",
  Thirty = "THIRTY",
  Fortyfive = "FORTYFIVE",
  Always = "ALWAYS",
}

export type Setpoints = {
  __typename?: "Setpoints";
  heat: Scalars["Int"];
  cool: Scalars["Int"];
};

export type Away = {
  __typename?: "Away";
  active: Scalars["Boolean"];
  setpoints: Setpoints;
};

export type Fan = {
  __typename?: "Fan";
  active: Scalars["Boolean"];
  cfm?: Maybe<Scalars["Float"]>;
  mode: FanMode;
  modes: Array<FanMode>;
  override: Scalars["Boolean"];
};

export enum Day {
  Sun = "SUN",
  Mon = "MON",
  Tue = "TUE",
  Wed = "WED",
  Thu = "THU",
  Fri = "FRI",
  Sat = "SAT",
}

export enum ScheduleSlot {
  Awake = "AWAKE",
  Leave = "LEAVE",
  Arrive = "ARRIVE",
  Bed = "BED",
}

export type ScheduleTime = {
  __typename?: "ScheduleTime";
  day: Day;
  hour: Scalars["Int"];
  minute: Scalars["Int"];
};

export type ScheduleEvent = {
  __typename?: "ScheduleEvent";
  day: Day;
  fanMode: FanMode;
  setpoints: Setpoints;
  slot: ScheduleSlot;
  start: ScheduleTime;
  stop: ScheduleTime;
};

export type Schedule = {
  __typename?: "Schedule";
  day: Day;
  awake: ScheduleEvent;
  leave?: Maybe<ScheduleEvent>;
  arrive?: Maybe<ScheduleEvent>;
  bed: ScheduleEvent;
  events: Array<ScheduleEvent>;
};

export type SetpointRange = {
  __typename?: "SetpointRange";
  min: Scalars["Int"];
  max: Scalars["Int"];
};

export enum HumidificationMode {
  Auto = "AUTO",
  Manual = "MANUAL",
}

export type Humidification = {
  __typename?: "Humidification";
  max: Scalars["Float"];
  min: Scalars["Float"];
  mode: HumidificationMode;
  value: Scalars["Float"];
};

export enum ScheduleOverride {
  Cancelled = "CANCELLED",
  NextEvent = "NEXT_EVENT",
  Hours_01 = "HOURS_01",
  Hours_02 = "HOURS_02",
  Hours_03 = "HOURS_03",
  Hours_04 = "HOURS_04",
  Hours_05 = "HOURS_05",
  Hours_06 = "HOURS_06",
  Hours_07 = "HOURS_07",
  Hours_08 = "HOURS_08",
  Hours_09 = "HOURS_09",
  Hours_10 = "HOURS_10",
  Hours_11 = "HOURS_11",
  Hours_12 = "HOURS_12",
}

export type ZoneVersion = {
  __typename?: "ZoneVersion";
  primaryZoneControl?: Maybe<Scalars["String"]>;
  zoneSensor: Array<Scalars["String"]>;
};

export enum Sensor {
  MainControl = "MAIN_CONTROL",
  ZoneThermostatHx = "ZONE_THERMOSTAT_HX",
  ZoneThermostat = "ZONE_THERMOSTAT",
  ZoneSensor = "ZONE_SENSOR",
  NA = "N_A",
}

export type ZoneSensor = {
  __typename?: "ZoneSensor";
  sensor: Sensor;
  version: Scalars["String"];
};

export enum Demand {
  Cool = "COOL",
  Heat = "HEAT",
}

export type Controller = {
  __typename?: "Controller";
  accessLevel: AccessLevel;
  activeDemand?: Maybe<Demand>;
  activeScheduleEvent?: Maybe<ScheduleEvent>;
  airflow?: Maybe<Scalars["Int"]>;
  airflowTestActive?: Maybe<Scalars["Boolean"]>;
  away?: Maybe<Away>;
  coolRange: SetpointRange;
  deadband: Scalars["Int"];
  dehumidification?: Maybe<Humidification>;
  disabled: Scalars["Boolean"];
  fan?: Maybe<Fan>;
  heatRange: SetpointRange;
  humidification?: Maybe<Humidification>;
  humidity?: Maybe<Scalars["Float"]>;
  humidityNotification?: Maybe<HumidityNotification>;
  id: Scalars["String"];
  indoorTemp?: Maybe<Scalars["Int"]>;
  location: Location;
  mode?: Maybe<Mode>;
  modes: Array<Mode>;
  name: Scalars["String"];
  outdoorTemp?: Maybe<Scalars["Int"]>;
  schedule?: Maybe<Array<Schedule>>;
  scheduleOverride: ScheduleOverride;
  setpoints?: Maybe<Setpoints>;
  tempOverride?: Maybe<Scalars["Boolean"]>;
  temperatureNotification?: Maybe<TemperatureNotification>;
  zone?: Maybe<Scalars["String"]>;
  zoneSensor?: Maybe<ZoneSensor>;
  zoning: Scalars["Boolean"];
};

export type RenameControllerInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type RenameControllerSuccess = {
  __typename?: "RenameControllerSuccess";
  controller: Controller;
};

export type NameInvalid = Error & {
  __typename?: "NameInvalid";
  message: Scalars["String"];
};

export type RenameControllerResult =
  | RenameControllerSuccess
  | NameInvalid
  | NotFound;

export enum Setpoint {
  Heat = "HEAT",
  Cool = "COOL",
}

export type ChangeSetpointInput = {
  id: Scalars["ID"];
  setpoint: Setpoint;
  value: Scalars["Int"];
};

export type ChangeSetpointSuccess = {
  __typename?: "ChangeSetpointSuccess";
  controller: Controller;
};

export type AwayModeActive = Error & {
  __typename?: "AwayModeActive";
  message: Scalars["String"];
};

export type VacationModeActive = Error & {
  __typename?: "VacationModeActive";
  message: Scalars["String"];
};

export type ChangeSetpointResult =
  | ChangeSetpointSuccess
  | AwayModeActive
  | VacationModeActive
  | NotFound;

export type ChangeModeInput = {
  id: Scalars["ID"];
  mode: Mode;
};

export type ChangeModeSuccess = {
  __typename?: "ChangeModeSuccess";
  controller: Controller;
};

export type ChangeModeResult = ChangeModeSuccess | NotFound;

export type ChangeAwayInput = {
  id: Scalars["ID"];
  active: Scalars["Boolean"];
};

export type ChangeAwaySuccess = {
  __typename?: "ChangeAwaySuccess";
  controller: Controller;
};

export type ChangeAwayResult = ChangeAwaySuccess | NotFound;

export type ChangeAwaySetpointsInput = {
  id: Scalars["ID"];
  heat: Scalars["Int"];
  cool: Scalars["Int"];
};

export type ChangeAwaySetpointsSuccess = {
  __typename?: "ChangeAwaySetpointsSuccess";
  controller: Controller;
};

export type ChangeAwaySetpointsResult = ChangeAwaySetpointsSuccess | NotFound;

export type ChangeFanModeInput = {
  id: Scalars["ID"];
  mode: FanMode;
};

export type ChangeFanModeSuccess = {
  __typename?: "ChangeFanModeSuccess";
  controller: Controller;
};

export type ChangeFanModeResult =
  | ChangeFanModeSuccess
  | NotFound
  | NotSupported;

export type CancelTemperatureHoldInput = {
  id: Scalars["ID"];
};

export type CancelTemperatureHoldSuccess = {
  __typename?: "CancelTemperatureHoldSuccess";
  controller: Controller;
};

export type CancelTemperatureHoldResult =
  | CancelTemperatureHoldSuccess
  | NotFound;

export type CancelFanHoldInput = {
  id: Scalars["ID"];
};

export type CancelFanHoldSuccess = {
  __typename?: "CancelFanHoldSuccess";
  controller: Controller;
};

export type CancelFanHoldResult = CancelFanHoldSuccess | NotFound;

export type ChangeScheduleInput = {
  id: Scalars["ID"];
  day: Day;
  slot: ScheduleSlot;
  heat: Scalars["Int"];
  cool: Scalars["Int"];
  fanMode: FanMode;
  hour: Scalars["Int"];
  minute: Scalars["Int"];
};

export type ChangeScheduleSuccess = {
  __typename?: "ChangeScheduleSuccess";
  controller: Controller;
};

export type InactiveSlot = Error & {
  __typename?: "InactiveSlot";
  message: Scalars["String"];
};

export type ChangeScheduleResult =
  | ChangeScheduleSuccess
  | InactiveSlot
  | NotFound;

export type CopyScheduleInput = {
  id: Scalars["ID"];
  source: Day;
  destination: Array<Day>;
};

export type CopyScheduleSuccess = {
  __typename?: "CopyScheduleSuccess";
  controller: Controller;
};

export type CopyScheduleResult = CopyScheduleSuccess | NotFound;

export type AddLeaveArriveInput = {
  id: Scalars["ID"];
  day: Day;
  leaveHeat: Scalars["Int"];
  leaveCool: Scalars["Int"];
  leaveFanMode: FanMode;
  leaveHour: Scalars["Int"];
  leaveMinute: Scalars["Int"];
  arriveHeat: Scalars["Int"];
  arriveCool: Scalars["Int"];
  arriveFanMode: FanMode;
  arriveHour: Scalars["Int"];
  arriveMinute: Scalars["Int"];
};

export type AddLeaveArriveSuccess = {
  __typename?: "AddLeaveArriveSuccess";
  controller: Controller;
};

export type AddLeaveArriveResult = AddLeaveArriveSuccess | NotFound;

export type RemoveLeaveArriveInput = {
  id: Scalars["ID"];
  day: Day;
};

export type RemoveLeaveArriveSuccess = {
  __typename?: "RemoveLeaveArriveSuccess";
  controller: Controller;
};

export type RemoveLeaveArriveResult = RemoveLeaveArriveSuccess | NotFound;

export type RestoreDefaultScheduleInput = {
  id: Scalars["ID"];
  days: Array<Day>;
};

export type RestoreDefaultScheduleSuccess = {
  __typename?: "RestoreDefaultScheduleSuccess";
  controller: Controller;
};

export type RestoreDefaultScheduleResult =
  | RestoreDefaultScheduleSuccess
  | NotFound;

export type ChangeHumidificationModeInput = {
  id: Scalars["ID"];
  mode: HumidificationMode;
};

export type ChangeHumidificationModeSuccess = {
  __typename?: "ChangeHumidificationModeSuccess";
  controller: Controller;
};

export type ChangeHumidificationModeResult =
  | ChangeHumidificationModeSuccess
  | NotSupported
  | NotFound;

export type ChangeHumidificationInput = {
  id: Scalars["ID"];
  value: Scalars["Float"];
};

export type ChangeHumidificationSuccess = {
  __typename?: "ChangeHumidificationSuccess";
  controller: Controller;
};

export type ChangeHumidificationResult =
  | ChangeHumidificationSuccess
  | NotSupported
  | NotFound;

export type ChangeScheduleOverrideInput = {
  id: Scalars["ID"];
  scheduleOverride: ScheduleOverride;
};

export type ChangeScheduleOverrideSuccess = {
  __typename?: "ChangeScheduleOverrideSuccess";
  controller: Controller;
};

export type ChangeScheduleOverrideResult =
  | ChangeScheduleOverrideSuccess
  | NotFound;

export type ChangeAirflowInput = {
  id: Scalars["ID"];
  value: Scalars["Int"];
};

export type ChangeAirflowSuccess = {
  __typename?: "ChangeAirflowSuccess";
  controller: Controller;
};

export type ChangeAirflowResult =
  | ChangeAirflowSuccess
  | NotSupported
  | NotFound;

export type ToggleAirflowTestInput = {
  id: Scalars["ID"];
  running: Scalars["Boolean"];
};

export type ToggleAirflowTestSuccess = {
  __typename?: "ToggleAirflowTestSuccess";
  controller: Controller;
};

export type ToggleAirflowTestResult =
  | ToggleAirflowTestSuccess
  | NotFound
  | NotSupported
  | Offline;

export type SetAppActiveInput = {
  id: Scalars["ID"];
  active: Scalars["Boolean"];
};

export type SetAppActiveSuccess = {
  __typename?: "SetAppActiveSuccess";
  controller: Controller;
};

export type SetAppActiveResult = SetAppActiveSuccess | NotFound;

export type Error = {
  message: Scalars["String"];
};

export type NotFound = Error & {
  __typename?: "NotFound";
  message: Scalars["String"];
};

export type NotSupported = Error & {
  __typename?: "NotSupported";
  message: Scalars["String"];
};

export type Offline = Error & {
  __typename?: "Offline";
  message: Scalars["String"];
};

export type AirflowRange = {
  __typename?: "AirflowRange";
  active: Scalars["Int"];
  min: Scalars["Int"];
  max: Scalars["Int"];
};

export enum ConnectionStatus {
  Online = "ONLINE",
  Offline = "OFFLINE",
  Initializing = "INITIALIZING",
}

export type Dealer = {
  __typename?: "Dealer";
  email: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
  website: Scalars["String"];
};

export type Fault = {
  __typename?: "Fault";
  value: Scalars["String"];
  createdAt: Scalars["String"];
};

export enum Override {
  Away = "AWAY",
  Vacation = "VACATION",
}

export type Status = {
  __typename?: "Status";
  items: Array<StatusItem>;
  label?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["String"];
};

export type StatusItem = {
  __typename?: "StatusItem";
  label: Scalars["String"];
  value?: Maybe<Scalars["String"]>;
};

export type Vacation = {
  __typename?: "Vacation";
  active: Scalars["Boolean"];
  setpoints: Setpoints;
};

export type Version = {
  __typename?: "Version";
  application: Scalars["String"];
  bootloader: Scalars["String"];
  outdoorControl: Scalars["String"];
};

export type Location = {
  __typename?: "Location";
  accessLevel: AccessLevel;
  activeFault?: Maybe<Scalars["String"]>;
  airflow?: Maybe<AirflowRange>;
  brand: Scalars["String"];
  connectionStatus: ConnectionStatus;
  controller?: Maybe<Controller>;
  controllers: Array<Controller>;
  dealer: Dealer;
  dsn: Scalars["String"];
  faultNotification?: Maybe<FaultNotification>;
  faults: Array<Fault>;
  id: Scalars["ID"];
  lat?: Maybe<Scalars["Float"]>;
  lng?: Maybe<Scalars["Float"]>;
  model: Scalars["String"];
  modes: Array<Mode>;
  name: Scalars["String"];
  offlineNotification?: Maybe<OfflineNotification>;
  override?: Maybe<Override>;
  programmable?: Maybe<Scalars["Boolean"]>;
  serviceReminder: ServiceReminder;
  share?: Maybe<Share>;
  sharer?: Maybe<Sharer>;
  shares: Array<Share>;
  statusIndoor?: Maybe<Array<Status>>;
  /** @deprecated Field no longer supported */
  statusIndoorEEV?: Maybe<Array<Status>>;
  statusOutdoor?: Maybe<Array<Status>>;
  /** @deprecated Field no longer supported */
  statusThermostat?: Maybe<Array<Status>>;
  statusZone?: Maybe<Array<Status>>;
  vacation?: Maybe<Vacation>;
  version: Version;
  zones?: Maybe<Scalars["Int"]>;
  zoning: Scalars["Boolean"];
};

export type RenameLocationInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type RenameLocationSuccess = {
  __typename?: "RenameLocationSuccess";
  location: Location;
};

export type LocationNameInvalid = Error & {
  __typename?: "LocationNameInvalid";
  message: Scalars["String"];
};

export type RenameLocationResult =
  | RenameLocationSuccess
  | LocationNameInvalid
  | NotFound;

export type ChangeFanCfmInput = {
  id: Scalars["ID"];
  cfm: Scalars["Float"];
};

export type ChangeFanCfmSuccess = {
  __typename?: "ChangeFanCfmSuccess";
  location: Location;
};

export type ChangeFanCfmResult = ChangeFanCfmSuccess | NotFound | NotSupported;

export type ChangeLocationAwayInput = {
  id: Scalars["ID"];
  active: Scalars["Boolean"];
};

export type ChangeLocationAwaySuccess = {
  __typename?: "ChangeLocationAwaySuccess";
  location: Location;
};

export type ChangeLocationAwayResult = ChangeLocationAwaySuccess | NotFound;

export type RegisterLocationInput = {
  dsn: Scalars["String"];
  setupToken: Scalars["String"];
};

export type RegisterLocationSuccess = {
  __typename?: "RegisterLocationSuccess";
  location: Location;
};

export type RegisterLocationResult = RegisterLocationSuccess | NotFound;

export type ChangeDealerInput = {
  id: Scalars["ID"];
  email?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  website?: Maybe<Scalars["String"]>;
};

export type ChangeDealerSuccess = {
  __typename?: "ChangeDealerSuccess";
  location: Location;
};

export type ChangeDealerResult = ChangeDealerSuccess | NotFound;

export type ChangeProgrammableInput = {
  id: Scalars["ID"];
  programmable: Scalars["Boolean"];
};

export type ChangeProgrammableSuccess = {
  __typename?: "ChangeProgrammableSuccess";
  location: Location;
};

export type ChangeProgrammableResult = ChangeProgrammableSuccess | NotFound;

export type ChangeVacationInput = {
  id: Scalars["ID"];
  active: Scalars["Boolean"];
};

export type ChangeVacationSuccess = {
  __typename?: "ChangeVacationSuccess";
  location: Location;
};

export type VacationNotSupported = Error & {
  __typename?: "VacationNotSupported";
  message: Scalars["String"];
};

export type ChangeVacationResult =
  | ChangeVacationSuccess
  | VacationNotSupported
  | NotFound;

export type ChangeVacationSetpointsInput = {
  id: Scalars["ID"];
  heat: Scalars["Int"];
  cool: Scalars["Int"];
};

export type ChangeVacationSetpointsSuccess = {
  __typename?: "ChangeVacationSetpointsSuccess";
  location: Location;
};

export type ChangeVacationSetpointsResult =
  | ChangeVacationSetpointsSuccess
  | VacationNotSupported
  | NotFound;

export enum StatusSection {
  Indoor = "INDOOR",
  Indooreev = "INDOOREEV",
  Outdoor = "OUTDOOR",
  Thermostat = "THERMOSTAT",
  Zone = "ZONE",
}

export type RefreshStatusInput = {
  id: Scalars["ID"];
  section?: Maybe<StatusSection>;
};

export type RefreshStatusSuccess = {
  __typename?: "RefreshStatusSuccess";
  location: Location;
};

export type RefreshStatusResult = RefreshStatusSuccess | NotFound | Offline;

export type RemoveLocationInput = {
  id: Scalars["ID"];
};

export type RemoveLocationSuccess = {
  __typename?: "RemoveLocationSuccess";
  _?: Maybe<Scalars["Boolean"]>;
};

export type RemoveLocationResult = RemoveLocationSuccess | NotFound;

export enum LogType {
  Thermostat = "THERMOSTAT",
  System = "SYSTEM",
}

export type ResetLogsInput = {
  id: Scalars["ID"];
  logType: LogType;
};

export type ResetLogsSuccess = {
  __typename?: "ResetLogsSuccess";
  location: Location;
};

export type ResetLogsResult = ResetLogsSuccess | NotFound | NotSupported;

export type Notification = {
  enabled: Scalars["Boolean"];
};

export type FaultNotification = Notification & {
  __typename?: "FaultNotification";
  enabled: Scalars["Boolean"];
};

export type FilterNotification = Notification & {
  __typename?: "FilterNotification";
  enabled: Scalars["Boolean"];
};

export type HumidityNotification = Notification & {
  __typename?: "HumidityNotification";
  enabled: Scalars["Boolean"];
  min: Scalars["Float"];
  max: Scalars["Float"];
};

export type OfflineNotification = Notification & {
  __typename?: "OfflineNotification";
  enabled: Scalars["Boolean"];
};

export type ServiceReminderDate = {
  __typename?: "ServiceReminderDate";
  day: Scalars["Int"];
  month: Scalars["Int"];
};

export type ServiceReminder = Notification & {
  __typename?: "ServiceReminder";
  enabled: Scalars["Boolean"];
  spring?: Maybe<ServiceReminderDate>;
  fall?: Maybe<ServiceReminderDate>;
};

export type TemperatureNotification = Notification & {
  __typename?: "TemperatureNotification";
  enabled: Scalars["Boolean"];
  min: Scalars["Int"];
  max: Scalars["Int"];
};

export enum PushTokenStatus {
  Enabled = "ENABLED",
  Disabled = "DISABLED",
}

export type PushToken = {
  __typename?: "PushToken";
  id: Scalars["ID"];
  platform: Platform;
  status: PushTokenStatus;
  token: Scalars["String"];
};

export type User = {
  __typename?: "User";
  accountType: AccountType;
  email: Scalars["String"];
  id: Scalars["String"];
  pushTokens: Array<PushToken>;
  temperatureUnit: TemperatureUnit;
};

export type SubscribeToNotificationsInput = {
  token: Scalars["String"];
  platform: Platform;
};

export type SubscribeToNotificationsSuccess = {
  __typename?: "SubscribeToNotificationsSuccess";
  pushToken: PushToken;
};

export type SubscribeToNotificationsResult = SubscribeToNotificationsSuccess;

export type UnsubscribeFromNotificationsInput = {
  id: Scalars["ID"];
};

export type UnsubscribeFromNotificationsSuccess = {
  __typename?: "UnsubscribeFromNotificationsSuccess";
  _?: Maybe<Scalars["Boolean"]>;
};

export type UnsubscribeFromNotificationsResult =
  | UnsubscribeFromNotificationsSuccess
  | NotFound;

export type ToggleFaultNotificationInput = {
  id: Scalars["ID"];
  enabled: Scalars["Boolean"];
};

export type ToggleFaultNotificationSuccess = {
  __typename?: "ToggleFaultNotificationSuccess";
  location: Location;
};

export type ToggleFaultNotificationResult =
  | ToggleFaultNotificationSuccess
  | NotFound;

export type ToggleHumidityNotificationInput = {
  id: Scalars["ID"];
  enabled: Scalars["Boolean"];
};

export type ToggleHumidityNotificationSuccess = {
  __typename?: "ToggleHumidityNotificationSuccess";
  controller: Controller;
};

export type ToggleHumidityNotificationResult =
  | ToggleHumidityNotificationSuccess
  | NotFound;

export type AdjustHumidityNotificationThresholdInput = {
  id: Scalars["ID"];
  min: Scalars["Float"];
  max: Scalars["Float"];
};

export type AdjustHumidityNotificationThresholdSuccess = {
  __typename?: "AdjustHumidityNotificationThresholdSuccess";
  controller: Controller;
};

export type AdjustHumidityNotificationThresholdResult =
  | AdjustHumidityNotificationThresholdSuccess
  | NotFound;

export type ToggleServiceReminderInput = {
  id: Scalars["ID"];
  enabled: Scalars["Boolean"];
};

export type ToggleServiceReminderSuccess = {
  __typename?: "ToggleServiceReminderSuccess";
  location: Location;
};

export type ToggleServiceReminderResult =
  | ToggleServiceReminderSuccess
  | NotFound;

export type AdjustServiceReminderDateInput = {
  month: Scalars["Int"];
  day: Scalars["Int"];
};

export type AdjustServiceReminderDatesInput = {
  id: Scalars["ID"];
  spring?: Maybe<AdjustServiceReminderDateInput>;
  fall?: Maybe<AdjustServiceReminderDateInput>;
};

export type AdjustServiceReminderDatesSuccess = {
  __typename?: "AdjustServiceReminderDatesSuccess";
  location: Location;
};

export type AdjustServiceReminderDatesResult =
  | AdjustServiceReminderDatesSuccess
  | NotFound;

export type ToggleTemperatureNotificationInput = {
  id: Scalars["ID"];
  enabled: Scalars["Boolean"];
};

export type ToggleTemperatureNotificationSuccess = {
  __typename?: "ToggleTemperatureNotificationSuccess";
  controller: Controller;
};

export type ToggleTemperatureNotificationResult =
  | ToggleTemperatureNotificationSuccess
  | NotFound;

export type AdjustTemperatureNotificationThresholdInput = {
  id: Scalars["ID"];
  min: Scalars["Int"];
  max: Scalars["Int"];
};

export type AdjustTemperatureNotificationThresholdSuccess = {
  __typename?: "AdjustTemperatureNotificationThresholdSuccess";
  controller: Controller;
};

export type AdjustTemperatureNotificationThresholdResult =
  | AdjustTemperatureNotificationThresholdSuccess
  | NotFound;

export enum ShareAccessLevel {
  Installer = "INSTALLER",
  Diagnostic = "DIAGNOSTIC",
  Status = "STATUS",
}

export type Share = {
  __typename?: "Share";
  id: Scalars["ID"];
  accessLevel: ShareAccessLevel;
  email: Scalars["String"];
  expiresAt?: Maybe<Scalars["String"]>;
};

export type Sharer = {
  __typename?: "Sharer";
  email: Scalars["String"];
  name: Scalars["String"];
};

export type ShareLocationInput = {
  id: Scalars["ID"];
  accessLevel: ShareAccessLevel;
  email: Scalars["String"];
  expiresAt?: Maybe<Scalars["String"]>;
};

export type ShareLocationSuccess = {
  __typename?: "ShareLocationSuccess";
  location: Location;
};

export type InvalidEmail = Error & {
  __typename?: "InvalidEmail";
  message: Scalars["String"];
};

export type InvalidDate = Error & {
  __typename?: "InvalidDate";
  message: Scalars["String"];
};

export type ShareLocationResult =
  | ShareLocationSuccess
  | InvalidDate
  | InvalidEmail
  | NotFound;

export type RevokeShareInput = {
  id: Scalars["ID"];
};

export type RevokeShareSuccess = {
  __typename?: "RevokeShareSuccess";
  location: Location;
};

export type RevokeShareResult = RevokeShareSuccess | NotFound;

export type RequestShareInput = {
  accessLevel: ShareAccessLevel;
  email: Scalars["String"];
  duration?: Maybe<Scalars["Int"]>;
};

export type RequestShareSuccess = {
  __typename?: "RequestShareSuccess";
  _?: Maybe<Scalars["Boolean"]>;
};

export type RequestShareResult = RequestShareSuccess | InvalidEmail;

export enum AccountType {
  Homeowner = "HOMEOWNER",
  Pro = "PRO",
}

export enum TemperatureUnit {
  F = "F",
  C = "C",
}

export type ChangeTemperatureUnitInput = {
  temperatureUnit: TemperatureUnit;
};

export type ChangeTemperatureUnitSuccess = {
  __typename?: "ChangeTemperatureUnitSuccess";
  user: User;
};

export type ChangeTemperatureUnitResult = ChangeTemperatureUnitSuccess;

export type ConvertToHomeownerAccountSuccess = {
  __typename?: "ConvertToHomeownerAccountSuccess";
  user: User;
};

export type ConvertToHomeownerAccountResult = ConvertToHomeownerAccountSuccess;

export type ConvertToProAccountInput = {
  code: Scalars["String"];
};

export type InvalidCode = Error & {
  __typename?: "InvalidCode";
  message: Scalars["String"];
};

export type ConvertToProAccountSuccess = {
  __typename?: "ConvertToProAccountSuccess";
  user: User;
};

export type ConvertToProAccountResult =
  | ConvertToProAccountSuccess
  | InvalidCode;

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AccessLevel: AccessLevel;
  Platform: Platform;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Mutation: ResolverTypeWrapper<{}>;
  RequestSurveySessionResult: ResolverTypeWrapper<RequestSurveySessionResult>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  RequestRatingInput: RequestRatingInput;
  RequestSurveyFeedbackInput: RequestSurveyFeedbackInput;
  UpdateRequiredInput: UpdateRequiredInput;
  CheckEmailInput: CheckEmailInput;
  CheckEmailResult: ResolverTypeWrapper<CheckEmailResult>;
  SendTokenInput: SendTokenInput;
  AccountStatus: AccountStatus;
  SendTokenSuccess: ResolverTypeWrapper<SendTokenSuccess>;
  SendTokenResult:
    | ResolversTypes["SendTokenSuccess"]
    | ResolversTypes["NotFound"];
  SignUpInput: SignUpInput;
  SignUpSuccess: ResolverTypeWrapper<SignUpSuccess>;
  EmailInvalid: ResolverTypeWrapper<EmailInvalid>;
  EmailTaken: ResolverTypeWrapper<EmailTaken>;
  FirstNameInvalid: ResolverTypeWrapper<FirstNameInvalid>;
  LastNameInvalid: ResolverTypeWrapper<LastNameInvalid>;
  CountryInvalid: ResolverTypeWrapper<CountryInvalid>;
  SignUpResult:
    | ResolversTypes["SignUpSuccess"]
    | ResolversTypes["EmailInvalid"]
    | ResolversTypes["EmailTaken"]
    | ResolversTypes["FirstNameInvalid"]
    | ResolversTypes["LastNameInvalid"]
    | ResolversTypes["CountryInvalid"];
  SignInInput: SignInInput;
  SignInSuccess: ResolverTypeWrapper<
    Omit<SignInSuccess, "user"> & { user: ResolversTypes["User"] }
  >;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  TokenInvalid: ResolverTypeWrapper<TokenInvalid>;
  SignInResult:
    | ResolversTypes["SignInSuccess"]
    | ResolversTypes["TokenInvalid"]
    | ResolversTypes["EmailInvalid"];
  RefreshTokenInput: RefreshTokenInput;
  RefreshTokenSuccess: ResolverTypeWrapper<RefreshTokenSuccess>;
  RefreshTokenResult:
    | ResolversTypes["RefreshTokenSuccess"]
    | ResolversTypes["TokenInvalid"];
  SignOutInput: SignOutInput;
  AccessTokenInvalid: ResolverTypeWrapper<AccessTokenInvalid>;
  SignOutSuccess: ResolverTypeWrapper<SignOutSuccess>;
  SignOutResult:
    | ResolversTypes["SignOutSuccess"]
    | ResolversTypes["AccessTokenInvalid"];
  GenerateLoginTokenSuccess: ResolverTypeWrapper<GenerateLoginTokenSuccess>;
  GenerateLoginTokenResult: ResolversTypes["GenerateLoginTokenSuccess"];
  GenerateShareTokenSuccess: ResolverTypeWrapper<GenerateShareTokenSuccess>;
  GenerateShareTokenResult: ResolversTypes["GenerateShareTokenSuccess"];
  RemoveAccountInput: RemoveAccountInput;
  RemoveAccountSuccess: ResolverTypeWrapper<RemoveAccountSuccess>;
  RemoveAccountResult:
    | ResolversTypes["RemoveAccountSuccess"]
    | ResolversTypes["TokenInvalid"];
  Mode: Mode;
  FanMode: FanMode;
  Setpoints: ResolverTypeWrapper<Setpoints>;
  Away: ResolverTypeWrapper<Away>;
  Fan: ResolverTypeWrapper<Fan>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Day: Day;
  ScheduleSlot: ScheduleSlot;
  ScheduleTime: ResolverTypeWrapper<ScheduleTime>;
  ScheduleEvent: ResolverTypeWrapper<ScheduleEvent>;
  Schedule: ResolverTypeWrapper<Schedule>;
  SetpointRange: ResolverTypeWrapper<SetpointRange>;
  HumidificationMode: HumidificationMode;
  Humidification: ResolverTypeWrapper<Humidification>;
  ScheduleOverride: ScheduleOverride;
  ZoneVersion: ResolverTypeWrapper<ZoneVersion>;
  Sensor: Sensor;
  ZoneSensor: ResolverTypeWrapper<ZoneSensor>;
  Demand: Demand;
  Controller: ResolverTypeWrapper<DeviceMapper>;
  RenameControllerInput: RenameControllerInput;
  RenameControllerSuccess: ResolverTypeWrapper<
    Omit<RenameControllerSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  NameInvalid: ResolverTypeWrapper<NameInvalid>;
  RenameControllerResult:
    | ResolversTypes["RenameControllerSuccess"]
    | ResolversTypes["NameInvalid"]
    | ResolversTypes["NotFound"];
  Setpoint: Setpoint;
  ChangeSetpointInput: ChangeSetpointInput;
  ChangeSetpointSuccess: ResolverTypeWrapper<
    Omit<ChangeSetpointSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  AwayModeActive: ResolverTypeWrapper<AwayModeActive>;
  VacationModeActive: ResolverTypeWrapper<VacationModeActive>;
  ChangeSetpointResult:
    | ResolversTypes["ChangeSetpointSuccess"]
    | ResolversTypes["AwayModeActive"]
    | ResolversTypes["VacationModeActive"]
    | ResolversTypes["NotFound"];
  ChangeModeInput: ChangeModeInput;
  ChangeModeSuccess: ResolverTypeWrapper<
    Omit<ChangeModeSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  ChangeModeResult:
    | ResolversTypes["ChangeModeSuccess"]
    | ResolversTypes["NotFound"];
  ChangeAwayInput: ChangeAwayInput;
  ChangeAwaySuccess: ResolverTypeWrapper<
    Omit<ChangeAwaySuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  ChangeAwayResult:
    | ResolversTypes["ChangeAwaySuccess"]
    | ResolversTypes["NotFound"];
  ChangeAwaySetpointsInput: ChangeAwaySetpointsInput;
  ChangeAwaySetpointsSuccess: ResolverTypeWrapper<
    Omit<ChangeAwaySetpointsSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  ChangeAwaySetpointsResult:
    | ResolversTypes["ChangeAwaySetpointsSuccess"]
    | ResolversTypes["NotFound"];
  ChangeFanModeInput: ChangeFanModeInput;
  ChangeFanModeSuccess: ResolverTypeWrapper<
    Omit<ChangeFanModeSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  ChangeFanModeResult:
    | ResolversTypes["ChangeFanModeSuccess"]
    | ResolversTypes["NotFound"]
    | ResolversTypes["NotSupported"];
  CancelTemperatureHoldInput: CancelTemperatureHoldInput;
  CancelTemperatureHoldSuccess: ResolverTypeWrapper<
    Omit<CancelTemperatureHoldSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  CancelTemperatureHoldResult:
    | ResolversTypes["CancelTemperatureHoldSuccess"]
    | ResolversTypes["NotFound"];
  CancelFanHoldInput: CancelFanHoldInput;
  CancelFanHoldSuccess: ResolverTypeWrapper<
    Omit<CancelFanHoldSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  CancelFanHoldResult:
    | ResolversTypes["CancelFanHoldSuccess"]
    | ResolversTypes["NotFound"];
  ChangeScheduleInput: ChangeScheduleInput;
  ChangeScheduleSuccess: ResolverTypeWrapper<
    Omit<ChangeScheduleSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  InactiveSlot: ResolverTypeWrapper<InactiveSlot>;
  ChangeScheduleResult:
    | ResolversTypes["ChangeScheduleSuccess"]
    | ResolversTypes["InactiveSlot"]
    | ResolversTypes["NotFound"];
  CopyScheduleInput: CopyScheduleInput;
  CopyScheduleSuccess: ResolverTypeWrapper<
    Omit<CopyScheduleSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  CopyScheduleResult:
    | ResolversTypes["CopyScheduleSuccess"]
    | ResolversTypes["NotFound"];
  AddLeaveArriveInput: AddLeaveArriveInput;
  AddLeaveArriveSuccess: ResolverTypeWrapper<
    Omit<AddLeaveArriveSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  AddLeaveArriveResult:
    | ResolversTypes["AddLeaveArriveSuccess"]
    | ResolversTypes["NotFound"];
  RemoveLeaveArriveInput: RemoveLeaveArriveInput;
  RemoveLeaveArriveSuccess: ResolverTypeWrapper<
    Omit<RemoveLeaveArriveSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  RemoveLeaveArriveResult:
    | ResolversTypes["RemoveLeaveArriveSuccess"]
    | ResolversTypes["NotFound"];
  RestoreDefaultScheduleInput: RestoreDefaultScheduleInput;
  RestoreDefaultScheduleSuccess: ResolverTypeWrapper<
    Omit<RestoreDefaultScheduleSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  RestoreDefaultScheduleResult:
    | ResolversTypes["RestoreDefaultScheduleSuccess"]
    | ResolversTypes["NotFound"];
  ChangeHumidificationModeInput: ChangeHumidificationModeInput;
  ChangeHumidificationModeSuccess: ResolverTypeWrapper<
    Omit<ChangeHumidificationModeSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  ChangeHumidificationModeResult:
    | ResolversTypes["ChangeHumidificationModeSuccess"]
    | ResolversTypes["NotSupported"]
    | ResolversTypes["NotFound"];
  ChangeHumidificationInput: ChangeHumidificationInput;
  ChangeHumidificationSuccess: ResolverTypeWrapper<
    Omit<ChangeHumidificationSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  ChangeHumidificationResult:
    | ResolversTypes["ChangeHumidificationSuccess"]
    | ResolversTypes["NotSupported"]
    | ResolversTypes["NotFound"];
  ChangeScheduleOverrideInput: ChangeScheduleOverrideInput;
  ChangeScheduleOverrideSuccess: ResolverTypeWrapper<
    Omit<ChangeScheduleOverrideSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  ChangeScheduleOverrideResult:
    | ResolversTypes["ChangeScheduleOverrideSuccess"]
    | ResolversTypes["NotFound"];
  ChangeAirflowInput: ChangeAirflowInput;
  ChangeAirflowSuccess: ResolverTypeWrapper<
    Omit<ChangeAirflowSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  ChangeAirflowResult:
    | ResolversTypes["ChangeAirflowSuccess"]
    | ResolversTypes["NotSupported"]
    | ResolversTypes["NotFound"];
  ToggleAirflowTestInput: ToggleAirflowTestInput;
  ToggleAirflowTestSuccess: ResolverTypeWrapper<
    Omit<ToggleAirflowTestSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  ToggleAirflowTestResult:
    | ResolversTypes["ToggleAirflowTestSuccess"]
    | ResolversTypes["NotFound"]
    | ResolversTypes["NotSupported"]
    | ResolversTypes["Offline"];
  SetAppActiveInput: SetAppActiveInput;
  SetAppActiveSuccess: ResolverTypeWrapper<
    Omit<SetAppActiveSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  SetAppActiveResult:
    | ResolversTypes["SetAppActiveSuccess"]
    | ResolversTypes["NotFound"];
  Error:
    | ResolversTypes["EmailInvalid"]
    | ResolversTypes["EmailTaken"]
    | ResolversTypes["FirstNameInvalid"]
    | ResolversTypes["LastNameInvalid"]
    | ResolversTypes["CountryInvalid"]
    | ResolversTypes["TokenInvalid"]
    | ResolversTypes["AccessTokenInvalid"]
    | ResolversTypes["NameInvalid"]
    | ResolversTypes["AwayModeActive"]
    | ResolversTypes["VacationModeActive"]
    | ResolversTypes["InactiveSlot"]
    | ResolversTypes["NotFound"]
    | ResolversTypes["NotSupported"]
    | ResolversTypes["Offline"]
    | ResolversTypes["LocationNameInvalid"]
    | ResolversTypes["VacationNotSupported"]
    | ResolversTypes["InvalidEmail"]
    | ResolversTypes["InvalidDate"]
    | ResolversTypes["InvalidCode"];
  NotFound: ResolverTypeWrapper<NotFound>;
  NotSupported: ResolverTypeWrapper<NotSupported>;
  Offline: ResolverTypeWrapper<Offline>;
  AirflowRange: ResolverTypeWrapper<AirflowRange>;
  ConnectionStatus: ConnectionStatus;
  Dealer: ResolverTypeWrapper<Dealer>;
  Fault: ResolverTypeWrapper<Fault>;
  Override: Override;
  Status: ResolverTypeWrapper<Status>;
  StatusItem: ResolverTypeWrapper<StatusItem>;
  Vacation: ResolverTypeWrapper<Vacation>;
  Version: ResolverTypeWrapper<Version>;
  Location: ResolverTypeWrapper<LocationMapper>;
  RenameLocationInput: RenameLocationInput;
  RenameLocationSuccess: ResolverTypeWrapper<
    Omit<RenameLocationSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  LocationNameInvalid: ResolverTypeWrapper<LocationNameInvalid>;
  RenameLocationResult:
    | ResolversTypes["RenameLocationSuccess"]
    | ResolversTypes["LocationNameInvalid"]
    | ResolversTypes["NotFound"];
  ChangeFanCfmInput: ChangeFanCfmInput;
  ChangeFanCfmSuccess: ResolverTypeWrapper<
    Omit<ChangeFanCfmSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  ChangeFanCfmResult:
    | ResolversTypes["ChangeFanCfmSuccess"]
    | ResolversTypes["NotFound"]
    | ResolversTypes["NotSupported"];
  ChangeLocationAwayInput: ChangeLocationAwayInput;
  ChangeLocationAwaySuccess: ResolverTypeWrapper<
    Omit<ChangeLocationAwaySuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  ChangeLocationAwayResult:
    | ResolversTypes["ChangeLocationAwaySuccess"]
    | ResolversTypes["NotFound"];
  RegisterLocationInput: RegisterLocationInput;
  RegisterLocationSuccess: ResolverTypeWrapper<
    Omit<RegisterLocationSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  RegisterLocationResult:
    | ResolversTypes["RegisterLocationSuccess"]
    | ResolversTypes["NotFound"];
  ChangeDealerInput: ChangeDealerInput;
  ChangeDealerSuccess: ResolverTypeWrapper<
    Omit<ChangeDealerSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  ChangeDealerResult:
    | ResolversTypes["ChangeDealerSuccess"]
    | ResolversTypes["NotFound"];
  ChangeProgrammableInput: ChangeProgrammableInput;
  ChangeProgrammableSuccess: ResolverTypeWrapper<
    Omit<ChangeProgrammableSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  ChangeProgrammableResult:
    | ResolversTypes["ChangeProgrammableSuccess"]
    | ResolversTypes["NotFound"];
  ChangeVacationInput: ChangeVacationInput;
  ChangeVacationSuccess: ResolverTypeWrapper<
    Omit<ChangeVacationSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  VacationNotSupported: ResolverTypeWrapper<VacationNotSupported>;
  ChangeVacationResult:
    | ResolversTypes["ChangeVacationSuccess"]
    | ResolversTypes["VacationNotSupported"]
    | ResolversTypes["NotFound"];
  ChangeVacationSetpointsInput: ChangeVacationSetpointsInput;
  ChangeVacationSetpointsSuccess: ResolverTypeWrapper<
    Omit<ChangeVacationSetpointsSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  ChangeVacationSetpointsResult:
    | ResolversTypes["ChangeVacationSetpointsSuccess"]
    | ResolversTypes["VacationNotSupported"]
    | ResolversTypes["NotFound"];
  StatusSection: StatusSection;
  RefreshStatusInput: RefreshStatusInput;
  RefreshStatusSuccess: ResolverTypeWrapper<
    Omit<RefreshStatusSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  RefreshStatusResult:
    | ResolversTypes["RefreshStatusSuccess"]
    | ResolversTypes["NotFound"]
    | ResolversTypes["Offline"];
  RemoveLocationInput: RemoveLocationInput;
  RemoveLocationSuccess: ResolverTypeWrapper<RemoveLocationSuccess>;
  RemoveLocationResult:
    | ResolversTypes["RemoveLocationSuccess"]
    | ResolversTypes["NotFound"];
  LogType: LogType;
  ResetLogsInput: ResetLogsInput;
  ResetLogsSuccess: ResolverTypeWrapper<
    Omit<ResetLogsSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  ResetLogsResult:
    | ResolversTypes["ResetLogsSuccess"]
    | ResolversTypes["NotFound"]
    | ResolversTypes["NotSupported"];
  Notification:
    | ResolversTypes["FaultNotification"]
    | ResolversTypes["FilterNotification"]
    | ResolversTypes["HumidityNotification"]
    | ResolversTypes["OfflineNotification"]
    | ResolversTypes["ServiceReminder"]
    | ResolversTypes["TemperatureNotification"];
  FaultNotification: ResolverTypeWrapper<FaultNotification>;
  FilterNotification: ResolverTypeWrapper<FilterNotification>;
  HumidityNotification: ResolverTypeWrapper<HumidityNotification>;
  OfflineNotification: ResolverTypeWrapper<OfflineNotification>;
  ServiceReminderDate: ResolverTypeWrapper<ServiceReminderDate>;
  ServiceReminder: ResolverTypeWrapper<ServiceReminder>;
  TemperatureNotification: ResolverTypeWrapper<TemperatureNotification>;
  PushTokenStatus: PushTokenStatus;
  PushToken: ResolverTypeWrapper<PushTokenMapper>;
  User: ResolverTypeWrapper<UserMapper>;
  SubscribeToNotificationsInput: SubscribeToNotificationsInput;
  SubscribeToNotificationsSuccess: ResolverTypeWrapper<
    Omit<SubscribeToNotificationsSuccess, "pushToken"> & {
      pushToken: ResolversTypes["PushToken"];
    }
  >;
  SubscribeToNotificationsResult: ResolversTypes["SubscribeToNotificationsSuccess"];
  UnsubscribeFromNotificationsInput: UnsubscribeFromNotificationsInput;
  UnsubscribeFromNotificationsSuccess: ResolverTypeWrapper<
    UnsubscribeFromNotificationsSuccess
  >;
  UnsubscribeFromNotificationsResult:
    | ResolversTypes["UnsubscribeFromNotificationsSuccess"]
    | ResolversTypes["NotFound"];
  ToggleFaultNotificationInput: ToggleFaultNotificationInput;
  ToggleFaultNotificationSuccess: ResolverTypeWrapper<
    Omit<ToggleFaultNotificationSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  ToggleFaultNotificationResult:
    | ResolversTypes["ToggleFaultNotificationSuccess"]
    | ResolversTypes["NotFound"];
  ToggleHumidityNotificationInput: ToggleHumidityNotificationInput;
  ToggleHumidityNotificationSuccess: ResolverTypeWrapper<
    Omit<ToggleHumidityNotificationSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  ToggleHumidityNotificationResult:
    | ResolversTypes["ToggleHumidityNotificationSuccess"]
    | ResolversTypes["NotFound"];
  AdjustHumidityNotificationThresholdInput: AdjustHumidityNotificationThresholdInput;
  AdjustHumidityNotificationThresholdSuccess: ResolverTypeWrapper<
    Omit<AdjustHumidityNotificationThresholdSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  AdjustHumidityNotificationThresholdResult:
    | ResolversTypes["AdjustHumidityNotificationThresholdSuccess"]
    | ResolversTypes["NotFound"];
  ToggleServiceReminderInput: ToggleServiceReminderInput;
  ToggleServiceReminderSuccess: ResolverTypeWrapper<
    Omit<ToggleServiceReminderSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  ToggleServiceReminderResult:
    | ResolversTypes["ToggleServiceReminderSuccess"]
    | ResolversTypes["NotFound"];
  AdjustServiceReminderDateInput: AdjustServiceReminderDateInput;
  AdjustServiceReminderDatesInput: AdjustServiceReminderDatesInput;
  AdjustServiceReminderDatesSuccess: ResolverTypeWrapper<
    Omit<AdjustServiceReminderDatesSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  AdjustServiceReminderDatesResult:
    | ResolversTypes["AdjustServiceReminderDatesSuccess"]
    | ResolversTypes["NotFound"];
  ToggleTemperatureNotificationInput: ToggleTemperatureNotificationInput;
  ToggleTemperatureNotificationSuccess: ResolverTypeWrapper<
    Omit<ToggleTemperatureNotificationSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  ToggleTemperatureNotificationResult:
    | ResolversTypes["ToggleTemperatureNotificationSuccess"]
    | ResolversTypes["NotFound"];
  AdjustTemperatureNotificationThresholdInput: AdjustTemperatureNotificationThresholdInput;
  AdjustTemperatureNotificationThresholdSuccess: ResolverTypeWrapper<
    Omit<AdjustTemperatureNotificationThresholdSuccess, "controller"> & {
      controller: ResolversTypes["Controller"];
    }
  >;
  AdjustTemperatureNotificationThresholdResult:
    | ResolversTypes["AdjustTemperatureNotificationThresholdSuccess"]
    | ResolversTypes["NotFound"];
  ShareAccessLevel: ShareAccessLevel;
  Share: ResolverTypeWrapper<ShareMapper>;
  Sharer: ResolverTypeWrapper<Sharer>;
  ShareLocationInput: ShareLocationInput;
  ShareLocationSuccess: ResolverTypeWrapper<
    Omit<ShareLocationSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  InvalidEmail: ResolverTypeWrapper<InvalidEmail>;
  InvalidDate: ResolverTypeWrapper<InvalidDate>;
  ShareLocationResult:
    | ResolversTypes["ShareLocationSuccess"]
    | ResolversTypes["InvalidDate"]
    | ResolversTypes["InvalidEmail"]
    | ResolversTypes["NotFound"];
  RevokeShareInput: RevokeShareInput;
  RevokeShareSuccess: ResolverTypeWrapper<
    Omit<RevokeShareSuccess, "location"> & {
      location: ResolversTypes["Location"];
    }
  >;
  RevokeShareResult:
    | ResolversTypes["RevokeShareSuccess"]
    | ResolversTypes["NotFound"];
  RequestShareInput: RequestShareInput;
  RequestShareSuccess: ResolverTypeWrapper<RequestShareSuccess>;
  RequestShareResult:
    | ResolversTypes["RequestShareSuccess"]
    | ResolversTypes["InvalidEmail"];
  AccountType: AccountType;
  TemperatureUnit: TemperatureUnit;
  ChangeTemperatureUnitInput: ChangeTemperatureUnitInput;
  ChangeTemperatureUnitSuccess: ResolverTypeWrapper<
    Omit<ChangeTemperatureUnitSuccess, "user"> & {
      user: ResolversTypes["User"];
    }
  >;
  ChangeTemperatureUnitResult: ResolversTypes["ChangeTemperatureUnitSuccess"];
  ConvertToHomeownerAccountSuccess: ResolverTypeWrapper<
    Omit<ConvertToHomeownerAccountSuccess, "user"> & {
      user: ResolversTypes["User"];
    }
  >;
  ConvertToHomeownerAccountResult: ResolversTypes["ConvertToHomeownerAccountSuccess"];
  ConvertToProAccountInput: ConvertToProAccountInput;
  InvalidCode: ResolverTypeWrapper<InvalidCode>;
  ConvertToProAccountSuccess: ResolverTypeWrapper<
    Omit<ConvertToProAccountSuccess, "user"> & { user: ResolversTypes["User"] }
  >;
  ConvertToProAccountResult:
    | ResolversTypes["ConvertToProAccountSuccess"]
    | ResolversTypes["InvalidCode"];
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Boolean: Scalars["Boolean"];
  ID: Scalars["ID"];
  Mutation: {};
  RequestSurveySessionResult: RequestSurveySessionResult;
  String: Scalars["String"];
  RequestRatingInput: RequestRatingInput;
  RequestSurveyFeedbackInput: RequestSurveyFeedbackInput;
  UpdateRequiredInput: UpdateRequiredInput;
  CheckEmailInput: CheckEmailInput;
  CheckEmailResult: CheckEmailResult;
  SendTokenInput: SendTokenInput;
  SendTokenSuccess: SendTokenSuccess;
  SendTokenResult:
    | ResolversParentTypes["SendTokenSuccess"]
    | ResolversParentTypes["NotFound"];
  SignUpInput: SignUpInput;
  SignUpSuccess: SignUpSuccess;
  EmailInvalid: EmailInvalid;
  EmailTaken: EmailTaken;
  FirstNameInvalid: FirstNameInvalid;
  LastNameInvalid: LastNameInvalid;
  CountryInvalid: CountryInvalid;
  SignUpResult:
    | ResolversParentTypes["SignUpSuccess"]
    | ResolversParentTypes["EmailInvalid"]
    | ResolversParentTypes["EmailTaken"]
    | ResolversParentTypes["FirstNameInvalid"]
    | ResolversParentTypes["LastNameInvalid"]
    | ResolversParentTypes["CountryInvalid"];
  SignInInput: SignInInput;
  SignInSuccess: Omit<SignInSuccess, "user"> & {
    user: ResolversParentTypes["User"];
  };
  Int: Scalars["Int"];
  TokenInvalid: TokenInvalid;
  SignInResult:
    | ResolversParentTypes["SignInSuccess"]
    | ResolversParentTypes["TokenInvalid"]
    | ResolversParentTypes["EmailInvalid"];
  RefreshTokenInput: RefreshTokenInput;
  RefreshTokenSuccess: RefreshTokenSuccess;
  RefreshTokenResult:
    | ResolversParentTypes["RefreshTokenSuccess"]
    | ResolversParentTypes["TokenInvalid"];
  SignOutInput: SignOutInput;
  AccessTokenInvalid: AccessTokenInvalid;
  SignOutSuccess: SignOutSuccess;
  SignOutResult:
    | ResolversParentTypes["SignOutSuccess"]
    | ResolversParentTypes["AccessTokenInvalid"];
  GenerateLoginTokenSuccess: GenerateLoginTokenSuccess;
  GenerateLoginTokenResult: ResolversParentTypes["GenerateLoginTokenSuccess"];
  GenerateShareTokenSuccess: GenerateShareTokenSuccess;
  GenerateShareTokenResult: ResolversParentTypes["GenerateShareTokenSuccess"];
  RemoveAccountInput: RemoveAccountInput;
  RemoveAccountSuccess: RemoveAccountSuccess;
  RemoveAccountResult:
    | ResolversParentTypes["RemoveAccountSuccess"]
    | ResolversParentTypes["TokenInvalid"];
  Setpoints: Setpoints;
  Away: Away;
  Fan: Fan;
  Float: Scalars["Float"];
  ScheduleTime: ScheduleTime;
  ScheduleEvent: ScheduleEvent;
  Schedule: Schedule;
  SetpointRange: SetpointRange;
  Humidification: Humidification;
  ZoneVersion: ZoneVersion;
  ZoneSensor: ZoneSensor;
  Controller: DeviceMapper;
  RenameControllerInput: RenameControllerInput;
  RenameControllerSuccess: Omit<RenameControllerSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  NameInvalid: NameInvalid;
  RenameControllerResult:
    | ResolversParentTypes["RenameControllerSuccess"]
    | ResolversParentTypes["NameInvalid"]
    | ResolversParentTypes["NotFound"];
  ChangeSetpointInput: ChangeSetpointInput;
  ChangeSetpointSuccess: Omit<ChangeSetpointSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  AwayModeActive: AwayModeActive;
  VacationModeActive: VacationModeActive;
  ChangeSetpointResult:
    | ResolversParentTypes["ChangeSetpointSuccess"]
    | ResolversParentTypes["AwayModeActive"]
    | ResolversParentTypes["VacationModeActive"]
    | ResolversParentTypes["NotFound"];
  ChangeModeInput: ChangeModeInput;
  ChangeModeSuccess: Omit<ChangeModeSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  ChangeModeResult:
    | ResolversParentTypes["ChangeModeSuccess"]
    | ResolversParentTypes["NotFound"];
  ChangeAwayInput: ChangeAwayInput;
  ChangeAwaySuccess: Omit<ChangeAwaySuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  ChangeAwayResult:
    | ResolversParentTypes["ChangeAwaySuccess"]
    | ResolversParentTypes["NotFound"];
  ChangeAwaySetpointsInput: ChangeAwaySetpointsInput;
  ChangeAwaySetpointsSuccess: Omit<ChangeAwaySetpointsSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  ChangeAwaySetpointsResult:
    | ResolversParentTypes["ChangeAwaySetpointsSuccess"]
    | ResolversParentTypes["NotFound"];
  ChangeFanModeInput: ChangeFanModeInput;
  ChangeFanModeSuccess: Omit<ChangeFanModeSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  ChangeFanModeResult:
    | ResolversParentTypes["ChangeFanModeSuccess"]
    | ResolversParentTypes["NotFound"]
    | ResolversParentTypes["NotSupported"];
  CancelTemperatureHoldInput: CancelTemperatureHoldInput;
  CancelTemperatureHoldSuccess: Omit<
    CancelTemperatureHoldSuccess,
    "controller"
  > & { controller: ResolversParentTypes["Controller"] };
  CancelTemperatureHoldResult:
    | ResolversParentTypes["CancelTemperatureHoldSuccess"]
    | ResolversParentTypes["NotFound"];
  CancelFanHoldInput: CancelFanHoldInput;
  CancelFanHoldSuccess: Omit<CancelFanHoldSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  CancelFanHoldResult:
    | ResolversParentTypes["CancelFanHoldSuccess"]
    | ResolversParentTypes["NotFound"];
  ChangeScheduleInput: ChangeScheduleInput;
  ChangeScheduleSuccess: Omit<ChangeScheduleSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  InactiveSlot: InactiveSlot;
  ChangeScheduleResult:
    | ResolversParentTypes["ChangeScheduleSuccess"]
    | ResolversParentTypes["InactiveSlot"]
    | ResolversParentTypes["NotFound"];
  CopyScheduleInput: CopyScheduleInput;
  CopyScheduleSuccess: Omit<CopyScheduleSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  CopyScheduleResult:
    | ResolversParentTypes["CopyScheduleSuccess"]
    | ResolversParentTypes["NotFound"];
  AddLeaveArriveInput: AddLeaveArriveInput;
  AddLeaveArriveSuccess: Omit<AddLeaveArriveSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  AddLeaveArriveResult:
    | ResolversParentTypes["AddLeaveArriveSuccess"]
    | ResolversParentTypes["NotFound"];
  RemoveLeaveArriveInput: RemoveLeaveArriveInput;
  RemoveLeaveArriveSuccess: Omit<RemoveLeaveArriveSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  RemoveLeaveArriveResult:
    | ResolversParentTypes["RemoveLeaveArriveSuccess"]
    | ResolversParentTypes["NotFound"];
  RestoreDefaultScheduleInput: RestoreDefaultScheduleInput;
  RestoreDefaultScheduleSuccess: Omit<
    RestoreDefaultScheduleSuccess,
    "controller"
  > & { controller: ResolversParentTypes["Controller"] };
  RestoreDefaultScheduleResult:
    | ResolversParentTypes["RestoreDefaultScheduleSuccess"]
    | ResolversParentTypes["NotFound"];
  ChangeHumidificationModeInput: ChangeHumidificationModeInput;
  ChangeHumidificationModeSuccess: Omit<
    ChangeHumidificationModeSuccess,
    "controller"
  > & { controller: ResolversParentTypes["Controller"] };
  ChangeHumidificationModeResult:
    | ResolversParentTypes["ChangeHumidificationModeSuccess"]
    | ResolversParentTypes["NotSupported"]
    | ResolversParentTypes["NotFound"];
  ChangeHumidificationInput: ChangeHumidificationInput;
  ChangeHumidificationSuccess: Omit<
    ChangeHumidificationSuccess,
    "controller"
  > & { controller: ResolversParentTypes["Controller"] };
  ChangeHumidificationResult:
    | ResolversParentTypes["ChangeHumidificationSuccess"]
    | ResolversParentTypes["NotSupported"]
    | ResolversParentTypes["NotFound"];
  ChangeScheduleOverrideInput: ChangeScheduleOverrideInput;
  ChangeScheduleOverrideSuccess: Omit<
    ChangeScheduleOverrideSuccess,
    "controller"
  > & { controller: ResolversParentTypes["Controller"] };
  ChangeScheduleOverrideResult:
    | ResolversParentTypes["ChangeScheduleOverrideSuccess"]
    | ResolversParentTypes["NotFound"];
  ChangeAirflowInput: ChangeAirflowInput;
  ChangeAirflowSuccess: Omit<ChangeAirflowSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  ChangeAirflowResult:
    | ResolversParentTypes["ChangeAirflowSuccess"]
    | ResolversParentTypes["NotSupported"]
    | ResolversParentTypes["NotFound"];
  ToggleAirflowTestInput: ToggleAirflowTestInput;
  ToggleAirflowTestSuccess: Omit<ToggleAirflowTestSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  ToggleAirflowTestResult:
    | ResolversParentTypes["ToggleAirflowTestSuccess"]
    | ResolversParentTypes["NotFound"]
    | ResolversParentTypes["NotSupported"]
    | ResolversParentTypes["Offline"];
  SetAppActiveInput: SetAppActiveInput;
  SetAppActiveSuccess: Omit<SetAppActiveSuccess, "controller"> & {
    controller: ResolversParentTypes["Controller"];
  };
  SetAppActiveResult:
    | ResolversParentTypes["SetAppActiveSuccess"]
    | ResolversParentTypes["NotFound"];
  Error:
    | ResolversParentTypes["EmailInvalid"]
    | ResolversParentTypes["EmailTaken"]
    | ResolversParentTypes["FirstNameInvalid"]
    | ResolversParentTypes["LastNameInvalid"]
    | ResolversParentTypes["CountryInvalid"]
    | ResolversParentTypes["TokenInvalid"]
    | ResolversParentTypes["AccessTokenInvalid"]
    | ResolversParentTypes["NameInvalid"]
    | ResolversParentTypes["AwayModeActive"]
    | ResolversParentTypes["VacationModeActive"]
    | ResolversParentTypes["InactiveSlot"]
    | ResolversParentTypes["NotFound"]
    | ResolversParentTypes["NotSupported"]
    | ResolversParentTypes["Offline"]
    | ResolversParentTypes["LocationNameInvalid"]
    | ResolversParentTypes["VacationNotSupported"]
    | ResolversParentTypes["InvalidEmail"]
    | ResolversParentTypes["InvalidDate"]
    | ResolversParentTypes["InvalidCode"];
  NotFound: NotFound;
  NotSupported: NotSupported;
  Offline: Offline;
  AirflowRange: AirflowRange;
  Dealer: Dealer;
  Fault: Fault;
  Status: Status;
  StatusItem: StatusItem;
  Vacation: Vacation;
  Version: Version;
  Location: LocationMapper;
  RenameLocationInput: RenameLocationInput;
  RenameLocationSuccess: Omit<RenameLocationSuccess, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  LocationNameInvalid: LocationNameInvalid;
  RenameLocationResult:
    | ResolversParentTypes["RenameLocationSuccess"]
    | ResolversParentTypes["LocationNameInvalid"]
    | ResolversParentTypes["NotFound"];
  ChangeFanCfmInput: ChangeFanCfmInput;
  ChangeFanCfmSuccess: Omit<ChangeFanCfmSuccess, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  ChangeFanCfmResult:
    | ResolversParentTypes["ChangeFanCfmSuccess"]
    | ResolversParentTypes["NotFound"]
    | ResolversParentTypes["NotSupported"];
  ChangeLocationAwayInput: ChangeLocationAwayInput;
  ChangeLocationAwaySuccess: Omit<ChangeLocationAwaySuccess, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  ChangeLocationAwayResult:
    | ResolversParentTypes["ChangeLocationAwaySuccess"]
    | ResolversParentTypes["NotFound"];
  RegisterLocationInput: RegisterLocationInput;
  RegisterLocationSuccess: Omit<RegisterLocationSuccess, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  RegisterLocationResult:
    | ResolversParentTypes["RegisterLocationSuccess"]
    | ResolversParentTypes["NotFound"];
  ChangeDealerInput: ChangeDealerInput;
  ChangeDealerSuccess: Omit<ChangeDealerSuccess, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  ChangeDealerResult:
    | ResolversParentTypes["ChangeDealerSuccess"]
    | ResolversParentTypes["NotFound"];
  ChangeProgrammableInput: ChangeProgrammableInput;
  ChangeProgrammableSuccess: Omit<ChangeProgrammableSuccess, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  ChangeProgrammableResult:
    | ResolversParentTypes["ChangeProgrammableSuccess"]
    | ResolversParentTypes["NotFound"];
  ChangeVacationInput: ChangeVacationInput;
  ChangeVacationSuccess: Omit<ChangeVacationSuccess, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  VacationNotSupported: VacationNotSupported;
  ChangeVacationResult:
    | ResolversParentTypes["ChangeVacationSuccess"]
    | ResolversParentTypes["VacationNotSupported"]
    | ResolversParentTypes["NotFound"];
  ChangeVacationSetpointsInput: ChangeVacationSetpointsInput;
  ChangeVacationSetpointsSuccess: Omit<
    ChangeVacationSetpointsSuccess,
    "location"
  > & { location: ResolversParentTypes["Location"] };
  ChangeVacationSetpointsResult:
    | ResolversParentTypes["ChangeVacationSetpointsSuccess"]
    | ResolversParentTypes["VacationNotSupported"]
    | ResolversParentTypes["NotFound"];
  RefreshStatusInput: RefreshStatusInput;
  RefreshStatusSuccess: Omit<RefreshStatusSuccess, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  RefreshStatusResult:
    | ResolversParentTypes["RefreshStatusSuccess"]
    | ResolversParentTypes["NotFound"]
    | ResolversParentTypes["Offline"];
  RemoveLocationInput: RemoveLocationInput;
  RemoveLocationSuccess: RemoveLocationSuccess;
  RemoveLocationResult:
    | ResolversParentTypes["RemoveLocationSuccess"]
    | ResolversParentTypes["NotFound"];
  ResetLogsInput: ResetLogsInput;
  ResetLogsSuccess: Omit<ResetLogsSuccess, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  ResetLogsResult:
    | ResolversParentTypes["ResetLogsSuccess"]
    | ResolversParentTypes["NotFound"]
    | ResolversParentTypes["NotSupported"];
  Notification:
    | ResolversParentTypes["FaultNotification"]
    | ResolversParentTypes["FilterNotification"]
    | ResolversParentTypes["HumidityNotification"]
    | ResolversParentTypes["OfflineNotification"]
    | ResolversParentTypes["ServiceReminder"]
    | ResolversParentTypes["TemperatureNotification"];
  FaultNotification: FaultNotification;
  FilterNotification: FilterNotification;
  HumidityNotification: HumidityNotification;
  OfflineNotification: OfflineNotification;
  ServiceReminderDate: ServiceReminderDate;
  ServiceReminder: ServiceReminder;
  TemperatureNotification: TemperatureNotification;
  PushToken: PushTokenMapper;
  User: UserMapper;
  SubscribeToNotificationsInput: SubscribeToNotificationsInput;
  SubscribeToNotificationsSuccess: Omit<
    SubscribeToNotificationsSuccess,
    "pushToken"
  > & { pushToken: ResolversParentTypes["PushToken"] };
  SubscribeToNotificationsResult: ResolversParentTypes["SubscribeToNotificationsSuccess"];
  UnsubscribeFromNotificationsInput: UnsubscribeFromNotificationsInput;
  UnsubscribeFromNotificationsSuccess: UnsubscribeFromNotificationsSuccess;
  UnsubscribeFromNotificationsResult:
    | ResolversParentTypes["UnsubscribeFromNotificationsSuccess"]
    | ResolversParentTypes["NotFound"];
  ToggleFaultNotificationInput: ToggleFaultNotificationInput;
  ToggleFaultNotificationSuccess: Omit<
    ToggleFaultNotificationSuccess,
    "location"
  > & { location: ResolversParentTypes["Location"] };
  ToggleFaultNotificationResult:
    | ResolversParentTypes["ToggleFaultNotificationSuccess"]
    | ResolversParentTypes["NotFound"];
  ToggleHumidityNotificationInput: ToggleHumidityNotificationInput;
  ToggleHumidityNotificationSuccess: Omit<
    ToggleHumidityNotificationSuccess,
    "controller"
  > & { controller: ResolversParentTypes["Controller"] };
  ToggleHumidityNotificationResult:
    | ResolversParentTypes["ToggleHumidityNotificationSuccess"]
    | ResolversParentTypes["NotFound"];
  AdjustHumidityNotificationThresholdInput: AdjustHumidityNotificationThresholdInput;
  AdjustHumidityNotificationThresholdSuccess: Omit<
    AdjustHumidityNotificationThresholdSuccess,
    "controller"
  > & { controller: ResolversParentTypes["Controller"] };
  AdjustHumidityNotificationThresholdResult:
    | ResolversParentTypes["AdjustHumidityNotificationThresholdSuccess"]
    | ResolversParentTypes["NotFound"];
  ToggleServiceReminderInput: ToggleServiceReminderInput;
  ToggleServiceReminderSuccess: Omit<
    ToggleServiceReminderSuccess,
    "location"
  > & { location: ResolversParentTypes["Location"] };
  ToggleServiceReminderResult:
    | ResolversParentTypes["ToggleServiceReminderSuccess"]
    | ResolversParentTypes["NotFound"];
  AdjustServiceReminderDateInput: AdjustServiceReminderDateInput;
  AdjustServiceReminderDatesInput: AdjustServiceReminderDatesInput;
  AdjustServiceReminderDatesSuccess: Omit<
    AdjustServiceReminderDatesSuccess,
    "location"
  > & { location: ResolversParentTypes["Location"] };
  AdjustServiceReminderDatesResult:
    | ResolversParentTypes["AdjustServiceReminderDatesSuccess"]
    | ResolversParentTypes["NotFound"];
  ToggleTemperatureNotificationInput: ToggleTemperatureNotificationInput;
  ToggleTemperatureNotificationSuccess: Omit<
    ToggleTemperatureNotificationSuccess,
    "controller"
  > & { controller: ResolversParentTypes["Controller"] };
  ToggleTemperatureNotificationResult:
    | ResolversParentTypes["ToggleTemperatureNotificationSuccess"]
    | ResolversParentTypes["NotFound"];
  AdjustTemperatureNotificationThresholdInput: AdjustTemperatureNotificationThresholdInput;
  AdjustTemperatureNotificationThresholdSuccess: Omit<
    AdjustTemperatureNotificationThresholdSuccess,
    "controller"
  > & { controller: ResolversParentTypes["Controller"] };
  AdjustTemperatureNotificationThresholdResult:
    | ResolversParentTypes["AdjustTemperatureNotificationThresholdSuccess"]
    | ResolversParentTypes["NotFound"];
  Share: ShareMapper;
  Sharer: Sharer;
  ShareLocationInput: ShareLocationInput;
  ShareLocationSuccess: Omit<ShareLocationSuccess, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  InvalidEmail: InvalidEmail;
  InvalidDate: InvalidDate;
  ShareLocationResult:
    | ResolversParentTypes["ShareLocationSuccess"]
    | ResolversParentTypes["InvalidDate"]
    | ResolversParentTypes["InvalidEmail"]
    | ResolversParentTypes["NotFound"];
  RevokeShareInput: RevokeShareInput;
  RevokeShareSuccess: Omit<RevokeShareSuccess, "location"> & {
    location: ResolversParentTypes["Location"];
  };
  RevokeShareResult:
    | ResolversParentTypes["RevokeShareSuccess"]
    | ResolversParentTypes["NotFound"];
  RequestShareInput: RequestShareInput;
  RequestShareSuccess: RequestShareSuccess;
  RequestShareResult:
    | ResolversParentTypes["RequestShareSuccess"]
    | ResolversParentTypes["InvalidEmail"];
  ChangeTemperatureUnitInput: ChangeTemperatureUnitInput;
  ChangeTemperatureUnitSuccess: Omit<ChangeTemperatureUnitSuccess, "user"> & {
    user: ResolversParentTypes["User"];
  };
  ChangeTemperatureUnitResult: ResolversParentTypes["ChangeTemperatureUnitSuccess"];
  ConvertToHomeownerAccountSuccess: Omit<
    ConvertToHomeownerAccountSuccess,
    "user"
  > & { user: ResolversParentTypes["User"] };
  ConvertToHomeownerAccountResult: ResolversParentTypes["ConvertToHomeownerAccountSuccess"];
  ConvertToProAccountInput: ConvertToProAccountInput;
  InvalidCode: InvalidCode;
  ConvertToProAccountSuccess: Omit<ConvertToProAccountSuccess, "user"> & {
    user: ResolversParentTypes["User"];
  };
  ConvertToProAccountResult:
    | ResolversParentTypes["ConvertToProAccountSuccess"]
    | ResolversParentTypes["InvalidCode"];
}>;

export type AccessDirectiveArgs = { requires?: Maybe<AccessLevel> };

export type AccessDirectiveResolver<
  Result,
  Parent,
  ContextType = AppContext,
  Args = AccessDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  controller?: Resolver<
    Maybe<ResolversTypes["Controller"]>,
    ParentType,
    ContextType,
    RequireFields<QueryControllerArgs, "id">
  >;
  controllers?: Resolver<
    Array<ResolversTypes["Controller"]>,
    ParentType,
    ContextType
  >;
  location?: Resolver<
    Maybe<ResolversTypes["Location"]>,
    ParentType,
    ContextType,
    RequireFields<QueryLocationArgs, "id">
  >;
  locations?: Resolver<
    Array<ResolversTypes["Location"]>,
    ParentType,
    ContextType
  >;
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  requestRating?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<QueryRequestRatingArgs, never>
  >;
  requestSurveyFeedback?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<QueryRequestSurveyFeedbackArgs, "input">
  >;
  updateRequired?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<QueryUpdateRequiredArgs, "input">
  >;
}>;

export type MutationResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  addLeaveArrive?: Resolver<
    ResolversTypes["AddLeaveArriveResult"],
    ParentType,
    ContextType,
    RequireFields<MutationAddLeaveArriveArgs, "input">
  >;
  adjustHumidityNotificationThreshold?: Resolver<
    ResolversTypes["AdjustHumidityNotificationThresholdResult"],
    ParentType,
    ContextType,
    RequireFields<MutationAdjustHumidityNotificationThresholdArgs, "input">
  >;
  adjustServiceReminderDates?: Resolver<
    ResolversTypes["AdjustServiceReminderDatesResult"],
    ParentType,
    ContextType,
    RequireFields<MutationAdjustServiceReminderDatesArgs, "input">
  >;
  adjustTemperatureNotificationThreshold?: Resolver<
    ResolversTypes["AdjustTemperatureNotificationThresholdResult"],
    ParentType,
    ContextType,
    RequireFields<MutationAdjustTemperatureNotificationThresholdArgs, "input">
  >;
  cancelFanHold?: Resolver<
    ResolversTypes["CancelFanHoldResult"],
    ParentType,
    ContextType,
    RequireFields<MutationCancelFanHoldArgs, "input">
  >;
  cancelTemperatureHold?: Resolver<
    ResolversTypes["CancelTemperatureHoldResult"],
    ParentType,
    ContextType,
    RequireFields<MutationCancelTemperatureHoldArgs, "input">
  >;
  changeAirflow?: Resolver<
    ResolversTypes["ChangeAirflowResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeAirflowArgs, "input">
  >;
  changeAway?: Resolver<
    ResolversTypes["ChangeAwayResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeAwayArgs, "input">
  >;
  changeAwaySetpoints?: Resolver<
    ResolversTypes["ChangeAwaySetpointsResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeAwaySetpointsArgs, "input">
  >;
  changeDealer?: Resolver<
    ResolversTypes["ChangeDealerResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeDealerArgs, "input">
  >;
  changeDehumidification?: Resolver<
    ResolversTypes["ChangeHumidificationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeDehumidificationArgs, "input">
  >;
  changeDehumidificationMode?: Resolver<
    ResolversTypes["ChangeHumidificationModeResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeDehumidificationModeArgs, "input">
  >;
  changeFanCfm?: Resolver<
    ResolversTypes["ChangeFanCfmResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeFanCfmArgs, "input">
  >;
  changeFanMode?: Resolver<
    ResolversTypes["ChangeFanModeResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeFanModeArgs, "input">
  >;
  changeHumidification?: Resolver<
    ResolversTypes["ChangeHumidificationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeHumidificationArgs, "input">
  >;
  changeHumidificationMode?: Resolver<
    ResolversTypes["ChangeHumidificationModeResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeHumidificationModeArgs, "input">
  >;
  changeLocationAway?: Resolver<
    ResolversTypes["ChangeLocationAwayResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeLocationAwayArgs, "input">
  >;
  changeMode?: Resolver<
    ResolversTypes["ChangeModeResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeModeArgs, "input">
  >;
  changeProgrammable?: Resolver<
    ResolversTypes["ChangeProgrammableResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeProgrammableArgs, "input">
  >;
  changeSchedule?: Resolver<
    ResolversTypes["ChangeScheduleResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeScheduleArgs, "input">
  >;
  changeScheduleOverride?: Resolver<
    ResolversTypes["ChangeScheduleOverrideResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeScheduleOverrideArgs, "input">
  >;
  changeSetpoint?: Resolver<
    ResolversTypes["ChangeSetpointResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeSetpointArgs, "input">
  >;
  changeTemperatureUnit?: Resolver<
    ResolversTypes["ChangeTemperatureUnitResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeTemperatureUnitArgs, "input">
  >;
  changeVacation?: Resolver<
    ResolversTypes["ChangeVacationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeVacationArgs, "input">
  >;
  changeVacationSetpoints?: Resolver<
    ResolversTypes["ChangeVacationSetpointsResult"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeVacationSetpointsArgs, "input">
  >;
  checkEmail?: Resolver<
    ResolversTypes["CheckEmailResult"],
    ParentType,
    ContextType,
    RequireFields<MutationCheckEmailArgs, "input">
  >;
  convertToHomeownerAccount?: Resolver<
    ResolversTypes["ConvertToHomeownerAccountResult"],
    ParentType,
    ContextType
  >;
  convertToProAccount?: Resolver<
    ResolversTypes["ConvertToProAccountResult"],
    ParentType,
    ContextType,
    RequireFields<MutationConvertToProAccountArgs, "input">
  >;
  copySchedule?: Resolver<
    ResolversTypes["CopyScheduleResult"],
    ParentType,
    ContextType,
    RequireFields<MutationCopyScheduleArgs, "input">
  >;
  generateLoginToken?: Resolver<
    ResolversTypes["GenerateLoginTokenResult"],
    ParentType,
    ContextType
  >;
  generateShareToken?: Resolver<
    ResolversTypes["GenerateShareTokenResult"],
    ParentType,
    ContextType
  >;
  refreshStatus?: Resolver<
    ResolversTypes["RefreshStatusResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRefreshStatusArgs, "input">
  >;
  refreshToken?: Resolver<
    ResolversTypes["RefreshTokenResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRefreshTokenArgs, "input">
  >;
  registerLocation?: Resolver<
    ResolversTypes["RegisterLocationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterLocationArgs, "input">
  >;
  removeAccount?: Resolver<
    ResolversTypes["RemoveAccountResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveAccountArgs, "input">
  >;
  removeLeaveArrive?: Resolver<
    ResolversTypes["RemoveLeaveArriveResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveLeaveArriveArgs, "input">
  >;
  removeLocation?: Resolver<
    ResolversTypes["RemoveLocationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveLocationArgs, "input">
  >;
  renameController?: Resolver<
    ResolversTypes["RenameControllerResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRenameControllerArgs, "input">
  >;
  renameLocation?: Resolver<
    ResolversTypes["RenameLocationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRenameLocationArgs, "input">
  >;
  requestShare?: Resolver<
    ResolversTypes["RequestShareResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRequestShareArgs, "input">
  >;
  requestSurveySession?: Resolver<
    ResolversTypes["RequestSurveySessionResult"],
    ParentType,
    ContextType
  >;
  resetLogs?: Resolver<
    ResolversTypes["ResetLogsResult"],
    ParentType,
    ContextType,
    RequireFields<MutationResetLogsArgs, "input">
  >;
  restoreDefaultSchedule?: Resolver<
    ResolversTypes["RestoreDefaultScheduleResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRestoreDefaultScheduleArgs, "input">
  >;
  revokeShare?: Resolver<
    ResolversTypes["RevokeShareResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRevokeShareArgs, "input">
  >;
  sendToken?: Resolver<
    ResolversTypes["SendTokenResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSendTokenArgs, "input">
  >;
  setAppActive?: Resolver<
    ResolversTypes["SetAppActiveResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSetAppActiveArgs, "input">
  >;
  shareLocation?: Resolver<
    ResolversTypes["ShareLocationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationShareLocationArgs, "input">
  >;
  signIn?: Resolver<
    ResolversTypes["SignInResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, "input">
  >;
  signOut?: Resolver<
    ResolversTypes["SignOutResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSignOutArgs, "input">
  >;
  signUp?: Resolver<
    ResolversTypes["SignUpResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, "input">
  >;
  subscribeToNotifications?: Resolver<
    ResolversTypes["SubscribeToNotificationsResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSubscribeToNotificationsArgs, "input">
  >;
  toggleAirflowTest?: Resolver<
    ResolversTypes["ToggleAirflowTestResult"],
    ParentType,
    ContextType,
    RequireFields<MutationToggleAirflowTestArgs, "input">
  >;
  toggleFaultNotification?: Resolver<
    ResolversTypes["ToggleFaultNotificationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationToggleFaultNotificationArgs, "input">
  >;
  toggleHumidityNotification?: Resolver<
    ResolversTypes["ToggleHumidityNotificationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationToggleHumidityNotificationArgs, "input">
  >;
  toggleServiceReminder?: Resolver<
    ResolversTypes["ToggleServiceReminderResult"],
    ParentType,
    ContextType,
    RequireFields<MutationToggleServiceReminderArgs, "input">
  >;
  toggleTemperatureNotification?: Resolver<
    ResolversTypes["ToggleTemperatureNotificationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationToggleTemperatureNotificationArgs, "input">
  >;
  unsubscribeFromNotifications?: Resolver<
    ResolversTypes["UnsubscribeFromNotificationsResult"],
    ParentType,
    ContextType,
    RequireFields<MutationUnsubscribeFromNotificationsArgs, "input">
  >;
}>;

export type RequestSurveySessionResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RequestSurveySessionResult"] = ResolversParentTypes["RequestSurveySessionResult"]
> = ResolversObject<{
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  sessionToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  sessionExpiresAt?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CheckEmailResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["CheckEmailResult"] = ResolversParentTypes["CheckEmailResult"]
> = ResolversObject<{
  available?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SendTokenSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SendTokenSuccess"] = ResolversParentTypes["SendTokenSuccess"]
> = ResolversObject<{
  accountStatus?: Resolver<
    Maybe<ResolversTypes["AccountStatus"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SendTokenResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SendTokenResult"] = ResolversParentTypes["SendTokenResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "SendTokenSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type SignUpSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SignUpSuccess"] = ResolversParentTypes["SignUpSuccess"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type EmailInvalidResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["EmailInvalid"] = ResolversParentTypes["EmailInvalid"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type EmailTakenResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["EmailTaken"] = ResolversParentTypes["EmailTaken"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type FirstNameInvalidResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["FirstNameInvalid"] = ResolversParentTypes["FirstNameInvalid"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type LastNameInvalidResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["LastNameInvalid"] = ResolversParentTypes["LastNameInvalid"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CountryInvalidResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["CountryInvalid"] = ResolversParentTypes["CountryInvalid"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SignUpResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SignUpResult"] = ResolversParentTypes["SignUpResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | "SignUpSuccess"
    | "EmailInvalid"
    | "EmailTaken"
    | "FirstNameInvalid"
    | "LastNameInvalid"
    | "CountryInvalid",
    ParentType,
    ContextType
  >;
}>;

export type SignInSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SignInSuccess"] = ResolversParentTypes["SignInSuccess"]
> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  ttl?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type TokenInvalidResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["TokenInvalid"] = ResolversParentTypes["TokenInvalid"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SignInResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SignInResult"] = ResolversParentTypes["SignInResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "SignInSuccess" | "TokenInvalid" | "EmailInvalid",
    ParentType,
    ContextType
  >;
}>;

export type RefreshTokenSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RefreshTokenSuccess"] = ResolversParentTypes["RefreshTokenSuccess"]
> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  ttl?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RefreshTokenResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RefreshTokenResult"] = ResolversParentTypes["RefreshTokenResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "RefreshTokenSuccess" | "TokenInvalid",
    ParentType,
    ContextType
  >;
}>;

export type AccessTokenInvalidResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["AccessTokenInvalid"] = ResolversParentTypes["AccessTokenInvalid"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SignOutSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SignOutSuccess"] = ResolversParentTypes["SignOutSuccess"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SignOutResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SignOutResult"] = ResolversParentTypes["SignOutResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "SignOutSuccess" | "AccessTokenInvalid",
    ParentType,
    ContextType
  >;
}>;

export type GenerateLoginTokenSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["GenerateLoginTokenSuccess"] = ResolversParentTypes["GenerateLoginTokenSuccess"]
> = ResolversObject<{
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type GenerateLoginTokenResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["GenerateLoginTokenResult"] = ResolversParentTypes["GenerateLoginTokenResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "GenerateLoginTokenSuccess",
    ParentType,
    ContextType
  >;
}>;

export type GenerateShareTokenSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["GenerateShareTokenSuccess"] = ResolversParentTypes["GenerateShareTokenSuccess"]
> = ResolversObject<{
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type GenerateShareTokenResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["GenerateShareTokenResult"] = ResolversParentTypes["GenerateShareTokenResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "GenerateShareTokenSuccess",
    ParentType,
    ContextType
  >;
}>;

export type RemoveAccountSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RemoveAccountSuccess"] = ResolversParentTypes["RemoveAccountSuccess"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RemoveAccountResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RemoveAccountResult"] = ResolversParentTypes["RemoveAccountResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "RemoveAccountSuccess" | "TokenInvalid",
    ParentType,
    ContextType
  >;
}>;

export type SetpointsResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Setpoints"] = ResolversParentTypes["Setpoints"]
> = ResolversObject<{
  heat?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  cool?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AwayResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Away"] = ResolversParentTypes["Away"]
> = ResolversObject<{
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  setpoints?: Resolver<ResolversTypes["Setpoints"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type FanResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Fan"] = ResolversParentTypes["Fan"]
> = ResolversObject<{
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  cfm?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  mode?: Resolver<ResolversTypes["FanMode"], ParentType, ContextType>;
  modes?: Resolver<Array<ResolversTypes["FanMode"]>, ParentType, ContextType>;
  override?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ScheduleTimeResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ScheduleTime"] = ResolversParentTypes["ScheduleTime"]
> = ResolversObject<{
  day?: Resolver<ResolversTypes["Day"], ParentType, ContextType>;
  hour?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  minute?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ScheduleEventResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ScheduleEvent"] = ResolversParentTypes["ScheduleEvent"]
> = ResolversObject<{
  day?: Resolver<ResolversTypes["Day"], ParentType, ContextType>;
  fanMode?: Resolver<ResolversTypes["FanMode"], ParentType, ContextType>;
  setpoints?: Resolver<ResolversTypes["Setpoints"], ParentType, ContextType>;
  slot?: Resolver<ResolversTypes["ScheduleSlot"], ParentType, ContextType>;
  start?: Resolver<ResolversTypes["ScheduleTime"], ParentType, ContextType>;
  stop?: Resolver<ResolversTypes["ScheduleTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ScheduleResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Schedule"] = ResolversParentTypes["Schedule"]
> = ResolversObject<{
  day?: Resolver<ResolversTypes["Day"], ParentType, ContextType>;
  awake?: Resolver<ResolversTypes["ScheduleEvent"], ParentType, ContextType>;
  leave?: Resolver<
    Maybe<ResolversTypes["ScheduleEvent"]>,
    ParentType,
    ContextType
  >;
  arrive?: Resolver<
    Maybe<ResolversTypes["ScheduleEvent"]>,
    ParentType,
    ContextType
  >;
  bed?: Resolver<ResolversTypes["ScheduleEvent"], ParentType, ContextType>;
  events?: Resolver<
    Array<ResolversTypes["ScheduleEvent"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SetpointRangeResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SetpointRange"] = ResolversParentTypes["SetpointRange"]
> = ResolversObject<{
  min?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  max?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type HumidificationResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Humidification"] = ResolversParentTypes["Humidification"]
> = ResolversObject<{
  max?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  min?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  mode?: Resolver<
    ResolversTypes["HumidificationMode"],
    ParentType,
    ContextType
  >;
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ZoneVersionResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ZoneVersion"] = ResolversParentTypes["ZoneVersion"]
> = ResolversObject<{
  primaryZoneControl?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  zoneSensor?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ZoneSensorResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ZoneSensor"] = ResolversParentTypes["ZoneSensor"]
> = ResolversObject<{
  sensor?: Resolver<ResolversTypes["Sensor"], ParentType, ContextType>;
  version?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ControllerResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Controller"] = ResolversParentTypes["Controller"]
> = ResolversObject<{
  accessLevel?: Resolver<
    ResolversTypes["AccessLevel"],
    ParentType,
    ContextType
  >;
  activeDemand?: Resolver<
    Maybe<ResolversTypes["Demand"]>,
    ParentType,
    ContextType
  >;
  activeScheduleEvent?: Resolver<
    Maybe<ResolversTypes["ScheduleEvent"]>,
    ParentType,
    ContextType
  >;
  airflow?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  airflowTestActive?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  away?: Resolver<Maybe<ResolversTypes["Away"]>, ParentType, ContextType>;
  coolRange?: Resolver<
    ResolversTypes["SetpointRange"],
    ParentType,
    ContextType
  >;
  deadband?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  dehumidification?: Resolver<
    Maybe<ResolversTypes["Humidification"]>,
    ParentType,
    ContextType
  >;
  disabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  fan?: Resolver<Maybe<ResolversTypes["Fan"]>, ParentType, ContextType>;
  heatRange?: Resolver<
    ResolversTypes["SetpointRange"],
    ParentType,
    ContextType
  >;
  humidification?: Resolver<
    Maybe<ResolversTypes["Humidification"]>,
    ParentType,
    ContextType
  >;
  humidity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  humidityNotification?: Resolver<
    Maybe<ResolversTypes["HumidityNotification"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  indoorTemp?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  mode?: Resolver<Maybe<ResolversTypes["Mode"]>, ParentType, ContextType>;
  modes?: Resolver<Array<ResolversTypes["Mode"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  outdoorTemp?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  schedule?: Resolver<
    Maybe<Array<ResolversTypes["Schedule"]>>,
    ParentType,
    ContextType
  >;
  scheduleOverride?: Resolver<
    ResolversTypes["ScheduleOverride"],
    ParentType,
    ContextType
  >;
  setpoints?: Resolver<
    Maybe<ResolversTypes["Setpoints"]>,
    ParentType,
    ContextType
  >;
  tempOverride?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  temperatureNotification?: Resolver<
    Maybe<ResolversTypes["TemperatureNotification"]>,
    ParentType,
    ContextType
  >;
  zone?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  zoneSensor?: Resolver<
    Maybe<ResolversTypes["ZoneSensor"]>,
    ParentType,
    ContextType
  >;
  zoning?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RenameControllerSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RenameControllerSuccess"] = ResolversParentTypes["RenameControllerSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type NameInvalidResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["NameInvalid"] = ResolversParentTypes["NameInvalid"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RenameControllerResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RenameControllerResult"] = ResolversParentTypes["RenameControllerResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "RenameControllerSuccess" | "NameInvalid" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeSetpointSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeSetpointSuccess"] = ResolversParentTypes["ChangeSetpointSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AwayModeActiveResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["AwayModeActive"] = ResolversParentTypes["AwayModeActive"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type VacationModeActiveResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["VacationModeActive"] = ResolversParentTypes["VacationModeActive"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeSetpointResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeSetpointResult"] = ResolversParentTypes["ChangeSetpointResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | "ChangeSetpointSuccess"
    | "AwayModeActive"
    | "VacationModeActive"
    | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeModeSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeModeSuccess"] = ResolversParentTypes["ChangeModeSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeModeResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeModeResult"] = ResolversParentTypes["ChangeModeResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeModeSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeAwaySuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeAwaySuccess"] = ResolversParentTypes["ChangeAwaySuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeAwayResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeAwayResult"] = ResolversParentTypes["ChangeAwayResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeAwaySuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeAwaySetpointsSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeAwaySetpointsSuccess"] = ResolversParentTypes["ChangeAwaySetpointsSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeAwaySetpointsResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeAwaySetpointsResult"] = ResolversParentTypes["ChangeAwaySetpointsResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeAwaySetpointsSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeFanModeSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeFanModeSuccess"] = ResolversParentTypes["ChangeFanModeSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeFanModeResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeFanModeResult"] = ResolversParentTypes["ChangeFanModeResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeFanModeSuccess" | "NotFound" | "NotSupported",
    ParentType,
    ContextType
  >;
}>;

export type CancelTemperatureHoldSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["CancelTemperatureHoldSuccess"] = ResolversParentTypes["CancelTemperatureHoldSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CancelTemperatureHoldResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["CancelTemperatureHoldResult"] = ResolversParentTypes["CancelTemperatureHoldResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "CancelTemperatureHoldSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type CancelFanHoldSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["CancelFanHoldSuccess"] = ResolversParentTypes["CancelFanHoldSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CancelFanHoldResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["CancelFanHoldResult"] = ResolversParentTypes["CancelFanHoldResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "CancelFanHoldSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeScheduleSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeScheduleSuccess"] = ResolversParentTypes["ChangeScheduleSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type InactiveSlotResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["InactiveSlot"] = ResolversParentTypes["InactiveSlot"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeScheduleResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeScheduleResult"] = ResolversParentTypes["ChangeScheduleResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeScheduleSuccess" | "InactiveSlot" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type CopyScheduleSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["CopyScheduleSuccess"] = ResolversParentTypes["CopyScheduleSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CopyScheduleResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["CopyScheduleResult"] = ResolversParentTypes["CopyScheduleResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "CopyScheduleSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type AddLeaveArriveSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["AddLeaveArriveSuccess"] = ResolversParentTypes["AddLeaveArriveSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AddLeaveArriveResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["AddLeaveArriveResult"] = ResolversParentTypes["AddLeaveArriveResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "AddLeaveArriveSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type RemoveLeaveArriveSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RemoveLeaveArriveSuccess"] = ResolversParentTypes["RemoveLeaveArriveSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RemoveLeaveArriveResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RemoveLeaveArriveResult"] = ResolversParentTypes["RemoveLeaveArriveResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "RemoveLeaveArriveSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type RestoreDefaultScheduleSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RestoreDefaultScheduleSuccess"] = ResolversParentTypes["RestoreDefaultScheduleSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RestoreDefaultScheduleResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RestoreDefaultScheduleResult"] = ResolversParentTypes["RestoreDefaultScheduleResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "RestoreDefaultScheduleSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeHumidificationModeSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeHumidificationModeSuccess"] = ResolversParentTypes["ChangeHumidificationModeSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeHumidificationModeResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeHumidificationModeResult"] = ResolversParentTypes["ChangeHumidificationModeResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeHumidificationModeSuccess" | "NotSupported" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeHumidificationSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeHumidificationSuccess"] = ResolversParentTypes["ChangeHumidificationSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeHumidificationResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeHumidificationResult"] = ResolversParentTypes["ChangeHumidificationResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeHumidificationSuccess" | "NotSupported" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeScheduleOverrideSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeScheduleOverrideSuccess"] = ResolversParentTypes["ChangeScheduleOverrideSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeScheduleOverrideResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeScheduleOverrideResult"] = ResolversParentTypes["ChangeScheduleOverrideResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeScheduleOverrideSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeAirflowSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeAirflowSuccess"] = ResolversParentTypes["ChangeAirflowSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeAirflowResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeAirflowResult"] = ResolversParentTypes["ChangeAirflowResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeAirflowSuccess" | "NotSupported" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ToggleAirflowTestSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ToggleAirflowTestSuccess"] = ResolversParentTypes["ToggleAirflowTestSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ToggleAirflowTestResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ToggleAirflowTestResult"] = ResolversParentTypes["ToggleAirflowTestResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ToggleAirflowTestSuccess" | "NotFound" | "NotSupported" | "Offline",
    ParentType,
    ContextType
  >;
}>;

export type SetAppActiveSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SetAppActiveSuccess"] = ResolversParentTypes["SetAppActiveSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SetAppActiveResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SetAppActiveResult"] = ResolversParentTypes["SetAppActiveResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "SetAppActiveSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ErrorResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Error"] = ResolversParentTypes["Error"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | "EmailInvalid"
    | "EmailTaken"
    | "FirstNameInvalid"
    | "LastNameInvalid"
    | "CountryInvalid"
    | "TokenInvalid"
    | "AccessTokenInvalid"
    | "NameInvalid"
    | "AwayModeActive"
    | "VacationModeActive"
    | "InactiveSlot"
    | "NotFound"
    | "NotSupported"
    | "Offline"
    | "LocationNameInvalid"
    | "VacationNotSupported"
    | "InvalidEmail"
    | "InvalidDate"
    | "InvalidCode",
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}>;

export type NotFoundResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["NotFound"] = ResolversParentTypes["NotFound"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type NotSupportedResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["NotSupported"] = ResolversParentTypes["NotSupported"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type OfflineResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Offline"] = ResolversParentTypes["Offline"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AirflowRangeResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["AirflowRange"] = ResolversParentTypes["AirflowRange"]
> = ResolversObject<{
  active?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  min?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  max?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type DealerResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Dealer"] = ResolversParentTypes["Dealer"]
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  website?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type FaultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Fault"] = ResolversParentTypes["Fault"]
> = ResolversObject<{
  value?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type StatusResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Status"] = ResolversParentTypes["Status"]
> = ResolversObject<{
  items?: Resolver<
    Array<ResolversTypes["StatusItem"]>,
    ParentType,
    ContextType
  >;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type StatusItemResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["StatusItem"] = ResolversParentTypes["StatusItem"]
> = ResolversObject<{
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type VacationResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Vacation"] = ResolversParentTypes["Vacation"]
> = ResolversObject<{
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  setpoints?: Resolver<ResolversTypes["Setpoints"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type VersionResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Version"] = ResolversParentTypes["Version"]
> = ResolversObject<{
  application?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  bootloader?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  outdoorControl?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type LocationResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Location"] = ResolversParentTypes["Location"]
> = ResolversObject<{
  accessLevel?: Resolver<
    ResolversTypes["AccessLevel"],
    ParentType,
    ContextType
  >;
  activeFault?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  airflow?: Resolver<
    Maybe<ResolversTypes["AirflowRange"]>,
    ParentType,
    ContextType
  >;
  brand?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  connectionStatus?: Resolver<
    ResolversTypes["ConnectionStatus"],
    ParentType,
    ContextType
  >;
  controller?: Resolver<
    Maybe<ResolversTypes["Controller"]>,
    ParentType,
    ContextType
  >;
  controllers?: Resolver<
    Array<ResolversTypes["Controller"]>,
    ParentType,
    ContextType
  >;
  dealer?: Resolver<ResolversTypes["Dealer"], ParentType, ContextType>;
  dsn?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  faultNotification?: Resolver<
    Maybe<ResolversTypes["FaultNotification"]>,
    ParentType,
    ContextType
  >;
  faults?: Resolver<Array<ResolversTypes["Fault"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  model?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  modes?: Resolver<Array<ResolversTypes["Mode"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  offlineNotification?: Resolver<
    Maybe<ResolversTypes["OfflineNotification"]>,
    ParentType,
    ContextType
  >;
  override?: Resolver<
    Maybe<ResolversTypes["Override"]>,
    ParentType,
    ContextType
  >;
  programmable?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  serviceReminder?: Resolver<
    ResolversTypes["ServiceReminder"],
    ParentType,
    ContextType
  >;
  share?: Resolver<Maybe<ResolversTypes["Share"]>, ParentType, ContextType>;
  sharer?: Resolver<Maybe<ResolversTypes["Sharer"]>, ParentType, ContextType>;
  shares?: Resolver<Array<ResolversTypes["Share"]>, ParentType, ContextType>;
  statusIndoor?: Resolver<
    Maybe<Array<ResolversTypes["Status"]>>,
    ParentType,
    ContextType
  >;
  statusIndoorEEV?: Resolver<
    Maybe<Array<ResolversTypes["Status"]>>,
    ParentType,
    ContextType
  >;
  statusOutdoor?: Resolver<
    Maybe<Array<ResolversTypes["Status"]>>,
    ParentType,
    ContextType
  >;
  statusThermostat?: Resolver<
    Maybe<Array<ResolversTypes["Status"]>>,
    ParentType,
    ContextType
  >;
  statusZone?: Resolver<
    Maybe<Array<ResolversTypes["Status"]>>,
    ParentType,
    ContextType
  >;
  vacation?: Resolver<
    Maybe<ResolversTypes["Vacation"]>,
    ParentType,
    ContextType
  >;
  version?: Resolver<ResolversTypes["Version"], ParentType, ContextType>;
  zones?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  zoning?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RenameLocationSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RenameLocationSuccess"] = ResolversParentTypes["RenameLocationSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type LocationNameInvalidResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["LocationNameInvalid"] = ResolversParentTypes["LocationNameInvalid"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RenameLocationResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RenameLocationResult"] = ResolversParentTypes["RenameLocationResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "RenameLocationSuccess" | "LocationNameInvalid" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeFanCfmSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeFanCfmSuccess"] = ResolversParentTypes["ChangeFanCfmSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeFanCfmResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeFanCfmResult"] = ResolversParentTypes["ChangeFanCfmResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeFanCfmSuccess" | "NotFound" | "NotSupported",
    ParentType,
    ContextType
  >;
}>;

export type ChangeLocationAwaySuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeLocationAwaySuccess"] = ResolversParentTypes["ChangeLocationAwaySuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeLocationAwayResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeLocationAwayResult"] = ResolversParentTypes["ChangeLocationAwayResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeLocationAwaySuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type RegisterLocationSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RegisterLocationSuccess"] = ResolversParentTypes["RegisterLocationSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RegisterLocationResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RegisterLocationResult"] = ResolversParentTypes["RegisterLocationResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "RegisterLocationSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeDealerSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeDealerSuccess"] = ResolversParentTypes["ChangeDealerSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeDealerResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeDealerResult"] = ResolversParentTypes["ChangeDealerResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeDealerSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeProgrammableSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeProgrammableSuccess"] = ResolversParentTypes["ChangeProgrammableSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeProgrammableResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeProgrammableResult"] = ResolversParentTypes["ChangeProgrammableResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeProgrammableSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeVacationSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeVacationSuccess"] = ResolversParentTypes["ChangeVacationSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type VacationNotSupportedResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["VacationNotSupported"] = ResolversParentTypes["VacationNotSupported"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeVacationResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeVacationResult"] = ResolversParentTypes["ChangeVacationResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeVacationSuccess" | "VacationNotSupported" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ChangeVacationSetpointsSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeVacationSetpointsSuccess"] = ResolversParentTypes["ChangeVacationSetpointsSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeVacationSetpointsResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeVacationSetpointsResult"] = ResolversParentTypes["ChangeVacationSetpointsResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeVacationSetpointsSuccess" | "VacationNotSupported" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type RefreshStatusSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RefreshStatusSuccess"] = ResolversParentTypes["RefreshStatusSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RefreshStatusResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RefreshStatusResult"] = ResolversParentTypes["RefreshStatusResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "RefreshStatusSuccess" | "NotFound" | "Offline",
    ParentType,
    ContextType
  >;
}>;

export type RemoveLocationSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RemoveLocationSuccess"] = ResolversParentTypes["RemoveLocationSuccess"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RemoveLocationResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RemoveLocationResult"] = ResolversParentTypes["RemoveLocationResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "RemoveLocationSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ResetLogsSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ResetLogsSuccess"] = ResolversParentTypes["ResetLogsSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ResetLogsResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ResetLogsResult"] = ResolversParentTypes["ResetLogsResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ResetLogsSuccess" | "NotFound" | "NotSupported",
    ParentType,
    ContextType
  >;
}>;

export type NotificationResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Notification"] = ResolversParentTypes["Notification"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | "FaultNotification"
    | "FilterNotification"
    | "HumidityNotification"
    | "OfflineNotification"
    | "ServiceReminder"
    | "TemperatureNotification",
    ParentType,
    ContextType
  >;
  enabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
}>;

export type FaultNotificationResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["FaultNotification"] = ResolversParentTypes["FaultNotification"]
> = ResolversObject<{
  enabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type FilterNotificationResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["FilterNotification"] = ResolversParentTypes["FilterNotification"]
> = ResolversObject<{
  enabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type HumidityNotificationResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["HumidityNotification"] = ResolversParentTypes["HumidityNotification"]
> = ResolversObject<{
  enabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  min?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  max?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type OfflineNotificationResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["OfflineNotification"] = ResolversParentTypes["OfflineNotification"]
> = ResolversObject<{
  enabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ServiceReminderDateResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ServiceReminderDate"] = ResolversParentTypes["ServiceReminderDate"]
> = ResolversObject<{
  day?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  month?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ServiceReminderResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ServiceReminder"] = ResolversParentTypes["ServiceReminder"]
> = ResolversObject<{
  enabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  spring?: Resolver<
    Maybe<ResolversTypes["ServiceReminderDate"]>,
    ParentType,
    ContextType
  >;
  fall?: Resolver<
    Maybe<ResolversTypes["ServiceReminderDate"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type TemperatureNotificationResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["TemperatureNotification"] = ResolversParentTypes["TemperatureNotification"]
> = ResolversObject<{
  enabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  min?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  max?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type PushTokenResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["PushToken"] = ResolversParentTypes["PushToken"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  platform?: Resolver<ResolversTypes["Platform"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["PushTokenStatus"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  accountType?: Resolver<
    ResolversTypes["AccountType"],
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  pushTokens?: Resolver<
    Array<ResolversTypes["PushToken"]>,
    ParentType,
    ContextType
  >;
  temperatureUnit?: Resolver<
    ResolversTypes["TemperatureUnit"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SubscribeToNotificationsSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SubscribeToNotificationsSuccess"] = ResolversParentTypes["SubscribeToNotificationsSuccess"]
> = ResolversObject<{
  pushToken?: Resolver<ResolversTypes["PushToken"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SubscribeToNotificationsResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["SubscribeToNotificationsResult"] = ResolversParentTypes["SubscribeToNotificationsResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "SubscribeToNotificationsSuccess",
    ParentType,
    ContextType
  >;
}>;

export type UnsubscribeFromNotificationsSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["UnsubscribeFromNotificationsSuccess"] = ResolversParentTypes["UnsubscribeFromNotificationsSuccess"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UnsubscribeFromNotificationsResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["UnsubscribeFromNotificationsResult"] = ResolversParentTypes["UnsubscribeFromNotificationsResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "UnsubscribeFromNotificationsSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ToggleFaultNotificationSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ToggleFaultNotificationSuccess"] = ResolversParentTypes["ToggleFaultNotificationSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ToggleFaultNotificationResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ToggleFaultNotificationResult"] = ResolversParentTypes["ToggleFaultNotificationResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ToggleFaultNotificationSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ToggleHumidityNotificationSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ToggleHumidityNotificationSuccess"] = ResolversParentTypes["ToggleHumidityNotificationSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ToggleHumidityNotificationResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ToggleHumidityNotificationResult"] = ResolversParentTypes["ToggleHumidityNotificationResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ToggleHumidityNotificationSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type AdjustHumidityNotificationThresholdSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["AdjustHumidityNotificationThresholdSuccess"] = ResolversParentTypes["AdjustHumidityNotificationThresholdSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AdjustHumidityNotificationThresholdResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["AdjustHumidityNotificationThresholdResult"] = ResolversParentTypes["AdjustHumidityNotificationThresholdResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "AdjustHumidityNotificationThresholdSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ToggleServiceReminderSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ToggleServiceReminderSuccess"] = ResolversParentTypes["ToggleServiceReminderSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ToggleServiceReminderResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ToggleServiceReminderResult"] = ResolversParentTypes["ToggleServiceReminderResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ToggleServiceReminderSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type AdjustServiceReminderDatesSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["AdjustServiceReminderDatesSuccess"] = ResolversParentTypes["AdjustServiceReminderDatesSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AdjustServiceReminderDatesResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["AdjustServiceReminderDatesResult"] = ResolversParentTypes["AdjustServiceReminderDatesResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "AdjustServiceReminderDatesSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ToggleTemperatureNotificationSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ToggleTemperatureNotificationSuccess"] = ResolversParentTypes["ToggleTemperatureNotificationSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ToggleTemperatureNotificationResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ToggleTemperatureNotificationResult"] = ResolversParentTypes["ToggleTemperatureNotificationResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ToggleTemperatureNotificationSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type AdjustTemperatureNotificationThresholdSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["AdjustTemperatureNotificationThresholdSuccess"] = ResolversParentTypes["AdjustTemperatureNotificationThresholdSuccess"]
> = ResolversObject<{
  controller?: Resolver<ResolversTypes["Controller"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AdjustTemperatureNotificationThresholdResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["AdjustTemperatureNotificationThresholdResult"] = ResolversParentTypes["AdjustTemperatureNotificationThresholdResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "AdjustTemperatureNotificationThresholdSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type ShareResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Share"] = ResolversParentTypes["Share"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  accessLevel?: Resolver<
    ResolversTypes["ShareAccessLevel"],
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  expiresAt?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SharerResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Sharer"] = ResolversParentTypes["Sharer"]
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ShareLocationSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ShareLocationSuccess"] = ResolversParentTypes["ShareLocationSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type InvalidEmailResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["InvalidEmail"] = ResolversParentTypes["InvalidEmail"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type InvalidDateResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["InvalidDate"] = ResolversParentTypes["InvalidDate"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ShareLocationResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ShareLocationResult"] = ResolversParentTypes["ShareLocationResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ShareLocationSuccess" | "InvalidDate" | "InvalidEmail" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type RevokeShareSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RevokeShareSuccess"] = ResolversParentTypes["RevokeShareSuccess"]
> = ResolversObject<{
  location?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RevokeShareResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RevokeShareResult"] = ResolversParentTypes["RevokeShareResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "RevokeShareSuccess" | "NotFound",
    ParentType,
    ContextType
  >;
}>;

export type RequestShareSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RequestShareSuccess"] = ResolversParentTypes["RequestShareSuccess"]
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RequestShareResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["RequestShareResult"] = ResolversParentTypes["RequestShareResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "RequestShareSuccess" | "InvalidEmail",
    ParentType,
    ContextType
  >;
}>;

export type ChangeTemperatureUnitSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeTemperatureUnitSuccess"] = ResolversParentTypes["ChangeTemperatureUnitSuccess"]
> = ResolversObject<{
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ChangeTemperatureUnitResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ChangeTemperatureUnitResult"] = ResolversParentTypes["ChangeTemperatureUnitResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ChangeTemperatureUnitSuccess",
    ParentType,
    ContextType
  >;
}>;

export type ConvertToHomeownerAccountSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ConvertToHomeownerAccountSuccess"] = ResolversParentTypes["ConvertToHomeownerAccountSuccess"]
> = ResolversObject<{
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ConvertToHomeownerAccountResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ConvertToHomeownerAccountResult"] = ResolversParentTypes["ConvertToHomeownerAccountResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ConvertToHomeownerAccountSuccess",
    ParentType,
    ContextType
  >;
}>;

export type InvalidCodeResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["InvalidCode"] = ResolversParentTypes["InvalidCode"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ConvertToProAccountSuccessResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ConvertToProAccountSuccess"] = ResolversParentTypes["ConvertToProAccountSuccess"]
> = ResolversObject<{
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ConvertToProAccountResultResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ConvertToProAccountResult"] = ResolversParentTypes["ConvertToProAccountResult"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "ConvertToProAccountSuccess" | "InvalidCode",
    ParentType,
    ContextType
  >;
}>;

export type Resolvers<ContextType = AppContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  RequestSurveySessionResult?: RequestSurveySessionResultResolvers<ContextType>;
  CheckEmailResult?: CheckEmailResultResolvers<ContextType>;
  SendTokenSuccess?: SendTokenSuccessResolvers<ContextType>;
  SendTokenResult?: SendTokenResultResolvers;
  SignUpSuccess?: SignUpSuccessResolvers<ContextType>;
  EmailInvalid?: EmailInvalidResolvers<ContextType>;
  EmailTaken?: EmailTakenResolvers<ContextType>;
  FirstNameInvalid?: FirstNameInvalidResolvers<ContextType>;
  LastNameInvalid?: LastNameInvalidResolvers<ContextType>;
  CountryInvalid?: CountryInvalidResolvers<ContextType>;
  SignUpResult?: SignUpResultResolvers;
  SignInSuccess?: SignInSuccessResolvers<ContextType>;
  TokenInvalid?: TokenInvalidResolvers<ContextType>;
  SignInResult?: SignInResultResolvers;
  RefreshTokenSuccess?: RefreshTokenSuccessResolvers<ContextType>;
  RefreshTokenResult?: RefreshTokenResultResolvers;
  AccessTokenInvalid?: AccessTokenInvalidResolvers<ContextType>;
  SignOutSuccess?: SignOutSuccessResolvers<ContextType>;
  SignOutResult?: SignOutResultResolvers;
  GenerateLoginTokenSuccess?: GenerateLoginTokenSuccessResolvers<ContextType>;
  GenerateLoginTokenResult?: GenerateLoginTokenResultResolvers;
  GenerateShareTokenSuccess?: GenerateShareTokenSuccessResolvers<ContextType>;
  GenerateShareTokenResult?: GenerateShareTokenResultResolvers;
  RemoveAccountSuccess?: RemoveAccountSuccessResolvers<ContextType>;
  RemoveAccountResult?: RemoveAccountResultResolvers;
  Setpoints?: SetpointsResolvers<ContextType>;
  Away?: AwayResolvers<ContextType>;
  Fan?: FanResolvers<ContextType>;
  ScheduleTime?: ScheduleTimeResolvers<ContextType>;
  ScheduleEvent?: ScheduleEventResolvers<ContextType>;
  Schedule?: ScheduleResolvers<ContextType>;
  SetpointRange?: SetpointRangeResolvers<ContextType>;
  Humidification?: HumidificationResolvers<ContextType>;
  ZoneVersion?: ZoneVersionResolvers<ContextType>;
  ZoneSensor?: ZoneSensorResolvers<ContextType>;
  Controller?: ControllerResolvers<ContextType>;
  RenameControllerSuccess?: RenameControllerSuccessResolvers<ContextType>;
  NameInvalid?: NameInvalidResolvers<ContextType>;
  RenameControllerResult?: RenameControllerResultResolvers;
  ChangeSetpointSuccess?: ChangeSetpointSuccessResolvers<ContextType>;
  AwayModeActive?: AwayModeActiveResolvers<ContextType>;
  VacationModeActive?: VacationModeActiveResolvers<ContextType>;
  ChangeSetpointResult?: ChangeSetpointResultResolvers;
  ChangeModeSuccess?: ChangeModeSuccessResolvers<ContextType>;
  ChangeModeResult?: ChangeModeResultResolvers;
  ChangeAwaySuccess?: ChangeAwaySuccessResolvers<ContextType>;
  ChangeAwayResult?: ChangeAwayResultResolvers;
  ChangeAwaySetpointsSuccess?: ChangeAwaySetpointsSuccessResolvers<ContextType>;
  ChangeAwaySetpointsResult?: ChangeAwaySetpointsResultResolvers;
  ChangeFanModeSuccess?: ChangeFanModeSuccessResolvers<ContextType>;
  ChangeFanModeResult?: ChangeFanModeResultResolvers;
  CancelTemperatureHoldSuccess?: CancelTemperatureHoldSuccessResolvers<
    ContextType
  >;
  CancelTemperatureHoldResult?: CancelTemperatureHoldResultResolvers;
  CancelFanHoldSuccess?: CancelFanHoldSuccessResolvers<ContextType>;
  CancelFanHoldResult?: CancelFanHoldResultResolvers;
  ChangeScheduleSuccess?: ChangeScheduleSuccessResolvers<ContextType>;
  InactiveSlot?: InactiveSlotResolvers<ContextType>;
  ChangeScheduleResult?: ChangeScheduleResultResolvers;
  CopyScheduleSuccess?: CopyScheduleSuccessResolvers<ContextType>;
  CopyScheduleResult?: CopyScheduleResultResolvers;
  AddLeaveArriveSuccess?: AddLeaveArriveSuccessResolvers<ContextType>;
  AddLeaveArriveResult?: AddLeaveArriveResultResolvers;
  RemoveLeaveArriveSuccess?: RemoveLeaveArriveSuccessResolvers<ContextType>;
  RemoveLeaveArriveResult?: RemoveLeaveArriveResultResolvers;
  RestoreDefaultScheduleSuccess?: RestoreDefaultScheduleSuccessResolvers<
    ContextType
  >;
  RestoreDefaultScheduleResult?: RestoreDefaultScheduleResultResolvers;
  ChangeHumidificationModeSuccess?: ChangeHumidificationModeSuccessResolvers<
    ContextType
  >;
  ChangeHumidificationModeResult?: ChangeHumidificationModeResultResolvers;
  ChangeHumidificationSuccess?: ChangeHumidificationSuccessResolvers<
    ContextType
  >;
  ChangeHumidificationResult?: ChangeHumidificationResultResolvers;
  ChangeScheduleOverrideSuccess?: ChangeScheduleOverrideSuccessResolvers<
    ContextType
  >;
  ChangeScheduleOverrideResult?: ChangeScheduleOverrideResultResolvers;
  ChangeAirflowSuccess?: ChangeAirflowSuccessResolvers<ContextType>;
  ChangeAirflowResult?: ChangeAirflowResultResolvers;
  ToggleAirflowTestSuccess?: ToggleAirflowTestSuccessResolvers<ContextType>;
  ToggleAirflowTestResult?: ToggleAirflowTestResultResolvers;
  SetAppActiveSuccess?: SetAppActiveSuccessResolvers<ContextType>;
  SetAppActiveResult?: SetAppActiveResultResolvers;
  Error?: ErrorResolvers;
  NotFound?: NotFoundResolvers<ContextType>;
  NotSupported?: NotSupportedResolvers<ContextType>;
  Offline?: OfflineResolvers<ContextType>;
  AirflowRange?: AirflowRangeResolvers<ContextType>;
  Dealer?: DealerResolvers<ContextType>;
  Fault?: FaultResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
  StatusItem?: StatusItemResolvers<ContextType>;
  Vacation?: VacationResolvers<ContextType>;
  Version?: VersionResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  RenameLocationSuccess?: RenameLocationSuccessResolvers<ContextType>;
  LocationNameInvalid?: LocationNameInvalidResolvers<ContextType>;
  RenameLocationResult?: RenameLocationResultResolvers;
  ChangeFanCfmSuccess?: ChangeFanCfmSuccessResolvers<ContextType>;
  ChangeFanCfmResult?: ChangeFanCfmResultResolvers;
  ChangeLocationAwaySuccess?: ChangeLocationAwaySuccessResolvers<ContextType>;
  ChangeLocationAwayResult?: ChangeLocationAwayResultResolvers;
  RegisterLocationSuccess?: RegisterLocationSuccessResolvers<ContextType>;
  RegisterLocationResult?: RegisterLocationResultResolvers;
  ChangeDealerSuccess?: ChangeDealerSuccessResolvers<ContextType>;
  ChangeDealerResult?: ChangeDealerResultResolvers;
  ChangeProgrammableSuccess?: ChangeProgrammableSuccessResolvers<ContextType>;
  ChangeProgrammableResult?: ChangeProgrammableResultResolvers;
  ChangeVacationSuccess?: ChangeVacationSuccessResolvers<ContextType>;
  VacationNotSupported?: VacationNotSupportedResolvers<ContextType>;
  ChangeVacationResult?: ChangeVacationResultResolvers;
  ChangeVacationSetpointsSuccess?: ChangeVacationSetpointsSuccessResolvers<
    ContextType
  >;
  ChangeVacationSetpointsResult?: ChangeVacationSetpointsResultResolvers;
  RefreshStatusSuccess?: RefreshStatusSuccessResolvers<ContextType>;
  RefreshStatusResult?: RefreshStatusResultResolvers;
  RemoveLocationSuccess?: RemoveLocationSuccessResolvers<ContextType>;
  RemoveLocationResult?: RemoveLocationResultResolvers;
  ResetLogsSuccess?: ResetLogsSuccessResolvers<ContextType>;
  ResetLogsResult?: ResetLogsResultResolvers;
  Notification?: NotificationResolvers;
  FaultNotification?: FaultNotificationResolvers<ContextType>;
  FilterNotification?: FilterNotificationResolvers<ContextType>;
  HumidityNotification?: HumidityNotificationResolvers<ContextType>;
  OfflineNotification?: OfflineNotificationResolvers<ContextType>;
  ServiceReminderDate?: ServiceReminderDateResolvers<ContextType>;
  ServiceReminder?: ServiceReminderResolvers<ContextType>;
  TemperatureNotification?: TemperatureNotificationResolvers<ContextType>;
  PushToken?: PushTokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  SubscribeToNotificationsSuccess?: SubscribeToNotificationsSuccessResolvers<
    ContextType
  >;
  SubscribeToNotificationsResult?: SubscribeToNotificationsResultResolvers;
  UnsubscribeFromNotificationsSuccess?: UnsubscribeFromNotificationsSuccessResolvers<
    ContextType
  >;
  UnsubscribeFromNotificationsResult?: UnsubscribeFromNotificationsResultResolvers;
  ToggleFaultNotificationSuccess?: ToggleFaultNotificationSuccessResolvers<
    ContextType
  >;
  ToggleFaultNotificationResult?: ToggleFaultNotificationResultResolvers;
  ToggleHumidityNotificationSuccess?: ToggleHumidityNotificationSuccessResolvers<
    ContextType
  >;
  ToggleHumidityNotificationResult?: ToggleHumidityNotificationResultResolvers;
  AdjustHumidityNotificationThresholdSuccess?: AdjustHumidityNotificationThresholdSuccessResolvers<
    ContextType
  >;
  AdjustHumidityNotificationThresholdResult?: AdjustHumidityNotificationThresholdResultResolvers;
  ToggleServiceReminderSuccess?: ToggleServiceReminderSuccessResolvers<
    ContextType
  >;
  ToggleServiceReminderResult?: ToggleServiceReminderResultResolvers;
  AdjustServiceReminderDatesSuccess?: AdjustServiceReminderDatesSuccessResolvers<
    ContextType
  >;
  AdjustServiceReminderDatesResult?: AdjustServiceReminderDatesResultResolvers;
  ToggleTemperatureNotificationSuccess?: ToggleTemperatureNotificationSuccessResolvers<
    ContextType
  >;
  ToggleTemperatureNotificationResult?: ToggleTemperatureNotificationResultResolvers;
  AdjustTemperatureNotificationThresholdSuccess?: AdjustTemperatureNotificationThresholdSuccessResolvers<
    ContextType
  >;
  AdjustTemperatureNotificationThresholdResult?: AdjustTemperatureNotificationThresholdResultResolvers;
  Share?: ShareResolvers<ContextType>;
  Sharer?: SharerResolvers<ContextType>;
  ShareLocationSuccess?: ShareLocationSuccessResolvers<ContextType>;
  InvalidEmail?: InvalidEmailResolvers<ContextType>;
  InvalidDate?: InvalidDateResolvers<ContextType>;
  ShareLocationResult?: ShareLocationResultResolvers;
  RevokeShareSuccess?: RevokeShareSuccessResolvers<ContextType>;
  RevokeShareResult?: RevokeShareResultResolvers;
  RequestShareSuccess?: RequestShareSuccessResolvers<ContextType>;
  RequestShareResult?: RequestShareResultResolvers;
  ChangeTemperatureUnitSuccess?: ChangeTemperatureUnitSuccessResolvers<
    ContextType
  >;
  ChangeTemperatureUnitResult?: ChangeTemperatureUnitResultResolvers;
  ConvertToHomeownerAccountSuccess?: ConvertToHomeownerAccountSuccessResolvers<
    ContextType
  >;
  ConvertToHomeownerAccountResult?: ConvertToHomeownerAccountResultResolvers;
  InvalidCode?: InvalidCodeResolvers<ContextType>;
  ConvertToProAccountSuccess?: ConvertToProAccountSuccessResolvers<ContextType>;
  ConvertToProAccountResult?: ConvertToProAccountResultResolvers;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = AppContext> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = AppContext> = ResolversObject<{
  access?: AccessDirectiveResolver<any, any, ContextType>;
}>;

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = AppContext> = DirectiveResolvers<
  ContextType
>;
