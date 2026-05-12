import { AuthenticationError } from "apollo-server-express";

import {
  endpointPlatform,
  createSubscription,
  unsubscribe,
  subscriptionId,
  subscriptionArn,
  isClientError,
  isEndpoint,
} from "../sns";

import { Loaders } from "../schema/context";
import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
  PushTokenStatus,
} from "../schema/resolvers-types";

import { Client, Rule, Trigger } from "../ayla";
import {
  aylaId,
  decodeServiceDates,
  encodeServiceDates,
  isZoning,
  supportsHumdification,
  zoneNum,
} from "../utils/ayla";

import { NotFound } from "./common";

enum Notifications {
  TEMPERATURE = "TEMPERATURE_NOTIFICATION",
  HUMIDITY = "HUMIDITY_NOTIFICATION",
  FAULT = "FAULT_NOTIFICATION",
  SERVICE_REMINDER = "SERVICE_REMINDER_NOTIFICATION",
}

const CONTROLLER_NOT_FOUND = NotFound("Couldn't find controller");
const LOCATION_NOT_FOUND = NotFound("Couldn't find location");

const [DEFAULT_MIN_TEMPERATURE, DEFAULT_MAX_TEMPERATURE] = [60, 87];
const [MIN_TEMPERATURE, MAX_TEMPERATURE] = [40, 90];
const TEMPERATURE_GAP = 2;

const [DEFAULT_MIN_HUMIDITY, DEFAULT_MAX_HUMIDITY] = [0.15, 0.63];
const [MIN_HUMIDITY, MAX_HUMIDITY] = [0.15, 0.65];
const HUMIDITY_GAP = 0.05;

const ruleName = (name: Notifications, dsn: string, property: string): string =>
  [dsn, name, property].join(".");

const temperatureRuleName = (dsn: string, zone: number): string =>
  ruleName(Notifications.TEMPERATURE, dsn, `IDTmp${zone + 1}`);

const humidityRuleName = (dsn: string, zone: number): string =>
  ruleName(Notifications.HUMIDITY, dsn, `Hum${zone + 1}`);

const faultRuleName = (dsn: string): string =>
  ruleName(Notifications.FAULT, dsn, "Fault");

const serviceReminderRuleName = (dsn: string): string =>
  ruleName(Notifications.SERVICE_REMINDER, dsn, "ServiceReminder");

const extractThresholds = (expression: string): [number, number] => {
  // DATAPOINT(SOMEDSN, IDTmp1) < 60 ||  DATAPOINT(SOMEDSN, IDTmp1) > 80
  const minimum = /DATAPOINT\([a-zA-Z0-9]+, [a-zA-Z0-9]+\) <=? (?<minimum>[0-9]+)/g.exec(
    expression
  )?.groups?.["minimum"];
  const maximum = /DATAPOINT\([a-zA-Z0-9]+, [a-zA-Z0-9]+\) >=? (?<maximum>[0-9]+)/g.exec(
    expression
  )?.groups?.["maximum"];

  if (!minimum || !maximum)
    throw new Error(`Invalid expression format: ${expression}`);

  return [parseInt(minimum), parseInt(maximum)];
};

const extractTemperatureThresholds = (expression: string): [number, number] =>
  extractThresholds(expression);
const extractHumidityThresholds = (expression: string): [number, number] => {
  const [min, max] = extractThresholds(expression);

  return [min / 100, max / 100];
};

const affixWithinRange = ({
  value,
  minimum,
  maximum,
}: {
  value: number;
  minimum: number;
  maximum: number;
}): number => Math.min(Math.max(value, minimum), maximum);

const rangeExpression = (
  dsn: string,
  propertyName: string,
  minimum: number,
  maximum: number
): string =>
  `DATAPOINT(${dsn}, ${propertyName}) < ${minimum} || DATAPOINT(${dsn}, ${propertyName}) > ${maximum}`;

