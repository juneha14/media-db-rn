import { client } from "./client";
import { RemoteSortOption } from "../models";
import { Request } from "./Request";

export type EndpointParamList = {
  AuthRequestToken: undefined;
  AuthValidateRequestToken: {
    requestToken: string;
    username: string;
    password: string;
  };
  AuthSessionId: { requestToken: string };

  NowPlayingMovies: { page: number };
  PopularMovies: { page: number };
  MovieDetails: { movieId: number };
  MovieCredits: { movieId: number };
  MovieRecommendations: { movieId: number };
  MovieVideos: { movieId: number };
  MovieImages: { movieId: number };

  PopularPeople: { page: number };
  PersonDetails: { personId: number };
  PersonExternalIds: { personId: number };
  PersonMovieCredits: { personId: number };
  PersonImages: { personId: number };

  DiscoverMovies: {
    page: number;
    genreIds: number[];
    sortOption?: RemoteSortOption;
  };
  GenreMovieList: undefined;

  Search: { page: number; query: string };

  AddRating: { sessionId: string; movieId: number; rating: number };
};

export type Endpoint = keyof EndpointParamList;

export function fetchRequest<T extends Endpoint>(
  endpoint: T,
  params: EndpointParamList[T]
): Request {
  switch (endpoint) {
    case "AuthRequestToken": {
      return client.getAuthRequestToken();
    }
    case "AuthValidateRequestToken": {
      const {
        username,
        password,
        requestToken,
      } = params as EndpointParamList["AuthValidateRequestToken"];
      return client.validateAuthRequestToken(username, password, requestToken);
    }
    case "AuthSessionId": {
      const { requestToken } = params as EndpointParamList["AuthSessionId"];
      return client.createSessionId(requestToken);
    }

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
    case "MovieImages": {
      const { movieId } = params as EndpointParamList["MovieImages"];
      return client.getMovieImages(movieId);
    }

    case "PopularPeople": {
      const { page } = params as EndpointParamList["PopularPeople"];
      return client.getPopularPeople(page);
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
    case "PersonImages": {
      const { personId } = params as EndpointParamList["PersonImages"];
      return client.getPersonImages(personId);
    }

    case "DiscoverMovies": {
      const {
        page,
        genreIds,
        sortOption,
      } = params as EndpointParamList["DiscoverMovies"];
      return client.discoverMovies(page, genreIds, sortOption);
    }
    case "GenreMovieList": {
      return client.getMovieGenres();
    }

    case "Search": {
      const { page, query } = params as EndpointParamList["Search"];
      return client.search(query, page);
    }

    case "AddRating": {
      const {
        sessionId,
        movieId,
        rating,
      } = params as EndpointParamList["AddRating"];
      return client.addRating(sessionId, movieId, rating);
    }

    default: {
      return new Request("");
    }
  }
}
