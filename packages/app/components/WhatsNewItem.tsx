import React from "react";
import { View, StyleSheet } from "react-native";

import i18n from "~/i18n";

import ClockIcon from "~/components/Icons/ClockIcon";
import DeviceIcon from "~/components/Icons/DeviceIcon";
import FaceIcon from "~/components/Icons/FaceIcon";
import GearIcon from "~/components/Icons/GearIcon";
import HouseIcon from "~/components/Icons/HouseIcon";
import MechanicIcon from "~/components/Icons/MechanicIcon";
import ShieldIcon from "~/components/Icons/ShieldIcon";

import Text from "~/components/Text";

import fonts from "~/styles/fonts";
import colors from "~/styles/color";
import spacing from "~/styles/spacing";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    ...spacing.mbthirtytwo,
  },
  image: {
    width: 55,
    alignItems: "center",
  },
  detailsSection: { ...spacing.mlsixteen, flex: 1 },
  label: {
    ...fonts.whatsNewLabel,
    color: colors.white,
  },
  detail: {
    ...fonts.whatsNewDetail,
    color: colors.white,
  },
});

const scope = "Screens.Authenticated.WhatsNew";

type Item =
  | "easier"
  | "temperatureControl"
  | "schedules"
  | "settings"
  | "passwordless"
  | "setup"
  | "pro";

const Icons: Record<Item, typeof FaceIcon> = {
  easier: FaceIcon,
  temperatureControl: HouseIcon,
  schedules: ClockIcon,
  settings: GearIcon,
  passwordless: ShieldIcon,
  setup: DeviceIcon,
  pro: MechanicIcon,
};

const Stops = {
  green: [
    { offset: 0, color: "#01FCB9" },
    { offset: 1, color: "#01FF73" },
  ],
  yellow: [
    { offset: 0, color: "#FFF504" },
    { offset: 1, color: "#FFB801" },
  ],
  orange: [
    { offset: 0, color: "#FA8A00" },
    { offset: 1, color: "#FF3000" },
  ],
  purple: [
    { offset: 0, color: "#FF4881" },
    { offset: 0.354, color: "#D11AD2" },
    { offset: 1, color: "#B800FF" },
  ],
  blue: [
    { offset: 0, color: "#02D6FF" },
    { offset: 1, color: "#029BFF" },
  ],
  blueGreen: [
    { offset: 0, color: "#39A6E7" },
    { offset: 1, color: "#33B375" },
  ],
};

export type WhatsNewItemProps = {
  item: Item;
  color: keyof typeof Stops;
};

export default function WhatsNewItem({
  item,
  color,
}: WhatsNewItemProps): JSX.Element {
  const Icon = Icons[item];
  const stops = Stops[color];
  return (
    <View style={styles.row}>
      <View style={styles.image}>
        <Icon stops={stops} />
      </View>
      <View style={styles.detailsSection}>
        <Text style={styles.label}>{i18n.t(`${item}.label`, { scope })}</Text>
        <Text style={styles.detail}>
          {i18n.t(`${item}.description`, { scope })}
        </Text>
      </View>
    </View>
  );
}
