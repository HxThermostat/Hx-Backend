import React from "react";
import {
  Platform,
  FlatList as RNFlatList,
  FlatListProps,
  StyleSheet,
} from "react-native";

import { Divider } from "react-native-elements";

import ListItem, { Item } from "./ListItem";
import commonStyles from "./styles";
import spacing from "~/styles/spacing";

export type Data = Item[];

const styles = StyleSheet.create({
  ...commonStyles,
  contentContainer: {
    ...commonStyles.contentContainer,
    ...spacing.pbthirtytwo,
  },
  listItem: {
    ...Platform.select({
      ios: {
        ...spacing.plfourteen,
      },
    }),
  },
  itemDivider: {
    ...commonStyles.itemDivider,
    ...spacing.mlfourteen,
  },
});

type OptionalRenderItem = Partial<Pick<FlatListProps<Item>, "renderItem">>;

type Props = Pick<
  FlatListProps<Item>,
  | "data"
  | "contentContainerStyle"
  | "onRefresh"
  | "refreshing"
  | "ListFooterComponent"
  | "ListFooterComponentStyle"
  | "ItemSeparatorComponent"
  | "ListHeaderComponent"
  | "alwaysBounceVertical"
  | "contentInsetAdjustmentBehavior"
  | "ListEmptyComponent"
> &
  OptionalRenderItem & {
    handleItemPress?: (item: Item) => void;
  };

const noop = (): void => undefined;

export default function FlatList({
  contentContainerStyle,
  contentInsetAdjustmentBehavior = "automatic",
  data,
  handleItemPress,
  ...rest
}: Props): JSX.Element {
  return (
    <RNFlatList
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}
      data={data}
      keyExtractor={(item, index) => item.title + index}
      renderItem={({ item }) => (
        <ListItem
          containerStyle={styles.listItem}
          item={item}
          handleItemPress={handleItemPress ? () => handleItemPress(item) : noop}
        />
      )}
      ItemSeparatorComponent={() =>
        Platform.select({
          android: null,
          default: <Divider style={[styles.divider, styles.itemDivider]} />,
        })
      }
      {...rest}
    />
  );
}
