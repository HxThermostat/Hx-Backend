import React from "react";
import { Platform, View, StyleSheet } from "react-native";

import { RadioButton } from "react-native-paper";

import ImageIcon from "~/components/ImageIcon";

import colors from "~/styles/color";
import images from "~/assets/images";
import spacing from "~/styles/spacing";

const styles = StyleSheet.create({
  checkmarkContainer: {
    width: 12,
    ...spacing.mrfifteen,
  },
});

interface CheckmarkProps {
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}

const Checkmark = (props: CheckmarkProps): JSX.Element => {
  const { selected, onPress, disabled } = props;
  if (Platform.OS === "android") {
    return (
      <RadioButton.Android
        value={""} // required prop that we don't need
        onPress={onPress}
        status={selected ? "checked" : "unchecked"}
        color={colors.white}
        disabled={disabled}
      />
    );
  }
  if (selected) {
    return (
      <ImageIcon style={styles.checkmarkContainer} image={images.checkmark} />
    );
  }
  return <View style={styles.checkmarkContainer} />;
};

export default Checkmark;
