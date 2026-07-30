// learn more at https://reactnavigation.org/docs/configuring-links
// commands below for testing simulators
// xcrun simctl openurl booted hx://path/to/go/to
// adb shell am start -W -a android.intent.action.VIEW -d 'hx://path/to/go/to' com.kraftful.dev.hx.homeowner

import { LinkingOptions, PathConfigMap } from "@react-navigation/native";
import { addNotificationReceivedListener } from "expo-notifications";
import { Linking } from "react-native";

export const deeplinkSettingsConfig: PathConfigMap = {
  Settings: "/settings",
  About: "/about",
  Location: "/location/:locationId",
  Away: "/away/:locationId",
  AdjustAway: "/adjustAway/:controllerId",
  Vacation: "/vacation/:locationId",
  SystemInfo: "/systemInfo/:locationId",
  SystemLogUser: "/logs/:locationId",
};

const config: {
  initialRouteName?: string | undefined;
  screens: PathConfigMap;
} = {
  screens: {
    App: {
      screens: {
        Unauthenticated: {
          initialRouteName: "EnterEmailAddress",
          screens: {
            EnterEmailAddress: "signIn",
            EnterEmailConfirmation: "signIn/:email/:emailToken",
          },
        },
        Homeowner: {
          initialRouteName: "Tabs",
          screens: {
            Tabs: {
              screens: {
                Home: "home",
                Schedules: "schedules",
                Settings: { screens: deeplinkSettingsConfig },
              },
            },
            ModalNavigator: {
              screens: {
                GrantAccess: "grantAccess/:email/:accessLevel/:limit?",
                SelectFan: "selectFan",
                SelectModeSimple: "selectMode",
                SelectModeAdvanced: "selectMode/advanced",
                SelectZone: "selectZone",
              },
            },
          },
        },
        Pro: {
          path: "pro",
          initialRouteName: "ProHome",
          screens: {
            ProHome: "home",
            InstallerView: "location/:locationId",
            ModalNavigator: {
              screens: {
                Settings: "settings",
                CustomerView: "customerView/:locationId",
              },
            },
          },
        },
      },
    },
  },
};

const deepLinkingConfig: LinkingOptions = {
  prefixes: ["hx://", "https://hx.yoursysteminfo.com/"],
  config,
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }): void => listener(url);

    Linking.addEventListener("url", onReceiveURL);

    const subscription = addNotificationReceivedListener(response => {
      const url = response.request.content.data?.url;

      // If we provide a URL property, deep link to it right away
      if (typeof url === "string" && url.startsWith("hx://")) {
        listener(url);
      }
    });

    return () => {
      Linking.removeEventListener("url", onReceiveURL);
      subscription.remove();
    };
  },
};

export default deepLinkingConfig;
