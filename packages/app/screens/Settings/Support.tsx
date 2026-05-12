import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

import { openComposer } from "react-native-email-link";

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import i18n from "~/i18n";

import { attemptToOpenURL } from "~/utils/linking";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import Text from "~/components/Text";
import SectionList, { Sections } from "~/components/Lists/SectionList";

import { useSupportQuery } from "~/graph";

import { DataHookProp, withQueryData } from "~/screens/withQueryData";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

const styles = StyleSheet.create({
  container: {},
  footer: {
    ...spacing.pxtwentyfour,
    ...fonts.bodyL,
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.Support";

export type SupportProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList, "Support">;
  route: RouteProp<SettingsNavigatorRouteList, "Support">;
  data: DataHookProp<typeof useSupportQuery>;
};

function Support({ data: { locations } }: SupportProps): JSX.Element {
  const navigation = useNavigation();

  function handleItemPress(item: Item): void {
    if (item.navigate) {
      navigation.navigate(item.navigate.name, item.navigate.params);
    }
    if (item.onPress) {
      item.onPress();
    }
  }

  const sections: Sections = useMemo(() => {
    const manufacturerItems: Item[] = [
      {
        title: i18n.t("email", { scope }),
        chevron: false,
        subtitle: "cg-upgconsumerrelations@jci.com",
        subtitleSelectable: true,
        onPress: () => openComposer({ to: "cg-upgconsumerrelations@jci.com" }),
      },
      {
        title: i18n.t("phone", { scope }),
        chevron: false,
        subtitle: "877-874-7378",
        subtitleSelectable: true,
        onPress: () => attemptToOpenURL("tel:877-874-7378"),
      },
      {
        title: i18n.t("userManual", { scope }),
        chevron: true,
        onPress: () =>
          attemptToOpenURL(
            "https://files.hvacnavigator.com/p/5407935-uum-e-1020.pdf"
          ),
      },
    ];

    const dealerItems: Item[] = locations
      .filter(location => location.dealer.name)
      .map(location => ({
        title: location.name,
        chevron: true,
        subtitle: location.dealer.name,
        navigate: {
          name: "Dealer",
          params: {
            locationId: location.id,
          },
        },
      }));

    return [
      {
        title: i18n.t("manufacturerSupport", { scope }),
        data: manufacturerItems,
      },
      ...(dealerItems.length
        ? [
            {
              title: i18n.t("dealerSupport", { scope }),
              data: dealerItems,
            },
          ]
        : []),
    ];
  }, []);

  return (
    <Background>
      <SectionList
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        sections={sections}
        handleItemPress={handleItemPress}
        ListFooterComponent={
          <Text style={styles.footer}>{i18n.t("footer", { scope })}</Text>
        }
      />
    </Background>
  );
}

export default withQueryData(useSupportQuery)(Support);
