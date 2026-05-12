import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  AccessLevel,
  ShareAccessLevel,
} from "../schema/resolvers-types";

import { isObjectError } from "../ayla";
import { decodeAccessLevel, encodeAccessLevel } from "../utils/ayla";

import { NotFound } from "./common";

const expiresEquivalent = (
  a: Date | undefined,
  b: Date | undefined,
  tolerance: number
): boolean => {
  if (a === b) return true;

  if (a != null && b != null) {
    return Math.abs(a.getTime() - b.getTime()) / 1000 <= tolerance;
  }

  return false;
};

export const resolver: Resolvers = {
  Location: {
    share: async ({ accessLevel, dsn }, _args, { loaders, user }) => {
      if (accessLevel === AccessLevel.Owner) return null;

      const share = await loaders.share.load(dsn);
      return share?.email === user?.email ? share : null;
    },
    sharer: async ({ accessLevel, dsn }, _args, { loaders }) => {
      // If the current user is the device's owner, we can skip this entirely
      if (accessLevel === AccessLevel.Owner) return null;

      const share = await loaders.share.load(dsn);
      if (!share) return null;

      return {
        __typename: "Sharer",
        ...share.owner,
      };
    },
    shares: async ({ dsn }, _args, { loaders }) =>
      await loaders.locationShares.load(dsn),
  },
  Share: {
    id: ({ id }) => id,
    accessLevel: ({ role }) => decodeAccessLevel(role),
    email: ({ email }) => email,
    expiresAt: ({ expiresAt }) => (expiresAt ? expiresAt.toISOString() : null),
  },
};

export const queryResolver: QueryResolvers = {};

export const mutationResolver: MutationResolvers = {
  shareLocation: async (
    _root,
    { input: { id, accessLevel, email, expiresAt: expiresAtRaw } },
    { aylaClient, loaders }
  ) => {
    const device = await loaders.device.load(id);
    if (!device) return NotFound("Location not found");

    const expiresAt =
      typeof expiresAtRaw === "string" ? new Date(expiresAtRaw) : undefined;

    if (expiresAt) {
      if (isNaN(+expiresAt)) {
        return {
          __typename: "InvalidDate",
          message: "Must be an ISO8601 string",
        };
      }

      if (expiresAt.getTime() < new Date().getTime()) {
        return {
          __typename: "InvalidDate",
          message: "Must be in the future",
        };
      }
    }

    const shares = await loaders.locationShares.load(id);
    const existingShare = shares.find(s => s.email === email);

    if (existingShare) {
      if (
        decodeAccessLevel(existingShare.role) === accessLevel &&
        expiresEquivalent(existingShare.expiresAt, expiresAt, 15 * 60)
      ) {
        return {
          __typename: "ShareLocationSuccess",
          location: device,
        };
      } else {
        await aylaClient.deleteShare(existingShare.id);
      }
    }

    try {
      const share = await aylaClient.createShare(
        id,
        encodeAccessLevel(accessLevel),
        email,
        expiresAt ? expiresAt.toISOString() : undefined
      );

      loaders.locationShares
        .clear(id)
        .prime(id, [
          ...shares.filter(s => !(s.resourceId === id && s.email === email)),
          share,
        ]);

      return {
        __typename: "ShareLocationSuccess",
        location: device,
      };
    } catch (e) {
      if (isObjectError(e) && e.response.data["user_id"]) {
        return {
          __typename: "InvalidEmail",
          message: "Can't find a user with a matching email address",
        };
      }
      throw e;
    }
  },
  revokeShare: async (_root, { input: { id } }, { aylaClient, loaders }) => {
    const [granted, received] = await Promise.all([
      aylaClient.getShares(),
      aylaClient.getReceivedShares(),
    ]);
    const shares = [...granted, ...received];

    const existingShare = shares.find(s => s.id === id);

    if (!existingShare) return NotFound("Share not found");

    const device = await loaders.device.load(existingShare.resourceId);

    if (!device) return NotFound("Location not found");

    await aylaClient.deleteShare(id);

    loaders.locationShares.clear(existingShare.resourceId).prime(
      existingShare.resourceId,
      shares.filter(s => s.resourceId === id).filter(s => s.id !== id)
    );

    return {
      __typename: "RevokeShareSuccess",
      location: device,
    };
  },
  requestShare: async (
    _root,
    { input: { accessLevel, email, duration } },
    { aylaClient, user }
  ) => {
    const installerEmail = user?.email ?? "";

    if (email.trim() == installerEmail.trim()) {
      return {
        __typename: "InvalidEmail",
        message: "You can't request access from yourself",
      };
    }

    await aylaClient.sendRequestAccessEmail(
      email,
      installerEmail,
      accessLevel,
      !!duration
    );

    return {
      __typename: "RequestShareSuccess",
    };
  },
};
