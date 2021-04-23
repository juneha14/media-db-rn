import React from "react";
import { storiesOf } from "@storybook/react-native";
import { MediaScreen } from "../Home/MediaScreen";
import { MediaDetailsScreen } from "../MediaDetails/MediaDetailsScreen";

storiesOf("Screens", module)
  .add("movie list", () => <MediaScreen />)
  .add("movie details", () => <MediaDetailsScreen />);
