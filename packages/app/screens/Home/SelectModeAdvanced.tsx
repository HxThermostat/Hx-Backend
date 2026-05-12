import React from "react";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ModalRouteList } from "~/navigators/ModalNavigator";

import Background from "~/components/Background";

import { DataHookProp, GoBack, withQueryData } from "../withQueryData";
import { Mode, useSelectModeQuery } from "~/graph";
import SelectModeFlatList from "./SelectModeFlatList";

const ADVANCED_MODES: Mode[] = ["MAXHEAT", "MAXCOOL", "EHEAT"];

export type SelectModeAdvancedProps = {
  navigation: NativeStackNavigationProp<ModalRouteList, "SelectModeAdvanced">;
  router: RouteProp<ModalRouteList, "SelectModeAdvanced">;
  data: DataHookProp<typeof useSelectModeQuery>;
};

function SelectModeAdvanced(props: SelectModeAdvancedProps): JSX.Element {
  const {
    data: { controller },
  } = props;

  if (!controller) throw new GoBack();

  return (
    <Background>
      <SelectModeFlatList modes={ADVANCED_MODES} controller={controller} />
    </Background>
  );
}

export default withQueryData(useSelectModeQuery, {
  options: {
    fetchPolicy: "cache-and-network",
  },
  useVariables: ({ controllerId }) => ({ controllerId }),
})(SelectModeAdvanced);
