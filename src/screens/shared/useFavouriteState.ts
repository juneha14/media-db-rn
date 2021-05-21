import { useCallback } from "react";
import { usePersistedState } from "../../hooks";
import { Favourite } from "../../models";

interface State {
  favourites: Favourite[];
  onToggleLike: (favourite: Favourite) => void;
}

export const useFavouriteState = (): State => {
  const [favourites, setFavourites] = usePersistedState<Favourite[]>(
    "LikedMedia",
    []
  );

  const onToggleLike = useCallback(
    (favourite: Favourite) => {
      const id = favourite.id;
      if (favourites?.find((f) => f.id === id)) {
        // Toggled on -> Toggle off
        setFavourites(favourites?.filter((f) => f.id !== id));
      } else {
        // Toggled off -> Toggled on
        setFavourites(favourites ? [favourite, ...favourites] : [favourite]);
      }
    },
    [favourites, setFavourites]
  );

  return {
    favourites: favourites ?? [],
    onToggleLike,
  };
};
