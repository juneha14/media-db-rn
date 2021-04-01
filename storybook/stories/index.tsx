import React from "react";
import { storiesOf } from "@storybook/react-native";

import { ContentView } from "../ContentView";
import { Typography } from "./components/Typography";
import { Ratings } from "./components/Ratings";
import { MediaCells } from "./components/MediaCells";
import { CaptionImages } from "./components/CaptionImages";

import { MediaScreen } from "../../src/screens/Home/MediaScreen";

// Components
storiesOf("Typography", module)
  .addDecorator(ContentView)
  .add("Text", () => <Typography />);

storiesOf("Ratings", module)
  .addDecorator(ContentView)
  .add("Rating", () => <Ratings />);

storiesOf("Caption Images", module)
  .addDecorator(ContentView)
  .add("Caption Images", () => <CaptionImages />);

storiesOf("Media Cells", module)
  .addDecorator(ContentView)
  .add("Media cell", () => <MediaCells />);

// Screens
storiesOf("Screens", module).add("Media Screen", () => <MediaScreen />);
