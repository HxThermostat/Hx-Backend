import React, { useEffect } from "react";
import { Linking } from "react-native";

import { createNativeStackNavigator } from "react-native-screens/native-stack";

import { setBadgeCountAsync, setNotificationHandler } from "expo-notifications";

import { ControllerProvider, useAuth } from "~/contexts";

import SplashScreen from "~/screens/Splash";
import UpdateRequired from "~/screens/UpdateRequired";
import WhatsNew from "~/screens/WhatsNew";

import HomeOwnerNavigator from "./HomeOwnerNavigator";
import OnboardingNavigator from "./OnboardingNavigator";
import ProAppNavigator from "./ProAppNavigator";
import UnauthenticatedNavigator from "./UnauthenticatedNavigator";

import { deepLinkInitialURL } from "~/utils/linking";
import {
  isGeofenceNotification,
  usePushTokenListener,
} from "~/utils/notifications";

export type AppNavigatorRouteList = {
  Unauthenticated: undefined;
  Onboarding: undefined;
  Homeowner: undefined;
  Pro: undefined;
};

const Stack = createNativeStackNavigator<AppNavigatorRouteList>();

// NOTE(nleach): After going through a couple of largely failed
// attempts to refactor this Navigator I figured it was worth
// documenting why it is the way it is. This doesn't _really_ behave
// like a navigator. We need to have these top-level routes to make
// the deeplinking config work sensibly. We don't intend to ever do
// something like _navigate_ between the Unauthenticated navigator and
// the Pro navigator, which is why we render the navigator with a
// single screen in each code path.
export default function AppNavigator(): JSX.Element {
  const {
    bootstrap,
    isFirstUse,
    isLoading,
    isOnboarding,
    isPro,
    isSignout,
    isUpdateRequired,
  } = useAuth();

  useEffect(() => {
    setNotificationHandler({
      handleNotification: notification => {
        // For now, we're ignore local notifications when the app is
        // in the foreground
        const ignore = notification.request.trigger == null;
        return Promise.resolve({
          shouldShowAlert: !ignore,
          shouldPlaySound: !ignore,
          shouldSetBadge: !ignore,
        });
      },
    });
    // We're not setting the badge count in any of the notifications
    // we send, so this really just a UX belt-and-suspenders to avoid
    // confusing users
    setBadgeCountAsync(0);
  }, []);

  // Listen for changes to the device's pushToken
  usePushTokenListener();

  // This should run just once when the app boots, if the bootstrap
  // needs to be re-executed (e.g. after a subsequent sign in), it
  // will need to be called manually
  useEffect(() => {
    (async () => {
      // deeplinks need to wait until bootstrap is complete to ensure our navigators are mounted and ready to be linked into
      const link = await Linking.getInitialURL();
      await bootstrap();
      if (link) {
        deepLinkInitialURL(link);
      }
    })();
  }, [bootstrap]);

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isUpdateRequired) {
    return <UpdateRequired />;
  }

  if (isSignout) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={"Unauthenticated"}
          component={UnauthenticatedNavigator}
        />
      </Stack.Navigator>
    );
  }

  if (isFirstUse) {
    return <WhatsNew />;
  }

  if (isOnboarding) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"Onboarding"} component={OnboardingNavigator} />
      </Stack.Navigator>
    );
  }

  return (
    <ControllerProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isPro ? (
          <Stack.Screen name={"Pro"} component={ProAppNavigator} />
        ) : (
          <Stack.Screen name={"Homeowner"} component={HomeOwnerNavigator} />
        )}
      </Stack.Navigator>
    </ControllerProvider>
  );
}
