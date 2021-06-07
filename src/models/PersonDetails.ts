export interface PersonDetails {
  birthday: string | null;
  knownForDepartment: string;
  deathday?: string;
  id: number;
  name: string;
  alsoKnownAs: string[];
  gender: number;
  biography: string;
  popularity: number;
  placeOfBirth: string | null;
  profilePath: string | null;
  adult: boolean;
  imdbId: string;
  homepage: string | null;
}
