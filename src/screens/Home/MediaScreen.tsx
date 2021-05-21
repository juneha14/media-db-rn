import React, { useRef } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useScrollToTop } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePagination } from "../../hooks";
import { Movie } from "../../models";
import { MediaList } from "../shared";

export const MediaScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();

  const listRef = useRef<FlatList<Movie> | null>(null);
  useScrollToTop(listRef);

  const {
    isLoading,
    isFetching,
    isRefreshing,
    errorMessage,
    nextPage,
    fetchNextPage,
    allData,
    refresh,
  } = usePagination<Movie>("NowPlayingMovies", { page: 1 });

  return (
    <MediaList
      listRef={listRef}
      loading={isLoading}
      errored={errorMessage !== undefined}
      onErrorRetry={() => refresh(true)}
      refreshing={isRefreshing}
      onRefresh={() => refresh(false)}
      fetching={isFetching}
      onFetchNext={() => fetchNextPage({ page: nextPage })}
      data={allData}
      contentContainerStyle={{ paddingTop: top }}
    />
  );
};
