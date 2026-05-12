import { createHmac, randomBytes } from "crypto";

import { PASSWORD_LENGTH, PASSWORD_SALT } from "./config";

import {
  Mode,
  FanMode,
  ConnectionStatus,
  Day,
  ShareAccessLevel,
  HumidificationMode,
  ScheduleOverride,
  Status,
  StatusItem,
  Sensor,
  ServiceReminderDate,
} from "../schema/resolvers-types";
import { DeviceMapper } from "../schema/mappers";

import { Device, Schedule, isModernSchedule, Properties } from "../ayla";

import { Required } from "utility-types";

type ZoningDevice = Required<
  Device,
  "versionZc" | "versionZn" | "znSensor" | "zoneName" | "zones"
>;

export const RESET_PASSWORD_TOKEN_LENGTH = 8;
export const ACCOUNT_CONFIRMATION_TOKEN_LENGTH = 8;

export const aylaId = (id: string): string =>
  id.replace(/^[NZ]/, "").replace(/-[0-9]$/, "");

export const zoneNum = (id: string): number =>
  Math.abs(parseInt(id.split("-")[1], 10));

export const decodeMode = (mode: number | undefined): Mode => {
  switch (mode) {
    case 1:
      return Mode.Heat;
    case 2:
      return Mode.Cool;
    case 3:
      return Mode.Auto;
    case 4:
      return Mode.Eheat;
    case 5:
      return Mode.Maxheat;
    case 6:
      return Mode.Maxcool;
    default:
      return Mode.Off;
  }
};

export const encodeMode = (mode: Mode): number => {
  switch (mode) {
    case Mode.Off:
      return 0;
    case Mode.Heat:
      return 1;
    case Mode.Cool:
      return 2;
    case Mode.Auto:
      return 3;
    case Mode.Eheat:
      return 4;
    case Mode.Maxheat:
      return 5;
    case Mode.Maxcool:
      return 6;
  }
};

export const isDevice = (device: unknown): device is Device =>
  (device as Device)?.dsn != null;

export const isZoning = (device: unknown): device is ZoningDevice =>
  isDevice(device) && device.zoning === true;

export const decodeTmpOvr = (tmpOvr: number): [number, number] => [
  tmpOvr >> 8,
  tmpOvr & 0xff,
];

export const setTmpOvr = (heat: number, cool: number): number =>
  (heat << 8) | (cool & 0xff);

export const readBit = (src: number, bit: number): 0 | 1 => {
  const mask = 0b1 << bit;
  return +((src & mask) === mask) as 0 | 1;
};

export const writeBit = (src: number, bit: number, value: 0 | 1): number => {
  if (value === 0) {
    return src & ~(1 << bit);
  } else {
    return src | (value << bit);
  }
};

export const decodeAway = (away: string): [boolean, number, number] => {
  const [mode, setpoints] = away.split(";");
  const active = mode === "AWAY";
  const [heat, cool] = (setpoints ?? "62,85")
    .split(",")
    .map(v => parseInt(v, 10));

  return [active, heat, cool];
};

export const encodeAway = (
  active: boolean,
  heat: number,
  cool: number
): string => `${active ? "AWAY" : "HOME"};${heat},${cool}`;

export const decodeVacation = (away: string): [boolean, number, number] => {
  const [mode, setpoints] = away.split(";");
  const active = mode === "VACATION";
  const [heat, cool] = setpoints.split(",").map(v => parseInt(v, 10));

  return [active, heat, cool];
};

export const encodeVacation = (
  active: boolean,
  heat: number,
  cool: number
): string => `${active ? "VACATION" : "HOME"};${heat},${cool}`;

export const decodeFanStg = (fanStg: number): [FanMode, number] => {
  const cfm = (fanStg >> 8) / 100;
  const settings = {
    7: FanMode.Always,
    6: FanMode.Fortyfive,
    5: FanMode.Thirty,
    4: FanMode.Fifteen,
    0: FanMode.Auto,
  };

  for (const [key, value] of Object.entries(settings)) {
    if (readBit(fanStg, parseInt(key))) {
      return [value, cfm];
    }
  }

  return [FanMode.Auto, cfm];
};

