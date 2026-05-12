import React from "react";
import { StyleSheet } from "react-native";

import Touchable from "~/components/Touchables/Touchable";
import Text from "~/components/Text";
import ImageIcon from "~/components/ImageIcon";

import images from "~/assets/images";
import spacing from "~/styles/spacing";
import colors from "~/styles/color";
import fonts from "~/styles/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...spacing.mbtwelve,
    ...spacing.pbsixteen,
    ...spacing.mlfifteen,
    ...spacing.prfifteen,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  text: {
    ...fonts.listLabel,
  },
});

interface WifiListItemProps {
  text: string;
  onPress: () => void;
}
const WifiListItem = (props: WifiListItemProps): JSX.Element => {
  const { text, onPress } = props;
  return (
    <Touchable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <ImageIcon image={images.wifi} />
    </Touchable>
  );
};

export default WifiListItem;
