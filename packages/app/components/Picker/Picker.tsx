import React, { useImperativeHandle, useRef } from "react";
import { View, StyleSheet, Platform, TextStyle, StyleProp } from "react-native";

import { Picker as RNCPicker } from "@react-native-community/picker";

import RBSheet from "react-native-raw-bottom-sheet";

import Text from "~/components/Text";
import Touchable from "~/components/Touchables/Touchable";
import PickerActionBar from "~/components/Picker/PickerActionBar";

import colors from "~/styles/color";

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
    height: 220,
    backgroundColor: colors.iosSystemGray6,
  },
});

export interface PickerOption {
  itemLabel?: string;
  label: string;
  value: string;
}

function convertToPickerOption(
  options: Array<PickerOption | string>
): Array<PickerOption> {
  return options.map((option: PickerOption | string) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    } else {
      return option;
    }
  });
}

interface PickerProps {
  value: string;
  options: Array<PickerOption | string>;
  onValueChange: (newValue: string) => void;
  blurOnChange?: boolean;
  labelStyle?: TextStyle;
  containerStyle?: StyleProp<{}>;
  disabled?: boolean;
}
const Picker = React.forwardRef<Pick<RBSheet, "open" | "close">, PickerProps>(
  (props: PickerProps, ref): JSX.Element => {
    const rbsheetRef = useRef<RBSheet>(null);

    useImperativeHandle(ref, () => ({
      close: () => {
        rbsheetRef.current?.close();
      },
      open: () => {
        rbsheetRef.current?.open();
      },
    }));

    const { value, options, onValueChange, blurOnChange } = props;

    const optionObjects: PickerOption[] = convertToPickerOption(options);

    const Picker = (
      <RNCPicker
        selectedValue={value}
        style={styles.picker}
        itemStyle={styles.itemStyle}
        onValueChange={itemValue => {
          onValueChange(itemValue as string);
          if (blurOnChange) {
            rbsheetRef.current?.close();
          }
        }}
      >
        {optionObjects.map((option, index) => (
          <RNCPicker.Item
            key={index}
            label={option.itemLabel || option.label}
            value={option.value}
          />
        ))}
      </RNCPicker>
    );

    return (
      <>
        <Touchable
          onPress={() => rbsheetRef.current?.open()}
          style={props.containerStyle}
          disabled={props.disabled}
        >
          <Text style={[styles.labelStyle, props.labelStyle]}>
            {optionObjects.find(o => o.value === value)?.label}
          </Text>
        </Touchable>
        {!props.disabled &&
          Platform.select({
            default: Picker,
            ios: (
              <RBSheet ref={rbsheetRef} height={styles.bottomSheet.height}>
                <PickerActionBar onPress={() => rbsheetRef.current?.close()} />
                <View style={styles.bottomSheet}>{Picker}</View>
              </RBSheet>
            ),
          })}
      </>
    );
  }
);

Picker.displayName = "Picker";
export default Picker;
