import React from "react";
import { View, StyleSheet, Platform } from "react-native";

import { numberToDegreesDisplay, floatToPercentDisplay } from "~/utils/display";

import Text from "~/components/Text";
import LinkTouchable from "~/components/Touchables/LinkTouchable";

import Humidity from "./Icons/Humidity";
import TempOutdoors from "./Icons/TempOutdoors";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

import ZoneSelector from "./ZoneSelector";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: spacing.pteighteen,
      ios: spacing.ptfortyeight,
    }),
  },
  primaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chevron: { ...spacing.mtsix },
  mainTitle: {
    ...fonts.largeTitle,
  },
  secondaryTitle: {
    ...fonts.title,
  },
  metadataContainer: {
    justifyContent: "space-evenly",
  },
  metadataText: {
    ...spacing.mlfour,
    ...fonts.secondaryHeader,
    textAlign: "right",
    fontVariant: ["tabular-nums"],
  },
  activeFault: {
    color: colors.red,
    fontWeight: "normal",
    lineHeight: 15,
  },
  activeFaultContainer: {
    marginRight: "auto",
    height: 18,
  },
});

interface HomeTitleBarProps {
  currentZone: string;
  location: string;
  onPress: () => void;
  disabled?: boolean;
  outdoorTemp: number | null | string;
  humidity: number | null;
  hideMetadata?: boolean;
  activeFault?: string;
  onPressFault?: () => void;
}

const HomeTitleBar = (props: HomeTitleBarProps): JSX.Element => {
  const {
    onPress,
    currentZone,
    location,
    disabled,
    outdoorTemp,
    humidity,
    hideMetadata,
    activeFault,
    onPressFault,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.primaryRow}>
        <ZoneSelector
          size={"large"}
          zone={currentZone}
          location={location}
          disabled={disabled}
          onPress={onPress}
        />
        {!hideMetadata && (
          <View style={styles.metadataContainer}>
            <View style={styles.row}>
              <TempOutdoors />
              <Text style={styles.metadataText}>
                {outdoorTemp ? numberToDegreesDisplay(outdoorTemp) : "-"}
              </Text>
            </View>
            <View style={styles.row}>
              <Humidity />
              <Text style={styles.metadataText}>
                {humidity ? floatToPercentDisplay(humidity) : "-"}
              </Text>
            </View>
          </View>
        )}
      </View>
      <LinkTouchable
        text={activeFault ?? ""}
        onPress={onPressFault ?? (() => undefined)}
        containerStyle={styles.activeFaultContainer}
        textStyle={styles.activeFault}
      />
    </View>
  );
};

export default HomeTitleBar;
