import React, { useMemo, useCallback } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import i18n from "~/i18n";

import { ProAppNavigatorRouteList } from "~/navigators/ProAppNavigator";

import Background from "~/components/Background";
import FlatList from "~/components/Lists/FlatList";
import { Item } from "~/components/Lists/ListItem";

import colors from "~/styles/color";
import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";
import { withQueryData, DataHookProp, GoBack } from "~/screens/withQueryData";
import { hasAccess, useAirflowConfigQuery } from "~/graph";
import LinkTouchable from "~/components/Touchables/LinkTouchable";
import { useAuth } from "~/contexts";

const scope = "Screens.ProApp.ProAppNavigator.ZoneAirflowConfig";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    ...spacing.mxtwentyfour,
    ...spacing.mbtwentyfour,
  },
  header: {
    ...fonts.largeTitle,
    ...spacing.mtfiftyfour,
  },
  subheader: {
    ...spacing.mttwentyfour,
  },
  subtitleStyle: {
    color: colors.offGray,
  },
});

export type ZoneAirflowConfigProps = {
  navigation: NativeStackNavigationProp<
    ProAppNavigatorRouteList,
    "ZoneAirflowConfig"
  >;
  route: RouteProp<ProAppNavigatorRouteList, "ZoneAirflowConfig">;
  data: DataHookProp<typeof useAirflowConfigQuery>;
};

function ZoneAirflowConfig({
  navigation,
  data,
}: ZoneAirflowConfigProps): JSX.Element {
  const location = data.location;

  if (!location || !location.airflow) throw new GoBack();
  const { controllers } = location;

  const { hasReadAirflowInstructions } = useAuth();

  const items = useMemo((): Item[] => {
    return controllers.map(controller => ({
      title: controller.name,
      subtitle: i18n.t("cfm", { scope, cfm: controller.airflow ?? "-" }),
      navigate: hasAccess(location.accessLevel, "INSTALLER")
        ? {
            name: "AirflowSettings",
            params: { controllerId: controller.id },
          }
        : undefined,
      chevron: true,
    }));
  }, [controllers, location.accessLevel]);

  const handleItemPress = useCallback(
    (item: Item): void => {
      if (item.navigate) {
        if (
          (item.navigate.name as keyof ProAppNavigatorRouteList) ===
            "AirflowSettings" &&
          !hasReadAirflowInstructions
        ) {
          Alert.alert(
            i18n.t("readInstructionsAlert.title", { scope }),
            i18n.t("readInstructionsAlert.message", { scope }),
            [
              {
                text: i18n.t("readInstructionsAlert.yes", { scope }),
                onPress: () =>
                  item.navigate &&
                  navigation.navigate(
                    item.navigate.name as keyof ProAppNavigatorRouteList,
                    item.navigate.params
                  ),
              },
              {
                text: i18n.t("readInstructionsAlert.readNow", { scope }),
                onPress: () => navigation.navigate("AirflowInstructions"),
              },
            ]
          );
          return;
        }
        navigation.navigate(
          item.navigate.name as keyof ProAppNavigatorRouteList,
          item.navigate.params
        );
      }
    },
    [hasReadAirflowInstructions, navigation]
  );

  function goToInstructions(): void {
    navigation.navigate("AirflowInstructions");
  }

  const { bottom: paddingBottom } = useSafeAreaInsets();

  return (
    <Background>
      <FlatList
        alwaysBounceVertical={false}
        contentContainerStyle={{ paddingBottom }}
        data={items}
        handleItemPress={handleItemPress}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{i18n.t("title", { scope })}</Text>
            <LinkTouchable
              textStyle={styles.subheader}
              text={i18n.t("readInstructions", { scope })}
              onPress={goToInstructions}
            />
            <Text style={styles.subheader}></Text>
          </View>
        )}
      />
    </Background>
  );
}

export default withQueryData(useAirflowConfigQuery, {
  options: {
    fetchPolicy: "cache-and-network",
  },
  useVariables() {
    const route = useRoute<ZoneAirflowConfigProps["route"]>();

    return { locationId: route.params.locationId };
  },
})(ZoneAirflowConfig);
