import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccessLevel = "OWNER" | "INSTALLER" | "DIAGNOSTIC" | "STATUS";

export type Platform = "IOS" | "ANDROID";

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

export type AccountStatus = "CONFIRMED" | "UNCONFIRMED";

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

export type Mode =
  | "OFF"
  | "AUTO"
  | "HEAT"
  | "COOL"
  | "EHEAT"
  | "MAXHEAT"
  | "MAXCOOL";

export type FanMode = "AUTO" | "FIFTEEN" | "THIRTY" | "FORTYFIVE" | "ALWAYS";

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

export type Day = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

export type ScheduleSlot = "AWAKE" | "LEAVE" | "ARRIVE" | "BED";

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

export type HumidificationMode = "AUTO" | "MANUAL";

export type Humidification = {
  max: Scalars["Float"];
  min: Scalars["Float"];
  mode: HumidificationMode;
  value: Scalars["Float"];
};

export type ScheduleOverride =
  | "CANCELLED"
  | "NEXT_EVENT"
  | "HOURS_01"
  | "HOURS_02"
  | "HOURS_03"
  | "HOURS_04"
  | "HOURS_05"
  | "HOURS_06"
  | "HOURS_07"
  | "HOURS_08"
  | "HOURS_09"
  | "HOURS_10"
  | "HOURS_11"
  | "HOURS_12";

export type ZoneVersion = {
  primaryZoneControl: Maybe<Scalars["String"]>;
  zoneSensor: Array<Scalars["String"]>;
};

export type Sensor =
  | "MAIN_CONTROL"
  | "ZONE_THERMOSTAT_HX"
  | "ZONE_THERMOSTAT"
  | "ZONE_SENSOR"
  | "N_A";

export type ZoneSensor = {
  sensor: Sensor;
  version: Scalars["String"];
};

export type Demand = "COOL" | "HEAT";

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

export type Setpoint = "HEAT" | "COOL";

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

export type ConnectionStatus = "ONLINE" | "OFFLINE" | "INITIALIZING";

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

export type Override = "AWAY" | "VACATION";

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

export type StatusSection =
  | "INDOOR"
  | "INDOOREEV"
  | "OUTDOOR"
  | "THERMOSTAT"
  | "ZONE";

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

export type LogType = "THERMOSTAT" | "SYSTEM";

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

export type PushTokenStatus = "ENABLED" | "DISABLED";

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

export type ShareAccessLevel = "INSTALLER" | "DIAGNOSTIC" | "STATUS";

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

export type AccountType = "HOMEOWNER" | "PRO";

export type TemperatureUnit = "F" | "C";

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

export type ControlledDialQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type ControlledDialQuery = {
  controller: Maybe<Component_ControlledDial_ControllerFragment>;
};

export type Component_ControlledDial_ControllerFragment = {
  __typename: "Controller";
} & Pick<
  Controller,
  | "id"
  | "accessLevel"
  | "activeDemand"
  | "deadband"
  | "disabled"
  | "indoorTemp"
  | "mode"
  | "tempOverride"
> & {
    activeScheduleEvent: Maybe<{ setpoints: Pick<Setpoints, "heat" | "cool"> }>;
    away: Maybe<{ __typename: "Away" } & Pick<Away, "active">>;
    coolRange: Pick<SetpointRange, "min" | "max">;
    heatRange: Pick<SetpointRange, "min" | "max">;
    location: Component_ControlledDial_LocationFragment;
    setpoints: Maybe<Pick<Setpoints, "heat" | "cool">>;
  };

export type Component_ControlledDial_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "override">;

export type ChangeDialSetpointsMutationVariables = Exact<{
  controllerId: Scalars["ID"];
  heatValue: Scalars["Int"];
  coolValue: Scalars["Int"];
}>;

export type ChangeDialSetpointsMutation = {
  changeHeat:
    | ({ __typename: "ChangeSetpointSuccess" } & {
        controller: { __typename: "Controller" } & Pick<
          Controller,
          "id" | "tempOverride"
        > & {
            setpoints: Maybe<
              { __typename: "Setpoints" } & Pick<Setpoints, "heat">
            >;
          };
      })
    | { __typename: "AwayModeActive" }
    | { __typename: "VacationModeActive" }
    | { __typename: "NotFound" };
  changeCool:
    | ({ __typename: "ChangeSetpointSuccess" } & {
        controller: { __typename: "Controller" } & Pick<
          Controller,
          "id" | "tempOverride"
        > & {
            setpoints: Maybe<
              { __typename: "Setpoints" } & Pick<Setpoints, "cool">
            >;
          };
      })
    | { __typename: "AwayModeActive" }
    | { __typename: "VacationModeActive" }
    | { __typename: "NotFound" };
};

export type RemoveLocationMutationVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type RemoveLocationMutation = {
  removeLocation:
    | { __typename: "RemoveLocationSuccess" }
    | { __typename: "NotFound" };
};

export type RemoveAccountMutationVariables = Exact<{ [key: string]: never }>;

export type RemoveAccountMutation = {
  removeAccount:
    | { __typename: "RemoveAccountSuccess" }
    | { __typename: "TokenInvalid" };
};

export type Context_Controllers_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id"> & {
    location: { __typename: "Location" } & Pick<Location, "id">;
  };

export type ControllersContextQueryVariables = Exact<{ [key: string]: never }>;

export type ControllersContextQuery = {
  controllers: Array<Context_Controllers_ControllerFragment>;
};

export type SetAppActiveMutationVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type SetAppActiveMutation = {
  setAppActive:
    | { __typename: "SetAppActiveSuccess" }
    | { __typename: "NotFound" };
};

export type BootstrapQueryVariables = Exact<{
  platform: Platform;
  version: Scalars["String"];
  build: Scalars["String"];
}>;

export type BootstrapQuery = Pick<Query, "updateRequired"> & {
  me: Maybe<MeFieldsFragment>;
  locations: Array<BootstrapLocationFieldsFragment>;
  controllers: Array<BootstrapControllerFieldsFragment>;
};

export type ProBootstrapQueryVariables = Exact<{ [key: string]: never }>;

export type ProBootstrapQuery = {
  me: Maybe<ProMeFieldsFragment>;
  locations: Array<ProBootstrapLocationFieldsFragment>;
};

export type LoadQueryVariables = Exact<{ [key: string]: never }>;

export type LoadQuery = {
  controllers: Array<ControllerFieldsFragment>;
  locations: Array<LocationFieldsFragment>;
};

export type ProLoadQueryVariables = Exact<{ [key: string]: never }>;

export type ProLoadQuery = {
  locations: Array<ProLocationFieldsFragment>;
  controllers: Array<ProControllerFieldsFragment>;
};

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;

export type RefreshTokenMutation = {
  refreshToken:
    | ({ __typename: "RefreshTokenSuccess" } & Pick<
        RefreshTokenSuccess,
        "accessToken" | "refreshToken" | "ttl"
      >)
    | ({ __typename: "TokenInvalid" } & Pick<TokenInvalid, "message">);
};

export type HumidificationFieldsFragment = {
  __typename: "Humidification";
} & Pick<Humidification, "mode" | "max" | "min" | "value">;

export type SubscribeToNotificationsMutationVariables = Exact<{
  input: SubscribeToNotificationsInput;
}>;

export type SubscribeToNotificationsMutation = {
  subscribeToNotifications: {
    __typename: "SubscribeToNotificationsSuccess";
  } & { pushToken: Pick<PushToken, "id" | "platform" | "status" | "token"> };
};

export type UnsubscribeFromNotificationsMutationVariables = Exact<{
  input: UnsubscribeFromNotificationsInput;
}>;

export type UnsubscribeFromNotificationsMutation = {
  unsubscribeFromNotifications:
    | { __typename: "UnsubscribeFromNotificationsSuccess" }
    | { __typename: "NotFound" };
};

export type ScheduleEventFieldsFragment = Pick<
  ScheduleEvent,
  "fanMode" | "slot"
> & {
  setpoints: Pick<Setpoints, "heat" | "cool">;
  start: Pick<ScheduleTime, "day" | "hour" | "minute">;
  stop: Pick<ScheduleTime, "day" | "hour" | "minute">;
};

export type BootstrapControllerFieldsFragment = {
  __typename: "Controller";
} & Pick<Controller, "id"> &
  Component_ControlledDial_ControllerFragment &
  Context_Controllers_ControllerFragment &
  Screen_Home_ControllerFragment;

export type ControllerFieldsFragment = {
  __typename: "Controller";
} & Screen_ChangeFanMode_ControllerFragment &
  Screen_Home_ControllerFragment &
  Screen_NameDevice_ControllerFragment &
  Screen_SelectMode_ControllerFragment &
  Screen_SelectZone_ControllerFragment &
  Screen_Settings_Away_ControllerFragment &
  Screen_Settings_ManageHumidities_ControllerFragment &
  Screen_Settings_Names_ControllerFragment &
  Screen_Settings_Notifications_ControllerFragment &
  Screen_Settings_Schedule_ControllerFragment &
  Screen_Settings_SystemInfo_ControllerFragment &
  Screen_Schedules_ControllerFragment &
  Screen_CopySchedule_ControllerFragment &
  Component_ControlledDial_ControllerFragment &
  Context_Controllers_ControllerFragment;

export type ProControllerFieldsFragment = {
  __typename: "Controller";
} & Screen_AirflowSettings_ControllerFragment &
  Screen_AirflowConfig_ControllerFragment;

export type BootstrapLocationFieldsFragment = { __typename: "Location" } & Pick<
  Location,
  "id"
>;

export type ProBootstrapLocationFieldsFragment = {
  __typename: "Location";
} & Screen_ProHome_LocationFragment;

export type LocationFieldsFragment = {
  __typename: "Location";
} & Screen_Home_LocationFragment &
  Screen_GrantAccess_LocationFragment &
  Screen_NameDevice_LocationFragment &
  Screen_SelectZone_LocationFragment &
  Screen_Settings_LocationFragment &
  Screen_Settings_Away_LocationFragment &
  Screen_Settings_Dealer_LocationFragment &
  Screen_Settings_ManageHumidities_LocationFragment &
  Screen_Settings_Names_LocationFragment &
  Screen_Settings_Notifications_LocationFragment &
  Screen_Settings_Schedule_LocationFragment &
  Screen_Settings_Support_LocationFragment &
  Screen_Settings_SystemInfo_LocationFragment &
  Screen_Settings_Vacation_LocationFragment &
  Screen_Schedules_LocationFragment &
  Component_ControlledDial_LocationFragment &
  Background_OverrideStatus_LocationFragment;

export type ProLocationFieldsFragment = {
  __typename: "Location";
} & Screen_AirflowConfig_LocationFragment &
  Screen_AirflowSettings_LocationFragment &
  Screen_InstallerView_LocationFragment &
  Screen_ProHome_LocationFragment;

export type MeFieldsFragment = { __typename: "User" } & Pick<
  User,
  "id" | "accountType" | "email" | "temperatureUnit"
>;

export type ProMeFieldsFragment = { __typename: "User" } & Pick<User, "id">;

export type RequestRatingQueryVariables = Exact<{
  build: Scalars["String"];
  installedAt: Scalars["String"];
  lastDisplayedAt: Maybe<Scalars["String"]>;
  platform: Platform;
  version: Scalars["String"];
}>;

export type RequestRatingQuery = Pick<Query, "requestRating">;

export type RequestSurveyFeedbackQueryVariables = Exact<{
  build: Scalars["String"];
  installedAt: Scalars["String"];
  lastDisplayedAt: Maybe<Scalars["String"]>;
  lastResponseAt: Maybe<Scalars["String"]>;
  platform: Platform;
  version: Scalars["String"];
}>;

export type RequestSurveyFeedbackQuery = Pick<Query, "requestSurveyFeedback">;

export type RequestSurveySessionMutationVariables = Exact<{
  [key: string]: never;
}>;

export type RequestSurveySessionMutation = {
  requestSurveySession: { __typename: "RequestSurveySessionResult" } & Pick<
    RequestSurveySessionResult,
    "userId" | "userName" | "sessionToken" | "sessionExpiresAt"
  >;
};

export type Screen_NameDevice_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "name" | "zone">;

export type Screen_NameDevice_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "name"> & {
    controllers: Array<Screen_NameDevice_ControllerFragment>;
  };

export type NameDeviceQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type NameDeviceQuery = {
  location: Maybe<Screen_NameDevice_LocationFragment>;
};

export type RenameControllerMutationVariables = Exact<{
  input: RenameControllerInput;
}>;

export type RenameControllerMutation = {
  renameController:
    | ({ __typename: "RenameControllerSuccess" } & {
        controller: ControllerFieldsFragment;
      })
    | { __typename: "NameInvalid" }
    | { __typename: "NotFound" };
};

export type RenameLocationMutationVariables = Exact<{
  input: RenameLocationInput;
}>;

export type RenameLocationMutation = {
  renameLocation:
    | ({ __typename: "RenameLocationSuccess" } & {
        location: LocationFieldsFragment;
      })
    | { __typename: "LocationNameInvalid" }
    | { __typename: "NotFound" };
};

export type Screen_Home_ControllerFragment = {
  __typename: "Controller";
} & Pick<
  Controller,
  | "id"
  | "accessLevel"
  | "disabled"
  | "humidity"
  | "mode"
  | "name"
  | "outdoorTemp"
  | "scheduleOverride"
  | "tempOverride"
> & {
    activeScheduleEvent: Maybe<
      Pick<ScheduleEvent, "fanMode"> & {
        setpoints: Pick<Setpoints, "heat" | "cool">;
      }
    >;
    away: Maybe<Pick<Away, "active">>;
    fan: Maybe<Pick<Fan, "mode" | "override" | "active">>;
    location: Screen_Home_LocationFragment;
  };

export type Screen_Home_LocationFragment = { __typename: "Location" } & Pick<
  Location,
  "id" | "name" | "activeFault" | "connectionStatus" | "override"
> & {
    vacation: Maybe<
      Pick<Vacation, "active"> & { setpoints: Pick<Setpoints, "heat" | "cool"> }
    >;
    controllers: Array<
      { __typename: "Controller" } & Pick<Controller, "id"> & {
          away: Maybe<{ __typename: "Away" } & Pick<Away, "active">>;
        }
    >;
  };

export type Screen_Home_UserFragment = { __typename: "User" } & Pick<
  User,
  "id" | "email"
>;

export type HomeQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type HomeQuery = {
  controller: Maybe<Screen_Home_ControllerFragment>;
  controllers: Array<
    Pick<Controller, "id"> & { location: Pick<Location, "id"> }
  >;
  me: Maybe<Screen_Home_UserFragment>;
};

export type CancelTemperatureHoldMutationVariables = Exact<{
  input: CancelTemperatureHoldInput;
}>;

export type CancelTemperatureHoldMutation = {
  cancelTemperatureHold:
    | ({ __typename: "CancelTemperatureHoldSuccess" } & {
        controller: { __typename: "Controller" } & Pick<
          Controller,
          "id" | "tempOverride"
        > & { setpoints: Maybe<Pick<Setpoints, "cool" | "heat">> };
      })
    | { __typename: "NotFound" };
};

export type CancelFanHoldMutationVariables = Exact<{
  input: CancelFanHoldInput;
}>;

export type CancelFanHoldMutation = {
  cancelFanHold:
    | ({ __typename: "CancelFanHoldSuccess" } & {
        controller: { __typename: "Controller" } & Pick<Controller, "id"> & {
            fan: Maybe<Pick<Fan, "mode" | "override">>;
          };
      })
    | { __typename: "NotFound" };
};

export type Screen_ChangeFanMode_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "accessLevel"> & {
    activeScheduleEvent: Maybe<Pick<ScheduleEvent, "fanMode">>;
    fan: Maybe<Pick<Fan, "cfm" | "mode" | "modes" | "override">>;
    location: { __typename: "Location" } & Pick<Location, "id">;
  };

export type SelectFanQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type SelectFanQuery = {
  controller: Maybe<Screen_ChangeFanMode_ControllerFragment>;
};

export type ChangeFanModeMutationVariables = Exact<{
  input: ChangeFanModeInput;
}>;

export type ChangeFanModeMutation = {
  changeFanMode:
    | ({ __typename: "ChangeFanModeSuccess" } & {
        controller: Screen_ChangeFanMode_ControllerFragment;
      })
    | { __typename: "NotFound" }
    | { __typename: "NotSupported" };
};

export type ChangeFanCfmMutationVariables = Exact<{
  input: ChangeFanCfmInput;
}>;

export type ChangeFanCfmMutation = {
  changeFanCfm:
    | ({ __typename: "ChangeFanCfmSuccess" } & {
        location: { __typename: "Location" } & Pick<Location, "id"> & {
            controllers: Array<Screen_ChangeFanMode_ControllerFragment>;
            controller: Maybe<Screen_ChangeFanMode_ControllerFragment>;
          };
      })
    | { __typename: "NotFound" }
    | { __typename: "NotSupported" };
};

export type Screen_SelectMode_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "override" | "name"> & {
    controllers: Array<
      { __typename: "Controller" } & Pick<Controller, "id" | "mode"> & {
          away: Maybe<
            { __typename: "Away" } & Pick<Away, "active"> & {
                setpoints: { __typename: "Setpoints" } & Pick<
                  Setpoints,
                  "cool" | "heat"
                >;
              }
          >;
          setpoints: Maybe<
            { __typename: "Setpoints" } & Pick<Setpoints, "cool" | "heat">
          >;
        }
    >;
  };

export type Screen_SelectMode_ControllerFragment = {
  __typename: "Controller";
} & Pick<
  Controller,
  "id" | "accessLevel" | "mode" | "modes" | "name" | "tempOverride"
> & {
    away: Maybe<
      { __typename: "Away" } & Pick<Away, "active"> & {
          setpoints: { __typename: "Setpoints" } & Pick<
            Setpoints,
            "cool" | "heat"
          >;
        }
    >;
    location: Screen_SelectMode_LocationFragment;
    setpoints: Maybe<
      { __typename: "Setpoints" } & Pick<Setpoints, "cool" | "heat">
    >;
  };

export type SelectModeQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type SelectModeQuery = {
  controller: Maybe<Screen_SelectMode_ControllerFragment>;
};

export type ChangeModeMutationVariables = Exact<{
  input: ChangeModeInput;
}>;

export type ChangeModeMutation = {
  changeMode:
    | ({ __typename: "ChangeModeSuccess" } & {
        controller: Screen_SelectMode_ControllerFragment;
      })
    | { __typename: "NotFound" };
};

export type ControllerAwayFragment = { __typename: "Controller" } & Pick<
  Controller,
  "id"
> & {
    away: Maybe<{ __typename: "Away" } & Pick<Away, "active">>;
    setpoints: Maybe<
      { __typename: "Setpoints" } & Pick<Setpoints, "cool" | "heat">
    >;
  };

export type ChangeAwayMutationVariables = Exact<{
  input: ChangeAwayInput;
}>;

export type ChangeAwayMutation = {
  changeAway:
    | ({ __typename: "ChangeAwaySuccess" } & {
        controller: ControllerAwayFragment;
      })
    | { __typename: "NotFound" };
};

export type ChangeLocationAwayMutationVariables = Exact<{
  input: ChangeLocationAwayInput;
}>;

export type ChangeLocationAwayMutation = {
  changeLocationAway:
    | ({ __typename: "ChangeLocationAwaySuccess" } & {
        location: { __typename: "Location" } & Pick<
          Location,
          "id" | "override"
        > & { controllers: Array<ControllerAwayFragment> };
      })
    | { __typename: "NotFound" };
};

export type Screen_SelectZone_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "name">;

export type Screen_SelectZone_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "name" | "activeFault" | "connectionStatus"> & {
    controllers: Array<Screen_SelectZone_ControllerFragment>;
  };

export type SelectZoneQueryVariables = Exact<{ [key: string]: never }>;

export type SelectZoneQuery = {
  locations: Array<Screen_SelectZone_LocationFragment>;
};

export type Component_SurveyChatModal_UserFragment = Pick<User, "id" | "email">;

export type SurveyChatModalQueryVariables = Exact<{ [key: string]: never }>;

export type SurveyChatModalQuery = {
  me: Maybe<Component_SurveyChatModal_UserFragment>;
};

export type Screen_AirflowConfig_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "airflow" | "name" | "zone">;

export type Screen_AirflowConfig_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "accessLevel" | "name"> & {
    airflow: Maybe<
      { __typename: "AirflowRange" } & Pick<
        AirflowRange,
        "active" | "max" | "min"
      >
    >;
  };

export type AirflowConfigQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type AirflowConfigQuery = {
  location: Maybe<
    {
      controllers: Array<Screen_AirflowConfig_ControllerFragment>;
    } & Screen_AirflowConfig_LocationFragment
  >;
};

export type Screen_AirflowSettings_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "airflow" | "airflowTestActive" | "name" | "zone">;

export type Screen_AirflowSettings_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "name"> & {
    airflow: Maybe<
      { __typename: "AirflowRange" } & Pick<
        AirflowRange,
        "active" | "max" | "min"
      >
    >;
  };

export type AirflowSettingsQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type AirflowSettingsQuery = {
  controller: Maybe<
    {
      location: Screen_AirflowSettings_LocationFragment;
    } & Screen_AirflowSettings_ControllerFragment
  >;
};

export type ChangeAirflowMutationVariables = Exact<{
  controllerId: Scalars["ID"];
  value: Scalars["Int"];
}>;

export type ChangeAirflowMutation = {
  changeAirflow:
    | ({ __typename: "ChangeAirflowSuccess" } & {
        controller: Screen_AirflowSettings_ControllerFragment;
      })
    | { __typename: "NotSupported" }
    | { __typename: "NotFound" };
};

export type StartAirflowTestMutationVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type StartAirflowTestMutation = {
  toggleAirflowTest:
    | ({ __typename: "ToggleAirflowTestSuccess" } & {
        controller: Screen_AirflowSettings_ControllerFragment;
      })
    | { __typename: "NotFound" }
    | { __typename: "NotSupported" }
    | { __typename: "Offline" };
};

export type StopAirflowTestMutationVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type StopAirflowTestMutation = {
  toggleAirflowTest:
    | ({ __typename: "ToggleAirflowTestSuccess" } & {
        controller: Screen_AirflowSettings_ControllerFragment;
      })
    | { __typename: "NotFound" }
    | { __typename: "NotSupported" }
    | { __typename: "Offline" };
};

export type StatusFragment = Pick<Status, "label" | "updatedAt"> & {
  items: Array<Pick<StatusItem, "label" | "value">>;
};

export type StatusFieldsFragment = {
  statusIndoor: Maybe<Array<StatusFragment>>;
  statusIndoorEEV: Maybe<Array<StatusFragment>>;
  statusOutdoor: Maybe<Array<StatusFragment>>;
  statusZone: Maybe<Array<StatusFragment>>;
};

export type EquipmentStatusQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type EquipmentStatusQuery = {
  location: Maybe<
    { __typename: "Location" } & Pick<Location, "id"> & StatusFieldsFragment
  >;
};

export type RefreshStatusMutationVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type RefreshStatusMutation = {
  refreshStatus:
    | ({ __typename: "RefreshStatusSuccess" } & {
        location: { __typename: "Location" } & Pick<Location, "id"> &
          StatusFieldsFragment;
      })
    | { __typename: "NotFound" }
    | { __typename: "Offline" };
};

