import { useEffect } from "react";
import { Platform, UIManager } from "react-native";
// Android requires special LayoutAnimation setup: https://reactnative.dev/docs/layoutanimation
// iOS is default enabled

const useLayoutAnimation = (): void => {
  useEffect(() => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);
};

export default useLayoutAnimation;
