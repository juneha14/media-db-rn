import { useState, useEffect, useCallback } from "react";
import { fetchRequest } from "../../api";
import {
  Cast,
  Credit,
  Favourite,
  MovieImages,
  Movie,
  MovieDetails,
  PaginatedResponse,
  VideoLink,
  Videos,
} from "../../models";
import { convertToCamelCase } from "../../utils";
import { GalleryImage } from "../Gallery/utils";
import { useFavouriteState } from "../shared";

interface State {
  loading: boolean;
  error?: string;
  details?: MovieDetails & { isLiked: boolean };
  cast?: Cast[];
  recommendations?: Movie[];
  videos?: VideoLink[];
  images?: GalleryImage[];
  refetch: () => void;
  onToggleLike: (favourite: Favourite) => void;
}

export const useMediaDetails = (movieId: number): State => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const [details, setDetails] = useState<MovieDetails>();
  const [cast, setCast] = useState<Cast[]>();
  const [recommendations, setRecommendations] = useState<Movie[]>();
  const [videos, setVideos] = useState<VideoLink[]>();
  const [images, setImages] = useState<GalleryImage[]>();

  const { favourites, onToggleLike } = useFavouriteState();

  const fetch = useCallback(async () => {
    const details = fetchRequest("MovieDetails", { movieId });
    const credits = fetchRequest("MovieCredits", { movieId });
    const recommendations = fetchRequest("MovieRecommendations", { movieId });
    const videos = fetchRequest("MovieVideos", { movieId });
    const images = fetchRequest("MovieImages", { movieId });

    return Promise.all([
      details.fetch(),
      credits.fetch(),
      recommendations.fetch(),
      videos.fetch(),
      images.fetch(),
    ])
      .then((jsons) => {
        const [
          details,
          credits,
          recommendations,
          videos,
          images,
        ] = jsons.map((json) => convertToCamelCase(json));
        setDetails(details);
        setCast((credits as Credit).cast.slice(0, 8));
        setRecommendations(
          (recommendations as PaginatedResponse<Movie[]>).results.slice(0, 8)
        );
        setVideos(mapToVideoLinks(videos));
        setImages(mapToGalleryImages(images));
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
    videos,
    images,
    refetch,
    onToggleLike,
  };
};

// Utils

function mapToVideoLinks(videos: Videos): VideoLink[] {
  const links: VideoLink[] = videos.results
    .filter((video) => video.site === "YouTube")
    .map((video) => ({
      url: `https://youtube.com/watch?v=${video.key}`,
      type: video.type,
    }));

  return links;
}

function mapToGalleryImages(images: MovieImages): GalleryImage[] {
  const backdrops: GalleryImage[] = images.backdrops.map((image) => ({
    type: "backdrop",
    path: image.filePath,
    width: image.width,
    height: image.height,
    orientation: "landscape",
  }));

  const posters: GalleryImage[] = images.posters.map((image) => ({
    type: "poster",
    path: image.filePath,
    width: image.width,
    height: image.height,
    orientation: "portrait",
  }));

  return [...backdrops, ...posters];
}
