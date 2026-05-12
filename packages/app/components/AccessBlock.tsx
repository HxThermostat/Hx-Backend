import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "~/components/Text";
import Touchable from "~/components/Touchables/Touchable";

import i18n from "~/i18n";

import spacing from "~/styles/spacing";
import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import { ShareAccessLevel } from "~/graph";

const styles = StyleSheet.create({
  container: {},
  sectionBlock: {
    ...spacing.mltwentyfour,
    ...spacing.pbtwentysix,
    ...spacing.mbtwentyeight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  titleText: {
    ...fonts.title,
    ...spacing.mbtwenty,
    ...spacing.prtwentyfour,
  },
  detailText: {
    ...fonts.caption2L13,
    opacity: 0.3,
    ...spacing.prtwentyfour,
  },
  statusText: { ...spacing.mttwelve },
  revokeBtn: {
    ...spacing.mtfiftyfour,
  },
  revokeText: {
    ...fonts.title,
    ...spacing.prtwenty,
    textAlign: "right",
  },
});

const scope = "Components.AccessBlock";

interface AccessBlockProps {
  level: ShareAccessLevel;
  email: string;
  locationName: string;
  expiresAt?: Date;
  onPress: () => void;
}
const AccessBlock = (props: AccessBlockProps): JSX.Element => {
  const { level, email, locationName, expiresAt, onPress } = props;
  return (
    <View style={styles.sectionBlock}>
      <Text style={styles.titleText}>
        {i18n.t(`accessLevel.${level}`, { scope })}
      </Text>
      <Text style={styles.detailText}>
        {expiresAt
          ? i18n.t("temporaryAccessDescription", {
              email,
              locationName,
              expiresAt,
              scope,
            })
          : i18n.t("permanentAccessDescription", {
              email,
              locationName,
              scope,
            })}
      </Text>
      {level === "STATUS" && (
        <Text style={[styles.detailText, styles.statusText]}>
          {i18n.t(`accessDetails.${level}`, { scope })}
        </Text>
      )}
      <Touchable onPress={onPress} style={styles.revokeBtn}>
        <Text style={styles.revokeText}>{i18n.t("revoke", { scope })}</Text>
      </Touchable>
    </View>
  );
};

export default AccessBlock;
