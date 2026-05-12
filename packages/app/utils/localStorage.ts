import AsyncStorage from "@react-native-async-storage/async-storage";

// wraps most common Async storage functions into helpers
// we can add others as needed

export const EXAMPLE_KEY = "@hx:some_key_name"; // can refer to keys as consts in app
export const LAST_SCREEN_VISITED = "@hx:last_screen_visited";
export const LOGIN_EMAIL = "@hx:login_email";

export const buildLastGeofenceTimestampKey = (locationId: string): string =>
  `@hx:last_geofence_timestamp:${locationId}`;

export const buildLastGeofenceEventKey = (locationId: string): string =>
  `@hx:last_geofence_event:${locationId}`;

export const buildAirflowTestKey = (id: string): string =>
  `@hx:airflow_test_timestamp:${id}`;
export const HAS_VIEWED_WHATS_NEW = "@hx:has_viewed_whats_new";
export const SELECTED_CONTROLLER = "@hx:controller_context:controllerId";
export const FRESH_INSTALL_FLAG = "@hx:fresh_install_flag";
export const RATING_PROMPT_DISPLAYED = "@hx:rating_prompt_displayed";
export const DEVICE_PUSH_TOKEN = "@hx:device_push_token";

// Loads a key from storage and parses it if it exists
export async function loadFromAsyncStorage<T>(key: string): Promise<T | null> {
  try {
    const item = await AsyncStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  } catch {
    return null;
  }
}

// Saves an object to storage
export async function saveToAsyncStorage<T = string>(
  key: string,
  value: T
): Promise<boolean> {
  try {
    // async storage has to be stored as strings
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// removes an item from storage
export async function removeFromAsyncStorage(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    //todo?
  }
}

// clears all storage - perhaps on logout?
export async function clearAsyncStorage(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {
    // todo?
  }
}
