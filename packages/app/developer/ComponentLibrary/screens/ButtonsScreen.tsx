import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import Icon from "react-native-vector-icons/EvilIcons";

import { ComponentLibraryNavigatorRouteList } from "../ComponentLibraryNavigator";

import Text from "~/components/Text";
import Background from "~/components/Background";
import StepperButton from "~/components/Touchables/StepperButton";
import SmallSquareButton from "~/components/Touchables/SmallSquareButton";
import FanIcon from "~/components/Icons/FanIcon";
import DismissModalButton from "~/components/Touchables/DismissModalButton";
import StandardButton from "~/components/Touchables/StandardButton";
import HeaderButton from "~/components/Touchables/HeaderButton";

import images from "~/assets/images";
import colors from "~/styles/color";
import spacing, { size } from "~/styles/spacing";
import fonts from "~/styles/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...spacing.pxfiftyfour,
  },
  scrollFlex: {
    flex: 1,
  },
  titleText: {
    ...fonts.largeTitle,
    textAlign: "center",
    ...spacing.mbfortytwo,
    ...spacing.mtfortyeight,
  },
  row: {
    flexDirection: "row",
    ...spacing.mttwenty,
  },
  text: { ...fonts.body, color: colors.white },
  chevron: { ...spacing.mttwo, ...spacing.mltwo },
  fanIcon: {
    ...spacing.mreight,
  },
});

const EXTRA_KEYBOARD_OFFSET_HEIGHT = 25;

type ButtonsScreenNavigationProp = NativeStackNavigationProp<
  ComponentLibraryNavigatorRouteList,
  "ButtonsScreen"
>;

export type ButtonsNavigationProps = {
  navigation: ButtonsScreenNavigationProp;
};

export default function ButtonsScreen(): JSX.Element {
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={styles.scrollFlex}
          extraScrollHeight={EXTRA_KEYBOARD_OFFSET_HEIGHT}
        >
          <Text style={styles.titleText}>Buttons</Text>

          <View style={styles.row}>
            <StepperButton image={images.increase} />
            <StepperButton image={images.decrease} />
          </View>
          <View style={styles.row}>
            <SmallSquareButton>
              <Text style={[styles.text]}>Auto</Text>
              <Icon
                name="chevron-down"
                style={styles.chevron}
                size={size.twenty}
                color={colors.white}
              />
            </SmallSquareButton>
            <SmallSquareButton>
              <FanIcon style={styles.fanIcon} showArrows={true} />
              <Text style={[styles.text]}>Fan</Text>
            </SmallSquareButton>
          </View>
          <View style={styles.row}>
            <DismissModalButton />
          </View>
          <View style={styles.row}>
            <StandardButton>
              <Text style={fonts.baseTouchableText}>{"Standard button"}</Text>
            </StandardButton>
          </View>
          <View style={styles.row}>
            <HeaderButton
              text="Header Button"
              onPress={() => {
                //noop
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Background>
  );
}
