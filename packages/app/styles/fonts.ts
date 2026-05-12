import { Platform, TextStyle } from "react-native";

import { systemWeights, sanFranciscoSpacing } from "react-native-typography";

import colors from "~/styles/color";

const letterSpacing = (fontSize: number): number =>
  Platform.select({
    ios: sanFranciscoSpacing(fontSize),
    default: 0,
  });

// The recent addition of OpaqueColorValue to the ColorValue type has
// made these styles incompatible with some downsteam usage. We're not
// using this color representation today, so we can just pretend like
// we're working with the old TextStyle typings for now.
const fonts: Record<string, TextStyle & { color: string | undefined }> = {
  largeTitle: {
    ...systemWeights.regular,
    fontSize: 34,
    letterSpacing: letterSpacing(34),
    color: colors.white,
  },
  title: {
    ...systemWeights.light,
    fontSize: 20,
    letterSpacing: letterSpacing(320),
    lineHeight: 22,
    color: colors.white,
  },
  titleBold: {
    ...systemWeights.bold,
    fontSize: 20,
    letterSpacing: letterSpacing(20),
    lineHeight: 41,
    color: colors.white,
  },
  largeTemperatureLabel: {
    ...systemWeights.regular,
    fontSize: 90,
    lineHeight: 107,
    color: colors.white,
    letterSpacing: letterSpacing(90),
  },
  largeTemperatureDegreeText: {
    ...systemWeights.regular,
    fontSize: 50,
    color: colors.white,
    letterSpacing: letterSpacing(50),
  },
  primaryHeaderSemibold: {
    ...systemWeights.semibold,
    fontSize: 26,
    lineHeight: 41,
    color: colors.white,
    letterSpacing: letterSpacing(26),
  },
  systemNavBarLabel: {
    fontSize: 17,
    letterSpacing: letterSpacing(17),
    lineHeight: 22,
    color: colors.white,
  },
  listLabel: {
    ...systemWeights.regular,
    ...Platform.select({
      android: {
        fontSize: 18,
      },
      default: {
        fontSize: 17,
        letterSpacing: letterSpacing(17),
      },
    }),
    color: colors.white,
  },
  listSublabel: {
    color: colors.white,
    ...Platform.select({
      android: {
        ...systemWeights.regular,
        fontSize: 14,
        lineHeight: 20,
        opacity: 0.5,
      },
      default: {
        ...systemWeights.semibold,
        fontSize: 17,
        letterSpacing: letterSpacing(17),
      },
    }),
  },
  separatorLabel: {
    ...systemWeights.regular,
    ...Platform.select({
      android: {
        color: colors.tint,
        fontSize: 12,
      },
      default: {
        color: colors.white,
        fontSize: 11,
        letterSpacing: letterSpacing(11),
        lineHeight: 13,
      },
    }),
  },
  loginHintText: {
    ...systemWeights.light,
    color: colors.white,
    opacity: 0.5,
    textAlign: "center",
    fontSize: 13,
    letterSpacing: letterSpacing(13),
    lineHeight: 22,
  },
  textInputTextAndroid: {
    ...systemWeights.regular,
    color: colors.textInputColor,
    fontSize: 16,
    lineHeight: 18,
  },
  textInputTextLabel: {
    ...systemWeights.thin,
    color: colors.white,
    fontSize: 13,
    letterSpacing: letterSpacing(13),
    lineHeight: 22,
  },
  textInputTextLabelSemi: {
    ...systemWeights.semibold,
    color: colors.white,
    fontSize: 13,
    letterSpacing: letterSpacing(13),
    lineHeight: 22,
  },
  textFieldText: {
    ...systemWeights.regular,
    fontSize: 17,
    lineHeight: 20,
    color: colors.white,
    letterSpacing: letterSpacing(17),
  },
  secondaryInputIOS: {
    ...systemWeights.regular,
    fontSize: 17,
    letterSpacing: letterSpacing(18),
    lineHeight: 20,
    color: colors.white,
  },
  baseTouchableText: {
    ...systemWeights.semibold,
    textAlign: "center",
    color: colors.white,
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: letterSpacing(18),
  },
  signUpTextLight: {
    ...systemWeights.light,
    fontSize: 18,
    letterSpacing: letterSpacing(18),
    color: colors.white,
    lineHeight: 20,
  },
  signUpTextRegular: {
    ...systemWeights.regular,
    fontSize: 18,
    letterSpacing: letterSpacing(18),
    color: colors.white,
    lineHeight: 20,
  },
  headerRightButton: {
    ...systemWeights.regular,
    fontSize: 17,
    letterSpacing: letterSpacing(17),
    color: colors.tint,
    lineHeight: 20,
  },
  caption2semibold: {
    ...systemWeights.semibold,
    fontSize: 11,
    letterSpacing: letterSpacing(11),
    lineHeight: 13,
    color: colors.white,
  },
  caption2: {
    ...systemWeights.regular,
    fontSize: 11,
    letterSpacing: letterSpacing(11),
    lineHeight: 13,
    color: colors.white,
  },
  caption2L13: {
    ...systemWeights.light,
    fontSize: 13,
    letterSpacing: letterSpacing(13),
    lineHeight: 16,
    color: colors.white,
  },
  caption2R13: {
    ...systemWeights.regular,
    fontSize: 13,
    letterSpacing: letterSpacing(13),
    lineHeight: 16,
    color: colors.white,
  },
  caption2B13: {
    ...systemWeights.bold,
    fontSize: 13,
    letterSpacing: letterSpacing(13),
    lineHeight: 16,
    color: colors.white,
  },
  caption2R11: {
    ...systemWeights.light,
    fontSize: 11,
    letterSpacing: letterSpacing(11),
    lineHeight: 13,
    color: colors.white,
  },
  body: {
    ...systemWeights.regular,
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: letterSpacing(17),
    color: colors.white,
  },
  bodyL: {
    ...systemWeights.light,
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: letterSpacing(17),
    color: colors.white,
  },
  secondaryHeaderLight: {
    ...systemWeights.light,
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: letterSpacing(18),
    color: colors.white,
  },
  secondaryHeader: {
    ...systemWeights.regular,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: letterSpacing(18),
    color: colors.white,
  },
  secondaryHeaderSemibold: {
    ...systemWeights.semibold,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: letterSpacing(18),
    color: colors.white,
  },
  scaledSecondaryHeader: {
    ...systemWeights.regular,
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: letterSpacing(12),
    color: colors.white,
  },
  smallSecondaryHeader: {
    ...systemWeights.regular,
    fontSize: 10,
    lineHeight: 22,
    letterSpacing: letterSpacing(12),
  },
  buttonLabel: {
    ...systemWeights.semibold,
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: letterSpacing(14),
    color: colors.white,
  },
  footerNote: {
    ...systemWeights.thin,
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: letterSpacing(13),
    color: colors.white,
    textAlign: "center",
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
  },
  textButton: {
    ...systemWeights.bold,
    color: colors.white,
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: letterSpacing(13),
    textDecorationLine: "underline",
  },
  largeTimerLabel: {
    ...systemWeights.light,
    fontSize: 90,
    lineHeight: 107,
    color: colors.white,
    letterSpacing: letterSpacing(90),
  },
  humidityText: {
    ...systemWeights.light,
    color: colors.white,
    fontSize: 30,
    lineHeight: 41,
    letterSpacing: letterSpacing(30),
  },
  subheadL20: {
    ...systemWeights.light,
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: letterSpacing(20),
    color: colors.white,
  },
  whatsNewLabel: {
    ...systemWeights.semibold,
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: letterSpacing(17),
    color: colors.white,
  },
  whatsNewDetail: {
    ...systemWeights.light,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: letterSpacing(14),
    color: colors.white,
  },
  modalHeaderTitle: {
    ...systemWeights.semibold,
    ...Platform.select({
      android: {
        fontSize: 18,
      },
      default: {
        fontSize: 17,
        letterSpacing: letterSpacing(20),
      },
    }),
    color: colors.white,
  },
  tinyDegree: {
    ...systemWeights.regular,
    color: colors.white,
    fontSize: 7,
    lineHeight: 7,
  },
};

export default fonts;
