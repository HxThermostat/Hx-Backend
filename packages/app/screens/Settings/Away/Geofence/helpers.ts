import { LocationRegion } from "expo-location";
import { getTaskOptionsAsync, isTaskRegisteredAsync } from "expo-task-manager";
import { GEOFENCE_TASK } from "~/utils/background-tasks";

// map helpers
type Coordinate = {
  latitude: number;
  longitude: number;
};

// https://stackoverflow.com/questions/52060188/fit-mapview-to-circle-bounds
// below is from ^ - to calculate coordinates of circle
export const getBoundingBoxAroundCircumference = (
  latitude: number,
  longitude: number,
  radiusMeters: number
): Coordinate[] => {
  const radius = radiusMeters / 1000.0;
  const earthRadius = 6378.1; //Km
  const lat0 = latitude + (-radius / earthRadius) * (180 / Math.PI);
  const lat1 = latitude + (radius / earthRadius) * (180 / Math.PI);
  const lng0 =
    longitude +
    ((-radius / earthRadius) * (180 / Math.PI)) /
      Math.cos((latitude * Math.PI) / 180);
  const lng1 =
    longitude +
    ((radius / earthRadius) * (180 / Math.PI)) /
      Math.cos((latitude * Math.PI) / 180);

  return [
    {
      latitude: lat0,
      longitude: longitude,
    }, //bottom
    {
      latitude: latitude,
      longitude: lng0,
    }, //left
    {
      latitude: lat1,
      longitude: longitude,
    }, //top
    {
      latitude: latitude,
      longitude: lng1,
    }, //right
  ];
};

export const currentGeofence = async (
  locationId: string
): Promise<LocationRegion | null> => {
  const registered = await isTaskRegisteredAsync(GEOFENCE_TASK);

  if (!registered) return null;

  const options = await getTaskOptionsAsync<{
    regions: LocationRegion[];
  } | null>(GEOFENCE_TASK);

  return options?.regions.find(r => r.identifier === locationId) ?? null;
};

export const geofenceForLocation = async (location: {
  id: string;
  lat: number;
  lng: number;
}): Promise<Required<
  Pick<LocationRegion, "identifier" | "latitude" | "longitude" | "radius">
>> => {
  const current = await currentGeofence(location.id);

  if (current) {
    return {
      ...current,
      identifier: location.id,
    };
  }

  return {
    identifier: location.id,
    latitude: location.lat,
    longitude: location.lng,
    radius: 1500,
  };
};

export const latDeltaToMeters = (latDelta: number): number => {
  // https://github.com/react-native-maps/react-native-maps/issues/505#issuecomment-421323208
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;

  return oneDegreeOfLatitudeInMeters * latDelta;
};
