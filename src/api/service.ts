/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "./client";

export type EndpointParamList = {
  NowPlayingMovies: { page: number };
  PopularMovies: { page: number };
  MovieDetails: { movieId: number };
  MovieCredits: { movieId: number };
  MovieRecommendations: { movieId: number };
  MovieVideos: { movieId: number };

  PersonDetails: { personId: number };
  PersonExternalIds: { personId: number };
  PersonMovieCredits: { personId: number };

  DiscoverMovies: { page: number; genreIds: number[] };
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
    case "MovieVideos": {
      const { movieId } = params as EndpointParamList["MovieVideos"];
      return client.getMovieVideos(movieId);
    }

    case "PersonDetails": {
      const { personId } = params as EndpointParamList["PersonDetails"];
      return client.getPersonDetails(personId);
    }
    case "PersonExternalIds": {
      const { personId } = params as EndpointParamList["PersonExternalIds"];
      return client.getPersonExternalLinks(personId);
    }
    case "PersonMovieCredits": {
      const { personId } = params as EndpointParamList["PersonMovieCredits"];
      return client.getPersonMovieCredits(personId);
    }

    case "DiscoverMovies": {
      const { page, genreIds } = params as EndpointParamList["DiscoverMovies"];
      return client.discoverMovies(page, genreIds);
    }
  }
}
