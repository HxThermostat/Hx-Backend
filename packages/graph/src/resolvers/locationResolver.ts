import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  Override,
  Vacation,
  AccessLevel,
  StatusSection,
  LogType,
} from "../schema/resolvers-types";

import { Device, Datapoint } from "../ayla";

import { DeviceWithAccess } from "../schema/context";

import {
  decodeConnectionStatus,
  isDevice,
  decodeAway,
  encodeAway,
  readBit,
  decodeFanStg,
  encodeFanStg,
  writeBit,
  decodeVacation,
  encodeVacation,
  formatStatus,
  isOffline,
  availableModes,
} from "../utils/ayla";

import { NotFound, NotSupported, Offline } from "./common";

const NOT_FOUND = NotFound("Couldn't find location");
const OFFLINE = Offline("Device offline");

const formatVacation = (
  active: boolean,
  heat: number,
  cool: number
): Vacation => ({
  __typename: "Vacation" as const,
  active,
  setpoints: { heat, cool },
});

const isDeviceWithAccess = (device: unknown): device is DeviceWithAccess =>
  isDevice(device) && (device as DeviceWithAccess).accessLevel != null;

export const resolver: Resolvers = {
  Location: {
    activeFault: ({ fault }) => fault ?? null,
    airflow: ({ activeSystemAirflow, maxAirflow, minAirflow, zoning }) =>
      zoning &&
      [activeSystemAirflow, maxAirflow, minAirflow].every(v => v != null)
        ? {
            __typename: "AirflowRange",
            active: activeSystemAirflow,
            min: minAirflow,
            max: maxAirflow,
          }
        : null,
    brand: ({ brand }) => brand,
    connectionStatus: ({ connectionStatus }) =>
      decodeConnectionStatus(connectionStatus),
    dealer: ({ dlrEmail, dlrName, dlrPhone, dlrWeb }) => ({
      __typename: "Dealer",
      email: dlrEmail,
      name: dlrName,
      phone: dlrPhone,
      website: dlrWeb,
    }),
    faults: async ({ dsn, fault }, _, { aylaClient }) => {
      let lastCleared: Date | undefined;

      const faultsPromise = aylaClient.datapoints(dsn, "Fault");

      try {
        const datapoint = (await aylaClient.datapoints(dsn, "ClrFltLogs")).sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        )[0];
        if (datapoint) {
          lastCleared = datapoint.createdAt;
        }
      } catch {
        // We're just using lastCleared as a filter so we can ignore this exception
      }

      const faults = (await faultsPromise)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .filter(({ createdAt }) =>
          lastCleared ? createdAt.getTime() > lastCleared.getTime() : true
        )
        .map(({ value, createdAt }) => ({
          value,
          createdAt: createdAt.toISOString(),
        }));

      if (faults.length === 0 && fault) {
        faults.push({
          value: fault,
          createdAt: new Date().toISOString(),
        });
      }

      return faults;
    },
    lat: ({ lat }) => lat,
    lng: ({ lng }) => lng,
    model: ({ model }) => model,
    modes: ({ sysStg }) => availableModes(sysStg),
    override: ({ awayZn, vacation }) => {
      const [vacationEnabled] = vacation ? decodeVacation(vacation) : [false];

      if (vacationEnabled) return Override.Vacation;

      return awayZn.every(away => {
        const [active] = decodeAway(away);
        return active;
      })
        ? Override.Away
        : null;
    },
    programmable: ({ programmable }) => programmable,
    statusIndoor: async ({ connectionStatus, dsn }, _, { loaders }) => {
      if (isOffline(connectionStatus)) return null;

      return formatStatus(await loaders.properties.load(dsn), [
        "StatusID1",
        "StatusID2",
        "StatusIDEEV",
        "StatusIDEEV2",
      ]);
    },
    statusIndoorEEV: async ({ connectionStatus, dsn }, _, { loaders }) => {
      if (isOffline(connectionStatus)) return null;

      return formatStatus(await loaders.properties.load(dsn), [
        "StatusIDEEV",
        "StatusIDEEV2",
      ]);
    },
    statusOutdoor: async ({ connectionStatus, dsn }, _, { loaders }) => {
      if (isOffline(connectionStatus)) return null;

      return formatStatus(
        await loaders.properties.load(dsn),
        [...new Array(8)].map((_, i) => `StatusOD${i + 1}`)
      );
    },
    statusThermostat: async ({ connectionStatus, dsn }, _, { loaders }) => {
      if (isOffline(connectionStatus)) return null;

      return formatStatus(await loaders.properties.load(dsn), ["StatusTstat"]);
    },
    statusZone: async ({ connectionStatus, dsn, zoning }, _, { loaders }) => {
      if (!zoning) return null;
      if (isOffline(connectionStatus)) return null;

      return formatStatus(
        await loaders.properties.load(dsn),
        [...new Array(7)].map((_, i) => `StatusZC${i + 2}`),
        "PRIMARY ZONE MODULE"
      );
    },
    vacation: ({ vacation }) =>
      vacation ? formatVacation(...decodeVacation(vacation)) : null,
    version: ({ version, versionBt, versionOd }) => ({
      __typename: "Version",
      application: version,
      bootloader: versionBt,
      outdoorControl: versionOd,
    }),
  },
};

