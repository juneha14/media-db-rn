import React from "react";
import { StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { ContentViewDark } from "../../../storybook/ContentView";
import { Caption } from "./Caption";
import { Colors } from "../theme";
import { Rating } from "../Rating";

storiesOf("Caption", module)
  .addDecorator(ContentViewDark)
  .add("title", () => (
    <Caption
      style={styles.container}
      title="Godzilla vs King Kong - The Battle of the Ages"
    />
  ))
  .add("title, description", () => (
    <Caption
      style={styles.container}
      title="Godzilla vs Kong"
      description="2020-03-30"
    />
  ))
  .add("title, description, right accessory", () => (
    <Caption
      style={styles.container}
      title="Godzilla vs Kong"
      description="2020-03-30"
      rightAccessory={<Rating rating={9.1} />}
    />
  ));

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceForegroundPressed,
  },
});
