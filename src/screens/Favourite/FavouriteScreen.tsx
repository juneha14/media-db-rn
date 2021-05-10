import React, { useCallback } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../components/theme";
import { Favourite } from "../../models";
import { MediaCell } from "../Home";
import { useFavouriteState } from "./useFavouriteState";

export const FavouriteScreen: React.FC = () => {
  const { favourites, onToggleLike } = useFavouriteState();

  const onPressCell = useCallback((id: number) => {
    console.log("========== File: FavouriteScreen.tsx, Line: 16 ==========");
  }, []);

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
          width={Dimensions.get("window").width - 2 * Spacing.m}
          isLiked={favourites.find((f) => f.id === item.id) !== undefined}
          onPress={onPressCell}
          onLikePress={onPressLike(item)}
        />
      );
    },
    [onPressCell, onPressLike, favourites]
  );

  return (
    <FlatList
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
    margin: Spacing.l,
  },
  cellContainer: {
    marginBottom: Spacing.l,
  },
});
