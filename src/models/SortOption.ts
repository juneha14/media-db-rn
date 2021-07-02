export type SortOption =
  | "popular"
  | "rating_asc"
  | "rating_desc"
  | "date_asc"
  | "date_desc"
  | "none";

export type RemoteSortOption =
  | "popularity.asc"
  | "popularity.desc"
  | "release_date.asc"
  | "release_date.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "original_title.asc"
  | "original_title.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc";

export const remoteSortOptionForOption: Record<
  SortOption,
  RemoteSortOption | undefined
> = {
  popular: "popularity.desc",
  rating_asc: "vote_average.asc",
  rating_desc: "vote_average.desc",
  date_asc: "release_date.asc",
  date_desc: "release_date.desc",
  none: undefined,
};
