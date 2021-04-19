import React from "react";
import { StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { ContentViewDark } from "../../../storybook/ContentView";
import { Tag } from "./Tag";
import { Box } from "../Box";
import { TagList } from "./TagList";
import { Palette } from "../theme";

storiesOf("Tags", module)
  .addDecorator(ContentViewDark)
  .add("tag", () => (
    <Box>
      <Tag style={styles.tag} title="Action" />
      <Tag
        style={styles.tag}
        title="Action but with a very long title to see how this will be handled"
      />
      <Tag style={styles.tag} title="Action" borderColor="red" />
      <Tag
        style={styles.tag}
        title="Action"
        borderColor="red"
        fillColor="grey"
        onPress={() =>
          console.log("========== File: Tags.stories.tsx, Line: 20 ==========")
        }
      />
    </Box>
  ))
  .add("tag list", () => (
    <TagList
      style={styles.tagList}
      tags={[
        { title: "Action", borderColor: "pink" },
        { title: "Science Fiction", fillColor: "grey" },
        { title: "Fantasy" },
        { title: "Drama" },
        { title: "Bunch of CGI effects" },
      ]}
    />
  ));

const styles = StyleSheet.create({
  tag: {
    marginBottom: 8,
  },
  tagList: {
    backgroundColor: Palette.White,
  },
});