export type Screen_InstallerView_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "connectionStatus" | "name" | "zoning"> & {
    airflow: Maybe<{ __typename: "AirflowRange" }>;
    controllers: Array<{ __typename: "Controller" } & Pick<Controller, "id">>;
    share: Maybe<
      { __typename: "Share" } & Pick<Share, "id" | "accessLevel" | "expiresAt">
    >;
  };

export type InstallerViewQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type InstallerViewQuery = {
  location: Maybe<Screen_InstallerView_LocationFragment>;
};

export type ReturnAccessMutationVariables = Exact<{
  shareId: Scalars["ID"];
}>;

export type ReturnAccessMutation = {
  revokeShare:
    | { __typename: "RevokeShareSuccess" }
    | { __typename: "NotFound" };
};

export type Screen_ProHome_LocationFragment = { __typename: "Location" } & Pick<
  Location,
  "id" | "accessLevel" | "activeFault" | "connectionStatus" | "dsn" | "name"
> & {
    share: Maybe<
      { __typename: "Share" } & Pick<Share, "id" | "accessLevel" | "expiresAt">
    >;
    sharer: Maybe<Pick<Sharer, "name" | "email">>;
    shares: Array<Pick<Share, "accessLevel" | "expiresAt">>;
  };

export type ProHomeQueryVariables = Exact<{ [key: string]: never }>;

export type ProHomeQuery = {
  locations: Array<Screen_ProHome_LocationFragment>;
};

export type LocationItemQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type LocationItemQuery = {
  location: Maybe<Screen_ProHome_LocationFragment>;
};

export type RequestShareMutationVariables = Exact<{
  input: RequestShareInput;
}>;

export type RequestShareMutation = {
  requestShare:
    | { __typename: "RequestShareSuccess" }
    | { __typename: "InvalidEmail" };
};

export type WelcomeQueryVariables = Exact<{ [key: string]: never }>;

export type WelcomeQuery = { controllers: Array<Pick<Controller, "id">> };

export type Screen_AdjustSchedule_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "name" | "deadband" | "modes"> & {
    schedule: Maybe<
      Array<
        Pick<Schedule, "day"> & { events: Array<ScheduleEventFieldsFragment> }
      >
    >;
    coolRange: Pick<SetpointRange, "min" | "max">;
    heatRange: Pick<SetpointRange, "min" | "max">;
  };

export type AdjustScheduleQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type AdjustScheduleQuery = {
  controller: Maybe<Screen_AdjustSchedule_ControllerFragment>;
};

export type AddLeaveArriveMutationVariables = Exact<{
  input: AddLeaveArriveInput;
}>;

export type AddLeaveArriveMutation = {
  addLeaveArrive:
    | ({ __typename: "AddLeaveArriveSuccess" } & {
        controller: Screen_AdjustSchedule_ControllerFragment;
      })
    | { __typename: "NotFound" };
};

export type ChangeScheduleMutationVariables = Exact<{
  input: ChangeScheduleInput;
}>;

export type ChangeScheduleMutation = {
  changeSchedule:
    | ({ __typename: "ChangeScheduleSuccess" } & {
        controller: Screen_AdjustSchedule_ControllerFragment;
      })
    | { __typename: "InactiveSlot" }
    | { __typename: "NotFound" };
};

export type RemoveLeaveArriveMutationVariables = Exact<{
  input: RemoveLeaveArriveInput;
}>;

export type RemoveLeaveArriveMutation = {
  removeLeaveArrive:
    | ({ __typename: "RemoveLeaveArriveSuccess" } & {
        controller: Screen_AdjustSchedule_ControllerFragment;
      })
    | { __typename: "NotFound" };
};

export type Screen_CopySchedule_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "name"> & {
    schedule: Maybe<
      Array<
        Pick<Schedule, "day"> & { events: Array<ScheduleEventFieldsFragment> }
      >
    >;
  };

export type CopyScheduleQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type CopyScheduleQuery = {
  controller: Maybe<Screen_CopySchedule_ControllerFragment>;
};

export type MakeScheduleCopyMutationVariables = Exact<{
  input: CopyScheduleInput;
}>;

export type MakeScheduleCopyMutation = {
  copySchedule:
    | ({ __typename: "CopyScheduleSuccess" } & {
        controller: Screen_CopySchedule_ControllerFragment;
      })
    | { __typename: "NotFound" };
};

export type Screen_Schedules_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "name" | "programmable">;

export type Screen_Schedules_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "accessLevel" | "name"> & {
    location: Screen_Schedules_LocationFragment;
    schedule: Maybe<
      Array<
        Pick<Schedule, "day"> & { events: Array<ScheduleEventFieldsFragment> }
      >
    >;
  };

export type SchedulesQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type SchedulesQuery = {
  controller: Maybe<Screen_Schedules_ControllerFragment>;
  controllers: Array<
    Pick<Controller, "id"> & { location: Pick<Location, "id"> }
  >;
};

export type EnableProgrammableMutationVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type EnableProgrammableMutation = {
  changeProgrammable:
    | ({ __typename: "ChangeProgrammableSuccess" } & {
        location: Screen_Schedules_LocationFragment;
      })
    | { __typename: "NotFound" };
};

export type Screen_Settings_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "accessLevel" | "name"> & {
    controller: Maybe<Screen_Settings_ControllerFragment>;
    controllers: Array<
      Pick<Controller, "zone"> & Screen_Settings_ControllerFragment
    >;
    dealer: Pick<Dealer, "name">;
    vacation: Maybe<{ setpoints: Pick<Setpoints, "heat" | "cool"> }>;
  };

export type Screen_Settings_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "name"> & {
    away: Maybe<{ setpoints: Pick<Setpoints, "heat" | "cool"> }>;
    humidification: Maybe<HumidificationFieldsFragment>;
    dehumidification: Maybe<HumidificationFieldsFragment>;
  };

export type SettingsQueryVariables = Exact<{ [key: string]: never }>;

export type SettingsQuery = {
  locations: Array<Screen_Settings_LocationFragment>;
};

export type SettingsLocationQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type SettingsLocationQuery = {
  location: Maybe<Screen_Settings_LocationFragment>;
};

export type ChangeTemperatureUnitMutationVariables = Exact<{
  input: ChangeTemperatureUnitInput;
}>;

export type ChangeTemperatureUnitMutation = {
  changeTemperatureUnit: { __typename: "ChangeTemperatureUnitSuccess" } & {
    user: { __typename: "User" } & Pick<User, "id" | "temperatureUnit">;
  };
};

export type GenerateLoginTokenMutationVariables = Exact<{
  [key: string]: never;
}>;

export type GenerateLoginTokenMutation = {
  generateLoginToken: { __typename: "GenerateLoginTokenSuccess" } & Pick<
    GenerateLoginTokenSuccess,
    "token"
  >;
};

export type Screen_Settings_Away_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "name" | "deadband" | "modes"> & {
    away: Maybe<{ setpoints: Pick<Setpoints, "heat" | "cool"> }>;
    coolRange: Pick<SetpointRange, "max" | "min">;
    heatRange: Pick<SetpointRange, "max" | "min">;
  };

export type Screen_Settings_Away_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "accessLevel" | "lat" | "lng" | "name"> & {
    controllers: Array<Screen_Settings_Away_ControllerFragment>;
  };

export type AwayControllerQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type AwayControllerQuery = {
  controller: Maybe<Screen_Settings_Away_ControllerFragment>;
};

export type AwayLocationQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type AwayLocationQuery = {
  location: Maybe<Screen_Settings_Away_LocationFragment>;
};

export type ChangeAwaySetpointsMutationVariables = Exact<{
  input: ChangeAwaySetpointsInput;
}>;

export type ChangeAwaySetpointsMutation = {
  changeAwaySetpoints:
    | ({ __typename: "ChangeAwaySetpointsSuccess" } & {
        controller: Screen_Settings_Away_ControllerFragment;
      })
    | { __typename: "NotFound" };
};

export type Screen_Settings_Dealer_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "accessLevel" | "name"> & {
    dealer: Pick<Dealer, "email" | "name" | "phone" | "website">;
    shares: Array<
      { __typename: "Share" } & Pick<
        Share,
        "id" | "accessLevel" | "email" | "expiresAt"
      >
    >;
  };

export type DealerQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type DealerQuery = {
  location: Maybe<Screen_Settings_Dealer_LocationFragment>;
};

export type ShareLocationMutationVariables = Exact<{
  input: ShareLocationInput;
}>;

export type ShareLocationMutation = {
  shareLocation:
    | ({ __typename: "ShareLocationSuccess" } & {
        location: Screen_Settings_Dealer_LocationFragment;
      })
    | { __typename: "InvalidDate" }
    | ({ __typename: "InvalidEmail" } & Pick<InvalidEmail, "message">)
    | { __typename: "NotFound" };
};

export type RevokeShareMutationVariables = Exact<{
  input: RevokeShareInput;
}>;

export type RevokeShareMutation = {
  revokeShare:
    | ({ __typename: "RevokeShareSuccess" } & {
        location: Screen_Settings_Dealer_LocationFragment;
      })
    | { __typename: "NotFound" };
};

export type ChangeDealerMutationVariables = Exact<{
  input: ChangeDealerInput;
}>;

export type ChangeDealerMutation = {
  changeDealer:
    | ({ __typename: "ChangeDealerSuccess" } & {
        location: Screen_Settings_Dealer_LocationFragment;
      })
    | { __typename: "NotFound" };
};

export type Screen_GrantAccess_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "name"> & { dealer: Pick<Dealer, "email"> };

export type GrantAccessQueryVariables = Exact<{
  locationId: Scalars["ID"];
  includeLocation: Scalars["Boolean"];
}>;

export type GrantAccessQuery = {
  location: Maybe<Screen_GrantAccess_LocationFragment>;
  locations: Array<Screen_GrantAccess_LocationFragment>;
};

export type Screen_Settings_ManageHumidities_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "accessLevel"> & {
    controllers: Array<Screen_Settings_ManageHumidities_ControllerFragment>;
  };

export type Screen_Settings_ManageHumidities_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "name"> & {
    dehumidification: Maybe<HumidificationFieldsFragment>;
    humidification: Maybe<HumidificationFieldsFragment>;
  };

export type HumidityControllerQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type HumidityControllerQuery = {
  controller: Maybe<Screen_Settings_ManageHumidities_ControllerFragment>;
};

export type HumiditLocationQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type HumiditLocationQuery = {
  location: Maybe<Screen_Settings_ManageHumidities_LocationFragment>;
};

export type ChangeHumidificationModeMutationVariables = Exact<{
  input: ChangeHumidificationModeInput;
}>;

export type ChangeHumidificationModeMutation = {
  changeHumidificationMode:
    | ({ __typename: "ChangeHumidificationModeSuccess" } & {
        controller: { __typename: "Controller" } & Pick<Controller, "id"> & {
            humidification: Maybe<HumidificationFieldsFragment>;
          };
      })
    | { __typename: "NotSupported" }
    | { __typename: "NotFound" };
};

export type ChangeDehumidificationModeMutationVariables = Exact<{
  input: ChangeHumidificationModeInput;
}>;

export type ChangeDehumidificationModeMutation = {
  changeDehumidificationMode:
    | ({ __typename: "ChangeHumidificationModeSuccess" } & {
        controller: { __typename: "Controller" } & Pick<Controller, "id"> & {
            dehumidification: Maybe<HumidificationFieldsFragment>;
          };
      })
    | { __typename: "NotSupported" }
    | { __typename: "NotFound" };
};

export type ChangeHumidificationMutationVariables = Exact<{
  input: ChangeHumidificationInput;
}>;

export type ChangeHumidificationMutation = {
  changeHumidification:
    | ({ __typename: "ChangeHumidificationSuccess" } & {
        controller: { __typename: "Controller" } & Pick<Controller, "id"> & {
            humidification: Maybe<HumidificationFieldsFragment>;
          };
      })
    | { __typename: "NotSupported" }
    | { __typename: "NotFound" };
};

export type ChangeDehumidificationMutationVariables = Exact<{
  input: ChangeHumidificationInput;
}>;

export type ChangeDehumidificationMutation = {
  changeDehumidification:
    | ({ __typename: "ChangeHumidificationSuccess" } & {
        controller: { __typename: "Controller" } & Pick<Controller, "id"> & {
            dehumidification: Maybe<HumidificationFieldsFragment>;
          };
      })
    | { __typename: "NotSupported" }
    | { __typename: "NotFound" };
};

export type Screen_Settings_Names_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "accessLevel" | "name">;

export type Screen_Settings_Names_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "accessLevel" | "name"> & {
    controllers: Array<Screen_Settings_Names_ControllerFragment>;
  };

export type NamesQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type NamesQuery = {
  location: Maybe<Screen_Settings_Names_LocationFragment>;
};

export type ControllerNameQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type ControllerNameQuery = {
  controller: Maybe<Screen_Settings_Names_ControllerFragment>;
};

export type RenameLocationSettingsMutationVariables = Exact<{
  input: RenameLocationInput;
}>;

export type RenameLocationSettingsMutation = {
  renameLocation:
    | ({ __typename: "RenameLocationSuccess" } & {
        location: Screen_Settings_Names_LocationFragment;
      })
    | { __typename: "LocationNameInvalid" }
    | { __typename: "NotFound" };
};

export type RenameControllerSettingsMutationVariables = Exact<{
  input: RenameControllerInput;
}>;

export type RenameControllerSettingsMutation = {
  renameController:
    | ({ __typename: "RenameControllerSuccess" } & {
        controller: Screen_Settings_Names_ControllerFragment;
      })
    | { __typename: "NameInvalid" }
    | { __typename: "NotFound" };
};

export type Screen_Settings_Notifications_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "name"> & {
    humidityNotification: Maybe<
      Pick<HumidityNotification, "enabled" | "min" | "max">
    >;
    temperatureNotification: Maybe<
      Pick<TemperatureNotification, "enabled" | "min" | "max">
    >;
  };

export type Screen_Settings_Notifications_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id"> & {
    faultNotification: Maybe<Pick<FaultNotification, "enabled">>;
    serviceReminder: Pick<ServiceReminder, "enabled"> & {
      spring: Maybe<Pick<ServiceReminderDate, "day" | "month">>;
      fall: Maybe<Pick<ServiceReminderDate, "day" | "month">>;
    };
    controllers: Array<Screen_Settings_Notifications_ControllerFragment>;
  };

export type LocationNotificationsQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type LocationNotificationsQuery = {
  location: Maybe<Screen_Settings_Notifications_LocationFragment>;
};

export type ControllerNotificationsQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type ControllerNotificationsQuery = {
  controller: Maybe<Screen_Settings_Notifications_ControllerFragment>;
};

export type ToggleTemperatureNotificationMutationVariables = Exact<{
  input: ToggleTemperatureNotificationInput;
}>;

export type ToggleTemperatureNotificationMutation = {
  toggleTemperatureNotification:
    | ({ __typename: "ToggleTemperatureNotificationSuccess" } & {
        controller: Screen_Settings_Notifications_ControllerFragment;
      })
    | { __typename: "NotFound" };
};

export type AdjustTemperatureNotificationThresholdMutationVariables = Exact<{
  input: AdjustTemperatureNotificationThresholdInput;
}>;

export type AdjustTemperatureNotificationThresholdMutation = {
  adjustTemperatureNotificationThreshold:
    | ({ __typename: "AdjustTemperatureNotificationThresholdSuccess" } & {
        controller: Screen_Settings_Notifications_ControllerFragment;
      })
    | { __typename: "NotFound" };
};

export type ToggleServiceReminderMutationVariables = Exact<{
  input: ToggleServiceReminderInput;
}>;

export type ToggleServiceReminderMutation = {
  toggleServiceReminder:
    | ({ __typename: "ToggleServiceReminderSuccess" } & {
        location: Screen_Settings_Notifications_LocationFragment;
      })
    | { __typename: "NotFound" };
};

export type AdjustServiceReminderDatesMutationVariables = Exact<{
  input: AdjustServiceReminderDatesInput;
}>;

export type AdjustServiceReminderDatesMutation = {
  adjustServiceReminderDates:
    | ({ __typename: "AdjustServiceReminderDatesSuccess" } & {
        location: Screen_Settings_Notifications_LocationFragment;
      })
    | { __typename: "NotFound" };
};

export type ToggleHumidityNotificationMutationVariables = Exact<{
  input: ToggleHumidityNotificationInput;
}>;

export type ToggleHumidityNotificationMutation = {
  toggleHumidityNotification:
    | ({ __typename: "ToggleHumidityNotificationSuccess" } & {
        controller: Screen_Settings_Notifications_ControllerFragment;
      })
    | { __typename: "NotFound" };
};

export type AdjustHumidityNotificationThresholdMutationVariables = Exact<{
  input: AdjustHumidityNotificationThresholdInput;
}>;

export type AdjustHumidityNotificationThresholdMutation = {
  adjustHumidityNotificationThreshold:
    | ({ __typename: "AdjustHumidityNotificationThresholdSuccess" } & {
        controller: Screen_Settings_Notifications_ControllerFragment;
      })
    | { __typename: "NotFound" };
};

export type ToggleFaultNotificationMutationVariables = Exact<{
  input: ToggleFaultNotificationInput;
}>;

export type ToggleFaultNotificationMutation = {
  toggleFaultNotification:
    | ({ __typename: "ToggleFaultNotificationSuccess" } & {
        location: Screen_Settings_Notifications_LocationFragment;
      })
    | { __typename: "NotFound" };
};

export type ConvertToProAccountMutationVariables = Exact<{
  code: Scalars["String"];
}>;

export type ConvertToProAccountMutation = {
  convertToProAccount:
    | { __typename: "ConvertToProAccountSuccess" }
    | { __typename: "InvalidCode" };
};

export type Screen_Settings_Schedule_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "name" | "scheduleOverride">;

export type Screen_Settings_Schedule_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "accessLevel" | "programmable"> & {
    controllers: Array<Screen_Settings_Schedule_ControllerFragment>;
  };

export type SettingsScheduleLocationQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type SettingsScheduleLocationQuery = {
  location: Maybe<Screen_Settings_Schedule_LocationFragment>;
};

export type SettingsScheduleControllerQueryVariables = Exact<{
  controllerId: Scalars["ID"];
}>;

export type SettingsScheduleControllerQuery = {
  controller: Maybe<Screen_Settings_Schedule_ControllerFragment>;
};

export type ChangeProgrammableMutationVariables = Exact<{
  input: ChangeProgrammableInput;
}>;

export type ChangeProgrammableMutation = {
  changeProgrammable:
    | ({ __typename: "ChangeProgrammableSuccess" } & {
        location: Screen_Settings_Schedule_LocationFragment;
      })
    | { __typename: "NotFound" };
};

export type ChangeScheduleOverrideMutationVariables = Exact<{
  input: ChangeScheduleOverrideInput;
}>;

export type ChangeScheduleOverrideMutation = {
  changeScheduleOverride:
    | ({ __typename: "ChangeScheduleOverrideSuccess" } & {
        controller: Screen_Settings_Schedule_ControllerFragment;
      })
    | { __typename: "NotFound" };
};

export type RestoreDefaultScheduleMutationVariables = Exact<{
  controllerId: Scalars["ID"];
  days: Array<Day>;
}>;

export type RestoreDefaultScheduleMutation = {
  restoreDefaultSchedule:
    | ({ __typename: "RestoreDefaultScheduleSuccess" } & {
        controller: { __typename: "Controller" } & Pick<
          Controller,
          "id" | "name"
        > & {
            schedule: Maybe<
              Array<
                Pick<Schedule, "day"> & {
                  events: Array<ScheduleEventFieldsFragment>;
                }
              >
            >;
          };
      })
    | { __typename: "NotFound" };
};

export type GenerateShareTokenMutationVariables = Exact<{
  [key: string]: never;
}>;

export type GenerateShareTokenMutation = {
  generateShareToken: { __typename: "GenerateShareTokenSuccess" } & Pick<
    GenerateShareTokenSuccess,
    "token"
  >;
};

export type Screen_Settings_Support_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "name"> & { dealer: Pick<Dealer, "name"> };

export type SupportQueryVariables = Exact<{ [key: string]: never }>;

export type SupportQuery = {
  locations: Array<Screen_Settings_Support_LocationFragment>;
};

export type Screen_Settings_SystemInfo_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id"> & {
    dealer: Pick<Dealer, "email" | "name">;
    controllers: Array<Screen_Settings_SystemInfo_ControllerFragment>;
    version: Pick<Version, "application" | "bootloader" | "outdoorControl">;
  };

export type Screen_Settings_SystemInfo_ControllerFragment = {
  __typename: "Controller";
} & Pick<Controller, "id" | "name"> & {
    zoneSensor: Maybe<Pick<ZoneSensor, "sensor" | "version">>;
  };

export type SystemInfoQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type SystemInfoQuery = {
  location: Maybe<Screen_Settings_SystemInfo_LocationFragment>;
};

export type GetFaultsQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type GetFaultsQuery = {
  location: Maybe<
    { __typename: "Location" } & Pick<Location, "id" | "accessLevel"> & {
        dealer: Pick<Dealer, "email" | "name">;
        faults: Array<Pick<Fault, "createdAt" | "value">>;
      }
  >;
};

export type ResetLogsMutationVariables = Exact<{
  locationId: Scalars["ID"];
  logType: LogType;
}>;

export type ResetLogsMutation = {
  resetLogs:
    | { __typename: "ResetLogsSuccess" }
    | { __typename: "NotFound" }
    | { __typename: "NotSupported" };
};

export type Screen_Settings_Vacation_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "modes" | "override"> & {
    controllers: Array<
      { __typename: "Controller" } & Pick<Controller, "id" | "deadband"> & {
          coolRange: Pick<SetpointRange, "max" | "min">;
          heatRange: Pick<SetpointRange, "max" | "min">;
        }
    >;
    vacation: Maybe<
      Pick<Vacation, "active"> & { setpoints: Pick<Setpoints, "heat" | "cool"> }
    >;
  };

export type VacationQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type VacationQuery = {
  location: Maybe<Screen_Settings_Vacation_LocationFragment>;
};

export type ChangeVacationMutationVariables = Exact<{
  input: ChangeVacationInput;
}>;

export type ChangeVacationMutation = {
  changeVacation:
    | ({ __typename: "ChangeVacationSuccess" } & {
        location: { __typename: "Location" } & Pick<
          Location,
          "id" | "override"
        > & { vacation: Maybe<Pick<Vacation, "active">> };
      })
    | { __typename: "VacationNotSupported" }
    | { __typename: "NotFound" };
};

export type ChangeVacationSetpointsMutationVariables = Exact<{
  input: ChangeVacationSetpointsInput;
}>;

export type ChangeVacationSetpointsMutation = {
  changeVacationSetpoints:
    | ({ __typename: "ChangeVacationSetpointsSuccess" } & {
        location: { __typename: "Location" } & Pick<Location, "id"> & {
            vacation: Maybe<{ setpoints: Pick<Setpoints, "heat" | "cool"> }>;
          };
      })
    | { __typename: "VacationNotSupported" }
    | { __typename: "NotFound" };
};

