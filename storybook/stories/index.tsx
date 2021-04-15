import React from "react";
import { storiesOf } from "@storybook/react-native";

import { ContentView } from "../ContentView";
import { Typography } from "./components/Typography";
import { Ratings } from "./components/Ratings";
import { MediaCells } from "./components/MediaCells";
import { CaptionImages } from "./components/CaptionImages";

import { MediaScreen } from "../../src/screens/Home/MediaScreen";
import { MediaDetailsHeader } from "./components/MediaDetailsHeader";
import { MediaDetailsViewInternal } from "./components/MediaDetailsView";

// Components
storiesOf("Components", module)
  .addDecorator(ContentView)
  .add("Typography", () => <Typography />)
  .add("Ratings", () => <Ratings />)
  .add("Caption Images", () => <CaptionImages />)
  .add("Media cells", () => <MediaCells />);

storiesOf("Media Details", module)
  .add("Media Details Header", () => <MediaDetailsHeader />)
  .add("Media Details View", () => <MediaDetailsViewInternal />);

// Screens
storiesOf("Screens", module).add("Media Screen", () => <MediaScreen />);
