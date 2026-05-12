import React, { useCallback, useEffect, useRef } from "react";
import { Image, StyleSheet, ImageRequireSource } from "react-native";

import Touchable, { TouchableProps } from "~/components/Touchables/Touchable";

const REPEAT_RATE = 150;

const styles = StyleSheet.create({
  container: {},
  disabledImage: {
    tintColor: "gray",
  },
  disabledBtn: { opacity: 1 },
});

// it's a button without children
export type StepperButtonProps = Pick<
  TouchableProps,
  Exclude<keyof TouchableProps, "children">
> & {
  image: ImageRequireSource;
};

const StepperButton = (props: StepperButtonProps): JSX.Element => {
  const { disabled, image, onPress, ...rest } = props;

  const intervalRef = useRef<number>(0);

  const onPressRef = useRef(onPress);
  onPressRef.current = onPress;

  useEffect(() => {
    // Clear Interval
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
      intervalRef.current = 0;
    };
  }, []);

  const onLongPress = useCallback(e => {
    // Execute first onPress
    onPressRef.current && onPressRef.current(e);

    // Start interval
    intervalRef.current = setInterval(
      () => onPressRef.current && void onPressRef.current(e),
      REPEAT_RATE
    );
  }, []);

  const onPressOut = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = 0;
  }, []);

  return (
    <Touchable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      {...rest}
      disabled={disabled}
      style={[disabled ? styles.disabledBtn : styles.container]}
    >
      <Image
        key={disabled ? "disabled" : "enabled"}
        source={image}
        style={[disabled ? styles.disabledImage : styles.container]}
      />
    </Touchable>
  );
};

export default StepperButton;
