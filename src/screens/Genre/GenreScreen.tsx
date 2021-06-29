import React, { useLayoutEffect } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiscoverParamList } from "../../navigation";
import { AppParamList } from "../../navigation/AppRoutes";
import { NavigationBarItem } from "../../components/Navigation";
import { MediaGridList } from "../shared/MediaGridList";
import { usePagination } from "../../hooks";
import { Movie, remoteSortOptionForOption } from "../../models";

export const GenreScreen: React.FC = () => {
  const {
    params: { genre, sortOption },
  } = useRoute<RouteProp<DiscoverParamList, "GenreDetails">>();
  const { setOptions, navigate } = useNavigation<
    StackNavigationProp<AppParamList>
  >();

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
