import React, { useState, useCallback, useRef, useEffect } from "react";

import {
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
  Platform,
  Alert,
  Linking,
} from "react-native";

import * as Permissions from "expo-permissions";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { useRoute, RouteProp } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import MapView, { Marker, Region as MapRegion } from "react-native-maps";

import { systemWeights } from "react-native-typography";

import { DeepNonNullable, PromiseType } from "utility-types";

import {
  Screen_Settings_Away_LocationFragment as LocationType,
  useAwayLocationQuery,
} from "~/graph";

import i18n from "~/i18n";

import { addRegion, removeRegion } from "~/utils/background-tasks";
import {
  ensureOrRequestNotificationsPermissions,
  getNotificationPermissionsAsyncWithoutPrompting,
} from "~/utils/notifications";

import Background from "~/components/Background";
import Text from "~/components/Text";
import ToggleBlock from "~/components/ToggleBlock";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

import {
  currentGeofence,
  geofenceForLocation,
  getBoundingBoxAroundCircumference,
  latDeltaToMeters,
} from "./helpers";

const CIRCLE_PADDING = 60;

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
  },
  horizontal: {
    ...spacing.pxtwentyfour,
  },
  title: {
    ...fonts.secondaryHeaderSemibold,
  },
  disclosureTitle: {
    ...fonts.secondaryHeaderSemibold,
    ...spacing.mbten,
  },
  disclosureDescription: {
    ...fonts.body,
    ...systemWeights.light,
    color: colors.white,
    ...spacing.mbtwenty,
  },
  mapContainer: {},
  map: {
    height: 300,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    left: CIRCLE_PADDING / 2,
    top: CIRCLE_PADDING / 2,
    backgroundColor: Platform.select({
      ios: "rgba(255,255,255, 0.25)",
      default: "rgba(0,0,0, 0.25)",
    }),
    borderColor: Platform.select({
      ios: "rgba(255,255,255, 0.5)",
      default: "rgba(0,0,0, 0.5)",
    }),
    borderWidth: 3,
  },
});

async function hasBackgroundLocation(): Promise<boolean> {
  const { granted, permissions } = await Permissions.getAsync(
    Permissions.LOCATION
  );

  return granted && permissions["location"].scope !== "whenInUse";
}

async function askBackgroundLocation(): Promise<boolean> {
  const { granted, permissions } = await Permissions.askAsync(
    Permissions.LOCATION
  );

  return granted && permissions["location"].scope !== "whenInUse";
}

const scope = "Screens.Authenticated.SettingsNavigator.Geofence";

type Region = PromiseType<ReturnType<typeof geofenceForLocation>>;

type LocationWithCoords = LocationType &
  DeepNonNullable<Pick<LocationType, "lat" | "lng">>;

function isLocationWithCoords(
  location: LocationType
): location is LocationWithCoords {
  return location.lat != null && location.lng != null;
}

export type GeofenceProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList, "Geofence">;
  route: RouteProp<SettingsNavigatorRouteList, "Geofence">;
  data: DataHookProp<typeof useAwayLocationQuery>;
};

