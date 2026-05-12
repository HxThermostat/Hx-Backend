import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { View, StyleSheet, Image, Platform, Alert } from "react-native";

import Clipboard from "@react-native-community/clipboard";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { openInbox } from "react-native-email-link";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { systemWeights } from "react-native-typography";

import i18n from "~/i18n";

import { attemptToOpenURL } from "~/utils/linking";

import { useSendTokenMutation, useSignInMutation } from "~/graph";
import { UnreachableCaseError } from "ts-essentials";

import { useAuth } from "~/contexts";

import useAppState from "~/hooks/useAppState";

import { UnauthenticatedNavigatorRouteList } from "~/navigators/UnauthenticatedNavigator";

import Background from "~/components/Background";
import StandardButton from "~/components/Touchables/StandardButton";
import TextInput from "~/components/Inputs/TextInput";
import HeaderButton from "~/components/Touchables/HeaderButton";
import ActivityIndicator from "~/components/ActivityIndicator";
import LinkTouchable from "~/components/Touchables/LinkTouchable";
import Text from "~/components/Text";

import fonts from "~/styles/fonts";
import images from "~/assets/images";
import spacing, { size } from "~/styles/spacing";
import colors from "~/styles/color";
import {
  saveToAsyncStorage,
  LOGIN_EMAIL,
  removeFromAsyncStorage,
} from "~/utils/localStorage";
import { isValidToken } from "./helpers";
import {
  useKohortTracking,
  KohortFunnel,
  KohortFunnelEventStep,
} from "~/utils/kohort";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "auto",
    marginBottom: "auto",
    maxWidth: 265,
    alignSelf: "center",
    justifyContent: "space-between",
    ...spacing.pysixteen,
  },
  scrollFlex: {
    flexGrow: 1,
    ...spacing.pxsixteen,
  },
  headerRightText: {
    color: colors.tint,
  },
  topSection: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  bottomSection: {
    justifyContent: "space-evenly",
    flex: 1,
  },
  titleText: {
    ...fonts.largeTitle,
    textAlign: "center",
    ...spacing.myfortytwo,
  },
  signUpTextLight: {
    maxWidth: 250,
    textAlign: "center",
    ...fonts.signUpTextLight,
  },
  signUpTextLightBold: {
    ...systemWeights.bold,
  },
  image: {
    height: 140,
    width: 210,
    alignSelf: "center",
  },
  btn: {
    ...spacing.mythirtytwo,
  },
  hintText: {
    ...fonts.caption2R11,
    textAlign: "center",
    opacity: 0.5,
  },
  codeInput: {
    ...spacing.mttwelve,
  },
});

const scope = "Screens.Unauthenticated.EnterEmailConfirmation";

type EnterEmailConfirmationScreenNavigationProp = NativeStackNavigationProp<
  UnauthenticatedNavigatorRouteList,
  "EnterEmailConfirmation"
>;

export type EnterEmailConfirmationProps = {
  navigation: EnterEmailConfirmationScreenNavigationProp;
  route: RouteProp<UnauthenticatedNavigatorRouteList, "EnterEmailConfirmation">;
};

