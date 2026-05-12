import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "~/i18n";

import Background from "~/components/Background";
import Text from "~/components/Text";
import StandardButton from "~/components/Touchables/StandardButton";
import WhatsNewItem from "~/components/WhatsNewItem";

import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";
import colors from "~/styles/color";
import { useAuth } from "~/contexts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollFlex: {
    ...spacing.pttwentysix,
    ...spacing.pxtwentyfour,
  },
  title: {
    ...fonts.largeTitle,
    color: colors.white,
    textAlign: "center",
    ...spacing.mtfortytwo,
    ...spacing.mbtwentysix,
  },
  button: {
    ...spacing.mythirtytwo,
  },
});

const scope = "Screens.Authenticated.WhatsNew";

export default function WhatsNew(): JSX.Element {
  const { isPro, markFirstUse } = useAuth();

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{i18n.t("title", { scope })}</Text>
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollFlex}
        >
          {isPro ? (
            <>
              <WhatsNewItem item={"setup"} color={"blueGreen"} />
              <WhatsNewItem item={"passwordless"} color={"yellow"} />
              <WhatsNewItem item={"easier"} color={"orange"} />
              <WhatsNewItem item={"pro"} color={"purple"} />
            </>
          ) : (
            <>
              <WhatsNewItem item={"easier"} color={"green"} />
              <WhatsNewItem item={"temperatureControl"} color={"yellow"} />
              <WhatsNewItem item={"schedules"} color={"orange"} />
              <WhatsNewItem item={"settings"} color={"purple"} />
              <WhatsNewItem item={"passwordless"} color={"blue"} />
            </>
          )}
        </ScrollView>
        <StandardButton onPress={markFirstUse} style={styles.button}>
          <Text style={fonts.baseTouchableText}>
            {i18n.t("Common.continue")}
          </Text>
        </StandardButton>
      </SafeAreaView>
    </Background>
  );
}
