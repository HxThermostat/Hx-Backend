import React from "react";
import {
  StyleSheet,
  Image,
  ImageStyle,
  StyleProp,
  ImageRequireSource,
} from "react-native";
import { size } from "~/styles/spacing";

// This is a component for using icons that are already statically required and referenced from images/index.

const styles = StyleSheet.create({
  // default icon style that can be overridden by props
  image: {
    height: size.sixteen,
    width: size.sixteen,
  },
});

interface ImageIconProps {
  image: ImageRequireSource;
  style?: StyleProp<ImageStyle>;
}

const ImageIcon = (props: ImageIconProps): JSX.Element => {
  const { image, style, ...rest } = props;
  return (
    <Image
      resizeMode="contain"
      source={image}
      {...rest}
      style={[styles.image, style]}
    />
  );
};

export default ImageIcon;
