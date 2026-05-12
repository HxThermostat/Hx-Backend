import { Platform } from "react-native";

import { NavigationContainerRef } from "@react-navigation/native";

import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";

import {
  saveToAsyncStorage,
  LAST_SCREEN_VISITED,
  loadFromAsyncStorage,
  LOGIN_EMAIL,
  removeFromAsyncStorage,
} from "~/utils/localStorage";

import { trackSegmentScreen } from "~/utils/segment";
import { addTransitionBreadcrumb } from "~/utils/sentry";

const CRITICAL_PATHS = ["EnterEmailConfirmation"];
export const handleScreenChange = (
  screenName: string | undefined,
  previousScreenName: string | null | undefined
): void => {
  if (screenName) {
    trackSegmentScreen(screenName);
    // Save last visited screen to async storage in case user needs to finish onboarding/signing ing etc...
    if (CRITICAL_PATHS.includes(screenName)) {
      saveToAsyncStorage(LAST_SCREEN_VISITED, screenName);
    }
    addTransitionBreadcrumb(screenName, previousScreenName);
  }
};

export const navigateIfUserExitedAppDuringCriticalPath = async (
  MainNavigator: React.RefObject<NavigationContainerRef>
): Promise<void> => {
  const lastScreenVisited = await loadFromAsyncStorage<string>(
    LAST_SCREEN_VISITED
  );

  if (lastScreenVisited) {
    if (CRITICAL_PATHS.includes(lastScreenVisited)) {
      // if there are specific screens we know we need additional params for
      if (lastScreenVisited === "EnterEmailConfirmation") {
        const email = await loadFromAsyncStorage<string>(LOGIN_EMAIL);
        if (email) {
          MainNavigator?.current?.navigate(lastScreenVisited, { email });
        } else {
          // if email is null for somehow, then don't try to go here since it's required, and reset screen tracking to clean state
          removeFromAsyncStorage(LAST_SCREEN_VISITED);
          return;
        }
      }
      // otherwise we can just go to the screen
      MainNavigator?.current?.navigate(lastScreenVisited);
    }
  }
};

const IS_ANDROID = Platform.OS === "android";

export const largeTitle: NativeStackNavigationOptions = {
  contentStyle: { backgroundColor: "transparent" },
  headerHideShadow: true,
  headerLargeTitleStyle: fonts.largeTitle,
  headerStyle: {
    ...Platform.select({
      default: { backgroundColor: colors.black },
      ios: {
        backgroundColor: colors.linearBGStart,
      },
    }),
  },
  headerTitleStyle: fonts.systemNavBarLabel,
  headerTranslucent: IS_ANDROID ? false : true,
};

// Via https://github.com/react-navigation/react-navigation/issues/6931#issuecomment-643392469
export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] };
}[keyof ParamList];
