import { useCallback, useContext, useMemo } from "react";
import { CommonActions, Route, useNavigation } from "@react-navigation/native";

import { NavigatorsContext } from "~/contexts";

import { deeplinkSettingsConfig } from "~/navigators/deeplinking";

interface SettingScreenInfo {
  componentName: string;
  pathName: string;
  params: string[];
}

type SettingScreenInfoMap = Record<string, SettingScreenInfo>;

function getSettingsRoutes(path: string, screenInfoMap: SettingScreenInfoMap) {
  let pathIndex = 0;
  let pathArray = path.split("/").filter(s => s);

  // Compute routes inside settings screen
  const settingsRoutes = [];
  while (pathIndex < pathArray.length) {
    // Get the info for the next screen
    const settingsScreen = screenInfoMap[pathArray[pathIndex]];
    pathIndex++;

    // If no screen was detected then ignore it
    if (!settingsScreen) {
      continue;
    }

    // Generate set of params for the new route if needed
    const params: Record<string, any> = {};
    if (settingsScreen.params) {
      for (let i = 0; i < settingsScreen.params.length; i++) {
        const paramName = settingsScreen.params[i];
        const value = pathArray[pathIndex++];
        params[paramName] = value;
      }
    }

    // Add route to the final list
    const screenRoute: Route<string> = {
      key: settingsScreen.pathName,
      name: settingsScreen.componentName,
      params,
    };
    settingsRoutes.push(screenRoute);
  }

  return settingsRoutes;
}

export default function useLinkToSettings() {
  const navigation = useNavigation();
  const { isTablet } = useContext(NavigatorsContext);
  const screenInfos = useMemo(() => {
    const screenInfos: Record<string, SettingScreenInfo> = {};

    // Get componentName, pathName and params for each Settings Screen
    Object.entries(deeplinkSettingsConfig).forEach(([componentName, value]) => {
      const path = value as string;

      const [pathName, ...pathParams] = path.split("/").filter(s => s);
      const params = pathParams
        .filter(p => p[0] === ":")
        .map(p => p.substring(1));

      screenInfos[pathName] = {
        componentName,
        pathName,
        params,
      };
    });

    // Override the initial screen if it is tablet
    screenInfos["settings"] = {
      componentName: isTablet ? "About" : "Settings",
      pathName: "settings",
      params: [],
    };

    return screenInfos;
  }, [isTablet]);

  // Function to simulate linkTo(path) but for settings screens
  const linkToSettings = useCallback(
    (path: string) => {
      const settingsRoutes = getSettingsRoutes(path, screenInfos);

      navigation.dispatch(state => {
        // Replace Home Tab with Settings Tab and the computed array of routes
        const routes = state.routes.map(route =>
          route.name !== "Home"
            ? route
            : {
                key: "Settings",
                name: "Settings",
                state: {
                  routes: settingsRoutes,
                  index: settingsRoutes.length - 1,
                },
              }
        );

        // Reset navigation routes
        return CommonActions.reset({ routes, index: routes.length - 1 });
      });
    },
    [screenInfos]
  );

  return linkToSettings;
}
