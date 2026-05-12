import { useCallback, useEffect, useRef } from "react";

import { useFocusEffect } from "@react-navigation/native";
import useAppState from "./useAppState";

export default function useCleanupScreen(cleanup: () => void) {
  // Save cleanup function inside a ref
  const cleanupRef = useRef(cleanup);
  useEffect(() => {
    cleanupRef.current = cleanup;
  }, [cleanup]);

  // Call Cleanup function if the current screen loses focus
  useFocusEffect(
    useCallback(() => {
      return () => cleanupRef.current();
    }, [])
  );

  // Call Cleanup function if the app leaves active state
  const appState = useAppState();
  useEffect(() => {
    if (appState === "background" || appState === "inactive") {
      cleanupRef.current();
    }
  }, [appState]);
}
