import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
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
  _: Maybe<Scalars["Boolean"]>;
  controller: Maybe<Controller>;
  controllers: Array<Controller>;
  location: Maybe<Location>;
  locations: Array<Location>;
  me: Maybe<User>;
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
  input: Maybe<RequestRatingInput>;
};

export type QueryRequestSurveyFeedbackArgs = {
  input: RequestSurveyFeedbackInput;
};

export type QueryUpdateRequiredArgs = {
  input: UpdateRequiredInput;
};

export type Mutation = {
  _: Maybe<Scalars["Boolean"]>;
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
  userId: Scalars["String"];
  userName: Scalars["String"];
  sessionToken: Scalars["String"];
  sessionExpiresAt: Scalars["String"];
};

export type RequestRatingInput = {
  build: Scalars["String"];
  installedAt: Scalars["String"];
  lastDisplayedAt: Maybe<Scalars["String"]>;
  platform: Platform;
  version: Scalars["String"];
};

export type RequestSurveyFeedbackInput = {
  build: Scalars["String"];
  installedAt: Scalars["String"];
  lastDisplayedAt: Maybe<Scalars["String"]>;
  lastResponseAt: Maybe<Scalars["String"]>;
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
  available: Scalars["Boolean"];
};

export type SendTokenInput = {
  email: Scalars["String"];
  skipDeepLink: Maybe<Scalars["Boolean"]>;
};

export enum AccountStatus {
  Confirmed = "CONFIRMED",
  Unconfirmed = "UNCONFIRMED",
}

export type SendTokenSuccess = {
  accountStatus: Maybe<AccountStatus>;
};

export type SendTokenResult = SendTokenSuccess | NotFound;

export type SignUpInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  country: Scalars["String"];
};

export type SignUpSuccess = {
  _: Maybe<Scalars["Boolean"]>;
};

export type EmailInvalid = Error & {
  message: Scalars["String"];
};

export type EmailTaken = Error & {
  message: Scalars["String"];
};

export type FirstNameInvalid = Error & {
  message: Scalars["String"];
};

export type LastNameInvalid = Error & {
  message: Scalars["String"];
};

export type CountryInvalid = Error & {
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
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
  ttl: Scalars["Int"];
  user: User;
};

export type TokenInvalid = Error & {
  message: Scalars["String"];
};

export type SignInResult = SignInSuccess | TokenInvalid | EmailInvalid;

export type RefreshTokenInput = {
  token: Scalars["String"];
};

export type RefreshTokenSuccess = {
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
  ttl: Scalars["Int"];
};

export type RefreshTokenResult = RefreshTokenSuccess | TokenInvalid;

export type SignOutInput = {
  token: Scalars["String"];
};

export type AccessTokenInvalid = Error & {
  message: Scalars["String"];
};

export type SignOutSuccess = {
  _: Maybe<Scalars["Boolean"]>;
};

export type SignOutResult = SignOutSuccess | AccessTokenInvalid;

export type GenerateLoginTokenSuccess = {
  token: Scalars["String"];
};

export type GenerateLoginTokenResult = GenerateLoginTokenSuccess;

export type GenerateShareTokenSuccess = {
  token: Scalars["String"];
};

export type GenerateShareTokenResult = GenerateShareTokenSuccess;

export type RemoveAccountInput = {
  token: Scalars["String"];
};

export type RemoveAccountSuccess = {
  _: Maybe<Scalars["Boolean"]>;
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
  heat: Scalars["Int"];
  cool: Scalars["Int"];
};

export type Away = {
  active: Scalars["Boolean"];
  setpoints: Setpoints;
};

export type Fan = {
  active: Scalars["Boolean"];
  cfm: Maybe<Scalars["Float"]>;
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
  day: Day;
  hour: Scalars["Int"];
  minute: Scalars["Int"];
};

export type ScheduleEvent = {
  day: Day;
  fanMode: FanMode;
  setpoints: Setpoints;
  slot: ScheduleSlot;
  start: ScheduleTime;
  stop: ScheduleTime;
};