export const encodeFanStg = (mode: FanMode, cfm = 0): number => {
  const fanStg = Math.round(cfm * 100) << 8;
  switch (mode) {
    case FanMode.Always:
      return fanStg + writeBit(writeBit(0, 7, 1), 1, 1);
    case FanMode.Fortyfive:
      return fanStg + writeBit(writeBit(0, 6, 1), 1, 1);
    case FanMode.Thirty:
      return fanStg + writeBit(writeBit(0, 5, 1), 1, 1);
    case FanMode.Fifteen:
      return fanStg + writeBit(writeBit(0, 4, 1), 1, 1);
    case FanMode.Auto:
      return fanStg + writeBit(writeBit(0, 4, 1), 0, 1);
  }
};

export const availableModes = (sysStg: number): Mode[] => {
  const modes: Mode[] = [Mode.Off];

  if (readBit(sysStg, 1)) modes.push(Mode.Heat, Mode.Maxheat);
  if (readBit(sysStg, 2)) modes.push(Mode.Cool, Mode.Maxcool);
  if (readBit(sysStg, 3)) modes.push(Mode.Eheat);

  // This is a bit of a special case. Apparently, systems that are
  // configured with only heat or cool can be (are?) configured to
  // also support Auto. This is somewhat non-sensical in the context
  // of the app, so we're going to make sure to only expose it when
  // there are multiple modes against which Auto can operate.
  if (
    readBit(sysStg, 9) &&
    modes.includes(Mode.Heat) &&
    modes.includes(Mode.Cool)
  ) {
    modes.push(Mode.Auto);
  }

  return modes;
};

export const generatePassword = (email: string, ksid?: string): string => {
  let password: string;

  let counter = 0;
  let valid = false;
  do {
    const hmac = createHmac("sha256", PASSWORD_SALT);

    hmac.update(email);

    if (ksid) hmac.update(ksid);

    hmac.update((counter += 1).toString());

    // NOTE(nleach): This will _only_ replace the first character that
    // isn't alphanumeric. I'm honestly not sure if this was
    // intentional or a bug, but now it's confusing. In retrospect, it
    // would have been better to replace _all_ matching occurrence.
    password = hmac
      .digest("base64")
      .replace(/[a-z0-9]/i, "")
      .substr(0, PASSWORD_LENGTH);

    valid =
      !!/[A-Z]/.exec(password) &&
      !!/[a-z]/.exec(password) &&
      !!/[0-9]/.exec(password) &&
      password.length === PASSWORD_LENGTH;
  } while (!valid);

  return password;
};

export const generateKsid = (): string => randomBytes(32).toString("hex");

export const tempOrNull = (temp: number): number | null => {
  return Math.abs(temp) === 128 ? null : Math.round(temp);
};

export const decodeConnectionStatus = (status: string): ConnectionStatus => {
  switch (status) {
    case "Online":
      return ConnectionStatus.Online;
    case "Initializing":
      return ConnectionStatus.Initializing;
    default:
      return ConnectionStatus.Offline;
  }
};

export const decodeSchStpts = (schStpts: number): [FanMode, number, number] => [
  // While this byte is encoded as a fanStg value, it looks like the
  // CFM is always zero, which suggests that it's not being set
  // intentionally. This also lines up with the behavior from the
  // original Hx app where it was not possible to set CFM in the
  // schedule
  decodeFanStg(schStpts >> 16)[0], // Fan Mode
  (schStpts >> 8) & 0xff, // Heat
  schStpts & 0xff, // Cool
];

const unpackSchedule = (schedule: number): [number, number, number, number] => [
  schedule & 0xff,
  (schedule >> 8) & 0xff,
  (schedule >> 16) & 0xff,
  (schedule >> 24) & 0xff,
];

const packSchedule = (
  most: number,
  upper: number,
  high: number,
  low: number
): number => (low << 24) | (high << 16) | (upper << 8) | most;

export const dayIndex = (day: Day): number => {
  switch (day) {
    case Day.Sun:
      return 0;
    case Day.Mon:
      return 1;
    case Day.Tue:
      return 2;
    case Day.Wed:
      return 3;
    case Day.Thu:
      return 4;
    case Day.Fri:
      return 5;
    case Day.Sat:
      return 6;
  }
};

