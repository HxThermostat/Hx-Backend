import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  Day,
  ScheduleEvent,
  ScheduleSlot,
  Schedule,
  ScheduleTime,
  FanMode,
} from "../../schema/resolvers-types";

import { DeviceMapper } from "../../schema/mappers";
import { Loaders } from "../../schema/context";

import { Datapoint, isLegacySchedule, Client } from "../../ayla";

import {
  isZoning,
  aylaId,
  zoneNum,
  dayIndex,
  decodeSch,
  AylaScheduleEvent,
  encodeSch,
  AylaDaySchedule,
} from "../../utils/ayla";

import { NotFound } from "../common";

const NOT_FOUND = NotFound("Couldn't find controller");

const DEFAULT_SCHEDULE: AylaDaySchedule = {
  parts: 4,
  events: [
    {
      start: 6 * 60,
      setpoints: {
        heat: 70,
        cool: 78,
      },
    },
    {
      start: 8 * 60,
      setpoints: {
        heat: 62,
        cool: 85,
      },
    },
    {
      start: 18 * 60,
      setpoints: {
        heat: 70,
        cool: 78,
      },
    },
    {
      start: 22 * 60,
      setpoints: {
        heat: 62,
        cool: 82,
      },
    },
  ].map(event => ({ ...event, day: Day.Sun, fan: FanMode.Auto })),
};

const nextDay = (day: Day): Day => {
  switch (day) {
    case Day.Sun:
      return Day.Mon;
    case Day.Mon:
      return Day.Tue;
    case Day.Tue:
      return Day.Wed;
    case Day.Wed:
      return Day.Thu;
    case Day.Thu:
      return Day.Fri;
    case Day.Fri:
      return Day.Sat;
    case Day.Sat:
      return Day.Sun;
  }
};

const prevDay = (day: Day): Day => {
  switch (day) {
    case Day.Sun:
      return Day.Sat;
    case Day.Mon:
      return Day.Sun;
    case Day.Tue:
      return Day.Mon;
    case Day.Wed:
      return Day.Tue;
    case Day.Thu:
      return Day.Wed;
    case Day.Fri:
      return Day.Thu;
    case Day.Sat:
      return Day.Fri;
  }
};

const slotIndex = (slot: ScheduleSlot, parts: 2 | 4): number => {
  switch (slot) {
    case ScheduleSlot.Awake:
      return 0;
    case ScheduleSlot.Leave:
      return 1;
    case ScheduleSlot.Arrive:
      return 2;
    case ScheduleSlot.Bed:
      return parts === 2 ? 1 : 3;
  }
};

const scheduleTime = (start: number, day: Day): ScheduleTime => ({
  __typename: "ScheduleTime",
  day,
  hour: Math.floor(start / 60),
  minute: start % 60,
});

const scheduleEvent = (
  event: AylaScheduleEvent,
  nextEvent: AylaScheduleEvent,
  slot: ScheduleSlot
): ScheduleEvent => ({
  __typename: "ScheduleEvent",
  day: event.day,
  fanMode: event.fan,
  setpoints: {
    __typename: "Setpoints",
    ...event.setpoints,
  },
  slot,
  start: scheduleTime(event.start, event.day),
  stop: scheduleTime(nextEvent.start, nextEvent.day),
});

// Schedules are defined in device-local time, so we need to adjust
// the server's UTC-based time to the device's time zone
const adjustTz = (date: Date, timeZone: string): Date => {
  const adjusted = new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );

  return new Date(date.getTime() - (date.getTime() - adjusted.getTime()));
};

const activeScheduleEvent = async (
  device: DeviceMapper,
  loaders: Loaders
): Promise<ScheduleEvent | null> => {
  if (!device.programmable) return null;

  const timezone = await loaders.timezone.load(device.dsn);

  const now = adjustTz(new Date(), timezone);
  const nowAsSchTime = now.getHours() * 60 + now.getMinutes();

  const week = decodeSch(device);
  const day = Intl.DateTimeFormat(undefined, {
    weekday: "short",
  })
    .format(now)
    .toUpperCase() as Day;

  const sch = week[day];
  const nextSch = week[nextDay(day)];
  const prevSch = week[prevDay(day)];

  let events = sch.parts === 4 ? sch.events : sch.events.slice(0, 2);

  // The current event will be the last event that started before `now`
  let event = [...events.filter(({ start }) => start < nowAsSchTime)].pop();

  // If there are no events today starting before `now`, we need to go
  // back to yesterday
  if (!event) {
    events = prevSch.parts === 4 ? prevSch.events : prevSch.events.slice(0, 2);
    event = events[prevSch.parts - 1];
  }

  const eventIndex = events.indexOf(event);
  const nextEvent =
    eventIndex === events.length - 1
      ? nextSch.events[0]
      : events[eventIndex + 1];

  let slot: ScheduleSlot;
  if (eventIndex === 0) {
    slot = ScheduleSlot.Awake;
  } else if (eventIndex === events.length - 1) {
    // Doing the Bed test first allows us to safely assign Leave and
    // Arrive without checking `parts`
    slot = ScheduleSlot.Bed;
  } else if (eventIndex === 1) {
    slot = ScheduleSlot.Leave;
  } else {
    slot = ScheduleSlot.Arrive;
  }

  return scheduleEvent(event, nextEvent, slot);
};

