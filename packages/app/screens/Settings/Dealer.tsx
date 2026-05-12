import React from "react";
import { StyleSheet, Platform } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";
import { RouteProp, useRoute } from "@react-navigation/native";

import Background from "~/components/Background";
import FlatList, { Data } from "~/components/Lists/FlatList";
import { Item } from "~/components/Lists/ListItem";

import spacing from "~/styles/spacing";

import { hasAccess, useDealerQuery } from "~/graph";

import i18n from "~/i18n";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
  },
});

export type DealerProps = {
  navigation: NativeStackNavigationProp<SettingsNavigatorRouteList, "Dealer">;
  route: RouteProp<SettingsNavigatorRouteList, "Dealer">;
  data: DataHookProp<typeof useDealerQuery>;
};

const scope = "Screens.Authenticated.SettingsNavigator.Dealer";

function Dealer({
  route: {
    params: { locationId },
  },
  data: { location },
  navigation,
}: DealerProps): JSX.Element {
  if (!location) throw new GoBack();

  const DATA: Data = [
    {
      title: i18n.t("dealerAccess", { scope }),
      chevron: true,
      disabled: !hasAccess(location.accessLevel, "OWNER"),
      navigate: {
        name: "DealerAccess",
        params: { locationId },
      },
    },
    {
      title: i18n.t("name", { scope }),
      chevron: true,
      subtitle: location.dealer.name,
      rightTitleProps: { numberOfLines: 1 },
      navigate: {
        name: "EditDealer",
        params: {
          locationId: location.id,
          field: "name",
        },
      },
    },
    {
      title: i18n.t("phone", { scope }),
      chevron: true,
      subtitle: location.dealer.phone,
      navigate: {
        name: "EditDealer",
        params: {
          locationId: location.id,
          field: "phone",
        },
      },
    },
    {
      title: i18n.t("email", { scope }),
      chevron: true,
      subtitle: location.dealer.email,
      navigate: {
        name: "EditDealer",
        params: {
          locationId: location.id,
          field: "email",
        },
      },
    },
    {
      title: i18n.t("website", { scope }),
      chevron: true,
      subtitle: location.dealer.website,
      contentContainerStyle: { flex: 0 },
      rightContentContainerStyle: { flex: 1 },
      navigate: {
        name: "EditDealer",
        params: {
          locationId: location.id,
          field: "website",
        },
      },
    },
  ];

  function handleItemPress(item: Item): void {
    if (item.navigate) {
      navigation.navigate(item.navigate.name, item.navigate.params);
    }
  }

  return (
    <Background>
      <FlatList
        alwaysBounceVertical={false}
        contentContainerStyle={styles.container}
        handleItemPress={handleItemPress}
        data={DATA}
      />
    </Background>
  );
}

export default withQueryData(useDealerQuery, {
  useVariables: () => {
    const route = useRoute<DealerProps["route"]>();
    return { locationId: route.params.locationId };
  },
})(Dealer);
