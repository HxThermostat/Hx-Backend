import React from "react";
import { AppStateStatus } from "react-native";

interface AppStateContext {
  currentAppState: AppStateStatus;
}

export const AppStateContext = React.createContext<AppStateContext>({
  currentAppState: "active",
});