const schedule = (device: DeviceMapper): Schedule[] => {
  const week = decodeSch(device);

  return Object.values(Day).map(day => {
    const sch = week[day];
    const nextSch = week[nextDay(day)];

    const awake = scheduleEvent(
      sch.events[0],
      sch.events[1],
      ScheduleSlot.Awake
    );

    const leave =
      sch.parts === 4
        ? scheduleEvent(sch.events[1], sch.events[2], ScheduleSlot.Leave)
        : undefined;

    const arrive =
      sch.parts === 4
        ? scheduleEvent(sch.events[2], sch.events[3], ScheduleSlot.Arrive)
        : undefined;

    const bed =
      sch.parts === 4
        ? scheduleEvent(sch.events[3], nextSch.events[0], ScheduleSlot.Bed)
        : scheduleEvent(sch.events[1], nextSch.events[0], ScheduleSlot.Bed);

    return {
      __typename: "Schedule",
      day,
      awake,
      leave,
      arrive,
      bed,
      events: leave && arrive ? [awake, leave, arrive, bed] : [awake, bed],
    };
  });
};

const changeSchedule = (
  device: DeviceMapper,
  day: Day,
  slot: ScheduleSlot,
  fanMode: FanMode,
  rawHeat: number,
  rawCool: number,
  rawHour: number,
  rawMinute: number,
  aylaClient: Client
): [DeviceMapper, Datapoint[]] => {
  const { zone } = device;
  const currentSch = decodeSch(device);
  const daySch = currentSch[day];

  const eventIndex = slotIndex(slot, daySch.parts);

  // Restrict heat to the min/max heat setpoints
  const heat = Math.min(device.htStptMax, Math.max(device.htStptMin, rawHeat));

  // Restrict cool to the min/max cool setpoints, and keep it deadband degrees warmer than heat
  // Note: we could just as easily apply the deadband adjustment on heat, this is totally arbitrary
  const cool = Math.max(
    heat + device.deadband,
    Math.min(device.clStptMax, Math.max(device.clStptMin, rawCool))
  );

  // Restrict the hour to 0-23 and the minute to 0,15,30,45
  const normalizedHour = Math.min(23, Math.max(0, rawHour));
  const normalizedMinute = Math.min(
    45,
    Math.max(0, Math.floor(rawMinute / 15) * 15)
  );

  // Restrict the start time on the boundaries of the valid range based on the event's position in the schedule
  // (e.g. if we're trying to end the first event at the end of the day, we need to bump it back parts increments)
  const start = Math.min(
    1440 - 15 * (daySch.parts - eventIndex),
    Math.max(15 * eventIndex, normalizedHour * 60 + normalizedMinute)
  );

  if (
    daySch.parts === 2 &&
    (slot === ScheduleSlot.Leave || slot === ScheduleSlot.Arrive)
  ) {
    throw new Error("InactiveSlot");
  }

  const newDaySch: typeof daySch = {
    parts: daySch.parts,
    events: daySch.events.map((event, i) =>
      i === eventIndex
        ? {
            day,
            fan: fanMode,
            setpoints: {
              heat,
              cool,
            },
            start,
          }
        : {
            ...event,
            // Move other start times if the updated event overlaps / gets too close
            // Events will only be moved +/- 15 minutes from their neighbor
            start:
              i < eventIndex
                ? Math.min(event.start, start + 15 * (i - eventIndex))
                : Math.max(event.start, start + 15 * (i - eventIndex)),
          }
    ),
  };

  const [sch, schFan] = encodeSch(
    {
      ...currentSch,
      [day]: newDaySch,
    },
    isLegacySchedule(device.sch[zone])
  );

  const controller = {
    ...device,
    zone,
    sch: device.sch.map((existing, z) => (z === zone ? sch : existing)),
    schFan: device.schFan.map((existing, z) =>
      z === zone ? schFan : existing
    ),
  };

  const datapoints: Datapoint[] = [];

  if (isLegacySchedule(sch)) {
    const di = dayIndex(day);
    datapoints.push(
      aylaClient.datapoint(
        controller.dsn,
        `Sch${zone + 1}D${di + 1}Cl`,
        sch[di].cl
      ),
      aylaClient.datapoint(
        controller.dsn,
        `Sch${zone + 1}D${di + 1}Ht`,
        sch[di].ht
      ),
      aylaClient.datapoint(
        controller.dsn,
        `Sch${zone + 1}D${di + 1}Tm1`,
        sch[di].tm1
      ),
      aylaClient.datapoint(
        controller.dsn,
        `Sch${zone + 1}D${di + 1}Tm2`,
        sch[di].tm2
      )
    );
  } else {
    datapoints.push(
      aylaClient.datapoint(controller.dsn, `Sch${zone + 1}p1`, sch.p1),
      aylaClient.datapoint(controller.dsn, `Sch${zone + 1}p2`, sch.p2)
    );
  }
  datapoints.push(
    aylaClient.datapoint(
      controller.dsn,
      `SchFan${zone === 0 ? "" : zone + 1}`,
      schFan
    )
  );

  return [controller, datapoints];
};