export type SendTokenMutationVariables = Exact<{
  input: SendTokenInput;
}>;

export type SendTokenMutation = {
  sendToken: { __typename: "SendTokenSuccess" } | { __typename: "NotFound" };
};

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;

export type SignInMutation = {
  signIn:
    | ({ __typename: "SignInSuccess" } & Pick<
        SignInSuccess,
        "accessToken" | "refreshToken" | "ttl"
      >)
    | { __typename: "TokenInvalid" }
    | { __typename: "EmailInvalid" };
};

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpMutation = {
  signUp:
    | { __typename: "SignUpSuccess" }
    | { __typename: "EmailInvalid" }
    | { __typename: "EmailTaken" }
    | { __typename: "FirstNameInvalid" }
    | { __typename: "LastNameInvalid" }
    | { __typename: "CountryInvalid" };
};

export type Background_OverrideStatus_LocationFragment = {
  __typename: "Location";
} & Pick<Location, "id" | "override">;

export type BackgroundOverrideStatusQueryVariables = Exact<{
  locationId: Scalars["ID"];
}>;

export type BackgroundOverrideStatusQuery = {
  location: Maybe<Background_OverrideStatus_LocationFragment>;
};

export type RegisterLocationMutationVariables = Exact<{
  input: RegisterLocationInput;
}>;

export type RegisterLocationMutation = {
  registerLocation:
    | ({ __typename: "RegisterLocationSuccess" } & {
        location: {
          controllers: Array<ControllerFieldsFragment>;
        } & LocationFieldsFragment;
      })
    | { __typename: "NotFound" };
};

export const Component_ControlledDial_LocationFragmentDoc = gql`
  fragment Component_ControlledDial_Location on Location {
    __typename
    id
    override
  }
`;
export const Component_ControlledDial_ControllerFragmentDoc = gql`
  fragment Component_ControlledDial_Controller on Controller {
    __typename
    id
    accessLevel
    activeDemand
    activeScheduleEvent {
      setpoints {
        heat
        cool
      }
    }
    away {
      __typename
      active
    }
    coolRange {
      min
      max
    }
    deadband
    disabled
    heatRange {
      min
      max
    }
    indoorTemp
    location {
      ...Component_ControlledDial_Location
    }
    mode
    setpoints {
      heat
      cool
    }
    tempOverride
  }
  ${Component_ControlledDial_LocationFragmentDoc}
`;
export const Context_Controllers_ControllerFragmentDoc = gql`
  fragment Context_Controllers_Controller on Controller {
    __typename
    id
    location {
      __typename
      id
    }
  }
`;
export const Screen_Home_LocationFragmentDoc = gql`
  fragment Screen_Home_Location on Location {
    __typename
    id
    name
    activeFault
    connectionStatus
    override
    vacation {
      active
      setpoints {
        heat
        cool
      }
    }
    controllers {
      __typename
      id
      away {
        __typename
        active
      }
    }
  }
`;
export const Screen_Home_ControllerFragmentDoc = gql`
  fragment Screen_Home_Controller on Controller {
    __typename
    id
    accessLevel
    activeScheduleEvent {
      fanMode
      setpoints {
        heat
        cool
      }
    }
    away {
      active
    }
    disabled
    fan {
      mode
      override
      active
    }
    humidity
    location {
      ...Screen_Home_Location
    }
    mode
    name
    outdoorTemp
    scheduleOverride
    tempOverride
  }
  ${Screen_Home_LocationFragmentDoc}
`;
export const BootstrapControllerFieldsFragmentDoc = gql`
  fragment BootstrapControllerFields on Controller {
    __typename
    id
    ...Component_ControlledDial_Controller
    ...Context_Controllers_Controller
    ...Screen_Home_Controller
  }
  ${Component_ControlledDial_ControllerFragmentDoc}
  ${Context_Controllers_ControllerFragmentDoc}
  ${Screen_Home_ControllerFragmentDoc}
`;
export const Screen_ChangeFanMode_ControllerFragmentDoc = gql`
  fragment Screen_ChangeFanMode_Controller on Controller {
    __typename
    id
    accessLevel
    activeScheduleEvent {
      fanMode
    }
    fan {
      cfm
      mode
      modes
      override
    }
    location {
      __typename
      id
    }
  }
`;
export const Screen_NameDevice_ControllerFragmentDoc = gql`
  fragment Screen_NameDevice_Controller on Controller {
    __typename
    id
    name
    zone
  }
`;
export const Screen_SelectMode_LocationFragmentDoc = gql`
  fragment Screen_SelectMode_Location on Location {
    __typename
    id
    override
    controllers {
      __typename
      id
      away {
        __typename
        active
        setpoints {
          __typename
          cool
          heat
        }
      }
      setpoints {
        __typename
        cool
        heat
      }
      mode
    }
    name
  }
`;
export const Screen_SelectMode_ControllerFragmentDoc = gql`
  fragment Screen_SelectMode_Controller on Controller {
    __typename
    id
    accessLevel
    mode
    modes
    away {
      __typename
      active
      setpoints {
        __typename
        cool
        heat
      }
    }
    location {
      ...Screen_SelectMode_Location
    }
    name
    setpoints {
      __typename
      cool
      heat
    }
    tempOverride
  }
  ${Screen_SelectMode_LocationFragmentDoc}
`;
export const Screen_SelectZone_ControllerFragmentDoc = gql`
  fragment Screen_SelectZone_Controller on Controller {
    __typename
    id
    name
  }
`;
export const Screen_Settings_Away_ControllerFragmentDoc = gql`
  fragment Screen_Settings_Away_Controller on Controller {
    __typename
    id
    name
    away {
      setpoints {
        heat
        cool
      }
    }
    coolRange {
      max
      min
    }
    deadband
    heatRange {
      max
      min
    }
    modes
  }
`;
export const HumidificationFieldsFragmentDoc = gql`
  fragment HumidificationFields on Humidification {
    __typename
    mode
    max
    min
    value
  }
`;
export const Screen_Settings_ManageHumidities_ControllerFragmentDoc = gql`
  fragment Screen_Settings_ManageHumidities_Controller on Controller {
    __typename
    id
    name
    dehumidification {
      ...HumidificationFields
    }
    humidification {
      ...HumidificationFields
    }
  }
  ${HumidificationFieldsFragmentDoc}
`;
export const Screen_Settings_Names_ControllerFragmentDoc = gql`
  fragment Screen_Settings_Names_Controller on Controller {
    __typename
    id
    accessLevel
    name
  }
`;
export const Screen_Settings_Notifications_ControllerFragmentDoc = gql`
  fragment Screen_Settings_Notifications_Controller on Controller {
    __typename
    id
    name
    humidityNotification {
      enabled
      min
      max
    }
    temperatureNotification {
      enabled
      min
      max
    }
  }
`;
export const Screen_Settings_Schedule_ControllerFragmentDoc = gql`
  fragment Screen_Settings_Schedule_Controller on Controller {
    __typename
    id
    name
    scheduleOverride
  }
`;
export const Screen_Settings_SystemInfo_ControllerFragmentDoc = gql`
  fragment Screen_Settings_SystemInfo_Controller on Controller {
    __typename
    id
    name
    zoneSensor {
      sensor
      version
    }
  }
`;
export const Screen_Schedules_LocationFragmentDoc = gql`
  fragment Screen_Schedules_Location on Location {
    __typename
    id
    name
    programmable
  }
`;
export const ScheduleEventFieldsFragmentDoc = gql`
  fragment ScheduleEventFields on ScheduleEvent {
    fanMode
    setpoints {
      heat
      cool
    }
    slot
    start {
      day
      hour
      minute
    }
    stop {
      day
      hour
      minute
    }
  }
`;
export const Screen_Schedules_ControllerFragmentDoc = gql`
  fragment Screen_Schedules_Controller on Controller {
    __typename
    id
    accessLevel
    location {
      ...Screen_Schedules_Location
    }
    name
    schedule {
      day
      events {
        ...ScheduleEventFields
      }
    }
  }
  ${Screen_Schedules_LocationFragmentDoc}
  ${ScheduleEventFieldsFragmentDoc}
`;
export const Screen_CopySchedule_ControllerFragmentDoc = gql`
  fragment Screen_CopySchedule_Controller on Controller {
    __typename
    id
    name
    schedule {
      day
      events {
        ...ScheduleEventFields
      }
    }
  }
  ${ScheduleEventFieldsFragmentDoc}
`;
export const ControllerFieldsFragmentDoc = gql`
  fragment ControllerFields on Controller {
    __typename
    ...Screen_ChangeFanMode_Controller
    ...Screen_Home_Controller
    ...Screen_NameDevice_Controller
    ...Screen_SelectMode_Controller
    ...Screen_SelectZone_Controller
    ...Screen_Settings_Away_Controller
    ...Screen_Settings_ManageHumidities_Controller
    ...Screen_Settings_Names_Controller
    ...Screen_Settings_Notifications_Controller
    ...Screen_Settings_Schedule_Controller
    ...Screen_Settings_SystemInfo_Controller
    ...Screen_Schedules_Controller
    ...Screen_CopySchedule_Controller
    ...Component_ControlledDial_Controller
    ...Context_Controllers_Controller
  }
  ${Screen_ChangeFanMode_ControllerFragmentDoc}
  ${Screen_Home_ControllerFragmentDoc}
  ${Screen_NameDevice_ControllerFragmentDoc}
  ${Screen_SelectMode_ControllerFragmentDoc}
  ${Screen_SelectZone_ControllerFragmentDoc}
  ${Screen_Settings_Away_ControllerFragmentDoc}
  ${Screen_Settings_ManageHumidities_ControllerFragmentDoc}
  ${Screen_Settings_Names_ControllerFragmentDoc}
  ${Screen_Settings_Notifications_ControllerFragmentDoc}
  ${Screen_Settings_Schedule_ControllerFragmentDoc}
  ${Screen_Settings_SystemInfo_ControllerFragmentDoc}
  ${Screen_Schedules_ControllerFragmentDoc}
  ${Screen_CopySchedule_ControllerFragmentDoc}
  ${Component_ControlledDial_ControllerFragmentDoc}
  ${Context_Controllers_ControllerFragmentDoc}
`;
export const Screen_AirflowSettings_ControllerFragmentDoc = gql`
  fragment Screen_AirflowSettings_Controller on Controller {
    __typename
    id
    airflow
    airflowTestActive
    name
    zone
  }
`;
export const Screen_AirflowConfig_ControllerFragmentDoc = gql`
  fragment Screen_AirflowConfig_Controller on Controller {
    __typename
    id
    airflow
    name
    zone
  }
`;
export const ProControllerFieldsFragmentDoc = gql`
  fragment ProControllerFields on Controller {
    __typename
    ...Screen_AirflowSettings_Controller
    ...Screen_AirflowConfig_Controller
  }
  ${Screen_AirflowSettings_ControllerFragmentDoc}
  ${Screen_AirflowConfig_ControllerFragmentDoc}
`;
export const BootstrapLocationFieldsFragmentDoc = gql`
  fragment BootstrapLocationFields on Location {
    __typename
    id
  }
`;
export const Screen_ProHome_LocationFragmentDoc = gql`
  fragment Screen_ProHome_Location on Location {
    __typename
    id
    accessLevel
    activeFault
    connectionStatus
    dsn
    name
    share {
      __typename
      id
      accessLevel
      expiresAt
    }
    sharer {
      name
      email
    }
    shares {
      accessLevel
      expiresAt
    }
  }
`;
export const ProBootstrapLocationFieldsFragmentDoc = gql`
  fragment ProBootstrapLocationFields on Location {
    __typename
    ...Screen_ProHome_Location
  }
  ${Screen_ProHome_LocationFragmentDoc}
`;
export const Screen_GrantAccess_LocationFragmentDoc = gql`
  fragment Screen_GrantAccess_Location on Location {
    __typename
    id
    dealer {
      email
    }
    name
  }
`;
export const Screen_NameDevice_LocationFragmentDoc = gql`
  fragment Screen_NameDevice_Location on Location {
    __typename
    id
    name
    controllers {
      ...Screen_NameDevice_Controller
    }
  }
  ${Screen_NameDevice_ControllerFragmentDoc}
`;
export const Screen_SelectZone_LocationFragmentDoc = gql`
  fragment Screen_SelectZone_Location on Location {
    __typename
    id
    name
    activeFault
    connectionStatus
    controllers {
      ...Screen_SelectZone_Controller
    }
  }
  ${Screen_SelectZone_ControllerFragmentDoc}
`;
export const Screen_Settings_ControllerFragmentDoc = gql`
  fragment Screen_Settings_Controller on Controller {
    __typename
    id
    name
    away {
      setpoints {
        heat
        cool
      }
    }
    humidification {
      ...HumidificationFields
    }
    dehumidification {
      ...HumidificationFields
    }
  }
  ${HumidificationFieldsFragmentDoc}
`;
export const Screen_Settings_LocationFragmentDoc = gql`
  fragment Screen_Settings_Location on Location {
    __typename
    id
    accessLevel
    controller {
      ...Screen_Settings_Controller
    }
    controllers {
      ...Screen_Settings_Controller
      zone
    }
    dealer {
      name
    }
    name
    vacation {
      setpoints {
        heat
        cool
      }
    }
  }
  ${Screen_Settings_ControllerFragmentDoc}
`;
export const Screen_Settings_Away_LocationFragmentDoc = gql`
  fragment Screen_Settings_Away_Location on Location {
    __typename
    id
    accessLevel
    lat
    lng
    name
    controllers {
      ...Screen_Settings_Away_Controller
    }
  }
  ${Screen_Settings_Away_ControllerFragmentDoc}
`;
export const Screen_Settings_Dealer_LocationFragmentDoc = gql`
  fragment Screen_Settings_Dealer_Location on Location {
    __typename
    id
    accessLevel
    name
    dealer {
      email
      name
      phone
      website
    }
    shares {
      __typename
      id
      accessLevel
      email
      expiresAt
    }
  }
`;
export const Screen_Settings_ManageHumidities_LocationFragmentDoc = gql`
  fragment Screen_Settings_ManageHumidities_Location on Location {
    __typename
    id
    accessLevel
    controllers {
      ...Screen_Settings_ManageHumidities_Controller
    }
  }
  ${Screen_Settings_ManageHumidities_ControllerFragmentDoc}
`;
export const Screen_Settings_Names_LocationFragmentDoc = gql`
  fragment Screen_Settings_Names_Location on Location {
    __typename
    id
    accessLevel
    name
    controllers {
      ...Screen_Settings_Names_Controller
    }
  }
  ${Screen_Settings_Names_ControllerFragmentDoc}
`;
export const Screen_Settings_Notifications_LocationFragmentDoc = gql`
  fragment Screen_Settings_Notifications_Location on Location {
    __typename
    id
    faultNotification {
      enabled
    }
    serviceReminder {
      enabled
      spring {
        day
        month
      }
      fall {
        day
        month
      }
    }
    controllers {
      ...Screen_Settings_Notifications_Controller
    }
  }
  ${Screen_Settings_Notifications_ControllerFragmentDoc}
`;
export const Screen_Settings_Schedule_LocationFragmentDoc = gql`
  fragment Screen_Settings_Schedule_Location on Location {
    __typename
    id
    accessLevel
    controllers {
      ...Screen_Settings_Schedule_Controller
    }
    programmable
  }
  ${Screen_Settings_Schedule_ControllerFragmentDoc}
`;
export const Screen_Settings_Support_LocationFragmentDoc = gql`
  fragment Screen_Settings_Support_Location on Location {
    __typename
    id
    name
    dealer {
      name
    }
  }
`;
export const Screen_Settings_SystemInfo_LocationFragmentDoc = gql`
  fragment Screen_Settings_SystemInfo_Location on Location {
    __typename
    id
    dealer {
      email
      name
    }
    controllers {
      ...Screen_Settings_SystemInfo_Controller
    }
    version {
      application
      bootloader
      outdoorControl
    }
  }
  ${Screen_Settings_SystemInfo_ControllerFragmentDoc}
`;
export const Screen_Settings_Vacation_LocationFragmentDoc = gql`
  fragment Screen_Settings_Vacation_Location on Location {
    __typename
    id
    controllers {
      __typename
      id
      coolRange {
        max
        min
      }
      deadband
      heatRange {
        max
        min
      }
    }
    modes
    override
    vacation {
      active
      setpoints {
        heat
        cool
      }
    }
  }
`;
export const Background_OverrideStatus_LocationFragmentDoc = gql`
  fragment Background_OverrideStatus_Location on Location {
    __typename
    id
    override
  }
`;
export const LocationFieldsFragmentDoc = gql`
  fragment LocationFields on Location {
    __typename
    ...Screen_Home_Location
    ...Screen_GrantAccess_Location
    ...Screen_NameDevice_Location
    ...Screen_SelectZone_Location
    ...Screen_Settings_Location
    ...Screen_Settings_Away_Location
    ...Screen_Settings_Dealer_Location
    ...Screen_Settings_ManageHumidities_Location
    ...Screen_Settings_Names_Location
    ...Screen_Settings_Notifications_Location
    ...Screen_Settings_Schedule_Location
    ...Screen_Settings_Support_Location
    ...Screen_Settings_SystemInfo_Location
    ...Screen_Settings_Vacation_Location
    ...Screen_Schedules_Location
    ...Component_ControlledDial_Location
    ...Background_OverrideStatus_Location
  }
  ${Screen_Home_LocationFragmentDoc}
  ${Screen_GrantAccess_LocationFragmentDoc}
  ${Screen_NameDevice_LocationFragmentDoc}
  ${Screen_SelectZone_LocationFragmentDoc}
  ${Screen_Settings_LocationFragmentDoc}
  ${Screen_Settings_Away_LocationFragmentDoc}
  ${Screen_Settings_Dealer_LocationFragmentDoc}
  ${Screen_Settings_ManageHumidities_LocationFragmentDoc}
  ${Screen_Settings_Names_LocationFragmentDoc}
  ${Screen_Settings_Notifications_LocationFragmentDoc}
  ${Screen_Settings_Schedule_LocationFragmentDoc}
  ${Screen_Settings_Support_LocationFragmentDoc}
  ${Screen_Settings_SystemInfo_LocationFragmentDoc}
  ${Screen_Settings_Vacation_LocationFragmentDoc}
  ${Screen_Schedules_LocationFragmentDoc}
  ${Component_ControlledDial_LocationFragmentDoc}
  ${Background_OverrideStatus_LocationFragmentDoc}
`;
export const Screen_AirflowConfig_LocationFragmentDoc = gql`
  fragment Screen_AirflowConfig_Location on Location {
    __typename
    id
    accessLevel
    airflow {
      __typename
      active
      max
      min
    }
    name
  }
`;
export const Screen_AirflowSettings_LocationFragmentDoc = gql`
  fragment Screen_AirflowSettings_Location on Location {
    __typename
    id
    airflow {
      __typename
      active
      max
      min
    }
    name
  }
`;
export const Screen_InstallerView_LocationFragmentDoc = gql`
  fragment Screen_InstallerView_Location on Location {
    __typename
    id
    airflow {
      __typename
    }
    connectionStatus
    controllers {
      __typename
      id
    }
    name
    share {
      __typename
      id
      accessLevel
      expiresAt
    }
    zoning
  }
`;
export const ProLocationFieldsFragmentDoc = gql`
  fragment ProLocationFields on Location {
    __typename
    ...Screen_AirflowConfig_Location
    ...Screen_AirflowSettings_Location
    ...Screen_InstallerView_Location
    ...Screen_ProHome_Location
  }
  ${Screen_AirflowConfig_LocationFragmentDoc}
  ${Screen_AirflowSettings_LocationFragmentDoc}
  ${Screen_InstallerView_LocationFragmentDoc}
  ${Screen_ProHome_LocationFragmentDoc}
`;
export const MeFieldsFragmentDoc = gql`
  fragment MeFields on User {
    __typename
    id
    accountType
    email
    temperatureUnit
  }
`;
export const ProMeFieldsFragmentDoc = gql`
  fragment ProMeFields on User {
    __typename
    id
  }
`;
export const Screen_Home_UserFragmentDoc = gql`
  fragment Screen_Home_User on User {
    __typename
    id
    email
  }
`;
export const ControllerAwayFragmentDoc = gql`
  fragment ControllerAway on Controller {
    __typename
    id
    away {
      __typename
      active
    }
    setpoints {
      __typename
      cool
      heat
    }
  }
`;
export const Component_SurveyChatModal_UserFragmentDoc = gql`
  fragment Component_SurveyChatModal_User on User {
    id
    email
  }
`;
export const StatusFragmentDoc = gql`
  fragment Status on Status {
    label
    items {
      label
      value
    }
    updatedAt
  }
`;
export const StatusFieldsFragmentDoc = gql`
  fragment StatusFields on Location {
    statusIndoor {
      ...Status
    }
    statusIndoorEEV {
      ...Status
    }
    statusOutdoor {
      ...Status
    }
    statusZone {
      ...Status
    }
  }
  ${StatusFragmentDoc}
`;
export const Screen_AdjustSchedule_ControllerFragmentDoc = gql`
  fragment Screen_AdjustSchedule_Controller on Controller {
    __typename
    id
    name
    schedule {
      day
      events {
        ...ScheduleEventFields
      }
    }
    deadband
    coolRange {
      min
      max
    }
    heatRange {
      min
      max
    }
    modes
  }
  ${ScheduleEventFieldsFragmentDoc}
`;
export const ControlledDialDocument = gql`
  query ControlledDial($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Component_ControlledDial_Controller
    }
  }
  ${Component_ControlledDial_ControllerFragmentDoc}
`;

/**
 * __useControlledDialQuery__
 *
 * To run a query within a React component, call `useControlledDialQuery` and pass it any options that fit your needs.
 * When your component renders, `useControlledDialQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useControlledDialQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useControlledDialQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ControlledDialQuery,
    ControlledDialQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ControlledDialQuery,
    ControlledDialQueryVariables
  >(ControlledDialDocument, baseOptions);
}
export function useControlledDialLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ControlledDialQuery,
    ControlledDialQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ControlledDialQuery,
    ControlledDialQueryVariables
  >(ControlledDialDocument, baseOptions);
}
export type ControlledDialQueryHookResult = ReturnType<
  typeof useControlledDialQuery
>;
export type ControlledDialLazyQueryHookResult = ReturnType<
  typeof useControlledDialLazyQuery
>;
export type ControlledDialQueryResult = ApolloReactCommon.QueryResult<
  ControlledDialQuery,
  ControlledDialQueryVariables
>;
export const ChangeDialSetpointsDocument = gql`
  mutation ChangeDialSetpoints(
    $controllerId: ID!
    $heatValue: Int!
    $coolValue: Int!
  ) {
    changeHeat: changeSetpoint(
      input: { id: $controllerId, setpoint: HEAT, value: $heatValue }
    ) {
      __typename
      ... on ChangeSetpointSuccess {
        controller {
          __typename
          id
          setpoints {
            __typename
            heat
          }
          tempOverride
        }
      }
    }
    changeCool: changeSetpoint(
      input: { id: $controllerId, setpoint: COOL, value: $coolValue }
    ) {
      __typename
      ... on ChangeSetpointSuccess {
        controller {
          __typename
          id
          setpoints {
            __typename
            cool
          }
          tempOverride
        }
      }
    }
  }
`;
export type ChangeDialSetpointsMutationFn = ApolloReactCommon.MutationFunction<
  ChangeDialSetpointsMutation,
  ChangeDialSetpointsMutationVariables
>;

/**
 * __useChangeDialSetpointsMutation__
 *
 * To run a mutation, you first call `useChangeDialSetpointsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeDialSetpointsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeDialSetpointsMutation, { data, loading, error }] = useChangeDialSetpointsMutation({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *      heatValue: // value for 'heatValue'
 *      coolValue: // value for 'coolValue'
 *   },
 * });
 */
