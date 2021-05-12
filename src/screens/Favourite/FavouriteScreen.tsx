import React, { useCallback, useMemo, useRef } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Colors, Spacing } from "../../components/theme";
import { Favourite } from "../../models";
import { FavouriteParamList } from "../../navigation";
import { useRootTabScrollToTop } from "../../hooks";
import { MediaCell, useFavouriteState } from "../shared";

// useObservableState

export const FavouriteScreen: React.FC = () => {
  const { push } = useNavigation<StackNavigationProp<FavouriteParamList>>();
  const { favourites, onToggleLike } = useFavouriteState();

  const listRef = useRef<FlatList<Favourite> | null>(null);
  useRootTabScrollToTop(listRef);

  const cellWidth = useMemo(
    () => Dimensions.get("window").width - 2 * Spacing.l,
    []
  );

  const onPressCell = useCallback(
    (id: number) => {
      push("MediaDetails", { id });
    },
    [push]
  );

  const onPressLike = useCallback(
    (favourite: Favourite) => () => {
      onToggleLike(favourite);
    },
    [onToggleLike]
  );

  const renderItem = useCallback(
    ({ item }: { item: Favourite }) => {
      return (
        <MediaCell
          style={styles.cellContainer}
          id={item.id}
          mediaImgType="backdrop"
          mediaImgUrl={item.backdropPath ?? item.posterPath}
          title={item.title}
          releaseDate={item.releaseDate}
          rating={item.voteAverage}
          width={cellWidth}
          isLiked={favourites.find((f) => f.id === item.id) !== undefined}
          onPress={onPressCell}
          onLikePress={onPressLike(item)}
        />
      );
    },
    [onPressCell, onPressLike, favourites, cellWidth]
  );

  return (
    <FlatList
      ref={(input) => (listRef.current = input)}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => String(item.id)}
      data={favourites}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceBackground,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.l,
  },
  cellContainer: {
    marginBottom: Spacing.l,
  },
});