const temperatureExpression = (
  dsn: string,
  zone: number,
  minimum: number,
  maximum: number
): string =>
  rangeExpression(
    dsn,
    `IDTmp${zone + 1}`,
    affixWithinRange({
      value: minimum,
      minimum: MIN_TEMPERATURE,
      maximum: MAX_TEMPERATURE - TEMPERATURE_GAP,
    }),
    affixWithinRange({
      value: maximum,
      minimum: MIN_TEMPERATURE + TEMPERATURE_GAP,
      maximum: MAX_TEMPERATURE,
    })
  );

const humidityExpression = (
  dsn: string,
  zone: number,
  minimum: number,
  maximum: number
): string =>
  rangeExpression(
    dsn,
    `Hum${zone + 1}`,
    affixWithinRange({
      value: minimum > 1 ? minimum / 100 : minimum,
      minimum: MIN_HUMIDITY,
      maximum: MAX_HUMIDITY - HUMIDITY_GAP,
    }) * 100,
    affixWithinRange({
      value: maximum > 1 ? maximum / 100 : maximum,
      minimum: MIN_HUMIDITY + HUMIDITY_GAP,
      maximum: MAX_HUMIDITY,
    }) * 100
  );

const changedExpression = (dsn: string, propertyName: string): string =>
  `changed(DATAPOINT(${dsn}, ${propertyName}))`;

const faultExpression = (dsn: string): string =>
  changedExpression(dsn, "Fault");

const serviceReminderExpression = (dsn: string): string =>
  changedExpression(dsn, "ServiceReminder");