export function useChangeDialSetpointsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeDialSetpointsMutation,
    ChangeDialSetpointsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeDialSetpointsMutation,
    ChangeDialSetpointsMutationVariables
  >(ChangeDialSetpointsDocument, baseOptions);
}
export type ChangeDialSetpointsMutationHookResult = ReturnType<
  typeof useChangeDialSetpointsMutation
>;
export type ChangeDialSetpointsMutationResult = ApolloReactCommon.MutationResult<
  ChangeDialSetpointsMutation
>;
export const RemoveLocationDocument = gql`
  mutation RemoveLocation($locationId: ID!) {
    removeLocation(input: { id: $locationId }) {
      __typename
    }
  }
`;
export type RemoveLocationMutationFn = ApolloReactCommon.MutationFunction<
  RemoveLocationMutation,
  RemoveLocationMutationVariables
>;

/**
 * __useRemoveLocationMutation__
 *
 * To run a mutation, you first call `useRemoveLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLocationMutation, { data, loading, error }] = useRemoveLocationMutation({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useRemoveLocationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveLocationMutation,
    RemoveLocationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RemoveLocationMutation,
    RemoveLocationMutationVariables
  >(RemoveLocationDocument, baseOptions);
}
export type RemoveLocationMutationHookResult = ReturnType<
  typeof useRemoveLocationMutation
>;
export type RemoveLocationMutationResult = ApolloReactCommon.MutationResult<
  RemoveLocationMutation
>;
export const RemoveAccountDocument = gql`
  mutation RemoveAccount {
    removeAccount(input: { token: "" }) {
      __typename
    }
  }
`;
export type RemoveAccountMutationFn = ApolloReactCommon.MutationFunction<
  RemoveAccountMutation,
  RemoveAccountMutationVariables
>;

/**
 * __useRemoveAccountMutation__
 *
 * To run a mutation, you first call `useRemoveAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAccountMutation, { data, loading, error }] = useRemoveAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveAccountMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveAccountMutation,
    RemoveAccountMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RemoveAccountMutation,
    RemoveAccountMutationVariables
  >(RemoveAccountDocument, baseOptions);
}
export type RemoveAccountMutationHookResult = ReturnType<
  typeof useRemoveAccountMutation
>;
export type RemoveAccountMutationResult = ApolloReactCommon.MutationResult<
  RemoveAccountMutation
>;
export const ControllersContextDocument = gql`
  query ControllersContext {
    controllers {
      ...Context_Controllers_Controller
    }
  }
  ${Context_Controllers_ControllerFragmentDoc}
`;

/**
 * __useControllersContextQuery__
 *
 * To run a query within a React component, call `useControllersContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useControllersContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useControllersContextQuery({
 *   variables: {
 *   },
 * });
 */
export function useControllersContextQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ControllersContextQuery,
    ControllersContextQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ControllersContextQuery,
    ControllersContextQueryVariables
  >(ControllersContextDocument, baseOptions);
}
export function useControllersContextLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ControllersContextQuery,
    ControllersContextQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ControllersContextQuery,
    ControllersContextQueryVariables
  >(ControllersContextDocument, baseOptions);
}
export type ControllersContextQueryHookResult = ReturnType<
  typeof useControllersContextQuery
>;
export type ControllersContextLazyQueryHookResult = ReturnType<
  typeof useControllersContextLazyQuery
>;
export type ControllersContextQueryResult = ApolloReactCommon.QueryResult<
  ControllersContextQuery,
  ControllersContextQueryVariables
>;
export const SetAppActiveDocument = gql`
  mutation SetAppActive($controllerId: ID!) {
    setAppActive(input: { id: $controllerId, active: true }) {
      __typename
    }
  }
`;
export type SetAppActiveMutationFn = ApolloReactCommon.MutationFunction<
  SetAppActiveMutation,
  SetAppActiveMutationVariables
>;

/**
 * __useSetAppActiveMutation__
 *
 * To run a mutation, you first call `useSetAppActiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAppActiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAppActiveMutation, { data, loading, error }] = useSetAppActiveMutation({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useSetAppActiveMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetAppActiveMutation,
    SetAppActiveMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SetAppActiveMutation,
    SetAppActiveMutationVariables
  >(SetAppActiveDocument, baseOptions);
}
export type SetAppActiveMutationHookResult = ReturnType<
  typeof useSetAppActiveMutation
>;
export type SetAppActiveMutationResult = ApolloReactCommon.MutationResult<
  SetAppActiveMutation
>;
export const BootstrapDocument = gql`
  query Bootstrap($platform: Platform!, $version: String!, $build: String!) {
    updateRequired(
      input: { platform: $platform, version: $version, build: $build }
    )
    me {
      ...MeFields
    }
    locations {
      ...BootstrapLocationFields
    }
    controllers {
      ...BootstrapControllerFields
    }
  }
  ${MeFieldsFragmentDoc}
  ${BootstrapLocationFieldsFragmentDoc}
  ${BootstrapControllerFieldsFragmentDoc}
`;

/**
 * __useBootstrapQuery__
 *
 * To run a query within a React component, call `useBootstrapQuery` and pass it any options that fit your needs.
 * When your component renders, `useBootstrapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBootstrapQuery({
 *   variables: {
 *      platform: // value for 'platform'
 *      version: // value for 'version'
 *      build: // value for 'build'
 *   },
 * });
 */
export function useBootstrapQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    BootstrapQuery,
    BootstrapQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<BootstrapQuery, BootstrapQueryVariables>(
    BootstrapDocument,
    baseOptions
  );
}
export function useBootstrapLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    BootstrapQuery,
    BootstrapQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<BootstrapQuery, BootstrapQueryVariables>(
    BootstrapDocument,
    baseOptions
  );
}
export type BootstrapQueryHookResult = ReturnType<typeof useBootstrapQuery>;
export type BootstrapLazyQueryHookResult = ReturnType<
  typeof useBootstrapLazyQuery
>;
export type BootstrapQueryResult = ApolloReactCommon.QueryResult<
  BootstrapQuery,
  BootstrapQueryVariables
>;
export const ProBootstrapDocument = gql`
  query ProBootstrap {
    me {
      ...ProMeFields
    }
    locations {
      ...ProBootstrapLocationFields
    }
  }
  ${ProMeFieldsFragmentDoc}
  ${ProBootstrapLocationFieldsFragmentDoc}
`;

/**
 * __useProBootstrapQuery__
 *
 * To run a query within a React component, call `useProBootstrapQuery` and pass it any options that fit your needs.
 * When your component renders, `useProBootstrapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProBootstrapQuery({
 *   variables: {
 *   },
 * });
 */
export function useProBootstrapQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ProBootstrapQuery,
    ProBootstrapQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ProBootstrapQuery,
    ProBootstrapQueryVariables
  >(ProBootstrapDocument, baseOptions);
}
export function useProBootstrapLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ProBootstrapQuery,
    ProBootstrapQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ProBootstrapQuery,
    ProBootstrapQueryVariables
  >(ProBootstrapDocument, baseOptions);
}
export type ProBootstrapQueryHookResult = ReturnType<
  typeof useProBootstrapQuery
>;
export type ProBootstrapLazyQueryHookResult = ReturnType<
  typeof useProBootstrapLazyQuery
>;
export type ProBootstrapQueryResult = ApolloReactCommon.QueryResult<
  ProBootstrapQuery,
  ProBootstrapQueryVariables
>;
export const LoadDocument = gql`
  query Load {
    controllers {
      ...ControllerFields
    }
    locations {
      ...LocationFields
    }
  }
  ${ControllerFieldsFragmentDoc}
  ${LocationFieldsFragmentDoc}
`;

/**
 * __useLoadQuery__
 *
 * To run a query within a React component, call `useLoadQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoadQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<LoadQuery, LoadQueryVariables>
) {
  return ApolloReactHooks.useQuery<LoadQuery, LoadQueryVariables>(
    LoadDocument,
    baseOptions
  );
}
export function useLoadLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LoadQuery,
    LoadQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<LoadQuery, LoadQueryVariables>(
    LoadDocument,
    baseOptions
  );
}
export type LoadQueryHookResult = ReturnType<typeof useLoadQuery>;
export type LoadLazyQueryHookResult = ReturnType<typeof useLoadLazyQuery>;
export type LoadQueryResult = ApolloReactCommon.QueryResult<
  LoadQuery,
  LoadQueryVariables
>;
export const ProLoadDocument = gql`
  query ProLoad {
    locations {
      ...ProLocationFields
    }
    controllers {
      ...ProControllerFields
    }
  }
  ${ProLocationFieldsFragmentDoc}
  ${ProControllerFieldsFragmentDoc}
`;

/**
 * __useProLoadQuery__
 *
 * To run a query within a React component, call `useProLoadQuery` and pass it any options that fit your needs.
 * When your component renders, `useProLoadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProLoadQuery({
 *   variables: {
 *   },
 * });
 */
export function useProLoadQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ProLoadQuery,
    ProLoadQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ProLoadQuery, ProLoadQueryVariables>(
    ProLoadDocument,
    baseOptions
  );
}
export function useProLoadLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ProLoadQuery,
    ProLoadQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ProLoadQuery, ProLoadQueryVariables>(
    ProLoadDocument,
    baseOptions
  );
}
export type ProLoadQueryHookResult = ReturnType<typeof useProLoadQuery>;
export type ProLoadLazyQueryHookResult = ReturnType<typeof useProLoadLazyQuery>;
export type ProLoadQueryResult = ApolloReactCommon.QueryResult<
  ProLoadQuery,
  ProLoadQueryVariables
>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      __typename
      ... on RefreshTokenSuccess {
        accessToken
        refreshToken
        ttl
      }
      ... on TokenInvalid {
        message
      }
    }
  }
`;
export type RefreshTokenMutationFn = ApolloReactCommon.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, baseOptions);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult = ApolloReactCommon.MutationResult<
  RefreshTokenMutation
>;
export const SubscribeToNotificationsDocument = gql`
  mutation SubscribeToNotifications($input: SubscribeToNotificationsInput!) {
    subscribeToNotifications(input: $input) {
      __typename
      ... on SubscribeToNotificationsSuccess {
        pushToken {
          id
          platform
          status
          token
        }
      }
    }
  }
`;
export type SubscribeToNotificationsMutationFn = ApolloReactCommon.MutationFunction<
  SubscribeToNotificationsMutation,
  SubscribeToNotificationsMutationVariables
>;

/**
 * __useSubscribeToNotificationsMutation__
 *
 * To run a mutation, you first call `useSubscribeToNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeToNotificationsMutation, { data, loading, error }] = useSubscribeToNotificationsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubscribeToNotificationsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SubscribeToNotificationsMutation,
    SubscribeToNotificationsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SubscribeToNotificationsMutation,
    SubscribeToNotificationsMutationVariables
  >(SubscribeToNotificationsDocument, baseOptions);
}
export type SubscribeToNotificationsMutationHookResult = ReturnType<
  typeof useSubscribeToNotificationsMutation
>;
export type SubscribeToNotificationsMutationResult = ApolloReactCommon.MutationResult<
  SubscribeToNotificationsMutation
>;
export const UnsubscribeFromNotificationsDocument = gql`
  mutation UnsubscribeFromNotifications(
    $input: UnsubscribeFromNotificationsInput!
  ) {
    unsubscribeFromNotifications(input: $input) {
      __typename
    }
  }
`;
export type UnsubscribeFromNotificationsMutationFn = ApolloReactCommon.MutationFunction<
  UnsubscribeFromNotificationsMutation,
  UnsubscribeFromNotificationsMutationVariables
>;

/**
 * __useUnsubscribeFromNotificationsMutation__
 *
 * To run a mutation, you first call `useUnsubscribeFromNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeFromNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeFromNotificationsMutation, { data, loading, error }] = useUnsubscribeFromNotificationsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnsubscribeFromNotificationsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UnsubscribeFromNotificationsMutation,
    UnsubscribeFromNotificationsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UnsubscribeFromNotificationsMutation,
    UnsubscribeFromNotificationsMutationVariables
  >(UnsubscribeFromNotificationsDocument, baseOptions);
}
export type UnsubscribeFromNotificationsMutationHookResult = ReturnType<
  typeof useUnsubscribeFromNotificationsMutation
>;
export type UnsubscribeFromNotificationsMutationResult = ApolloReactCommon.MutationResult<
  UnsubscribeFromNotificationsMutation
>;
export const RequestRatingDocument = gql`
  query RequestRating(
    $build: String!
    $installedAt: String!
    $lastDisplayedAt: String
    $platform: Platform!
    $version: String!
  ) {
    requestRating(
      input: {
        build: $build
        installedAt: $installedAt
        lastDisplayedAt: $lastDisplayedAt
        platform: $platform
        version: $version
      }
    )
  }
`;

/**
 * __useRequestRatingQuery__
 *
 * To run a query within a React component, call `useRequestRatingQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestRatingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestRatingQuery({
 *   variables: {
 *      build: // value for 'build'
 *      installedAt: // value for 'installedAt'
 *      lastDisplayedAt: // value for 'lastDisplayedAt'
 *      platform: // value for 'platform'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useRequestRatingQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RequestRatingQuery,
    RequestRatingQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    RequestRatingQuery,
    RequestRatingQueryVariables
  >(RequestRatingDocument, baseOptions);
}
export function useRequestRatingLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RequestRatingQuery,
    RequestRatingQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    RequestRatingQuery,
    RequestRatingQueryVariables
  >(RequestRatingDocument, baseOptions);
}
export type RequestRatingQueryHookResult = ReturnType<
  typeof useRequestRatingQuery
>;
export type RequestRatingLazyQueryHookResult = ReturnType<
  typeof useRequestRatingLazyQuery
>;
export type RequestRatingQueryResult = ApolloReactCommon.QueryResult<
  RequestRatingQuery,
  RequestRatingQueryVariables
>;
export const RequestSurveyFeedbackDocument = gql`
  query RequestSurveyFeedback(
    $build: String!
    $installedAt: String!
    $lastDisplayedAt: String
    $lastResponseAt: String
    $platform: Platform!
    $version: String!
  ) {
    requestSurveyFeedback(
      input: {
        build: $build
        installedAt: $installedAt
        lastDisplayedAt: $lastDisplayedAt
        lastResponseAt: $lastResponseAt
        platform: $platform
        version: $version
      }
    )
  }
`;

/**
 * __useRequestSurveyFeedbackQuery__
 *
 * To run a query within a React component, call `useRequestSurveyFeedbackQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestSurveyFeedbackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestSurveyFeedbackQuery({
 *   variables: {
 *      build: // value for 'build'
 *      installedAt: // value for 'installedAt'
 *      lastDisplayedAt: // value for 'lastDisplayedAt'
 *      lastResponseAt: // value for 'lastResponseAt'
 *      platform: // value for 'platform'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useRequestSurveyFeedbackQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RequestSurveyFeedbackQuery,
    RequestSurveyFeedbackQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    RequestSurveyFeedbackQuery,
    RequestSurveyFeedbackQueryVariables
  >(RequestSurveyFeedbackDocument, baseOptions);
}
export function useRequestSurveyFeedbackLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RequestSurveyFeedbackQuery,
    RequestSurveyFeedbackQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    RequestSurveyFeedbackQuery,
    RequestSurveyFeedbackQueryVariables
  >(RequestSurveyFeedbackDocument, baseOptions);
}
export type RequestSurveyFeedbackQueryHookResult = ReturnType<
  typeof useRequestSurveyFeedbackQuery
>;
export type RequestSurveyFeedbackLazyQueryHookResult = ReturnType<
  typeof useRequestSurveyFeedbackLazyQuery
>;
export type RequestSurveyFeedbackQueryResult = ApolloReactCommon.QueryResult<
  RequestSurveyFeedbackQuery,
  RequestSurveyFeedbackQueryVariables
>;
export const RequestSurveySessionDocument = gql`
  mutation RequestSurveySession {
    requestSurveySession {
      __typename
      userId
      userName
      sessionToken
      sessionExpiresAt
    }
  }
`;
export type RequestSurveySessionMutationFn = ApolloReactCommon.MutationFunction<
  RequestSurveySessionMutation,
  RequestSurveySessionMutationVariables
>;

/**
 * __useRequestSurveySessionMutation__
 *
 * To run a mutation, you first call `useRequestSurveySessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestSurveySessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestSurveySessionMutation, { data, loading, error }] = useRequestSurveySessionMutation({
 *   variables: {
 *   },
 * });
 */
export function useRequestSurveySessionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RequestSurveySessionMutation,
    RequestSurveySessionMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RequestSurveySessionMutation,
    RequestSurveySessionMutationVariables
  >(RequestSurveySessionDocument, baseOptions);
}
export type RequestSurveySessionMutationHookResult = ReturnType<
  typeof useRequestSurveySessionMutation
>;
export type RequestSurveySessionMutationResult = ApolloReactCommon.MutationResult<
  RequestSurveySessionMutation
>;
export const NameDeviceDocument = gql`
  query NameDevice($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_NameDevice_Location
    }
  }
  ${Screen_NameDevice_LocationFragmentDoc}
`;

