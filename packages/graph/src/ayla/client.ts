import axios, { AxiosInstance, AxiosError } from "axios";

import axiosRetry, {
  exponentialDelay,
  isNetworkOrIdempotentRequestError,
} from "axios-retry";

import { HttpsAgent } from "agentkeepalive";

import { Required } from "utility-types";

import { readBit } from "../utils/ayla";

import {
  AYLA_APP_ID,
  AYLA_APP_SECRET,
  AYLA_USER_SERVICE_URL,
  AYLA_DEVICE_SERVICE_URL,
  AYLA_RULES_SERVICE_URL,
  AYLA_RULES_SERVICE_WEBHOOK_URL,
} from "./config";
import emails from "./emails";
import { ShareAccessLevel } from "../schema/resolvers-types";
import { addAylaRequestLogging } from "../utils/request-logging";
import { DevicePropertiesSchemaValidator, DeviceSchemaValidator } from "./validation/validators";
import stats from "../stats";

interface CheckEmailResponse {
  errors: Record<string, string[] | null>;
}

interface SignUpResponse {
  uuid: string;
  email: string;
}

interface ConfirmEmailResponse {
  uuid: string;
  email: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface ProfileResponse {
  uuid: string;
  email: string;
  company: string;
}

export interface Profile {
  id: string;
  email: string;
  company: Record<string, string | number | boolean>;
}

type UserMetadataResponse = {
  datum: {
    key: string;
    value: string;
  };
}[];

interface UserMetadata {
  ksid: string | undefined;
  temperatureUnit: string | undefined;
}

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface DeviceResponse {
  device: {
    key: number;
    connection_status: string;
    dsn: string;
    lat: string;
    lng: string;
    oem_model: string;
    product_name: string | null;
    template_id: number;
    user_uuid: string;
  };
}

type DevicesResponse = DeviceResponse[];

const isSupportedDevice = (device: DeviceResponse): boolean =>
  device.device.oem_model.startsWith("Onyx");

export interface LegacyScheduleDay {
  cl: number;
  ht: number;
  tm1: number;
  tm2: number;
}

export type LegacySchedule = LegacyScheduleDay[];

export interface ModernSchedule {
  p1: string;
  p2: string;
}

export type Schedule = LegacySchedule | ModernSchedule;

export const isModernSchedule = (sch: Schedule): sch is ModernSchedule => {
  return !!(sch as ModernSchedule).p1;
};

export const isLegacySchedule = (sch: Schedule): sch is LegacySchedule => {
  return !isModernSchedule(sch);
};

export interface Device {
  activeSystemAirflow: number;
  awayZn: string[];
  brand: string;
  clStpts: number[];
  clStptMax: number;
  clStptMin: number;
  connectionStatus: string;
  deadband: number;
  dhStg: number[];
  dlrEmail: string;
  dlrName: string;
  dlrPhone: string;
  dlrWeb: string;
  dsn: string;
  equipOut: number;
  fanOvrSt: number;
  fanStg: number[];
  fault?: string;
  forcedAirflowTest: number;
  htStptMax: number;
  htStptMin: number;
  htStpts: number[];
  hum: number[];
  humStg: number[];
  idTmps: number[];
  key: number;
  lat: number;
  lng: number;
  maxAirflow: number;
  minAirflow: number;
  model: string;
  name: string;
  odTmp: number;
  odTmpServer: number;
  overrideStg: string[];
  programmable: boolean;
  sch: Schedule[];
  schDayParts: string[];
  schFan: string[];
  schStpts: number[];
  serviceDates: string;
  sysStg: number;
  tmpOvr: number[];
  tmpOvrSt: number;
  userUuid: string;
  usrMd: number[];
  usrMdPrev: number[];
  vacation?: string;
  version: string;
  versionBt: string;
  versionOd: string;
  versionZc?: string[];
  versionZn?: string[];
  znAirflow?: number[];
  znSensor?: number[];
  znStat: number[];
  zoneName?: string[];
  zones?: number;
  zoning: boolean;
}

export enum DeviceType {
  ZONING = 20475,
  NONZONING = 546,
}

interface PropertyResponse {
  property: {
    name: string;
    value: string | number;
    data_updated_at: string;
  };
}

type PropertiesResponse = PropertyResponse[];

export type Properties = Record<
  string,
  {
    value: string | number;
    updatedAt: Date;
  }
>;

export interface DeviceProperty {
  name: string;
  value: string | number;
}

interface DatumResponse {
  datum: {
    key: string;
    value: string;
  };
}

type MetadataResponse = DatumResponse[];

export interface DeviceMetadata {
  name: string;
  value: string;
}

interface DatapointInput {
  dsn: string;
  name: string;
  datapoint: {
    value: number | string;
  };
}

export type Datapoint = DatapointInput;

interface TimeZoneResponse {
  time_zone: {
    tz_id: string;
  };
}

interface ShareResponse {
  share: {
    accepted: boolean;
    end_date_at?: string;
    id: number;
    owner_profile: {
      firstname: string;
      lastname: string;
      email: string;
    };
    resource_id: string;
    role: {
      name: string;
    };
    user_profile: {
      firstname: string;
      lastname: string;
      email: string;
    };
  };
}

type SharesResponse = ShareResponse[];

export interface Share {
  accepted: boolean;
  email: string;
  owner: {
    name: string;
    email: string;
  };
  expiresAt?: Date;
  id: string;
  resourceId: string;
  role: string;
}

export interface DatapointItem {
  createdAt: Date;
  value: string;
}

type DatapointsResponse = {
  datapoint: {
    created_at: string;
    value: string;
  };
}[];

interface RuleResponse {
  rule: {
    rule_uuid: string;
    name: string;
    expression: string;
    is_enabled: boolean;
    action_ids: string[];
  };
}

type RulesResponse = {
  rules: RuleResponse["rule"][];
};

export interface Rule {
  id: string;
  name: string;
  expression: string;
  enabled: boolean;
}

const formatRule = (rule: RuleResponse["rule"]): Rule => ({
  id: rule.rule_uuid,
  enabled: rule.is_enabled,
  expression: rule.expression,
  name: rule.name,
});

interface ActionResponse {
  action: {
    action_uuid: string;
    name: string;
    rule_ids: string[];
  };
}

type ActionsResponse = {
  actions: ActionResponse["action"][];
};

export interface Action {
  id: string;
  name: string;
  ruleIds: string[];
}

const formatAction = (action: ActionResponse["action"]): Action => ({
  id: action.action_uuid,
  name: action.name,
  ruleIds: action.rule_ids,
});

interface TriggerApp {
  email_template_id?: string;
  name: "forward" | "push_ios" | "push_android" | "email";
  param2: string;
  param5: string;
}

export interface Trigger {
  key: number;
  trigger_type: "always" | "compare_absolute" | "on_change";
  compare_type?: "==" | ">" | "<" | ">=" | "<=";
  active: boolean;
  property_key: number;
  property_name: string;
  property_nickname: string;
  trigger_apps: TriggerApp[];
  value?: string | number;
}

interface TriggerResponse {
  trigger: Trigger;
}

type TriggersResponse = TriggerResponse[];

export function isAxiosError<T>(e: unknown): e is AxiosError<T> {
  return !!(e && (e as AxiosError<T>).isAxiosError);
}

type AylaSingleError = Required<AxiosError<{ error: string }>, "response">;

export function isSingleError(e: unknown): e is AylaSingleError {
  return (
    !!e &&
    (e as AxiosError).isAxiosError &&
    !!(e as AxiosError).response?.data.error
  );
}

type AylaMutiError = Required<
  AxiosError<{ errors: Record<string, string[] | undefined> }>,
  "response"
>;

export function isMultiError(e: unknown): e is AylaMutiError {
  return (
    (e as AxiosError).isAxiosError && !!(e as AxiosError).response?.data.errors
  );
}

type AylaObjectError = Required<
  AxiosError<Record<string, string[]>>,
  "response"
>;

export function isObjectError(e: unknown): e is AylaObjectError {
  return (
    (e as AxiosError).isAxiosError &&
    typeof (e as AxiosError).response?.data === "object"
  );
}

const application = {
  app_id: AYLA_APP_ID, // eslint-disable-line @typescript-eslint/camelcase
  app_secret: AYLA_APP_SECRET, // eslint-disable-line @typescript-eslint/camelcase
};

const userAgent = new HttpsAgent();
const deviceAgent = new HttpsAgent();
const rulesAgent = new HttpsAgent();

export class Client implements Client {
  protected accessToken?: string;
  protected userClient: AxiosInstance;
  protected deviceClient: AxiosInstance;
  protected rulesClient: AxiosInstance;

