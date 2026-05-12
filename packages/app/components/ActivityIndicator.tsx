import React from "react";
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps,
  Platform,
} from "react-native";
import { ActivityIndicator as PaperActivityIndicator } from "react-native-paper";
import colors from "~/styles/color";

const ActivityIndicator = (props: ActivityIndicatorProps): JSX.Element =>
  Platform.select({
    ios: <RNActivityIndicator {...props} />,
    default: <PaperActivityIndicator {...props} color={colors.tint} />,
  });

ActivityIndicator.displayName = "ActivityIndicator";
export default ActivityIndicator;