/**
 * __useNameDeviceQuery__
 *
 * To run a query within a React component, call `useNameDeviceQuery` and pass it any options that fit your needs.
 * When your component renders, `useNameDeviceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNameDeviceQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useNameDeviceQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    NameDeviceQuery,
    NameDeviceQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<NameDeviceQuery, NameDeviceQueryVariables>(
    NameDeviceDocument,
    baseOptions
  );
}
export function useNameDeviceLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    NameDeviceQuery,
    NameDeviceQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    NameDeviceQuery,
    NameDeviceQueryVariables
  >(NameDeviceDocument, baseOptions);
}
export type NameDeviceQueryHookResult = ReturnType<typeof useNameDeviceQuery>;
export type NameDeviceLazyQueryHookResult = ReturnType<
  typeof useNameDeviceLazyQuery
>;
export type NameDeviceQueryResult = ApolloReactCommon.QueryResult<
  NameDeviceQuery,
  NameDeviceQueryVariables
>;
export const RenameControllerDocument = gql`
  mutation RenameController($input: RenameControllerInput!) {
    renameController(input: $input) {
      __typename
      ... on RenameControllerSuccess {
        controller {
          ...ControllerFields
        }
      }
    }
  }
  ${ControllerFieldsFragmentDoc}
`;
export type RenameControllerMutationFn = ApolloReactCommon.MutationFunction<
  RenameControllerMutation,
  RenameControllerMutationVariables
>;

/**
 * __useRenameControllerMutation__
 *
 * To run a mutation, you first call `useRenameControllerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameControllerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameControllerMutation, { data, loading, error }] = useRenameControllerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRenameControllerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RenameControllerMutation,
    RenameControllerMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RenameControllerMutation,
    RenameControllerMutationVariables
  >(RenameControllerDocument, baseOptions);
}
export type RenameControllerMutationHookResult = ReturnType<
  typeof useRenameControllerMutation
>;
export type RenameControllerMutationResult = ApolloReactCommon.MutationResult<
  RenameControllerMutation
>;
export const RenameLocationDocument = gql`
  mutation RenameLocation($input: RenameLocationInput!) {
    renameLocation(input: $input) {
      __typename
      ... on RenameLocationSuccess {
        location {
          ...LocationFields
        }
      }
    }
  }
  ${LocationFieldsFragmentDoc}
`;
export type RenameLocationMutationFn = ApolloReactCommon.MutationFunction<
  RenameLocationMutation,
  RenameLocationMutationVariables
>;

/**
 * __useRenameLocationMutation__
 *
 * To run a mutation, you first call `useRenameLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameLocationMutation, { data, loading, error }] = useRenameLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRenameLocationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RenameLocationMutation,
    RenameLocationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RenameLocationMutation,
    RenameLocationMutationVariables
  >(RenameLocationDocument, baseOptions);
}
export type RenameLocationMutationHookResult = ReturnType<
  typeof useRenameLocationMutation
>;
export type RenameLocationMutationResult = ApolloReactCommon.MutationResult<
  RenameLocationMutation
>;
export const HomeDocument = gql`
  query Home($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_Home_Controller
    }
    controllers {
      id
      location {
        id
      }
    }
    me {
      ...Screen_Home_User
    }
  }
  ${Screen_Home_ControllerFragmentDoc}
  ${Screen_Home_UserFragmentDoc}
`;

/**
 * __useHomeQuery__
 *
 * To run a query within a React component, call `useHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useHomeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<HomeQuery, HomeQueryVariables>
) {
  return ApolloReactHooks.useQuery<HomeQuery, HomeQueryVariables>(
    HomeDocument,
    baseOptions
  );
}
export function useHomeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    HomeQuery,
    HomeQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<HomeQuery, HomeQueryVariables>(
    HomeDocument,
    baseOptions
  );
}
export type HomeQueryHookResult = ReturnType<typeof useHomeQuery>;
export type HomeLazyQueryHookResult = ReturnType<typeof useHomeLazyQuery>;
export type HomeQueryResult = ApolloReactCommon.QueryResult<
  HomeQuery,
  HomeQueryVariables
>;
export const CancelTemperatureHoldDocument = gql`
  mutation CancelTemperatureHold($input: CancelTemperatureHoldInput!) {
    cancelTemperatureHold(input: $input) {
      __typename
      ... on CancelTemperatureHoldSuccess {
        controller {
          __typename
          id
          setpoints {
            cool
            heat
          }
          tempOverride
        }
      }
    }
  }
`;
export type CancelTemperatureHoldMutationFn = ApolloReactCommon.MutationFunction<
  CancelTemperatureHoldMutation,
  CancelTemperatureHoldMutationVariables
>;

/**
 * __useCancelTemperatureHoldMutation__
 *
 * To run a mutation, you first call `useCancelTemperatureHoldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelTemperatureHoldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelTemperatureHoldMutation, { data, loading, error }] = useCancelTemperatureHoldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelTemperatureHoldMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CancelTemperatureHoldMutation,
    CancelTemperatureHoldMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CancelTemperatureHoldMutation,
    CancelTemperatureHoldMutationVariables
  >(CancelTemperatureHoldDocument, baseOptions);
}
export type CancelTemperatureHoldMutationHookResult = ReturnType<
  typeof useCancelTemperatureHoldMutation
>;
export type CancelTemperatureHoldMutationResult = ApolloReactCommon.MutationResult<
  CancelTemperatureHoldMutation
>;
export const CancelFanHoldDocument = gql`
  mutation CancelFanHold($input: CancelFanHoldInput!) {
    cancelFanHold(input: $input) {
      __typename
      ... on CancelFanHoldSuccess {
        controller {
          __typename
          id
          fan {
            mode
            override
          }
        }
      }
    }
  }
`;
export type CancelFanHoldMutationFn = ApolloReactCommon.MutationFunction<
  CancelFanHoldMutation,
  CancelFanHoldMutationVariables
>;

/**
 * __useCancelFanHoldMutation__
 *
 * To run a mutation, you first call `useCancelFanHoldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelFanHoldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelFanHoldMutation, { data, loading, error }] = useCancelFanHoldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelFanHoldMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CancelFanHoldMutation,
    CancelFanHoldMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CancelFanHoldMutation,
    CancelFanHoldMutationVariables
  >(CancelFanHoldDocument, baseOptions);
}
export type CancelFanHoldMutationHookResult = ReturnType<
  typeof useCancelFanHoldMutation
>;
export type CancelFanHoldMutationResult = ApolloReactCommon.MutationResult<
  CancelFanHoldMutation
>;
export const SelectFanDocument = gql`
  query SelectFan($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_ChangeFanMode_Controller
    }
  }
  ${Screen_ChangeFanMode_ControllerFragmentDoc}
`;

/**
 * __useSelectFanQuery__
 *
 * To run a query within a React component, call `useSelectFanQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectFanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectFanQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useSelectFanQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SelectFanQuery,
    SelectFanQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SelectFanQuery, SelectFanQueryVariables>(
    SelectFanDocument,
    baseOptions
  );
}
export function useSelectFanLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SelectFanQuery,
    SelectFanQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<SelectFanQuery, SelectFanQueryVariables>(
    SelectFanDocument,
    baseOptions
  );
}
export type SelectFanQueryHookResult = ReturnType<typeof useSelectFanQuery>;
export type SelectFanLazyQueryHookResult = ReturnType<
  typeof useSelectFanLazyQuery
>;
export type SelectFanQueryResult = ApolloReactCommon.QueryResult<
  SelectFanQuery,
  SelectFanQueryVariables
>;
export const ChangeFanModeDocument = gql`
  mutation ChangeFanMode($input: ChangeFanModeInput!) {
    changeFanMode(input: $input) {
      __typename
      ... on ChangeFanModeSuccess {
        controller {
          ...Screen_ChangeFanMode_Controller
        }
      }
    }
  }
  ${Screen_ChangeFanMode_ControllerFragmentDoc}
`;
export type ChangeFanModeMutationFn = ApolloReactCommon.MutationFunction<
  ChangeFanModeMutation,
  ChangeFanModeMutationVariables
>;

/**
 * __useChangeFanModeMutation__
 *
 * To run a mutation, you first call `useChangeFanModeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeFanModeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeFanModeMutation, { data, loading, error }] = useChangeFanModeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeFanModeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeFanModeMutation,
    ChangeFanModeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeFanModeMutation,
    ChangeFanModeMutationVariables
  >(ChangeFanModeDocument, baseOptions);
}
export type ChangeFanModeMutationHookResult = ReturnType<
  typeof useChangeFanModeMutation
>;
export type ChangeFanModeMutationResult = ApolloReactCommon.MutationResult<
  ChangeFanModeMutation
>;
export const ChangeFanCfmDocument = gql`
  mutation ChangeFanCfm($input: ChangeFanCfmInput!) {
    changeFanCfm(input: $input) {
      __typename
      ... on ChangeFanCfmSuccess {
        location {
          __typename
          id
          controllers {
            ...Screen_ChangeFanMode_Controller
          }
          controller {
            ...Screen_ChangeFanMode_Controller
          }
        }
      }
    }
  }
  ${Screen_ChangeFanMode_ControllerFragmentDoc}
`;
export type ChangeFanCfmMutationFn = ApolloReactCommon.MutationFunction<
  ChangeFanCfmMutation,
  ChangeFanCfmMutationVariables
>;

/**
 * __useChangeFanCfmMutation__
 *
 * To run a mutation, you first call `useChangeFanCfmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeFanCfmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeFanCfmMutation, { data, loading, error }] = useChangeFanCfmMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeFanCfmMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeFanCfmMutation,
    ChangeFanCfmMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeFanCfmMutation,
    ChangeFanCfmMutationVariables
  >(ChangeFanCfmDocument, baseOptions);
}
export type ChangeFanCfmMutationHookResult = ReturnType<
  typeof useChangeFanCfmMutation
>;
export type ChangeFanCfmMutationResult = ApolloReactCommon.MutationResult<
  ChangeFanCfmMutation
>;
export const SelectModeDocument = gql`
  query SelectMode($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_SelectMode_Controller
    }
  }
  ${Screen_SelectMode_ControllerFragmentDoc}
`;

/**
 * __useSelectModeQuery__
 *
 * To run a query within a React component, call `useSelectModeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectModeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectModeQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useSelectModeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SelectModeQuery,
    SelectModeQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SelectModeQuery, SelectModeQueryVariables>(
    SelectModeDocument,
    baseOptions
  );
}
export function useSelectModeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SelectModeQuery,
    SelectModeQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SelectModeQuery,
    SelectModeQueryVariables
  >(SelectModeDocument, baseOptions);
}
export type SelectModeQueryHookResult = ReturnType<typeof useSelectModeQuery>;
export type SelectModeLazyQueryHookResult = ReturnType<
  typeof useSelectModeLazyQuery
>;
export type SelectModeQueryResult = ApolloReactCommon.QueryResult<
  SelectModeQuery,
  SelectModeQueryVariables
>;
export const ChangeModeDocument = gql`
  mutation ChangeMode($input: ChangeModeInput!) {
    changeMode(input: $input) {
      __typename
      ... on ChangeModeSuccess {
        controller {
          ...Screen_SelectMode_Controller
        }
      }
    }
  }
  ${Screen_SelectMode_ControllerFragmentDoc}
`;
export type ChangeModeMutationFn = ApolloReactCommon.MutationFunction<
  ChangeModeMutation,
  ChangeModeMutationVariables
>;

/**
 * __useChangeModeMutation__
 *
 * To run a mutation, you first call `useChangeModeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeModeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeModeMutation, { data, loading, error }] = useChangeModeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeModeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeModeMutation,
    ChangeModeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeModeMutation,
    ChangeModeMutationVariables
  >(ChangeModeDocument, baseOptions);
}
export type ChangeModeMutationHookResult = ReturnType<
  typeof useChangeModeMutation
>;
export type ChangeModeMutationResult = ApolloReactCommon.MutationResult<
  ChangeModeMutation
>;
export const ChangeAwayDocument = gql`
  mutation ChangeAway($input: ChangeAwayInput!) {
    changeAway(input: $input) {
      __typename
      ... on ChangeAwaySuccess {
        controller {
          ...ControllerAway
        }
      }
    }
  }
  ${ControllerAwayFragmentDoc}
`;
export type ChangeAwayMutationFn = ApolloReactCommon.MutationFunction<
  ChangeAwayMutation,
  ChangeAwayMutationVariables
>;

/**
 * __useChangeAwayMutation__
 *
 * To run a mutation, you first call `useChangeAwayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAwayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAwayMutation, { data, loading, error }] = useChangeAwayMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeAwayMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeAwayMutation,
    ChangeAwayMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeAwayMutation,
    ChangeAwayMutationVariables
  >(ChangeAwayDocument, baseOptions);
}
export type ChangeAwayMutationHookResult = ReturnType<
  typeof useChangeAwayMutation
>;
export type ChangeAwayMutationResult = ApolloReactCommon.MutationResult<
  ChangeAwayMutation
>;
export const ChangeLocationAwayDocument = gql`
  mutation ChangeLocationAway($input: ChangeLocationAwayInput!) {
    changeLocationAway(input: $input) {
      __typename
      ... on ChangeLocationAwaySuccess {
        location {
          __typename
          id
          controllers {
            ...ControllerAway
          }
          override
        }
      }
    }
  }
  ${ControllerAwayFragmentDoc}
`;
export type ChangeLocationAwayMutationFn = ApolloReactCommon.MutationFunction<
  ChangeLocationAwayMutation,
  ChangeLocationAwayMutationVariables
>;

/**
 * __useChangeLocationAwayMutation__
 *
 * To run a mutation, you first call `useChangeLocationAwayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeLocationAwayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeLocationAwayMutation, { data, loading, error }] = useChangeLocationAwayMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeLocationAwayMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeLocationAwayMutation,
    ChangeLocationAwayMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeLocationAwayMutation,
    ChangeLocationAwayMutationVariables
  >(ChangeLocationAwayDocument, baseOptions);
}
export type ChangeLocationAwayMutationHookResult = ReturnType<
  typeof useChangeLocationAwayMutation
>;
export type ChangeLocationAwayMutationResult = ApolloReactCommon.MutationResult<
  ChangeLocationAwayMutation
>;
export const SelectZoneDocument = gql`
  query SelectZone {
    locations {
      ...Screen_SelectZone_Location
    }
  }
  ${Screen_SelectZone_LocationFragmentDoc}
`;

/**
 * __useSelectZoneQuery__
 *
 * To run a query within a React component, call `useSelectZoneQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelectZoneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelectZoneQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelectZoneQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SelectZoneQuery,
    SelectZoneQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SelectZoneQuery, SelectZoneQueryVariables>(
    SelectZoneDocument,
    baseOptions
  );
}
export function useSelectZoneLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SelectZoneQuery,
    SelectZoneQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SelectZoneQuery,
    SelectZoneQueryVariables
  >(SelectZoneDocument, baseOptions);
}
export type SelectZoneQueryHookResult = ReturnType<typeof useSelectZoneQuery>;
export type SelectZoneLazyQueryHookResult = ReturnType<
  typeof useSelectZoneLazyQuery
>;
export type SelectZoneQueryResult = ApolloReactCommon.QueryResult<
  SelectZoneQuery,
  SelectZoneQueryVariables
>;
export const SurveyChatModalDocument = gql`
  query SurveyChatModal {
    me {
      ...Component_SurveyChatModal_User
    }
  }
  ${Component_SurveyChatModal_UserFragmentDoc}
`;

/**
 * __useSurveyChatModalQuery__
 *
 * To run a query within a React component, call `useSurveyChatModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useSurveyChatModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSurveyChatModalQuery({
 *   variables: {
 *   },
 * });
 */
export function useSurveyChatModalQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SurveyChatModalQuery,
    SurveyChatModalQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    SurveyChatModalQuery,
    SurveyChatModalQueryVariables
  >(SurveyChatModalDocument, baseOptions);
}
export function useSurveyChatModalLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SurveyChatModalQuery,
    SurveyChatModalQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SurveyChatModalQuery,
    SurveyChatModalQueryVariables
  >(SurveyChatModalDocument, baseOptions);
}
export type SurveyChatModalQueryHookResult = ReturnType<
  typeof useSurveyChatModalQuery
>;
export type SurveyChatModalLazyQueryHookResult = ReturnType<
  typeof useSurveyChatModalLazyQuery
>;
export type SurveyChatModalQueryResult = ApolloReactCommon.QueryResult<
  SurveyChatModalQuery,
  SurveyChatModalQueryVariables
>;
export const AirflowConfigDocument = gql`
  query AirflowConfig($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_AirflowConfig_Location
      controllers {
        ...Screen_AirflowConfig_Controller
      }
    }
  }
  ${Screen_AirflowConfig_LocationFragmentDoc}
  ${Screen_AirflowConfig_ControllerFragmentDoc}
`;

/**
 * __useAirflowConfigQuery__
 *
 * To run a query within a React component, call `useAirflowConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirflowConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirflowConfigQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useAirflowConfigQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AirflowConfigQuery,
    AirflowConfigQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    AirflowConfigQuery,
    AirflowConfigQueryVariables
  >(AirflowConfigDocument, baseOptions);
}
export function useAirflowConfigLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AirflowConfigQuery,
    AirflowConfigQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    AirflowConfigQuery,
    AirflowConfigQueryVariables
  >(AirflowConfigDocument, baseOptions);
}
export type AirflowConfigQueryHookResult = ReturnType<
  typeof useAirflowConfigQuery
>;
export type AirflowConfigLazyQueryHookResult = ReturnType<
  typeof useAirflowConfigLazyQuery
>;
export type AirflowConfigQueryResult = ApolloReactCommon.QueryResult<
  AirflowConfigQuery,
  AirflowConfigQueryVariables
>;
export const AirflowSettingsDocument = gql`
  query AirflowSettings($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_AirflowSettings_Controller
      location {
        ...Screen_AirflowSettings_Location
      }
    }
  }
  ${Screen_AirflowSettings_ControllerFragmentDoc}
  ${Screen_AirflowSettings_LocationFragmentDoc}
`;

/**
 * __useAirflowSettingsQuery__
 *
 * To run a query within a React component, call `useAirflowSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirflowSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirflowSettingsQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useAirflowSettingsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AirflowSettingsQuery,
    AirflowSettingsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    AirflowSettingsQuery,
    AirflowSettingsQueryVariables
  >(AirflowSettingsDocument, baseOptions);
}
export function useAirflowSettingsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AirflowSettingsQuery,
    AirflowSettingsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    AirflowSettingsQuery,
    AirflowSettingsQueryVariables
  >(AirflowSettingsDocument, baseOptions);
}
export type AirflowSettingsQueryHookResult = ReturnType<
  typeof useAirflowSettingsQuery
>;
export type AirflowSettingsLazyQueryHookResult = ReturnType<
  typeof useAirflowSettingsLazyQuery
>;
export type AirflowSettingsQueryResult = ApolloReactCommon.QueryResult<
  AirflowSettingsQuery,
  AirflowSettingsQueryVariables
>;
export const ChangeAirflowDocument = gql`
  mutation ChangeAirflow($controllerId: ID!, $value: Int!) {
    changeAirflow(input: { id: $controllerId, value: $value }) {
      __typename
      ... on ChangeAirflowSuccess {
        controller {
          ...Screen_AirflowSettings_Controller
        }
      }
    }
  }
  ${Screen_AirflowSettings_ControllerFragmentDoc}
`;
export type ChangeAirflowMutationFn = ApolloReactCommon.MutationFunction<
  ChangeAirflowMutation,
  ChangeAirflowMutationVariables
>;

/**
 * __useChangeAirflowMutation__
 *
 * To run a mutation, you first call `useChangeAirflowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAirflowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAirflowMutation, { data, loading, error }] = useChangeAirflowMutation({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useChangeAirflowMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeAirflowMutation,
    ChangeAirflowMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeAirflowMutation,
    ChangeAirflowMutationVariables
  >(ChangeAirflowDocument, baseOptions);
}
export type ChangeAirflowMutationHookResult = ReturnType<
  typeof useChangeAirflowMutation
>;
export type ChangeAirflowMutationResult = ApolloReactCommon.MutationResult<
  ChangeAirflowMutation
>;
export const StartAirflowTestDocument = gql`
  mutation StartAirflowTest($controllerId: ID!) {
    toggleAirflowTest(input: { id: $controllerId, running: true }) {
      __typename
      ... on ToggleAirflowTestSuccess {
        controller {
          ...Screen_AirflowSettings_Controller
        }
      }
    }
  }
  ${Screen_AirflowSettings_ControllerFragmentDoc}
`;
export type StartAirflowTestMutationFn = ApolloReactCommon.MutationFunction<
  StartAirflowTestMutation,
  StartAirflowTestMutationVariables
>;

/**
 * __useStartAirflowTestMutation__
 *
 * To run a mutation, you first call `useStartAirflowTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartAirflowTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startAirflowTestMutation, { data, loading, error }] = useStartAirflowTestMutation({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useStartAirflowTestMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    StartAirflowTestMutation,
    StartAirflowTestMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    StartAirflowTestMutation,
    StartAirflowTestMutationVariables
  >(StartAirflowTestDocument, baseOptions);
}
export type StartAirflowTestMutationHookResult = ReturnType<
  typeof useStartAirflowTestMutation
>;
export type StartAirflowTestMutationResult = ApolloReactCommon.MutationResult<
  StartAirflowTestMutation
>;
export const StopAirflowTestDocument = gql`
  mutation StopAirflowTest($controllerId: ID!) {
    toggleAirflowTest(input: { id: $controllerId, running: false }) {
      __typename
      ... on ToggleAirflowTestSuccess {
        controller {
          ...Screen_AirflowSettings_Controller
        }
      }
    }
  }
  ${Screen_AirflowSettings_ControllerFragmentDoc}
`;
export type StopAirflowTestMutationFn = ApolloReactCommon.MutationFunction<
  StopAirflowTestMutation,
  StopAirflowTestMutationVariables
>;

/**
 * __useStopAirflowTestMutation__
 *
 * To run a mutation, you first call `useStopAirflowTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopAirflowTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopAirflowTestMutation, { data, loading, error }] = useStopAirflowTestMutation({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useStopAirflowTestMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    StopAirflowTestMutation,
    StopAirflowTestMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    StopAirflowTestMutation,
    StopAirflowTestMutationVariables
  >(StopAirflowTestDocument, baseOptions);
}
export type StopAirflowTestMutationHookResult = ReturnType<
  typeof useStopAirflowTestMutation
>;
export type StopAirflowTestMutationResult = ApolloReactCommon.MutationResult<
  StopAirflowTestMutation
>;
export const EquipmentStatusDocument = gql`
  query EquipmentStatus($locationId: ID!) {
    location(id: $locationId) {
      __typename
      id
      ...StatusFields
    }
  }
  ${StatusFieldsFragmentDoc}
`;

/**
 * __useEquipmentStatusQuery__
 *
 * To run a query within a React component, call `useEquipmentStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useEquipmentStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEquipmentStatusQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useEquipmentStatusQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    EquipmentStatusQuery,
    EquipmentStatusQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    EquipmentStatusQuery,
    EquipmentStatusQueryVariables
  >(EquipmentStatusDocument, baseOptions);
}
export function useEquipmentStatusLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    EquipmentStatusQuery,
    EquipmentStatusQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    EquipmentStatusQuery,
    EquipmentStatusQueryVariables
  >(EquipmentStatusDocument, baseOptions);
}
export type EquipmentStatusQueryHookResult = ReturnType<
  typeof useEquipmentStatusQuery
>;
export type EquipmentStatusLazyQueryHookResult = ReturnType<
  typeof useEquipmentStatusLazyQuery
>;
export type EquipmentStatusQueryResult = ApolloReactCommon.QueryResult<
  EquipmentStatusQuery,
  EquipmentStatusQueryVariables
>;
export const RefreshStatusDocument = gql`
  mutation RefreshStatus($locationId: ID!) {
    refreshStatus(input: { id: $locationId }) {
      __typename
      ... on RefreshStatusSuccess {
        location {
          __typename
          id
          ...StatusFields
        }
      }
    }
  }
  ${StatusFieldsFragmentDoc}
`;
export type RefreshStatusMutationFn = ApolloReactCommon.MutationFunction<
  RefreshStatusMutation,
  RefreshStatusMutationVariables
>;

/**
 * __useRefreshStatusMutation__
 *
 * To run a mutation, you first call `useRefreshStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshStatusMutation, { data, loading, error }] = useRefreshStatusMutation({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useRefreshStatusMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RefreshStatusMutation,
    RefreshStatusMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RefreshStatusMutation,
    RefreshStatusMutationVariables
  >(RefreshStatusDocument, baseOptions);
}
export type RefreshStatusMutationHookResult = ReturnType<
  typeof useRefreshStatusMutation
>;
export type RefreshStatusMutationResult = ApolloReactCommon.MutationResult<
  RefreshStatusMutation
>;
export const InstallerViewDocument = gql`
  query InstallerView($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_InstallerView_Location
    }
  }
  ${Screen_InstallerView_LocationFragmentDoc}
`;

/**
 * __useInstallerViewQuery__
 *
 * To run a query within a React component, call `useInstallerViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstallerViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstallerViewQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useInstallerViewQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    InstallerViewQuery,
    InstallerViewQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    InstallerViewQuery,
    InstallerViewQueryVariables
  >(InstallerViewDocument, baseOptions);
}
export function useInstallerViewLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    InstallerViewQuery,
    InstallerViewQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    InstallerViewQuery,
    InstallerViewQueryVariables
  >(InstallerViewDocument, baseOptions);
}
export type InstallerViewQueryHookResult = ReturnType<
  typeof useInstallerViewQuery
>;
export type InstallerViewLazyQueryHookResult = ReturnType<
  typeof useInstallerViewLazyQuery
>;
export type InstallerViewQueryResult = ApolloReactCommon.QueryResult<
  InstallerViewQuery,
  InstallerViewQueryVariables
>;
export const ReturnAccessDocument = gql`
  mutation ReturnAccess($shareId: ID!) {
    revokeShare(input: { id: $shareId }) {
      __typename
    }
  }
`;
export type ReturnAccessMutationFn = ApolloReactCommon.MutationFunction<
  ReturnAccessMutation,
  ReturnAccessMutationVariables
>;

/**
 * __useReturnAccessMutation__
 *
 * To run a mutation, you first call `useReturnAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReturnAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [returnAccessMutation, { data, loading, error }] = useReturnAccessMutation({
 *   variables: {
 *      shareId: // value for 'shareId'
 *   },
 * });
 */
export function useReturnAccessMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ReturnAccessMutation,
    ReturnAccessMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ReturnAccessMutation,
    ReturnAccessMutationVariables
  >(ReturnAccessDocument, baseOptions);
}
export type ReturnAccessMutationHookResult = ReturnType<
  typeof useReturnAccessMutation
>;
export type ReturnAccessMutationResult = ApolloReactCommon.MutationResult<
  ReturnAccessMutation
>;
export const ProHomeDocument = gql`
  query ProHome {
    locations {
      ...Screen_ProHome_Location
    }
  }
  ${Screen_ProHome_LocationFragmentDoc}
`;

/**
 * __useProHomeQuery__
 *
 * To run a query within a React component, call `useProHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useProHomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProHomeQuery({
 *   variables: {
 *   },
 * });
 */
export function useProHomeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ProHomeQuery,
    ProHomeQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ProHomeQuery, ProHomeQueryVariables>(
    ProHomeDocument,
    baseOptions
  );
}
export function useProHomeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ProHomeQuery,
    ProHomeQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ProHomeQuery, ProHomeQueryVariables>(
    ProHomeDocument,
    baseOptions
  );
}
export type ProHomeQueryHookResult = ReturnType<typeof useProHomeQuery>;
export type ProHomeLazyQueryHookResult = ReturnType<typeof useProHomeLazyQuery>;
export type ProHomeQueryResult = ApolloReactCommon.QueryResult<
  ProHomeQuery,
  ProHomeQueryVariables
>;
export const LocationItemDocument = gql`
  query LocationItem($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_ProHome_Location
    }
  }
  ${Screen_ProHome_LocationFragmentDoc}
`;