export type Schedule = {
  day: Day;
  awake: ScheduleEvent;
  leave: Maybe<ScheduleEvent>;
  arrive: Maybe<ScheduleEvent>;
  bed: ScheduleEvent;
  events: Array<ScheduleEvent>;
};

export type SetpointRange = {
  min: Scalars["Int"];
  max: Scalars["Int"];
};

export enum HumidificationMode {
  Auto = "AUTO",
  Manual = "MANUAL",
}

export type Humidification = {
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
  primaryZoneControl: Maybe<Scalars["String"]>;
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
  sensor: Sensor;
  version: Scalars["String"];
};

export enum Demand {
  Cool = "COOL",
  Heat = "HEAT",
}

export type Controller = {
  accessLevel: AccessLevel;
  activeDemand: Maybe<Demand>;
  activeScheduleEvent: Maybe<ScheduleEvent>;
  airflow: Maybe<Scalars["Int"]>;
  airflowTestActive: Maybe<Scalars["Boolean"]>;
  away: Maybe<Away>;
  coolRange: SetpointRange;
  deadband: Scalars["Int"];
  dehumidification: Maybe<Humidification>;
  disabled: Scalars["Boolean"];
  fan: Maybe<Fan>;
  heatRange: SetpointRange;
  humidification: Maybe<Humidification>;
  humidity: Maybe<Scalars["Float"]>;
  humidityNotification: Maybe<HumidityNotification>;
  id: Scalars["String"];
  indoorTemp: Maybe<Scalars["Int"]>;
  location: Location;
  mode: Maybe<Mode>;
  modes: Array<Mode>;
  name: Scalars["String"];
  outdoorTemp: Maybe<Scalars["Int"]>;
  schedule: Maybe<Array<Schedule>>;
  scheduleOverride: ScheduleOverride;
  setpoints: Maybe<Setpoints>;
  tempOverride: Maybe<Scalars["Boolean"]>;
  temperatureNotification: Maybe<TemperatureNotification>;
  zone: Maybe<Scalars["String"]>;
  zoneSensor: Maybe<ZoneSensor>;
  zoning: Scalars["Boolean"];
};

export type RenameControllerInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type RenameControllerSuccess = {
  controller: Controller;
};

export type NameInvalid = Error & {
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
  controller: Controller;
};

export type AwayModeActive = Error & {
  message: Scalars["String"];
};

export type VacationModeActive = Error & {
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
  controller: Controller;
};

export type ChangeModeResult = ChangeModeSuccess | NotFound;

export type ChangeAwayInput = {
  id: Scalars["ID"];
  active: Scalars["Boolean"];
};

export type ChangeAwaySuccess = {
  controller: Controller;
};

export type ChangeAwayResult = ChangeAwaySuccess | NotFound;

export type ChangeAwaySetpointsInput = {
  id: Scalars["ID"];
  heat: Scalars["Int"];
  cool: Scalars["Int"];
};

export type ChangeAwaySetpointsSuccess = {
  controller: Controller;
};

export type ChangeAwaySetpointsResult = ChangeAwaySetpointsSuccess | NotFound;

export type ChangeFanModeInput = {
  id: Scalars["ID"];
  mode: FanMode;
};

export type ChangeFanModeSuccess = {
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
  controller: Controller;
};

export type CancelTemperatureHoldResult =
  | CancelTemperatureHoldSuccess
  | NotFound;

export type CancelFanHoldInput = {
  id: Scalars["ID"];
};

export type CancelFanHoldSuccess = {
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
  controller: Controller;
};

export type InactiveSlot = Error & {
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
  controller: Controller;
};

export type AddLeaveArriveResult = AddLeaveArriveSuccess | NotFound;

export type RemoveLeaveArriveInput = {
  id: Scalars["ID"];
  day: Day;
};

export type RemoveLeaveArriveSuccess = {
  controller: Controller;
};

