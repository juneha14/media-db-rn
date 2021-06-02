import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Image } from "../Image";
import { ViewPager } from "./ViewPager";
import { FlatList } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { PreviewList } from "../Preview";

const imageUrls = [
  "/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg",
  "/5NxjLfs7Bi07bfZCRl9CCnUw7AA.jpg",
  "/hJuDvwzS0SPlsE6MNFOpznQltDZ.jpg",
  "/fev8UFNFFYsD5q7AcYS8LyTzqwl.jpg",
  "/uQtqiAu2bBlokqjlURVLEha6zoi.jpg",
];
const uri = (url: string) => `https://image.tmdb.org/t/p/original${url}`;

storiesOf("View Pager", module).add("2 pages", () => (
  <ViewPager
    pages={[
      {
        title: "Photos",
        component: (
          <FlatList
            keyExtractor={(item) => item}
            data={imageUrls}
            renderItem={({ item }) => (
              <Image
                uri={uri(item)}
                width={Dimensions.get("window").width}
                orientation="landscape"
              />
            )}
          />
        ),
      },
      {
        title: "Preview List",
        component: (
          <PreviewList
            data={[
              {
                title: "Godzilla vs Kong",
                description: "2021-03-21",
                imgUrl: imageUrls[0],
              },
              {
                title: "Maze Runner 2024",
                description: "2021-02-20",
                imgUrl: imageUrls[1],
              },
              {
                title: "Samurai and the Blue Dragon",
                description: "2020-11-30",
                imgUrl: imageUrls[2],
              },
              {
                title: "Tom and Jerry",
                description: "2021-01-11",
                imgUrl: imageUrls[3],
              },
              {
                title: "Cherry",
                description: "2021-07-11",
                imgUrl: imageUrls[4],
              },
            ]}
          />
        ),
      },
    ]}
  />
));
