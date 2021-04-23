import { useState, useEffect } from "react";
import { fetchRequest } from "../../api/service";
import {
  Cast,
  Credit,
  Movie,
  MovieDetails,
  PaginatedResponse,
} from "../../models";
import { convertToCamelCase } from "../../utils";

interface State {
  loading: boolean;
  error?: string;
  details?: MovieDetails;
  cast?: Cast[];
  recommendations?: Movie[];
}

export const useMediaDetails = (movieId: number): State => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [details, setDetails] = useState<MovieDetails>();
  const [cast, setCast] = useState<Cast[]>();
  const [recommendations, setRecommendations] = useState<Movie[]>();

  useEffect(() => {
    setLoading(true);

    const details = fetchRequest("MovieDetails", { movieId });
    const credits = fetchRequest("MovieCredits", { movieId });
    const recommendations = fetchRequest("MovieRecommendations", { movieId });

    Promise.all([details, credits, recommendations])
      .then((jsons) => {
        const [details, credits, recommendations] = jsons.map((json) =>
          convertToCamelCase(json)
        );
        setDetails(details);
        setCast((credits as Credit).cast.slice(0, 7));
        setRecommendations(
          (recommendations as PaginatedResponse<Movie[]>).results
        );

        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.error(
          "[useMediaDetails] Failed to resolve all requests due to error:",
          error
        );
        setError(error.message);
      });
  }, [movieId]);

  return {
    loading,
    error,
    details,
    cast,
    recommendations,
  };
};
