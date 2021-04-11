import React from "react";
import { Header } from "../../../src/screens/MediaDetails/Header";

export const MediaDetailsHeader: React.FC = () => {
  return (
    <Header
      id={1}
      title="Godzilla vs King Kong, Battle of the ages"
      releaseDate="2021-03-30"
      runtime={99}
      rating={8.5}
      ratingsCount={900}
      hasVideo
      posterImgUrl="/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg"
      backdropImgUrl="/jMWkd0fuwbG39eJpzycJzPWMCww.jpg"
      tagline="One will fall"
      overview="In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages"
      genres={["Action", "Science Fiction"]}
      onSelectGenre={(genre) => console.log("==== Value of genre:", genre)}
    />
  );
};
