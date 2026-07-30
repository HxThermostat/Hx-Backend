import React, { useState, useCallback, useLayoutEffect } from "react";
import { View, StyleSheet, Share, Platform, Alert } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ProAppNavigatorRouteList } from "~/navigators/ProAppNavigator";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/EvilIcons";

import { captureException } from "@sentry/react-native";

import { UnreachableCaseError } from "ts-essentials";

import { useAuth } from "~/contexts";

import { ShareAccessLevel, useRequestShareMutation } from "~/graph";
import i18n from "~/i18n";

import Background from "~/components/Background";
import TextInput from "~/components/Inputs/TextInput";
import Picker, { PickerOption } from "~/components/Picker/Picker";
import Switch from "~/components/Switch";
import Text from "~/components/Text";
import HeaderButton from "~/components/Touchables/HeaderButton";
import LinkTouchable from "~/components/Touchables/LinkTouchable";
import StandardButton from "~/components/Touchables/StandardButton";
import Touchable from "~/components/Touchables/Touchable";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing, { size } from "~/styles/spacing";

import { VALID_EMAIL } from "~/utils/display";
import { ModalRouteList } from "~/navigators/ModalNavigator";

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
    ...spacing.pxtwentyfour,
  },
  container: {
    flex: 1,
  },
  headerButtonTextStyle: {
    color: colors.tint,
  },
  title: {
    ...fonts.largeTitle,
    ...spacing.mtfiftyfour,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    ...fonts.scaledSecondaryHeader,
    textTransform: "uppercase",
  },
  pickerValue: {
    ...fonts.listSublabel,
  },
  emailLabel: {
    ...spacing.mbsixteen,
  },
  subtitle: {
    ...fonts.textInputTextLabel,
    ...spacing.mttwelve,
    color: colors.offGray,
  },
  button: {
    alignSelf: "center",
  },
  shareRequestButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "flex-end",
    ...spacing.mytwentyfour,
  },
  shareRequestText: {
    ...fonts.signUpTextRegular,
  },
  section: {
    ...spacing.mbtwentyeight,
  },
});

const scope = "Screens.ProApp.ProAppNavigator.RequestAccess";

const ACCESS_TYPES: ShareAccessLevel[] = ["INSTALLER", "DIAGNOSTIC", "STATUS"];
const PICKER_OPTIONS: PickerOption[] = ACCESS_TYPES.map(
  (accessLevel: ShareAccessLevel) => {
    return {
      label: i18n.t(`accessLabel.${accessLevel}`, { scope }),
      itemLabel: i18n.t(`accessItemLabel.${accessLevel}`, { scope }),
      value: accessLevel,
    };
  }
);

const TEMPORARY_DURATION = 48;

export type RequestAccessProps = {
  navigation: NativeStackNavigationProp<ModalRouteList, "RequestAccess">;
  router: RouteProp<ModalRouteList, "RequestAccess">;
};

export default function RequestAccess({
  navigation,
}: RequestAccessProps): JSX.Element {
  const { email: installerEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [limitAccess, setLimitAccess] = useState(true);
  const [accessLevel, setAccessLevel] = useState(ACCESS_TYPES[0]);

  const handlePressMoreInfo = useCallback(() => {
    navigation.navigate("AccessTypes");
  }, [navigation]);

  const handleLimitAccessPress = useCallback(() => {
    setLimitAccess(l => !l);
  }, []);

  const onShareRequestPress = useCallback(() => {
    const url = `https://hx.yoursysteminfo.com/grantAccess/${installerEmail}/${accessLevel}/${
      limitAccess ? "1" : ""
    }`;

    Share.share(
      Platform.select({
        ios: {
          url,
        },
        default: {
          message: url,
        },
      })
    ).catch(error => {
      captureException(error);
    });
  }, [accessLevel, limitAccess, installerEmail]);

  const validEmail = VALID_EMAIL.test(email);

  const [requestShare, { loading }] = useRequestShareMutation({
    variables: {
      input: {
        email,
        accessLevel,
        duration: limitAccess ? TEMPORARY_DURATION * 3600 : null,
      },
    },
    onCompleted(data) {
      const { __typename } = data.requestShare;
      switch (__typename) {
        case "RequestShareSuccess":
          navigation.goBack();
          break;
        case "InvalidEmail":
          Alert.alert(
            i18n.t("invalidEmailError.title", { scope }),
            i18n.t("invalidEmailError.message", { scope })
          );
          break;
        default:
          throw new UnreachableCaseError(__typename);
      }
    },
  });

  const onRequestAccessPress = useCallback(() => {
    requestShare();
  }, [requestShare]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <HeaderButton
          disabled={!validEmail}
          loading={loading}
          onPress={onRequestAccessPress}
          textStyle={styles.headerButtonTextStyle}
          text={i18n.t("submit", { scope })}
        />
      ),
    });
  }, [loading, navigation, onRequestAccessPress, validEmail]);

  const { bottom } = useSafeAreaInsets();

  return (
    <Background>
      <KeyboardAwareScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={[styles.scrollView, { paddingBottom: bottom }]}
      >
        <View style={styles.section}>
          <Text style={styles.title}>{i18n.t("title", { scope })}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>
              {i18n.t("typeOfAccess", { scope })}
            </Text>
            <Picker
              value={accessLevel}
              options={PICKER_OPTIONS}
              onValueChange={value => setAccessLevel(value as ShareAccessLevel)}
              labelStyle={styles.pickerValue}
            />
          </View>
          <LinkTouchable
            onPress={handlePressMoreInfo}
            text={i18n.t("accessMoreInfo", { scope })}
            textStyle={styles.subtitle}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>
              {i18n.t("limit48hours", { scope })}
            </Text>
            <Switch
              onValueChange={handleLimitAccessPress}
              value={limitAccess}
            />
          </View>
          <Text style={styles.subtitle}>
            {i18n.t("revokeAccess", { scope })}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, styles.emailLabel]}>
            {i18n.t("emailLabel", { scope })}
          </Text>
          <TextInput
            placeholder={i18n.t("emailPlaceholder", { scope })}
            value={email}
            returnKeyType="done"
            onChangeText={v => setEmail(v.trim())}
            autoCapitalize={"none"}
            autoCompleteType={"email"}
            autoCorrect={false}
            keyboardType={"email-address"}
            textContentType={"emailAddress"}
          />
        </View>

        <View>
          <StandardButton
            style={styles.button}
            onPress={onRequestAccessPress}
            disabled={!validEmail}
            loading={loading}
          >
            <Text style={fonts.baseTouchableText}>
              {i18n.t("requestAccess", { scope })}
            </Text>
          </StandardButton>

          <Touchable
            style={styles.shareRequestButton}
            onPress={onShareRequestPress}
          >
            <Icon name="share-apple" size={size.twenty} color={colors.white} />
            <Text style={styles.shareRequestText}>
              {i18n.t("shareRequestLink", { scope })}
            </Text>
          </Touchable>
        </View>
      </KeyboardAwareScrollView>
    </Background>
  );
}
