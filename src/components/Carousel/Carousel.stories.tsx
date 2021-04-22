import React from "react";
import { storiesOf } from "@storybook/react-native";
import { ContentViewLight } from "../../../storybook/ContentView";
import { Carousel } from "./Carousel";
import { Image } from "../Image";

const imageUrls = [
  "/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg",
  "/5NxjLfs7Bi07bfZCRl9CCnUw7AA.jpg",
  "/hJuDvwzS0SPlsE6MNFOpznQltDZ.jpg",
  "/fev8UFNFFYsD5q7AcYS8LyTzqwl.jpg",
  "/uQtqiAu2bBlokqjlURVLEha6zoi.jpg",
];
const uri = (url: string) => `https://image.tmdb.org/t/p/original${url}`;

const CarouselInternal = ({
  pagingEnabled,
  snapToInterval,
}: {
  pagingEnabled?: boolean;
  snapToInterval?: number;
}) => {
  return (
    <Carousel
      keyExtractor={(item) => item}
      data={imageUrls}
      renderItem={({ item }) => (
        <Image
          style={{ marginRight: 8 }}
          uri={uri(item)}
          width={260}
          orientation="landscape"
        />
      )}
      pagingEnabled={pagingEnabled}
      snapToInterval={snapToInterval}
    />
  );
};

storiesOf("Carousel", module)
  .addDecorator(ContentViewLight)
  .add("paging disabled", () => <CarouselInternal />)
  .add("paging enabled", () => (
    <CarouselInternal pagingEnabled snapToInterval={260 + 8} />
  ));
