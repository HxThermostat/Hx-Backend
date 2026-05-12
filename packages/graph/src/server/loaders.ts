import DataLoader from "dataloader";

import geoTz from "geo-tz";

import { Client, Device } from "../ayla";
import { getEndpoint, listSubscriptions } from "../sns";
import { Loaders, User } from "../schema/context";
import { AccessLevel } from "../schema/resolvers-types";

const isValidTz = (timeZone: string): boolean => {
  try {
    new Date().toLocaleString("en-US", {
      timeZone: timeZone,
    });
    return true;
  } catch {
    return false;
  }
};

export default function loaders(
  aylaClient: Client,
  user: User | null
): Loaders {
  const shareLoader = new DataLoader(async (ids: readonly string[]) => {
    const [shares, sharesReceived] = await Promise.all([
      aylaClient.getShares(),
      aylaClient.getReceivedShares(),
    ]);

    return ids.map(id => {
      const share = shares.find(s => s.resourceId === id);
      const received = sharesReceived.find(s => s.resourceId === id);

      return share ?? received ?? null;
    });
  });

  const deviceLoader = new DataLoader(
    async (ids: readonly string[]) => {
      const [id] = ids;

      let device: Device;
      try {
        device = await aylaClient.device(id);
      } catch {
        return [null];
      }

      let accessLevel: AccessLevel;
      if (user?.id && device.userUuid === user.id) {
        accessLevel = AccessLevel.Owner;
      } else {
        const deviceShare = await shareLoader.load(device.dsn);

        switch (deviceShare?.role) {
          case undefined:
            accessLevel = AccessLevel.Owner;
            break;
          case "OEM::jci::Installer":
            accessLevel = AccessLevel.Installer;
            break;
          case "OEM::jci::Diagnostic":
            accessLevel = AccessLevel.Diagnostic;
            break;
          case "OEM::jci::Service":
          default:
            accessLevel = AccessLevel.Status;
            break;
        }
      }

      return [{ ...device, accessLevel }];
    },
    { batch: false }
  );

  const rulesLoader = new DataLoader(
    async (dsns: readonly string[]) => {
      const [dsn] = dsns;

      try {
        const rules = aylaClient.rules(dsn);

        // Convert the Fault + ServiceReminder triggers to look like a Rule
        const triggers = aylaClient.allTriggers().then(triggers => {
          return triggers
            .filter(t => t.property_nickname.includes(dsn))
            .filter(t => t.trigger_type === "on_change")
            .map(t => ({
              id: String(t.key),
              name: t.property_nickname,
              expression: `changed(DATAPOINT(${dsn}, ${t.property_name}))`,
              enabled: t.active,
            }));
        });

        return [(await Promise.all([triggers, rules])).flat()];
      } catch {
        return [[]];
      }
    },
    { batch: false }
  );

  return {
    device: deviceLoader,
    locationShares: new DataLoader(async (dsns: readonly string[]) => {
      const shares = await aylaClient.getShares();

      return dsns.map(dsn => shares.filter(share => share.resourceId === dsn));
    }),
    metadata: new DataLoader(async (ids: readonly string[]) => {
      const deviceMetadata = await Promise.all(
        ids.map(id => aylaClient.metadata(id))
      );

      return Array.from({ length: ids.length }, Object).map((m, i) => {
        deviceMetadata[i].forEach(({ name, value }) => {
          m[name] = value;
        });

        return m;
      });
    }),
    properties: new DataLoader((dsns: readonly string[]) =>
      Promise.all(dsns.map(dsn => aylaClient.properties(dsn)))
    ),
    rule: new DataLoader(
      async (params: readonly [string, string][]) => {
        const [[dsn, ruleName]] = params;

        const rule = (await rulesLoader.load(dsn)).find(r => {
          return r.name === ruleName;
        });

        return [rule ?? null];
      },
      { batch: false }
    ),
    rules: rulesLoader,
    share: shareLoader,
    snsEndpoint: new DataLoader(
      async (ids: readonly string[]) => {
        const [id] = ids;
        return [(await getEndpoint(id)) ?? null];
      },
      { batch: false }
    ),
    snsSubscriptions: new DataLoader(
      async (ids: readonly string[]) => {
        const [id] = ids;

        return [await listSubscriptions(id)];
      },
      { batch: false }
    ),
    timezone: new DataLoader(
      async (ids: readonly string[]) => {
        const [id] = ids;

        const options: Promise<string | undefined>[] = [
          // Prioritize the actual time zone of the device
          aylaClient.timeZone(id),
          // Use the device's location as a backup
          (async () => {
            const device = await deviceLoader.load(id);
            if (device) {
              const zones = geoTz(device.lat, device.lng);
              return zones[0];
            }
          })(),
        ];

        for (const option of options) {
          const tz = await option;

          if (tz && isValidTz(tz)) return [tz];
        }

        // And have a type-safe fallback just in case
        return ["America/Chicago"];
      },
      { batch: false }
    ),
  };
}
