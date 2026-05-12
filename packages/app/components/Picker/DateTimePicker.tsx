import React, { useRef, useCallback, useState, useMemo } from "react";
import { View, StyleSheet, Platform, TextStyle, StyleProp } from "react-native";

import RNDateTimePicker from "@react-native-community/datetimepicker";

import RBSheet from "react-native-raw-bottom-sheet";

import Text from "~/components/Text";
import Touchable from "~/components/Touchables/Touchable";
import PickerActionBar from "~/components/Picker/PickerActionBar";

import colors from "~/styles/color";

import { DateFormatter } from "~/utils/display";

const styles = StyleSheet.create({
  picker: {
    opacity: +(Platform.OS !== "android"),
    ...StyleSheet.absoluteFillObject,
  },
  itemStyle: {
    color: colors.white,
  },
  labelStyle: {},
  bottomSheet: {
    height: 260,
    backgroundColor: colors.iosSystemGray6,
  },
});

interface DateTimePickerProps {
  mode: "date" | "time";
  onValueChange: (newValue: Date) => void;
  value?: Date;
  prefix?: string;
  emptyLabel?: string;
  containerStyle?: StyleProp<{}>;
  labelStyle?: TextStyle;
  minuteInterval?: 15;
  minimumDate?: Date;
  maximumDate?: Date;
  format?: string;
}

const DateTimePicker = (props: DateTimePickerProps): JSX.Element => {
  const {
    value,
    onValueChange,
    prefix = "",
    emptyLabel = "",
    minuteInterval,
    mode,
    format,
    ...passThroughProps
  } = props;

  const dateFormatter = useMemo(() => {
    if (format) {
      return DateFormatter(format);
    }
    return DateFormatter(mode === "time" ? "h:mm A" : "LL");
  }, [format, mode]);
  const ref = useRef<RBSheet>(null);
  const [visible, setVisible] = useState(false);

  const open = useCallback((): void => {
    ref.current?.open();
    setVisible(true);
  }, [ref]);

  const onChange = useCallback(
    (_: unknown, itemValue: Date | undefined): void => {
      setVisible(false);
      itemValue && onValueChange(itemValue);
    },
    [onValueChange]
  );

  const Picker = (
    <RNDateTimePicker
      value={value || new Date()}
      style={styles.picker}
      onChange={onChange}
      minuteInterval={minuteInterval}
      mode={mode}
      display={Platform.OS === "ios" ? "spinner" : "default"}
      {...passThroughProps}
    />
  );

  return (
    <>
      <Touchable onPress={open} style={props.containerStyle}>
        <Text style={[styles.labelStyle, props.labelStyle]}>
          {!value ? emptyLabel : `${prefix} ${dateFormatter(value)}`}
        </Text>
      </Touchable>
      {Platform.select({
        default: visible ? Picker : null,
        ios: (
          <RBSheet ref={ref} height={styles.bottomSheet.height}>
            <PickerActionBar onPress={() => ref.current?.close()} />
            <View style={styles.bottomSheet}>{Picker}</View>
          </RBSheet>
        ),
      })}
    </>
  );
};

export default DateTimePicker;
