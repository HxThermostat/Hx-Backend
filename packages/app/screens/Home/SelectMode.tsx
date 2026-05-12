import React from "react";
import { View, StyleSheet } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp } from "@react-navigation/native";

import Icon from "react-native-vector-icons/EvilIcons";

import {
  useSelectModeQuery,
  useChangeAwayMutation,
  useChangeLocationAwayMutation,
  Mode,
} from "~/graph";

import i18n from "~/i18n";

import Background from "~/components/Background";
import Text from "~/components/Text";
import Touchable from "~/components/Touchables/Touchable";
import ToggleableSwitchRow from "~/components/ToggleableSwitchRow";
import SelectModeFlatList from "./SelectModeFlatList";

import spacing, { size } from "~/styles/spacing";
import colors from "~/styles/color";
import fonts from "~/styles/fonts";

import { ModalRouteList } from "~/navigators/ModalNavigator";
import { withQueryData, DataHookProp, GoBack } from "~/screens/withQueryData";
import SectionHeader from "~/components/Lists/SectionHeader";
import { useKohortTracking, KohortFunnelEventStep } from "~/utils/kohort";

const styles = StyleSheet.create({
  advancedModeContainer: {
    borderTopColor: colors.modalHeaderDivider,
    borderTopWidth: StyleSheet.hairlineWidth,
    ...spacing.ptsixteen,
    ...spacing.mrtwelve,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  advancedModeText: {
    ...fonts.caption2,
  },
  chevron: {
    ...spacing.mttwo,
  },
  switchContainer: {
    ...spacing.mtthirty,
  },
});

const scope = "Screens.Authenticated.HomeNavigator.SelectModeSimple";

const MODES: Mode[] = ["AUTO", "HEAT", "COOL", "OFF"];

export type SelectModeProps = {
  navigation: NativeStackNavigationProp<ModalRouteList, "SelectModeSimple">;
  router: RouteProp<ModalRouteList, "SelectModeSimple">;
  data: DataHookProp<typeof useSelectModeQuery>;
};

function SelectMode(props: SelectModeProps): JSX.Element {
  const {
    navigation,
    data: { controller },
  } = props;

  if (!controller) throw new GoBack();
  const { location } = controller;

  const { trackFeatureUse, trackFunnel } = useKohortTracking();
  const [changeAway] = useChangeAwayMutation();
  const awayFromZone = Boolean(controller.away?.active);
  const onAwayZoneChange = (active: boolean): void => {
    trackFeatureUse("Change Away", "zone");
    trackFunnel({ step: KohortFunnelEventStep.Action });
    changeAway({
      variables: {
        input: {
          id: controller.id,
          active,
        },
      },
      optimisticResponse: {
        changeAway: {
          __typename: "ChangeAwaySuccess",
          controller: {
            ...controller,
            away: {
              __typename: "Away",
              active,
            },
            setpoints: active
              ? controller.away?.setpoints
                ? {
                    ...controller.away.setpoints,
                  }
                : null
              : controller.setpoints,
          },
        },
      },
    });
  };

  const [changeLocationAway] = useChangeLocationAwayMutation();
  const awayFromHome = location.override === "AWAY";
  const onAwayHomeChange = (active: boolean): void => {
    trackFeatureUse("Change Away", "location");
    trackFunnel({ step: KohortFunnelEventStep.Action });
    changeLocationAway({
      variables: {
        input: {
          id: location.id,
          active,
        },
      },
      optimisticResponse: {
        changeLocationAway: {
          __typename: "ChangeLocationAwaySuccess",
          location: {
            ...location,
            override: active ? "AWAY" : null,
            controllers: location.controllers.map(locationController => ({
              ...locationController,
              away: locationController.away
                ? {
                    ...locationController.away,
                    active,
                  }
                : null,
              setpoints: active
                ? locationController.away?.setpoints
                  ? {
                      ...locationController.away.setpoints,
                    }
                  : null
                : locationController.setpoints,
            })),
          },
        },
      },
    });
  };

  function goToSelectModeAdvanced(): void {
    trackFeatureUse("Advanced Modes");
    navigation.navigate("SelectModeAdvanced");
  }

  const hasMultipleZones = location.controllers.length > 1;
  return (
    <Background>
      <SelectModeFlatList
        modes={MODES}
        controller={controller}
        ListFooterComponent={
          <View>
            <View style={styles.switchContainer}>
              <>
                <SectionHeader title={i18n.t("away", { scope })} />
                {hasMultipleZones && (
                  <ToggleableSwitchRow
                    disabled={awayFromHome}
                    title={i18n.t("zone", { scope })}
                    description={i18n.t("awayFromZone", {
                      scope,
                      zone: controller.name,
                    })}
                    selected={awayFromZone}
                    onValueChange={onAwayZoneChange}
                  />
                )}
                <ToggleableSwitchRow
                  onValueChange={onAwayHomeChange}
                  title={
                    hasMultipleZones
                      ? i18n.t("home", { scope })
                      : i18n.t("away", { scope })
                  }
                  description={i18n.t("awayFromHome", {
                    scope,
                  })}
                  selected={awayFromHome}
                />
              </>
            </View>
            <Touchable
              onPress={goToSelectModeAdvanced}
              style={styles.advancedModeContainer}
            >
              <Text style={styles.advancedModeText}>
                {i18n.t("linkTo", { scope })}
              </Text>
              <Icon
                name="chevron-right"
                style={styles.chevron}
                size={size.twentyfour}
                color={colors.white}
              />
            </Touchable>
          </View>
        }
      />
    </Background>
  );
}

export default withQueryData(useSelectModeQuery, {
  options: {
    fetchPolicy: "cache-and-network",
  },
  useVariables: ({ controllerId }) => ({ controllerId }),
})(SelectMode);
