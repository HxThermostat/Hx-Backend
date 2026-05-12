import React, { useLayoutEffect, useState, useCallback } from "react";
import { StyleSheet, View, Platform, Alert } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";
import { ModalRouteList } from "~/navigators/ModalNavigator";

import {
  useShareLocationMutation,
  ShareAccessLevel,
  useGrantAccessQuery,
} from "~/graph";

import i18n from "~/i18n";

import Background from "~/components/Background";
import TextInputWithLabel from "~/components/Inputs/TextInputWithLabel";
import Picker, { PickerOption } from "~/components/Picker/Picker";
import Switch from "~/components/Switch";
import Text from "~/components/Text";
import HeaderButton from "~/components/Touchables/HeaderButton";
import LinkTouchable from "~/components/Touchables/LinkTouchable";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

import { isValidEmail } from "~/utils/display";

import { DataHookProp, withQueryData } from "../withQueryData";

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
    ...spacing.pbfortyeight,
  },
  label: {
    ...fonts.textInputTextLabelSemi,
    textTransform: "uppercase",
    ...spacing.mbtwenty,
  },
  rowSpaced: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    ...spacing.mteight,
  },
  link: {
    ...spacing.pteight,
    zIndex: 1,
    ...spacing.pbfive,
  },
  sectionText: {
    ...fonts.textInputTextLabelSemi,
    textTransform: "uppercase",
  },
  labelContainer: { flex: 1 },
  pickerContainer: {
    flex: 0,
  },
  picker: {
    ...fonts.secondaryHeader,
  },
  detailText: {
    ...fonts.caption2L13,
    opacity: 0.3,
  },
  rightPadding: { ...spacing.prtwentyfour },
  section: {
    ...spacing.mbfiftyfour,
  },
  underline: {
    textDecorationLine: "underline",
    textTransform: "capitalize",
  },
});

type SettingsRoute = RouteProp<SettingsNavigatorRouteList, "GrantAccess">;

type ModalRoute = RouteProp<ModalRouteList, "GrantAccess">;

export type GrantAccessProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList | ModalRouteList,
    "GrantAccess"
  >;
  route: SettingsRoute | ModalRoute;
  data: DataHookProp<typeof useGrantAccessQuery>;
};

const scope = "Screens.Authenticated.SettingsNavigator.GrantAccess";

const ACCESS_TYPES: ShareAccessLevel[] = ["INSTALLER", "DIAGNOSTIC", "STATUS"];
const pickerOptions: PickerOption[] = ACCESS_TYPES.map(access => ({
  label: i18n.t(`accessTypes.${access}`, { scope }),
  value: access,
}));

function isModalRoute(route: unknown): route is ModalRoute {
  return (route as ModalRoute)?.params?.accessLevel != null;
}

function isSettingsRoute(route: unknown): route is SettingsRoute {
  return (route as SettingsRoute)?.params?.locationId != null;
}

function isAccessLevel(accessLevel: unknown): accessLevel is ShareAccessLevel {
  return ACCESS_TYPES.includes(accessLevel as ShareAccessLevel);
}

