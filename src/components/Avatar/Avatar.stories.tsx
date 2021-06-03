import React from "react";
import { storiesOf } from "@storybook/react-native";
import { ContentViewDark } from "../../../storybook/ContentView";
import { Avatar } from "./Avatar";
import { CreditsDetailsScreen } from "../../screens/Credits";

const url = "/yzfxLMcBMusKzZp9f1Z9Ags8WML.jpg";

storiesOf("Avatar", module)
  .addDecorator(ContentViewDark)
  .add("avatar", () => {
    return <Avatar url={url} size={150} />;
  })
  .add("avatar with right title", () => {
    return (
      <Avatar
        url={url}
        size={150}
        title="Millie Bobby Brown"
        subtitle="Actor"
        textPosition="right"
      />
    );
  })
  .add("avatar with bottom title", () => {
    return (
      <Avatar
        url={url}
        size={150}
        title="Millie Bobby Brown"
        subtitle="Actor"
        textPosition="bottom"
      />
    );
  })
  .add("screen", () => {
    return <CreditsDetailsScreen />;
  });
