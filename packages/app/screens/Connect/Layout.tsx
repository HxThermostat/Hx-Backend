import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageRequireSource,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Background from "~/components/Background";
import ProgressDots from "~/components/ProgressDots";
import Text from "~/components/Text";
import LinkTouchable from "~/components/Touchables/LinkTouchable";
import StandardButton from "~/components/Touchables/StandardButton";

import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollFlex: {
    flexGrow: 1,
    ...spacing.pxsixteen,
  },
  heroImage: {
    justifyContent: "center",
  },
  topSection: {
    justifyContent: "space-evenly",
    flexGrow: 1,
  },
  bottomSection: {},
  buttonStyle: {
    alignItems: "center",
  },
  content: {
    justifyContent: "space-between",
    flex: 1,
  },
  image: {
    height: 157,
    width: 222,
    alignSelf: "center",
    justifyContent: "center",
    ...spacing.ptfifty,
  },
  titleText: {
    ...fonts.largeTitle,
    textAlign: "center",
    alignSelf: "center",
    marginTop: "auto",
    width: 230,
  },
  instructions: {
    ...fonts.signUpTextRegular,
    ...spacing.mttwentyeight,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: "auto",
    width: 230,
  },
  btn: {
    ...spacing.mtthirtytwo,
    ...spacing.mbtwenty,
  },
});

export type LayoutProps = {
  title: string;
  activeIndex: number;
  image?: ImageRequireSource;
  imageView?: JSX.Element;
  instructions?: string;
  content?: JSX.Element;
  buttonLabel?: string;
  buttonLoading?: boolean;
  onPress?: () => void;
  titleStyle?: StyleProp<TextStyle>;
  instructionStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  secondaryButtonLabel?: string;
  secondaryOnPress?: () => void;
  subContent?: JSX.Element;
  autoScroll?: boolean;
};

export default function Layout(props: LayoutProps): JSX.Element {
  const {
    image,
    imageView,
    title,
    instructions,
    content,
    activeIndex,
    buttonLabel,
    buttonLoading,
    onPress,
    titleStyle,
    instructionStyle,
    buttonStyle,
    secondaryButtonLabel,
    secondaryOnPress,
    subContent,
    autoScroll = true,
  } = props;

  const ref = useRef<KeyboardAwareScrollView>(null);

  return (
    <Background>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollFlex}
        alwaysBounceVertical={false}
        ref={ref}
        onContentSizeChange={() =>
          autoScroll ? ref.current?.scrollToEnd(true) : undefined
        }
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.topSection}>
            {image && (
              <View style={styles.heroImage}>
                <Image
                  source={image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            )}
            {imageView && <View style={styles.heroImage}>{imageView}</View>}
            <View>
              <Text style={[styles.titleText, titleStyle]}>{title}</Text>
              {content}
              {instructions ? (
                <Text style={[styles.instructions, instructionStyle]}>
                  {instructions}
                </Text>
              ) : (
                <React.Fragment />
              )}
              {subContent}
            </View>
          </View>
          <View style={styles.bottomSection}>
            {buttonLabel && (
              <View style={[styles.buttonStyle, buttonStyle]}>
                <StandardButton
                  loading={buttonLoading}
                  style={styles.btn}
                  onPress={onPress}
                  disabled={!onPress}
                >
                  <>
                    {buttonLabel && (
                      <Text style={fonts.baseTouchableText}>{buttonLabel}</Text>
                    )}
                  </>
                </StandardButton>
                <LinkTouchable
                  onPress={secondaryOnPress ?? (() => undefined)}
                  disabled={!secondaryOnPress}
                  text={secondaryButtonLabel ?? " "}
                  textStyle={{
                    opacity: +!!secondaryButtonLabel,
                    ...fonts.signUpTextLight,
                  }}
                />
              </View>
            )}
            <ProgressDots dots={7} activeIndex={activeIndex} />
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
}
