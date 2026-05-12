import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
  AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
} from "expo-secure-store";

import { updateApplicationContext } from "react-native-watch-connectivity";

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  EXPIRES_AT_KEY,
} from "~/constants";

import { createReadWriteLock } from "locks";
import { Platform } from "react-native";

export interface Token {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

const lock = createReadWriteLock();

const getTokenUnsafe = async (): Promise<Token | null> => {
  const [accessToken, refreshToken, expiresAt] = await Promise.all(
    [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, EXPIRES_AT_KEY].map(key =>
      getItemAsync(key)
    )
  );

  if (accessToken == null || refreshToken == null || expiresAt == null) {
    return null;
  }

  return {
    accessToken,
    refreshToken,
    expiresAt: new Date(expiresAt),
  };
};

export const getToken = async (): Promise<Token | null> =>
  new Promise(resolve => {
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    lock.readLock(async () => {
      let token: Token | null = null;
      try {
        token = await getTokenUnsafe();
      } finally {
        resolve(token);
        lock.unlock();
      }
    });
  });

const clearTokenUnsafe = async (): Promise<void> => {
  await Promise.all(
    [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, EXPIRES_AT_KEY].map(key =>
      deleteItemAsync(key)
    )
  );
};

export const clearToken = async (): Promise<void> =>
  new Promise(resolve => {
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    lock.writeLock(async () => {
      try {
        await clearTokenUnsafe();
      } finally {
        resolve();
        lock.unlock();
      }
    });
  });

const setTokenUnsafe = async (token: Token): Promise<void> => {
  await Promise.all(
    [
      [ACCESS_TOKEN_KEY, token.accessToken],
      [REFRESH_TOKEN_KEY, token.refreshToken],
      [EXPIRES_AT_KEY, token.expiresAt.toString()],
    ].map(([key, value]) => {
      setItemAsync(key, value);
    })
  );

  if (Platform.OS === "ios") {
    updateApplicationContext({ ...token });
  }
};

export const setToken = async (token: Token): Promise<void> =>
  new Promise(resolve => {
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    lock.writeLock(async () => {
      try {
        await setTokenUnsafe(token);
      } finally {
        resolve();
        lock.unlock();
      }
    });
  });

const expireTokenUnsafe = async (): Promise<void> => {
  await Promise.all(
    [
      [ACCESS_TOKEN_KEY, ""],
      [EXPIRES_AT_KEY, new Date().toString()],
    ].map(([key, value]) => {
      setItemAsync(key, value, {
        keychainAccessible: AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
      });
    })
  );
};

export const expireToken = async (): Promise<void> =>
  new Promise(resolve => {
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    lock.writeLock(async () => {
      try {
        await expireTokenUnsafe();
      } finally {
        resolve();
        lock.unlock();
      }
    });
  });

export const handleRefresh = async (
  p: () => Promise<Token | "TokenInvalid" | null>
): Promise<Token | null> =>
  new Promise(resolve => {
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    lock.writeLock(async () => {
      let token: Token | "TokenInvalid" | null = null;
      try {
        const currentToken = await getTokenUnsafe();
        await expireTokenUnsafe();

        token = await p();

        if (token == null) {
          token = currentToken;
        }

        switch (token) {
          case "TokenInvalid":
            await clearTokenUnsafe();
            token = null;
            break;
          case null:
            // Restore the token that was set before attempting to
            // refresh
            if (currentToken) {
              setTokenUnsafe(currentToken);
            }
            break;
          default:
            await setTokenUnsafe(token);
            break;
        }
      } finally {
        if (token === "TokenInvalid") {
          resolve(null);
        } else {
          resolve(token);
        }
        lock.unlock();
      }
    });
  });
