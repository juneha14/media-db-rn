export interface Videos {
  id: number;
  results: Result[];
}

export interface VideoLink {
  url: string;
  type: VideoType;
}

interface Result {
  id: string;
  key: string;
  name: string;
  site: "YouTube";
  size: 360 | 480 | 720 | 1080;
  type: VideoType;
}

type VideoType =
  | "Trailer"
  | "Teaser Clip"
  | "Featurette"
  | "Behind the Scenes"
  | "Bloopers";
