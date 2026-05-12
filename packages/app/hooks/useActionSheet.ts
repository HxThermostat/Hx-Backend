import { useCallback } from "react";

import { Platform, StyleSheet } from "react-native";

import {
  useActionSheet as useExpoActionSheet,
  ActionSheetOptions,
} from "@expo/react-native-action-sheet";

import useIsTablet from "./useIsTablet";

import colors from "~/styles/color";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
  },
  message: {
    color: colors.white,
    opacity: 0.74,
  },
  text: {
    color: colors.white,
  },
  title: {
    color: colors.white,
    opacity: 0.74,
  },
});

export type ActionSheetItem = {
  label: string;
  onPress?: () => void | Promise<void>;
  cancel?: boolean;
  destructive?: boolean;
};

export type Config = Omit<
  ActionSheetOptions,
  "options" | "cancelButtonIndex" | "destructiveButtonIndex"
> & {
  items: ActionSheetItem[];
};

// Don't use light colors on iOS, Version < 13
const supportDarkAppearance =
  Platform.OS !== "ios" || parseInt(Platform.Version as string, 10) >= 13;

const defaults = supportDarkAppearance
  ? {
      containerStyle: styles.container,
      messageTextStyle: styles.message,
      textStyle: styles.text,
      tintColor: styles.text.color,
      titleTextStyle: styles.title,
    }
  : {};

export const useActionSheet = (): {
  showActionSheetWithOptions: (config: Config) => void;
} => {
  const { showActionSheetWithOptions } = useExpoActionSheet();
  const isTablet = useIsTablet();
  const isIpad = isTablet && Platform.OS === "ios";

  return {
    showActionSheetWithOptions: useCallback(
      (config: Config) => {
        const { items, ...rest } = config;

        const sortedItems = items.sort(a => (a.cancel ? 1 : 0));

        const cancelButtonIndex = sortedItems.findIndex(i => i.cancel);
        const destructiveButtonIndex = sortedItems.findIndex(
          i => i.destructive
        );

        const options = {
          options: sortedItems.map(i => i.label),
          cancelButtonIndex:
            !isIpad && cancelButtonIndex > -1 ? cancelButtonIndex : undefined,
          destructiveButtonIndex:
            destructiveButtonIndex > -1 ? destructiveButtonIndex : undefined,
          ...rest,
        };

        showActionSheetWithOptions({ ...defaults, ...options }, i => {
          const item = sortedItems[i];

          item.onPress && item.onPress();
        });
      },
      [isIpad, showActionSheetWithOptions]
    ),
  };
};