export type RemoveLeaveArriveResult = RemoveLeaveArriveSuccess | NotFound;

export type RestoreDefaultScheduleInput = {
  id: Scalars["ID"];
  days: Array<Day>;
};

export type RestoreDefaultScheduleSuccess = {
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
  controller: Controller;
};

export type SetAppActiveResult = SetAppActiveSuccess | NotFound;

export type Error = {
  message: Scalars["String"];
};

export type NotFound = Error & {
  message: Scalars["String"];
};

export type NotSupported = Error & {
  message: Scalars["String"];
};

export type Offline = Error & {
  message: Scalars["String"];
};

export type AirflowRange = {
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
  email: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
  website: Scalars["String"];
};

export type Fault = {
  value: Scalars["String"];
  createdAt: Scalars["String"];
};

export enum Override {
  Away = "AWAY",
  Vacation = "VACATION",
}

export type Status = {
  items: Array<StatusItem>;
  label: Maybe<Scalars["String"]>;
  updatedAt: Scalars["String"];
};

export type StatusItem = {
  label: Scalars["String"];
  value: Maybe<Scalars["String"]>;
};

export type Vacation = {
  active: Scalars["Boolean"];
  setpoints: Setpoints;
};

export type Version = {
  application: Scalars["String"];
  bootloader: Scalars["String"];
  outdoorControl: Scalars["String"];
};

export type Location = {
  accessLevel: AccessLevel;
  activeFault: Maybe<Scalars["String"]>;
  airflow: Maybe<AirflowRange>;
  brand: Scalars["String"];
  connectionStatus: ConnectionStatus;
  controller: Maybe<Controller>;
  controllers: Array<Controller>;
  dealer: Dealer;
  dsn: Scalars["String"];
  faultNotification: Maybe<FaultNotification>;
  faults: Array<Fault>;
  id: Scalars["ID"];
  lat: Maybe<Scalars["Float"]>;
  lng: Maybe<Scalars["Float"]>;
  model: Scalars["String"];
  modes: Array<Mode>;
  name: Scalars["String"];
  offlineNotification: Maybe<OfflineNotification>;
  override: Maybe<Override>;
  programmable: Maybe<Scalars["Boolean"]>;
  serviceReminder: ServiceReminder;
  share: Maybe<Share>;
  sharer: Maybe<Sharer>;
  shares: Array<Share>;
  statusIndoor: Maybe<Array<Status>>;
  /** @deprecated Field no longer supported */
  statusIndoorEEV: Maybe<Array<Status>>;
  statusOutdoor: Maybe<Array<Status>>;
  /** @deprecated Field no longer supported */
  statusThermostat: Maybe<Array<Status>>;
  statusZone: Maybe<Array<Status>>;
  vacation: Maybe<Vacation>;
  version: Version;
  zones: Maybe<Scalars["Int"]>;
  zoning: Scalars["Boolean"];
};

export type RenameLocationInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type RenameLocationSuccess = {
  location: Location;
};

export type LocationNameInvalid = Error & {
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
  location: Location;
};

export type ChangeFanCfmResult = ChangeFanCfmSuccess | NotFound | NotSupported;

export type ChangeLocationAwayInput = {
  id: Scalars["ID"];
  active: Scalars["Boolean"];
};

export type ChangeLocationAwaySuccess = {
  location: Location;
};

export type ChangeLocationAwayResult = ChangeLocationAwaySuccess | NotFound;

export type RegisterLocationInput = {
  dsn: Scalars["String"];
  setupToken: Scalars["String"];
};

export type RegisterLocationSuccess = {
  location: Location;
};

export type RegisterLocationResult = RegisterLocationSuccess | NotFound;

export type ChangeDealerInput = {
  id: Scalars["ID"];
  email: Maybe<Scalars["String"]>;
  name: Maybe<Scalars["String"]>;
  phone: Maybe<Scalars["String"]>;
  website: Maybe<Scalars["String"]>;
};

