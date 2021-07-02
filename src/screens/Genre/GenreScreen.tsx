import React, { useLayoutEffect } from "react";
import { NavigationBarItem } from "../../components/Navigation";
import { MediaGridList } from "../shared/MediaGridList";
import {
  useAppModalNavigation,
  usePagination,
  useRouteParams,
} from "../../hooks";
import { Movie, remoteSortOptionForOption } from "../../models";

export const GenreScreen: React.FC = () => {
  const {
    params: { genre, sortOption },
  } = useRouteParams<"GenreDetails">();
  const { setOptions, navigate } = useAppModalNavigation();

  useLayoutEffect(
    () =>
      setOptions({
        headerTitle: genre?.name,
        headerRight: () => (
          <NavigationBarItem
            title="Filter"
            iconName="ios-filter-outline"
            position="right"
            onPress={() => navigate("Filter", { option: sortOption })}
          />
        ),
      }),
    [genre, sortOption, setOptions, navigate]
  );

  const {
    isLoading,
    isFetching,
    isRefreshing,
    errorMessage,
    nextPage,
    fetchNextPage,
    allData,
    refresh,
  } = usePagination<Movie>("DiscoverMovies", {
    page: 1,
    genreIds: [genre?.id ?? 0],
    sortOption: remoteSortOptionForOption[sortOption ?? "popular"],
  });

  return (
    <MediaGridList
      isLoading={isLoading}
      isErrored={errorMessage !== undefined}
      onRetryError={() => refresh(true)}
      isFetching={isFetching}
      onFetchNextPage={() => {
        console.log("==== Value of nextPage:", nextPage);
        fetchNextPage({ page: nextPage });
      }}
      isRefreshing={isRefreshing}
      onRefresh={() => refresh(false)}
      data={allData}
      ignoresTopPadding
    />
  );
};
