import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import FlatList from "~/components/Lists/FlatList";

import { useAuth } from "~/contexts";

import i18n from "~/i18n";

const styles = StyleSheet.create({
  container: {},
});

const scope = "Screens.Authenticated.SettingsNavigator.ManageAccount";

export type ManageAccountProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "ManageAccount"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "ManageAccount">;
};

export default function ManageAccount(props: ManageAccountProps): JSX.Element {
  const navigation = useNavigation();

  function handleItemPress(item: Item): void {
    if (item.navigate) {
      navigation.navigate(item.navigate.name, item.navigate.params);
    }
    if (item.onPress) {
      item.onPress();
    }
  }

  const { isPro, email, removeAccount, signOut } = useAuth();

  const sections: Item[] = useMemo(() => {
    const mainSection: Item[] = [];

    mainSection.push({
      title: i18n.t("email", { scope }),
      subtitle: email,
      subtitleSelectable: true,
    });

    if (!isPro) {
      mainSection.push({
        title: i18n.t("shareAccount", { scope }),
        navigate: {
          name: "ShareAccount",
        },
        chevron: true,
      });
    }

    mainSection.push({
      title: i18n.t("logout", { scope }),
      chevron: false,
      button: true,
      onPress: () => signOut(true, "manage-account-logout"),
    });

    mainSection.push({
      title: i18n.t("removeAccount", { scope }),
      chevron: false,
      button: true,
      destructive: true,
      onPress: () => removeAccount(true),
    });

    return mainSection;
  }, []);

  return (
    <Background>
      <FlatList
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        data={sections}
        handleItemPress={handleItemPress}
      />
    </Background>
  );
}
