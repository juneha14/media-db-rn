import React, { useCallback, useMemo } from "react";
import { StyleSheet, Dimensions, StyleProp, ViewStyle } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiscoverParamList } from "../../navigation";
import { MediaCell } from "./MediaCell";
import { useFavouriteState } from "./useFavouriteState";
import { PaginatedList } from "../../components/PaginatedList";
import { QueryContainer } from "../../components/QueryContainer";
import { Colors, Spacing } from "../../components/theme";
import { Favourite, Movie } from "../../models";
import { noop } from "lodash";

interface MediaListProps {
  loading: boolean;
  errored: boolean;
  onErrorRetry: () => void;
  refreshing: boolean;
  onRefresh: () => void;
  fetching: boolean;
  onFetchNext: () => void;
  data?: Movie[];
  listRef?: React.MutableRefObject<FlatList<Movie> | null>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const MediaList: React.FC<MediaListProps> = ({
  loading,
  errored,
  onErrorRetry,
  refreshing,
  onRefresh,
  fetching,
  onFetchNext,
  data,
  listRef,
  contentContainerStyle,
}) => {
  const { push } = useNavigation<StackNavigationProp<DiscoverParamList>>();

  const { favourites, onToggleLike } = useFavouriteState();

  const width = useMemo(() => {
    return Dimensions.get("window").width / 2 - 15; // (screenWidth / 2) - (paddingHorizontal / 2 + marginHorizontal / 2)
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
      isLoading={loading}
      isErrored={errored}
      onRetryQuery={onErrorRetry}
    >
      <PaginatedList
        style={styles.container}
        listRef={(input) => {
          listRef ? (listRef.current = input) : noop;
        }}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        isFetching={fetching}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        numColumns={2}
        data={data}
        renderItem={renderItem}
        onEndReached={onFetchNext}
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
