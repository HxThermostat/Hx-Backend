import { DefaultTheme } from "react-native-paper";
import { DarkTheme, Theme } from "@react-navigation/native";
import colors from "~/styles/color";

// react native paper themeing
export const AndroidTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.tint,
    placeholder: colors.placeholderText,
    text: colors.white,
  },
};

export const AppTheme: Theme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: colors.tint,
    background: colors.black,
    text: colors.white,
    card: colors.black,
    border: colors.black,
  },
};
