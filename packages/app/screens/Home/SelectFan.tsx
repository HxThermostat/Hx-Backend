import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp } from "@react-navigation/native";

import { systemWeights } from "react-native-typography";

import Slider from "@react-native-community/slider";

import { ModalRouteList } from "~/navigators/ModalNavigator";

import {
  useChangeFanModeMutation,
  FanMode,
  useChangeFanCfmMutation,
  useSelectFanQuery,
  Screen_ChangeFanMode_ControllerFragmentDoc as ChangeFanModeFragment,
  hasAccess,
} from "~/graph";

import i18n from "~/i18n";

import Background from "~/components/Background";
import CheckableListItem from "~/components/Lists/CheckableListItem";
import Text from "~/components/Text";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";
import colors from "~/styles/color";

import { withQueryData, DataHookProp, GoBack } from "~/screens/withQueryData";

import { useKohortTracking, KohortFunnelEventStep } from "~/utils/kohort";

const styles = StyleSheet.create({
  airflowContainer: {
    ...spacing.pxfifteen,
    marginTop: 95,
  },
  airflowKeyValueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...spacing.mbtwenty,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  key: { ...fonts.body, color: colors.white },
  value: { ...fonts.secondaryHeader, ...systemWeights.semibold },
  slider: {
    width: "80%",
  },
  sliderText: {
    ...fonts.caption2,
    color: colors.modalHeaderDivider,
    fontVariant: ["tabular-nums"],
  },
});

const scope = "Screens.Authenticated.HomeNavigator.SelectFan";

const FAN_MODES: Record<FanMode, string> = {
  AUTO: i18n.t("fanModes.AUTO", { scope }),
  ALWAYS: i18n.t("fanModes.ALWAYS", { scope }),
  FIFTEEN: i18n.t("fanModes.FIFTEEN", { scope }),
  THIRTY: i18n.t("fanModes.THIRTY", { scope }),
  FORTYFIVE: i18n.t("fanModes.FORTYFIVE", { scope }),
};
const SORTED_MODES = Object.keys(FAN_MODES) as FanMode[];

export type SelectFanProps = {
  navigation: NativeStackNavigationProp<ModalRouteList, "SelectFan">;
  router: RouteProp<ModalRouteList, "SelectFan">;
  data: DataHookProp<typeof useSelectFanQuery>;
};

function SelectFan({ data: { controller } }: SelectFanProps): JSX.Element {
  if (!controller) throw new GoBack();

  const [changeFanMode] = useChangeFanModeMutation();
  const { trackFeatureUse, trackFunnel } = useKohortTracking();

  const handleRowSelect = useCallback(
    (mode: FanMode) => {
      trackFeatureUse("Change Fan Mode", mode);
      trackFunnel({ step: KohortFunnelEventStep.Action });
      changeFanMode({
        variables: {
          input: {
            id: controller.id,
            mode,
          },
        },
        optimisticResponse:
          controller.fan && controller.activeScheduleEvent
            ? {
                changeFanMode: {
                  __typename: "ChangeFanModeSuccess",
                  controller: {
                    ...controller,
                    fan: {
                      ...controller.fan,
                      mode,
                      override:
                        controller.fan.override ||
                        controller.activeScheduleEvent.fanMode != mode,
                    },
                  },
                },
              }
            : undefined,
      });
    },
    [controller, changeFanMode]
  );

  const [sliderValue, setSliderValue] = useState(controller.fan?.cfm ?? 0);

  const [changeFanCfm] = useChangeFanCfmMutation({
    optimisticResponse: {
      changeFanCfm: {
        __typename: "ChangeFanCfmSuccess",
        location: {
          ...controller.location,
          controllers: [],
          controller: {
            ...controller,
            fan: controller.fan && {
              ...controller.fan,
              cfm: sliderValue,
            },
          },
        },
      },
    },
    // I wish I knew a way to configure this globally. Essentially
    // what we're doing here is telling the cache about the Controller
    // objects that are returned inside the Location field
    update: (store, { data }) => {
      if (data?.changeFanCfm.__typename === "ChangeFanCfmSuccess") {
        data.changeFanCfm.location.controllers.map(controller => {
          store.writeFragment({
            id: controller.id,
            fragment: ChangeFanModeFragment,
            fragmentName: "Screen_ChangeFanMode_Controller",
            data: controller,
          });
        });
      }
    },
  });

  const handleSlideComplete = useCallback(
    (cfm: number) => {
      changeFanCfm({
        variables: { input: { id: controller.location.id, cfm } },
      });
    },
    [controller.location.id, changeFanCfm]
  );

  const modes = SORTED_MODES.filter(mode =>
    controller.fan?.modes.includes(mode)
  );

  return (
    <Background>
      <View>
        <FlatList
          data={modes}
          renderItem={({ item }) => (
            <CheckableListItem
              onPress={() => handleRowSelect(item)}
              title={FAN_MODES[item]}
              selected={item === controller.fan?.mode}
              disabled={!hasAccess(controller.accessLevel, "INSTALLER")}
            />
          )}
          keyExtractor={item => item}
          ListEmptyComponent={<View />}
          extraData={controller.fan?.mode}
        />
        {controller.fan?.cfm !== null && controller.fan?.mode !== "AUTO" && (
          <View style={styles.airflowContainer}>
            <View style={styles.airflowKeyValueRow}>
              <Text style={styles.key}>{i18n.t("airflow", { scope })}</Text>
              <Text style={styles.value}>{Math.round(sliderValue * 100)}%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.sliderText}>0%</Text>
              <Slider
                style={styles.slider}
                value={controller.fan?.cfm}
                onValueChange={value => setSliderValue(value)}
                onSlidingComplete={handleSlideComplete}
                step={0.01}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={colors.tint}
                disabled={!hasAccess(controller.accessLevel, "INSTALLER")}
              />
              <Text style={styles.sliderText}>100%</Text>
            </View>
          </View>
        )}
      </View>
    </Background>
  );
}

export default withQueryData(useSelectFanQuery, {
  options: {
    fetchPolicy: "cache-and-network",
  },
  useVariables: ({ controllerId }) => ({ controllerId }),
})(SelectFan);
