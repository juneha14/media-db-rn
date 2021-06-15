import React from "react";
import { storiesOf } from "@storybook/react-native";
import { ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "../Credits/components/Header";
import { KnownForList } from "../Credits/components/KnownForList";
import { Colors } from "../../components/theme";
import { knownForMedias } from "../../../storybook/fixtures";

const profileUrl = "/yzfxLMcBMusKzZp9f1Z9Ags8WML.jpg";

storiesOf("Views", module)
  .addDecorator((view) => (
    <ScrollView style={{ backgroundColor: Colors.SurfaceBackground }}>
      {view()}
    </ScrollView>
  ))
  .add("credit details header", () => (
    <SafeAreaProvider>
      <Header
        imgUrl={profileUrl}
        name="Millie Bobby Brown"
        department="Acting"
        socialMediaLinks={[
          { type: "facebook", url: "facebook.com" },
          { type: "twitter", url: "twitter.com" },
          { type: "instagram", url: "instagram.com" },
        ]}
        biography="Millie Bobby Brown (born 19 February 2004) is an English actress and producer. She was born in Spain, to British parents. They moved to Orlando, Florida in 2011, where Millie went to acting workshops to pass the time on a Saturday, and it was there that a top Hollywood talent scout called and told Millie's parents that 'she has instincts you cannot teach.' She advised Millie's parents that Millie could 'mix it with the best kids in Hollywood'."
        birthday="2004-02-19"
        birthPlace="Marbella, Málaga, Andalusia, Spain"
        popularity={10.13}
        onSocialMediaLinkPress={(url) => console.log("==== Value of url:", url)}
      />
    </SafeAreaProvider>
  ))
  .add("credit details known for list", () => (
    <KnownForList
      media={knownForMedias}
      onSelectMedia={(id) => console.log("==== Value of id:", id)}
    />
  ));
