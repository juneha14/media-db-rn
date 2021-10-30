import { isEqual } from "lodash";
import { useCallback } from "react";
import { usePersistedState } from "../../hooks";
import { FeedbackOptionKeys, StarRating } from "./utils";

export interface RatedMedia {
  id: number;
  rating: StarRating;
  feedback: FeedbackOptionKeys[];
}

interface State {
  list: RatedMedia[];
  getMediaForId: (id: number) => RatedMedia | null;
  updateMediaForId: (
    id: number,
    rating: StarRating,
    feedback: FeedbackOptionKeys[]
  ) => void;
}

export const useRatedList = (): State => {
  const [list, setList] = usePersistedState<RatedMedia[]>("Rating", []);

  const getMediaForId = useCallback(
    (id: number) => {
      const media = list?.find((media) => media.id === id);
      return media ?? null;
    },
    [list]
  );

  // Implement cache where the most newly updated entry is added to the top
  const updateMediaForId = useCallback(
    (id: number, rating: StarRating, feedback: FeedbackOptionKeys[]) => {
      const newMedia = { id, rating, feedback };
      const mediaToUpdate = list?.find((media) => media.id === id);

      if (mediaToUpdate) {
        if (isEqual(newMedia, mediaToUpdate)) return;
        const filteredList = list?.filter((media) => media.id !== id) ?? [];
        setList([newMedia, ...filteredList]);
      } else {
        const newList = list ? [newMedia, ...list] : [newMedia];
        setList(newList);
      }
    },
    [list, setList]
  );

  return {
    list: list ?? [],
    getMediaForId,
    updateMediaForId,
  };
};