/**
 * __useLocationItemQuery__
 *
 * To run a query within a React component, call `useLocationItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationItemQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useLocationItemQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LocationItemQuery,
    LocationItemQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    LocationItemQuery,
    LocationItemQueryVariables
  >(LocationItemDocument, baseOptions);
}
export function useLocationItemLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LocationItemQuery,
    LocationItemQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    LocationItemQuery,
    LocationItemQueryVariables
  >(LocationItemDocument, baseOptions);
}
export type LocationItemQueryHookResult = ReturnType<
  typeof useLocationItemQuery
>;
export type LocationItemLazyQueryHookResult = ReturnType<
  typeof useLocationItemLazyQuery
>;
export type LocationItemQueryResult = ApolloReactCommon.QueryResult<
  LocationItemQuery,
  LocationItemQueryVariables
>;
export const RequestShareDocument = gql`
  mutation RequestShare($input: RequestShareInput!) {
    requestShare(input: $input) {
      __typename
    }
  }
`;
export type RequestShareMutationFn = ApolloReactCommon.MutationFunction<
  RequestShareMutation,
  RequestShareMutationVariables
>;

/**
 * __useRequestShareMutation__
 *
 * To run a mutation, you first call `useRequestShareMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestShareMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestShareMutation, { data, loading, error }] = useRequestShareMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestShareMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RequestShareMutation,
    RequestShareMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RequestShareMutation,
    RequestShareMutationVariables
  >(RequestShareDocument, baseOptions);
}
export type RequestShareMutationHookResult = ReturnType<
  typeof useRequestShareMutation
>;
export type RequestShareMutationResult = ApolloReactCommon.MutationResult<
  RequestShareMutation
>;
export const WelcomeDocument = gql`
  query Welcome {
    controllers {
      id
    }
  }
`;

/**
 * __useWelcomeQuery__
 *
 * To run a query within a React component, call `useWelcomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useWelcomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWelcomeQuery({
 *   variables: {
 *   },
 * });
 */
export function useWelcomeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    WelcomeQuery,
    WelcomeQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<WelcomeQuery, WelcomeQueryVariables>(
    WelcomeDocument,
    baseOptions
  );
}
export function useWelcomeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    WelcomeQuery,
    WelcomeQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<WelcomeQuery, WelcomeQueryVariables>(
    WelcomeDocument,
    baseOptions
  );
}
export type WelcomeQueryHookResult = ReturnType<typeof useWelcomeQuery>;
export type WelcomeLazyQueryHookResult = ReturnType<typeof useWelcomeLazyQuery>;
export type WelcomeQueryResult = ApolloReactCommon.QueryResult<
  WelcomeQuery,
  WelcomeQueryVariables
>;
export const AdjustScheduleDocument = gql`
  query AdjustSchedule($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_AdjustSchedule_Controller
    }
  }
  ${Screen_AdjustSchedule_ControllerFragmentDoc}
`;

/**
 * __useAdjustScheduleQuery__
 *
 * To run a query within a React component, call `useAdjustScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdjustScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdjustScheduleQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useAdjustScheduleQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AdjustScheduleQuery,
    AdjustScheduleQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    AdjustScheduleQuery,
    AdjustScheduleQueryVariables
  >(AdjustScheduleDocument, baseOptions);
}
export function useAdjustScheduleLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AdjustScheduleQuery,
    AdjustScheduleQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    AdjustScheduleQuery,
    AdjustScheduleQueryVariables
  >(AdjustScheduleDocument, baseOptions);
}
export type AdjustScheduleQueryHookResult = ReturnType<
  typeof useAdjustScheduleQuery
>;
export type AdjustScheduleLazyQueryHookResult = ReturnType<
  typeof useAdjustScheduleLazyQuery
>;
export type AdjustScheduleQueryResult = ApolloReactCommon.QueryResult<
  AdjustScheduleQuery,
  AdjustScheduleQueryVariables
>;
export const AddLeaveArriveDocument = gql`
  mutation AddLeaveArrive($input: AddLeaveArriveInput!) {
    addLeaveArrive(input: $input) {
      __typename
      ... on AddLeaveArriveSuccess {
        controller {
          ...Screen_AdjustSchedule_Controller
        }
      }
    }
  }
  ${Screen_AdjustSchedule_ControllerFragmentDoc}
`;
export type AddLeaveArriveMutationFn = ApolloReactCommon.MutationFunction<
  AddLeaveArriveMutation,
  AddLeaveArriveMutationVariables
>;

/**
 * __useAddLeaveArriveMutation__
 *
 * To run a mutation, you first call `useAddLeaveArriveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLeaveArriveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLeaveArriveMutation, { data, loading, error }] = useAddLeaveArriveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddLeaveArriveMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddLeaveArriveMutation,
    AddLeaveArriveMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddLeaveArriveMutation,
    AddLeaveArriveMutationVariables
  >(AddLeaveArriveDocument, baseOptions);
}
export type AddLeaveArriveMutationHookResult = ReturnType<
  typeof useAddLeaveArriveMutation
>;
export type AddLeaveArriveMutationResult = ApolloReactCommon.MutationResult<
  AddLeaveArriveMutation
>;
export const ChangeScheduleDocument = gql`
  mutation ChangeSchedule($input: ChangeScheduleInput!) {
    changeSchedule(input: $input) {
      __typename
      ... on ChangeScheduleSuccess {
        controller {
          ...Screen_AdjustSchedule_Controller
        }
      }
    }
  }
  ${Screen_AdjustSchedule_ControllerFragmentDoc}
`;
export type ChangeScheduleMutationFn = ApolloReactCommon.MutationFunction<
  ChangeScheduleMutation,
  ChangeScheduleMutationVariables
>;

/**
 * __useChangeScheduleMutation__
 *
 * To run a mutation, you first call `useChangeScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeScheduleMutation, { data, loading, error }] = useChangeScheduleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeScheduleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeScheduleMutation,
    ChangeScheduleMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeScheduleMutation,
    ChangeScheduleMutationVariables
  >(ChangeScheduleDocument, baseOptions);
}
export type ChangeScheduleMutationHookResult = ReturnType<
  typeof useChangeScheduleMutation
>;
export type ChangeScheduleMutationResult = ApolloReactCommon.MutationResult<
  ChangeScheduleMutation
>;
export const RemoveLeaveArriveDocument = gql`
  mutation RemoveLeaveArrive($input: RemoveLeaveArriveInput!) {
    removeLeaveArrive(input: $input) {
      __typename
      ... on RemoveLeaveArriveSuccess {
        controller {
          ...Screen_AdjustSchedule_Controller
        }
      }
    }
  }
  ${Screen_AdjustSchedule_ControllerFragmentDoc}
`;
export type RemoveLeaveArriveMutationFn = ApolloReactCommon.MutationFunction<
  RemoveLeaveArriveMutation,
  RemoveLeaveArriveMutationVariables
>;

/**
 * __useRemoveLeaveArriveMutation__
 *
 * To run a mutation, you first call `useRemoveLeaveArriveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLeaveArriveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLeaveArriveMutation, { data, loading, error }] = useRemoveLeaveArriveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveLeaveArriveMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveLeaveArriveMutation,
    RemoveLeaveArriveMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RemoveLeaveArriveMutation,
    RemoveLeaveArriveMutationVariables
  >(RemoveLeaveArriveDocument, baseOptions);
}
export type RemoveLeaveArriveMutationHookResult = ReturnType<
  typeof useRemoveLeaveArriveMutation
>;
export type RemoveLeaveArriveMutationResult = ApolloReactCommon.MutationResult<
  RemoveLeaveArriveMutation
>;
export const CopyScheduleDocument = gql`
  query CopySchedule($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_CopySchedule_Controller
    }
  }
  ${Screen_CopySchedule_ControllerFragmentDoc}
`;

/**
 * __useCopyScheduleQuery__
 *
 * To run a query within a React component, call `useCopyScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCopyScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCopyScheduleQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useCopyScheduleQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CopyScheduleQuery,
    CopyScheduleQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    CopyScheduleQuery,
    CopyScheduleQueryVariables
  >(CopyScheduleDocument, baseOptions);
}
export function useCopyScheduleLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CopyScheduleQuery,
    CopyScheduleQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    CopyScheduleQuery,
    CopyScheduleQueryVariables
  >(CopyScheduleDocument, baseOptions);
}
export type CopyScheduleQueryHookResult = ReturnType<
  typeof useCopyScheduleQuery
>;
export type CopyScheduleLazyQueryHookResult = ReturnType<
  typeof useCopyScheduleLazyQuery
>;
export type CopyScheduleQueryResult = ApolloReactCommon.QueryResult<
  CopyScheduleQuery,
  CopyScheduleQueryVariables
>;
export const MakeScheduleCopyDocument = gql`
  mutation MakeScheduleCopy($input: CopyScheduleInput!) {
    copySchedule(input: $input) {
      __typename
      ... on CopyScheduleSuccess {
        controller {
          ...Screen_CopySchedule_Controller
        }
      }
    }
  }
  ${Screen_CopySchedule_ControllerFragmentDoc}
`;
export type MakeScheduleCopyMutationFn = ApolloReactCommon.MutationFunction<
  MakeScheduleCopyMutation,
  MakeScheduleCopyMutationVariables
>;

/**
 * __useMakeScheduleCopyMutation__
 *
 * To run a mutation, you first call `useMakeScheduleCopyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeScheduleCopyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeScheduleCopyMutation, { data, loading, error }] = useMakeScheduleCopyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMakeScheduleCopyMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    MakeScheduleCopyMutation,
    MakeScheduleCopyMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    MakeScheduleCopyMutation,
    MakeScheduleCopyMutationVariables
  >(MakeScheduleCopyDocument, baseOptions);
}
export type MakeScheduleCopyMutationHookResult = ReturnType<
  typeof useMakeScheduleCopyMutation
>;
export type MakeScheduleCopyMutationResult = ApolloReactCommon.MutationResult<
  MakeScheduleCopyMutation
>;
export const SchedulesDocument = gql`
  query Schedules($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_Schedules_Controller
    }
    controllers {
      id
      location {
        id
      }
    }
  }
  ${Screen_Schedules_ControllerFragmentDoc}
`;

/**
 * __useSchedulesQuery__
 *
 * To run a query within a React component, call `useSchedulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchedulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchedulesQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useSchedulesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SchedulesQuery,
    SchedulesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SchedulesQuery, SchedulesQueryVariables>(
    SchedulesDocument,
    baseOptions
  );
}
export function useSchedulesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SchedulesQuery,
    SchedulesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<SchedulesQuery, SchedulesQueryVariables>(
    SchedulesDocument,
    baseOptions
  );
}
export type SchedulesQueryHookResult = ReturnType<typeof useSchedulesQuery>;
export type SchedulesLazyQueryHookResult = ReturnType<
  typeof useSchedulesLazyQuery
>;
export type SchedulesQueryResult = ApolloReactCommon.QueryResult<
  SchedulesQuery,
  SchedulesQueryVariables
>;
export const EnableProgrammableDocument = gql`
  mutation EnableProgrammable($locationId: ID!) {
    changeProgrammable(input: { id: $locationId, programmable: true }) {
      __typename
      ... on ChangeProgrammableSuccess {
        location {
          ...Screen_Schedules_Location
        }
      }
    }
  }
  ${Screen_Schedules_LocationFragmentDoc}
`;
export type EnableProgrammableMutationFn = ApolloReactCommon.MutationFunction<
  EnableProgrammableMutation,
  EnableProgrammableMutationVariables
>;

/**
 * __useEnableProgrammableMutation__
 *
 * To run a mutation, you first call `useEnableProgrammableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableProgrammableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableProgrammableMutation, { data, loading, error }] = useEnableProgrammableMutation({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useEnableProgrammableMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EnableProgrammableMutation,
    EnableProgrammableMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    EnableProgrammableMutation,
    EnableProgrammableMutationVariables
  >(EnableProgrammableDocument, baseOptions);
}
export type EnableProgrammableMutationHookResult = ReturnType<
  typeof useEnableProgrammableMutation
>;
export type EnableProgrammableMutationResult = ApolloReactCommon.MutationResult<
  EnableProgrammableMutation
>;
export const SettingsDocument = gql`
  query Settings {
    locations {
      ...Screen_Settings_Location
    }
  }
  ${Screen_Settings_LocationFragmentDoc}
`;

/**
 * __useSettingsQuery__
 *
 * To run a query within a React component, call `useSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SettingsQuery,
    SettingsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SettingsQuery, SettingsQueryVariables>(
    SettingsDocument,
    baseOptions
  );
}
export function useSettingsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SettingsQuery,
    SettingsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<SettingsQuery, SettingsQueryVariables>(
    SettingsDocument,
    baseOptions
  );
}
export type SettingsQueryHookResult = ReturnType<typeof useSettingsQuery>;
export type SettingsLazyQueryHookResult = ReturnType<
  typeof useSettingsLazyQuery
>;
export type SettingsQueryResult = ApolloReactCommon.QueryResult<
  SettingsQuery,
  SettingsQueryVariables
>;
export const SettingsLocationDocument = gql`
  query SettingsLocation($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_Settings_Location
    }
  }
  ${Screen_Settings_LocationFragmentDoc}
`;

/**
 * __useSettingsLocationQuery__
 *
 * To run a query within a React component, call `useSettingsLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsLocationQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useSettingsLocationQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SettingsLocationQuery,
    SettingsLocationQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    SettingsLocationQuery,
    SettingsLocationQueryVariables
  >(SettingsLocationDocument, baseOptions);
}
export function useSettingsLocationLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SettingsLocationQuery,
    SettingsLocationQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SettingsLocationQuery,
    SettingsLocationQueryVariables
  >(SettingsLocationDocument, baseOptions);
}
export type SettingsLocationQueryHookResult = ReturnType<
  typeof useSettingsLocationQuery
>;
export type SettingsLocationLazyQueryHookResult = ReturnType<
  typeof useSettingsLocationLazyQuery
>;
export type SettingsLocationQueryResult = ApolloReactCommon.QueryResult<
  SettingsLocationQuery,
  SettingsLocationQueryVariables
>;
export const ChangeTemperatureUnitDocument = gql`
  mutation ChangeTemperatureUnit($input: ChangeTemperatureUnitInput!) {
    changeTemperatureUnit(input: $input) {
      __typename
      ... on ChangeTemperatureUnitSuccess {
        user {
          __typename
          id
          temperatureUnit
        }
      }
    }
  }
`;
export type ChangeTemperatureUnitMutationFn = ApolloReactCommon.MutationFunction<
  ChangeTemperatureUnitMutation,
  ChangeTemperatureUnitMutationVariables
>;

/**
 * __useChangeTemperatureUnitMutation__
 *
 * To run a mutation, you first call `useChangeTemperatureUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeTemperatureUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeTemperatureUnitMutation, { data, loading, error }] = useChangeTemperatureUnitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeTemperatureUnitMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeTemperatureUnitMutation,
    ChangeTemperatureUnitMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeTemperatureUnitMutation,
    ChangeTemperatureUnitMutationVariables
  >(ChangeTemperatureUnitDocument, baseOptions);
}
export type ChangeTemperatureUnitMutationHookResult = ReturnType<
  typeof useChangeTemperatureUnitMutation
>;
export type ChangeTemperatureUnitMutationResult = ApolloReactCommon.MutationResult<
  ChangeTemperatureUnitMutation
>;
export const GenerateLoginTokenDocument = gql`
  mutation GenerateLoginToken {
    generateLoginToken {
      __typename
      ... on GenerateLoginTokenSuccess {
        token
      }
    }
  }
`;
export type GenerateLoginTokenMutationFn = ApolloReactCommon.MutationFunction<
  GenerateLoginTokenMutation,
  GenerateLoginTokenMutationVariables
>;

/**
 * __useGenerateLoginTokenMutation__
 *
 * To run a mutation, you first call `useGenerateLoginTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateLoginTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateLoginTokenMutation, { data, loading, error }] = useGenerateLoginTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateLoginTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GenerateLoginTokenMutation,
    GenerateLoginTokenMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    GenerateLoginTokenMutation,
    GenerateLoginTokenMutationVariables
  >(GenerateLoginTokenDocument, baseOptions);
}
export type GenerateLoginTokenMutationHookResult = ReturnType<
  typeof useGenerateLoginTokenMutation
>;
export type GenerateLoginTokenMutationResult = ApolloReactCommon.MutationResult<
  GenerateLoginTokenMutation
>;
export const AwayControllerDocument = gql`
  query AwayController($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_Settings_Away_Controller
    }
  }
  ${Screen_Settings_Away_ControllerFragmentDoc}
`;

/**
 * __useAwayControllerQuery__
 *
 * To run a query within a React component, call `useAwayControllerQuery` and pass it any options that fit your needs.
 * When your component renders, `useAwayControllerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAwayControllerQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useAwayControllerQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AwayControllerQuery,
    AwayControllerQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    AwayControllerQuery,
    AwayControllerQueryVariables
  >(AwayControllerDocument, baseOptions);
}
export function useAwayControllerLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AwayControllerQuery,
    AwayControllerQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    AwayControllerQuery,
    AwayControllerQueryVariables
  >(AwayControllerDocument, baseOptions);
}
export type AwayControllerQueryHookResult = ReturnType<
  typeof useAwayControllerQuery
>;
export type AwayControllerLazyQueryHookResult = ReturnType<
  typeof useAwayControllerLazyQuery
>;
export type AwayControllerQueryResult = ApolloReactCommon.QueryResult<
  AwayControllerQuery,
  AwayControllerQueryVariables
>;
export const AwayLocationDocument = gql`
  query AwayLocation($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_Settings_Away_Location
    }
  }
  ${Screen_Settings_Away_LocationFragmentDoc}
`;

/**
 * __useAwayLocationQuery__
 *
 * To run a query within a React component, call `useAwayLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useAwayLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAwayLocationQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useAwayLocationQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AwayLocationQuery,
    AwayLocationQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    AwayLocationQuery,
    AwayLocationQueryVariables
  >(AwayLocationDocument, baseOptions);
}
export function useAwayLocationLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AwayLocationQuery,
    AwayLocationQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    AwayLocationQuery,
    AwayLocationQueryVariables
  >(AwayLocationDocument, baseOptions);
}
export type AwayLocationQueryHookResult = ReturnType<
  typeof useAwayLocationQuery
>;
export type AwayLocationLazyQueryHookResult = ReturnType<
  typeof useAwayLocationLazyQuery
>;
export type AwayLocationQueryResult = ApolloReactCommon.QueryResult<
  AwayLocationQuery,
  AwayLocationQueryVariables
>;
export const ChangeAwaySetpointsDocument = gql`
  mutation ChangeAwaySetpoints($input: ChangeAwaySetpointsInput!) {
    changeAwaySetpoints(input: $input) {
      __typename
      ... on ChangeAwaySetpointsSuccess {
        controller {
          ...Screen_Settings_Away_Controller
        }
      }
    }
  }
  ${Screen_Settings_Away_ControllerFragmentDoc}
`;
export type ChangeAwaySetpointsMutationFn = ApolloReactCommon.MutationFunction<
  ChangeAwaySetpointsMutation,
  ChangeAwaySetpointsMutationVariables
>;

/**
 * __useChangeAwaySetpointsMutation__
 *
 * To run a mutation, you first call `useChangeAwaySetpointsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAwaySetpointsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAwaySetpointsMutation, { data, loading, error }] = useChangeAwaySetpointsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeAwaySetpointsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeAwaySetpointsMutation,
    ChangeAwaySetpointsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeAwaySetpointsMutation,
    ChangeAwaySetpointsMutationVariables
  >(ChangeAwaySetpointsDocument, baseOptions);
}
export type ChangeAwaySetpointsMutationHookResult = ReturnType<
  typeof useChangeAwaySetpointsMutation
>;
export type ChangeAwaySetpointsMutationResult = ApolloReactCommon.MutationResult<
  ChangeAwaySetpointsMutation
>;
export const DealerDocument = gql`
  query Dealer($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_Settings_Dealer_Location
    }
  }
  ${Screen_Settings_Dealer_LocationFragmentDoc}
`;

/**
 * __useDealerQuery__
 *
 * To run a query within a React component, call `useDealerQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDealerQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useDealerQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    DealerQuery,
    DealerQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<DealerQuery, DealerQueryVariables>(
    DealerDocument,
    baseOptions
  );
}
export function useDealerLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    DealerQuery,
    DealerQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<DealerQuery, DealerQueryVariables>(
    DealerDocument,
    baseOptions
  );
}
export type DealerQueryHookResult = ReturnType<typeof useDealerQuery>;
export type DealerLazyQueryHookResult = ReturnType<typeof useDealerLazyQuery>;
export type DealerQueryResult = ApolloReactCommon.QueryResult<
  DealerQuery,
  DealerQueryVariables
>;
export const ShareLocationDocument = gql`
  mutation ShareLocation($input: ShareLocationInput!) {
    shareLocation(input: $input) {
      __typename
      ... on ShareLocationSuccess {
        location {
          ...Screen_Settings_Dealer_Location
        }
      }
      ... on InvalidEmail {
        message
      }
    }
  }
  ${Screen_Settings_Dealer_LocationFragmentDoc}
`;
export type ShareLocationMutationFn = ApolloReactCommon.MutationFunction<
  ShareLocationMutation,
  ShareLocationMutationVariables
>;

/**
 * __useShareLocationMutation__
 *
 * To run a mutation, you first call `useShareLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShareLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shareLocationMutation, { data, loading, error }] = useShareLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useShareLocationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ShareLocationMutation,
    ShareLocationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ShareLocationMutation,
    ShareLocationMutationVariables
  >(ShareLocationDocument, baseOptions);
}
export type ShareLocationMutationHookResult = ReturnType<
  typeof useShareLocationMutation
>;
export type ShareLocationMutationResult = ApolloReactCommon.MutationResult<
  ShareLocationMutation
>;
export const RevokeShareDocument = gql`
  mutation RevokeShare($input: RevokeShareInput!) {
    revokeShare(input: $input) {
      __typename
      ... on RevokeShareSuccess {
        location {
          ...Screen_Settings_Dealer_Location
        }
      }
    }
  }
  ${Screen_Settings_Dealer_LocationFragmentDoc}
`;
export type RevokeShareMutationFn = ApolloReactCommon.MutationFunction<
  RevokeShareMutation,
  RevokeShareMutationVariables
>;

/**
 * __useRevokeShareMutation__
 *
 * To run a mutation, you first call `useRevokeShareMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeShareMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeShareMutation, { data, loading, error }] = useRevokeShareMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRevokeShareMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RevokeShareMutation,
    RevokeShareMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RevokeShareMutation,
    RevokeShareMutationVariables
  >(RevokeShareDocument, baseOptions);
}
export type RevokeShareMutationHookResult = ReturnType<
  typeof useRevokeShareMutation
>;
export type RevokeShareMutationResult = ApolloReactCommon.MutationResult<
  RevokeShareMutation
>;
export const ChangeDealerDocument = gql`
  mutation ChangeDealer($input: ChangeDealerInput!) {
    changeDealer(input: $input) {
      __typename
      ... on ChangeDealerSuccess {
        location {
          ...Screen_Settings_Dealer_Location
        }
      }
    }
  }
  ${Screen_Settings_Dealer_LocationFragmentDoc}
`;
export type ChangeDealerMutationFn = ApolloReactCommon.MutationFunction<
  ChangeDealerMutation,
  ChangeDealerMutationVariables
>;

/**
 * __useChangeDealerMutation__
 *
 * To run a mutation, you first call `useChangeDealerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeDealerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeDealerMutation, { data, loading, error }] = useChangeDealerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeDealerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeDealerMutation,
    ChangeDealerMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeDealerMutation,
    ChangeDealerMutationVariables
  >(ChangeDealerDocument, baseOptions);
}
export type ChangeDealerMutationHookResult = ReturnType<
  typeof useChangeDealerMutation
>;
export type ChangeDealerMutationResult = ApolloReactCommon.MutationResult<
  ChangeDealerMutation
>;
export const GrantAccessDocument = gql`
  query GrantAccess($locationId: ID!, $includeLocation: Boolean!) {
    location(id: $locationId) @include(if: $includeLocation) {
      ...Screen_GrantAccess_Location
    }
    locations {
      ...Screen_GrantAccess_Location
    }
  }
  ${Screen_GrantAccess_LocationFragmentDoc}
`;

/**
 * __useGrantAccessQuery__
 *
 * To run a query within a React component, call `useGrantAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGrantAccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGrantAccessQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *      includeLocation: // value for 'includeLocation'
 *   },
 * });
 */
