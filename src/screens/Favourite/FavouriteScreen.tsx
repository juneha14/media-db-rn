import React, { useCallback, useMemo, useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { Colors, Spacing } from "../../components/theme";
import { Favourite } from "../../models";
import { MediaCell, useFavouriteState } from "../shared";
import { FlatList } from "react-native-gesture-handler";
import { useAppStackNavigation } from "../../hooks";

export const FavouriteScreen: React.FC = () => {
  const { push } = useAppStackNavigation();
  const { favourites, onToggleLike } = useFavouriteState();

  const listRef = useRef<FlatList<Favourite> | null>(null);
  useScrollToTop(listRef);

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
