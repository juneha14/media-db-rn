import React, { useRef } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useScrollToTop } from "@react-navigation/native";
import { usePagination } from "../../hooks";
import { Movie } from "../../models";
import { MediaGridList } from "../shared/MediaGridList";

export const MediaScreen: React.FC = () => {
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
    <MediaGridList
      gridRef={(ref) => (listRef.current = ref)}
      isLoading={isLoading}
      isErrored={errorMessage !== undefined}
      onRetryError={() => refresh(true)}
      isFetching={isFetching}
      onFetchNextPage={() => fetchNextPage({ page: nextPage })}
      isRefreshing={isRefreshing}
      onRefresh={() => refresh(false)}
      data={allData}
    />
  );
};