export type AylaScheduleEvent = {
  day: Day;
  fan: FanMode;
  setpoints: {
    heat: number;
    cool: number;
  };
  start: number;
};

export type AylaDaySchedule = {
  parts: 2 | 4;
  events: AylaScheduleEvent[];
};

export type AylaSchedule = Record<Day, AylaDaySchedule>;

const capitalize = (str: string): string =>
  str[0].toUpperCase() + str.toLowerCase().slice(1);

const fanMinutesToMode = (minutes: number): FanMode => {
  switch (minutes) {
    case 15:
      return FanMode.Fifteen;
    case 30:
      return FanMode.Thirty;
    case 45:
      return FanMode.Fortyfive;
    case 60:
      return FanMode.Always;
    default:
      return FanMode.Auto;
  }
};

const fanModeToMinutes = (mode: FanMode): number => {
  switch (mode) {
    case FanMode.Fifteen:
      return 15;
    case FanMode.Thirty:
      return 30;
    case FanMode.Fortyfive:
      return 45;
    case FanMode.Always:
      return 60;
    case FanMode.Auto:
      return 0;
  }
};

const startToMinutes = (hourOrStart: number, minute?: number): number => {
  if (minute !== undefined) {
    return hourOrStart * 60 + minute;
  }

  const start = String(hourOrStart).padStart(4, "0");

  return parseInt(start.slice(0, 2), 10) * 60 + parseInt(start.slice(-2), 10);
};

const decodeSchDay = (
  sch: Schedule,
  schDayParts: string,
  schFan: string,
  day: Day
): AylaDaySchedule => {
  const di = dayIndex(day);
  const parts = schDayParts.split(",")[di] === "4" ? 4 : 2;
  let [c1, c2, c3, c4, h1, h2, h3, h4, s1, s2, s3, s4]: number[] = [];

  const fan = (
    schFan
      .replace(/^{/, "")
      .replace(/}$/, "")
      .split("},{")
      .find(p => p.toLowerCase().startsWith(day.toLowerCase())) ||
    "=00,00,00,00"
  )
    .split("=")[1]
    .split(",")
    .map(v => parseInt(v));

  if (isModernSchedule(sch)) {
    let [_s1, _s2, _s3, _s4]: number[] = [];
    [_s1, h1, c1, _s2, h2, c2, _s3, h3, c3, _s4, h4, c4] = (
      [sch.p1, sch.p2]
        .join(";")
        .replace(/;+/, ";")
        .split(";")
        .find(p => p.toLowerCase().startsWith(day.toLowerCase())) ||
      ":0600,70,78,0800,62,85,1800,70,78,2200,62,82"
    )
      .split(":")[1]
      .split(",")
      .map(v => parseInt(v));

    s1 = startToMinutes(_s1);
    s2 = startToMinutes(_s2);
    s3 = startToMinutes(_s3);
    s4 = startToMinutes(_s4);
  } else {
    const day = sch[di];

    const [minute2, hour2, minute1, hour1] = unpackSchedule(day.tm1);
    const [minute4, hour4, minute3, hour3] = unpackSchedule(day.tm2);

    [c1, c2, c3, c4] = unpackSchedule(day.cl);
    [h1, h2, h3, h4] = unpackSchedule(day.ht);

    s1 = startToMinutes(hour1, minute1);
    s2 = startToMinutes(hour2, minute2);
    s3 = startToMinutes(hour3, minute3);
    s4 = startToMinutes(hour4, minute4);
  }

  return {
    parts,
    events: [
      {
        start: s1,
        setpoints: {
          heat: h1,
          cool: c1,
        },
        fan: fanMinutesToMode(fan[0]),
        day,
      },
      {
        start: s2,
        setpoints: {
          heat: h2,
          cool: c2,
        },
        fan: fanMinutesToMode(fan[1]),
        day,
      },

      {
        start: s3,
        setpoints: {
          heat: h3,
          cool: c3,
        },
        fan: fanMinutesToMode(fan[2]),
        day,
      },
      {
        start: s4,
        setpoints: {
          heat: h4,
          cool: c4,
        },
        fan: fanMinutesToMode(fan[3]),
        day,
      },
    ],
  };
};

