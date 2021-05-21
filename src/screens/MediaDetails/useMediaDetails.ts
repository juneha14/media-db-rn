import { useState, useEffect, useCallback } from "react";
import { fetchRequest } from "../../api/service";
import {
  Cast,
  Credit,
  Favourite,
  Movie,
  MovieDetails,
  PaginatedResponse,
} from "../../models";
import { convertToCamelCase } from "../../utils";
import { useFavouriteState } from "../shared";

interface State {
  loading: boolean;
  error?: string;
  details?: MovieDetails & { isLiked: boolean };
  cast?: Cast[];
  recommendations?: Movie[];
  refetch: () => void;
  onToggleLike: (favourite: Favourite) => void;
}

export const useMediaDetails = (movieId: number): State => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [details, setDetails] = useState<MovieDetails>();
  const [cast, setCast] = useState<Cast[]>();
  const [recommendations, setRecommendations] = useState<Movie[]>();
  const { favourites, onToggleLike } = useFavouriteState();

  const fetch = useCallback(async () => {
    const details = fetchRequest("MovieDetails", { movieId });
    const credits = fetchRequest("MovieCredits", { movieId });
    const recommendations = fetchRequest("MovieRecommendations", { movieId });

    return Promise.all([details, credits, recommendations])
      .then((jsons) => {
        const [details, credits, recommendations] = jsons.map((json) =>
          convertToCamelCase(json)
        );
        setDetails(details);
        setCast((credits as Credit).cast.slice(0, 8));
        setRecommendations(
          (recommendations as PaginatedResponse<Movie[]>).results
        );
      })
      .catch((error) => {
        console.error(
          "[useMediaDetails] Failed to resolve all requests due to error:",
          error
        );
        setError(error.message);
      });
  }, [movieId]);

  useEffect(() => {
    setLoading(true);
    fetch().then(() => setLoading(false));
  }, [fetch]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setTimeout(() => {
      fetch().then(() => setLoading(false));
    }, 500);
  }, [fetch]);

  return {
    loading,
    error,
    details: details && {
      ...details,
      isLiked: favourites.find((f) => f.id === movieId) !== undefined,
    },
    cast,
    recommendations,
    refetch,
    onToggleLike,
  };
};
