import React, { useCallback, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ConnectThermostatNavigatorRouteList } from "~/navigators/ConnectThermostatNavigator";

import { ProvisioningContext } from "~/contexts";

import i18n from "~/i18n";

import images from "~/assets/images";

import TextInput from "~/components/Inputs/TextInput";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

import { timeoutSignal } from "~/utils/provisioning/utils";

import Layout from "./Layout";

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 200,
    alignSelf: "center",
    ...spacing.mttwenty,
  },
  text: {
    ...fonts.signUpTextRegular,
    ...spacing.mbtwenty,
  },
  input: {
    flex: 1,
  },
});

const scope = "Screens.Authenticated.ConnectThermostatNavigator.SSID";

const isValidSsid = (ssid: string | null | undefined): boolean =>
  ssid ? /^[a-zA-Z0-9]{12}$/.test(ssid) : false;

export type SSIDProps = {
  navigation: NativeStackNavigationProp<
    ConnectThermostatNavigatorRouteList,
    "SSID"
  >;
  router: RouteProp<ConnectThermostatNavigatorRouteList, "SSID">;
};

export default function SSID(props: SSIDProps): JSX.Element {
  const { navigation } = props;

  const [ssid, setSsid] = useState<string>();

  const provision = useContext(ProvisioningContext);

  const validSsid = isValidSsid(ssid) ? `RIPL-${ssid}` : null;

  const onPressContinue = useCallback(() => {
    if (!validSsid) return;

    provision.connectToDevice(validSsid, timeoutSignal((2 * 60 + 15) * 1000));
    navigation.navigate("JoinNetwork", { ssid: validSsid });
  }, [navigation, provision, validSsid]);

  return (
    <Layout
      image={images.ssid}
      title={i18n.t("title", { scope })}
      instructions={i18n.t("instructions", { scope })}
      buttonLabel={i18n.t("Common.continue")}
      onPress={validSsid ? onPressContinue : undefined}
      activeIndex={1}
      subContent={
        <View style={styles.inputContainer}>
          <Text style={styles.text}>RIPL - </Text>
          <TextInput
            placeholder={i18n.t("placeholder", { scope })}
            style={styles.input}
            containerStyle={styles.input}
            value={ssid}
            onChangeText={setSsid}
            onSubmitEditing={onPressContinue}
            autoCapitalize={"none"}
            autoCorrect={false}
            autoCompleteType={"off"}
            returnKeyType={"done"}
            enablesReturnKeyAutomatically={true}
          />
        </View>
      }
    />
  );
}
