import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  FanMode,
} from "../../schema/resolvers-types";

import {
  aylaId,
  isZoning,
  writeBit,
  zoneNum,
  readBit,
  decodeFanStg,
  encodeFanStg,
  decodeSchStpts,
  isOffline,
} from "../../utils/ayla";

import { NotFound } from "../common";

const NOT_FOUND = NotFound("Couldn't find controller");

export const resolver: Resolvers = {
  Controller: {
    fan: ({
      connectionStatus,
      fanOvrSt,
      fanStg,
      programmable,
      schStpts,
      sysStg,
      zone,
      znStat,
    }) => {
      const online = !isOffline(connectionStatus);
      const override = programmable && !!readBit(fanOvrSt, zone);

      let mode: FanMode;

      if (programmable) {
        if (override) {
          [mode] = decodeFanStg(fanStg[zone]);
        } else {
          [mode] = decodeSchStpts(schStpts[zone]);
        }
      } else {
        [mode] = decodeFanStg(fanStg[zone]);
      }

      const [, cfm] = decodeFanStg(fanStg[0]);

      return {
        __typename: "Fan" as const,
        active: online && !!readBit(znStat[zone], 2),
        cfm: readBit(sysStg, 0) ? cfm : null,
        mode,
        modes: [
          FanMode.Always,
          FanMode.Auto,
          FanMode.Fifteen,
          FanMode.Thirty,
          FanMode.Fortyfive,
        ],
        override,
      };
    },
  },
};

export const queryResolver: QueryResolvers = {};

export const mutationResolver: MutationResolvers = {
  changeFanMode: async (
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

    const [prevMode, cfm] = decodeFanStg(device.fanStg[zone]);
    const override = prevMode !== mode || readBit(device.fanOvrSt, zone);

    device.fanStg[zone] = encodeFanStg(mode, cfm);
    device.fanOvrSt = writeBit(device.fanOvrSt, zone, override ? 1 : 0);

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(
        device.dsn,
        `FanStg${zone + 1}`,
        device.fanStg[zone]
      ),
      aylaClient.datapoint(device.dsn, "FanOvrSt", device.fanOvrSt)
    );

    loaders.device.clear(aid).prime(aid, device);
    return {
      __typename: "ChangeFanModeSuccess",
      controller: { ...device, zone },
    };
  },
  cancelFanHold: async (_root, { input: { id } }, { aylaClient, loaders }) => {
    const aid = aylaId(id);
    const device = await loaders.device.load(aid);

    if (!device) return NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return NOT_FOUND;
    }

    if (device.programmable) {
      const [, cfm] = decodeFanStg(device.fanStg[zone]);
      const [mode] = decodeSchStpts(device.schStpts[zone]);

      device.fanOvrSt = writeBit(device.fanOvrSt, zone, 0);
      device.fanStg[zone] = encodeFanStg(mode, cfm);

      await aylaClient.batchDatapoints(
        aylaClient.datapoint(
          device.dsn,
          `FanStg${zone + 1}`,
          device.fanStg[zone]
        ),
        aylaClient.datapoint(device.dsn, "FanOvrSt", device.fanOvrSt)
      );
    }

    loaders.device.clear(aid).prime(aid, device);
    return {
      __typename: "CancelFanHoldSuccess",
      controller: { ...device, zone },
    };
  },
};
