import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function useFocused(): boolean {
  const [focused, setFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, [])
  );

  return focused;
}
