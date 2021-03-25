import React from "react";
import { View, StyleSheet } from "react-native";
import { CaptionImage } from "../../../src/components/CaptionImage";
import { Text } from "../../../src/components/Text";

export const CaptionImages: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <Text variant="captionHeadingRegular">Portrait</Text>
        <CaptionImage
          style={styles.image}
          url="https://image.tmdb.org/t/p/w185/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
          width={185}
          orientation="portrait"
        />
        <CaptionImage
          style={styles.image}
          url="https://image.tmdb.org/t/p/w185/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
          width={185}
          orientation="portrait"
          title="Monster Hunter"
        />
        <CaptionImage
          style={styles.image}
          url="https://image.tmdb.org/t/p/w185/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
          width={185}
          orientation="portrait"
          title="Monster Hunter"
          description="Action, Fantasy"
        />
      </View>

      <View style={styles.container}>
        <Text variant="captionHeadingRegular">Landscape</Text>
        <CaptionImage
          style={styles.image}
          url="https://image.tmdb.org/t/p/w500/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
          height={185}
          orientation="landscape"
        />
        <CaptionImage
          style={styles.image}
          url="https://image.tmdb.org/t/p/w500/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
          height={185}
          orientation="landscape"
          title="Monster Hunter"
        />
        <CaptionImage
          style={styles.image}
          url="https://image.tmdb.org/t/p/w500/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"
          height={185}
          orientation="landscape"
          title="Monster Hunter"
          description="Action, Thriller"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  image: {
    marginBottom: 16,
  },
});
