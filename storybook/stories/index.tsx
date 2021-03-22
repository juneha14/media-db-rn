import React from "react";
import { storiesOf } from "@storybook/react-native";

import { TestButtons } from "./TestButtons";

storiesOf("Buttons", module).add("Button", () => <TestButtons />);
