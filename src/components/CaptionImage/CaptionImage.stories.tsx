import React from "react";
import { storiesOf } from "@storybook/react-native";
import { CaptionImage } from "./CaptionImage";
import { Rating } from "../Rating";
import { ContentViewDark } from "../../../storybook/ContentView";

const uri =
  "https://image.tmdb.org/t/p/original/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg";

storiesOf("Caption Image", module)
  .addDecorator(ContentViewDark)
  .add("portrait", () => (
    <CaptionImage
      uri={uri}
      width={200}
      orientation="portrait"
      title="Godzilla vs Kong"
      description="2020-03-30"
    />
  ))
  .add("landscape", () => (
    <CaptionImage
      uri={uri}
      height={200}
      orientation="landscape"
      title="Godzilla vs Kong"
      description="2020-03-30"
    />
  ))
  .add("portrait with right accessory", () => (
    <CaptionImage
      uri={uri}
      width={200}
      orientation="portrait"
      title="Godzilla vs Kong"
      description="2020-03-30"
      rightAccessory={<Rating rating={8.5} />}
    />
  ))
  .add("landscape with right accessory", () => (
    <CaptionImage
      uri={uri}
      height={200}
      orientation="landscape"
      title="Godzilla vs Kong"
      description="2020-03-30"
      rightAccessory={<Rating rating={8.5} />}
    />
  ));
