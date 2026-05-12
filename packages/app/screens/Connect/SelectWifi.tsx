import React from "react";

import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ConnectThermostatNavigatorRouteList } from "~/navigators/ConnectThermostatNavigator";

import i18n from "~/i18n";

import images from "~/assets/images";

import FlatList from "~/components/Lists/FlatList";
import ImageIcon from "~/components/ImageIcon";

import Layout from "./Layout";
import { Item } from "~/components/Lists/ListItem";

const scope = "Screens.Authenticated.ConnectThermostatNavigator.SelectWifi";

type SelectWifiScreenNavigationProp = NativeStackNavigationProp<
  ConnectThermostatNavigatorRouteList,
  "SelectWifi"
>;

export type SelectWifiProps = {
  navigation: SelectWifiScreenNavigationProp;
  route: RouteProp<ConnectThermostatNavigatorRouteList, "SelectWifi">;
};

export default function SelectWifi(props: SelectWifiProps): JSX.Element {
  const navigation = useNavigation();
  const { networks } = props.route.params;

  function handleItemPress(item: Item): void {
    item.navigate &&
      navigation.navigate(item.navigate.name, item.navigate.params);
  }
  return (
    <Layout
      title={i18n.t("title", { scope })}
      content={
        <FlatList
          handleItemPress={handleItemPress}
          data={networks.map(network => ({
            title: network.ssid,
            navigate: { name: "JoinWifi", params: { ssid: network.ssid } },
            rightIcon: <ImageIcon image={images.wifi} />,
          }))}
        />
      }
      autoScroll={false}
      activeIndex={3}
    />
  );
}