const copySchedule = (
  device: DeviceMapper,
  source: AylaDaySchedule,
  destination: Day[],
  aylaClient: Client
): [DeviceMapper, Datapoint[]] => {
  const { zone } = device;

  const currentSch = decodeSch(device);

  const [sch, schFan, schDayParts] = encodeSch(
    {
      ...currentSch,
      ...Object.fromEntries(destination.map(day => [day, source])),
    },
    isLegacySchedule(device.sch[zone])
  );

  const controller = {
    ...device,
    sch: device.sch.map((existing, z) => (z === zone ? sch : existing)),
    schFan: device.schFan.map((existing, z) =>
      z === zone ? schFan : existing
    ),
    schDayParts: device.schDayParts.map((existing, z) =>
      z === zone ? schDayParts : existing
    ),
  };

  const datapoints: Datapoint[] = [];

  if (isLegacySchedule(sch)) {
    destination.forEach(day => {
      const di = dayIndex(day);
      datapoints.push(
        aylaClient.datapoint(
          controller.dsn,
          `Sch${zone + 1}D${di + 1}Cl`,
          sch[di].cl
        ),
        aylaClient.datapoint(
          controller.dsn,
          `Sch${zone + 1}D${di + 1}Ht`,
          sch[di].ht
        ),
        aylaClient.datapoint(
          controller.dsn,
          `Sch${zone + 1}D${di + 1}Tm1`,
          sch[di].tm1
        ),
        aylaClient.datapoint(
          controller.dsn,
          `Sch${zone + 1}D${di + 1}Tm2`,
          sch[di].tm2
        )
      );
    });
  } else {
    datapoints.push(
      aylaClient.datapoint(controller.dsn, `Sch${zone + 1}p1`, sch.p1),
      aylaClient.datapoint(controller.dsn, `Sch${zone + 1}p2`, sch.p2)
    );
  }
  datapoints.push(
    aylaClient.datapoint(
      controller.dsn,
      `SchFan${zone === 0 ? "" : zone + 1}`,
      schFan
    ),
    aylaClient.datapoint(
      controller.dsn,
      `SchDayParts${zone === 0 ? "" : `Zn${zone + 1}`}`,
      schDayParts
    )
  );

  return [controller, datapoints];
};

export const resolver: Resolvers = {
  Controller: {
    activeScheduleEvent: (device, _, { loaders }) =>
      activeScheduleEvent(device, loaders),
    schedule: device => schedule(device),
  },
};

export const queryResolver: QueryResolvers = {};

