import { Movie } from "./Movie";

export interface Person {
  profilePath: string | null;
  adult: boolean;
  id: number;
  knownFor: KnownFor[];
  name: string;
  popularity: number;
}

type KnownFor = Movie & { mediaType: "movie" | "tv" };
