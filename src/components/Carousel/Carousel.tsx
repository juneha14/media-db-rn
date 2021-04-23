import React from "react";
import { FlatListProps, StyleProp, FlatList, ViewStyle } from "react-native";

type CarouselFlatListProps<Item> = Pick<
  FlatListProps<Item>,
  | "keyExtractor"
  | "data"
  | "renderItem"
  | "pagingEnabled"
  | "showsHorizontalScrollIndicator"
  | "snapToInterval"
  | "ListEmptyComponent"
>;

interface CarouselProps<Item> extends CarouselFlatListProps<Item> {
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export function Carousel<Item>({
  keyExtractor,
  data,
  renderItem,
  showsHorizontalScrollIndicator = false,
  snapToInterval,
  pagingEnabled = false,
  ListEmptyComponent,
  contentContainerStyle,
  style,
}: CarouselProps<Item>): JSX.Element {
  return (
    <FlatList
      keyExtractor={keyExtractor}
      style={style}
      contentContainerStyle={contentContainerStyle}
      data={data}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      pagingEnabled={pagingEnabled}
      snapToInterval={snapToInterval}
      decelerationRate="fast"
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}
