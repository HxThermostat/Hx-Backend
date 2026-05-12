import React from "react";
import { View, StyleSheet, Platform, StyleProp, TextStyle } from "react-native";

import { Divider } from "react-native-elements";

import commonStyles from "~/components/Lists/styles";
import Text from "~/components/Text";

import fonts from "~/styles/fonts";

const styles = StyleSheet.create({
  ...commonStyles,
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    ...Platform.select({
      android: {
        marginTop: 8,
      },
    }),
  },
  sectionLabel: {
    ...fonts.separatorLabel,
    marginLeft: 14,
    marginBottom: 9,
  },
  helperText: {
    ...fonts.caption2R11,
    marginRight: 14,
    marginBottom: 9,
  },
});

interface SectionHeaderProps {
  title: string;
  helperText?: string;
  helperTextStyle?: StyleProp<TextStyle>;
}
const SectionHeader = ({
  title,
  helperText,
  helperTextStyle,
}: SectionHeaderProps): JSX.Element => {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>{title}</Text>
        {Boolean(helperText) && (
          <Text style={[styles.helperText, helperTextStyle]}>{helperText}</Text>
        )}
      </View>
      {Platform.OS === "ios" && <Divider style={styles.divider} />}
    </>
  );
};

export default SectionHeader;
