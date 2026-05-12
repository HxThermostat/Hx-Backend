import React, { useLayoutEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { useController } from "~/contexts";

import HomeOwnerNavigator from "~/navigators/HomeOwnerNavigator";
import { ModalRouteList } from "~/navigators/ModalNavigator";

type CustomerViewProps = {
  navigation: NativeStackNavigationProp<ModalRouteList, "CustomerView">;
  route: RouteProp<ModalRouteList, "CustomerView">;
};

export default function CustomerView({
  route,
  navigation,
}: CustomerViewProps): JSX.Element {
  const { setLocationId } = useController();

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener(
      "transitionStart",
      ({ data: { closing } }) => {
        if (closing) return;
        setLocationId(route.params.locationId);
      }
    );
    return () => unsubscribe();
  }, [navigation, route.params.locationId, setLocationId]);

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      setLocationId(undefined);
    });
    return () => unsubscribe();
  }, [navigation, setLocationId]);

  return <HomeOwnerNavigator />;
}