export default function EnterEmailConfirmation(
  props: EnterEmailConfirmationProps
): JSX.Element {
  // email should always be present
  // a deep link may also contain the email token from which we could submit immediately
  const { email, emailToken } = props.route.params;
  const { navigation } = props;

  useEffect(() => {
    // store email in case they drop off here
    saveToAsyncStorage(LOGIN_EMAIL, email);
  }, [email]);

  const [token, setToken] = useState<string>();
  const [invalidToken, setInvalidToken] = useState<string>();

  const currentAppState = useAppState();
  const previousAppState = useRef(currentAppState);

  const tryToFillInputWithCopiedCode = useCallback(async () => {
    if (await Clipboard.hasString()) {
      const content = await Clipboard.getString();
      const pasted = content?.trim() ?? "";

      if (isValidToken(pasted)) {
        setToken(pasted);
      }
    }
  }, []);

  useEffect(() => {
    if (
      previousAppState.current === "background" &&
      currentAppState === "active"
    ) {
      tryToFillInputWithCopiedCode();
    }
    previousAppState.current = currentAppState;
  }, [currentAppState, tryToFillInputWithCopiedCode]);

  useEffect(() => {
    setToken(emailToken);
  }, [emailToken]);

  const { signIn: setAuthToken } = useAuth();
  const { trackFunnel } = useKohortTracking();

  const [sendTokenMutation] = useSendTokenMutation({
    variables: { input: { email } },
  });

  const [signInMutation, { loading }] = useSignInMutation({
    variables: {
      input: {
        email,
        token: emailToken ? emailToken : token ?? "",
      },
    },
    onCompleted: ({ signIn }) => {
      switch (signIn.__typename) {
        case "EmailInvalid":
        case "TokenInvalid":
          if (emailToken) {
            Alert.alert(
              i18n.t("alertDeeplink.title", { scope }),
              i18n.t("alertDeeplink.message", { scope, email }),
              [
                {
                  text: i18n.t("alertDeeplink.defaultButton", { scope }),
                  style: "default",
                  onPress: () => sendTokenMutation(),
                },
              ]
            );
          } else {
            Alert.alert(
              i18n.t("alertManual.title", { scope }),
              i18n.t("alertManual.message", { scope, email }),
              [
                {
                  text: i18n.t("alertManual.defaultButton", { scope }),
                  style: "default",
                },
                {
                  text: i18n.t("alertManual.cancelButton", { scope }),
                  style: "cancel",
                  onPress: () => sendTokenMutation(),
                },
              ]
            );
          }
          navigation.setParams({ emailToken: undefined });
          setInvalidToken(emailToken ? emailToken : token ?? "");
          break;
        case "SignInSuccess": {
          // Clear any deep links that signed the user in previously
          attemptToOpenURL("hx://signIn");
          removeFromAsyncStorage(email);
          setAuthToken({
            ...signIn,
            expiresAt: new Date(Date.now() + signIn.ttl * 1000),
          });
          trackFunnel({
            funnel: KohortFunnel.Adoption,
            step: KohortFunnelEventStep.SignIn,
          });
          trackFunnel({
            funnel: KohortFunnel.SignIn,
            step: KohortFunnelEventStep.SignInSuccess,
          });

          break;
        }
        default:
          throw new UnreachableCaseError(signIn);
      }
    },
  });

  useEffect(() => {
    // if we have the email token from a deep link, submit
    // @TODO test this more thoroughly once onboarding flow is complete etc.
    if (emailToken) {
      trackFunnel({
        funnel: KohortFunnel.SignIn,
        step: KohortFunnelEventStep.SignInStart,
      });
      signInMutation();
    }
  }, [signInMutation, emailToken]);

  const handleSubmitToken = useCallback(() => {
    if (loading || !token) {
      return;
    }
    trackFunnel({
      funnel: KohortFunnel.SignIn,
      step: KohortFunnelEventStep.SignInStart,
    });
    signInMutation();
  }, [signInMutation, loading, token]);

  function attemptToOpenEmail(): void {
    openInbox().catch(() => {
      // If openInbox() fails, let's just do the next best thing:
      const url = Platform.OS === "android" ? "mailto:" : "message:";
      attemptToOpenURL(url);
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => {
        if (loading) {
          return <ActivityIndicator color={colors.tint} />;
        }

        return (
          <HeaderButton
            onPress={handleSubmitToken}
            disabled={!token || token.length < 8 || token === invalidToken}
            hitSlop={{ top: 40, bottom: 40, left: 10, right: 10 }}
          >
            <Text style={styles.headerRightText}>
              {i18n.t("headerRightText", { scope })}
            </Text>
          </HeaderButton>
        );
      },
    });
  }, [navigation, handleSubmitToken, token, invalidToken, loading]);

  const ref = useRef<KeyboardAwareScrollView>(null);

  const showEmailNotRecievedAlert = useCallback(() => {
    Alert.alert(
      i18n.t("alertEmailNotReceived.title", { scope }),
      i18n.t("alertEmailNotReceived.message", { scope }),
      [
        {
          text: i18n.t("alertEmailNotReceived.defaultButton", { scope }),
          style: "default",
          onPress: () => sendTokenMutation(),
        },
        {
          text: i18n.t("alertEmailNotReceived.cancelButton", { scope }),
          style: "cancel",
        },
      ]
    );
  }, [sendTokenMutation]);

  return (
    <Background>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollFlex}
        alwaysBounceVertical={false}
        ref={ref}
        extraScrollHeight={size.thirty}
        onContentSizeChange={() => ref.current?.scrollToEnd(true)}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.topSection}>
            <Image
              source={images.plane}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.titleText}>{i18n.t("title", { scope })}</Text>
            <Text style={styles.signUpTextLight}>
              {i18n.t("instructions", { scope })}
              {"\n"}
              <Text style={styles.signUpTextLightBold}>{email}</Text>
            </Text>
          </View>
          <View style={styles.bottomSection}>
            <View>
              <StandardButton
                style={styles.btn}
                onPress={attemptToOpenEmail}
                disabled={loading}
              >
                <Text style={fonts.baseTouchableText}>
                  {i18n.t("button", { scope })}
                </Text>
              </StandardButton>
            </View>

            <View>
              <Text style={styles.hintText}>
                {i18n.t("fallbackInstructions", { scope })}
              </Text>
              <LinkTouchable
                onPress={showEmailNotRecievedAlert}
                text={i18n.t("emailNotReceived", { scope })}
                textStyle={styles.hintText}
              />
              <TextInput
                value={token}
                onChangeText={v => setToken(v)}
                placeholder={i18n.t("placeholder", { scope })}
                returnKeyType="done"
                autoCapitalize="none"
                spellCheck={false}
                onSubmitEditing={handleSubmitToken}
                containerStyle={styles.codeInput}
              />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
}
