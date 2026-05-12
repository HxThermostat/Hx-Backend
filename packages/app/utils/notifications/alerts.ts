export type ALERT_TEMPERATURE = {
  type: "TEMPERATURE_NOTIFICATION";
  controllerId: string;
  locationId: string;
};

export type ALERT_HUMIDITY = {
  type: "HUMIDITY_NOTIFICATION";
  controllerId: string;
  locationId: string;
};

export type ALERT_FAULT = {
  type: "FAULT_NOTIFICATION";
  locationId: string;
};

export type ALERT_NOTIFICATIONS =
  | ALERT_TEMPERATURE
  | ALERT_HUMIDITY
  | ALERT_FAULT;

export function isAlertNotification(
  data: unknown
): data is ALERT_NOTIFICATIONS {
  if (!data) return false;

  const d = data as ALERT_NOTIFICATIONS;

  return (
    [
      "TEMPERATURE_NOTIFICATION",
      "HUMIDITY_NOTIFICATION",
      "FAULT_NOTIFICATION",
    ].includes(d.type) && !!d.locationId
  );
}
