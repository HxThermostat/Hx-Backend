import React from "react";
import { StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderButton from "~/components/Touchables/HeaderButton";

import images from "~/assets/images";

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
  },
});

// this should be used for the headerRight options in react-navigation

export default function DismissModalButton(): JSX.Element {
  const navigation = useNavigation();

  return (
    <HeaderButton onPress={() => navigation.goBack()}>
      <Image style={styles.image} source={images.clear} />
    </HeaderButton>
  );
}
