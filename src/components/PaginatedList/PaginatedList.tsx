import React, { useRef } from "react";
import { FlatList, FlatListProps, StyleSheet } from "react-native";
import { LoadingIndicator } from "../LoadingIndicator";
import { Text } from "../Typography";
import { Spacing } from "../theme";

interface PaginatedListProps<Item> extends FlatListProps<Item> {
  isLoading: boolean;
  isFetching: boolean;
  error?: string;
}

export function PaginatedList<Item>({
  isLoading,
  error,
  isFetching,
  keyExtractor,
  numColumns = 1,
  data,
  renderItem,
  onEndReached,
  onEndReachedThreshold = 0,
  style,
  contentContainerStyle,
}: PaginatedListProps<Item>): JSX.Element {
  // FlatList will call `onEndReached` whenever it is re-rendered
  // This causes us to fetch next page twice, resulting in duplicate data entries
  // To prevent this, we will only allow to fetch more iff user begins to scroll again from the list's end
  const fetchMoreEnabled = useRef(true);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <Text variant="body">{error}</Text>;

  return (
    <FlatList
      style={style}
      contentContainerStyle={contentContainerStyle}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      data={data}
      renderItem={renderItem}
      onEndReached={({ distanceFromEnd }) => {
        if (!fetchMoreEnabled.current) return;
        fetchMoreEnabled.current = false;
        onEndReached ? onEndReached({ distanceFromEnd }) : undefined;
      }}
      onEndReachedThreshold={onEndReachedThreshold}
      onMomentumScrollBegin={() => (fetchMoreEnabled.current = true)}
      ListFooterComponent={
        isFetching ? (
          <LoadingIndicator
            style={styles.fetchingMoreIndicator}
            isFullScreen={false}
          />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  fetchingMoreIndicator: {
    marginVertical: Spacing.l,
  },
});
