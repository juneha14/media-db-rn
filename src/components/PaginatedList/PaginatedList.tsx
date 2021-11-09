import React, { useRef } from "react";
import { FlatListProps, RefreshControl, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { LoadingIndicator } from "../LoadingIndicator";
import { Colors, Spacing } from "../theme";
import { noop } from "lodash";

interface PaginatedListProps<Item> extends FlatListProps<Item> {
  isFetching: boolean;
  listRef?: React.MutableRefObject<null>;
}

export function PaginatedList<Item>({
  isFetching,
  refreshing,
  keyExtractor,
  numColumns = 1,
  data,
  renderItem,
  onRefresh,
  onEndReached,
  onEndReachedThreshold = 0,
  contentInset,
  listRef,
  ListEmptyComponent,
  style,
  contentContainerStyle,
}: PaginatedListProps<Item>): JSX.Element {
  // FlatList will call `onEndReached` whenever it is re-rendered
  // This causes us to fetch next page twice, resulting in duplicate data entries
  // To prevent this, we will only allow to fetch more iff user begins to scroll again from the list's end
  const fetchMoreEnabled = useRef(true);

  return (
    <FlatList
      ref={listRef}
      style={style}
      contentContainerStyle={contentContainerStyle}
      contentInset={contentInset}
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
      refreshControl={
        refreshing !== undefined && onRefresh !== undefined ? (
          <RefreshControl
            tintColor={Colors.IconNeutral}
            refreshing={refreshing ?? false}
            onRefresh={onRefresh ?? noop}
          />
        ) : undefined
      }
      ListFooterComponent={
        isFetching ? (
          <LoadingIndicator
            style={styles.fetchingMoreIndicator}
            isFullScreen={false}
          />
        ) : null
      }
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}

const styles = StyleSheet.create({
  fetchingMoreIndicator: {
    marginVertical: Spacing.l,
  },
});
