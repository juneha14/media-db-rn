import { Genre, SortOption } from "../models";
import { KnownForMedia } from "../screens/Credits/utils";
import { GalleryImage } from "../screens/Gallery/utils";

export type StackRouteParamList = {
  MediaList: undefined;
  MediaDetails: { id: number };
  RecommendedList: { id: number };
  CreditList: { id: number };
  CreditDetails: { id: number };
  CreditKnownForList: { media: KnownForMedia[] };
  GenreList: undefined;
  GenreDetails: { genre?: Genre; sortOption?: SortOption };
  FavouriteList: undefined;
  Search: undefined;
  PeopleList: undefined;
  GalleryList: { images: GalleryImage[] };
};

export type ModalRouteParamList = {
  Filter: { option?: SortOption };
  GalleryCarousel: { selectedPage: number; images: GalleryImage[] };
};

export type Screens = keyof StackRouteParamList | keyof ModalRouteParamList;
