import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  Setpoint,
} from "../../schema/resolvers-types";
import { DeviceMapper } from "../../schema/mappers";

import {
  aylaId,
  decodeAway,
  isZoning,
  setTmpOvr,
  writeBit,
  zoneNum,
  readBit,
  decodeTmpOvr,
  decodeSchStpts,
  decodeVacation,
} from "../../utils/ayla";

import { NotFound } from "../common";

const NOT_FOUND = NotFound("Couldn't find controller");

const AWAY_ACTIVE = {
  __typename: "AwayModeActive" as const,
  message: "Away mode is currently active",
};

const currentSetpoints = (device: DeviceMapper): [number, number] => {
  let heat: number | undefined;
  let cool: number | undefined;

  const { zone } = device;
  const [awayActive] = decodeAway(device.awayZn[zone]);
  const [vacationActive] = device.vacation
    ? decodeVacation(device.vacation)
    : [false];

  if (vacationActive && device.vacation) {
    [, heat, cool] = decodeVacation(device.vacation);
  } else if (awayActive) {
    [, heat, cool] = decodeAway(device.awayZn[zone]);
  } else if (device.programmable && !readBit(device.tmpOvrSt, zone)) {
    [, heat, cool] = decodeSchStpts(device.schStpts[zone]);
  } else if (device.tmpOvr[zone]) {
    [heat, cool] = decodeTmpOvr(device.tmpOvr[zone]);
  }

  if (heat == null || cool == null) {
    heat = device.htStpts[zone];
    cool = device.clStpts[zone];
  }

  return [heat, cool];
};

const adjustSetpoint = (
  setpoint: Setpoint,
  value: number,
  device: DeviceMapper
): [number, number] => {
  let heat: number;
  let cool: number;

  const [currentHeat, currentCool] = currentSetpoints(device);

  if (setpoint === Setpoint.Cool) {
    cool = Math.max(Math.min(value, device.clStptMax), device.clStptMin);
    heat = Math.min(currentHeat, cool - device.deadband);
  } else {
    heat = Math.max(Math.min(value, device.htStptMax), device.htStptMin);
    cool = Math.max(currentCool, heat + device.deadband);
  }

  return [heat, cool];
};

export const resolver: Resolvers = {
  Controller: {
    setpoints: device => {
      const [heat, cool] = currentSetpoints(device);

      return {
        __typename: "Setpoints" as const,
        heat,
        cool,
      };
    },
    tempOverride: ({ programmable, tmpOvrSt, zone }) =>
      programmable && !!readBit(tmpOvrSt, zone),
  },
};

export const queryResolver: QueryResolvers = {};

export const mutationResolver: MutationResolvers = {
  changeSetpoint: async (
    _root,
    { input: { id, setpoint, value } },
    { loaders, aylaClient }
  ) => {
    const aId = aylaId(id);
    const device = await loaders.device.load(aId);

    if (!device) return NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return NOT_FOUND;
    }

    const [awayActive] = decodeAway(device.awayZn[zone]);
    if (awayActive) return AWAY_ACTIVE;

    const [heat, cool] = adjustSetpoint(setpoint, value, { ...device, zone });

    device.tmpOvrSt = writeBit(device.tmpOvrSt, zone, 1);
    device.tmpOvr[zone] = setTmpOvr(heat, cool);

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(device.dsn, "TmpOvrSt", device.tmpOvrSt),
      aylaClient.datapoint(device.dsn, `TmpOvr${zone + 1}`, device.tmpOvr[zone])
    );

    loaders.device.clear(aId).prime(aId, device);
    return {
      __typename: "ChangeSetpointSuccess",
      controller: { ...device, zone },
    };
  },
  cancelTemperatureHold: async (
    _root,
    { input: { id } },
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

    device.tmpOvrSt = writeBit(device.tmpOvrSt, zone, 0);

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(device.dsn, "TmpOvrSt", device.tmpOvrSt)
    );

    loaders.device.clear(aid).prime(aid, device);
    return {
      __typename: "CancelTemperatureHoldSuccess",
      controller: { ...device, zone },
    };
  },
};