export const mutationResolver: MutationResolvers = {
  changeSchedule: async (
    _root,
    { input: { id, day, slot, fanMode, heat, cool, hour, minute } },
    { aylaClient, loaders }
  ) => {
    const aid = aylaId(id);

    const device = await loaders.device.load(aid);

    if (!device) return NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return NOT_FOUND;
    }

    try {
      const [controller, datapoints] = changeSchedule(
        { ...device, zone },
        day,
        slot,
        fanMode,
        heat,
        cool,
        hour,
        minute,
        aylaClient
      );

      await aylaClient.batchDatapoints(...datapoints);

      loaders.device.clear(aid).prime(aid, controller);

      return {
        __typename: "ChangeScheduleSuccess",
        controller,
      };
    } catch (e) {
      if (e.message === "InactiveSlot") {
        return {
          __typename: "InactiveSlot",
          message: "Slot not active for this schedule",
        };
      }

      throw e;
    }
  },
  addLeaveArrive: async (
    _root,
    {
      input: {
        id,
        day,
        leaveHeat,
        leaveCool,
        leaveFanMode,
        leaveHour,
        leaveMinute,
        arriveHeat,
        arriveCool,
        arriveFanMode,
        arriveHour,
        arriveMinute,
      },
    },
    { aylaClient, loaders }
  ) => {
    const aid = aylaId(id);

    const device = await loaders.device.load(aid);

    if (!device) return NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return NOT_FOUND;
    }

    const currentSch = decodeSch({ ...device, zone });
    const daySch = currentSch[day];

    const bed = daySch.events[daySch.parts - 1];

    // Start by updating the dayParts
    const [, , schDayParts] = encodeSch(
      { ...currentSch, [day]: { ...daySch, parts: 4 } },
      false
    );

    const controller: DeviceMapper = {
      ...device,
      zone,
      schDayParts: device.schDayParts.map((exitsting, z) =>
        z === zone ? schDayParts : exitsting
      ),
    };

    const datapoints: Datapoint[] = [
      aylaClient.datapoint(
        controller.dsn,
        `SchDayParts${zone === 0 ? "" : `Zn${zone + 1}`}`,
        schDayParts
      ),
    ];

    const [withLeave] = changeSchedule(
      controller,
      day,
      ScheduleSlot.Leave,
      leaveFanMode,
      leaveHeat,
      leaveCool,
      leaveHour,
      leaveMinute,
      aylaClient
    );

    const [withArrive] = changeSchedule(
      withLeave,
      day,
      ScheduleSlot.Arrive,
      arriveFanMode,
      arriveHeat,
      arriveCool,
      arriveHour,
      arriveMinute,
      aylaClient
    );

    const [withBed, bedDatapoints] = changeSchedule(
      withArrive,
      day,
      ScheduleSlot.Bed,
      bed.fan,
      bed.setpoints.heat,
      bed.setpoints.cool,
      Math.floor(bed.start / 60),
      bed.start % 60,
      aylaClient
    );

    datapoints.push(...bedDatapoints);

    await aylaClient.batchDatapoints(...datapoints);

    loaders.device.clear(aid).prime(aid, withBed);

    return {
      __typename: "AddLeaveArriveSuccess",
      controller: withBed,
    };
  },
  removeLeaveArrive: async (
    _root,
    { input: { id, day } },
    { aylaClient, loaders }
  ) => {
    const aid = aylaId(id);

    const device = await loaders.device.load(aid);

    if (!device) return NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return NOT_FOUND;
    }

    const currentSch = decodeSch({ ...device, zone });
    const daySch = currentSch[day];

    const bed = daySch.events[daySch.parts - 1];

    // Start by updating the dayParts
    const [, , schDayParts] = encodeSch(
      { ...currentSch, [day]: { ...daySch, parts: 2 } },
      false
    );

    const controller: DeviceMapper = {
      ...device,
      zone,
      schDayParts: device.schDayParts.map((exitsting, z) =>
        z === zone ? schDayParts : exitsting
      ),
    };

    const datapoints: Datapoint[] = [
      aylaClient.datapoint(
        controller.dsn,
        `SchDayParts${zone === 0 ? "" : `Zn${zone + 1}`}`,
        schDayParts
      ),
    ];

    const [withBed, bedDatapoints] = changeSchedule(
      controller,
      day,
      ScheduleSlot.Bed,
      bed.fan,
      bed.setpoints.heat,
      bed.setpoints.cool,
      Math.floor(bed.start / 60),
      bed.start % 60,
      aylaClient
    );

    datapoints.push(...bedDatapoints);

    await aylaClient.batchDatapoints(...datapoints);

    loaders.device.clear(aid).prime(aid, withBed);

    return {
      __typename: "RemoveLeaveArriveSuccess",
      controller: withBed,
    };
  },
  copySchedule: async (
    _root,
    { input: { id, source, destination } },
    { aylaClient, loaders }
  ) => {
    const aid = aylaId(id);

    const device = await loaders.device.load(aid);

    if (!device) return NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return NOT_FOUND;
    }

    const currentSch = decodeSch({ ...device, zone });
    const [controller, datapoints] = copySchedule(
      { ...device, zone },
      currentSch[source],
      destination,
      aylaClient
    );

    await aylaClient.batchDatapoints(...datapoints);

    loaders.device.clear(aid).prime(aid, controller);

    return {
      __typename: "CopyScheduleSuccess",
      controller,
    };
  },
  restoreDefaultSchedule: async (
    _root,
    { input: { id, days } },
    { aylaClient, loaders }
  ) => {
    const aid = aylaId(id);

    const device = await loaders.device.load(aid);

    if (!device) return NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return NOT_FOUND;
    }

    const [controller, datapoints] = copySchedule(
      { ...device, zone },
      DEFAULT_SCHEDULE,
      days,
      aylaClient
    );

    await aylaClient.batchDatapoints(...datapoints);

    loaders.device.clear(aid).prime(aid, controller);

    return {
      __typename: "RestoreDefaultScheduleSuccess",
      controller,
    };
  },
};
