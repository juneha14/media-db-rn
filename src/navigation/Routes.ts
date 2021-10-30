import { Genre, SortOption } from "../models";
import { KnownForMedia } from "../screens/Credits/utils";
import { GalleryImage } from "../screens/Gallery/utils";
import { RatedMedia } from "../screens/Reviews";

export type StackRouteParamList = {
  LoginOptions: undefined;
  Tabs: undefined;
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
  TMDBLogin: undefined;
  Filter: { option?: SortOption };
  GalleryCarousel: { selectedPage: number; images: GalleryImage[] };
  AddRating: {
    id: number;
    title: string;
    imgUrl: string | null;
    ratingDetails: RatedMedia | null;
  };
};

export type Screens = keyof StackRouteParamList | keyof ModalRouteParamList;
