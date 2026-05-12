import React from "react";

import { useNavigation } from "@react-navigation/native";

import HeaderButton from "~/components/Touchables/HeaderButton";

type CancelModalButtonProps = {};

const CancelModalButton = (props: CancelModalButtonProps): JSX.Element => {
  const navigation = useNavigation();
  return <HeaderButton onPress={() => navigation.goBack()} text={"Cancel"} />;
};

CancelModalButton.displayName = "CancelModalButton";

export default CancelModalButton;
