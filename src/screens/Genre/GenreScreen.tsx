import React, { useLayoutEffect } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiscoverParamList } from "../../navigation";
import { MediaGridList } from "../shared/MediaGridList";
import { usePagination } from "../../hooks";
import { Movie } from "../../models";

// Sort by: rating, date, popularity

export const GenreScreen: React.FC = () => {
  const {
    params: {
      genre: { id, name },
    },
  } = useRoute<RouteProp<DiscoverParamList, "GenreDetails">>();
  const { setOptions } = useNavigation<
    StackNavigationProp<DiscoverParamList>
  >();

  useLayoutEffect(() => setOptions({ headerTitle: name }), [name, setOptions]);

  const {
    isLoading,
    isFetching,
    isRefreshing,
    errorMessage,
    nextPage,
    fetchNextPage,
    allData,
    refresh,
  } = usePagination<Movie>("DiscoverMovies", { page: 1, genreIds: [id] });

  return (
    <MediaGridList
      isLoading={isLoading}
      isErrored={errorMessage !== undefined}
      onRetryError={() => refresh(true)}
      isFetching={isFetching}
      onFetchNextPage={() => fetchNextPage({ page: nextPage })}
      isRefreshing={isRefreshing}
      onRefresh={() => refresh(false)}
      data={allData}
      ignoresTopPadding
    />
  );
};
