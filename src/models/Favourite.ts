import { Movie } from "./Movie";

export type Favourite = Pick<
  Movie,
  "id" | "posterPath" | "backdropPath" | "title" | "releaseDate" | "voteAverage"
>;