export type ChangeDealerSuccess = {
  location: Location;
};

export type ChangeDealerResult = ChangeDealerSuccess | NotFound;

export type ChangeProgrammableInput = {
  id: Scalars["ID"];
  programmable: Scalars["Boolean"];
};

export type ChangeProgrammableSuccess = {
  location: Location;
};

export type ChangeProgrammableResult = ChangeProgrammableSuccess | NotFound;

export type ChangeVacationInput = {
  id: Scalars["ID"];
  active: Scalars["Boolean"];
};

export type ChangeVacationSuccess = {
  location: Location;
};

export type VacationNotSupported = Error & {
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
  section: Maybe<StatusSection>;
};

export type RefreshStatusSuccess = {
  location: Location;
};

export type RefreshStatusResult = RefreshStatusSuccess | NotFound | Offline;

export type RemoveLocationInput = {
  id: Scalars["ID"];
};

export type RemoveLocationSuccess = {
  _: Maybe<Scalars["Boolean"]>;
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
  location: Location;
};

export type ResetLogsResult = ResetLogsSuccess | NotFound | NotSupported;

export type Notification = {
  enabled: Scalars["Boolean"];
};

export type FaultNotification = Notification & {
  enabled: Scalars["Boolean"];
};

export type FilterNotification = Notification & {
  enabled: Scalars["Boolean"];
};

export type HumidityNotification = Notification & {
  enabled: Scalars["Boolean"];
  min: Scalars["Float"];
  max: Scalars["Float"];
};

export type OfflineNotification = Notification & {
  enabled: Scalars["Boolean"];
};

export type ServiceReminderDate = {
  day: Scalars["Int"];
  month: Scalars["Int"];
};

export type ServiceReminder = Notification & {
  enabled: Scalars["Boolean"];
  spring: Maybe<ServiceReminderDate>;
  fall: Maybe<ServiceReminderDate>;
};

export type TemperatureNotification = Notification & {
  enabled: Scalars["Boolean"];
  min: Scalars["Int"];
  max: Scalars["Int"];
};

export enum PushTokenStatus {
  Enabled = "ENABLED",
  Disabled = "DISABLED",
}

export type PushToken = {
  id: Scalars["ID"];
  platform: Platform;
  status: PushTokenStatus;
  token: Scalars["String"];
};

export type User = {
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
  pushToken: PushToken;
};

export type SubscribeToNotificationsResult = SubscribeToNotificationsSuccess;

export type UnsubscribeFromNotificationsInput = {
  id: Scalars["ID"];
};

export type UnsubscribeFromNotificationsSuccess = {
  _: Maybe<Scalars["Boolean"]>;
};

export type UnsubscribeFromNotificationsResult =
  | UnsubscribeFromNotificationsSuccess
  | NotFound;

export type ToggleFaultNotificationInput = {
  id: Scalars["ID"];
  enabled: Scalars["Boolean"];
};

export type ToggleFaultNotificationSuccess = {
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
  spring: Maybe<AdjustServiceReminderDateInput>;
  fall: Maybe<AdjustServiceReminderDateInput>;
};

export type AdjustServiceReminderDatesSuccess = {
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
  id: Scalars["ID"];
  accessLevel: ShareAccessLevel;
  email: Scalars["String"];
  expiresAt: Maybe<Scalars["String"]>;
};

export type Sharer = {
  email: Scalars["String"];
  name: Scalars["String"];
};

export type ShareLocationInput = {
  id: Scalars["ID"];
  accessLevel: ShareAccessLevel;
  email: Scalars["String"];
  expiresAt: Maybe<Scalars["String"]>;
};

export type ShareLocationSuccess = {
  location: Location;
};

export type InvalidEmail = Error & {
  message: Scalars["String"];
};

export type InvalidDate = Error & {
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
  location: Location;
};

export type RevokeShareResult = RevokeShareSuccess | NotFound;

