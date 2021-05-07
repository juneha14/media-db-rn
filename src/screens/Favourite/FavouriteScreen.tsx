import React, { useCallback } from "react";
import { Dimensions, FlatList } from "react-native";
import { usePersistedState } from "../../hooks";
import { Favourite } from "../../models";
import { MediaCell } from "../Home";

export const FavouriteScreen: React.FC = () => {
  const [favourites, setFavourites] = usePersistedState<Favourite[]>(
    "LikedMedia",
    []
  );

  const onPressCell = useCallback((id: number) => {
    console.log("========== File: FavouriteScreen.tsx, Line: 16 ==========");
  }, []);

  const onPressLike = useCallback(() => {
    console.log("========== File: FavouriteScreen.tsx, Line: 20 ==========");
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Favourite }) => {
      return (
        <MediaCell
          id={item.id}
          mediaImgType="backdrop"
          mediaImgUrl={item.backdropPath ?? item.posterPath}
          title={item.title}
          releaseDate={item.releaseDate}
          rating={item.voteAverage}
          width={Dimensions.get("window").width}
          onPress={onPressCell}
          onLikePress={onPressLike}
        />
      );
    },
    [onPressCell, onPressLike]
  );

  return (
    <FlatList
      keyExtractor={(item) => String(item.id)}
      data={favourites}
      renderItem={renderItem}
    />
  );
};
