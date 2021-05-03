import React, { useCallback, useMemo } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaginatedList } from "../../components/PaginatedList";
import { QueryContainer } from "../../components/QueryContainer";
import { MediaCell } from "./MediaCell";
import { Colors, Spacing } from "../../components/theme";
import { usePagination } from "../../hooks";
import { Movie } from "../../models";
import { DiscoverParamList } from "../../navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const MediaScreen: React.FC = () => {
  const { navigate } = useNavigation<StackNavigationProp<DiscoverParamList>>();
  const { top } = useSafeAreaInsets();

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

  const width = useMemo(() => {
    // (screenWidth / 2) - (paddingHorizontal / 2 + marginHorizontal / 2)
    return Dimensions.get("window").width / 2 - 15;
  }, []);

  const onSelectCell = useCallback(
    (id: number) => {
      navigate("MediaDetails", { id });
    },
    [navigate]
  );

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
    <QueryContainer
      wrapperStyle="unwrapped"
      isLoading={isLoading}
      isErrored={errorMessage !== undefined}
      onRetryQuery={() => refresh(true)}
    >
      <PaginatedList
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, { paddingTop: top }]}
        isFetching={isFetching}
        refreshing={isRefreshing}
        keyExtractor={keyExtractor}
        numColumns={2}
        data={allData}
        renderItem={renderItem}
        onEndReached={() => {
          fetchNextPage({ page: nextPage });
        }}
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