export type RequestShareInput = {
  accessLevel: ShareAccessLevel;
  email: Scalars["String"];
  duration: Maybe<Scalars["Int"]>;
};

export type RequestShareSuccess = {
  _: Maybe<Scalars["Boolean"]>;
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
  user: User;
};

export type ChangeTemperatureUnitResult = ChangeTemperatureUnitSuccess;

export type ConvertToHomeownerAccountSuccess = {
  user: User;
};

export type ConvertToHomeownerAccountResult = ConvertToHomeownerAccountSuccess;

export type ConvertToProAccountInput = {
  code: Scalars["String"];
};

export type InvalidCode = Error & {
  message: Scalars["String"];
};

export type ConvertToProAccountSuccess = {
  user: User;
};

export type ConvertToProAccountResult =
  | ConvertToProAccountSuccess
  | InvalidCode;

export type StateFieldsFragment = Pick<
  Controller,
  "id" | "activeDemand" | "indoorTemp" | "humidity" | "mode"
> & {
  away: Maybe<Pick<Away, "active">>;
  fan: Maybe<Pick<Fan, "cfm">>;
  location: Pick<Location, "accessLevel" | "connectionStatus" | "id">;
  setpoints: Maybe<Pick<Setpoints, "cool" | "heat">>;
};

export type LocationIdQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type LocationIdQuery = {
  controller: Maybe<{ location: Pick<Location, "id"> }>;
};

export type ControllerQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type ControllerQuery = { controller: Maybe<StateFieldsFragment> };

export type QueryQueryVariables = Exact<{ [key: string]: never }>;

export type QueryQuery = { controllers: Array<StateFieldsFragment> };

export type SetFanSpeedMutationVariables = Exact<{
  locationId: Scalars["ID"];
  cfm: Scalars["Float"];
}>;

export type SetFanSpeedMutation = {
  changeFanCfm:
    | ({ __typename: "ChangeFanCfmSuccess" } & {
        location: { controllers: Array<StateFieldsFragment> };
      })
    | { __typename: "NotFound" }
    | { __typename: "NotSupported" };
};

export type SetModeMutationVariables = Exact<{
  controllerId: Scalars["ID"];
  mode: Mode;
}>;

export type SetModeMutation = {
  changeMode:
    | ({ __typename: "ChangeModeSuccess" } & {
        controller: StateFieldsFragment;
      })
    | { __typename: "NotFound" };
};

export type ChangeOneSetpointMutationVariables = Exact<{
  controllerId: Scalars["ID"];
  setpoint: Setpoint;
  value: Scalars["Int"];
}>;

export type ChangeOneSetpointMutation = {
  changeSetpoint:
    | ({ __typename: "ChangeSetpointSuccess" } & {
        controller: StateFieldsFragment;
      })
    | { __typename: "AwayModeActive" }
    | { __typename: "VacationModeActive" }
    | { __typename: "NotFound" };
};

export type ChangeBothSetpointsMutationVariables = Exact<{
  controllerId: Scalars["ID"];
  heat: Scalars["Int"];
  cool: Scalars["Int"];
}>;

export type ChangeBothSetpointsMutation = {
  _:
    | { __typename: "ChangeSetpointSuccess" }
    | { __typename: "AwayModeActive" }
    | { __typename: "VacationModeActive" }
    | { __typename: "NotFound" };
  changeSetpoint:
    | ({ __typename: "ChangeSetpointSuccess" } & {
        controller: StateFieldsFragment;
      })
    | { __typename: "AwayModeActive" }
    | { __typename: "VacationModeActive" }
    | { __typename: "NotFound" };
};

export type SyncQueryVariables = Exact<{ [key: string]: never }>;

export type SyncQuery = {
  controllers: Array<
    Pick<Controller, "id" | "deadband" | "humidity" | "modes" | "name"> & {
      coolRange: Pick<SetpointRange, "max" | "min">;
      fan: Maybe<Pick<Fan, "cfm">>;
      heatRange: Pick<SetpointRange, "max" | "min">;
      location: Pick<Location, "accessLevel" | "brand" | "model"> & {
        version: Pick<Version, "application" | "outdoorControl">;
      };
    }
  >;
  me: Maybe<Pick<User, "id" | "temperatureUnit">>;
};