  constructor(token?: string) {
    this.accessToken = token;

    const headers = this.headers();

    this.userClient = axios.create({
      baseURL: AYLA_USER_SERVICE_URL,
      httpsAgent: userAgent,
      timeout: 2000,
      headers,
    });

    axiosRetry(this.userClient, {
      shouldResetTimeout: true,
      retries: 3,
      retryCondition: error =>
        error.code === "ECONNABORTED" ||
        error.response?.status === 429 ||
        isNetworkOrIdempotentRequestError(error),
      retryDelay: exponentialDelay,
    });

    addAylaRequestLogging(this.userClient, "user");

    this.deviceClient = axios.create({
      baseURL: AYLA_DEVICE_SERVICE_URL,
      httpsAgent: deviceAgent,
      timeout: 5500,
      headers,
    });

    axiosRetry(this.deviceClient, {
      shouldResetTimeout: true,
      retries: 3,
      retryCondition: error =>
        error.code === "ECONNABORTED" ||
        error.response?.status === 429 ||
        isNetworkOrIdempotentRequestError(error),
      retryDelay: exponentialDelay,
    });

    addAylaRequestLogging(this.deviceClient, "device");

    this.rulesClient = axios.create({
      baseURL: AYLA_RULES_SERVICE_URL,
      httpsAgent: rulesAgent,
      timeout: 2000,
      headers,
    });

    axiosRetry(this.rulesClient, {
      shouldResetTimeout: true,
      retries: 3,
      retryCondition: error =>
        error.code === "ECONNABORTED" ||
        // HTTP 400 errors wouldn't *typically* be retryable. This is
        // specific guidance from Ayla
        error.response?.status === 400 ||
        error.response?.status === 429 ||
        isNetworkOrIdempotentRequestError(error),
      retryDelay: exponentialDelay,
    });

    addAylaRequestLogging(this.rulesClient, "rules");
  }

