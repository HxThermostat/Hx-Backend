import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  Away,
  Sensor,
  Demand,
  Mode,
} from "../../schema/resolvers-types";

import { DeviceMapper } from "../../schema/mappers";

import { Datapoint } from "../../ayla";

import {
  aylaId,
  decodeAway,
  decodeMode,
  encodeAway,
  encodeMode,
  isZoning,
  zoneNum,
  availableModes,
  tempOrNull,
  isDevice,
  decodeOverrideStg,
  encodeOverrideStg,
  readBit,
  isOffline,
  writeBit,
  sensorType,
} from "../../utils/ayla";

import { NotFound, NotSupported } from "../common";

import {
  resolver as fanResolver,
  queryResolver as fanQueryResolver,
  mutationResolver as fanMutationResolver,
} from "./fan";

import {
  resolver as humidificationResolver,
  queryResolver as humidificationQueryResolver,
  mutationResolver as humidificationMutationResolver,
} from "./humidification";

import {
  resolver as scheduleResolver,
  queryResolver as scheduleQueryResolver,
  mutationResolver as scheduleMutationResolver,
} from "./schedule";

import {
  resolver as setpointsResolver,
  queryResolver as setpointsQueryResolver,
  mutationResolver as setpointsMutationResolver,
} from "./setpoints";

const NOT_FOUND = NotFound("Couldn't find controller");

const formatAway = (active: boolean, heat: number, cool: number): Away => ({
  __typename: "Away" as const,
  active,
  setpoints: { heat, cool },
});

export const resolver: Resolvers = {
  Location: {
    id: ({ dsn }) => dsn,
    controller: device => (!isZoning(device) ? { ...device, zone: 0 } : null),
    controllers: device =>
      Array(isZoning(device) ? device.zones : 1)
        .fill(device)
        .map((d, zone) => ({ ...d, zone })),
  },
  Controller: {
    id: ({ dsn, zone, zoning }) => (zoning ? `Z${dsn}-${zone}` : `N${dsn}`),
    activeDemand: device => {
      if (isOffline(device)) return null;

      const { usrMd, znStat, zone } = device;
      const mode = decodeMode(usrMd[zone]);

      // Neither heat nor cool are running
      if (!readBit(znStat[zone], 5)) {
        return null;
      }

      if (
        readBit(znStat[zone], 1) &&
        [Mode.Auto, Mode.Cool, Mode.Maxcool].includes(mode)
      ) {
        return Demand.Cool;
      }

      if (
        readBit(znStat[zone], 0) &&
        [Mode.Auto, Mode.Eheat, Mode.Heat, Mode.Maxcool].includes(mode)
      ) {
        return Demand.Heat;
      }

      return null;
    },
    airflow: ({ zone, znAirflow }) => (znAirflow ? znAirflow[zone] : null),
    airflowTestActive: ({ forcedAirflowTest, zone }) =>
      forcedAirflowTest === zone + 1,
    away: ({ awayZn, zone }) => formatAway(...decodeAway(awayZn[zone])),
    coolRange: ({ clStptMin, clStptMax }) => ({
      min: clStptMin,
      max: clStptMax,
    }),
    disabled: device => {
      if (isOffline(device.connectionStatus)) return true;

      if (isZoning(device) && (device.fault ?? "").startsWith("ZM")) {
        return sensorType(device.znSensor[device.zone]) !== Sensor.MainControl;
      }

      return false;
    },
    heatRange: ({ htStptMin, htStptMax }) => ({
      min: htStptMin,
      max: htStptMax,
    }),
    humidity: ({ hum, zone }) => (hum[zone] >= 10 ? hum[zone] / 100 : null),
    indoorTemp: ({ idTmps, zone }) => tempOrNull(idTmps[zone]),
    location: device => device,
    mode: ({ usrMd, zone }) => decodeMode(usrMd[zone]),
    modes: ({ sysStg }) => availableModes(sysStg),
    name: async (device, _, { loaders }) => {
      if (isZoning(device)) {
        const { zoneName, zone } = device;
        return zoneName[zone];
      } else {
        const metadata = await loaders.metadata.load(device.dsn);

        return metadata["RoomName"] ?? "Living Room";
      }
    },
    outdoorTemp: ({ odTmp, odTmpServer }) =>
      tempOrNull(odTmp) ?? tempOrNull(odTmpServer),
    scheduleOverride: ({ overrideStg, zone }) =>
      decodeOverrideStg(overrideStg[zone]),
    zone: ({ zone, zoning }) => (zoning ? (zone + 1).toString() : null),
    zoneSensor: device => {
      if (!isZoning(device)) return null;

      const { znSensor, versionZc, versionZn, zone } = device;

      return {
        sensor: sensorType(znSensor[zone]),
        version: zone === 0 ? versionZc[0] : versionZn[zone],
      };
    },
    ...fanResolver.Controller,
    ...scheduleResolver.Controller,
    ...humidificationResolver.Controller,
    ...setpointsResolver.Controller,
  },
};

