import React, { useContext } from "react";
import {
  Platform,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  TextProps,
  SwitchProps,
} from "react-native";

import { ListItem as RNEListItem } from "react-native-elements";

import Switch from "~/components/Switch";
import TouchableItem from "~/components/Touchables/TouchableItem";

import colors from "~/styles/color";
import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";
import { NavigatorsContext } from "~/contexts";

export interface Item {
  title: string;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
  subtitleSelectable?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  rightContentContainerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  titleProps?: TextProps;
  rightTitleProps?: TextProps;
  chevron?: boolean;
  navigate?: {
    force?: boolean;
    name: string;
    params?: object;
  };
  disabled?: boolean;
  onPress?: () => void;
  button?: boolean;
  highlight?: boolean;
  destructive?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  switch?: SwitchProps;
  rightElement?: React.ReactElement;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    ...Platform.select({
      android: {
        paddingLeft: 16,
        paddingBottom: 20,
      },
      default: {
        ...spacing.pltwentyfour,
      },
    }),
    flex: 1,
    flexGrow: 1,
  },
  containerHighlight: {
    backgroundColor: colors.tint,
  },
  contentContainer: {
    flex: 0,
  },
  rightContentContainer: {
    flex: 1,
    flexGrow: 1,
  },
  titleLabel: {
    ...fonts.listLabel,
  },
  titleLabelTabletButton: {
    color: colors.tint,
  },
  titleLabelDisabled: {
    color: colors.dialInactive,
  },
  titleLabelDestructive: {
    color: colors.red,
  },
  subtitleLabel: {
    ...fonts.listSublabel,
    fontVariant: ["tabular-nums"],
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    padding: 14,
    alignItems: "center",
    ...Platform.select({
      android: {
        paddingLeft: 16,
        paddingBottom: 20,
      },
      default: {
        ...spacing.pltwentyfour,
      },
    }),
  },
});

interface ListItemInterface {
  item: Item;
  handleItemPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function ListItem({
  item,
  handleItemPress,
  containerStyle,
}: ListItemInterface): JSX.Element {
  const { isTablet } = useContext(NavigatorsContext);

  let rightElement = item.rightElement;
  if (!rightElement && item.switch) {
    rightElement = <Switch {...item.switch} />;
  }

  return (
    <RNEListItem
      disabled={item.disabled}
      containerStyle={[
        styles.container,
        containerStyle,
        item.highlight ? styles.containerHighlight : null,
      ]}
      contentContainerStyle={[
        styles.contentContainer,
        item.contentContainerStyle ? item.contentContainerStyle : null,
      ]}
      rightContentContainerStyle={[
        styles.rightContentContainer,
        item.rightContentContainerStyle
          ? item.rightContentContainerStyle
          : null,
      ]}
      title={item.title}
      titleStyle={[
        styles.titleLabel,
        item.button && isTablet ? styles.titleLabelTabletButton : null,
        item.titleStyle ? item.titleStyle : null,
        item.disabled ? styles.titleLabelDisabled : null,
        item.destructive ? styles.titleLabelDestructive : null,
      ]}
      {...Platform.select({
        android: {
          subtitle: item.subtitle ? item.subtitle : undefined,
          subtitleStyle: [styles.subtitleLabel, item.subtitleStyle],
          subtitleProps: { selectable: item.subtitleSelectable },
        },
        default: {
          rightTitle: item.subtitle ? item.subtitle : " ",
          rightTitleStyle: [styles.subtitleLabel, item.subtitleStyle],
        },
      })}
      chevron={Platform.select({
        ios: !isTablet &&
          item.chevron &&
          (item.navigate || item.onPress) &&
          !item.button &&
          !item.highlight && {
            name: "chevron-forward",
            color: colors.listChevron,
          },
      })}
      onPress={item.navigate || item.onPress ? handleItemPress : undefined}
      rightIcon={item.rightIcon}
      leftIcon={item.leftIcon}
      Component={TouchableItem}
      titleProps={{
        numberOfLines: 2,
        ...item.titleProps,
      }}
      rightTitleProps={{
        numberOfLines: 1,
        ellipsizeMode: "tail",
        ...item.rightTitleProps,
        selectable: item.subtitleSelectable,
      }}
      rightElement={rightElement}
    />
  );
}
