import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";

import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

import { useLocationItemQuery } from "~/graph";

import i18n from "~/i18n";

import TouchableItem from "~/components/Touchables/TouchableItem";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing, { size } from "~/styles/spacing";

import { DateFormatter } from "~/utils/display";

const scope = "Screens.ProApp.ProAppNavigator.ProHome";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    ...spacing.pytwentyfour,
    ...spacing.pxsixteen,
    ...spacing.pttwentyeight,
    justifyContent: "space-between",
  },
  mainRow: {
    flexDirection: "row",
  },
  title: {
    ...spacing.mbsixteen,
    ...fonts.title,
    color: colors.white,
  },
  subtitles: {
    fontSize: 13,
    lineHeight: 16,
    color: colors.offGray,
  },
  iconContainer: {
    width: size.thirtytwo,
    height: size.thirtytwo,
    backgroundColor: colors.iconButtonBackground,
    borderRadius: size.thirtytwo,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    ...spacing.mtsixteen,
  },
  onlineConnectionStatus: {
    ...fonts.body,
    color: colors.offGray,
  },
  offlineConnectionStatus: {
    ...fonts.body,
    color: colors.red,
  },
  email: {
    ...fonts.body,
  },
  fault: {
    color: colors.red,
  },
});

const formatDate = DateFormatter("LLL");

interface LocationItemProps {
  locationId: string;
  onDetailsPress: (locationId: string) => void;
}

export default function LocationItem({
  locationId,
  onDetailsPress,
}: LocationItemProps): JSX.Element {
  const { data } = useLocationItemQuery({
    variables: { locationId },
    fetchPolicy: "cache-only",
  });

  const onPress = useCallback(() => {
    onDetailsPress(locationId);
  }, [locationId, onDetailsPress]);

  // TODO(nleach): There's probably a better way to handle this case
  if (!data?.location) return <View />;

  const {
    accessLevel,
    activeFault,
    connectionStatus,
    dsn,
    name,
    share,
    sharer,
  } = data.location;

  const connectionStatusStyle =
    connectionStatus === "ONLINE"
      ? styles.onlineConnectionStatus
      : styles.offlineConnectionStatus;

  return (
    <TouchableItem onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.mainRow}>
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitles}>{dsn}</Text>
            {share && (
              <Text style={styles.subtitles}>
                {i18n.t(
                  `access.${
                    share.expiresAt ? "temporary" : "permanent"
                  }.${accessLevel}`,
                  {
                    scope,
                    expiresAt: share.expiresAt
                      ? formatDate(new Date(share.expiresAt))
                      : null,
                  }
                )}
              </Text>
            )}
            <Text style={[styles.subtitles, styles.fault]}>
              {activeFault ?? " "}
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <Icon
              name={"chevron-right"}
              size={size.twenty}
              color={colors.white}
            />
          </View>
        </View>

        <View style={styles.statusRow}>
          <Text style={connectionStatusStyle}>
            {i18n.t(connectionStatus, { scope })}
          </Text>
          <Text style={styles.email}>
            {sharer?.email ?? i18n.t("myDevice", { scope })}
          </Text>
        </View>
      </View>
    </TouchableItem>
  );
}
