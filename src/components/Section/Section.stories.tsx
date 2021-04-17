import React from "react";
import { storiesOf } from "@storybook/react-native";
import { ContentViewDark } from "../../../storybook/ContentView";
import { Section } from "./Section";
import { Carousel } from "../Carousel";
import { Image } from "../Image";

const imageUrls = [
  "/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg",
  "/5NxjLfs7Bi07bfZCRl9CCnUw7AA.jpg",
  "/hJuDvwzS0SPlsE6MNFOpznQltDZ.jpg",
  "/fev8UFNFFYsD5q7AcYS8LyTzqwl.jpg",
  "/uQtqiAu2bBlokqjlURVLEha6zoi.jpg",
];
const uri = (url: string) => `https://image.tmdb.org/t/p/original${url}`;

const CarouselInternal = () => {
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
    />
  );
};
storiesOf("Section", module)
  .addDecorator(ContentViewDark)
  .add("section without accessory", () => (
    <Section title="Recommended">
      <CarouselInternal />
    </Section>
  ))
  .add("section with accessory", () => (
    <Section
      title="Recommended"
      accessoryTitle="See all"
      onAccessoryPress={() =>
        console.log("========== File: Section.stories.tsx, Line: 41 ==========")
      }
    >
      <CarouselInternal />
    </Section>
  ));
