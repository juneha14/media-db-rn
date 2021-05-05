import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Header } from "../MediaDetails/Header";
import { MediaDetailsView } from "../MediaDetails/MediaDetailsView";
import { cast, movieDetails, movies } from "../../../storybook/fixtures";
import { Box } from "../../components/Box";
import { Colors } from "../../components/theme";
import { PosterBackdrop } from "../MediaDetails/PosterBackdrop";
import { ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

storiesOf("Views", module)
  .addDecorator((view) => (
    <Box style={{ backgroundColor: Colors.SurfaceBackground, flex: 1 }}>
      {view()}
    </Box>
  ))
  .add("media details poster backdrop", () => (
    <SafeAreaProvider>
      <PosterBackdrop
        posterUrl="/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg"
        backdropUrl="/jMWkd0fuwbG39eJpzycJzPWMCww.jpg"
      />
    </SafeAreaProvider>
  ))
  .add("media details header", () => (
    <Header
      id={1}
      title="Godzilla vs King Kong, Battle of the ages"
      releaseDate="2021-03-30"
      runtime={99}
      rating={8.5}
      ratingsCount={900}
      hasVideo
      tagline="One will fall"
      overview="In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages"
      genres={[
        { name: "Action", id: 1 },
        { name: "Science Fiction", id: 2 },
      ]}
      onSelectGenre={() =>
        console.log(
          "========== File: MediaDetails.stories.tsx, Line: 25 =========="
        )
      }
      onSelectFavourite={() =>
        console.log(
          "========== File: MediaDetails.stories.tsx, Line: 26 =========="
        )
      }
      onSelectPlayTrailer={() =>
        console.log(
          "========== File: MediaDetails.stories.tsx, Line: 27 =========="
        )
      }
    />
  ));

storiesOf("Views", module)
  .addDecorator((view) => (
    <ScrollView style={{ backgroundColor: Colors.SurfaceBackground }}>
      {view()}
    </ScrollView>
  ))
  .add("media details view", () => (
    <SafeAreaProvider>
      <MediaDetailsView
        infoDetails={movieDetails}
        cast={cast}
        recommendations={movies}
        onSelectGenre={() =>
          console.log(
            "========== File: MediaDetailsView.tsx, Line: 93 =========="
          )
        }
        onSelectFavourite={() =>
          console.log(
            "========== File: MediaDetailsView.tsx, Line: 211 =========="
          )
        }
        onSelectPlayTrailer={() =>
          console.log(
            "========== File: MediaDetailsView.tsx, Line: 212 =========="
          )
        }
        onSelectCast={() =>
          console.log(
            "========== File: MediaDetailsView.tsx, Line: 213 =========="
          )
        }
        onSelectRecommended={() =>
          console.log(
            "========== File: MediaDetailsView.tsx, Line: 214 =========="
          )
        }
        onSelectSeeAllCast={() =>
          console.log(
            "========== File: MediaDetailsView.tsx, Line: 215 =========="
          )
        }
        onSelectSeeAllRecommended={() =>
          console.log(
            "========== File: MediaDetailsView.tsx, Line: 216 =========="
          )
        }
      />
    </SafeAreaProvider>
  ));