export const queryResolver: QueryResolvers = {
  controllers: async (_root, _args, { user, aylaClient, loaders }) => {
    if (user == undefined) return [];

    const deviceIds = await aylaClient.devices();
    const controllers: DeviceMapper[] = [];

    (await loaders.device.loadMany(deviceIds)).map(device => {
      if (isDevice(device)) {
        if (isZoning(device)) {
          controllers.push(
            ...Array(device.zones)
              .fill(device)
              .map((d, zone) => ({ zone, ...d }))
          );
        } else {
          controllers.push({ ...device, zone: 0 });
        }
      }
    });

    return controllers;
  },
  controller: async (_root, { id }, { loaders }) => {
    const aId = aylaId(id);
    const device = await loaders.device.load(aId);

    if (!device) return null;

    if (isZoning(device)) {
      const zone = zoneNum(id);

      if (isNaN(zone) || zone > device.zones) return null;

      return { ...device, zone };
    } else {
      return { ...device, zone: 0 };
    }
  },
  ...fanQueryResolver,
  ...scheduleQueryResolver,
  ...humidificationQueryResolver,
  ...setpointsQueryResolver,
};

export const mutationResolver: MutationResolvers = {
  renameController: async (
    _root,
    { input: { id, name } },
    { loaders, aylaClient }
  ) => {
    const aId = aylaId(id);
    const device = await loaders.device.load(aId);

    if (!device) return NOT_FOUND;

    let zone = 0;

    if (isZoning(device)) {
      zone = zoneNum(id);

      if (isNaN(zone) || zone >= device.zones) return NOT_FOUND;

      device.zoneName[zone] = name;

      await aylaClient.batchDatapoints(
        aylaClient.datapoint(device.dsn, `ZoneName${zone + 1}`, name)
      );
    } else {
      await aylaClient.setMetadata(device.dsn, "RoomName", name);
      loaders.metadata.clear(device.dsn);
    }

    loaders.device.clear(aId).prime(aId, device);
    return {
      __typename: "RenameControllerSuccess",
      controller: { ...device, zone },
    };
  },
  // This mutation breaks our typical boundary of only mutating the
  // entity specified by the mutation. To stay on-spec, when changing
  // to/from the Max Cool / Max Heat modes, all zones in a zoning
  // system must have equivalent changes applied. It was tempting to
  // handle this with a changeLocationMode mutation on the Location
  // type; however, that was awkward in usage because it relied on
  // local state to determine which mutation should be used when
  // changing modes (i.e. if I set Foo to Auto, am I changing it from
  // Max Cool to Auto?). There's a little bit of
  // spooky-action-at-a-distance going on here, but it's not so bad
  // since the caller *can* get a full picture of the world still with
  // something like controller { location { controllers { mode } } }.
  changeMode: async (
    _root,
    { input: { id, mode } },
    { aylaClient, loaders }
  ) => {
    const aid = aylaId(id);
    const device = await loaders.device.load(aid);

    if (!device) return NOT_FOUND;

    let targetZone = 0;
    if (isZoning(device)) {
      targetZone = zoneNum(id);
      if (isNaN(targetZone) || targetZone >= device.zones) return NOT_FOUND;
    }

    let zones = [targetZone];

    const currentMode = decodeMode(device.usrMd[targetZone]);
    const maxModes = [Mode.Maxcool, Mode.Maxheat];
    const isMax = maxModes.includes(mode) || maxModes.includes(currentMode);

    if (device.zoning && isMax) {
      zones = [...new Array(device.zones)].map((_, i) => i);
    }

    const datapoints: Datapoint[] = [];

    // We're only going to be touching multiple zones when
    // transitioning to/from Max Heat / Max Cool
    zones.forEach(zone => {
      // If the current mode for targetZone is the same as mode this
      // mutation should be a no-op
      if (currentMode === mode) return;

      const newMode = encodeMode(mode);

      // Swap previous and current modes.  the current mode may be
      // overwritten again
      [device.usrMd[zone], device.usrMdPrev[zone]] = [
        device.usrMdPrev[zone],
        device.usrMd[zone],
      ];

      // This is the typical path where we're just changing the mode
      // for a single zone
      if (zone === targetZone) {
        device.usrMd[zone] = newMode;

        if (!isMax) {
          device.tmpOvrSt = writeBit(device.tmpOvrSt, zone, 0);
          datapoints.push(
            aylaClient.datapoint(device.dsn, "TmpOvrSt", device.tmpOvrSt)
          );
        }
      }
      // Set the remaining zones to Max Cool / Max Heat
      else {
        if (maxModes.includes(mode)) {
          device.usrMd[zone] = newMode;
        }
      }

      datapoints.push(
        aylaClient.datapoint(
          device.dsn,
          `UsrMd${zone + 1}Prev`,
          device.usrMdPrev[zone]
        ),
        aylaClient.datapoint(device.dsn, `UsrMd${zone + 1}`, device.usrMd[zone])
      );
    });

    await aylaClient.batchDatapoints(...datapoints);

    loaders.device.clear(aid).prime(aid, device);
    return {
      __typename: "ChangeModeSuccess" as const,
      controller: { ...device, zone: targetZone },
    };
  },
  changeAway: async (
    _root,
    { input: { id, active } },
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

    const [, heat, cool] = decodeAway(device.awayZn[zone]);
    const away = encodeAway(active, heat, cool);

    device.awayZn[zone] = away;

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(
        device.dsn,
        zone === 0 ? "Away" : `AwayZn${zone + 1}`,
        away
      )
    );

    loaders.device.clear(aid).prime(aid, device);
    return {
      __typename: "ChangeAwaySuccess" as const,
      controller: { ...device, zone },
    };
  },
  changeAwaySetpoints: async (
    _root,
    { input: { id, heat, cool } },
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

    const [active] = decodeAway(device.awayZn[zone]);
    const away = encodeAway(active, heat, cool);

    device.awayZn[zone] = away;

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(
        device.dsn,
        zone === 0 ? "Away" : `AwayZn${zone + 1}`,
        away
      )
    );

    loaders.device.clear(aid).prime(aid, device);
    return {
      __typename: "ChangeAwaySetpointsSuccess" as const,
      controller: { ...device, zone },
    };
  },
  changeScheduleOverride: async (
    _root,
    { input: { id, scheduleOverride } },
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

    const overrideStg = encodeOverrideStg(scheduleOverride);

    device.overrideStg[zone] = overrideStg;

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(
        device.dsn,
        `OverrideStg${zone === 0 ? "" : `Zn${zone + 1}`}`,
        device.overrideStg[zone]
      )
    );

    loaders.device.clear(aid).prime(aid, device);

    return {
      __typename: "ChangeScheduleOverrideSuccess",
      controller: { ...device, zone },
    };
  },
  changeAirflow: async (
    _root,
    { input: { id, value } },
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

    if (
      device.znAirflow == null ||
      device.znAirflow[zone] == null ||
      device.maxAirflow == null ||
      device.minAirflow == null
    )
      return NotSupported("Airflow is not configurable");

    device.znAirflow[zone] = Math.max(
      Math.min(value, device.maxAirflow),
      device.minAirflow
    );

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(
        device.dsn,
        `ZnAirflow${zone + 1}`,
        device.znAirflow[zone]
      )
    );

    loaders.device.clear(aid).prime(aid, device);

    return {
      __typename: "ChangeAirflowSuccess",
      controller: { ...device, zone },
    };
  },
  setAppActive: async (
    _root,
    { input: { id, active } },
    { loaders, aylaClient }
  ) => {
    const aid = aylaId(id);
    const device = await loaders.device.load(aid);

    if (!device) return NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return NOT_FOUND;
    }

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(device.dsn, "Con2ACS", +active)
    );

    return {
      __typename: "SetAppActiveSuccess",
      controller: { ...device, zone },
    };
  },
  toggleAirflowTest: async (
    _root,
    { input: { id, running } },
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

    if (device.forcedAirflowTest == null)
      return NotSupported("Airflow tests not supporrted");

    device.forcedAirflowTest = running ? zone + 1 : 0;

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(
        device.dsn,
        "ForcedAirflowTest",
        device.forcedAirflowTest
      )
    );

    loaders.device.clear(aid).prime(aid, device);

    return {
      __typename: "ToggleAirflowTestSuccess",
      controller: { ...device, zone },
    };
  },
  ...fanMutationResolver,
  ...scheduleMutationResolver,
  ...humidificationMutationResolver,
  ...setpointsMutationResolver,
};
