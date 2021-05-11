import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet, Dimensions, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DiscoverParamList, TabParamList } from "../../navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PaginatedList } from "../../components/PaginatedList";
import { QueryContainer } from "../../components/QueryContainer";
import { MediaCell } from "./MediaCell";
import { Colors, Spacing } from "../../components/theme";
import { usePagination, useRootTabScrollToTop } from "../../hooks";
import { Favourite, Movie } from "../../models";
import { useFavouriteState } from "../Favourite";

export const MediaScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const { push } = useNavigation<StackNavigationProp<DiscoverParamList>>();

  const listRef = useRef<FlatList<Movie> | null>(null);
  useRootTabScrollToTop(listRef);

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

  const { favourites, onToggleLike } = useFavouriteState();

  const width = useMemo(() => {
    // (screenWidth / 2) - (paddingHorizontal / 2 + marginHorizontal / 2)
    return Dimensions.get("window").width / 2 - 15;
  }, []);

  const onSelectCell = useCallback(
    (id: number) => push("MediaDetails", { id }),
    [push]
  );

  const onSelectLike = useCallback(
    (favourite: Favourite) => () => {
      onToggleLike(favourite);
    },
    [onToggleLike]
  );

  const renderItem = useCallback(
    ({
      item: { id, posterPath, backdropPath, title, releaseDate, voteAverage },
    }: {
      item: Movie;
    }) => {
      return (
        <MediaCell
          style={styles.cellContainer}
          id={id}
          mediaImgType="poster"
          mediaImgUrl={posterPath}
          title={title}
          releaseDate={releaseDate}
          rating={voteAverage}
          width={width}
          isLiked={favourites.find((f) => f.id === id) !== undefined}
          onPress={onSelectCell}
          onLikePress={onSelectLike({
            id,
            posterPath,
            backdropPath,
            title,
            releaseDate,
            voteAverage,
          })}
        />
      );
    },
    [width, onSelectCell, onSelectLike, favourites]
  );

  const keyExtractor = useCallback((item: Movie, index: number) => {
    return String(item.id) + String(index);
  }, []);

  return (
    <QueryContainer
      wrapperStyle="unwrapped"
      isLoading={isLoading}
      isErrored={errorMessage !== undefined}
      onRetryQuery={() => refresh(true)}
    >
      <PaginatedList
        style={styles.container}
        listRef={(input) => (listRef.current = input)}
        contentContainerStyle={[styles.contentContainer, { paddingTop: top }]}
        isFetching={isFetching}
        refreshing={isRefreshing}
        keyExtractor={keyExtractor}
        numColumns={2}
        data={allData}
        renderItem={renderItem}
        onEndReached={() => fetchNextPage({ page: nextPage })}
        onRefresh={() => refresh(false)}
      />
    </QueryContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceBackground,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  cellContainer: {
    marginHorizontal: 5,
    marginBottom: Spacing.m,
  },
});
