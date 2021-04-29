import React, { useRef } from "react";
import {
  FlatList,
  FlatListProps,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { LoadingIndicator } from "../LoadingIndicator";
import { Colors, Spacing } from "../theme";
import { noop } from "lodash";

interface PaginatedListProps<Item> extends FlatListProps<Item> {
  isFetching: boolean;
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
  style,
  contentContainerStyle,
}: PaginatedListProps<Item>): JSX.Element {
  // FlatList will call `onEndReached` whenever it is re-rendered
  // This causes us to fetch next page twice, resulting in duplicate data entries
  // To prevent this, we will only allow to fetch more iff user begins to scroll again from the list's end
  const fetchMoreEnabled = useRef(true);

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
      refreshControl={
        <RefreshControl
          tintColor={Colors.IconNeutral}
          refreshing={refreshing ?? false}
          onRefresh={onRefresh ?? noop}
        />
      }
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