export function useGrantAccessQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GrantAccessQuery,
    GrantAccessQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GrantAccessQuery, GrantAccessQueryVariables>(
    GrantAccessDocument,
    baseOptions
  );
}
export function useGrantAccessLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GrantAccessQuery,
    GrantAccessQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GrantAccessQuery,
    GrantAccessQueryVariables
  >(GrantAccessDocument, baseOptions);
}
export type GrantAccessQueryHookResult = ReturnType<typeof useGrantAccessQuery>;
export type GrantAccessLazyQueryHookResult = ReturnType<
  typeof useGrantAccessLazyQuery
>;
export type GrantAccessQueryResult = ApolloReactCommon.QueryResult<
  GrantAccessQuery,
  GrantAccessQueryVariables
>;
export const HumidityControllerDocument = gql`
  query HumidityController($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_Settings_ManageHumidities_Controller
    }
  }
  ${Screen_Settings_ManageHumidities_ControllerFragmentDoc}
`;

/**
 * __useHumidityControllerQuery__
 *
 * To run a query within a React component, call `useHumidityControllerQuery` and pass it any options that fit your needs.
 * When your component renders, `useHumidityControllerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHumidityControllerQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useHumidityControllerQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    HumidityControllerQuery,
    HumidityControllerQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    HumidityControllerQuery,
    HumidityControllerQueryVariables
  >(HumidityControllerDocument, baseOptions);
}
export function useHumidityControllerLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    HumidityControllerQuery,
    HumidityControllerQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    HumidityControllerQuery,
    HumidityControllerQueryVariables
  >(HumidityControllerDocument, baseOptions);
}
export type HumidityControllerQueryHookResult = ReturnType<
  typeof useHumidityControllerQuery
>;
export type HumidityControllerLazyQueryHookResult = ReturnType<
  typeof useHumidityControllerLazyQuery
>;
export type HumidityControllerQueryResult = ApolloReactCommon.QueryResult<
  HumidityControllerQuery,
  HumidityControllerQueryVariables
>;
export const HumiditLocationDocument = gql`
  query HumiditLocation($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_Settings_ManageHumidities_Location
    }
  }
  ${Screen_Settings_ManageHumidities_LocationFragmentDoc}
`;

/**
 * __useHumiditLocationQuery__
 *
 * To run a query within a React component, call `useHumiditLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useHumiditLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHumiditLocationQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useHumiditLocationQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    HumiditLocationQuery,
    HumiditLocationQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    HumiditLocationQuery,
    HumiditLocationQueryVariables
  >(HumiditLocationDocument, baseOptions);
}
export function useHumiditLocationLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    HumiditLocationQuery,
    HumiditLocationQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    HumiditLocationQuery,
    HumiditLocationQueryVariables
  >(HumiditLocationDocument, baseOptions);
}
export type HumiditLocationQueryHookResult = ReturnType<
  typeof useHumiditLocationQuery
>;
export type HumiditLocationLazyQueryHookResult = ReturnType<
  typeof useHumiditLocationLazyQuery
>;
export type HumiditLocationQueryResult = ApolloReactCommon.QueryResult<
  HumiditLocationQuery,
  HumiditLocationQueryVariables
>;
export const ChangeHumidificationModeDocument = gql`
  mutation ChangeHumidificationMode($input: ChangeHumidificationModeInput!) {
    changeHumidificationMode(input: $input) {
      __typename
      ... on ChangeHumidificationModeSuccess {
        controller {
          __typename
          id
          humidification {
            ...HumidificationFields
          }
        }
      }
    }
  }
  ${HumidificationFieldsFragmentDoc}
`;
export type ChangeHumidificationModeMutationFn = ApolloReactCommon.MutationFunction<
  ChangeHumidificationModeMutation,
  ChangeHumidificationModeMutationVariables
>;

/**
 * __useChangeHumidificationModeMutation__
 *
 * To run a mutation, you first call `useChangeHumidificationModeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeHumidificationModeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeHumidificationModeMutation, { data, loading, error }] = useChangeHumidificationModeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeHumidificationModeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeHumidificationModeMutation,
    ChangeHumidificationModeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeHumidificationModeMutation,
    ChangeHumidificationModeMutationVariables
  >(ChangeHumidificationModeDocument, baseOptions);
}
export type ChangeHumidificationModeMutationHookResult = ReturnType<
  typeof useChangeHumidificationModeMutation
>;
export type ChangeHumidificationModeMutationResult = ApolloReactCommon.MutationResult<
  ChangeHumidificationModeMutation
>;
export const ChangeDehumidificationModeDocument = gql`
  mutation ChangeDehumidificationMode($input: ChangeHumidificationModeInput!) {
    changeDehumidificationMode(input: $input) {
      __typename
      ... on ChangeHumidificationModeSuccess {
        controller {
          __typename
          id
          dehumidification {
            ...HumidificationFields
          }
        }
      }
    }
  }
  ${HumidificationFieldsFragmentDoc}
`;
export type ChangeDehumidificationModeMutationFn = ApolloReactCommon.MutationFunction<
  ChangeDehumidificationModeMutation,
  ChangeDehumidificationModeMutationVariables
>;

/**
 * __useChangeDehumidificationModeMutation__
 *
 * To run a mutation, you first call `useChangeDehumidificationModeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeDehumidificationModeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeDehumidificationModeMutation, { data, loading, error }] = useChangeDehumidificationModeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeDehumidificationModeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeDehumidificationModeMutation,
    ChangeDehumidificationModeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeDehumidificationModeMutation,
    ChangeDehumidificationModeMutationVariables
  >(ChangeDehumidificationModeDocument, baseOptions);
}
export type ChangeDehumidificationModeMutationHookResult = ReturnType<
  typeof useChangeDehumidificationModeMutation
>;
export type ChangeDehumidificationModeMutationResult = ApolloReactCommon.MutationResult<
  ChangeDehumidificationModeMutation
>;
export const ChangeHumidificationDocument = gql`
  mutation ChangeHumidification($input: ChangeHumidificationInput!) {
    changeHumidification(input: $input) {
      __typename
      ... on ChangeHumidificationSuccess {
        controller {
          __typename
          id
          humidification {
            ...HumidificationFields
          }
        }
      }
    }
  }
  ${HumidificationFieldsFragmentDoc}
`;
export type ChangeHumidificationMutationFn = ApolloReactCommon.MutationFunction<
  ChangeHumidificationMutation,
  ChangeHumidificationMutationVariables
>;

/**
 * __useChangeHumidificationMutation__
 *
 * To run a mutation, you first call `useChangeHumidificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeHumidificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeHumidificationMutation, { data, loading, error }] = useChangeHumidificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeHumidificationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeHumidificationMutation,
    ChangeHumidificationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeHumidificationMutation,
    ChangeHumidificationMutationVariables
  >(ChangeHumidificationDocument, baseOptions);
}
export type ChangeHumidificationMutationHookResult = ReturnType<
  typeof useChangeHumidificationMutation
>;
export type ChangeHumidificationMutationResult = ApolloReactCommon.MutationResult<
  ChangeHumidificationMutation
>;
export const ChangeDehumidificationDocument = gql`
  mutation ChangeDehumidification($input: ChangeHumidificationInput!) {
    changeDehumidification(input: $input) {
      __typename
      ... on ChangeHumidificationSuccess {
        controller {
          __typename
          id
          dehumidification {
            ...HumidificationFields
          }
        }
      }
    }
  }
  ${HumidificationFieldsFragmentDoc}
`;
export type ChangeDehumidificationMutationFn = ApolloReactCommon.MutationFunction<
  ChangeDehumidificationMutation,
  ChangeDehumidificationMutationVariables
>;

/**
 * __useChangeDehumidificationMutation__
 *
 * To run a mutation, you first call `useChangeDehumidificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeDehumidificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeDehumidificationMutation, { data, loading, error }] = useChangeDehumidificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeDehumidificationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeDehumidificationMutation,
    ChangeDehumidificationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeDehumidificationMutation,
    ChangeDehumidificationMutationVariables
  >(ChangeDehumidificationDocument, baseOptions);
}
export type ChangeDehumidificationMutationHookResult = ReturnType<
  typeof useChangeDehumidificationMutation
>;
export type ChangeDehumidificationMutationResult = ApolloReactCommon.MutationResult<
  ChangeDehumidificationMutation
>;
export const NamesDocument = gql`
  query Names($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_Settings_Names_Location
    }
  }
  ${Screen_Settings_Names_LocationFragmentDoc}
`;

/**
 * __useNamesQuery__
 *
 * To run a query within a React component, call `useNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNamesQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useNamesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    NamesQuery,
    NamesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<NamesQuery, NamesQueryVariables>(
    NamesDocument,
    baseOptions
  );
}
export function useNamesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    NamesQuery,
    NamesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<NamesQuery, NamesQueryVariables>(
    NamesDocument,
    baseOptions
  );
}
export type NamesQueryHookResult = ReturnType<typeof useNamesQuery>;
export type NamesLazyQueryHookResult = ReturnType<typeof useNamesLazyQuery>;
export type NamesQueryResult = ApolloReactCommon.QueryResult<
  NamesQuery,
  NamesQueryVariables
>;
export const ControllerNameDocument = gql`
  query ControllerName($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_Settings_Names_Controller
    }
  }
  ${Screen_Settings_Names_ControllerFragmentDoc}
`;

/**
 * __useControllerNameQuery__
 *
 * To run a query within a React component, call `useControllerNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useControllerNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useControllerNameQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useControllerNameQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ControllerNameQuery,
    ControllerNameQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ControllerNameQuery,
    ControllerNameQueryVariables
  >(ControllerNameDocument, baseOptions);
}
export function useControllerNameLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ControllerNameQuery,
    ControllerNameQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ControllerNameQuery,
    ControllerNameQueryVariables
  >(ControllerNameDocument, baseOptions);
}
export type ControllerNameQueryHookResult = ReturnType<
  typeof useControllerNameQuery
>;
export type ControllerNameLazyQueryHookResult = ReturnType<
  typeof useControllerNameLazyQuery
>;
export type ControllerNameQueryResult = ApolloReactCommon.QueryResult<
  ControllerNameQuery,
  ControllerNameQueryVariables
>;
export const RenameLocationSettingsDocument = gql`
  mutation RenameLocationSettings($input: RenameLocationInput!) {
    renameLocation(input: $input) {
      __typename
      ... on RenameLocationSuccess {
        location {
          ...Screen_Settings_Names_Location
        }
      }
    }
  }
  ${Screen_Settings_Names_LocationFragmentDoc}
`;
export type RenameLocationSettingsMutationFn = ApolloReactCommon.MutationFunction<
  RenameLocationSettingsMutation,
  RenameLocationSettingsMutationVariables
>;

/**
 * __useRenameLocationSettingsMutation__
 *
 * To run a mutation, you first call `useRenameLocationSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameLocationSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameLocationSettingsMutation, { data, loading, error }] = useRenameLocationSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRenameLocationSettingsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RenameLocationSettingsMutation,
    RenameLocationSettingsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RenameLocationSettingsMutation,
    RenameLocationSettingsMutationVariables
  >(RenameLocationSettingsDocument, baseOptions);
}
export type RenameLocationSettingsMutationHookResult = ReturnType<
  typeof useRenameLocationSettingsMutation
>;
export type RenameLocationSettingsMutationResult = ApolloReactCommon.MutationResult<
  RenameLocationSettingsMutation
>;
export const RenameControllerSettingsDocument = gql`
  mutation RenameControllerSettings($input: RenameControllerInput!) {
    renameController(input: $input) {
      __typename
      ... on RenameControllerSuccess {
        controller {
          ...Screen_Settings_Names_Controller
        }
      }
    }
  }
  ${Screen_Settings_Names_ControllerFragmentDoc}
`;
export type RenameControllerSettingsMutationFn = ApolloReactCommon.MutationFunction<
  RenameControllerSettingsMutation,
  RenameControllerSettingsMutationVariables
>;

/**
 * __useRenameControllerSettingsMutation__
 *
 * To run a mutation, you first call `useRenameControllerSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameControllerSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameControllerSettingsMutation, { data, loading, error }] = useRenameControllerSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRenameControllerSettingsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RenameControllerSettingsMutation,
    RenameControllerSettingsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RenameControllerSettingsMutation,
    RenameControllerSettingsMutationVariables
  >(RenameControllerSettingsDocument, baseOptions);
}
export type RenameControllerSettingsMutationHookResult = ReturnType<
  typeof useRenameControllerSettingsMutation
>;
export type RenameControllerSettingsMutationResult = ApolloReactCommon.MutationResult<
  RenameControllerSettingsMutation
>;
export const LocationNotificationsDocument = gql`
  query LocationNotifications($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_Settings_Notifications_Location
    }
  }
  ${Screen_Settings_Notifications_LocationFragmentDoc}
`;

/**
 * __useLocationNotificationsQuery__
 *
 * To run a query within a React component, call `useLocationNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationNotificationsQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useLocationNotificationsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LocationNotificationsQuery,
    LocationNotificationsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    LocationNotificationsQuery,
    LocationNotificationsQueryVariables
  >(LocationNotificationsDocument, baseOptions);
}
export function useLocationNotificationsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LocationNotificationsQuery,
    LocationNotificationsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    LocationNotificationsQuery,
    LocationNotificationsQueryVariables
  >(LocationNotificationsDocument, baseOptions);
}
export type LocationNotificationsQueryHookResult = ReturnType<
  typeof useLocationNotificationsQuery
>;
export type LocationNotificationsLazyQueryHookResult = ReturnType<
  typeof useLocationNotificationsLazyQuery
>;
export type LocationNotificationsQueryResult = ApolloReactCommon.QueryResult<
  LocationNotificationsQuery,
  LocationNotificationsQueryVariables
>;
export const ControllerNotificationsDocument = gql`
  query ControllerNotifications($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_Settings_Notifications_Controller
    }
  }
  ${Screen_Settings_Notifications_ControllerFragmentDoc}
`;

/**
 * __useControllerNotificationsQuery__
 *
 * To run a query within a React component, call `useControllerNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useControllerNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useControllerNotificationsQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useControllerNotificationsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ControllerNotificationsQuery,
    ControllerNotificationsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    ControllerNotificationsQuery,
    ControllerNotificationsQueryVariables
  >(ControllerNotificationsDocument, baseOptions);
}
export function useControllerNotificationsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ControllerNotificationsQuery,
    ControllerNotificationsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    ControllerNotificationsQuery,
    ControllerNotificationsQueryVariables
  >(ControllerNotificationsDocument, baseOptions);
}
export type ControllerNotificationsQueryHookResult = ReturnType<
  typeof useControllerNotificationsQuery
>;
export type ControllerNotificationsLazyQueryHookResult = ReturnType<
  typeof useControllerNotificationsLazyQuery
>;
export type ControllerNotificationsQueryResult = ApolloReactCommon.QueryResult<
  ControllerNotificationsQuery,
  ControllerNotificationsQueryVariables
>;
export const ToggleTemperatureNotificationDocument = gql`
  mutation ToggleTemperatureNotification(
    $input: ToggleTemperatureNotificationInput!
  ) {
    toggleTemperatureNotification(input: $input) {
      __typename
      ... on ToggleTemperatureNotificationSuccess {
        controller {
          ...Screen_Settings_Notifications_Controller
        }
      }
    }
  }
  ${Screen_Settings_Notifications_ControllerFragmentDoc}
`;
export type ToggleTemperatureNotificationMutationFn = ApolloReactCommon.MutationFunction<
  ToggleTemperatureNotificationMutation,
  ToggleTemperatureNotificationMutationVariables
>;

/**
 * __useToggleTemperatureNotificationMutation__
 *
 * To run a mutation, you first call `useToggleTemperatureNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleTemperatureNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleTemperatureNotificationMutation, { data, loading, error }] = useToggleTemperatureNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleTemperatureNotificationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ToggleTemperatureNotificationMutation,
    ToggleTemperatureNotificationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ToggleTemperatureNotificationMutation,
    ToggleTemperatureNotificationMutationVariables
  >(ToggleTemperatureNotificationDocument, baseOptions);
}
export type ToggleTemperatureNotificationMutationHookResult = ReturnType<
  typeof useToggleTemperatureNotificationMutation
>;
export type ToggleTemperatureNotificationMutationResult = ApolloReactCommon.MutationResult<
  ToggleTemperatureNotificationMutation
>;
export const AdjustTemperatureNotificationThresholdDocument = gql`
  mutation AdjustTemperatureNotificationThreshold(
    $input: AdjustTemperatureNotificationThresholdInput!
  ) {
    adjustTemperatureNotificationThreshold(input: $input) {
      __typename
      ... on AdjustTemperatureNotificationThresholdSuccess {
        controller {
          ...Screen_Settings_Notifications_Controller
        }
      }
    }
  }
  ${Screen_Settings_Notifications_ControllerFragmentDoc}
`;
export type AdjustTemperatureNotificationThresholdMutationFn = ApolloReactCommon.MutationFunction<
  AdjustTemperatureNotificationThresholdMutation,
  AdjustTemperatureNotificationThresholdMutationVariables
>;

/**
 * __useAdjustTemperatureNotificationThresholdMutation__
 *
 * To run a mutation, you first call `useAdjustTemperatureNotificationThresholdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdjustTemperatureNotificationThresholdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adjustTemperatureNotificationThresholdMutation, { data, loading, error }] = useAdjustTemperatureNotificationThresholdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdjustTemperatureNotificationThresholdMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AdjustTemperatureNotificationThresholdMutation,
    AdjustTemperatureNotificationThresholdMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AdjustTemperatureNotificationThresholdMutation,
    AdjustTemperatureNotificationThresholdMutationVariables
  >(AdjustTemperatureNotificationThresholdDocument, baseOptions);
}
export type AdjustTemperatureNotificationThresholdMutationHookResult = ReturnType<
  typeof useAdjustTemperatureNotificationThresholdMutation
>;
export type AdjustTemperatureNotificationThresholdMutationResult = ApolloReactCommon.MutationResult<
  AdjustTemperatureNotificationThresholdMutation
>;
export const ToggleServiceReminderDocument = gql`
  mutation ToggleServiceReminder($input: ToggleServiceReminderInput!) {
    toggleServiceReminder(input: $input) {
      __typename
      ... on ToggleServiceReminderSuccess {
        location {
          ...Screen_Settings_Notifications_Location
        }
      }
    }
  }
  ${Screen_Settings_Notifications_LocationFragmentDoc}
`;
export type ToggleServiceReminderMutationFn = ApolloReactCommon.MutationFunction<
  ToggleServiceReminderMutation,
  ToggleServiceReminderMutationVariables
>;

/**
 * __useToggleServiceReminderMutation__
 *
 * To run a mutation, you first call `useToggleServiceReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleServiceReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleServiceReminderMutation, { data, loading, error }] = useToggleServiceReminderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleServiceReminderMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ToggleServiceReminderMutation,
    ToggleServiceReminderMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ToggleServiceReminderMutation,
    ToggleServiceReminderMutationVariables
  >(ToggleServiceReminderDocument, baseOptions);
}
export type ToggleServiceReminderMutationHookResult = ReturnType<
  typeof useToggleServiceReminderMutation
>;
export type ToggleServiceReminderMutationResult = ApolloReactCommon.MutationResult<
  ToggleServiceReminderMutation
>;
export const AdjustServiceReminderDatesDocument = gql`
  mutation AdjustServiceReminderDates(
    $input: AdjustServiceReminderDatesInput!
  ) {
    adjustServiceReminderDates(input: $input) {
      __typename
      ... on AdjustServiceReminderDatesSuccess {
        location {
          ...Screen_Settings_Notifications_Location
        }
      }
    }
  }
  ${Screen_Settings_Notifications_LocationFragmentDoc}
`;
export type AdjustServiceReminderDatesMutationFn = ApolloReactCommon.MutationFunction<
  AdjustServiceReminderDatesMutation,
  AdjustServiceReminderDatesMutationVariables
>;

/**
 * __useAdjustServiceReminderDatesMutation__
 *
 * To run a mutation, you first call `useAdjustServiceReminderDatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdjustServiceReminderDatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adjustServiceReminderDatesMutation, { data, loading, error }] = useAdjustServiceReminderDatesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdjustServiceReminderDatesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AdjustServiceReminderDatesMutation,
    AdjustServiceReminderDatesMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AdjustServiceReminderDatesMutation,
    AdjustServiceReminderDatesMutationVariables
  >(AdjustServiceReminderDatesDocument, baseOptions);
}
export type AdjustServiceReminderDatesMutationHookResult = ReturnType<
  typeof useAdjustServiceReminderDatesMutation
>;
export type AdjustServiceReminderDatesMutationResult = ApolloReactCommon.MutationResult<
  AdjustServiceReminderDatesMutation
>;
export const ToggleHumidityNotificationDocument = gql`
  mutation ToggleHumidityNotification(
    $input: ToggleHumidityNotificationInput!
  ) {
    toggleHumidityNotification(input: $input) {
      __typename
      ... on ToggleHumidityNotificationSuccess {
        controller {
          ...Screen_Settings_Notifications_Controller
        }
      }
    }
  }
  ${Screen_Settings_Notifications_ControllerFragmentDoc}
`;
export type ToggleHumidityNotificationMutationFn = ApolloReactCommon.MutationFunction<
  ToggleHumidityNotificationMutation,
  ToggleHumidityNotificationMutationVariables
>;

/**
 * __useToggleHumidityNotificationMutation__
 *
 * To run a mutation, you first call `useToggleHumidityNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleHumidityNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleHumidityNotificationMutation, { data, loading, error }] = useToggleHumidityNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleHumidityNotificationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ToggleHumidityNotificationMutation,
    ToggleHumidityNotificationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ToggleHumidityNotificationMutation,
    ToggleHumidityNotificationMutationVariables
  >(ToggleHumidityNotificationDocument, baseOptions);
}
export type ToggleHumidityNotificationMutationHookResult = ReturnType<
  typeof useToggleHumidityNotificationMutation
>;
export type ToggleHumidityNotificationMutationResult = ApolloReactCommon.MutationResult<
  ToggleHumidityNotificationMutation
>;
export const AdjustHumidityNotificationThresholdDocument = gql`
  mutation AdjustHumidityNotificationThreshold(
    $input: AdjustHumidityNotificationThresholdInput!
  ) {
    adjustHumidityNotificationThreshold(input: $input) {
      __typename
      ... on AdjustHumidityNotificationThresholdSuccess {
        controller {
          ...Screen_Settings_Notifications_Controller
        }
      }
    }
  }
  ${Screen_Settings_Notifications_ControllerFragmentDoc}
`;
export type AdjustHumidityNotificationThresholdMutationFn = ApolloReactCommon.MutationFunction<
  AdjustHumidityNotificationThresholdMutation,
  AdjustHumidityNotificationThresholdMutationVariables
>;

/**
 * __useAdjustHumidityNotificationThresholdMutation__
 *
 * To run a mutation, you first call `useAdjustHumidityNotificationThresholdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdjustHumidityNotificationThresholdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adjustHumidityNotificationThresholdMutation, { data, loading, error }] = useAdjustHumidityNotificationThresholdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdjustHumidityNotificationThresholdMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AdjustHumidityNotificationThresholdMutation,
    AdjustHumidityNotificationThresholdMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AdjustHumidityNotificationThresholdMutation,
    AdjustHumidityNotificationThresholdMutationVariables
  >(AdjustHumidityNotificationThresholdDocument, baseOptions);
}
export type AdjustHumidityNotificationThresholdMutationHookResult = ReturnType<
  typeof useAdjustHumidityNotificationThresholdMutation
>;
export type AdjustHumidityNotificationThresholdMutationResult = ApolloReactCommon.MutationResult<
  AdjustHumidityNotificationThresholdMutation
>;
export const ToggleFaultNotificationDocument = gql`
  mutation ToggleFaultNotification($input: ToggleFaultNotificationInput!) {
    toggleFaultNotification(input: $input) {
      __typename
      ... on ToggleFaultNotificationSuccess {
        location {
          ...Screen_Settings_Notifications_Location
        }
      }
    }
  }
  ${Screen_Settings_Notifications_LocationFragmentDoc}
`;
export type ToggleFaultNotificationMutationFn = ApolloReactCommon.MutationFunction<
  ToggleFaultNotificationMutation,
  ToggleFaultNotificationMutationVariables
>;

/**
 * __useToggleFaultNotificationMutation__
 *
 * To run a mutation, you first call `useToggleFaultNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFaultNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFaultNotificationMutation, { data, loading, error }] = useToggleFaultNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleFaultNotificationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ToggleFaultNotificationMutation,
    ToggleFaultNotificationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ToggleFaultNotificationMutation,
    ToggleFaultNotificationMutationVariables
  >(ToggleFaultNotificationDocument, baseOptions);
}
export type ToggleFaultNotificationMutationHookResult = ReturnType<
  typeof useToggleFaultNotificationMutation
>;
export type ToggleFaultNotificationMutationResult = ApolloReactCommon.MutationResult<
  ToggleFaultNotificationMutation
>;
export const ConvertToProAccountDocument = gql`
  mutation ConvertToProAccount($code: String!) {
    convertToProAccount(input: { code: $code }) {
      __typename
    }
  }
`;
export type ConvertToProAccountMutationFn = ApolloReactCommon.MutationFunction<
  ConvertToProAccountMutation,
  ConvertToProAccountMutationVariables
>;

/**
 * __useConvertToProAccountMutation__
 *
 * To run a mutation, you first call `useConvertToProAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConvertToProAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [convertToProAccountMutation, { data, loading, error }] = useConvertToProAccountMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useConvertToProAccountMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ConvertToProAccountMutation,
    ConvertToProAccountMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ConvertToProAccountMutation,
    ConvertToProAccountMutationVariables
  >(ConvertToProAccountDocument, baseOptions);
}
export type ConvertToProAccountMutationHookResult = ReturnType<
  typeof useConvertToProAccountMutation
>;
export type ConvertToProAccountMutationResult = ApolloReactCommon.MutationResult<
  ConvertToProAccountMutation
>;
export const SettingsScheduleLocationDocument = gql`
  query SettingsScheduleLocation($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_Settings_Schedule_Location
    }
  }
  ${Screen_Settings_Schedule_LocationFragmentDoc}
`;

/**
 * __useSettingsScheduleLocationQuery__
 *
 * To run a query within a React component, call `useSettingsScheduleLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsScheduleLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsScheduleLocationQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useSettingsScheduleLocationQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SettingsScheduleLocationQuery,
    SettingsScheduleLocationQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    SettingsScheduleLocationQuery,
    SettingsScheduleLocationQueryVariables
  >(SettingsScheduleLocationDocument, baseOptions);
}
export function useSettingsScheduleLocationLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SettingsScheduleLocationQuery,
    SettingsScheduleLocationQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SettingsScheduleLocationQuery,
    SettingsScheduleLocationQueryVariables
  >(SettingsScheduleLocationDocument, baseOptions);
}
export type SettingsScheduleLocationQueryHookResult = ReturnType<
  typeof useSettingsScheduleLocationQuery
>;
export type SettingsScheduleLocationLazyQueryHookResult = ReturnType<
  typeof useSettingsScheduleLocationLazyQuery
>;
export type SettingsScheduleLocationQueryResult = ApolloReactCommon.QueryResult<
  SettingsScheduleLocationQuery,
  SettingsScheduleLocationQueryVariables
>;
export const SettingsScheduleControllerDocument = gql`
  query SettingsScheduleController($controllerId: ID!) {
    controller(id: $controllerId) {
      ...Screen_Settings_Schedule_Controller
    }
  }
  ${Screen_Settings_Schedule_ControllerFragmentDoc}
`;

/**
 * __useSettingsScheduleControllerQuery__
 *
 * To run a query within a React component, call `useSettingsScheduleControllerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsScheduleControllerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsScheduleControllerQuery({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *   },
 * });
 */
export function useSettingsScheduleControllerQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SettingsScheduleControllerQuery,
    SettingsScheduleControllerQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    SettingsScheduleControllerQuery,
    SettingsScheduleControllerQueryVariables
  >(SettingsScheduleControllerDocument, baseOptions);
}
export function useSettingsScheduleControllerLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SettingsScheduleControllerQuery,
    SettingsScheduleControllerQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SettingsScheduleControllerQuery,
    SettingsScheduleControllerQueryVariables
  >(SettingsScheduleControllerDocument, baseOptions);
}
export type SettingsScheduleControllerQueryHookResult = ReturnType<
  typeof useSettingsScheduleControllerQuery
>;
export type SettingsScheduleControllerLazyQueryHookResult = ReturnType<
  typeof useSettingsScheduleControllerLazyQuery
>;
export type SettingsScheduleControllerQueryResult = ApolloReactCommon.QueryResult<
  SettingsScheduleControllerQuery,
  SettingsScheduleControllerQueryVariables
>;
export const ChangeProgrammableDocument = gql`
  mutation ChangeProgrammable($input: ChangeProgrammableInput!) {
    changeProgrammable(input: $input) {
      __typename
      ... on ChangeProgrammableSuccess {
        location {
          ...Screen_Settings_Schedule_Location
        }
      }
    }
  }
  ${Screen_Settings_Schedule_LocationFragmentDoc}
`;
export type ChangeProgrammableMutationFn = ApolloReactCommon.MutationFunction<
  ChangeProgrammableMutation,
  ChangeProgrammableMutationVariables
>;

/**
 * __useChangeProgrammableMutation__
 *
 * To run a mutation, you first call `useChangeProgrammableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProgrammableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProgrammableMutation, { data, loading, error }] = useChangeProgrammableMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeProgrammableMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeProgrammableMutation,
    ChangeProgrammableMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeProgrammableMutation,
    ChangeProgrammableMutationVariables
  >(ChangeProgrammableDocument, baseOptions);
}
export type ChangeProgrammableMutationHookResult = ReturnType<
  typeof useChangeProgrammableMutation
>;
export type ChangeProgrammableMutationResult = ApolloReactCommon.MutationResult<
  ChangeProgrammableMutation
>;
export const ChangeScheduleOverrideDocument = gql`
  mutation ChangeScheduleOverride($input: ChangeScheduleOverrideInput!) {
    changeScheduleOverride(input: $input) {
      __typename
      ... on ChangeScheduleOverrideSuccess {
        controller {
          ...Screen_Settings_Schedule_Controller
        }
      }
    }
  }
  ${Screen_Settings_Schedule_ControllerFragmentDoc}
`;
export type ChangeScheduleOverrideMutationFn = ApolloReactCommon.MutationFunction<
  ChangeScheduleOverrideMutation,
  ChangeScheduleOverrideMutationVariables
>;

/**
 * __useChangeScheduleOverrideMutation__
 *
 * To run a mutation, you first call `useChangeScheduleOverrideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeScheduleOverrideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeScheduleOverrideMutation, { data, loading, error }] = useChangeScheduleOverrideMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeScheduleOverrideMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeScheduleOverrideMutation,
    ChangeScheduleOverrideMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeScheduleOverrideMutation,
    ChangeScheduleOverrideMutationVariables
  >(ChangeScheduleOverrideDocument, baseOptions);
}
export type ChangeScheduleOverrideMutationHookResult = ReturnType<
  typeof useChangeScheduleOverrideMutation
>;
export type ChangeScheduleOverrideMutationResult = ApolloReactCommon.MutationResult<
  ChangeScheduleOverrideMutation
>;
export const RestoreDefaultScheduleDocument = gql`
  mutation RestoreDefaultSchedule($controllerId: ID!, $days: [Day!]!) {
    restoreDefaultSchedule(input: { id: $controllerId, days: $days }) {
      __typename
      ... on RestoreDefaultScheduleSuccess {
        controller {
          __typename
          id
          name
          schedule {
            day
            events {
              ...ScheduleEventFields
            }
          }
        }
      }
    }
  }
  ${ScheduleEventFieldsFragmentDoc}
`;
export type RestoreDefaultScheduleMutationFn = ApolloReactCommon.MutationFunction<
  RestoreDefaultScheduleMutation,
  RestoreDefaultScheduleMutationVariables
>;

/**
 * __useRestoreDefaultScheduleMutation__
 *
 * To run a mutation, you first call `useRestoreDefaultScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreDefaultScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreDefaultScheduleMutation, { data, loading, error }] = useRestoreDefaultScheduleMutation({
 *   variables: {
 *      controllerId: // value for 'controllerId'
 *      days: // value for 'days'
 *   },
 * });
 */
export function useRestoreDefaultScheduleMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RestoreDefaultScheduleMutation,
    RestoreDefaultScheduleMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RestoreDefaultScheduleMutation,
    RestoreDefaultScheduleMutationVariables
  >(RestoreDefaultScheduleDocument, baseOptions);
}
export type RestoreDefaultScheduleMutationHookResult = ReturnType<
  typeof useRestoreDefaultScheduleMutation
>;
export type RestoreDefaultScheduleMutationResult = ApolloReactCommon.MutationResult<
  RestoreDefaultScheduleMutation
>;
export const GenerateShareTokenDocument = gql`
  mutation GenerateShareToken {
    generateShareToken {
      __typename
      ... on GenerateShareTokenSuccess {
        token
      }
    }
  }
`;
export type GenerateShareTokenMutationFn = ApolloReactCommon.MutationFunction<
  GenerateShareTokenMutation,
  GenerateShareTokenMutationVariables
>;

/**
 * __useGenerateShareTokenMutation__
 *
 * To run a mutation, you first call `useGenerateShareTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateShareTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateShareTokenMutation, { data, loading, error }] = useGenerateShareTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateShareTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GenerateShareTokenMutation,
    GenerateShareTokenMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    GenerateShareTokenMutation,
    GenerateShareTokenMutationVariables
  >(GenerateShareTokenDocument, baseOptions);
}
export type GenerateShareTokenMutationHookResult = ReturnType<
  typeof useGenerateShareTokenMutation
>;
export type GenerateShareTokenMutationResult = ApolloReactCommon.MutationResult<
  GenerateShareTokenMutation
>;
export const SupportDocument = gql`
  query Support {
    locations {
      ...Screen_Settings_Support_Location
    }
  }
  ${Screen_Settings_Support_LocationFragmentDoc}
`;

/**
 * __useSupportQuery__
 *
 * To run a query within a React component, call `useSupportQuery` and pass it any options that fit your needs.
 * When your component renders, `useSupportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSupportQuery({
 *   variables: {
 *   },
 * });
 */
export function useSupportQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SupportQuery,
    SupportQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SupportQuery, SupportQueryVariables>(
    SupportDocument,
    baseOptions
  );
}
export function useSupportLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SupportQuery,
    SupportQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<SupportQuery, SupportQueryVariables>(
    SupportDocument,
    baseOptions
  );
}
export type SupportQueryHookResult = ReturnType<typeof useSupportQuery>;
export type SupportLazyQueryHookResult = ReturnType<typeof useSupportLazyQuery>;
export type SupportQueryResult = ApolloReactCommon.QueryResult<
  SupportQuery,
  SupportQueryVariables
>;
export const SystemInfoDocument = gql`
  query SystemInfo($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_Settings_SystemInfo_Location
    }
  }
  ${Screen_Settings_SystemInfo_LocationFragmentDoc}
`;

/**
 * __useSystemInfoQuery__
 *
 * To run a query within a React component, call `useSystemInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemInfoQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useSystemInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SystemInfoQuery,
    SystemInfoQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SystemInfoQuery, SystemInfoQueryVariables>(
    SystemInfoDocument,
    baseOptions
  );
}
export function useSystemInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SystemInfoQuery,
    SystemInfoQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SystemInfoQuery,
    SystemInfoQueryVariables
  >(SystemInfoDocument, baseOptions);
}
export type SystemInfoQueryHookResult = ReturnType<typeof useSystemInfoQuery>;
export type SystemInfoLazyQueryHookResult = ReturnType<
  typeof useSystemInfoLazyQuery
>;
export type SystemInfoQueryResult = ApolloReactCommon.QueryResult<
  SystemInfoQuery,
  SystemInfoQueryVariables
>;
export const GetFaultsDocument = gql`
  query GetFaults($locationId: ID!) {
    location(id: $locationId) {
      __typename
      id
      accessLevel
      dealer {
        email
        name
      }
      faults {
        createdAt
        value
      }
    }
  }
`;

/**
 * __useGetFaultsQuery__
 *
 * To run a query within a React component, call `useGetFaultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFaultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFaultsQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useGetFaultsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetFaultsQuery,
    GetFaultsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetFaultsQuery, GetFaultsQueryVariables>(
    GetFaultsDocument,
    baseOptions
  );
}
export function useGetFaultsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetFaultsQuery,
    GetFaultsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetFaultsQuery, GetFaultsQueryVariables>(
    GetFaultsDocument,
    baseOptions
  );
}
export type GetFaultsQueryHookResult = ReturnType<typeof useGetFaultsQuery>;
export type GetFaultsLazyQueryHookResult = ReturnType<
  typeof useGetFaultsLazyQuery
>;
export type GetFaultsQueryResult = ApolloReactCommon.QueryResult<
  GetFaultsQuery,
  GetFaultsQueryVariables
>;
export const ResetLogsDocument = gql`
  mutation ResetLogs($locationId: ID!, $logType: LogType!) {
    resetLogs(input: { id: $locationId, logType: $logType }) {
      __typename
    }
  }
`;
export type ResetLogsMutationFn = ApolloReactCommon.MutationFunction<
  ResetLogsMutation,
  ResetLogsMutationVariables
>;

/**
 * __useResetLogsMutation__
 *
 * To run a mutation, you first call `useResetLogsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetLogsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetLogsMutation, { data, loading, error }] = useResetLogsMutation({
 *   variables: {
 *      locationId: // value for 'locationId'
 *      logType: // value for 'logType'
 *   },
 * });
 */
export function useResetLogsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetLogsMutation,
    ResetLogsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ResetLogsMutation,
    ResetLogsMutationVariables
  >(ResetLogsDocument, baseOptions);
}
export type ResetLogsMutationHookResult = ReturnType<
  typeof useResetLogsMutation
>;
export type ResetLogsMutationResult = ApolloReactCommon.MutationResult<
  ResetLogsMutation
>;
export const VacationDocument = gql`
  query Vacation($locationId: ID!) {
    location(id: $locationId) {
      ...Screen_Settings_Vacation_Location
    }
  }
  ${Screen_Settings_Vacation_LocationFragmentDoc}
`;

/**
 * __useVacationQuery__
 *
 * To run a query within a React component, call `useVacationQuery` and pass it any options that fit your needs.
 * When your component renders, `useVacationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVacationQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useVacationQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    VacationQuery,
    VacationQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<VacationQuery, VacationQueryVariables>(
    VacationDocument,
    baseOptions
  );
}
export function useVacationLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    VacationQuery,
    VacationQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<VacationQuery, VacationQueryVariables>(
    VacationDocument,
    baseOptions
  );
}
export type VacationQueryHookResult = ReturnType<typeof useVacationQuery>;
export type VacationLazyQueryHookResult = ReturnType<
  typeof useVacationLazyQuery
>;
export type VacationQueryResult = ApolloReactCommon.QueryResult<
  VacationQuery,
  VacationQueryVariables
>;
export const ChangeVacationDocument = gql`
  mutation ChangeVacation($input: ChangeVacationInput!) {
    changeVacation(input: $input) {
      __typename
      ... on ChangeVacationSuccess {
        location {
          __typename
          id
          override
          vacation {
            active
          }
        }
      }
    }
  }
`;
export type ChangeVacationMutationFn = ApolloReactCommon.MutationFunction<
  ChangeVacationMutation,
  ChangeVacationMutationVariables
>;

/**
 * __useChangeVacationMutation__
 *
 * To run a mutation, you first call `useChangeVacationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeVacationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeVacationMutation, { data, loading, error }] = useChangeVacationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeVacationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeVacationMutation,
    ChangeVacationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeVacationMutation,
    ChangeVacationMutationVariables
  >(ChangeVacationDocument, baseOptions);
}
export type ChangeVacationMutationHookResult = ReturnType<
  typeof useChangeVacationMutation
>;
export type ChangeVacationMutationResult = ApolloReactCommon.MutationResult<
  ChangeVacationMutation
>;
export const ChangeVacationSetpointsDocument = gql`
  mutation ChangeVacationSetpoints($input: ChangeVacationSetpointsInput!) {
    changeVacationSetpoints(input: $input) {
      __typename
      ... on ChangeVacationSetpointsSuccess {
        location {
          __typename
          id
          vacation {
            setpoints {
              heat
              cool
            }
          }
        }
      }
    }
  }
`;
export type ChangeVacationSetpointsMutationFn = ApolloReactCommon.MutationFunction<
  ChangeVacationSetpointsMutation,
  ChangeVacationSetpointsMutationVariables
>;

/**
 * __useChangeVacationSetpointsMutation__
 *
 * To run a mutation, you first call `useChangeVacationSetpointsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeVacationSetpointsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeVacationSetpointsMutation, { data, loading, error }] = useChangeVacationSetpointsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeVacationSetpointsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeVacationSetpointsMutation,
    ChangeVacationSetpointsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeVacationSetpointsMutation,
    ChangeVacationSetpointsMutationVariables
  >(ChangeVacationSetpointsDocument, baseOptions);
}
export type ChangeVacationSetpointsMutationHookResult = ReturnType<
  typeof useChangeVacationSetpointsMutation
>;
export type ChangeVacationSetpointsMutationResult = ApolloReactCommon.MutationResult<
  ChangeVacationSetpointsMutation
>;
export const SendTokenDocument = gql`
  mutation SendToken($input: SendTokenInput!) {
    sendToken(input: $input) {
      __typename
    }
  }
`;
export type SendTokenMutationFn = ApolloReactCommon.MutationFunction<
  SendTokenMutation,
  SendTokenMutationVariables
>;

/**
 * __useSendTokenMutation__
 *
 * To run a mutation, you first call `useSendTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendTokenMutation, { data, loading, error }] = useSendTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SendTokenMutation,
    SendTokenMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SendTokenMutation,
    SendTokenMutationVariables
  >(SendTokenDocument, baseOptions);
}
export type SendTokenMutationHookResult = ReturnType<
  typeof useSendTokenMutation
>;
export type SendTokenMutationResult = ApolloReactCommon.MutationResult<
  SendTokenMutation
>;
export const SignInDocument = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      __typename
      ... on SignInSuccess {
        accessToken
        refreshToken
        ttl
      }
    }
  }
`;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    baseOptions
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<
  SignInMutation
>;
export const SignUpDocument = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      __typename
    }
  }
`;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    baseOptions
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<
  SignUpMutation
>;
export const BackgroundOverrideStatusDocument = gql`
  query BackgroundOverrideStatus($locationId: ID!) {
    location(id: $locationId) {
      ...Background_OverrideStatus_Location
    }
  }
  ${Background_OverrideStatus_LocationFragmentDoc}
`;

/**
 * __useBackgroundOverrideStatusQuery__
 *
 * To run a query within a React component, call `useBackgroundOverrideStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useBackgroundOverrideStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBackgroundOverrideStatusQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useBackgroundOverrideStatusQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    BackgroundOverrideStatusQuery,
    BackgroundOverrideStatusQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    BackgroundOverrideStatusQuery,
    BackgroundOverrideStatusQueryVariables
  >(BackgroundOverrideStatusDocument, baseOptions);
}
export function useBackgroundOverrideStatusLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    BackgroundOverrideStatusQuery,
    BackgroundOverrideStatusQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    BackgroundOverrideStatusQuery,
    BackgroundOverrideStatusQueryVariables
  >(BackgroundOverrideStatusDocument, baseOptions);
}
export type BackgroundOverrideStatusQueryHookResult = ReturnType<
  typeof useBackgroundOverrideStatusQuery
>;
export type BackgroundOverrideStatusLazyQueryHookResult = ReturnType<
  typeof useBackgroundOverrideStatusLazyQuery
>;
export type BackgroundOverrideStatusQueryResult = ApolloReactCommon.QueryResult<
  BackgroundOverrideStatusQuery,
  BackgroundOverrideStatusQueryVariables
>;
export const RegisterLocationDocument = gql`
  mutation RegisterLocation($input: RegisterLocationInput!) {
    registerLocation(input: $input) {
      __typename
      ... on RegisterLocationSuccess {
        location {
          ...LocationFields
          controllers {
            ...ControllerFields
          }
        }
      }
    }
  }
  ${LocationFieldsFragmentDoc}
  ${ControllerFieldsFragmentDoc}
`;
export type RegisterLocationMutationFn = ApolloReactCommon.MutationFunction<
  RegisterLocationMutation,
  RegisterLocationMutationVariables
>;

/**
 * __useRegisterLocationMutation__
 *
 * To run a mutation, you first call `useRegisterLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerLocationMutation, { data, loading, error }] = useRegisterLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterLocationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterLocationMutation,
    RegisterLocationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RegisterLocationMutation,
    RegisterLocationMutationVariables
  >(RegisterLocationDocument, baseOptions);
}
export type RegisterLocationMutationHookResult = ReturnType<
  typeof useRegisterLocationMutation
>;
export type RegisterLocationMutationResult = ApolloReactCommon.MutationResult<
  RegisterLocationMutation
>;
