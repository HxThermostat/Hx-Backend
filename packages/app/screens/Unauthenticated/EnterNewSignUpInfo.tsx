import React, { useState, useRef, useCallback, useLayoutEffect } from "react";
import { View, StyleSheet, TextInput as RNTextInput } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSignUpMutation } from "~/graph";
import { UnreachableCaseError } from "ts-essentials";

import i18n, { usersCurrentRegion } from "~/i18n";

import { UnauthenticatedNavigatorRouteList } from "~/navigators/UnauthenticatedNavigator";

import Background from "~/components/Background";
import Text from "~/components/Text";
import HeaderButton from "~/components/Touchables/HeaderButton";
import StandardButton from "~/components/Touchables/StandardButton";
import TextInputWithLabel from "~/components/Inputs/TextInputWithLabel";

import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "auto",
    marginBottom: "auto",
    maxWidth: 280,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  scrollFlex: {
    flexGrow: 1,
    ...spacing.pxsixteen,
  },
  titleText: {
    ...fonts.largeTitle,
    textAlign: "center",
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
    width: 240,
    alignSelf: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },
  signUpTextLight: {
    ...fonts.signUpTextLight,
    textAlign: "center",
  },
  signUpTextLightBold: {
    fontWeight: "600",
  },
});

const scope = "Screens.Unauthenticated.EnterNewSignUpInfo";

const EXTRA_KEYBOARD_OFFSET_HEIGHT = 25;

type EnterNewSignUpInfoScreenScreenNavigationProp = NativeStackNavigationProp<
  UnauthenticatedNavigatorRouteList,
  "EnterNewSignUpInfo"
>;

export type EnterNewSignUpInfoScreenProps = {
  navigation: EnterNewSignUpInfoScreenScreenNavigationProp;
  route: RouteProp<UnauthenticatedNavigatorRouteList, "EnterNewSignUpInfo">;
};

export default function EnterNewSignUpInfo(
  props: EnterNewSignUpInfoScreenProps
): JSX.Element {
  const { email } = props.route.params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState(usersCurrentRegion);
  const lastNameInputRef = useRef<RNTextInput>(null);

  const [signUpMutation, { loading }] = useSignUpMutation({
    variables: {
      input: { email, firstName, lastName, country },
    },
    onCompleted: ({ signUp }) => {
      switch (signUp.__typename) {
        case "EmailInvalid":
        case "EmailTaken":
          props.navigation.goBack();
          break;
        case "FirstNameInvalid":
        case "LastNameInvalid":
          // @TODO - how would we want to handle this?
          break;
        case "CountryInvalid":
          setCountry("Unknown"); // set country as US if the previous country code somehow fails since we offer no way of changing it
          break;
        case "SignUpSuccess": {
          props.navigation.navigate("EnterEmailConfirmation", { email });
          break;
        }
        default:
          throw new UnreachableCaseError(signUp);
      }
    },
  });

  const handleInfoSubmit = useCallback(() => {
    if (firstName && lastName) {
      signUpMutation();
    }
  }, [signUpMutation, firstName, lastName]);

  const disabled = !submissionIsValid() || loading;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <HeaderButton
          disabled={disabled}
          loading={loading}
          onPress={handleInfoSubmit}
          text={i18n.t("button", { scope })}
        />
      ),
    });
  }, [props.navigation, handleInfoSubmit, disabled, loading]);

  function submissionIsValid(): boolean {
    return Boolean(firstName && lastName);
  }

  return (
    <Background>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollFlex}
        // alwaysBounceVertical={false}
        extraScrollHeight={EXTRA_KEYBOARD_OFFSET_HEIGHT}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.topSection}>
            <Text style={styles.titleText}>{i18n.t("title", { scope })}</Text>
            <Text style={styles.signUpTextLight}>
              {i18n.t("createAccountFor", { scope })}
              {"\n"}
              <Text style={styles.signUpTextLightBold}>{email}</Text>
            </Text>
          </View>
          <View style={styles.bottomSection}>
            <View>
              <TextInputWithLabel
                label={i18n.t("firstNameLabel", { scope })}
                onChangeText={str => setFirstName(str)}
                value={firstName}
                placeholder={i18n.t("firstNamePlaceholder", { scope })}
                returnKeyType="next"
                textContentType="givenName"
                onSubmitEditing={() => lastNameInputRef?.current?.focus()}
              />
              <TextInputWithLabel
                label={i18n.t("lastNameLabel", { scope })}
                onChangeText={str => setLastName(str)}
                value={lastName}
                placeholder={i18n.t("lastNamePlaceholder", { scope })}
                returnKeyType="done"
                textContentType="familyName"
                onSubmitEditing={handleInfoSubmit}
                ref={lastNameInputRef}
              />
            </View>
            <StandardButton
              style={styles.loginBtn}
              disabled={disabled}
              onPress={handleInfoSubmit}
              loading={loading}
            >
              <Text style={fonts.baseTouchableText}>
                {i18n.t("button", { scope })}
              </Text>
            </StandardButton>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
}