export const StateFieldsFragmentDoc: DocumentNode<
  StateFieldsFragment,
  unknown
> = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StateFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Controller" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "activeDemand" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "away" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "active" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "fan" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "cfm" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "indoorTemp" } },
          { kind: "Field", name: { kind: "Name", value: "humidity" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "location" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessLevel" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "connectionStatus" },
                },
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "mode" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "setpoints" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "cool" } },
                { kind: "Field", name: { kind: "Name", value: "heat" } },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const LocationIdDocument: DocumentNode<
  LocationIdQuery,
  LocationIdQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LocationId" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "controllerId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "controller" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "controllerId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "location" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
export const ControllerDocument: DocumentNode<
  ControllerQuery,
  ControllerQueryVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Controller" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "controllerId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "controller" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "controllerId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StateFields" },
                },
              ],
            },
          },
        ],
      },
    },
    ...StateFieldsFragmentDoc.definitions,
  ],
};
export const QueryDocument: DocumentNode<QueryQuery, QueryQueryVariables> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Query" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "controllers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StateFields" },
                },
              ],
            },
          },
        ],
      },
    },
    ...StateFieldsFragmentDoc.definitions,
  ],
};
export const SetFanSpeedDocument: DocumentNode<
  SetFanSpeedMutation,
  SetFanSpeedMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SetFanSpeed" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "locationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cfm" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeFanCfm" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "locationId" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "cfm" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "cfm" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ChangeFanCfmSuccess" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "location" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "controllers" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "FragmentSpread",
                                    name: {
                                      kind: "Name",
                                      value: "StateFields",
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...StateFieldsFragmentDoc.definitions,
  ],
};
export const SetModeDocument: DocumentNode<
  SetModeMutation,
  SetModeMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SetMode" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "controllerId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Mode" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeMode" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "controllerId" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "mode" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "mode" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ChangeModeSuccess" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "controller" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "StateFields" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...StateFieldsFragmentDoc.definitions,
  ],
};
export const ChangeOneSetpointDocument: DocumentNode<
  ChangeOneSetpointMutation,
  ChangeOneSetpointMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeOneSetpoint" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "controllerId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "setpoint" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Setpoint" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "value" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeSetpoint" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "controllerId" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "setpoint" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "setpoint" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "value" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "value" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ChangeSetpointSuccess" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "controller" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "StateFields" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...StateFieldsFragmentDoc.definitions,
  ],
};
export const ChangeBothSetpointsDocument: DocumentNode<
  ChangeBothSetpointsMutation,
  ChangeBothSetpointsMutationVariables
> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeBothSetpoints" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "controllerId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "heat" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cool" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "_" },
            name: { kind: "Name", value: "changeSetpoint" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "controllerId" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "setpoint" },
                      value: { kind: "EnumValue", value: "HEAT" },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "value" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "heat" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "changeSetpoint" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "controllerId" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "setpoint" },
                      value: { kind: "EnumValue", value: "COOL" },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "value" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "cool" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ChangeSetpointSuccess" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "controller" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "StateFields" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...StateFieldsFragmentDoc.definitions,
  ],
};
export const SyncDocument: DocumentNode<SyncQuery, SyncQueryVariables> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Sync" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "controllers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "coolRange" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "max" } },
                      { kind: "Field", name: { kind: "Name", value: "min" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "deadband" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fan" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "cfm" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "heatRange" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "max" } },
                      { kind: "Field", name: { kind: "Name", value: "min" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "humidity" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "location" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "accessLevel" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "brand" } },
                      { kind: "Field", name: { kind: "Name", value: "model" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "version" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "application" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "outdoorControl" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "modes" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "temperatureUnit" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
