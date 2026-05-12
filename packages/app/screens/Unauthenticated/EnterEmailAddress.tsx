import React, { useState } from "react";
import { View, StyleSheet, Image, Platform } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSendTokenMutation } from "~/graph";
import { UnreachableCaseError } from "ts-essentials";

import i18n from "~/i18n";

import { UnauthenticatedNavigatorRouteList } from "~/navigators/UnauthenticatedNavigator";

import Background from "~/components/Background";
import Text from "~/components/Text";
import TextInput from "~/components/Inputs/TextInput";
import StandardButton from "~/components/Touchables/StandardButton";

import fonts from "~/styles/fonts";
import images from "~/assets/images";
import spacing, { size } from "~/styles/spacing";
import { isValidEmail } from "~/utils/display";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "auto",
    marginBottom: "auto",
    width: 240,
    alignSelf: "center",
    ...spacing.pythirtytwo,
  },
  scrollFlex: {
    flexGrow: 1,
  },
  image: {
    height: 130,
    width: 130,
    alignSelf: "center",
  },
  titleText: {
    ...fonts.largeTitle,
    textAlign: "center",
    alignSelf: "center",
    ...spacing.mbfortytwo,
    ...spacing.mtfortyeight,
  },
  loginBtn: {
    ...spacing.mbtwelve,
  },
  topSection: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  bottomSection: {
    width: 180,
    alignSelf: "center",
  },
});

const scope = "Screens.Unauthenticated.EnterEmailAddress";

type EnterEmailAddressScreenNavigationProp = NativeStackNavigationProp<
  UnauthenticatedNavigatorRouteList,
  "EnterEmailAddress"
>;

type EnterEmailAddressScreenProps = {
  navigation: EnterEmailAddressScreenNavigationProp;
  router: RouteProp<UnauthenticatedNavigatorRouteList, "EnterEmailAddress">;
};

export default function EnterEmailAddress(
  props: EnterEmailAddressScreenProps
): JSX.Element {
  const [email, setEmail] = useState("");

  const [login, { loading }] = useSendTokenMutation({
    variables: { input: { email } },
    onCompleted: ({ sendToken }) => {
      switch (sendToken.__typename) {
        case "SendTokenSuccess":
          props.navigation.navigate("EnterEmailConfirmation", { email });
          break;
        case "NotFound":
          props.navigation.navigate("EnterNewSignUpInfo", { email });
          break;
        default:
          throw new UnreachableCaseError(sendToken);
      }
    },
  });
  function handleEmailSubmit(): void {
    if (isValidEmail(email)) {
      login();
    }
  }
  return (
    <Background>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollFlex}
        alwaysBounceVertical={false}
        extraScrollHeight={size.ten}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.topSection}>
            <Image
              source={images.email}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.titleText}>{i18n.t("title", { scope })}</Text>
            <View>
              <TextInput
                onChangeText={v => setEmail(v.trim())}
                value={email}
                label={
                  Platform.OS === "android"
                    ? i18n.t("label", { scope })
                    : undefined
                }
                placeholder={
                  Platform.OS === "ios"
                    ? i18n.t("placeholder", { scope })
                    : undefined
                }
                autoCorrect={false}
                keyboardType={"email-address"}
                autoCompleteType={"email"}
                textContentType={"emailAddress"}
                autoCapitalize={"none"}
                returnKeyType="done"
                onSubmitEditing={handleEmailSubmit}
              />
            </View>
          </View>
          <View style={styles.bottomSection}>
            <StandardButton
              style={styles.loginBtn}
              disabled={!isValidEmail(email) || loading}
              onPress={handleEmailSubmit}
              loading={loading}
            >
              <Text style={fonts.baseTouchableText}>
                {i18n.t("Common.continue")}
              </Text>
            </StandardButton>

            <Text style={fonts.loginHintText}>
              {i18n.t("description", { scope })}
            </Text>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
}
