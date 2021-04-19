import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { PaginatedList } from "./PaginatedList";
import { Image } from "../Image";

const imageUrls = [
  "/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg",
  "/5NxjLfs7Bi07bfZCRl9CCnUw7AA.jpg",
  "/hJuDvwzS0SPlsE6MNFOpznQltDZ.jpg",
  "/fev8UFNFFYsD5q7AcYS8LyTzqwl.jpg",
  "/uQtqiAu2bBlokqjlURVLEha6zoi.jpg",
];
const uri = (url: string) => `https://image.tmdb.org/t/p/original${url}`;

const PaginatedListInternal = () => {
  const [data, setData] = useState(imageUrls);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <PaginatedList
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      keyExtractor={(item, index) => item + index}
      isLoading={loading}
      isFetching={fetching}
      data={data}
      renderItem={({ item }) => (
        <Image
          style={{ marginVertical: 8 }}
          uri={uri(item)}
          width={Dimensions.get("window").width - 32}
          orientation="landscape"
        />
      )}
      onEndReached={() => {
        setFetching(true);
        setTimeout(() => {
          setData((prev) => [...prev, ...imageUrls]);
          setFetching(false);
        }, 1000);
      }}
    />
  );
};

storiesOf("Paginated List", module).add("paginated list", () => (
  <PaginatedListInternal />
));
