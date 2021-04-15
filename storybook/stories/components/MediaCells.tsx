import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { MediaCell } from "../../../src/screens/Home/MediaCell";

export const MediaCells: React.FC = () => {
  const width = Dimensions.get("window").width / 2 - 32;
  return (
    <View style={styles.container}>
      <MediaCell
        style={styles.mediaCellContainer}
        id={12345}
        mediaImgType="poster"
        mediaImgUrl="/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
        title="Monster Hunter and the Deadly Sword"
        releaseDate="2020-03-20"
        rating={8.91}
        width={width}
        onPress={() => {
          console.log("========== File: MediaCells.tsx, Line: 16 ==========");
        }}
        onLikePress={() =>
          console.log("========== File: MediaCells.tsx, Line: 60 ==========")
        }
      />
      <MediaCell
        style={styles.mediaCellContainer}
        id={12345}
        mediaImgType="poster"
        mediaImgUrl="/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
        title="Monster Hunter"
        releaseDate="2020-03-20"
        rating={8.91}
        width={width}
        onPress={() =>
          console.log("========== File: MediaCells.tsx, Line: 16 ==========")
        }
        onLikePress={() =>
          console.log("========== File: MediaCells.tsx, Line: 60 ==========")
        }
      />
      <MediaCell
        style={styles.mediaCellContainer}
        id={12345}
        mediaImgType="backdrop"
        mediaImgUrl="/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
        title="Monster Hunter"
        releaseDate="2020-03-20"
        rating={8.91}
        width={width}
        onPress={() =>
          console.log("========== File: MediaCells.tsx, Line: 16 ==========")
        }
        onLikePress={() =>
          console.log("========== File: MediaCells.tsx, Line: 60 ==========")
        }
      />
      <MediaCell
        style={styles.mediaCellContainer}
        id={12345}
        mediaImgType="backdrop"
        mediaImgUrl="/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
        title="Monster Hunter"
        releaseDate="2020-03-20"
        rating={8.91}
        width={width}
        onPress={() =>
          console.log("========== File: MediaCells.tsx, Line: 16 ==========")
        }
        onLikePress={() =>
          console.log("========== File: MediaCells.tsx, Line: 60 ==========")
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mediaCellContainer: {
    margin: 8,
  },
});
