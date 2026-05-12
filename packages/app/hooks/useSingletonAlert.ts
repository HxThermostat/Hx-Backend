import { useCallback, useRef } from "react";
import { Alert, AlertButton, AlertOptions } from "react-native";

export const useSingletonAlert = () => {
  const isVisibleRef = useRef(false);

  const showSingletonAlert = useCallback(
    (
      title: string,
      message?: string,
      buttons?: AlertButton[],
      options?: AlertOptions
    ) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        Alert.alert(
          title,
          message,
          buttons?.map(button => ({
            ...button,
            onPress: () => {
              isVisibleRef.current = false;
              button.onPress && button.onPress();
            },
          })),
          options
        );
      }
    },
    []
  );

  return { showSingletonAlert };
};
