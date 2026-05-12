import React, { useMemo, useState } from "react";

import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import {
  useControllerNameQuery,
  useRenameControllerSettingsMutation,
} from "~/graph";

import i18n from "~/i18n";

import { PickerOption } from "~/components/Picker/Picker";

import { withQueryData, DataHookProp, GoBack } from "~/screens/withQueryData";

import NameSettingsScreen from "./NameSettingsScreen";
import { KohortFunnelEventStep, useKohortTracking } from "~/utils/kohort";
import { cleanseText } from "~/utils/text";

const scope = "Screens.Authenticated.SettingsNavigator.RenameRoom";

const ROOM_OPTIONS: PickerOption[] = [
  {
    label: i18n.t("picker.living", { scope }),
    value: i18n.t("picker.living", { scope }),
  },
  {
    label: i18n.t("picker.hallway", { scope }),
    value: i18n.t("picker.hallway", { scope }),
  },
  {
    label: i18n.t("picker.bedroom", { scope }),
    value: i18n.t("picker.bedroom", { scope }),
  },
  {
    label: i18n.t("picker.upstairs", { scope }),
    value: i18n.t("picker.upstairs", { scope }),
  },
  {
    label: i18n.t("picker.downstairs", { scope }),
    value: i18n.t("picker.downstairs", { scope }),
  },
  {
    label: i18n.t("picker.basement", { scope }),
    value: i18n.t("picker.basement", { scope }),
  },
];

export type RenameRoomProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "RenameRoom"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "RenameRoom">;
  data: DataHookProp<typeof useControllerNameQuery>;
};

function RenameRoom({
  navigation,
  data: { controller },
}: RenameRoomProps): JSX.Element {
  if (!controller) throw new GoBack();
  const { trackFunnel } = useKohortTracking();

  const [name, setName] = useState(controller.name);
  // We have to clean up the unicode "Smart Punctuation" characters
  const cleansedName = useMemo(() => cleanseText(name), [name]);
  const [renameController] = useRenameControllerSettingsMutation({
    variables: { input: { id: controller.id, name: cleansedName } },
    optimisticResponse: {
      renameController: {
        __typename: "RenameControllerSuccess",
        controller: {
          ...controller,
          name: cleansedName,
        },
      },
    },
  });

  return (
    <NameSettingsScreen
      navigation={navigation}
      value={name}
      label={i18n.t("label", { scope })}
      inputLabel={i18n.t("inputLabel", { scope })}
      inputPlaceholder={i18n.t("inputPlaceholder", { scope })}
      options={ROOM_OPTIONS}
      onValueChange={value => setName(value)}
      handleSave={() => {
        trackFunnel({ step: KohortFunnelEventStep.Action });
        renameController();
      }}
    />
  );
}

export default withQueryData(useControllerNameQuery, {
  useVariables: () => {
    const route = useRoute<RenameRoomProps["route"]>();

    return {
      controllerId: route.params.controllerId,
    };
  },
})(RenameRoom);
