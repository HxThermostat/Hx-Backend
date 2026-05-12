import { Platform } from "react-native";

import {
  ApolloClient,
  InMemoryCache,
  FieldMergeFunction,
  StoreObject,
  FieldFunctionOptions,
} from "@apollo/client";

import { appVersion } from "~/utils/version";

import introspectionResult from "../introspectionResult";
import { Controller, Location, Schedule } from "../schema";

import { buildLink } from "./links";

const objectMerge: FieldMergeFunction = (existing, incoming) => {
  return incoming && { ...existing, ...incoming };
};

const takeIncomingArray: FieldMergeFunction = (_, incoming) => {
  return incoming;
};

export function mergeArrayByField<T>(field: keyof T, keepExisting = true) {
  return function merge(
    existing: readonly (T & StoreObject)[] | null,
    incoming: readonly (T & StoreObject)[] | null,
    { readField, mergeObjects }: FieldFunctionOptions
  ): (T & StoreObject)[] {
    // Start with all of the existing entities
    const merged: (T & StoreObject)[] = existing ? existing.slice(0) : [];

    const indexes: Record<string, number> = Object.create(null);
    (existing ?? []).forEach((item, i) => {
      const indexField = readField<string>(field.toString(), item);

      if (indexField == null) return;

      indexes[indexField] = i;
    });

    const incomingIndexes = new Set<string>();

    // Update merged by either adding the new entities from incoming
    // Or updating the existing entities with the data from incoming
    (incoming ?? []).forEach(item => {
      const indexField = readField<string>(field.toString(), item);

      if (indexField == null) return;

      // Keep track of the entities we see when processing incoming so
      // that we know which to keep if keepExisting is false
      incomingIndexes.add(indexField);

      const index = indexes[indexField];
      if (typeof index === "number") {
        const mergedObject = mergeObjects(merged[index], item);
        if (mergedObject) {
          merged[index] = mergedObject;
        }
      } else {
        indexes[indexField] = merged.length;
        merged.push(item);
      }
    });

    if (!keepExisting) {
      // Only include the entities which were included in incoming
      // (with the data from existing, where appropraite)
      return merged.filter(item => {
        const indexField = readField<string>(field.toString(), item);

        if (indexField == null) return false;

        return incomingIndexes.has(indexField);
      });
    }

    return merged;
  };
}

export const client = new ApolloClient({
  connectToDevTools: __DEV__,
  cache: new InMemoryCache({
    possibleTypes: introspectionResult.possibleTypes,
    typePolicies: {
      Query: {
        fields: {
          // https://www.apollographql.com/docs/react/caching/advanced-topics/#cache-redirects-using-field-policy-read-functions
          controller: (_, { args, toReference }) =>
            toReference({
              __typename: "Controller",
              id: args?.id,
            }),
          location: (_, { args, toReference }) =>
            toReference({
              __typename: "Location",
              id: args?.id,
            }),
          // https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects
          controllers: {
            merge: mergeArrayByField<Controller>("id", false),
          },
          locations: {
            merge: mergeArrayByField<Location>("id", false),
          },
        },
      },
      // https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects
      Away: {
        fields: {
          setpoints: {
            merge: objectMerge,
          },
        },
      },
      Controller: {
        fields: {
          activeScheduleEvent: {
            merge: objectMerge,
          },
          away: {
            merge: objectMerge,
          },
          coolRange: {
            merge: objectMerge,
          },
          humidification: {
            merge: objectMerge,
          },
          humidityNotification: {
            merge: objectMerge,
          },
          fan: {
            merge: objectMerge,
          },
          location: {
            merge: objectMerge,
          },
          modes: {
            merge: takeIncomingArray,
          },
          schedule: {
            merge: mergeArrayByField<Schedule>("day"),
          },
          setpoints: {
            merge: objectMerge,
          },
          temperatureNotification: {
            merge: objectMerge,
          },
        },
      },
      Fan: {
        fields: {
          modes: {
            merge: takeIncomingArray,
          },
        },
      },
      Location: {
        fields: {
          airflow: {
            merge: objectMerge,
          },
          controllers: {
            merge: mergeArrayByField<Controller>("id"),
          },
          dealer: {
            merge: objectMerge,
          },
          faultNotification: {
            merge: objectMerge,
          },
          faults: {
            merge: takeIncomingArray,
          },
          modes: {
            merge: takeIncomingArray,
          },
          shares: {
            merge: takeIncomingArray,
          },
          statusIndoor: {
            merge: takeIncomingArray,
          },
          statusIndoorEEV: {
            merge: takeIncomingArray,
          },
          statusOutdoor: {
            merge: takeIncomingArray,
          },
          statusThermostat: {
            merge: takeIncomingArray,
          },
          statusZone: {
            merge: takeIncomingArray,
          },
          vacation: {
            merge: objectMerge,
          },
        },
      },
      Schedule: {
        fields: {
          awake: {
            merge: objectMerge,
          },
          arrive: {
            merge: objectMerge,
          },
          bed: {
            merge: objectMerge,
          },
          events: {
            merge: takeIncomingArray,
          },
          leave: {
            merge: objectMerge,
          },
        },
      },
      ScheduleEvent: {
        fields: {
          setpoints: {
            merge: objectMerge,
          },
        },
      },
      ZoneVersion: {
        fields: {
          zoneSensor: {
            merge: takeIncomingArray,
          },
        },
      },
    },
  }),
  // Use the authenticated link chain without any refresh error
  // handling since we'll overwrite this in the bootstrap step and any
  // requests we make before that should be auth'd (if possible)
  link: buildLink(async () => Promise.resolve()),
  name: Platform.OS,
  version: appVersion,
});
