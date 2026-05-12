import React, { useRef } from "react";

import { StatusBar, Text, TextInput } from "react-native";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { Provider as PaperProvider } from "react-native-paper";

import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import AppNavigator from "~/navigators/AppNavigator";
import { handleScreenChange } from "~/navigators/helpers";
import deepLinkingConfig from "~/navigators/deeplinking";

import { ApolloProvider } from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  AuthProvider,
  NavigatorsContext,
  TemperatureUnitProvider,
} from "~/contexts";

import { KohortProvider } from "~/utils/kohort";

import { client } from "~/graph";

import ComponentLibraryNavigator from "~/developer/ComponentLibrary/ComponentLibraryNavigator";

import Background from "~/components/Background";

import { AndroidTheme, AppTheme } from "~/styles/theme";

import useIsTablet from "~/hooks/useIsTablet";
import useLayoutAnimation from "~/hooks/useLayoutAnimation";

import { initSentry } from "~/utils/sentry";
import { initializeSegmentAsync } from "~/utils/segment";
import { initUpdates } from "~/utils/updates";
import { useWatchListeners } from "~/utils/watch";

export type RootNavigatorListParams = {
  ComponentLibrary: undefined;
  App: undefined;
};

initSentry();
initializeSegmentAsync();
initUpdates();

const Stack = createNativeStackNavigator<RootNavigatorListParams>();

// flip this flag to use the component librarys
const COMPONENT_LIBRARY_MODE = false;
// just wrap this in !__DEV__ so we never accidently ship this to prods
const USE_COMPONENT_LIBRARY = __DEV__ && COMPONENT_LIBRARY_MODE;

// Set maxFontSizeMultiplier to 1.4 to avoid displaying a broken UI because
// of Large Accessibility Font Sizes
const TEXT_DEFAULT_PROPS = { maxFontSizeMultiplier: 1.4 };
// @ts-ignore
Text.defaultProps = { ...Text.defaultProps, ...TEXT_DEFAULT_PROPS };
// @ts-ignore
TextInput.defaultProps = { ...TextInput.defaultProps, ...TEXT_DEFAULT_PROPS };

const App = (): JSX.Element => {
  useLayoutAnimation();
  useWatchListeners();

  const MainNavigator = useRef<NavigationContainerRef>(null);
  // TS complains if it's not a mutable ref object since we reassign it in onStateChange
  const currentRouteNameRef: React.MutableRefObject<
    string | null | undefined
  > = useRef<string>(null);
  const isTablet = useIsTablet();

  function handleNavigationStateChange(): void {
    const previousRouteName = currentRouteNameRef.current;
    const currentRouteName = MainNavigator?.current?.getCurrentRoute()?.name;
    if (previousRouteName !== currentRouteName) {
      handleScreenChange(currentRouteName, previousRouteName);
    }
    currentRouteNameRef.current = currentRouteName;
  }
  function handleNavigationReady(): void {
    // navigateIfUserExitedAppDuringCriticalPath(MainNavigator);
  }

  return (
    <ApolloProvider client={client}>
      <TemperatureUnitProvider>
        <ActionSheetProvider>
          <KohortProvider>
            <AuthProvider>
                <SafeAreaProvider>
                  <Background>
                    <PaperProvider theme={AndroidTheme}>
                      <NavigatorsContext.Provider value={{ isTablet }}>
                        <StatusBar
                          barStyle={"light-content"}
                          backgroundColor={"transparent"}
                          translucent={true}
                        />
                        <NavigationContainer
                          onReady={handleNavigationReady}
                          onStateChange={handleNavigationStateChange}
                          linking={deepLinkingConfig}
                          theme={AppTheme}
                          ref={MainNavigator}
                        >
                          <Stack.Navigator
                            screenOptions={{
                              contentStyle: { backgroundColor: "transparent" },
                              headerHideShadow: true,
                              stackAnimation: "none",
                            }}
                          >
                            {USE_COMPONENT_LIBRARY ? (
                              <Stack.Screen
                                name="ComponentLibrary"
                                component={ComponentLibraryNavigator}
                                options={{
                                  headerShown: false,
                                }}
                              />
                            ) : (
                              <Stack.Screen
                                name="App"
                                component={AppNavigator}
                                options={{
                                  headerShown: false,
                                }}
                              />
                            )}
                          </Stack.Navigator>
                        </NavigationContainer>
                      </NavigatorsContext.Provider>
                    </PaperProvider>
                  </Background>
                </SafeAreaProvider>
            </AuthProvider>
          </KohortProvider>
        </ActionSheetProvider>
      </TemperatureUnitProvider>
    </ApolloProvider>
  );
};

export default App;
