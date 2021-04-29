import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { Box } from "../Box";
import { Text } from "../Typography";
import { QueryContainer } from "./QueryContainer";
import { Colors } from "../theme";
import { Image } from "../Image";

const imageUrls = [
  "/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg",
  "/5NxjLfs7Bi07bfZCRl9CCnUw7AA.jpg",
  "/hJuDvwzS0SPlsE6MNFOpznQltDZ.jpg",
  "/fev8UFNFFYsD5q7AcYS8LyTzqwl.jpg",
  "/uQtqiAu2bBlokqjlURVLEha6zoi.jpg",
];
const uri = (url: string) => `https://image.tmdb.org/t/p/original${url}`;

const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text variant="captionHeadingRegular">{title}</Text>
    </TouchableOpacity>
  );
};

const Content = ({
  imageUrls,
  onShowLoading,
  onShowError,
  onShowMore,
}: {
  imageUrls: string[];
  onShowLoading: () => void;
  onShowError: () => void;
  onShowMore: () => void;
}) => {
  return (
    <Box style={styles.background}>
      <Box style={styles.buttonContainer}>
        <Button title="Show loading" onPress={onShowLoading} />
        <Button title="Show error" onPress={onShowError} />
        <Button title="Show more" onPress={onShowMore} />
      </Box>
      {imageUrls.map((url, index) => {
        const imageUri = uri(url);
        return (
          <Image
            style={styles.image}
            key={imageUri + index}
            uri={imageUri}
            width={Dimensions.get("window").width}
            orientation="landscape"
          />
        );
      })}
    </Box>
  );
};

const WrappedContainerInternal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [urls, setUrls] = useState(imageUrls);

  return (
    <QueryContainer
      wrapperStyle="wrapped"
      isLoading={loading}
      isErrored={error}
      onRetryQuery={() => setError(false)}
      isRefreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
          setUrls(imageUrls);
        }, 500);
      }}
    >
      <Content
        imageUrls={urls}
        onShowLoading={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }}
        onShowError={() => setError(true)}
        onShowMore={() => setUrls((urls) => [...urls, ...imageUrls])}
      />
    </QueryContainer>
  );
};

const UnwrappedContainerInternal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [urls, setUrls] = useState(imageUrls);

  return (
    <QueryContainer
      wrapperStyle="unwrapped"
      isLoading={loading}
      isErrored={error}
      onRetryQuery={() => setError(false)}
    >
      <Content
        imageUrls={urls}
        onShowLoading={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }}
        onShowError={() => setError(true)}
        onShowMore={() => setUrls((urls) => [...urls, ...imageUrls])}
      />
    </QueryContainer>
  );
};

storiesOf("Query Container", module)
  .add("wrapped container", () => <WrappedContainerInternal />)
  .add("unwrapped container", () => <UnwrappedContainerInternal />);

const styles = StyleSheet.create({
  background: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.SurfaceBackground,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: Colors.ActionNeutral,
    marginHorizontal: 8,
    padding: 8,
  },
  image: {
    marginBottom: 8,
  },
});
