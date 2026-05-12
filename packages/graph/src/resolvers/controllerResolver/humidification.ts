import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  HumidificationMode,
} from "../../schema/resolvers-types";

import { NotFound, NotSupported } from "../common";

import {
  decodeHumidification,
  aylaId,
  isZoning,
  zoneNum,
  encodeHumidification,
  supportsDehumdification,
  supportsHumdification,
} from "../../utils/ayla";

const NOT_FOUND = NotFound("Couldn't find controller");

// TODO(@nleach): Need to verify that these are indeed constant and not represented by device properties
const DEHUM_MAX = 0.65;
const DEHUM_MIN = 0.35;
const HUM_MAX = 0.5;
const HUM_MIN = 0.15;

export const resolver: Resolvers = {
  Controller: {
    dehumidification: ({ dhStg, sysStg, zone, znSensor }) => {
      if (!supportsDehumdification(znSensor?.[zone], sysStg)) return null;

      const dehum = decodeHumidification(dhStg[zone]);

      if (dehum == null) return null;

      const [mode, value] = dehum;

      return {
        __typename: "Humidification",
        max: DEHUM_MAX,
        min: DEHUM_MIN,
        mode,
        value: value / 100,
      };
    },
    humidification: ({ humStg, znSensor, zone }) => {
      if (!supportsHumdification(znSensor?.[zone])) return null;

      const hum = decodeHumidification(humStg[zone]);

      if (hum == null) return null;

      const [mode, value] = hum;

      return {
        __typename: "Humidification",
        max: HUM_MAX,
        min: HUM_MIN,
        mode,
        value: value / 100,
      };
    },
  },
};

export const queryResolver: QueryResolvers = {};

export const mutationResolver: MutationResolvers = {
  changeDehumidificationMode: async (
    _root,
    { input: { id, mode } },
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

    const hum = decodeHumidification(device.dhStg[zone]);

    if (hum == null)
      return NotSupported("Device does not support dehumidification");

    const [, value] = hum;

    device.dhStg[zone] = encodeHumidification(mode, value);

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(device.dsn, `DHStg${zone + 1}`, device.dhStg[zone])
    );

    loaders.device.clear(aid).prime(aid, device);
    return {
      __typename: "ChangeHumidificationModeSuccess",
      controller: { ...device, zone },
    };
  },
  changeHumidificationMode: async (
    _root,
    { input: { id, mode } },
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

    const hum = decodeHumidification(device.humStg[zone]);

    if (hum == null)
      return NotSupported("Device does not support humidification");

    const [, value] = hum;

    device.humStg[zone] = encodeHumidification(mode, value);

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(device.dsn, `HumStg${zone + 1}`, device.humStg[zone])
    );

    loaders.device.clear(aid).prime(aid, device);

    return {
      __typename: "ChangeHumidificationModeSuccess",
      controller: { ...device, zone },
    };
  },
  changeDehumidification: async (
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

    const hum = decodeHumidification(device.dhStg[zone]);

    if (hum == null)
      return NotSupported("Device does not support dehumidification");

    device.dhStg[zone] = encodeHumidification(
      HumidificationMode.Manual,
      Math.min(Math.max(value, DEHUM_MIN), DEHUM_MAX) * 100
    );

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(device.dsn, `DHStg${zone + 1}`, device.dhStg[zone])
    );

    loaders.device.clear(aid).prime(aid, device);

    return {
      __typename: "ChangeHumidificationSuccess",
      controller: { ...device, zone },
    };
  },
  changeHumidification: async (
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

    const hum = decodeHumidification(device.humStg[zone]);

    if (hum == null)
      return NotSupported("Device does not support humidification");

    device.humStg[zone] = encodeHumidification(
      HumidificationMode.Manual,
      Math.min(Math.max(value, HUM_MIN), HUM_MAX) * 100
    );

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(device.dsn, `HumStg${zone + 1}`, device.humStg[zone])
    );

    loaders.device.clear(aid).prime(aid, device);

    return {
      __typename: "ChangeHumidificationSuccess",
      controller: { ...device, zone },
    };
  },
};
