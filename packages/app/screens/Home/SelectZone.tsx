import React from "react";
import { SectionList, StyleSheet, View } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ModalRouteList } from "~/navigators/ModalNavigator";

import { useSelectZoneQuery } from "~/graph";

import { useController } from "~/contexts";

import Background from "~/components/Background";
import CheckableListItem from "~/components/Lists/CheckableListItem";
import SectionHeader from "~/components/Lists/SectionHeader";

import { withQueryData, DataHookProp } from "~/screens/withQueryData";

import colors from "~/styles/color";
import i18n from "~/i18n";
import spacing from "~/styles/spacing";
import { useKohortTracking, KohortFunnelEventStep } from "~/utils/kohort";

const scope = "Screens.Authenticated.HomeNavigator.SelectZone";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeaderContainer: {
    ...spacing.mttwentyfour,
  },
  helperText: {
    color: colors.red,
  },
});

type ZoneSection = {
  title?: string;
  helperText?: string;
  data: readonly ZoneItem[];
};

type ZoneItem = {
  id: string;
  title: string;
  selected: boolean;
};

export type SelectZoneProps = {
  navigation: NativeStackNavigationProp<ModalRouteList, "SelectZone">;
  router: RouteProp<ModalRouteList, "SelectZone">;
  data: DataHookProp<typeof useSelectZoneQuery>;
};

function SelectZone({
  navigation,
  data: { locations },
}: SelectZoneProps): JSX.Element {
  const { locationId, controllerId, setControllerId } = useController();
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { trackFeatureUse, trackFunnel } = useKohortTracking();

  const zoneSections: ZoneSection[] = locations
    .filter(location => {
      return !locationId || location.id === locationId;
    })
    .map(location => {
      let helperText: string | undefined;
      if (location.connectionStatus === "OFFLINE") {
        helperText = i18n.t("thermostatOffline", { scope });
      } else if (location.activeFault) {
        helperText = i18n.t("thermostatFault", { scope });
      }

      return {
        title: location.name,
        helperText,
        data: location.controllers.map(({ id, name }) => ({
          id: id,
          title: name,
          selected: id === controllerId,
        })),
      };
    });

  function handleRowSelect(item: ZoneItem): void {
    trackFeatureUse("Change Location", item.id);
    trackFunnel({ step: KohortFunnelEventStep.Action });

    setControllerId(item.id);

    navigation.goBack();
  }
  return (
    <Background>
      <SectionList
        style={styles.container}
        contentContainerStyle={{ paddingBottom }}
        sections={zoneSections}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <CheckableListItem
            onPress={() => handleRowSelect(item)}
            title={item.title}
            selected={item.selected}
          />
        )}
        renderSectionHeader={({ section: { title, helperText } }) => (
          <View style={styles.sectionHeaderContainer}>
            <SectionHeader
              title={title}
              helperText={helperText}
              helperTextStyle={styles.helperText}
            />
          </View>
        )}
        keyExtractor={({ id }) => id}
        ListEmptyComponent={<View />}
      />
    </Background>
  );
}

export default withQueryData(useSelectZoneQuery, {
  options: {
    fetchPolicy: "cache-and-network",
  },
})(SelectZone);
