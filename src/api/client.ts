/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */

import { RemoteSortOption } from "../models";
import { Request } from "./Request";

const API_KEY = "37bbcf6f05e7c353e1715488f9c723a1";
const baseUrl = "https://api.themoviedb.org/3";

export function client() {}

// Authentication

client.getAuthRequestToken = () => {
  const url = constructUrl("/authentication/token/new");
  return new Request(url);
};

client.validateAuthRequestToken = (
  username: string,
  password: string,
  requestToken: string
) => {
  const url = constructUrl("/authentication/token/validate_with_login");
  return new Request(url, undefined, {
    username,
    password,
    request_token: requestToken,
  });
};

client.createSessionId = (requestToken: string) => {
  const url = constructUrl("/authentication/session/new");
  return new Request(url, undefined, { request_token: requestToken });
};

// Movies

client.getNowPlayingMovies = (page = 1) => {
  const url = constructUrl("/movie/now_playing", { page });
  return new Request(url);
};

client.getMovieDetails = (movieId: number) => {
  const url = constructUrl(`/movie/${movieId}`, { movieId });
  return new Request(url);
};

client.getMovieCredits = (movieId: number) => {
  const url = constructUrl(`/movie/${movieId}/credits`);
  return new Request(url);
};

client.getMovieRecommendations = (movieId: number) => {
  const url = constructUrl(`/movie/${movieId}/recommendations`);
  return new Request(url);
};

client.getMovieVideos = (movieId: number) => {
  const url = constructUrl(`/movie/${movieId}/videos`);
  return new Request(url);
};

client.getMovieImages = (movieId: number) => {
  const url = constructUrl(`/movie/${movieId}/images`);
  return new Request(url);
};

// People

client.getPopularPeople = (page = 1) => {
  const url = constructUrl("/person/popular", { page });
  return new Request(url);
};

client.getPersonDetails = (personId: number) => {
  const url = constructUrl(`/person/${personId}`);
  return new Request(url);
};

client.getPersonExternalLinks = (personId: number) => {
  const url = constructUrl(`/person/${personId}/external_ids`);
  return new Request(url);
};

client.getPersonMovieCredits = (personId: number) => {
  const url = constructUrl(`/person/${personId}/movie_credits`);
  return new Request(url);
};

client.getPersonImages = (personId: number) => {
  const url = constructUrl(`/person/${personId}/images`);
  return new Request(url);
};

// Discover

client.discoverMovies = (
  page = 1,
  genreIds?: number[],
  sortOption?: RemoteSortOption
) => {
  const url = constructUrl("/discover/movie", {
    page,
    with_genres: genreIds,
    sort_by: sortOption,
  });
  return new Request(url);
};

client.getMovieGenres = () => {
  const url = constructUrl("/genre/movie/list");
  return new Request(url);
};

// Search

client.search = (query: string, page = 1) => {
  const url = constructUrl("/search/multi", { query, page });
  return new Request(url);
};

// Add rating

client.addRating = (sessionId: string, movieId: number, rating: number) => {
  const url = constructUrl(`/movie/${movieId}/rating`, {
    session_id: sessionId,
  });
  return new Request(url, undefined, { value: rating });
};

// Helpers

type ResourcePath = string;

function constructUrl(path: ResourcePath, searchParams?: Record<string, any>) {
  const url = new URL(path, baseUrl);
  url.searchParams.append("api_key", API_KEY);

  if (searchParams) {
    Object.entries(searchParams)
      .filter(([, val]) => val !== undefined)
      .forEach(([key, val]) => {
        url.searchParams.append(key, val);
      });
  }

  return url.toString();
}
