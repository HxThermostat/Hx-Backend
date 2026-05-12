import React from "react";
import {
  Platform,
  SectionList as RNSectionList,
  SectionListProps,
  StyleSheet,
  View,
} from "react-native";

import { Divider } from "react-native-elements";

import ListItem, { Item } from "./ListItem";
import SectionHeader from "./SectionHeader";

import fonts from "~/styles/fonts";
import commonStyles from "./styles";

export type Sections = {
  title?: string;
  data: Item[];
}[];

const styles = StyleSheet.create({
  ...commonStyles,
  sectionLabel: {
    ...fonts.separatorLabel,
    marginLeft: 14,
    marginBottom: 9,
  },
});

type Props = Pick<
  SectionListProps<Item>,
  | "sections"
  | "contentContainerStyle"
  | "contentInsetAdjustmentBehavior"
  | "onRefresh"
  | "refreshing"
  | "ListFooterComponent"
  | "ItemSeparatorComponent"
  | "ListHeaderComponent"
  | "alwaysBounceVertical"
  | "ListEmptyComponent"
> & {
  handleItemPress?: (item: Item) => void;
};

const noop = (): void => undefined;

export default function SectionList({
  contentContainerStyle,
  contentInsetAdjustmentBehavior = "automatic",
  sections,
  handleItemPress,
  ...rest
}: Props): JSX.Element {
  return (
    <RNSectionList
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}
      sections={sections}
      keyExtractor={(item, index) => item.title + index}
      renderItem={({ item }) => (
        <ListItem
          handleItemPress={handleItemPress ? () => handleItemPress(item) : noop}
          item={item}
        />
      )}
      renderSectionHeader={({ section: { title } }) => {
        return title ? <SectionHeader title={title} /> : null;
      }}
      renderSectionFooter={item => {
        const index = sections.findIndex(
          section => section.data === item.section.data
        );

        return Platform.select({
          android:
            index < sections.length - 1 ? (
              <Divider style={[styles.divider, styles.sectionFooter]} />
            ) : (
              <View style={[styles.sectionFooter]} />
            ),
          default: <View style={[styles.sectionFooter]} />,
        });
      }}
      ItemSeparatorComponent={() =>
        Platform.select({
          android: null,
          default: <Divider style={[styles.divider, styles.itemDivider]} />,
        })
      }
      stickySectionHeadersEnabled={false}
      {...rest}
    />
  );
}
