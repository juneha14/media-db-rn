import React from "react";
import { storiesOf } from "@storybook/react-native";

import { ContentView } from "../ContentView";
import { Typography } from "./components/Typography";
import { Ratings } from "./components/Ratings";
import { MediaCells } from "./components/MediaCells";
import { CaptionImages } from "./components/CaptionImages";

storiesOf("Typography", module)
  .addDecorator(ContentView)
  .add("Text", () => <Typography />);

storiesOf("Ratings", module)
  .addDecorator(ContentView)
  .add("Rating", () => <Ratings />);

storiesOf("Caption Images", module)
  .addDecorator(ContentView)
  .add("Caption Images", () => <CaptionImages />);

storiesOf("Media cells", module)
  .addDecorator(ContentView)
  .add("Media cell", () => <MediaCells />);
