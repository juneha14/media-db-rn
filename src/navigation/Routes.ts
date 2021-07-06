import { Genre, SortOption } from "../models";
import { KnownForMedia } from "../screens/Credits/utils";

export type StackRouteParamList = {
  MediaList: undefined;
  MediaDetails: { id: number };
  RecommendedList: { id: number };
  CreditList: { id: number };
  CreditDetails: { id: number };
  CreditKnownForList: { media: KnownForMedia[] };
  GenreDetails: { genre?: Genre; sortOption?: SortOption };
  FavouriteList: undefined;
  Search: undefined;
  PeopleList: undefined;
};

export type ModalRouteParamList = {
  Filter: { option?: SortOption };
};

export type Screens = keyof StackRouteParamList | keyof ModalRouteParamList;
