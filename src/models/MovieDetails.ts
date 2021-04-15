export interface MovieDetails {
  adult: boolean;
  backdropPath: string | null;
  belongsToCollection: Record<string, unknown> | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdbId: string | null;
  originalLanguage: string;
  originalTitle: string;
  overview: string | null;
  popularity: number;
  posterPath: string | null;
  productionCompanies: ProductionCompanies[];
  releaseDate: string;
  revenue: number;
  runtime: number | null;
  spokenLanguages: SpokenLanguages[];
  status: Status;
  tagline: string | null;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

export interface Genre {
  id: number;
  name: string;
}

interface ProductionCompanies {
  name: string;
  id: number;
  logoPath: string | null;
  originCountry: string;
}

interface SpokenLanguages {
  name: string;
}

type Status =
  | "Rumored"
  | "Planned"
  | "In Production"
  | "Post Production"
  | "Released"
  | "Canceled";
