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
  | "onScroll"
>;

interface CarouselProps<Item> extends CarouselFlatListProps<Item> {
  carouselRef?: React.MutableRefObject<FlatList<Item> | null>;
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
  onScroll,
  carouselRef,
  contentContainerStyle,
  style,
}: CarouselProps<Item>): JSX.Element {
  return (
    <FlatList
      ref={(input) => (carouselRef ? (carouselRef.current = input) : undefined)}
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
      onScroll={onScroll}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}