  protected headers(): Record<string, string> {
    return {
      Accept: "application/json",
      "Accept-Encoding": "gzip",
      "Content-Type": "application/json",
      ...(this.accessToken
        ? { Authorization: `auth_token ${this.accessToken}` }
        : {}),
    };
  }

  setToken(token?: string): Client {
    this.accessToken = token;
    this.userClient.defaults.headers = this.headers();
    this.deviceClient.defaults.headers = this.headers();
    this.rulesClient.defaults.headers = this.headers();
    return this;
  }

  tokenSet(): boolean {
    return !!this.accessToken;
  }

  async checkEmail(email: string): Promise<boolean> {
    const { data } = await this.userClient.post<CheckEmailResponse>(
      "/users",
      {
        user: {
          email,
          application,
        },
      },
      {
        validateStatus: status => status === 422,
      }
    );

    let available: boolean;

    if (data.errors["email"]) {
      available = !data.errors["email"].includes("has already been taken");
    } else {
      available = true;
    }

    return available;
  }
  async signUp(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    country: string
  ): Promise<void> {
    await this.userClient.post<SignUpResponse>("/users", {
      user: {
        email,
        password,
        firstname,
        lastname,
        country,
        application,
      },
      ...emails.signIn(email),
    });
  }
  async confirmEmail(code: string): Promise<void> {
    await this.userClient.put<ConfirmEmailResponse>("/users/confirmation", {
      confirmation_token: code, // eslint-disable-line @typescript-eslint/camelcase
    });
  }
  async sendConfirmationEmail(
    email: string,
    { includeButton } = { includeButton: true }
  ): Promise<void> {
    await this.userClient.post("/users/confirmation", {
      user: {
        email,
        application,
      },
      ...emails.signIn(email, { includeButton }),
    });
  }
  async login(email: string, password: string): Promise<Token> {
    const { data } = await this.userClient.post<LoginResponse>(
      "/users/sign_in",
      {
        user: {
          email,
          password,
          application,
        },
      }
    );

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    };
  }
  async sendPasswordResetEmail(
    email: string,
    { includeButton } = { includeButton: true }
  ): Promise<void> {
    await this.userClient.post("/users/password", {
      user: {
        email,
        application,
      },
      ...emails.signIn(email, { includeButton }),
    });
  }
  async resetPassword(token: string, password: string): Promise<void> {
    await this.userClient.put("/users/password", {
      user: {
        reset_password_token: token, // eslint-disable-line @typescript-eslint/camelcase
        password: password,
        password_confirmation: password, // eslint-disable-line @typescript-eslint/camelcase
      },
    });
  }
  async changePassword(current: string, password: string): Promise<void> {
    if (current === password) return;

    await this.userClient.put(
      "/users",
      {
        user: {
          current_password: current, // eslint-disable-line @typescript-eslint/camelcase
          password,
        },
      },
      {
        timeout: 0,
      }
    );
  }
  async profile(authToken?: string): Promise<Profile> {
    const { data } = await this.userClient.get<ProfileResponse>(
      "/users/get_user_profile",
      {
        headers: {
          ...(authToken ? { Authorization: `auth_token ${authToken}` } : {}),
        },
      }
    );

    let company = {};
    try {
      company = JSON.parse(data.company) ?? {};
    } catch {
      company = {};
    }

    return {
      id: data.uuid,
      email: data.email,
      company,
    };
  }
  async setCompany(company: Profile["company"]): Promise<void> {
    await this.userClient.put("/users", {
      user: {
        company: JSON.stringify(company),
      },
    });
  }
  async userMetadata(): Promise<UserMetadata> {
    const { data } = await this.userClient.get<UserMetadataResponse>(
      "/api/v1/users/data"
    );

    return {
      ksid: data.find(({ datum }) => datum.key === "ksid")?.datum.value,
      temperatureUnit: data.find(({ datum }) => datum.key === "temperatureUnit")
        ?.datum.value,
    };
  }
  async writeUserMetadata(
    key: keyof UserMetadata,
    value: string
  ): Promise<void> {
    try {
      return await this.userClient.put(`/api/v1/users/data/${key}`, {
        datum: {
          value,
        },
      });
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 404) {
        return await this.userClient.post("/api/v1/users/data", {
          datum: {
            key,
            value,
          },
        });
      }
      throw e;
    }
  }
  async refreshToken(refreshToken: string): Promise<Token> {
    const { data } = await this.userClient.post<RefreshTokenResponse>(
      "/users/refresh_token",
      {
        user: {
          refresh_token: refreshToken, // eslint-disable-line @typescript-eslint/camelcase
        },
      }
    );

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    };
  }
  async removeAccount(): Promise<void> {
    await this.userClient.delete("/users");
  }
  async getShares(): Promise<Share[]> {
    const { data } = await this.userClient.get<SharesResponse>(
      "/api/v1/users/shares"
    );

    return data.map(({ share }) => ({
      accepted: share.accepted,
      email: share.user_profile.email,
      expiresAt: share.end_date_at ? new Date(share.end_date_at) : undefined,
      id: share.id.toString(),
      owner: {
        email: share.owner_profile.email,
        name: `${share.owner_profile.firstname} ${share.owner_profile.lastname}`,
      },
      resourceId: share.resource_id,
      role: share.role.name,
    }));
  }
  async createShare(
    dsn: string,
    role: string,
    email: string,
    expiresAt?: string
  ): Promise<Share> {
    const {
      data: { share },
    } = await this.userClient.post<ShareResponse>("/api/v1/users/shares", {
      /* eslint-disable @typescript-eslint/camelcase */
      share: {
        resource_name: "device",
        resource_id: dsn,
        role_name: role,
        user_email: email,
        end_date_at: expiresAt ?? null,
      },
      ...emails.grantAccess(),
      /* eslint-enable @typescript-eslint/camelcase */
    });

    return {
      accepted: share.accepted,
      email: share.user_profile.email,
      expiresAt: share.end_date_at ? new Date(share.end_date_at) : undefined,
      id: share.id.toString(),
      owner: {
        email: share.owner_profile.email,
        name: `${share.owner_profile.firstname} ${share.owner_profile.lastname}`,
      },
      resourceId: share.resource_id,
      role: share.role.name,
    };
  }
  async deleteShare(shareId: string): Promise<void> {
    await this.userClient.delete(`/api/v1/users/shares/${shareId}`);
  }
  async getReceivedShares(): Promise<Share[]> {
    const { data } = await this.userClient.get<SharesResponse>(
      "/api/v1/users/shares/received"
    );

    return data.map(({ share }) => ({
      accepted: share.accepted,
      email: share.user_profile.email,
      expiresAt: share.end_date_at ? new Date(share.end_date_at) : undefined,
      id: share.id.toString(),
      owner: {
        email: share.owner_profile.email,
        name: `${share.owner_profile.firstname} ${share.owner_profile.lastname}`,
      },
      resourceId: share.resource_id,
      role: share.role.name,
    }));
  }
  async sendRequestAccessEmail(
    userEmail: string,
    dealerEmail: string,
    accessLevel: ShareAccessLevel,
    limitAccess: boolean
  ): Promise<void> {
    await this.userClient.post("/users/password", {
      user: {
        email: userEmail,
        application,
      },
      ...emails.requestAccess(dealerEmail, accessLevel, limitAccess),
    });
  }
  async registerDevice(dsn: string, setupToken: string): Promise<boolean> {
    try {
      await this.deviceClient.post("/apiv1/devices", {
        device: {
          dsn,
          setup_token: setupToken, // eslint-disable-line @typescript-eslint/camelcase
        },
      });

      return true;
    } catch {
      return false;
    }
  }
  async unregisterDevice(devId: number): Promise<void> {
    await this.deviceClient.delete(`/apiv1/devices/${devId}`);
  }
  async devices(): Promise<string[]> {
    const { data } = await this.deviceClient.get<DevicesResponse>(
      "/apiv1/devices"
    );

    return data.filter(isSupportedDevice).map(({ device: { dsn } }) => dsn);
  }
  async device(dsn: string): Promise<Device> {
    const [
      {
        data: { device },
      },
      { data: propertiesData },
    ] = await Promise.all([
      this.deviceClient.get<DeviceResponse>(`/apiv1/dsns/${dsn}`),
      this.deviceClient.get<PropertiesResponse>(
        `/apiv1/dsns/${dsn}/properties`
      ),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: Record<string, any> = {};

    propertiesData.forEach(({ property: { name, value } }) => {
      props[name] = value;
    });

    // Validate and report on invalid device data
    const deviceValidationResult = DeviceSchemaValidator.validateDevice(device);
    if (!deviceValidationResult.valid) {
      stats.increment("ayla.client.deviceData.invalid.total");
      deviceValidationResult.properties.forEach((property) => {
        stats.increment("ayla.client.deviceData.invalid.property", {
          property,
        });
      });
    }

    // Validate and report on invalid device properties
    const propsValidationResult = DevicePropertiesSchemaValidator.validateProperties(props);
    if (!propsValidationResult.valid) {
      stats.increment("ayla.client.deviceProperties.invalid.total");
      propsValidationResult.properties.forEach((property) => {
        stats.increment("ayla.client.deviceProperties.invalid.property", {
          property,
        });
      });
    }

    const zoning = !!readBit(props["SysStg"], 7);
    const zones = zoning ? (props["SysStg"] & (0b1111 << 20)) >> 20 : 1;

    const parsedDevice: Device = {
      dsn: device.dsn,
      name: device.product_name || "",
      activeSystemAirflow: props["ActiveSystemAirflow"],
      awayZn: [...new Array(zones)].map(
        (_, i) => props[`Away${i === 0 ? "" : `Zn${i + 1}`}`] ?? ""
      ),
      brand: props["Brand"],
      clStptMax: props["ClStptMax"],
      clStptMin: props["ClStptMin"],
      clStpts: [...new Array(zones)].map((_, i) => props[`ClStpt${i + 1}`]),
      connectionStatus: device.connection_status ?? "",
      deadband: props["Deadband"],
      dhStg: [...new Array(zones)].map((_, i) => props[`DHStg${i + 1}`]),
      dlrEmail: props["dlrEmail"] ?? "",
      dlrName: props["dlrName"] ?? "",
      dlrPhone: props["dlrPhone"] ?? "",
      dlrWeb: props["dlrWeb"] ?? "",
      equipOut: props["EquipOut"],
      fanOvrSt: props["FanOvrSt"],
      fanStg: [...new Array(zones)].map((_, i) => props[`FanStg${i + 1}`]),
      fault: props["Fault"] !== "" ? props["Fault"] : undefined,
      forcedAirflowTest: props["ForcedAirflowTest"],
      htStptMax: props["HtStptMax"],
      htStptMin: props["HtStptMin"],
      htStpts: [...new Array(zones)].map((_, i) => props[`HtStpt${i + 1}`]),
      hum: [...new Array(zones)].map((_, i) => props[`Hum${i + 1}`]),
      humStg: [...new Array(zones)].map((_, i) => props[`HumStg${i + 1}`]),
      idTmps: [...new Array(zones)].map((_, i) => props[`IDTmp${i + 1}`]),
      key: device.key,
      lat: parseFloat(device.lat ?? "43.1222328822571"),
      lng: parseFloat(device.lng ?? "-87.935353815937"),
      maxAirflow: props["MaxAirflow"],
      minAirflow: props["MinAirflow"],
      model: device.oem_model,
      odTmp: props["ODTmp"],
      odTmpServer: props["ODTmpServer"],
      overrideStg: [...new Array(zones)].map(
        (_, i) => props[`OverrideStg${i === 0 ? "" : `Zn${i + 1}`}`] ?? ""
      ),
      programmable: !readBit(props["SysStg"], 16),
      sch: [...new Array(zones)].map((_, i) =>
        props["Sch1p1"]
          ? {
              p1: props[`Sch${i + 1}p1`] ?? "",
              p2: props[`Sch${i + 1}p2`] ?? "",
            }
          : [...new Array(7)].map((_, d) => ({
              cl: props[`Sch${i + 1}D${d + 1}Cl`],
              ht: props[`Sch${i + 1}D${d + 1}Ht`],
              tm1: props[`Sch${i + 1}D${d + 1}Tm1`],
              tm2: props[`Sch${i + 1}D${d + 1}Tm2`],
            }))
      ),
      schDayParts: [...new Array(zones)].map(
        (_, i) => props[`SchDayParts${i === 0 ? "" : `Zn${i + 1}`}`] ?? ""
      ),
      schFan: [...new Array(zones)].map(
        (_, i) => props[`SchFan${i === 0 ? "" : i + 1}`] ?? ""
      ),
      schStpts: [...new Array(zones)].map(
        (_, i) => props[`SchStpts${i === 0 ? "" : i + 1}`]
      ),
      serviceDates: props["ServiceDates"],
      sysStg: props["SysStg"],
      tmpOvr: [...new Array(zones)].map((_, i) => props[`TmpOvr${i + 1}`]),
      tmpOvrSt: props["TmpOvrSt"],
      usrMd: [...new Array(zones)].map((_, i) => props[`UsrMd${i + 1}`]),
      usrMdPrev: [...new Array(zones)].map(
        (_, i) => props[`UsrMd${i + 1}Prev`]
      ),
      userUuid: device.user_uuid,
      vacation: zoning ? props["Vacation"] : undefined,
      version: props["version"] ?? "",
      versionBt: props["versionBt"] ?? "",
      versionOd: props["versionOD"] ?? "",
      versionZc: zoning
        ? [props["versionZC1"] ?? "", props["versionZC2"] ?? ""]
        : undefined,
      versionZn: zoning
        ? [...new Array(zones)].map((_, i) => props[`versionZn${i + 1}`] ?? "")
        : undefined,
      znAirflow: zoning
        ? [...new Array(zones)].map((_, i) => props[`ZnAirflow${i + 1}`])
        : undefined,
      znSensor: zoning
        ? [...new Array(zones)].map((_, i) => props[`ZnSensor${i + 1}`])
        : undefined,
      znStat: [...new Array(zones)].map((_, i) => props[`ZnStat${i + 1}`]),
      zoneName: zoning
        ? [...new Array(zones)].map((_, i) => props[`ZoneName${i + 1}`])
        : undefined,
      zones: zoning ? zones : undefined,
      zoning,
    };
    
    return parsedDevice;
  }
  async properties(dsn: string): Promise<Properties> {
    const { data } = await this.deviceClient.get<PropertiesResponse>(
      `/apiv1/dsns/${dsn}/properties`
    );

    const properties: Properties = {};

    data.forEach(({ property: { name, ...property } }) => {
      properties[name] = {
        value: property.value,
        updatedAt: new Date(property.data_updated_at),
      };
    });

    return properties;
  }
  async metadata(dsn: string): Promise<DeviceMetadata[]> {
    const { data } = await this.deviceClient.get<MetadataResponse>(
      `/apiv1/dsns/${dsn}/data`
    );

    return data.map(({ datum }) => ({
      name: datum.key,
      value: datum.value,
    }));
  }
  async setMetadata(dsn: string, key: string, value: string): Promise<void> {
    try {
      await this.deviceClient.put(`/apiv1/dsns/${dsn}/data/${key}`, {
        datum: {
          key,
          value,
        },
      });
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 404) {
        return await this.deviceClient.post(`/apiv1/dsns/${dsn}/data`, {
          datum: {
            key,
            value,
          },
        });
      }
      throw e;
    }
  }
  datapoint(dsn: string, name: string, value: string | number): DatapointInput {
    return {
      dsn,
      name,
      datapoint: {
        value,
      },
    };
  }
  async batchDatapoints(...datapoints: DatapointInput[]): Promise<void> {
    if (!datapoints.length) return;

    await this.deviceClient.post("/apiv1/batch_datapoints", {
      // eslint-disable-next-line @typescript-eslint/camelcase
      batch_datapoints: datapoints,
    });
  }
  async renameDevice(dsn: string, name: string): Promise<void> {
    if (name == null || name.length < 1) {
      // A safeguard for invalid product_name values
      throw new Error(`Invalid device name; ${name}`);
    }

    await this.deviceClient.put(`/apiv1/dsns/${dsn}`, {
      device: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        product_name: name,
      },
    });
  }
  async timeZone(dsn: string): Promise<string> {
    const { data } = await this.deviceClient.get<TimeZoneResponse>(
      `/apiv1/dsns/${dsn}/time_zones`
    );

    return data.time_zone.tz_id;
  }

  async datapoints(dsn: string, name: string): Promise<DatapointItem[]> {
    const { data } = await this.deviceClient.get<DatapointsResponse>(
      `/apiv1/dsns/${dsn}/properties/${name}/datapoints`,
      {
        params: {
          limit: 20,
          paginated: false,
        },
      }
    );

    return data
      .filter(
        ({ datapoint: { value, created_at: createdAt } }) => value && createdAt
      )
      .map(({ datapoint: { value, created_at: createdAt } }) => ({
        value,
        createdAt: new Date(createdAt),
      }));
  }

  async rules(dsn?: string): Promise<Rule[]> {
    const { data } = await this.rulesClient.get<RulesResponse>("/v1/rules", {
      params: dsn
        ? {
            type: "device",
            id: dsn,
          }
        : {},
    });

    return data.rules
      .filter(rule => {
        if (!dsn) return true;
        // HACK: Ayla's APIs are misbehaving WRT the above filter so we
        // need to also apply it at the application level
        return new RegExp(String.raw`DATAPOINT\(${dsn},`, "g").exec(
          rule.expression
        );
      })
      .map(formatRule);
  }

  async rule(name: string, dsn: string): Promise<Rule | undefined> {
    return (await this.rules(dsn)).find(
      rule => rule.name.toLowerCase() === name.toLowerCase()
    );
  }

  protected async createRule(
    name: string,
    actionId: string,
    expression: string
  ): Promise<Rule> {
    const { data } = await this.rulesClient.post<RuleResponse>("/v1/rules", {
      rule: {
        name,
        expression,
        action_ids: [actionId], // eslint-disable-line @typescript-eslint/camelcase
      },
    });

    return formatRule(data.rule);
  }

  protected async findOrCreateRule(
    name: string,
    dsn: string,
    actionId: string,
    expression: string
  ): Promise<Rule> {
    return (
      (await this.rule(name, dsn)) ??
      (await this.createRule(name, actionId, expression))
    );
  }

  protected async actions(): Promise<Action[]> {
    const { data } = await this.rulesClient.get<ActionsResponse>("/v1/actions");

    return data.actions.map(formatAction);
  }

  protected async action(name: string): Promise<Action | undefined> {
    return (await this.actions()).find(
      action => action.name.toLowerCase() === name.toLowerCase()
    );
  }

  protected async createAction(
    name: string,
    metadata: Record<string, string>
  ): Promise<Action> {
    const { data } = await this.rulesClient.post<ActionResponse>(
      "/v1/actions",
      {
        action: {
          name,
          type: "URL",
          parameters: {
            body: JSON.stringify({
              name,
              dsn: "{{event.metadata.dsn}}",
              userId: "{{event.user_uuid}}",
              propertyName: "{{event.metadata.property_name}}",
              value: "{{event.datapoint.value}}",
              valueType: "{{event.metadata.base_type}}",
              ...metadata,
            }),
            endpoint: AYLA_RULES_SERVICE_WEBHOOK_URL,
          },
        },
      }
    );

    return formatAction(data.action);
  }

  protected async findOrCreateAction(
    name: string,
    metadata: Record<string, string>
  ): Promise<Action> {
    return (
      (await this.action(name)) ?? (await this.createAction(name, metadata))
    );
  }

  async addRule(
    name: string,
    dsn: string,
    expression: string,
    metadata: Record<string, string>
  ): Promise<Rule> {
    const { id } = await this.findOrCreateAction(name, metadata);
    return await this.findOrCreateRule(name, dsn, id, expression);
  }

  async removeRule(name: string, dsn: string): Promise<void> {
    const rule = await this.rule(name, dsn);

    if (rule) {
      await this.rulesClient.delete(`/v1/rules/${rule.id}`);
    }

    const action = await this.action(name);

    if (action) {
      await this.rulesClient.delete(`/v1/actions/${action.id}`);
    }
  }

  async toggleRule(
    name: string,
    dsn: string,
    enabled: boolean
  ): Promise<Rule | undefined> {
    const rule = await this.rule(name, dsn);

    if (!rule) return;

    const { data } = await this.rulesClient.put<RuleResponse>(
      `/v1/rules/${rule.id}`,
      {
        attributes: {
          is_enabled: enabled, // eslint-disable-line @typescript-eslint/camelcase
        },
      }
    );

    return formatRule(data.rule);
  }

  async triggers(dsn: string, propertyName: string): Promise<Trigger[]> {
    const { data } = await this.deviceClient.get<TriggersResponse>(
      `/apiv1/dsns/${dsn}/properties/${propertyName}/triggers`
    );

    return data.map(({ trigger }) => trigger);
  }

  async allTriggers(): Promise<Trigger[]> {
    const { data } = await this.deviceClient.get<TriggersResponse>(
      "/apiv1/triggers/all/by_user"
    );

    return data.map(({ trigger }) => trigger);
  }

  async addOnChangeWebhook(
    name: string,
    dsn: string,
    propertyName: string,
    userId: string,
    metadata: Record<string, string>
  ): Promise<Trigger> {
    /* eslint-disable @typescript-eslint/camelcase */
    const { data } = await this.deviceClient.post<TriggerResponse>(
      `/apiv1/dsns/${dsn}/properties/${propertyName}/triggers`,
      {
        trigger: {
          property_nickname: name,
          trigger_type: "on_change",
          trigger_apps: [
            {
              name: "forward",
              param2: AYLA_RULES_SERVICE_WEBHOOK_URL,
              // param5 is limited to 255 characters so we need to be
              // careful about how much information we try to include
              param5: JSON.stringify({
                name,
                userId,
                ...metadata,
              }),
            },
          ],
        },
      }
    );
    /* eslint-enable @typescript-eslint/camelcase */
    return data.trigger;
  }

  async deleteTrigger(key: number): Promise<void> {
    await this.deviceClient.delete(`/apiv1/triggers/${key}`);
  }

  async propertyKeyToDsn(propertyKey: number): Promise<string> {
    const {
      data: {
        property: { device_key: deviceKey },
      },
    } = await this.deviceClient.get<{
      property: { device_key: number };
    }>(`/apiv1/properties/${propertyKey}`);
    const {
      data: {
        device: { dsn },
      },
    } = await this.deviceClient.get<{ device: { dsn: string } }>(
      `/apiv1/devices/${deviceKey}`
    );

    return dsn;
  }
  async sendServiceReminderEmail(email: string): Promise<void> {
    await this.userClient.post("/users/password", {
      user: {
        email,
        application,
      },
      ...emails.serviceReminder(),
    });
  }
}
