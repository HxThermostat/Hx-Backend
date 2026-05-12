import express from "express";

import { Client } from "../ayla";

import { deliverNotification } from "../sns";
import statsd from "../stats";

import { MiddlewareOptions } from "./middleware";

interface WebhookRequest {
  dsn: string;
  name: string;
  propertyName: string;
  userId: string;
  value: string;
  valueType: string;
}

function isWebhookRequest(request: unknown): request is WebhookRequest {
  if (typeof request !== "object") return false;
  if (request == null) return false;

  const r = request as WebhookRequest;

  return !!(r.name && r.userId);
}

interface TemperatureWebhookRequest extends WebhookRequest {
  controllerId: string;
  locationId: string;
  locationName: string;
  zoneName?: string;
}

function isTemperatureWebhookRequest(
  request: WebhookRequest
): request is TemperatureWebhookRequest {
  if (!request.name.includes("TEMPERATURE_NOTIFICATION")) return false;

  const r = request as TemperatureWebhookRequest;

  return !!(r.locationName && r.controllerId);
}

interface HumidityWebhookRequest extends WebhookRequest {
  controllerId: string;
  locationId: string;
  locationName: string;
  zoneName?: string;
}

function isHumidityWebhookRequest(
  request: WebhookRequest
): request is HumidityWebhookRequest {
  if (!request.name.includes("HUMIDITY_NOTIFICATION")) return false;

  const r = request as HumidityWebhookRequest;

  return !!(r.locationName && r.controllerId);
}

interface FaultWebhookRequest extends WebhookRequest {
  locationId: string;
  locationName: string;
}

function isFaultWebhookRequest(
  request: WebhookRequest
): request is FaultWebhookRequest {
  if (!request.name.includes("FAULT_NOTIFICATION")) return false;

  const r = request as FaultWebhookRequest;

  return !!(r.locationId && r.locationName);
}

interface ServiceReminderWebhookRequest extends WebhookRequest {
  userEmail: string;
}

function isServiceReminderWebhookRequest(
  request: WebhookRequest
): request is ServiceReminderWebhookRequest {
  if (!request.name.includes("SERVICE_REMINDER_NOTIFICATION")) return false;

  const r = request as ServiceReminderWebhookRequest;

  return !!r.userEmail;
}

interface LegacyTriggerWebhookRequest {
  device: {
    dsn: string;
  };
  property: {
    name: string;
    base_type: string;
    value: string | number;
  };
  data: string;
}

interface LegacyTriggerWebhookRequestData {
  name: string;
  userId: string;
}

function isLegacyTriggerWebhookRequest(
  request: unknown
): request is LegacyTriggerWebhookRequest {
  if (typeof request !== "object") return false;
  if (request == null) return false;

  const r = request as LegacyTriggerWebhookRequest;

  if (!(r.device?.dsn && r.property?.name && r.data)) return false;

  try {
    const data = JSON.parse(r.data) as LegacyTriggerWebhookRequestData;

    if (!(data.name && data.userId)) return false;
  } catch {
    return false;
  }

  return true;
}

function toWebhookRequest(
  request: LegacyTriggerWebhookRequest
): WebhookRequest {
  const data = JSON.parse(request.data) as Record<string, unknown>;

  // There was a typo in the initial trigger conversion which caused
  // the data property to be set as:
  // { locationname: device.name }
  // instead of:
  // { locationName: device.name }
  // So we want to clean those up at conversion time
  if (data["locationname"]) {
    data["locationName"] = data["locationname"];
    delete data["locationname"];
  }

  return {
    ...((data as unknown) as LegacyTriggerWebhookRequestData),
    dsn: request.device.dsn,
    propertyName: request.property.name,
    value: String(request.property.value),
    valueType: request.property.base_type,
  };
}

async function processWebhook(request: WebhookRequest): Promise<void> {
  if (isTemperatureWebhookRequest(request)) {
    statsd.increment("webhook.temperature.processed");
    await deliverNotification(
      request.userId,
      {
        title: `Temperature alert at ${request.locationName}`,
        body: `The ${
          request.zoneName ? request.zoneName + " " : ""
        }temperature is outside of your desired range.`,
      },
      {
        type: "TEMPERATURE_NOTIFICATION",
        controllerId: request.controllerId,
        locationId: request.locationId,
      },
      request.name
    );
  } else if (isHumidityWebhookRequest(request)) {
    statsd.increment("webhook.humidity.processed");
    await deliverNotification(
      request.userId,
      {
        title: `Humidity alert at ${request.locationName}`,
        body: `The ${
          request.zoneName ? request.zoneName + " " : ""
        }humidity is ${
          request.value
        }%, which is outside of your desired range.`,
      },
      {
        type: "HUMIDITY_NOTIFICATION",
        controllerId: request.controllerId,
        locationId: request.locationId,
      },
      request.name
    );
  } else if (isFaultWebhookRequest(request)) {
    if (request.value.length > 0) {
      statsd.increment("webhook.fault.processed");
      await deliverNotification(
        request.userId,
        {
          title: `System fault at ${request.locationName}`,
          body: "Your thermostat is reporting a new fault.",
        },
        {
          type: "FAULT_NOTIFICATION",
          locationId: request.locationId,
        },
        request.name
      );
    } else {
      statsd.increment("webhook.fault.skipped");
    }
  } else if (isServiceReminderWebhookRequest(request)) {
    if (parseInt(request.value) === 1) {
      statsd.increment("webhook.service_reminder.processed");
      await new Client().sendServiceReminderEmail(request.userEmail);
    } else {
      statsd.increment("webhook.service_reminder.skipped");
    }
  }
  statsd.increment("webhook.unprocessed");
}

export default function applyMiddleware({
  app,
  path,
}: MiddlewareOptions): void {
  path = path ?? "/webhook";

  app.use(path, express.json({ strict: false }));
  app.post(path ?? "/webhook", (req, res) => {
    statsd.increment("webhook.received");

    console.debug("webhook body", req.body);

    const webhook = isWebhookRequest(req.body)
      ? req.body
      : isLegacyTriggerWebhookRequest(req.body)
      ? toWebhookRequest(req.body)
      : undefined;

    if (!webhook) {
      statsd.increment("webhook.invalid");
      res.status(404).end();
      return;
    }

    statsd.increment("webhook.valid");
    processWebhook(webhook);
    res.status(201).end();
  });
}
