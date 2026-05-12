import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import HeaderButton from "~/components/Touchables/HeaderButton";
import Background from "~/components/Background";
import TextInputClearable from "~/components/Inputs/TextInputClearable";

import i18n from "~/i18n";

import { attemptToOpenURL } from "~/utils/linking";

import { useAuth } from "~/contexts";

import colors from "~/styles/color";
import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";
import { useConvertToProAccountMutation } from "~/graph";

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    ...spacing.pxtwentyfour,
  },
  headerButtonTextStyle: {
    color: colors.tint,
  },
  title: {
    ...fonts.subheadL20,
    ...spacing.mttwenty,
  },
  subtitle: {
    ...fonts.caption2R13,
    ...spacing.mttwenty,
    opacity: 0.5,
  },
  subtitleLink: {
    textDecorationLine: "underline",
    ...spacing.mhfour,
  },
  inputContainer: {
    ...spacing.mttwenty,
    alignSelf: "center",
    alignItems: "stretch",
  },
  inputTitle: {
    ...spacing.mytwenty,
    ...fonts.caption2R13,
    opacity: 0.5,
  },
  input: {},
});

const NAVIGATOR_LINK =
  "https://www.hvacnavigator.com/OfferingCatalogProductDetail?brandName=York+-+Residential+%26+Commercial&family=Thermostats+%26+Controllers&familyguid=null&id=a7O4A0000009RwMUAU&isModel=true&offering=Residential+Equipment+%26+Supplies&pCodeNumber=S1-THXU430W&statusName=Publishedhttps://www.hvacnavigator.com/HN_LoginRegistration";

const scope = "Screens.Authenticated.SettingsNavigator.ProfessionalAccess";

interface ProfessionalAccessProps {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "ProfessionalAccess"
  >;
  router: RouteProp<SettingsNavigatorRouteList, "ProfessionalAccess">;
}

function ProfessionalAccess({
  navigation,
}: ProfessionalAccessProps): JSX.Element {
  const { reload } = useAuth();

  const [code, setCode] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [convertToProAccount, { loading }] = useConvertToProAccountMutation({
    onCompleted: data => {
      const { __typename } = data.convertToProAccount;
      switch (__typename) {
        case "ConvertToProAccountSuccess":
          reload(true);
          break;
        default:
          setDisabled(true);
          Alert.alert(
            i18n.t("alert.title", { scope }),
            i18n.t("alert.message", { scope }),
            [
              {
                text: i18n.t("alert.defaultButton", { scope }),
                style: "default",
              },
            ]
          );
          break;
      }
    },
  });

  const handleSubmit = useCallback(() => {
    if (!code.length) return;
    convertToProAccount({ variables: { code } });
  }, [code, convertToProAccount]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <HeaderButton
          disabled={disabled}
          loading={loading}
          onPress={handleSubmit}
          textStyle={styles.headerButtonTextStyle}
          text={i18n.t("signIn", { scope })}
        />
      ),
    });
  }, [disabled, handleSubmit, loading, navigation]);

  const onLinkPress = useCallback(() => attemptToOpenURL(NAVIGATOR_LINK), []);

  const onChangeText = useCallback((text: string) => {
    setCode(text);
    setDisabled(text.length === 0);
  }, []);

  const onPressClearInput = useCallback(() => {
    setCode("");
    setDisabled(true);
  }, []);

  return (
    <Background>
      <KeyboardAwareScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.scrollView}
        contentInsetAdjustmentBehavior="automatic"
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>{i18n.t("title", { scope })}</Text>

          <Text style={styles.subtitle}>
            {i18n.t("body1", { scope })}
            <Text style={styles.subtitleLink} onPress={onLinkPress}>
              {i18n.t("bodyLink1", { scope })}
            </Text>
            {i18n.t("body2", { scope })}
          </Text>

          <Text style={styles.subtitle}>
            {i18n.t("body3", { scope })}
            <Text style={styles.subtitleLink} onPress={onLinkPress}>
              {i18n.t("bodyLink2", { scope })}
            </Text>
            {i18n.t("body4", { scope })}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>
              {i18n.t("inputTitle", { scope })}
            </Text>
            <TextInputClearable
              value={code}
              onChangeText={onChangeText}
              onPressClearInput={onPressClearInput}
              onSubmitEditing={handleSubmit}
              containerStyle={styles.input}
              placeholder={i18n.t("inputPlaceholder", { scope })}
              returnKeyType={"done"}
              enablesReturnKeyAutomatically={true}
              autoCapitalize={"none"}
              spellCheck={false}
            />
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
}

export default ProfessionalAccess;
