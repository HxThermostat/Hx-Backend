import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { OnboardingNavigatorRouteList } from "~/navigators/OnboardingNavigator";

import { useAuth } from "~/contexts";

import { useWelcomeQuery } from "~/graph";

import i18n from "~/i18n";

import images from "~/assets/images";

import Background from "~/components/Background";
import Text from "~/components/Text";
import LinkTouchable from "~/components/Touchables/LinkTouchable";
import StandardButton from "~/components/Touchables/StandardButton";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

const scope = "Screens.ProApp.ProAppNavigator.Welcome";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...spacing.mtfiftyfour,
  },
  title: {
    ...fonts.largeTitle,
    ...spacing.pxtwentyfour,
    ...spacing.mbfourteen,
  },
  description: {
    ...fonts.secondaryHeaderLight,
    ...spacing.pxtwentyfour,
  },
  button: {
    ...spacing.mbtwentyfour,
  },
  background: {
    marginTop: "auto",
    marginLeft: "auto",
  },
});

export type WelcomeProps = {
  navigation: NativeStackNavigationProp<OnboardingNavigatorRouteList, "Pro">;
  router: RouteProp<OnboardingNavigatorRouteList, "Pro">;
};

export default function Welcome({ navigation }: WelcomeProps): JSX.Element {
  const { reload } = useAuth();
  const { data } = useWelcomeQuery({
    fetchPolicy: "no-cache",
    pollInterval: 5000,
  });

  const hasControllers = (data?.controllers ?? []).length > 0;

  useEffect(() => {
    if (!hasControllers) return;
    reload(true);
  }, [hasControllers, reload]);

  return (
    <Background>
      <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
        <View style={{ flex: 1 }}>
          <View>
            <Text style={styles.title}>{i18n.t("title", { scope })}</Text>
            <Text style={styles.description}>
              {i18n.t("requestOrConnect", { scope })}
            </Text>
          </View>
          <View style={{ marginTop: "auto", alignItems: "center" }}>
            <StandardButton
              style={styles.button}
              onPress={() =>
                navigation.navigate("ModalNavigator", {
                  screen: "RequestAccess",
                })
              }
            >
              <Text style={fonts.baseTouchableText}>
                {i18n.t("requestAccess", { scope })}
              </Text>
            </StandardButton>

            <LinkTouchable
              onPress={() =>
                navigation.navigate("ModalNavigator", {
                  screen: "ConnectThermostat",
                })
              }
              text={i18n.t("connectThermostat", { scope })}
            />
          </View>
        </View>
        <Image style={styles.background} source={images.proWelcome} />
      </SafeAreaView>
    </Background>
  );
}
