import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import Icon from "react-native-vector-icons/EvilIcons";

import TextInputWithLabel from "~/components/Inputs/TextInputWithLabel";
import Picker, { PickerOption } from "~/components/Picker/Picker";
import Text from "~/components/Text";

import i18n from "~/i18n";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

const scope = "Common";

const styles = StyleSheet.create({
  pickerRowContainer: {
    ...spacing.mbtwenty,
    flex: 1,
    width: "100%",
  },
  pickerRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    ...spacing.mtten,
  },
  hidden: {
    display: "none",
  },
});

export interface PickerRowProps {
  style?: StyleProp<ViewStyle>;
  label?: string;
  inputLabel: string;
  inputPlaceholder: string;
  value: string | undefined;
  options: PickerOption[];
  onValueChange: (value: string) => void;
  onInputChangeText?: (value: string) => void;
}

export default function PickerRow(props: PickerRowProps): JSX.Element {
  const validPickerValues = props.options.map(o => o.value);
  const options = [
    ...props.options,
    {
      label: i18n.t("other", { scope }),
      value: i18n.t("other", { scope }),
    },
  ];

  const [defaultPickerValue] = useState(
    props.value == null
      ? validPickerValues[0]
      : validPickerValues.includes(props.value)
      ? props.value
      : "Other"
  );

  const [pickerValue, setPickerValue] = useState<string>(defaultPickerValue);
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={[styles.pickerRowContainer, props.style]}>
      <View style={styles.pickerRow}>
        <Text style={fonts.secondaryHeaderSemibold}>{props.label}</Text>
        <View style={styles.picker}>
          <Picker
            value={pickerValue}
            options={options}
            onValueChange={value => {
              setPickerValue(value);
              if (value === "Other") {
                inputRef.current?.focus();
              } else {
                props.onValueChange(value);
              }
            }}
            labelStyle={fonts.secondaryHeader}
          />
          <Icon name="chevron-down" size={20} color={colors.white} />
        </View>
      </View>
      <View
        style={[
          styles.inputContainer,
          pickerValue != "Other" ? styles.hidden : undefined,
        ]}
      >
        <TextInputWithLabel
          ref={inputRef}
          defaultValue={defaultPickerValue == "Other" ? props.value : undefined}
          placeholder={props.inputPlaceholder}
          label={props.inputLabel}
          maxLength={16}
          onChangeText={props.onInputChangeText}
          onEndEditing={({ nativeEvent: { text } }) => {
            props.onValueChange(text);
          }}
        />
      </View>
    </View>
  );
}