export const queryResolver: QueryResolvers = {
  locations: async (_root, _args, { user, aylaClient, loaders }) => {
    if (user == undefined) {
      return [];
    }

    const deviceIds = await aylaClient.devices();
    const devices: DeviceWithAccess[] = [];

    (await loaders.device.loadMany(deviceIds)).map(device => {
      if (isDeviceWithAccess(device)) {
        devices.push({ ...device });
      }
    });

    return devices;
  },
  location: async (_root, { id }, { loaders }) => {
    const device = await loaders.device.load(id);

    if (!device) return null;

    return device;
  },
};

export const mutationResolver: MutationResolvers = {
  renameLocation: async (
    _root,
    { input: { id, name } },
    { aylaClient, loaders }
  ) => {
    const location = await loaders.device.load(id);

    if (!location) return NOT_FOUND;

    try {
      await aylaClient.renameDevice(location.dsn, name);
      location.name = name;
    } catch {
      return {
        __typename: "LocationNameInvalid",
        message: "Name invalid",
      };
    }

    loaders.device.clear(id).prime(id, location);
    return {
      __typename: "RenameLocationSuccess",
      location,
    };
  },
  changeLocationAway: async (
    _root,
    { input: { id, active } },
    { aylaClient, loaders }
  ) => {
    const location = await loaders.device.load(id);

    if (!location) return NOT_FOUND;

    const datapoints: Datapoint[] = [];

    location.awayZn = location.awayZn.map((_, zone) => {
      const [, heat, cool] = decodeAway(location.awayZn[zone]);
      const away = encodeAway(active, heat, cool);

      datapoints.push(
        aylaClient.datapoint(
          location.dsn,
          zone === 0 ? "Away" : `AwayZn${zone + 1}`,
          away
        )
      );

      return away;
    });

    await aylaClient.batchDatapoints(...datapoints);

    loaders.device.clear(id).prime(id, location);
    return {
      __typename: "ChangeLocationAwaySuccess",
      location,
    };
  },
  // TODO(nleach): Based on the existing app, it seems like there is a
  // valid range for CFM but there are no values for that range listed
  // in the property taxonomy. We need to check with JCI to see how we
  // should handle this value. Likely we'll just interpolate 0-1
  // across that valid range so that we don't have to deal with
  // "validation" at this layer.
  changeFanCfm: async (
    _root,
    { input: { id, cfm } },
    { aylaClient, loaders }
  ) => {
    const location = await loaders.device.load(id);

    if (!location) return NOT_FOUND;
    if (!readBit(location.sysStg, 0))
      return NotSupported("Fan speed is not configurable");

    const [mode] = decodeFanStg(location.fanStg[0]);
    location.fanStg[0] = encodeFanStg(mode, cfm);

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(location.dsn, "FanStg1", location.fanStg[0])
    );

    loaders.device.clear(id).prime(id, location);
    return {
      __typename: "ChangeFanCfmSuccess",
      location,
    };
  },
  registerLocation: async (
    _root,
    { input: { dsn, setupToken } },
    { aylaClient, loaders }
  ) => {
    await aylaClient.registerDevice(dsn, setupToken);

    const deviceIds = await aylaClient.devices();
    const devices: Device[] = [];

    // TODO(nleach): Could potentially be optimized using the
    // getDeviceByDsn API Ayla provides
    (await loaders.device.loadMany(deviceIds)).map(device => {
      if (isDevice(device)) {
        devices.push(device);
      }
    });

    const location = devices.find(device => device.dsn === dsn);

    if (location) {
      return {
        __typename: "RegisterLocationSuccess",
        location: { ...location, accessLevel: AccessLevel.Owner },
      };
    }

    return NOT_FOUND;
  },
  changeDealer: async (
    _root,
    { input: { id, email, name, phone, website } },
    { aylaClient, loaders }
  ) => {
    const location = await loaders.device.load(id);

    if (!location) return NOT_FOUND;

    const datapoints: Datapoint[] = [];

    if (email != null) {
      location.dlrEmail = email;
      datapoints.push(aylaClient.datapoint(location.dsn, "dlrEmail", email));
    }

    if (name != null) {
      location.dlrName = name;
      datapoints.push(aylaClient.datapoint(location.dsn, "dlrName", name));
    }

    if (phone != null) {
      location.dlrPhone = phone;
      datapoints.push(aylaClient.datapoint(location.dsn, "dlrPhone", phone));
    }

    if (website != null) {
      location.dlrWeb = website;
      datapoints.push(aylaClient.datapoint(location.dsn, "dlrWeb", website));
    }

    await aylaClient.batchDatapoints(...datapoints);

    loaders.device.clear(id).prime(id, location);

    return {
      __typename: "ChangeDealerSuccess",
      location,
    };
  },
  changeProgrammable: async (
    _root,
    { input: { id, programmable } },
    { aylaClient, loaders }
  ) => {
    const location = await loaders.device.load(id);

    if (!location) return NOT_FOUND;

    location.sysStg = writeBit(location.sysStg, 16, programmable ? 0 : 1);
    location.programmable = programmable;

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(location.dsn, "SysStg", location.sysStg)
    );

    loaders.device.clear(id).prime(id, location);

    return {
      __typename: "ChangeProgrammableSuccess",
      location,
    };
  },
  changeVacation: async (
    _root,
    { input: { id, active } },
    { aylaClient, loaders }
  ) => {
    const location = await loaders.device.load(id);

    if (!location) return NOT_FOUND;

    if (!location.vacation) {
      return {
        __typename: "VacationNotSupported",
        message: "Vacation mode is not supported for this device",
      };
    }

    const [, heat, cool] = decodeVacation(location.vacation);
    const vacation = encodeVacation(active, heat, cool);

    location.vacation = vacation;

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(location.dsn, "Vacation", vacation)
    );

    loaders.device.clear(id).prime(id, location);

    return {
      __typename: "ChangeVacationSuccess",
      location,
    };
  },
  changeVacationSetpoints: async (
    _root,
    { input: { id, heat, cool } },
    { aylaClient, loaders }
  ) => {
    const location = await loaders.device.load(id);

    if (!location) return NOT_FOUND;

    if (!location.vacation) {
      return {
        __typename: "VacationNotSupported",
        message: "Vacation mode is not supported for this device",
      };
    }

    const [active] = decodeVacation(location.vacation);
    const vacation = encodeVacation(active, heat, cool);

    location.vacation = vacation;

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(location.dsn, "Vacation", vacation)
    );

    loaders.device.clear(id).prime(id, location);

    return {
      __typename: "ChangeVacationSetpointsSuccess",
      location,
    };
  },
  refreshStatus: async (
    _root,
    { input: { id, section } },
    { aylaClient, loaders }
  ) => {
    const location = await loaders.device.load(id);

    if (!location) return NOT_FOUND;

    if (isOffline(location)) return OFFLINE;

    let properties: string[];
    switch (section) {
      case StatusSection.Indoor:
        properties = ["StatusID1", "StatusID2", "StatusID3"];
        break;
      case StatusSection.Indooreev:
        properties = ["StatusIDEEV", "StatusIDEEV2"];
        break;
      case StatusSection.Outdoor:
        properties = [
          "StatusOD1",
          "StatusOD2",
          "StatusOD3",
          "StatusOD4",
          "StatusOD5",
          "StatusOD6",
          "StatusOD7",
          "StatusOD8",
        ];
        break;
      case StatusSection.Thermostat:
        properties = ["StatusTstat"];
        break;
      case StatusSection.Zone:
        properties = [
          "StatusZC2",
          "StatusZC3",
          "StatusZC4",
          "StatusZC5",
          "StatusZC6",
          "StatusZC7",
          "StatusZC8",
        ];
        break;
      default:
        properties = [
          "StatusID1",
          "StatusID2",
          "StatusID3",
          "StatusIDEEV",
          "StatusIDEEV2",
          "StatusOD1",
          "StatusOD2",
          "StatusOD3",
          "StatusOD4",
          "StatusOD5",
          "StatusOD6",
          "StatusOD7",
          "StatusOD8",
          "StatusTstat",
          "StatusZC2",
          "StatusZC3",
          "StatusZC4",
          "StatusZC5",
          "StatusZC6",
          "StatusZC7",
          "StatusZC8",
        ];
    }

    await aylaClient.batchDatapoints(
      ...properties.map(property =>
        aylaClient.datapoint(location.dsn, property, "REFRESH")
      )
    );

    loaders.properties.clear(location.dsn);

    return {
      __typename: "RefreshStatusSuccess",
      location,
    };
  },
  removeLocation: async (_root, { input: { id } }, { loaders, aylaClient }) => {
    const location = await loaders.device.load(id);

    if (!location) return NOT_FOUND;

    await aylaClient.unregisterDevice(location.key);

    return {
      __typename: "RemoveLocationSuccess",
    };
  },
  resetLogs: async (
    _root,
    { input: { id, logType } },
    { loaders, aylaClient }
  ) => {
    const location = await loaders.device.load(id);

    if (!location) return NOT_FOUND;

    let value: number;
    switch (logType) {
      case LogType.System:
        value = 0x55;
        break;
      case LogType.Thermostat:
        value = 0xaa;
        break;
    }

    try {
      await aylaClient.batchDatapoints(
        aylaClient.datapoint(location.dsn, "ClrFltLogs", value)
      );
    } catch {
      return NotSupported("Device does not support resetting logs");
    }

    loaders.properties.clear(location.dsn);

    return {
      __typename: "ResetLogsSuccess",
      location: { ...location, fault: undefined },
    };
  },
};
