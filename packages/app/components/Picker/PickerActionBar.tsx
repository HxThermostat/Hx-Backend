import React from "react";
import { View, StyleSheet } from "react-native";

import i18n from "~/i18n";

import Text from "~/components/Text";
import Touchable from "~/components/Touchables/Touchable";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

const styles = StyleSheet.create({
  actionBarContainer: {
    backgroundColor: colors.iosSystemGray6,
    alignItems: "flex-end",
    borderTopWidth: 0.5,
    borderTopColor: colors.black,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.black,
  },
  actionBtn: {
    alignSelf: "flex-end",
    ...spacing.pxtwenty,
    ...spacing.pyten,
  },
  actionLabel: { ...fonts.modalHeaderTitle, color: colors.tint },
});

interface PickerActionBarProps {
  onPress: () => void;
}
const PickerActionBar = ({ onPress }: PickerActionBarProps): JSX.Element => {
  return (
    <View style={styles.actionBarContainer}>
      <Touchable onPress={onPress} style={styles.actionBtn}>
        <Text style={styles.actionLabel}>{i18n.t("Common.done")}</Text>
      </Touchable>
    </View>
  );
};

export default PickerActionBar;
