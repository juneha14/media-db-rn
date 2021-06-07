export interface PersonCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

interface Cast {
  id: number;
  originalLanguage: string;
  episodeCount: number;
  overview: string;
  originCountry: string[];
  originalName: string;
  genredIds: number[];
  name?: string;
  mediaType: string;
  posterPath: string | null;
  firstAirDate: string;
  voteAverage: number;
  voteCount: number;
  character: string;
  backdropPath: string | null;
  popularity: number;
  creditId: string;
  video: boolean;
  releaseDate: string;
  title?: string;
  adult: boolean;
}

interface Crew extends Cast {
  department: string;
}