function GrantAccess(props: GrantAccessProps): JSX.Element {
  const {
    data: { location, locations },
    navigation,
    route,
  } = props;

  const [limitAccess, setLimitAccess] = useState(
    isModalRoute(route) ? !!route.params.limit ?? false : true
  );
  const [accessLevel, setAccessLevel] = useState<ShareAccessLevel>(
    isModalRoute(route) && isAccessLevel(route.params.accessLevel)
      ? route.params.accessLevel
      : "INSTALLER"
  );
  const [locationId, setLocationId] = useState(location?.id ?? locations[0].id);
  const [email, setEmail] = useState(
    isModalRoute(route)
      ? route.params.email ?? ""
      : location?.dealer.email ?? locations[0].dealer?.email
  );

  const [shareLocationMutation, { loading }] = useShareLocationMutation({
    onCompleted: ({ shareLocation }) => {
      if (shareLocation.__typename === "ShareLocationSuccess") {
        navigation.goBack();
      } else if (shareLocation.__typename === "InvalidEmail") {
        Alert.alert(i18n.t("invalidEmail", { scope }));
      }
    },
  });

  const validEmail = isValidEmail(email) ? email : null;
  const shareLocation = useCallback(() => {
    if (!validEmail) {
      return;
    }

    let expiresAt: Date | undefined;
    if (limitAccess) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 2);
    }

    shareLocationMutation({
      variables: {
        input: {
          id: locationId,
          accessLevel,
          email: validEmail,
          expiresAt: expiresAt?.toISOString() ?? null,
        },
      },
    });
  }, [accessLevel, validEmail, limitAccess, locationId, shareLocationMutation]);

  const disabled = !isValidEmail(email) || !locationId;
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <HeaderButton
          disabled={disabled}
          loading={loading}
          onPress={shareLocation}
          text={i18n.t("send", { scope })}
        />
      ),
    });
  }, [disabled, loading, navigation, shareLocation]);

  const handlePressMoreInfo = useCallback(() => {
    navigation.navigate("AccessTypes");
  }, [navigation]);

  const locationOptions: PickerOption[] = locations.map(l => ({
    label: l.name,
    value: l.id,
  }));

  return (
    <Background>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior={"automatic"}
        alwaysBounceVertical={false}
      >
        <Text style={styles.title}>{i18n.t("title", { scope })}</Text>
        {isModalRoute(route) && locations.length > 1 && (
          <View style={styles.section}>
            <View style={styles.rowSpaced}>
              <View>
                <Text style={styles.sectionText}>
                  {i18n.t("location", { scope })}
                </Text>
                <Text style={styles.detailText}>{""}</Text>
              </View>
              <Picker
                value={locationId}
                options={locationOptions}
                onValueChange={value => setLocationId(value as string)}
                labelStyle={styles.picker}
              />
            </View>
          </View>
        )}
        <View style={styles.section}>
          <View style={styles.rowSpaced}>
            <View style={styles.labelContainer}>
              <Text style={styles.sectionText}>
                {i18n.t("typeOfAccess", { scope })}
              </Text>
              <View>
                <LinkTouchable
                  textStyle={styles.detailText}
                  text={i18n.t("accessMoreInfo", { scope })}
                  onPress={handlePressMoreInfo}
                  containerStyle={styles.link}
                />
              </View>
            </View>

            <Picker
              containerStyle={styles.pickerContainer}
              value={accessLevel}
              options={pickerOptions}
              onValueChange={value => setAccessLevel(value as ShareAccessLevel)}
              labelStyle={styles.picker}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.rowSpaced}>
            <Text style={styles.sectionText}>
              {i18n.t("limitAccess", { scope })}
            </Text>
            <Switch onValueChange={setLimitAccess} value={limitAccess} />
          </View>
          <Text style={styles.detailText}>
            {i18n.t("canRevokeAccess", { scope })}
          </Text>
        </View>
        <TextInputWithLabel
          labelStyle={styles.label}
          onChangeText={(value: string) => setEmail(value)}
          clearButtonMode={"always"}
          label={i18n.t("emailAddress", { scope })}
          value={email}
          keyboardType={"email-address"}
          autoCompleteType={"email"}
          textContentType={"emailAddress"}
          autoCapitalize={"none"}
        />
      </KeyboardAwareScrollView>
    </Background>
  );
}

export default withQueryData(useGrantAccessQuery, {
  useVariables() {
    const route = useRoute<GrantAccessProps["route"]>();

    return isSettingsRoute(route)
      ? {
          locationId: route.params.locationId,
          includeLocation: true,
        }
      : {
          locationId: "",
          includeLocation: false,
        };
  },
})(GrantAccess);
