import React, { useContext } from "react";
import { View } from "react-native";
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";

const NestableContext = React.createContext<true | undefined>(undefined);

type NestableSafeAreaViewProps = NativeSafeAreaViewProps;

export default function NestableSafeAreaView({
  style,
  children,
  ...props
}: NestableSafeAreaViewProps): JSX.Element {
  const nested = useContext(NestableContext);

  if (nested === undefined) {
    return (
      <NestableContext.Provider value={true}>
        <SafeAreaView style={style} {...props}>
          {children}
        </SafeAreaView>
      </NestableContext.Provider>
    );
  } else {
    return <View style={style}>{children}</View>;
  }
}
