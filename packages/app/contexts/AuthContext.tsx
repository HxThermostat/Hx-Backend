import React, { useContext, useReducer, useMemo, useCallback } from "react";
import { Platform } from "react-native";

import {
  ApolloQueryResult,
  isApolloError,
  useApolloClient,
} from "@apollo/client";

import { useTemperatureUnit } from "./temperatureUnitContext";

import {
  BootstrapDocument,
  BootstrapQuery,
  LoadDocument,
  LoadQuery,
  ProBootstrapDocument,
  ProBootstrapQuery,
  ProLoadDocument,
  ProLoadQuery,
  useRemoveAccountMutation,
  useRemoveLocationMutation,
} from "~/graph";
import { buildLink } from "~/graph/client/links";

import { useActionSheet } from "~/hooks/useActionSheet";
import { useSingletonAlert } from "~/hooks/useSingletonAlert";

import { setToken, clearToken } from "~/utils/auth";
import { attemptToOpenURL } from "~/utils/linking";
import {
  loadFromAsyncStorage,
  saveToAsyncStorage,
  HAS_VIEWED_WHATS_NEW,
  FRESH_INSTALL_FLAG,
} from "~/utils/localStorage";
import { registerDevice, unregisterDevice } from "~/utils/notifications";
import { resetSegmentForUser, trackSegmentEvent } from "~/utils/segment";
import { setSentryUser, setApp } from "~/utils/sentry";
import { reloadIfAvailable } from "~/utils/updates";
import { nativeBuild, nativeVersion } from "~/utils/version";
import { setToken as setWatchToken } from "~/utils/watch";
import {
  KohortFunnel,
  KohortFunnelEventStep,
  useKohortTracking,
} from "~/utils/kohort";

import i18n from "~/i18n";

