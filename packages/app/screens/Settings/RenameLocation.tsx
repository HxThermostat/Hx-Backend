import React, { useState } from "react";

import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { useRenameLocationSettingsMutation, useNamesQuery } from "~/graph";
import i18n from "~/i18n";

import { DataHookProp, withQueryData, GoBack } from "~/screens/withQueryData";

import SingleInputScreen from "./SingleInputScreen";
import { KohortFunnelEventStep, useKohortTracking } from "~/utils/kohort";
import { Alert } from "react-native";

const scope = "Screens.Authenticated.SettingsNavigator.RenameLocation";

export type RenameLocationProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "RenameLocation"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "RenameLocation">;
  data: DataHookProp<typeof useNamesQuery>;
};

function RenameLocation({
  navigation,
  data: { location },
}: RenameLocationProps): JSX.Element {
  if (!location) throw new GoBack();
  const { trackFunnel } = useKohortTracking();

  const [name, setName] = useState(location.name);
  const [renameLocation] = useRenameLocationSettingsMutation({
    variables: { input: { id: location.id, name } },
    optimisticResponse: {
      renameLocation: {
        __typename: "RenameLocationSuccess",
        location: {
          ...location,
          name,
        },
      },
    },
  });

  return (
    <SingleInputScreen
      navigation={navigation}
      handleSave={() => {
        trackFunnel({ step: KohortFunnelEventStep.Action });
        
        if (name.length < 1) {
          Alert.alert(
            i18n.t("validation.title", { scope }),
            i18n.t("validation.message", { scope }),
            [
              {
                text: i18n.t("validation.button", { scope }),
                style: "default",
              },
            ]
          );

          return "cancel";
        }

        renameLocation();
      }}
      value={name}
      label={i18n.t("label", { scope })}
      onChangeText={value => setName(value)}
      maxLength={16}
    />
  );
}

export default withQueryData(useNamesQuery, {
  useVariables: () => {
    const route = useRoute<RenameLocationProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(RenameLocation);
