import React from "react";
import { StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { ContentViewDark } from "../../../storybook/ContentView";
import { FavouriteIcon } from "./Favourite";
import { ScrollView } from "react-native-gesture-handler";
import { Box } from "../Box";
import { PlayIcon } from "./Play";

storiesOf("Icons", module)
  .addDecorator(ContentViewDark)
  .add("Favourite", () => (
    <ScrollView>
      <Box style={styles.container}>
        <FavouriteIcon
          iconSize="small"
          onPress={() =>
            console.log(
              "========== File: Icons.stories.tsx, Line: 14 =========="
            )
          }
        />
        <FavouriteIcon iconSize="medium" />
        <FavouriteIcon iconSize="large" />
      </Box>
      <Box style={styles.container}>
        <FavouriteIcon iconSize="small" caption="Favourite" />
        <FavouriteIcon iconSize="medium" caption="Favourite" />
        <FavouriteIcon iconSize="large" caption="Favourite" />
      </Box>
      <Box style={styles.container}>
        <FavouriteIcon iconSize="small" caption="Favourite" encloseInBorder />
        <FavouriteIcon iconSize="medium" caption="Favourite" encloseInBorder />
        <FavouriteIcon iconSize="large" caption="Favourite" encloseInBorder />
      </Box>
    </ScrollView>
  ))
  .add("Play", () => (
    <ScrollView>
      <Box style={styles.container}>
        <PlayIcon
          iconSize="small"
          onPress={() =>
            console.log(
              "========== File: Icons.stories.tsx, Line: 14 =========="
            )
          }
        />
        <PlayIcon iconSize="medium" />
        <PlayIcon iconSize="large" />
      </Box>
      <Box style={styles.container}>
        <PlayIcon iconSize="small" caption="Play" />
        <PlayIcon iconSize="medium" caption="Play" />
        <PlayIcon iconSize="large" caption="Play" />
      </Box>
    </ScrollView>
  ));

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
  },
});