export interface Token {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

interface AuthContext {
  bootstrap: () => Promise<void>;
  completeOnboarding: () => void;
  markFirstUse: () => void;
  readAirflowInstructions: () => void;
  reload: (hard?: boolean) => Promise<void>;
  removeAccount: (promptForConfirmation?: boolean) => Promise<void>;
  removeLocation: (locationId: string) => Promise<void>;
  signIn: (token: Token) => Promise<void>;
  signOut: (promptForConfirmation?: boolean, reason?: string) => Promise<void>;
  email: string | undefined;
  hasReadAirflowInstructions: boolean;
  isFirstUse: boolean;
  isLoading: boolean;
  isOnboarding: boolean;
  isSignout: boolean;
  isPro: boolean;
  isUpdateRequired: boolean;
}

const AuthContext = React.createContext<AuthContext | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

interface State {
  email: string | undefined;
  hasReadAirflowInstructions: boolean;
  isFirstUse: boolean;
  isLoading: boolean;
  isOnboarding: boolean;
  isSignout: boolean;
  isPro: boolean;
  isUpdateRequired: boolean;
}

type Action =
  | {
      type: "BOOTSTRAP";
      email: string;
      hasDevices: boolean;
      isFirstUse: boolean;
      isPro: boolean;
    }
  | { type: "COMPLETE_ONBOARDING" }
  | { type: "LOADING" }
  | { type: "MARK_FIRST_USE" }
  | { type: "READ_AIRFLOW_INSTRUCTIONS" }
  | { type: "SIGN_IN" }
  | { type: "SIGN_OUT" }
  | { type: "UPDATE_REQUIRED" };

const authReducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case "BOOTSTRAP":
      return {
        ...prevState,
        isFirstUse: action.isFirstUse,
        isLoading: false,
        isOnboarding: !action.hasDevices,
        isSignout: false,
        isPro: action.isPro,
        email: action.email,
      };
    case "COMPLETE_ONBOARDING":
      return {
        ...prevState,
        isOnboarding: false,
      };
    case "LOADING":
      return {
        ...prevState,
        isLoading: true,
      };
    case "MARK_FIRST_USE":
      return {
        ...prevState,
        isFirstUse: false,
      };
    case "READ_AIRFLOW_INSTRUCTIONS":
      return {
        ...prevState,
        hasReadAirflowInstructions: true,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isLoading: true,
        isSignout: false,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isLoading: false,
        isSignout: true,
      };
    case "UPDATE_REQUIRED":
      return {
        ...prevState,
        isLoading: false,
        isUpdateRequired: true,
      };
  }
};

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(authReducer, {
    isFirstUse: true,
    email: undefined,
    hasReadAirflowInstructions: false,
    isLoading: true,
    isSignout: false,
    isOnboarding: false,
    isPro: false,
    isUpdateRequired: false,
  });

  const client = useApolloClient();

  const { setUnit } = useTemperatureUnit();
  const [removeAccount] = useRemoveAccountMutation();
  const [removeLocation] = useRemoveLocationMutation();

  const { showActionSheetWithOptions } = useActionSheet();
  const { showSingletonAlert } = useSingletonAlert();
  const { identifyUser, trackFunnel } = useKohortTracking();

  const signOut = useCallback(
    async (promptForConfirmation?: boolean, reason?: string) => {
      const handleSignOut = async (): Promise<void> => {
        trackSegmentEvent("Sign Out", {
          reason: reason || "?",
          prompted: !!promptForConfirmation,
        });
        await clearToken();

        resetSegmentForUser();
        setSentryUser(null);
        setWatchToken(null);

        client.stop();
        await client.clearStore();
        client.setLink(buildLink());

        unregisterDevice(client);

        dispatch({ type: "SIGN_OUT" });

        // Clear any deep links that signed the user in previously
        attemptToOpenURL("hx://signIn");
      };
      if (promptForConfirmation) {
        showActionSheetWithOptions({
          items: [
            {
              label: i18n.t("Common.logoutSheet.logout"),
              onPress: async () => await handleSignOut(),
              destructive: true,
            },
            {
              label: i18n.t("Common.cancel"),
              cancel: true,
            },
          ],
          message: i18n.t("Common.logoutSheet.message"),
        });
      } else {
        await handleSignOut();
      }
    },
    [client, showActionSheetWithOptions]
  );

  const loadData = useCallback(async (): Promise<
    ApolloQueryResult<BootstrapQuery> | { error: Error; data: null }
  > => {
    // Kick this off in parallel to the homeowner bootstrap in order
    // to keep the pro experience as snappy as possible
    const proQueryResult = client.query<ProBootstrapQuery>({
      query: ProBootstrapDocument,
      fetchPolicy: "network-only",
    });

    // Wait for both the update and the user bootstrap query. Most
    // likely, there is no update available, and we don't want to hold
    // up the rest of the bootstrap process.

    const bootstrapQueryResult = client
      .query<BootstrapQuery>({
        query: BootstrapDocument,
        variables: {
          platform: Platform.select({
            ios: "IOS",
            android: "ANDROID",
          }),
          version: nativeVersion,
          build: nativeBuild,
        },
        fetchPolicy: "network-only",
      })
      .catch((error: Error) => ({
        error,
        data: null,
      }));

    client.query<LoadQuery>({
      query: LoadDocument,
      fetchPolicy: "network-only",
    });

    const result = await bootstrapQueryResult;

    if (result.data?.me?.accountType === "PRO") {
      client.query<ProLoadQuery>({
        query: ProLoadDocument,
        fetchPolicy: "network-only",
      });
      // Make sure the cache is primed before loading the pro app
      await proQueryResult;
    }

    return result;
  }, [client]);

  const bootstrap = useCallback(async () => {
    // Kick off the request to check for updates
    const update = reloadIfAvailable();

    // Use the authenticated link chain without any refresh error
    // handling since we'll handle the cleanup of unauthenticated
    // requests later in the bootstrap process
    client.setLink(buildLink(async () => Promise.resolve()));

    const hasViewedWhatsNew = await loadFromAsyncStorage<boolean>(
      HAS_VIEWED_WHATS_NEW
    );
    const isFirstUse = !hasViewedWhatsNew;

    // Clear tokens persisted across app installs if user is opening
    // a fresh new install
    const freshInstallFlag = await loadFromAsyncStorage<boolean>(
      FRESH_INSTALL_FLAG
    );
    if (!freshInstallFlag) {
      // Don't clear tokens if the user is already using the app
      if (isFirstUse) {
        await clearToken();
      }
      await saveToAsyncStorage(FRESH_INSTALL_FLAG, true);
    }

    const { data, error } = await loadData();

    // Don't continue with the process if we're about to reload the
    // whole app
    await update;

    // Show an alert if bootstrap failed because the app is offline
    if (error && isApolloError(error) && error.networkError) {
      showSingletonAlert(
        i18n.t("Common.offlineAlert.title"),
        i18n.t("Common.offlineAlert.message"),
        [
          {
            text: i18n.t("Common.offlineAlert.logout"),
            style: "destructive",
            onPress: () => signOut(false, "bootstrap-network-error"),
          },
          {
            text: i18n.t("Common.offlineAlert.tryAgain"),
            style: "default",
            onPress: bootstrap,
          },
        ]
      );
      return;
    }

    if (data?.updateRequired) {
      return dispatch({
        type: "UPDATE_REQUIRED",
      });
    }

    if (data?.me) {
      client.setLink(
        buildLink(async () => {
          await signOut(false, "bootstrap-build-link");
        })
      );

      setSentryUser({
        id: data.me.id,
      });
      setApp(data.me.accountType === "PRO" ? "pro" : "homeowner");

      identifyUser(data.me.id, {
        accountType: data.me.accountType,
      });
      if (!isFirstUse) {
        trackFunnel({
          funnel: KohortFunnel.Adoption,
          step: KohortFunnelEventStep.SignIn,
        });
      }

      setUnit(data.me.temperatureUnit);

      registerDevice(client);

      dispatch({
        type: "BOOTSTRAP",
        hasDevices: data.locations.length > 0,
        isFirstUse,
        isPro: data.me.accountType === "PRO",
        email: data.me.email,
      });
    } else {
      await signOut(false, "bootstrap-missing-data-me");
    }
  }, [client, loadData, setUnit, showSingletonAlert, signOut]);

  const context = useMemo<AuthContext>(
    () => ({
      email: state.email,
      hasReadAirflowInstructions: state.hasReadAirflowInstructions,
      isFirstUse: state.isFirstUse,
      isLoading: state.isLoading,
      isOnboarding: state.isOnboarding,
      isPro: state.isPro,
      isSignout: state.isSignout,
      isUpdateRequired: state.isUpdateRequired,
      bootstrap: bootstrap,
      completeOnboarding: () => dispatch({ type: "COMPLETE_ONBOARDING" }),
      markFirstUse: () => {
        saveToAsyncStorage(HAS_VIEWED_WHATS_NEW, true);
        dispatch({ type: "MARK_FIRST_USE" });
      },
      readAirflowInstructions: () =>
        dispatch({ type: "READ_AIRFLOW_INSTRUCTIONS" }),
      reload: async (hard = false) => {
        if (hard) {
          dispatch({ type: "LOADING" });

          client.stop();
          await client.clearStore();

          await bootstrap();
        } else {
          await loadData();
        }
      },
      removeAccount: async promptForConfirmation => {
        const handleRemoveAccount = async (): Promise<void> => {
          dispatch({ type: "LOADING" });
          await removeAccount();
          await signOut();
        };
        if (promptForConfirmation) {
          showActionSheetWithOptions({
            items: [
              {
                label: i18n.t("Common.removeAccountSheet.removeAccount"),
                onPress: async () => await handleRemoveAccount(),
                destructive: true,
              },
              {
                label: i18n.t("Common.cancel"),
                cancel: true,
              },
            ],
            message: i18n.t("Common.removeAccountSheet.message"),
            title: i18n.t("Common.removeAccountSheet.title"),
          });
        } else {
          await handleRemoveAccount();
        }
      },
      removeLocation: async (locationId: string) => {
        dispatch({ type: "LOADING" });

        await removeLocation({ variables: { locationId } });

        await client.clearStore();

        await bootstrap();
      },
      signIn: async token => {
        client.stop();
        await client.clearStore();
        await setToken(token);
        setWatchToken(token);

        dispatch({
          type: "SIGN_IN",
        });

        await bootstrap();
      },
      signOut,
    }),
    [
      state.email,
      state.hasReadAirflowInstructions,
      state.isFirstUse,
      state.isLoading,
      state.isOnboarding,
      state.isPro,
      state.isSignout,
      state.isUpdateRequired,
      bootstrap,
      signOut,
      client,
      loadData,
      removeAccount,
      removeLocation,
    ]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
}
