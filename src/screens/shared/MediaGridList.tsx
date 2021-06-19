import React, { useCallback, useMemo } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiscoverParamList } from "../../navigation";
import { PaginatedList } from "../../components/PaginatedList";
import { QueryContainer } from "../../components/QueryContainer";
import { Favourite, Movie } from "../../models";
import { MediaCell } from "./MediaCell";
import { Colors, Spacing } from "../../components/theme";
import { useFavouriteState } from "./useFavouriteState";
import { FlatList } from "react-native-gesture-handler";
import { AppParamList } from "../../navigation/AppRoutes";

interface MediaGridListProps {
  isLoading: boolean;
  isErrored: boolean;
  isRefreshing: boolean;
  isFetching: boolean;
  data?: Movie[];
  onRetryError?: () => void;
  onFetchNextPage?: () => void;
  onRefresh?: () => void;
  gridRef?: (ref: FlatList<Movie> | null) => void;
  ignoresTopPadding?: boolean;
}

export const MediaGridList: React.FC<MediaGridListProps> = ({
  isLoading,
  isErrored,
  isRefreshing,
  isFetching,
  data,
  onRetryError,
  onFetchNextPage,
  onRefresh,
  gridRef,
  ignoresTopPadding = false,
}) => {
  const { favourites, onToggleLike } = useFavouriteState();

  const { top } = useSafeAreaInsets();
  //   const { push } = useNavigation<StackNavigationProp<DiscoverParamList>>();
  const { navigate, push } = useNavigation<StackNavigationProp<AppParamList>>();

  const width = useMemo(
    () => Dimensions.get("window").width / 2 - 15, // (screenWidth / 2) - (paddingHorizontal / 2 + marginHorizontal / 2)
    []
  );

  //   const onSelectCell = useCallback(
  //     (id: number) => push("MediaDetails", { id }),
  //     [push]
  //   );
  const onSelectCell = useCallback(
    (id: number) =>
      navigate("Filter", {
        onSelectSortOption: () =>
          console.log(
            "========== File: MediaGridList.tsx, Line: 57 =========="
          ),
      }),
    [push]
  );

  const onSelectLike = useCallback(
    (favourite: Favourite) => () => onToggleLike(favourite),
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
      isErrored={isErrored}
      onRetryQuery={onRetryError}
    >
      <PaginatedList
        style={styles.container}
        listRef={gridRef}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: ignoresTopPadding ? undefined : top },
        ]}
        isFetching={isFetching}
        refreshing={isRefreshing}
        keyExtractor={keyExtractor}
        numColumns={2}
        data={data}
        renderItem={renderItem}
        onEndReached={onFetchNextPage}
        onRefresh={onRefresh}
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