function Geofence({ data: { location } }: GeofenceProps): JSX.Element {
  const { width } = useWindowDimensions();
  const [tabletWidth, setTabletWidth] = useState(width);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(
    false
  );

  useEffect(() => {
    (async () => {
      const { granted } = await Permissions.getAsync(Permissions.LOCATION);
      setLocationPermissionGranted(granted);
    })();
  }, []);

  if (!location || !isLocationWithCoords(location)) throw new GoBack();

  const region = useRef<Region>();

  const mapViewRef = useRef<MapView>(null);

  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [mapRegion] = useState({
    latitude: location.lat,
    longitude: location.lng,
    longitudeDelta: 1, // doesn't really matter as we set the coords onMapReady
    latitudeDelta: 1, // doesn't really matter as we set the coords onMapReady
  });

  // Called with the current radius of this geofence (if it exists),
  // so that the map loads and zooms to the appropriate level when it
  // mounts.
  const updateMapView = useCallback((newRegion: Region) => {
    const coordinates = getBoundingBoxAroundCircumference(
      newRegion.latitude,
      newRegion.longitude,
      newRegion.radius
    );
    mapViewRef?.current?.fitToCoordinates(coordinates, {
      edgePadding: { top: 0, right: 0, bottom: 0, left: 0 },
      animated: false,
    });
  }, []);

  // Set initial map location
  const onMapReady = useCallback(() => {
    (async () => {
      region.current = await geofenceForLocation(location);
      updateMapView(region.current);
    })();
  }, [location, updateMapView]);

  // initial mount hook: see if we have the geofence
  // enabled/notifications enabled in orrder to set the toggle value
  // appropriately.
  useEffect(() => {
    (async () => {
      const [notificationsEnabled, backgroundLocation] = await Promise.all([
        getNotificationPermissionsAsyncWithoutPrompting(),
        hasBackgroundLocation(),
      ]);

      if (notificationsEnabled && backgroundLocation) {
        const current = await currentGeofence(location.id);
        setNotificationEnabled(!!current);
      } else {
        setNotificationEnabled(false);
        removeRegion(location.id);
      }
    })();
  }, [location.id]);

  const handleNotificationValueChange = useCallback(
    async (enabled: boolean): Promise<void> => {
      // Need to handle the case where we haven't (yet) identified the region for the geofence
      if (!region.current) {
        setNotificationEnabled(false);
        return;
      }

      if (!enabled) {
        setNotificationEnabled(false);
        removeRegion(location.id);
        return;
      }

      // Start by enabling the notification since some of the async
      // behaviors would otherwise cause a bit of a stutter on the
      // happy path
      setNotificationEnabled(true);

      const notificationsEnabled = await ensureOrRequestNotificationsPermissions();

      if (!notificationsEnabled) {
        setNotificationEnabled(false);
        return;
      }

      const backgroundLocation = await askBackgroundLocation();

      setLocationPermissionGranted(backgroundLocation);

      if (!backgroundLocation) {
        // https://docs.expo.io/versions/latest/sdk/location/#configuration
        Alert.alert(
          i18n.t("locationPermissionAlert.title", { scope }),
          i18n.t("locationPermissionAlert.message", { scope }),
          [
            {
              text: i18n.t("locationPermissionAlert.openSettings", { scope }),
              onPress: () => Linking.openSettings(),
            },
          ],
          { cancelable: false }
        );
        setNotificationEnabled(false);
        return;
      }

      addRegion(region.current);
    },
    [location.id]
  );

  const onRegionChange = useCallback(
    (mapRegion: MapRegion) => {
      region.current = {
        identifier: location.id,
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
        radius: latDeltaToMeters(mapRegion.latitudeDelta) / 2,
      };
    },
    [location.id]
  );

  const onTouchEnd = useCallback((): void => {
    if (!region.current) return;
    if (!notificationEnabled) return;

    addRegion(region.current);
  }, [notificationEnabled]);

  return (
    <Background>
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior={"automatic"}
        alwaysBounceVertical={false}
      >
        <View style={styles.horizontal}>
          {Platform.select({
            android: (
              <>
                <Text style={styles.disclosureTitle}>
                  {i18n.t("disclosureTitle", { scope })}
                </Text>
                <Text style={styles.disclosureDescription}>
                  {i18n.t("disclosureDescription", { scope })}
                </Text>
              </>
            ),
          })}
          <ToggleBlock
            title={i18n.t("reminder", { scope })}
            value={notificationEnabled}
            onValueChange={handleNotificationValueChange}
            body={i18n.t("getNotificationDescription", { scope })}
          />
        </View>

        <View
          style={styles.mapContainer}
          onLayout={({
            nativeEvent: {
              layout: { width },
            },
          }) => setTabletWidth(width)}
        >
          <MapView
            ref={mapViewRef}
            style={[styles.map, { width: tabletWidth, height: tabletWidth }]}
            initialRegion={mapRegion}
            mapType={Platform.select({
              ios: "mutedStandard",
              default: "standard",
            })}
            moveOnMarkerPress={false}
            onRegionChange={onRegionChange}
            onMapReady={onMapReady}
            onTouchEnd={onTouchEnd}
            minZoomLevel={7}
            maxZoomLevel={15}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={true}
            toolbarEnabled={false}
            zoomControlEnabled={true}
            zoomEnabled={true}
            showsBuildings={false}
            showsMyLocationButton={locationPermissionGranted}
            showsPointsOfInterest={false}
            showsScale={true}
            showsUserLocation={locationPermissionGranted}
          >
            <Marker
              coordinate={{
                latitude: location.lat,
                longitude: location.lng,
              }}
              title={location.name}
            />
          </MapView>
          <View
            style={[
              styles.circle,
              {
                width: tabletWidth - CIRCLE_PADDING,
                height: tabletWidth - CIRCLE_PADDING,
                borderRadius: width / 2,
              },
            ]}
            pointerEvents={"none"}
          />
        </View>
      </ScrollView>
    </Background>
  );
}

export default withQueryData(useAwayLocationQuery, {
  useVariables() {
    const route = useRoute<GeofenceProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(Geofence);