export const decodeSch = (device: DeviceMapper): AylaSchedule => {
  const sch = device.sch[device.zone];
  const schDayParts = device.schDayParts[device.zone];
  const schFan = device.schFan[device.zone];

  return {
    [Day.Sun]: decodeSchDay(sch, schDayParts, schFan, Day.Sun),
    [Day.Mon]: decodeSchDay(sch, schDayParts, schFan, Day.Mon),
    [Day.Tue]: decodeSchDay(sch, schDayParts, schFan, Day.Tue),
    [Day.Wed]: decodeSchDay(sch, schDayParts, schFan, Day.Wed),
    [Day.Thu]: decodeSchDay(sch, schDayParts, schFan, Day.Thu),
    [Day.Fri]: decodeSchDay(sch, schDayParts, schFan, Day.Fri),
    [Day.Sat]: decodeSchDay(sch, schDayParts, schFan, Day.Sat),
  };
};

const orderedDays = [
  Day.Sun,
  Day.Mon,
  Day.Tue,
  Day.Wed,
  Day.Thu,
  Day.Fri,
  Day.Sat,
];

const splitMinutes = (start: number): [number, number] => [
  start % 60,
  Math.floor(start / 60),
];

export const encodeSch = (
  sch: AylaSchedule,
  legacyEncoding: boolean
): [Schedule, string, string] => {
  let encoded: Schedule;

  const schDayParts = orderedDays.map(day => sch[day].parts).join(",");

  const schFan = orderedDays
    .map(day => {
      const fanList = sch[day].events
        .map(e =>
          fanModeToMinutes(e.fan)
            .toString()
            .padStart(2, "0")
        )
        .join(",");
      return `{${day.toUpperCase()}=${fanList}}`;
    })
    .join(",");

  if (legacyEncoding) {
    encoded = orderedDays.map(d => {
      const events = sch[d].events;
      const [m0, h0] = splitMinutes(events[0].start);
      const [m1, h1] = splitMinutes(events[1].start);
      const [m2, h2] = splitMinutes(events[2].start);
      const [m3, h3] = splitMinutes(events[3].start);
      return {
        cl: packSchedule(
          events[0].setpoints.cool,
          events[1].setpoints.cool,
          events[2].setpoints.cool,
          events[3].setpoints.cool
        ),
        ht: packSchedule(
          events[0].setpoints.heat,
          events[1].setpoints.heat,
          events[2].setpoints.heat,
          events[3].setpoints.heat
        ),
        tm1: packSchedule(m1, h1, m0, h0),
        tm2: packSchedule(m3, h3, m2, h2),
      };
    });
  } else {
    const p = orderedDays.map(day =>
      [
        capitalize(day),
        sch[day].events
          .map(e =>
            [
              String(Math.floor(e.start / 60)).padStart(2, "0") +
                String(e.start % 60).padStart(2, "0"),
              e.setpoints.heat,
              e.setpoints.cool,
            ].join(",")
          )
          .join(","),
      ].join(":")
    );
    encoded = {
      p1: p.slice(0, 4).join(";") + ";",
      p2: p.slice(4).join(";") + ";",
    };
  }

  return [encoded, schFan, schDayParts];
};

export const decodeServiceDates = (
  serviceDates: string
): {
  spring: ServiceReminderDate | null;
  fall: ServiceReminderDate | null;
} => {
  if (serviceDates.length === 0) return { spring: null, fall: null };

  const [left, right] = serviceDates
    .split(",")
    .map<ServiceReminderDate | null>(date => {
      if (!date || !date.includes("/")) return null;

      const [month, day] = date.split("/").map(v => parseInt(v));

      return { month, day };
    });

  let spring: ServiceReminderDate | null = null;
  let fall: ServiceReminderDate | null = null;

  if (left && right) {
    [spring, fall] = [left, right].sort(
      (a, b) => a.month + a.day / 100 - (b.month + b.day / 100)
    );
  } else if (left) {
    if (left.month < 7) {
      spring = left;
    } else {
      fall = left;
    }
  } else if (right) {
    if (right.month < 7) {
      spring = right;
    } else {
      fall = right;
    }
  }

  return { spring, fall };
};

