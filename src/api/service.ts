/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "./client";

export type EndpointParamList = {
  NowPlayingMovies: { page: number };
  MovieDetails: { movieId: number };
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
  }
}
