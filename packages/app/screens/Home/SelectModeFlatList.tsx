import React, { useCallback } from "react";
import {
  FlatList,
  FlatListProps,
  StyleSheet,
  TextStyle,
  View,
} from "react-native";

import CheckableListItem from "~/components/Lists/CheckableListItem";

import {
  hasAccess,
  Mode,
  useChangeModeMutation,
  Screen_SelectMode_ControllerFragment as ControllerType,
} from "~/graph";

import i18n from "~/i18n";
import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";
import { useKohortTracking, KohortFunnelEventStep } from "~/utils/kohort";

const scope = "Screens.Authenticated.HomeNavigator";

type ModeItem = {
  mode: Mode;
  supportedModes: Mode[];
  availableModes?: Mode[];
  title: string;
  description: string;
  textStyle: TextStyle;
};

const styles = StyleSheet.create({
  contentContainer: {
    ...spacing.pbsixtyfour,
  },
});

const ALL_MODES: Record<Mode, ModeItem> = {
  AUTO: {
    mode: "AUTO",
    supportedModes: ["AUTO"],
    title: i18n.t("Common.modes.AUTO"),
    description: i18n.t("SelectModeSimple.autoDescription", { scope }),
    textStyle: { color: colors.white, width: 60 },
  },
  HEAT: {
    mode: "HEAT",
    supportedModes: ["HEAT", "MAXHEAT", "EHEAT"],
    title: i18n.t("Common.modes.HEAT"),
    description: i18n.t("SelectModeSimple.heatDescription", { scope }),
    textStyle: { color: colors.heatRed, width: 60 },
  },
  COOL: {
    mode: "COOL",
    supportedModes: ["COOL", "MAXCOOL"],
    title: i18n.t("Common.modes.COOL"),
    description: i18n.t("SelectModeSimple.coolDescription", { scope }),
    textStyle: { color: colors.coolBlue, width: 60 },
  },
  OFF: {
    mode: "OFF",
    supportedModes: ["OFF"],
    title: i18n.t("Common.modes.OFF"),
    description: i18n.t("SelectModeSimple.offDescription", { scope }),
    textStyle: { color: colors.offGray, width: 60 },
  },
  MAXHEAT: {
    mode: "MAXHEAT",
    supportedModes: ["MAXHEAT"],
    availableModes: ["EHEAT", "MAXHEAT", "HEAT", "AUTO"],
    title: i18n.t("Common.modes.MAXHEAT"),
    description: i18n.t("SelectModeAdvanced.maxHeatDescription", { scope }),
    textStyle: {
      ...fonts.scaledSecondaryHeader,
      color: colors.heatRed,
      width: 80,
    },
  },
  MAXCOOL: {
    mode: "MAXCOOL",
    supportedModes: ["MAXCOOL"],
    availableModes: ["MAXCOOL", "COOL", "AUTO"],
    title: i18n.t("Common.modes.MAXCOOL"),
    description: i18n.t("SelectModeAdvanced.maxCoolDescription", { scope }),
    textStyle: {
      ...fonts.scaledSecondaryHeader,
      color: colors.coolBlue,
      width: 80,
    },
  },
  EHEAT: {
    mode: "EHEAT",
    title: i18n.t("SelectModeAdvanced.emergencyTitle", { scope }),
    description: i18n.t("SelectModeAdvanced.emergencyDescription", { scope }),
    supportedModes: ["EHEAT"],
    textStyle: {
      ...fonts.smallSecondaryHeader,
      color: colors.emergencyRed,
      width: 80,
    },
  },
};

interface SelectModeListProps extends Partial<FlatListProps<Mode>> {
  modes: Mode[];
  controller: ControllerType;
}

export default function SelectModeFlatList({
  modes,
  controller,
  ...rest
}: SelectModeListProps): JSX.Element {
  const [changeMode] = useChangeModeMutation();
  const { trackFeatureUse, trackFunnel } = useKohortTracking();

  const handleRowSelect = useCallback(
    (item: ModeItem): void => {
      if (!hasAccess(controller.accessLevel, "INSTALLER")) return;

      trackFeatureUse("Change Mode", item.mode);
      trackFunnel({ step: KohortFunnelEventStep.Action });

      changeMode({
        variables: {
          input: {
            id: controller.id,
            mode: item.mode,
          },
        },
        optimisticResponse: {
          changeMode: {
            __typename: "ChangeModeSuccess",
            controller: { ...controller, mode: item.mode, tempOverride: false },
          },
        },
      });
    },
    [changeMode, controller]
  );

  const possibleModes = modes.filter(mode => {
    return controller.modes.includes(mode);
  });

  return (
    <FlatList
      data={possibleModes}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item: mode }) => {
        const modeItem = ALL_MODES[mode];
        return (
          <CheckableListItem
            onPress={() => handleRowSelect(modeItem)}
            title={modeItem.title}
            disabled={
              (modeItem.availableModes &&
                controller.mode &&
                !modeItem.availableModes.includes(controller.mode)) ??
              undefined
            }
            selected={
              controller.mode != null &&
              modeItem.supportedModes.includes(controller.mode)
            }
            secondaryText={modeItem.description}
            textStyle={modeItem.textStyle}
          />
        );
      }}
      keyExtractor={item => item}
      ListEmptyComponent={<View />}
      {...rest}
    />
  );
}
