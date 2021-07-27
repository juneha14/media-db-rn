import React from "react";
import { storiesOf } from "@storybook/react-native";
import { MediaScreen } from "../Home/MediaScreen";
import { MediaDetailsScreen } from "../MediaDetails/MediaDetailsScreen";
import { FilterScreen } from "../Filter";
import { GalleryCarouselScreen, GalleryListScreen } from "../Gallery";

storiesOf("Screens", module)
  .add("movie list", () => <MediaScreen />)
  .add("movie details", () => <MediaDetailsScreen />)
  .add("filter", () => <FilterScreen />)
  .add("gallery list", () => <GalleryListScreen />)
  .add("gallery carousel", () => <GalleryCarouselScreen />);
