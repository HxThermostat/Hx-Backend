import { Platform, StyleSheet } from "react-native";
import colors from "~/styles/color";
import spacing from "~/styles/spacing";

export default StyleSheet.create({
  contentContainer: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
  },
  divider: {
    backgroundColor: colors.divider,
    height: StyleSheet.hairlineWidth,
    marginTop: -StyleSheet.hairlineWidth,
  },
  itemDivider: {
    ...spacing.mltwentyfour,
    zIndex: -1,
  },
  sectionFooter: {
    ...Platform.select({
      ios: spacing.pbthirtytwo,
      android: spacing.mttwenty,
    }),
  },
});
