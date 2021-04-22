import React from "react";
import { StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { ContentViewDark } from "../../../storybook/ContentView";
import { MediaCell } from "../Home/MediaCell";

storiesOf("Views", module)
  .addDecorator(ContentViewDark)
  .add("media cell", () => (
    <>
      <MediaCell
        style={styles.cell}
        id={12345}
        mediaImgType="poster"
        mediaImgUrl="/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg"
        title="Godzilla vs Kong - Battle of the Ages"
        releaseDate="2020-03-30"
        rating={8.91}
        width={200}
        onPress={() => {
          console.log(
            "========== File: MediaCell.stories.tsx, Line: 19 =========="
          );
        }}
        onLikePress={() =>
          console.log(
            "========== File: MediaCell.stories.tsx, Line: 22 =========="
          )
        }
      />
      <MediaCell
        style={styles.cell}
        id={12345}
        mediaImgType="backdrop"
        mediaImgUrl="/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg"
        title="Godzilla vs Kong - Battle of the Ages"
        releaseDate="2020-03-30"
        rating={8.91}
        width={270}
        onPress={() => {
          console.log(
            "========== File: MediaCell.stories.tsx, Line: 41 =========="
          );
        }}
        onLikePress={() =>
          console.log(
            "========== File: MediaCell.stories.tsx, Line: 44 =========="
          )
        }
      />
    </>
  ));

const styles = StyleSheet.create({
  cell: {
    marginBottom: 16,
  },
});
