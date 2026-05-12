import { useState, useMemo, useCallback } from "react";
import { Platform } from "react-native";

export const useSlider = (
  initialValue: number
): [number, (value: number) => void] => {
  const [sliderValue, setSliderValue] = useState(initialValue);
  const [androidSliderValue, setAndroidSliderValue] = useState(initialValue);

  const valueForSliderToTrack = useMemo(() => {
    // We're using two separate "sliderValues" values because Android can't handle updating things at the same time as re-rendering the slider.
    // The true value is the sliderValue, the androidSliderValue will start us in the correct place when the screen loads on Android, and then Android internally will track changes instead of us tracking the true value.
    // When we call the API or anything, we'll want to use "sliderValue"
    if (Platform.OS === "android") {
      return androidSliderValue;
    }
    return sliderValue;
  }, [sliderValue, androidSliderValue]);

  const handleSlideComplete = useCallback((value: number) => {
    setSliderValue(value);
    setAndroidSliderValue(value);
  }, []);

  return [valueForSliderToTrack, handleSlideComplete];
};
