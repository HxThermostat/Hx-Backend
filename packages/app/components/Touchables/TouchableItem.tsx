import React from "react";
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedbackProps,
  Platform,
} from "react-native";

interface TouchableItemProps extends TouchableWithoutFeedbackProps {
  children?: React.ReactNode;
}

function Highlight(props: TouchableItemProps): JSX.Element {
  return (
    <TouchableHighlight
      {...props}
      underlayColor={"#4A4A4A"}
      activeOpacity={1}
    />
  );
}

function TouchableItem(props: TouchableItemProps): JSX.Element {
  const { children, ...rest } = props;

  const TouchableComponent = Platform.select<React.ComponentType<{}>>({
    android: TouchableNativeFeedback,
    default: Highlight,
  });

  return <TouchableComponent {...rest}>{children}</TouchableComponent>;
}

export default TouchableItem;
