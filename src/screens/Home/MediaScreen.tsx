import React, { useCallback, useMemo } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { PaginatedList } from "../../components/PaginatedList";
import { Spacing } from "../../components/theme";
import { usePagination } from "../../hooks";
import { Movie } from "../../models";
import { MediaCell } from "./MediaCell";

export const MediaScreen: React.FC = () => {
  const {
    isLoading,
    isFetching,
    errorMessage,
    nextPage,
    fetchNextPage,
    allData,
  } = usePagination<Movie>("NowPlayingMovies", { page: 1 });

  const width = useMemo(() => {
    // (screenWidth / 2) - (paddingHorizontal / 2 + marginHorizontal / 2)
    return Dimensions.get("window").width / 2 - 15;
  }, []);

  const onSelectCell = useCallback((id: number) => {
    console.log("==== Value of id:", id);
  }, []);

  const onSelectLike = useCallback((pressed: boolean) => {
    console.log("==== Value of pressed:", pressed);
  }, []);

  const renderItem = useCallback(
    ({
      item: { id, posterPath, title, releaseDate, voteAverage },
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
          onPress={onSelectCell}
          onLikePress={onSelectLike}
        />
      );
    },
    [width, onSelectCell, onSelectLike]
  );

  const keyExtractor = useCallback((item: Movie, index: number) => {
    return String(item.id) + String(index);
  }, []);

  return (
    <PaginatedList
      contentContainerStyle={styles.container}
      isLoading={isLoading}
      isFetching={isFetching}
      error={errorMessage}
      keyExtractor={keyExtractor}
      numColumns={2}
      data={allData}
      renderItem={renderItem}
      onEndReached={() => {
        fetchNextPage({ page: nextPage });
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  cellContainer: {
    marginHorizontal: 5,
    marginBottom: Spacing.m,
  },
});
