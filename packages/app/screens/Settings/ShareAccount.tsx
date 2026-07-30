import React, { useCallback } from "react";
import {
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/EvilIcons";

import { captureException } from "@sentry/react-native";

import { useAuth } from "~/contexts";

import { useGenerateShareTokenMutation } from "~/graph";

import i18n from "~/i18n";

import { trackSegmentEvent, trackSegmentEventIOS } from "~/utils/segment";

import Background from "~/components/Background";
import StandardButton from "~/components/Touchables/StandardButton";

import colors from "~/styles/color";
import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
    ...spacing.pxtwenty,
  },
  title: {
    ...fonts.largeTitle,
    ...spacing.pbtwenty,
  },
  subtitle: {
    ...fonts.caption2L13,
    ...spacing.pbtwenty,
  },
  shareRequestButton: {
    ...spacing.mysixtyfour,
  },
  shareRequestButtonContent: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  shareRequestText: {
    ...fonts.baseTouchableText,
    ...spacing.pxeight,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    ...spacing.mttwentyeight,
  },
  bullet: {
    ...fonts.body,
    width: 20,
  },
  bulletText: {
    ...fonts.body,
    flex: 1,
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.ShareAccount";

export default function ShareAccount(): JSX.Element {
  const { email } = useAuth();
  const [generateShareToken, { loading }] = useGenerateShareTokenMutation();

  const onShareRequestPress = useCallback(async () => {
    if (!email) return;

    const { data } = await generateShareToken();

    if (data?.generateShareToken.token) {
      const code = data.generateShareToken.token;
      const url = `https://hx.yoursysteminfo.com/signIn/${email}/${code}`;
      const message = i18n.t("share.message", { scope, url, email, code });

      trackSegmentEvent("Share Account Share Sheet Displayed");

      Share.share(
        {
          message,
        },
        {
          excludedActivityTypes: [
            "AddToReadingList",
            "AssignToContact",
            "OpenInIBooks",
            "PostToFacebook",
            "PostToFlickr",
            "PostToTencentWeibo",
            "PostToTwitter",
            "PostToVimeo",
            "PostToWeibo",
            "Print",
            "SaveToCameraRoll",
            "MarkupAsPDF",
          ].map(activity => `com.apple.UIKit.activity.${activity}`),
          subject: i18n.t("share.subject", { scope }),
          tintColor: colors.tint,
        }
      )
        .then(value => {
          switch (value.action) {
            case "sharedAction":
              trackSegmentEventIOS("Share Account Share Sheet Success");
              break;
            case "dismissedAction":
              trackSegmentEventIOS("Share Account Share Sheet Dismissed");
              break;
          }
          return value;
        })
        .catch(error => {
          captureException(error);
        });
    }
  }, [email, generateShareToken]);

  return (
    <Background>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior={"automatic"}
      >
        <Text style={styles.title}>{i18n.t("title", { scope })}</Text>

        <Text style={styles.subtitle}>{i18n.t("subtitle", { scope })}</Text>

        <View style={styles.listItem}>
          <Text style={fonts.body}>{i18n.t("bulletsHeading", { scope })}</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>1.</Text>
          <Text style={styles.bulletText}>
            {i18n.t("bulletEnterEmail", { scope })}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>2.</Text>
          <Text style={styles.bulletText}>
            {i18n.t("bulletEnterCode", { scope })}
          </Text>
        </View>

        <StandardButton
          contentContainerStyle={styles.shareRequestButtonContent}
          style={styles.shareRequestButton}
          onPress={onShareRequestPress}
          loading={loading}
        >
          <Icon name="share-apple" size={24} color={colors.white} />
          <Text style={styles.shareRequestText}>
            {i18n.t("button", { scope })}
          </Text>
        </StandardButton>
      </ScrollView>
    </Background>
  );
}
