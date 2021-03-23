import React from "react";
import { storiesOf } from "@storybook/react-native";

import { ContentView } from "../ContentView";
import { Typography } from "./Text";

storiesOf("Typography", module)
  .addDecorator(ContentView)
  .add("Text", () => <Typography />);
