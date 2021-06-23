import React, { useLayoutEffect } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiscoverParamList } from "../../navigation";
import { AppParamList } from "../../navigation/AppRoutes";
import { NavigationBarItem } from "../../components/Navigation";
import { MediaGridList } from "../shared/MediaGridList";
import { usePagination } from "../../hooks";
import { Movie, remoteSortOptionForOption, SortOption } from "../../models";
import { useObservableState } from "../../hooks/useObservableState";

// Sort by: rating, date, popularity

export const GenreScreen: React.FC = () => {
  const {
    params: {
      genre: { id, name },
    },
  } = useRoute<RouteProp<DiscoverParamList, "GenreDetails">>();
  const { setOptions, navigate } = useNavigation<
    StackNavigationProp<AppParamList>
  >();

  const [sortOptionParam] = useObservableState<SortOption>("sort-option");

  useLayoutEffect(
    () =>
      setOptions({
        headerTitle: name,
        headerRight: () => (
          <NavigationBarItem
            title="Filter"
            iconName="ios-filter-outline"
            position="right"
            onPress={() => navigate("Filter")}
          />
        ),
      }),
    [name, setOptions, navigate]
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
    genreIds: [id],
    sortOption: remoteSortOptionForOption[sortOptionParam ?? "none"],
  });

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