const CHANGED_EXPRESSION_RE = /changed\(datapoint\(([^,]+), ?([^)]+)\)\)/i;
const IDTMP_EXPRESSION_RE = /DATAPOINT\(([^,]+), ?IdTmp([0-9])+/;
const HUM_EXPRESSION_RE = /DATAPOINT\(([^,]+), ?Hum([0-9])+/;

const toggleNotification = async (
  dsn: string,
  name: string,
  expression: string,
  enabled: boolean,
  metadata: Record<string, string>,
  userId: string,
  loaders: Loaders,
  aylaClient: Client
): Promise<void> => {
  // Shim the Fault + ServiceReminder notifications as Triggers
  const faultMatch = CHANGED_EXPRESSION_RE.exec(expression);
  if (faultMatch != null) {
    const propertyName = faultMatch[2];
    const triggers = (await aylaClient.allTriggers()).filter(
      t => t.property_nickname === name
    );

    await Promise.all(triggers.map(t => aylaClient.deleteTrigger(t.key)));

    if (enabled) {
      await aylaClient.addOnChangeWebhook(
        name,
        dsn,
        propertyName,
        userId,
        metadata
      );
    }

    // Because Ayla does't have a way to enforce Trigger uniqueness,
    // we're running this cleanup function to remove any dupes that
    // could be created
    setTimeout(() => {
      aylaClient
        .allTriggers()
        .then(triggers => {
          triggers
            .filter(t => t.property_nickname === name)
            .sort((a, b) => a.key - b.key)
            .slice(1)
            .map(t => aylaClient.deleteTrigger(t.key));
        })
        .catch(() => undefined);
    }, 2000 + Math.random() * 3000);

    return;
  } else {
    const rule = await aylaClient.addRule(name, dsn, expression, metadata);

    if (enabled !== rule.enabled) {
      await aylaClient.toggleRule(name, dsn, enabled);
    }
  }

  loaders.rule.clear([dsn, name]);
  loaders.rules.clear(dsn);
};

const adjustNotificationThreshold = async (
  dsn: string,
  name: string,
  expression: string,
  metadata: Record<string, string>,
  loaders: Loaders,
  aylaClient: Client
): Promise<void> => {
  const rule = await aylaClient.addRule(name, dsn, expression, metadata);

  const { enabled } = rule;
  if (rule.expression !== expression) {
    await aylaClient.removeRule(name, dsn);
    await aylaClient.addRule(name, dsn, expression, metadata);

    if (!enabled) await aylaClient.toggleRule(name, dsn, false);
  }

  loaders.rule.clear([dsn, name]).prime([dsn, name], rule);
  loaders.rules.clear(dsn);
};

const convertFaultTrigger = async (
  trigger: Trigger,
  aylaClient: Client
): Promise<void> => {
  if (trigger.property_name !== "Fault") return;

  if (trigger.active) {
    if (trigger.property_nickname.includes(Notifications.FAULT)) {
      // There was a typo in the initial trigger conversion which set
      // param5 with:
      // { locationname: device.name }
      // instead of:
      // { locationName: device.name }
      // So we want to clean those up too
      if (!trigger.trigger_apps[0]?.param5?.includes("locationname")) {
        return;
      }
    }

    const dsn = await aylaClient.propertyKeyToDsn(trigger.property_key);
    const device = await aylaClient.device(dsn);

    aylaClient.addOnChangeWebhook(
      faultRuleName(dsn),
      dsn,
      "Fault",
      device.userUuid,
      {
        locationId: dsn,
        locationName: device.name,
      }
    );
  }

  await aylaClient.deleteTrigger(trigger.key);
};

const triggersMatch = (a: Trigger, b: Trigger): boolean => {
  return (
    typeof a.compare_type === typeof b.compare_type &&
    a.property_key === b.property_key &&
    a.trigger_type === b.trigger_type
  );
};

const convertRangeTrigger = async (
  a: Trigger,
  b: Trigger,
  aylaClient: Client
): Promise<void> => {
  if (!triggersMatch(a, b)) return;
  if (isNaN(parseFloat(String(a.value))) || isNaN(parseFloat(String(b.value))))
    return;
  if (
    !a.property_name.startsWith("Hum") &&
    !a.property_name.startsWith("IDTmp")
  )
    return;

  const [low, high] = [
    parseFloat(String(a.value)),
    parseFloat(String(b.value)),
  ].sort();

  if (a.active && b.active) {
    const dsn = await aylaClient.propertyKeyToDsn(a.property_key);
    const device = await aylaClient.device(dsn);
    const zone = parseInt(a.property_name.replace(/^[^0-9]+/, "")) - 1;

    const metadata = {
      controllerId: device.zoning ? `Z${dsn}-${zone}` : `N${dsn}`,
      locationId: dsn,
      locationName: device.name,
      ...(device.zoneName?.[zone] ? { zoneName: device.zoneName?.[zone] } : {}),
    };

    if (a.property_name.startsWith("Hum")) {
      await aylaClient.addRule(
        humidityRuleName(dsn, zone),
        dsn,
        humidityExpression(dsn, zone, low, high),
        metadata
      );
    } else if (a.property_name.startsWith("IDTmp")) {
      await aylaClient.addRule(
        temperatureRuleName(dsn, zone),
        dsn,
        temperatureExpression(dsn, zone, low, high),
        metadata
      );
    }
  }

  await Promise.all(
    [a, b].map(trigger => aylaClient.deleteTrigger(trigger.key))
  );
};

const convertFaults = (
  triggers: Trigger[],
  aylaClient: Client
): Promise<void>[] => {
  return triggers
    .filter(trigger => trigger.property_name === "Fault")
    .map(trigger => convertFaultTrigger(trigger, aylaClient));
};

const convertRanges = (
  triggers: Trigger[],
  propertyPrefix: string,
  aylaClient: Client
): Promise<void>[] => {
  triggers = triggers.filter(trigger =>
    trigger.property_name.startsWith(propertyPrefix)
  );

  const triggerPairs: Promise<void>[] = [];
  for (let i = 0; i < triggers.length - 1; i++) {
    for (let j = i + 1; j < triggers.length; j++) {
      triggerPairs.push(
        convertRangeTrigger(triggers[i], triggers[j], aylaClient)
      );
    }
  }

  return triggerPairs;
};

const cleanupRules = (
  rules: Rule[],
  aylaClient: Client,
  loaders: Loaders
): Promise<void>[] => {
  return rules.map(rule => {
    // Initially, fault notifications were build using Rules, these
    // didn't work but we still want to clean up any that were created
    const faultMatch = CHANGED_EXPRESSION_RE.exec(rule.expression);
    if (faultMatch && faultMatch[2].toLowerCase() === "fault") {
      const dsn = faultMatch[1];

      return aylaClient.removeRule(rule.name, dsn);
    }

    // We launched with the wrong property name for IDTmp (we used
    // IdTmp) so we need to migrate these Rules to point to the
    // correct property name
    const idTmpMatch = IDTMP_EXPRESSION_RE.exec(rule.expression);
    if (idTmpMatch) {
      const dsn = idTmpMatch[1];
      const zone = parseInt(idTmpMatch[2]) - 1;
      const [min, max] = extractTemperatureThresholds(rule.expression);

      return loaders.device
        .load(dsn)
        .then(device => {
          if (!device) return;
          return adjustNotificationThreshold(
            dsn,
            temperatureRuleName(dsn, zone),
            temperatureExpression(dsn, zone, min, max),
            {
              controllerId: device.zoning ? `Z${dsn}-${zone}` : `N${dsn}`,
              locationId: dsn,
              locationName: device.name,
              ...(device.zoneName?.[zone]
                ? { zoneName: device.zoneName?.[zone] }
                : {}),
            },
            loaders,
            aylaClient
          );
        })
        .then(() => {
          return aylaClient.removeRule(rule.name, dsn);
        });
    }

    // We initially converted humidity notifications improperly (we
    // treated the range values as floating point values in the range
    // of [0, 1] when instead they were integer values in the range
    // [0, 100])
    const humMatch = HUM_EXPRESSION_RE.exec(rule.expression);
    if (humMatch) {
      const dsn = humMatch[1];
      const zone = parseInt(humMatch[2]) - 1;
      let [min, max] = extractHumidityThresholds(rule.expression);
      let adjusted = false;

      if (min >= 1) {
        min = min / 100;
        adjusted = true;
      }

      if (max >= 1) {
        max = max / 100;
        adjusted = true;
      }

      if (adjusted) {
        return loaders.device.load(dsn).then(device => {
          if (!device) return;
          return adjustNotificationThreshold(
            dsn,
            humidityRuleName(dsn, zone),
            humidityExpression(dsn, zone, min, max),
            {
              controllerId: device.zoning ? `Z${dsn}-${zone}` : `N${dsn}`,
              locationId: dsn,
              locationName: device.name,
              ...(device.zoneName?.[zone]
                ? { zoneName: device.zoneName?.[zone] }
                : {}),
            },
            loaders,
            aylaClient
          );
        });
      }
    }
    return Promise.resolve();
  });
};

const cleanup = async (aylaClient: Client, loaders: Loaders): Promise<void> => {
  const rules = (await aylaClient.rules()).filter(rule =>
    [
      Notifications.FAULT,
      Notifications.HUMIDITY,
      Notifications.TEMPERATURE,
    ].some(name => rule.name.includes(name))
  );

  const triggers = await aylaClient.allTriggers();

  await Promise.all([
    ...cleanupRules(rules, aylaClient, loaders),
    ...convertFaults(triggers, aylaClient),
    ...convertRanges(triggers, "IDTmp", aylaClient),
    ...convertRanges(triggers, "Hum", aylaClient),
  ]);
};

const removeOriginalServiceReminderTriggers = async (
  aylaClient: Client,
  loaders: Loaders
): Promise<void> => {
  const triggers = await aylaClient.allTriggers();

  const toRemove = triggers.filter(trigger =>
    trigger.trigger_apps.find(app =>
      app.email_template_id?.includes(" jci_hx_service_reminder_universal")
    )
  );

  try {
    await Promise.all(
      toRemove.map(trigger => aylaClient.deleteTrigger(trigger.key))
    );
  } catch {
    // We can ignore these errors since it's just for cleanup
  } finally {
    if (toRemove.length) {
      loaders.rule.clearAll();
      loaders.rules.clearAll();
    }
  }
};

export const resolver: Resolvers = {
  Controller: {
    humidityNotification: async ({ dsn, zone, znSensor }, _, { loaders }) => {
      if (!supportsHumdification(znSensor?.[zone])) return null;

      const rule = await loaders.rule.load([dsn, humidityRuleName(dsn, zone)]);

      let [min, max] = [DEFAULT_MIN_HUMIDITY, DEFAULT_MAX_HUMIDITY];

      if (rule) {
        [min, max] = extractHumidityThresholds(rule.expression);
      }

      return {
        __typename: "HumidityNotification",
        enabled: rule?.enabled ?? false,
        min,
        max,
      };
    },
    temperatureNotification: async ({ dsn, zone }, _, { loaders }) => {
      const rule = await loaders.rule.load([
        dsn,
        temperatureRuleName(dsn, zone),
      ]);

      let [min, max] = [DEFAULT_MIN_TEMPERATURE, DEFAULT_MAX_TEMPERATURE];

      if (rule) {
        [min, max] = extractTemperatureThresholds(rule.expression);
      }

      return {
        __typename: "TemperatureNotification",
        enabled: rule?.enabled ?? false,
        min,
        max,
      };
    },
  },
  Location: {
    faultNotification: async ({ dsn }, _, { loaders }) => {
      const rule = await loaders.rule.load([dsn, faultRuleName(dsn)]);

      return {
        __typename: "FaultNotification",
        enabled: rule?.enabled ?? false,
      };
    },
    serviceReminder: async ({ dsn, serviceDates }, _, { loaders }) => {
      const { spring, fall } = decodeServiceDates(serviceDates);

      const rule = await loaders.rule.load([dsn, serviceReminderRuleName(dsn)]);

      return {
        __typename: "ServiceReminder",
        enabled: rule?.enabled ?? false,
        spring: spring ? spring : { month: 3, day: 15 },
        fall: fall ? fall : { month: 9, day: 15 },
      };
    },
  },
  PushToken: {
    id: ({ subscriptionArn }) => subscriptionId(subscriptionArn),
    platform: ({ endpointArn }) => endpointPlatform(endpointArn),
    status: async ({ endpointArn }, _, { loaders }) => {
      const endpoint = await loaders.snsEndpoint.load(endpointArn);

      return endpoint?.Attributes["Enabled"] === "true"
        ? PushTokenStatus.Enabled
        : PushTokenStatus.Disabled;
    },
    token: async ({ endpointArn }, _, { loaders }) => {
      const endpoint = await loaders.snsEndpoint.load(endpointArn);

      return endpoint?.Attributes["Token"] ?? "";
    },
  },
  User: {
    pushTokens: async ({ id }, _, { loaders }) => {
      const subscriptions = await loaders.snsSubscriptions.load(id);

      return subscriptions
        .filter(s => s.Protocol?.toLowerCase() === "application")
        .map(s => {
          return {
            endpointArn: s.Endpoint,
            subscriptionArn: s.SubscriptionArn,
            topicArn: s.TopicArn,
          };
        });
    },
  },
};

export const queryResolver: QueryResolvers = {};

export const mutationResolver: MutationResolvers = {
  subscribeToNotifications: async (
    _root,
    { input: { token, platform } },
    { loaders, user, aylaClient }
  ) => {
    if (!user) throw new AuthenticationError("Authentication required");

    let endpointArn: string;
    let subscriptionArn: string;
    let topicArn: string;

    const subscriptions = await loaders.snsSubscriptions.load(user.id);
    const endpoints = await loaders.snsEndpoint.loadMany(
      subscriptions.map(({ Endpoint }) => Endpoint)
    );

    const existing = endpoints.find(
      endpoint => isEndpoint(endpoint) && endpoint.Attributes["Token"] === token
    );

    // NOTE(nleach): We're still vulnerable to a race condition here
    // if two of these mutations arrive at the "same time". This would
    // be a good place to add a mutex.
    if (isEndpoint(existing)) {
      // Because we can only load the Endpoint via a Subscription, we
      // know that this find operation must succeed at runtime
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const subscription = subscriptions.find(
        ({ Endpoint }) => Endpoint === existing.EndpointArn
      )!;

      endpointArn = existing.EndpointArn;
      subscriptionArn = subscription.SubscriptionArn;
      topicArn = subscription.TopicArn;
    } else {
      [endpointArn, subscriptionArn, topicArn] = await createSubscription(
        user.id,
        platform,
        token
      );
    }

    // Clean up the notifications from the pre-Kraftful implementation
    void cleanup(aylaClient, loaders);

    return {
      __typename: "SubscribeToNotificationsSuccess",
      pushToken: {
        endpointArn,
        subscriptionArn,
        topicArn,
      },
    };
  },
  unsubscribeFromNotifications: async (
    _root,
    { input: { id } },
    { loaders, user }
  ) => {
    try {
      await unsubscribe(subscriptionArn(id));
    } catch (e) {
      if (isClientError(e)) {
        return NotFound("PushToken not found");
      }
      throw e;
    }

    if (user) {
      loaders.snsSubscriptions.clear(user.id);
    }

    return {
      __typename: "UnsubscribeFromNotificationsSuccess",
    };
  },
  toggleFaultNotification: async (
    _root,
    { input: { id, enabled } },
    { aylaClient, loaders }
  ) => {
    const device = await loaders.device.load(id);

    if (!device) return LOCATION_NOT_FOUND;

    const { dsn } = device;

    await toggleNotification(
      dsn,
      faultRuleName(dsn),
      faultExpression(dsn),
      enabled,
      {
        locationId: id,
        locationName: device.name,
      },
      device.userUuid,
      loaders,
      aylaClient
    );

    return {
      __typename: "ToggleFaultNotificationSuccess",
      location: device,
    };
  },
  toggleHumidityNotification: async (
    _root,
    { input: { id, enabled } },
    { aylaClient, loaders }
  ) => {
    const aId = aylaId(id);
    const device = await loaders.device.load(aId);

    if (!device) return CONTROLLER_NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return CONTROLLER_NOT_FOUND;
    }

    const { dsn } = device;

    await toggleNotification(
      dsn,
      humidityRuleName(dsn, zone),
      humidityExpression(dsn, zone, DEFAULT_MIN_HUMIDITY, DEFAULT_MAX_HUMIDITY),
      enabled,
      {
        controllerId: id,
        locationId: aId,
        locationName: device.name,
        ...(device.zoneName?.[zone]
          ? { zoneName: device.zoneName?.[zone] }
          : {}),
      },
      device.userUuid,
      loaders,
      aylaClient
    );

    return {
      __typename: "ToggleHumidityNotificationSuccess",
      controller: { ...device, zone },
    };
  },
  adjustHumidityNotificationThreshold: async (
    _root,
    { input: { id, min, max } },
    { aylaClient, loaders }
  ) => {
    const aId = aylaId(id);
    const device = await loaders.device.load(aId);

    if (!device) return CONTROLLER_NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return CONTROLLER_NOT_FOUND;
    }

    const { dsn } = device;

    await adjustNotificationThreshold(
      dsn,
      humidityRuleName(dsn, zone),
      humidityExpression(dsn, zone, min, max),
      {
        controllerId: id,
        locationId: aId,
        locationName: device.name,
        ...(device.zoneName?.[zone]
          ? { zoneName: device.zoneName?.[zone] }
          : {}),
      },
      loaders,
      aylaClient
    );

    return {
      __typename: "AdjustHumidityNotificationThresholdSuccess",
      controller: { ...device, zone },
    };
  },
  toggleServiceReminder: async (
    _root,
    { input: { id, enabled } },
    { aylaClient, loaders, user }
  ) => {
    if (!user) throw new AuthenticationError("Authentication required");

    const location = await loaders.device.load(id);

    if (!location) return LOCATION_NOT_FOUND;

    void removeOriginalServiceReminderTriggers(aylaClient, loaders);

    const serviceDates = decodeServiceDates(location.serviceDates);

    if (enabled) {
      location.serviceDates = encodeServiceDates({
        spring: serviceDates.spring ?? { month: 3, day: 15 },
        fall: serviceDates.fall ?? { month: 9, day: 15 },
      });
    }

    if (!enabled && location.serviceDates) {
      location.serviceDates = "";
    }

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(location.dsn, "ServiceDates", location.serviceDates)
    );

    loaders.device.clear(id).prime(id, location);

    const { dsn } = location;

    await toggleNotification(
      dsn,
      serviceReminderRuleName(dsn),
      serviceReminderExpression(dsn),
      enabled,
      {
        userEmail: user.email,
      },
      location.userUuid,
      loaders,
      aylaClient
    );

    return {
      __typename: "ToggleServiceReminderSuccess",
      location,
    };
  },
  adjustServiceReminderDates: async (
    _root,
    { input: { id, spring, fall } },
    { aylaClient, loaders }
  ) => {
    const location = await loaders.device.load(id);

    if (!location) return LOCATION_NOT_FOUND;

    void removeOriginalServiceReminderTriggers(aylaClient, loaders);

    location.serviceDates = encodeServiceDates({ spring, fall });

    await aylaClient.batchDatapoints(
      aylaClient.datapoint(location.dsn, "ServiceDates", location.serviceDates)
    );

    loaders.device.clear(id).prime(id, location);

    return {
      __typename: "AdjustServiceReminderDatesSuccess",
      location,
    };
  },
  toggleTemperatureNotification: async (
    _root,
    { input: { id, enabled } },
    { aylaClient, loaders }
  ) => {
    const aId = aylaId(id);
    const device = await loaders.device.load(aId);

    if (!device) return CONTROLLER_NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return CONTROLLER_NOT_FOUND;
    }

    const { dsn } = device;

    await toggleNotification(
      dsn,
      temperatureRuleName(dsn, zone),
      temperatureExpression(
        dsn,
        zone,
        DEFAULT_MIN_TEMPERATURE,
        DEFAULT_MAX_TEMPERATURE
      ),
      enabled,
      {
        controllerId: id,
        locationId: aId,
        locationName: device.name,
        ...(device.zoneName?.[zone]
          ? { zoneName: device.zoneName?.[zone] }
          : {}),
      },
      device.userUuid,
      loaders,
      aylaClient
    );

    return {
      __typename: "ToggleTemperatureNotificationSuccess",
      controller: { ...device, zone },
    };
  },
  adjustTemperatureNotificationThreshold: async (
    _root,
    { input: { id, min, max } },
    { aylaClient, loaders }
  ) => {
    const aId = aylaId(id);
    const device = await loaders.device.load(aId);

    if (!device) return CONTROLLER_NOT_FOUND;

    let zone = 0;
    if (isZoning(device)) {
      zone = zoneNum(id);
      if (isNaN(zone) || zone >= device.zones) return CONTROLLER_NOT_FOUND;
    }

    const { dsn } = device;

    await adjustNotificationThreshold(
      dsn,
      temperatureRuleName(dsn, zone),
      temperatureExpression(dsn, zone, min, max),
      {
        controllerId: id,
        locationId: aId,
        locationName: device.name,
        ...(device.zoneName?.[zone]
          ? { zoneName: device.zoneName?.[zone] }
          : {}),
      },
      loaders,
      aylaClient
    );

    return {
      __typename: "AdjustTemperatureNotificationThresholdSuccess",
      controller: { ...device, zone },
    };
  },
};
