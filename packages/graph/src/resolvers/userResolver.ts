import safeCompare from "safe-compare";

import { isDevice, readBit } from "../utils/ayla";

import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  TemperatureUnit,
  AccountType,
} from "../schema/resolvers-types";

import { PRO_EMAILS, PRO_UPGRADE_CODE } from "./config";

export const resolver: Resolvers = {
  User: {
    accountType: ({ company, email }) => {
      return company["dealer"] || PRO_EMAILS.includes(email.toLowerCase())
        ? AccountType.Pro
        : AccountType.Homeowner;
    },
    temperatureUnit: async (_root, _args, { aylaClient, loaders }) => {
      // Kick off the request to load the user's devices and check to
      // see if any are set to use Celsius. We may not use this result
      // but we'll reduce the time in the resolver by running it in
      // parallel with the user metadata request.
      const devicesHaveCelsius = aylaClient
        .devices()
        .then(deviceIds => loaders.device.loadMany(deviceIds))
        .then(devices =>
          devices
            .map(device =>
              isDevice(device) ? !!readBit(device.sysStg, 8) : false
            )
            .reduce((d, acc) => d || acc, false)
        );

      // We'll default to the user's selected preference
      let { temperatureUnit } = await aylaClient.userMetadata();

      // And not set set, fall back to the aggregate across devices
      if (!temperatureUnit) {
        temperatureUnit = (await devicesHaveCelsius)
          ? TemperatureUnit.C
          : TemperatureUnit.F;
      }

      return temperatureUnit === TemperatureUnit.C
        ? TemperatureUnit.C
        : TemperatureUnit.F;
    },
  },
};

export const queryResolver: QueryResolvers = {
  me: async (_root, _args, { user, aylaClient }) => {
    if (!user) {
      return null;
    }

    const res = await aylaClient.profile(user.accessToken);

    return {
      __typename: "User" as const,
      ...res,
    };
  },
};

export const mutationResolver: MutationResolvers = {
  changeTemperatureUnit: async (
    _root,
    { input: { temperatureUnit } },
    { aylaClient }
  ) => {
    await aylaClient.writeUserMetadata("temperatureUnit", temperatureUnit);

    const res = await aylaClient.profile();

    return {
      __typename: "ChangeTemperatureUnitSuccess",
      user: res,
    };
  },
  convertToHomeownerAccount: async (_root, _args, { aylaClient }) => {
    const user = await aylaClient.profile();
    const company = { ...user.company, dealer: false };

    await aylaClient.setCompany(company);

    return {
      __typename: "ConvertToHomeownerAccountSuccess",
      user: { ...user, company },
    };
  },
  convertToProAccount: async (_root, { input: { code } }, { aylaClient }) => {
    code = code.trim();
    if (!code || !safeCompare(PRO_UPGRADE_CODE, code)) {
      return {
        __typename: "InvalidCode",
        message: "The code provided is not valid",
      };
    }

    const user = await aylaClient.profile();
    const company = { ...user.company, dealer: true };

    await aylaClient.setCompany(company);

    return {
      __typename: "ConvertToProAccountSuccess",
      user: { ...user, company },
    };
  },
};