export const encodeServiceDates = ({
  spring,
  fall,
}: {
  spring?: ServiceReminderDate | null;
  fall?: ServiceReminderDate | null;
}): string =>
  [
    spring
      ? String(spring.month).padStart(2, "0") +
        "/" +
        String(spring.day).padStart(2, "0")
      : null,
    fall
      ? String(fall.month).padStart(2, "0") +
        "/" +
        String(fall.day).padStart(2, "0")
      : null,
  ]
    .filter(date => date !== null)
    .join(",");

export const decodeAccessLevel = (accessLevel: string): ShareAccessLevel => {
  switch (accessLevel) {
    case "OEM::jci::Installer":
      return ShareAccessLevel.Installer;
    case "OEM::jci::Diagnostic":
      return ShareAccessLevel.Diagnostic;
    default:
      return ShareAccessLevel.Status;
  }
};

export const encodeAccessLevel = (accessLevel: ShareAccessLevel): string => {
  switch (accessLevel) {
    case ShareAccessLevel.Installer:
      return "OEM::jci::Installer";
    case ShareAccessLevel.Diagnostic:
      return "OEM::jci::Diagnostic";
    case ShareAccessLevel.Status:
      return "OEM::jci::Service";
  }
};

export const supportsHumdification = (
  znSensor: number | undefined
): boolean => {
  switch (znSensor) {
    case 3:
    case 4:
      return false;
    default:
      return true;
  }
};

export const supportsDehumdification = (
  znSensor: number | undefined,
  sysStg: number
): boolean => {
  if (!availableModes(sysStg).includes(Mode.Cool)) return false;

  return supportsHumdification(znSensor);
};

export const decodeHumidification = (
  hum: number
): [HumidificationMode, number] | null => {
  if (hum === 0xff) return null;

  const upper = hum >> 8;
  const lower = hum & 0xff;

  if (upper === 0xff) return null;

  return [
    upper === 1 ? HumidificationMode.Auto : HumidificationMode.Manual,
    lower,
  ];
};

export const encodeHumidification = (
  mode: HumidificationMode,
  value: number
): number => {
  return ((mode === HumidificationMode.Auto ? 1 : 0) << 8) | value;
};

export const decodeOverrideStg = (schOverride: string): ScheduleOverride => {
  switch (schOverride) {
    case "Cancelled":
      return ScheduleOverride.Cancelled;
    case "# Hours - 01":
      return ScheduleOverride.Hours_01;
    case "# Hours - 02":
      return ScheduleOverride.Hours_02;
    case "# Hours - 03":
      return ScheduleOverride.Hours_03;
    case "# Hours - 04":
      return ScheduleOverride.Hours_04;
    case "# Hours - 05":
      return ScheduleOverride.Hours_05;
    case "# Hours - 06":
      return ScheduleOverride.Hours_06;
    case "# Hours - 07":
      return ScheduleOverride.Hours_07;
    case "# Hours - 08":
      return ScheduleOverride.Hours_08;
    case "# Hours - 09":
      return ScheduleOverride.Hours_09;
    case "# Hours - 10":
      return ScheduleOverride.Hours_10;
    case "# Hours - 11":
      return ScheduleOverride.Hours_11;
    case "# Hours - 12":
      return ScheduleOverride.Hours_12;
    default:
      return ScheduleOverride.NextEvent;
  }
};

