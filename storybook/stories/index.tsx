import React from "react";
import { storiesOf } from "@storybook/react-native";

import { ContentView } from "../ContentView";
import { Typography } from "./Typography";
import { Ratings } from "./Ratings";

storiesOf("Typography", module)
  .addDecorator(ContentView)
  .add("Text", () => <Typography />);

storiesOf("Ratings", module)
  .addDecorator(ContentView)
  .add("Rating", () => <Ratings />);
