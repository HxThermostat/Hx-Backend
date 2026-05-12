import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

import Icon from "react-native-vector-icons/EvilIcons";

import Text from "~/components/Text";
import Touchable from "~/components/Touchables/Touchable";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing, { size } from "~/styles/spacing";

const largeStyles = StyleSheet.create({
  container: {
    opacity: 1, // Override Touchable.opacity when it is disabled
    flex: 1,
    ...spacing.mrtwentyeight, // without this margin, the chevron icon collides with the metadata section
  },
  row: { flexDirection: "row", alignItems: "center" },
  chevron: { ...spacing.mtsix },
  zoneLabel: {
    ...fonts.largeTitle,
  },
  locationLabel: {
    ...fonts.secondaryHeaderLight,
    ...spacing.mtten,
  },
});

const compactStyles = StyleSheet.create({
  container: {
    opacity: 1, // Override Touchable.opacity when it is disabled
    ...spacing.mrtwentytwo, // without this margin, the chevron icon collides with the metadata section
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: { flexDirection: "row", alignItems: "center" },
  chevron: {},
  label: {
    ...fonts.secondaryHeaderLight,
  },
});

interface ZoneSelectorProps {
  size: "large" | "compact";
  zone: string;
  location: string;
  onPress: () => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const LargeZoneSelector = (
  props: Omit<ZoneSelectorProps, "size">
): JSX.Element => {
  const { onPress, zone, location, disabled, containerStyle } = props;
  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      style={[largeStyles.container, containerStyle]}
    >
      <View style={largeStyles.row}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={largeStyles.zoneLabel}
        >
          {zone}
        </Text>
        {!disabled && (
          <Icon
            name="chevron-down"
            style={largeStyles.chevron}
            size={size.thirtytwo}
            color={colors.white}
          />
        )}
      </View>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={largeStyles.locationLabel}
      >
        {location}
      </Text>
    </Touchable>
  );
};

const CompactZoneSelector = (
  props: Omit<ZoneSelectorProps, "size">
): JSX.Element => {
  const { onPress, zone, location, disabled, containerStyle } = props;

  const secondaryDisplayText = `${zone} - ${location}`;

  return (
    <Touchable
      style={[compactStyles.container, containerStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={compactStyles.row}>
        <Text
          ellipsizeMode={"tail"}
          numberOfLines={1}
          style={compactStyles.label}
        >
          {secondaryDisplayText}
        </Text>
        {!disabled && (
          <Icon
            name="chevron-down"
            style={compactStyles.chevron}
            size={size.thirtytwo}
            color={colors.white}
          />
        )}
      </View>
    </Touchable>
  );
};

const ZoneSelector = ({ size, ...props }: ZoneSelectorProps): JSX.Element => {
  return size === "large" ? (
    <LargeZoneSelector {...props} />
  ) : (
    <CompactZoneSelector {...props} />
  );
};

export default ZoneSelector;
