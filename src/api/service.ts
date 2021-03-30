/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "./client";

interface NowPlayingMovies {
  path: "now-playing-movies";
  page: number;
  language?: string;
}

interface MovieDetails {
  path: "movie-details";
  movieId: string;
  language?: string;
}

export type TRequest = NowPlayingMovies | MovieDetails;

export async function fetchRequest(request: TRequest): Promise<any> {
  switch (request.path) {
    case "now-playing-movies":
      return client.getNowPlayingMovies(request.page);
    case "movie-details":
      return client.getMovieDetails(request.movieId);
  }
}
