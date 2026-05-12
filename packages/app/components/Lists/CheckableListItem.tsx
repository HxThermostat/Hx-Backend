import React, { useCallback } from "react";
import { View, StyleSheet, TextStyle } from "react-native";

import Text from "~/components/Text";
import Touchable from "~/components/Touchables/Touchable";
import Checkmark from "~/components/Checkmark";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    ...spacing.mttwenty,
    ...spacing.pxfifteen,
  },
  reverse: {
    flexDirection: "row-reverse",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  title: {
    ...fonts.secondaryHeader,
    minWidth: 40,
    ...spacing.mrtwenty,
  },
  secondaryText: {
    flex: 1,
    ...fonts.caption2,
  },
});

interface CheckableListItemProps {
  selected: boolean;
  title: string;
  secondaryText?: string;
  onPress: () => void;
  textStyle?: TextStyle;
  reverse?: boolean;
  disabled?: boolean;
}

const CheckableListItem = (props: CheckableListItemProps): JSX.Element => {
  const {
    title,
    selected,
    secondaryText,
    onPress: _onPress,
    textStyle,
    reverse,
    disabled,
  } = props;

  const onPress = useCallback(() => (disabled ? undefined : _onPress()), [
    disabled,
    _onPress,
  ]);

  return (
    <Touchable
      onPress={onPress}
      style={[styles.container, reverse ? styles.reverse : {}]}
      disabled={disabled}
    >
      <Checkmark onPress={onPress} selected={selected} />
      <View style={styles.row}>
        <Text
          style={[styles.title, textStyle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        {Boolean(secondaryText) && (
          <Text style={styles.secondaryText}>{secondaryText}</Text>
        )}
      </View>
    </Touchable>
  );
};

export default CheckableListItem;