export const encodeOverrideStg = (schOverride: ScheduleOverride): string => {
  switch (schOverride) {
    case ScheduleOverride.Cancelled:
      return "Cancelled";
    case ScheduleOverride.Hours_01:
      return "# Hours - 01";
    case ScheduleOverride.Hours_02:
      return "# Hours - 02";
    case ScheduleOverride.Hours_03:
      return "# Hours - 03";
    case ScheduleOverride.Hours_04:
      return "# Hours - 04";
    case ScheduleOverride.Hours_05:
      return "# Hours - 05";
    case ScheduleOverride.Hours_06:
      return "# Hours - 06";
    case ScheduleOverride.Hours_07:
      return "# Hours - 07";
    case ScheduleOverride.Hours_08:
      return "# Hours - 08";
    case ScheduleOverride.Hours_09:
      return "# Hours - 09";
    case ScheduleOverride.Hours_10:
      return "# Hours - 10";
    case ScheduleOverride.Hours_11:
      return "# Hours - 11";
    case ScheduleOverride.Hours_12:
      return "# Hours - 12";
    case ScheduleOverride.NextEvent:
      return "Next Event";
  }
};

export const normalizeVSControlStatusItems = (
  unformatted: string
): string[] => {
  /**
   * Ex: "VS CONTROL OD UNIT SIZE: 5.0 TERMINATE TEMP: 80 DEMAND RESPONSE: OFF COMF/EFF: EFF LOCKOUTS: HP: 30  AUX: 30 CLIMATE: HUMID AIRFLOW ADJ: COOL: 0% HEAT: 10%"
   *
   * These strings have some funky key/value pairs
   * - LOCKOUTS: HP:XXX  AUX:XXX
   * - AIRFLOW ADJ: COOL:XXX% HEAT:XXX%
   * The spaces are always present and the XXX indicates the answer will occupy 3 characters
   * with any leading characters being a space …  i.e.  (100  OR  b99 OR bb9)
   */

  const pairs: string[] = [];

  // Take the LOCKOUTS and AIRFLOW ADJ parts out of the string.
  const lockoutsMatch = /LOCKOUTS: HP: ([\w.%]+)([ ,]?) AUX: ([\w.%]+)/g;
  const airflowMatch = /AIRFLOW ADJ: COOL: ([\w.%]+)([ ,]?) HEAT: ([\w.%]+)/g;

  let simpleString = unformatted.replace("VS CONTROL ", "");
  let lockoutsPair: string | null = null;
  let airflowPair: string | null = null;

  let matches = simpleString.match(lockoutsMatch);
  if (matches?.length) {
    lockoutsPair = matches[0];
    simpleString = simpleString.replace(lockoutsPair, "");
  }

  matches = simpleString.match(airflowMatch);
  if (matches?.length) {
    airflowPair = matches[0];
    simpleString = simpleString.replace(airflowPair, "");
  }

  // Match the rest of the pairs in the string
  const simplePairsMatch = /([\w\s/\\][^:])+: ([\w.%]+)/g;
  matches = simpleString.match(simplePairsMatch);
  if (matches?.length) {
    matches.map(m => m.trim()).forEach(m => pairs.push(m));
  }

  // Add lockouts and airflow pairs
  if (lockoutsPair != null) pairs.push(lockoutsPair);
  if (airflowPair != null) pairs.push(airflowPair);

  return pairs;
};

export const normalizeStatusItems = (
  unformatted: string | string[]
): string[] => {
  const unformattedArray = Array.isArray(unformatted)
    ? unformatted
    : [unformatted];
  return unformattedArray
    .flatMap(s => s.split("\r"))
    .flatMap((s: string) => {
      // Matches VS CONTROL strings (which have inconsistent formatting)
      const vsControlMatch = s.match(/^VS CONTROL/g);
      if (!vsControlMatch) return s;

      let pairs: string[] = [];
      try {
        pairs = normalizeVSControlStatusItems(s);
      } catch (err) {
        return s;
      }

      return pairs;
    })
    .flatMap(s => {
      // Matches strings like PRI V: 00.00; LAS: -20F; AUTO: 0; STATE: ; STATUS: ;
      const match = s.match(/[^:]+:[^;]+;/g);

      if (!match) return s;

      return match.map(m => m.replace(";", "").trim());
    })
    .flatMap(s => {
      const match = s.match(/[^:]+:[^,]+,?/g);

      if (!match) return s;

      return match.map(m => m.replace(",", "").trim());
    })
    .filter(s => s);
};

