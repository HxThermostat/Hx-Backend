import React from "react";
import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableHighlightProps,
  TouchableWithoutFeedbackProps,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import ActivityIndicator from "../ActivityIndicator";

/**
 * Override Touchable to provide a single entry to easily adjust things like default font, color, accessibility options etc.
 */

const styles = StyleSheet.create({
  disabled: { opacity: 0.5 },
  loading: { opacity: 0 },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
  },
});

export interface TouchableProps
  extends TouchableOpacityProps,
    TouchableHighlightProps,
    TouchableWithoutFeedbackProps,
    TouchableNativeFeedbackProps {
  children: JSX.Element | JSX.Element[];
  contentContainerStyle?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const Touchable = (props: TouchableProps): JSX.Element => {
  const {
    children,
    contentContainerStyle,
    disabled: isDisabled,
    disabledStyle,
    loading,
    style,
    ...rest
  } = props;

  const disabled = isDisabled || loading;

  return (
    <TouchableOpacity
      hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
      activeOpacity={0.6}
      disabled={disabled}
      style={[...[disabled ? [styles.disabled, disabledStyle] : []], style]}
      {...rest}
    >
      {loading == null && contentContainerStyle == null ? (
        children
      ) : (
        <View style={[loading ? styles.loading : null, contentContainerStyle]}>
          {children}
        </View>
      )}
      {loading ? (
        <ActivityIndicator size={"small"} style={styles.loadingIndicator} />
      ) : null}
    </TouchableOpacity>
  );
};

export default Touchable;
