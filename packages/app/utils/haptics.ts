import { Platform } from "react-native";

import * as Haptics from "expo-haptics";

export const hapticSelectionIOS = (): Promise<void> | false =>
  Platform.OS === "ios" && Haptics.selectionAsync();
