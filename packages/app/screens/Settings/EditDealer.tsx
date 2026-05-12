import React, { useState } from "react";

import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import SingleInputScreen from "./SingleInputScreen";

import i18n from "~/i18n";
import { useChangeDealerMutation, useDealerQuery } from "~/graph";
import { TextInputProperties, Platform } from "react-native";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

type RenameScreenNavigationProp = NativeStackNavigationProp<
  SettingsNavigatorRouteList,
  "EditDealer"
>;

export type EditDealerProps = {
  navigation: RenameScreenNavigationProp;
  route: RouteProp<SettingsNavigatorRouteList, "EditDealer">;
  data: DataHookProp<typeof useDealerQuery>;
};

const scope = "Screens.Authenticated.SettingsNavigator.EditDealer";

function EditDealer({
  navigation,
  route: {
    params: { locationId, field },
  },
  data: { location },
}: EditDealerProps): JSX.Element {
  if (!location?.shares) throw new GoBack();

  const {
    dealer: { email, name, phone, website },
  } = location;

  const [value, setValue] = useState(location.dealer[field]);

  const [changeDealer] = useChangeDealerMutation({
    variables: {
      input: { id: locationId, email, name, phone, website, [field]: value },
    },
    optimisticResponse: {
      changeDealer: {
        __typename: "ChangeDealerSuccess",
        location: {
          ...location,
          dealer: {
            ...location.dealer,
            [field]: value,
          },
        },
      },
    },
  });

  let inputProps: TextInputProperties | undefined;
  switch (field) {
    case "email":
      inputProps = {
        keyboardType: "email-address",
        autoCompleteType: "email",
        textContentType: "emailAddress",
        autoCapitalize: "none",
        autoCorrect: false,
      };
      break;
    case "phone":
      inputProps = {
        keyboardType: "phone-pad",
        textContentType: "telephoneNumber",
      };
      break;
    case "website":
      inputProps = {
        keyboardType: Platform.select({ ios: "url", default: "default" }),
        textContentType: "URL",
        autoCorrect: false,
      };
      break;
    case "name":
      inputProps = {
        textContentType: "name",
      };
      break;
  }

  return (
    <SingleInputScreen
      navigation={navigation}
      value={value}
      label={i18n.t(field, { scope })}
      onChangeText={value => setValue(value)}
      handleSave={() => changeDealer()}
      {...inputProps}
    />
  );
}

export default withQueryData(useDealerQuery, {
  useVariables: () => {
    const route = useRoute<EditDealerProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(EditDealer);
