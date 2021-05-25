import React from "react";
import { storiesOf } from "@storybook/react-native";
import { ContentViewDark } from "../../../storybook/ContentView";
import { ContentPreview } from "./ContentPreview";
import { FavouriteIcon } from "../Icons";

const uri =
  "https://image.tmdb.org/t/p/original/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg";

storiesOf("Content Preview", module)
  .addDecorator(ContentViewDark)
  .add("title - rounded preview", () => (
    <ContentPreview imgUri={uri} title="Godzilla vs Kong" roundImage />
  ))
  .add("title - non rounded preview", () => (
    <ContentPreview imgUri={uri} title="Godzilla vs Kong" />
  ))
  .add("title, short description", () => (
    <ContentPreview
      imgUri={uri}
      title="Godzilla vs Kong"
      description="2021-03-31"
    />
  ))
  .add("title, long description", () => (
    <ContentPreview
      imgUri={uri}
      title="Godzilla vs Kong"
      description="In this battle of the ages, Godzilla and Kong will fight it out once and for all to see who is the king of Earth."
    />
  ))
  .add("title, description, right accessory", () => (
    <ContentPreview
      imgUri={uri}
      title="Godzilla vs Kong"
      description="2021-03-30"
      rightAccessory={<FavouriteIcon iconSize="medium" />}
    />
  ));
