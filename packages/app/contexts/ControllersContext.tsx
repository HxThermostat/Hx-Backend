import React, { useContext, useState, useEffect, useMemo, useRef } from "react";

import { useSetAppActiveMutation, useControllersContextQuery } from "~/graph";

import useAppState from "~/hooks/useAppState";

import SplashScreen from "~/screens/Splash";

import {
  SELECTED_CONTROLLER,
  saveToAsyncStorage,
  loadFromAsyncStorage,
} from "~/utils/localStorage";
import { useAuth } from "./AuthContext";

interface ControllerContext {
  controllerId: string;
  setControllerId: (controllerId: string) => void;
  setControllerIdByLocationId: (locationId: string) => void;
  locationId?: string;
  setLocationId: (locationId: string | undefined) => void;
}

export const ControllerContext = React.createContext<
  ControllerContext | undefined
>(undefined);

function selectControllerId(
  controllerId: string | undefined,
  locationId: string | undefined,
  controllerIds: [string, string][]
): [string, string | undefined] {
  if (controllerIds.length === 0) throw new Error("No controllers provided");

  let resultControllerId: string;
  let resultLocationId: string | undefined;

  if (locationId) {
    const candidateIds = controllerIds.filter(([, lId]) => locationId === lId);

    if (candidateIds.length === 0)
      throw new Error(`No locations match supplied locationId: ${locationId}`);

    [resultControllerId] =
      candidateIds.find(([cId]) => controllerId === cId) ?? candidateIds[0];

    if (controllerId == null || resultControllerId === controllerId) {
      resultLocationId = locationId;
    }
  } else {
    [resultControllerId] =
      controllerIds.find(([cId]) => controllerId === cId) ?? controllerIds[0];
  }

  return [resultControllerId, resultLocationId];
}

interface ControllerProviderLoadedProps {
  children: React.ReactNode;
  controllerIds: [string, string][];
  controllerId: string;
}

function ControllerProviderLoaded(
  props: ControllerProviderLoadedProps
): JSX.Element {
  const [controllerId, setControllerId] = useState(props.controllerId);
  const [locationId, setLocationId] = useState<string | undefined>();

  const state = useAppState();
  const [setAppActive] = useSetAppActiveMutation();

  useEffect(() => {
    if (state !== "active") return;

    setAppActive({ variables: { controllerId } });

    const handle = setInterval(
      () => setAppActive({ variables: { controllerId } }),
      30000
    );
    return () => clearInterval(handle);
  }, [controllerId, setAppActive, state]);

  const contextValue = useMemo(
    () => ({
      controllerId,
      setControllerId: (newControllerId: string) => {
        // Persist info to async storage
        saveToAsyncStorage(SELECTED_CONTROLLER, newControllerId);
        setControllerId(newControllerId);
      },
      setControllerIdByLocationId: (locationId: string) => {
        const [controllerId] = selectControllerId(
          undefined,
          locationId,
          props.controllerIds
        );
        setControllerId(controllerId);
      },
      locationId,
      setLocationId: (newLocationId: string | undefined) => {
        const [targetControllerId, targetLocationId] = selectControllerId(
          undefined,
          newLocationId,
          props.controllerIds
        );
        setControllerId(targetControllerId);
        setLocationId(targetLocationId);
      },
    }),
    [controllerId, locationId, props.controllerIds]
  );
  return (
    <ControllerContext.Provider value={contextValue}>
      {props.children}
    </ControllerContext.Provider>
  );
}

interface ControllerProvider {
  children: React.ReactNode;
}

export function ControllerProvider(props: ControllerProvider): JSX.Element {
  const [controllerFromStorage, setControllerFromStorage] = useState<
    string | null | undefined
  >();

  const { reload } = useAuth();

  const { data, loading: queryLoading } = useControllersContextQuery({
    fetchPolicy: "cache-and-network",
    pollInterval: 5000,
  });

  useEffect(() => {
    (async () => {
      const controllerId = await loadFromAsyncStorage<string>(
        SELECTED_CONTROLLER
      );

      if (controllerId) {
        setControllerFromStorage(controllerId);
      } else {
        setControllerFromStorage(null);
      }
    })();
  }, []);

  const loading =
    (queryLoading && !data) || controllerFromStorage === undefined;
  const controllers = data?.controllers;

  // This fingerprinting behavior is used to determine if we need to
  // trigger reload behavior to keep the cache coherent. The two cases
  // that require reloads are:
  // 1. When a new controller is added to the user's account
  // 2. When a controller is removed from the user's account
  // Practically speaking, both of these are only likely for Pro
  // accounts, but there's no harm in handling this behavior for both
  // account types.

  const fingerprintIds = data?.controllers.map(({ id }) => id);

  // Serializing this list will ensure we still re-bootstrap if
  // controllers are added + removed in the same polling interval (as
  // opposed to just checking the count or something like that)
  const controllerFingerprint = fingerprintIds
    ? JSON.stringify(fingerprintIds.sort())
    : undefined;

  // We only want to re-bootstrap after a _change_ which means we
  // need to throw away the first invocation of this hook
  const fingerprintRef = useRef<string>();

  useEffect(() => {
    const controllers = controllerFingerprint
      ? (JSON.parse(controllerFingerprint) as string[])
      : undefined;

    if (controllers == null) return;

    const prevControllers = fingerprintRef.current
      ? (JSON.parse(fingerprintRef.current) as string[])
      : undefined;

    const controllersRemoved =
      prevControllers &&
      prevControllers.filter(id => !controllers.includes(id)).length > 0;
    const controllersAdded =
      prevControllers &&
      controllers.filter(id => !prevControllers.includes(id)).length > 0;

    // Trigger a hard reload if a controller has been removed. This is
    // equivalent to restarting the app, so it's somewhat jarring.
    // However, it's the most expedient way to remove the now-missing
    // controller from the cache and ensure that controller isn't part
    // of the current navigation stack
    if (controllersRemoved) {
      reload(true);
    }
    // When a controller has been added, we can do a soft reload*. This
    // will just re-run the bootstrap queries with the intention of
    // ensuring the new controller has all of the expected data
    // available in the cache.
    // * If we're going from 0->1+ controllers we do the full reload
    //   anyway to ensure the navigation state is properly reset
    else if (controllersAdded) {
      reload((prevControllers ?? []).length === 0);
    }

    fingerprintRef.current = controllerFingerprint;
  }, [reload, controllerFingerprint]);

  if (loading) {
    return <SplashScreen />;
  }

  // The useEffect fingerprinting hook above will eventually unmount
  // this component if there are indeed no controllers. We don't
  // expect the app to stay on this <SplashScreen /> for long.
  if (!controllers?.length) {
    return <SplashScreen />;
  }

  const controllerIds: [string, string][] = controllers.map(c => [
    c.id,
    c.location.id,
  ]);

  let controllerId: string;

  if (controllerFromStorage) {
    [controllerId] = selectControllerId(
      controllerFromStorage,
      undefined,
      controllerIds
    );
  } else {
    [controllerId] = selectControllerId(
      controllers[0].id,
      undefined,
      controllerIds
    );
  }

  return (
    <ControllerProviderLoaded
      controllerIds={controllerIds}
      controllerId={controllerId}
    >
      {props.children}
    </ControllerProviderLoaded>
  );
}

export function useController(): ControllerContext {
  const context = useContext(ControllerContext);

  if (context === undefined) {
    throw new Error("useController must be used within a ControllerProvider");
  }

  return context;
}
