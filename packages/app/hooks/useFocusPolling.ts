import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function useFocusPolling(
  refetch: () => void,
  startPolling: (ms: number) => void,
  stopPolling: () => void,
  focusPollInterval = 5000
): void {
  const [initialFocus, setInitialFocus] = useState(true);
  useFocusEffect(
    useCallback(() => {
      // Since the polling can take some time to kick in, we want to
      // kick off one request immediately once the wrapped component
      // _regains_ focus
      if (!initialFocus) {
        refetch();
      }

      startPolling(focusPollInterval);
      return () => {
        stopPolling();
        setInitialFocus(false);
      };
    }, [focusPollInterval, initialFocus, refetch, startPolling, stopPolling])
  );
}