const translateLabel = (label: string, section: string): string => {
  switch (section) {
    case "PRIMARY ZONE MODULE":
      switch (label) {
        case "PRI V":
          return "PRIMARY ZONE MODULE S/W";
        case "SEC V":
          return "SECONDARY ZONE MODULE S/W";
        case "LAS":
          return "LAS TEMP";
        case "AUTO":
          return "AUTO TIMER(SEC)";
        case "STATE":
          return "ZONE STATE";
        case "STATUS":
          return "ZONE STATUS";
        case "Z1":
          return "ZONE 1 DAMPER POSITION";
        case "Z2":
          return "ZONE 2 DAMPER POSITION";
        case "Z3":
          return "ZONE 3 DAMPER POSITION";
        case "Z4":
          return "ZONE 4 DAMPER POSITION";
        case "Z5":
          return "ZONE 5 DAMPER POSITION";
        case "Z6":
          return "ZONE 6 DAMPER POSITION";
        case "Z7":
          return "ZONE 7 DAMPER POSITION";
        case "Z8":
          return "ZONE 8 DAMPER POSITION";
        case "PRI FLT":
          return "ACTIVE FAULT PRIM";
        case "SEC FLT":
          return "ACTIVE FAULT SEC";
        case "FLT LOG1":
          return "FAULT LOG 1";
        case "FLT LOG2":
          return "FAULT LOG 2";
        case "FLT LOG3":
          return "FAULT LOG 3";
        case "FLT LOG4":
          return "FAULT LOG 4";
        case "FLT LOG5":
          return "FAULT LOG 5";
        case "FLT LOG6":
          return "FAULT LOG 6";
        case "FLT LOG7":
          return "FAULT LOG 7";
        case "FLT LOG8":
          return "FAULT LOG 8";
        case "FLT LOG9":
          return "FAULT LOG 9";
        case "FLT LOG10":
          return "FAULT LOG 10";
        default:
          return label;
      }
    default:
      return label;
  }
};

export const buildStatusList = (
  unformatted: string | string[],
  updatedAt: Date,
  defaultSection?: string
): Status[] | null => {
  const statusMap = new Map<string, StatusItem[]>();

  let section = defaultSection ?? "";
  normalizeStatusItems(unformatted).forEach(i => {
    const [rawLabel, ...values] = i.split(":").map(v => v.trim());
    const value = values.length === 1 ? values[0] : values.join("");
    const label = translateLabel(rawLabel, section);
    if (value == null) {
      section = label;
      return;
    }

    statusMap.set(section, [
      ...(statusMap.get(section) || []),
      { label, value },
    ]);
  });

  const statuses: Status[] = [];

  statusMap.forEach((items, label) => {
    statuses.push({
      label,
      items,
      updatedAt: updatedAt.toISOString(),
    });
  });

  return statuses.length ? statuses : null;
};

export const formatStatus = (
  propertyMap: Properties | null,
  propertyNames: string[],
  defaultSection?: string
): Status[] | null => {
  if (propertyMap == null) return null;

  const properties: string[] = [];
  let updatedAt: Date | undefined;

  propertyNames.forEach(name => {
    const property = propertyMap[name];
    if (property.value === "REFRESH") return;

    if (!updatedAt || updatedAt > property.updatedAt) {
      updatedAt = property.updatedAt;
    }

    properties.push(property.value.toString());
  });

  if (!properties.length || !updatedAt) return null;

  return buildStatusList(properties, updatedAt, defaultSection);
};

export const isOffline = (status: Device | string): boolean => {
  let connectionStatus: ConnectionStatus;
  if (typeof status === "string") {
    connectionStatus = decodeConnectionStatus(status);
  } else {
    connectionStatus = decodeConnectionStatus(status.connectionStatus);
  }

  return connectionStatus === ConnectionStatus.Offline;
};

export const sensorType = (znSensor: number): Sensor => {
  let sensor: Sensor;
  switch (znSensor) {
    case 0:
      sensor = Sensor.MainControl;
      break;
    case 1:
      sensor = Sensor.ZoneThermostatHx;
      break;
    case 2:
      sensor = Sensor.ZoneThermostat;
      break;
    case 3:
      sensor = Sensor.ZoneSensor;
      break;
    case 4:
    default:
      sensor = Sensor.NA;
      break;
  }

  return sensor;
};
