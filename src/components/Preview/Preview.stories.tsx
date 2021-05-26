import React from "react";
import { storiesOf } from "@storybook/react-native";
import { ContentViewDark } from "../../../storybook/ContentView";
import { ContentPreview } from "./ContentPreview";
import { PreviewList } from "./PreviewList";
import { FavouriteIcon } from "../Icons";
import { Rating } from "../Rating";

const url = "/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg";

storiesOf("Preview", module)
  .addDecorator(ContentViewDark)
  .add("title - rounded preview", () => (
    <ContentPreview imgUrl={url} title="Godzilla vs Kong" roundImage />
  ))
  .add("title - non rounded preview", () => (
    <ContentPreview imgUrl={url} title="Godzilla vs Kong" />
  ))
  .add("title, short description", () => (
    <ContentPreview
      imgUrl={url}
      title="Godzilla vs Kong"
      description="2021-03-31"
    />
  ))
  .add("title, long description", () => (
    <ContentPreview
      imgUrl={url}
      title="Godzilla vs Kong"
      description="In this battle of the ages, Godzilla and Kong will fight it out once and for all to see who is the king of Earth."
    />
  ))
  .add("title, description, favourite accessory", () => (
    <ContentPreview
      imgUrl={url}
      title="Godzilla vs Kong"
      description="2021-03-30"
      rightAccessory={<FavouriteIcon iconSize="medium" />}
    />
  ))
  .add("title, description, rating accessory", () => (
    <ContentPreview
      imgUrl={url}
      title="Godzilla vs Kong"
      description="2021-03-30"
      rightAccessory={<Rating rating={8.1} />}
    />
  ))
  .add("preview list", () => (
    <PreviewList
      data={[
        {
          title: "Godzilla vs Kong",
          description: "2021-03-20",
          imgUrl: url,
          rightAccessory: <FavouriteIcon iconSize="medium" />,
        },
        {
          title: "Godzilla vs Kong",
          description: "2021-03-20",
          imgUrl: url,
          rightAccessory: <FavouriteIcon iconSize="medium" />,
        },
        {
          title: "Godzilla vs Kong",
          description: "2021-03-20",
          imgUrl: url,
          rightAccessory: <FavouriteIcon iconSize="medium" />,
        },
        {
          title: "Godzilla vs Kong",
          description: "2021-03-20",
          imgUrl: url,
          rightAccessory: <FavouriteIcon iconSize="medium" />,
        },
      ]}
    />
  ));
