/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "./client";

export type EndpointParamList = {
  NowPlayingMovies: { page: number };
  PopularMovies: { page: number };
  MovieDetails: { movieId: number };
  MovieCredits: { movieId: number };
  MovieRecommendations: { movieId: number };
};

export type Endpoint = keyof EndpointParamList;

export async function fetchRequest<T extends Endpoint>(
  endpoint: T,
  params: EndpointParamList[T]
): Promise<any> {
  switch (endpoint) {
    case "NowPlayingMovies": {
      const { page } = params as EndpointParamList["NowPlayingMovies"];
      return client.getNowPlayingMovies(page);
    }
    case "MovieDetails": {
      const { movieId } = params as EndpointParamList["MovieDetails"];
      return client.getMovieDetails(movieId);
    }
    case "MovieCredits": {
      const { movieId } = params as EndpointParamList["MovieCredits"];
      return client.getMovieCredits(movieId);
    }
    case "MovieRecommendations": {
      const { movieId } = params as EndpointParamList["MovieRecommendations"];
      return client.getMovieRecommendations(movieId);
    }
  }
}
