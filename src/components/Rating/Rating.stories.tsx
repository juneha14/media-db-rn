import React from "react";
import { StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { ContentViewDark } from "../../../storybook/ContentView";
import { Box } from "../Box";
import { Rating } from "./Rating";

storiesOf("Rating", module)
  .addDecorator(ContentViewDark)
  .add("ratings", () => (
    <Box>
      <Rating style={styles.container} rating={1.1} />
      <Rating style={styles.container} rating={6.7} />
      <Rating style={styles.container} rating={9.2} />
    </Box>
  ));

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
});
