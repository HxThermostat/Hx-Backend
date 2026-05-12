import { useEffect } from "react";
import {
  updateApplicationContext,
  watchEvents,
} from "react-native-watch-connectivity";
import { getToken, Token } from "../auth";

async function reloadToken(ts?: boolean): Promise<void> {
  const token = await getToken();

  setToken(token, ts);
}

export function setToken(token: Token | null, ts?: boolean): void {
  const extra = ts || token == null ? { now: Date.now() } : {};

  if (token) {
    updateApplicationContext({ ...token, ...extra });
  } else {
    updateApplicationContext({ refreshToken: "LOGOUT", ...extra });
  }
}

function setupListeners(): () => void {
  const unsubscribeFns = [
    watchEvents.addListener("application-context", () => undefined),
    watchEvents.addListener("paired", paired => {
      if (paired) {
        reloadToken(true);
      }
    }),
    watchEvents.addListener("reachability", reachable => {
      if (reachable) {
        reloadToken(true);
      }
    }),
  ];
  return () => {
    unsubscribeFns.forEach(unsubscribe => unsubscribe());
  };
}

export function useWatchListeners(): void {
  useEffect(() => setupListeners(), []);
}
