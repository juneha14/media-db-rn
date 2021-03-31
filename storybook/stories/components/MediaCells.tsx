import React, { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { MediaCell } from "../../../src/screens/Home/MediaCell";
import { useFetch } from "../../../src/hooks/useFetch";
import { TMovieListResponse } from "../../../src/models";

export const MediaCells: React.FC = () => {
  const width = Dimensions.get("window").width / 2 - 32;
  const [count, setCount] = useState(1);
  const state = useFetch<TMovieListResponse>({
    path: "now-playing-movies",
    page: count,
  });

  useEffect(() => {
    console.log("==== Value of state:", state);
  }, [state]);

  return (
    <View style={styles.container}>
      <MediaCell
        style={styles.mediaCellContainer}
        id="12345"
        posterImgUrl="https://image.tmdb.org/t/p/w185/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
        title="Monster Hunter and the Deadly Sword"
        releaseDate="2020-03-20"
        rating={8.91}
        width={width}
        height={100}
        onPress={() => {
          console.log("========== File: MediaCells.tsx, Line: 16 ==========");
          setCount((count) => count + 1);
        }}
      />
      <MediaCell
        style={styles.mediaCellContainer}
        id="12345"
        posterImgUrl="https://image.tmdb.org/t/p/w185/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
        title="Monster Hunter"
        releaseDate="2020-03-20"
        rating={8.91}
        width={width}
        height={100}
        onPress={() =>
          console.log("========== File: MediaCells.tsx, Line: 16 ==========")
        }
      />
      <MediaCell
        style={styles.mediaCellContainer}
        id="12345"
        posterImgUrl="https://image.tmdb.org/t/p/w185/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
        title="Monster Hunter"
        releaseDate="2020-03-20"
        rating={8.91}
        width={width}
        height={100}
        onPress={() =>
          console.log("========== File: MediaCells.tsx, Line: 16 ==========")
        }
      />
      <MediaCell
        style={styles.mediaCellContainer}
        id="12345"
        posterImgUrl="https://image.tmdb.org/t/p/w185/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
        title="Monster Hunter"
        releaseDate="2020-03-20"
        rating={8.91}
        width={width}
        height={100}
        onPress={() =>
          console.log("========== File: MediaCells.tsx, Line: 16 ==========")
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
