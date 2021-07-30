export interface MovieImages {
  id: number;
  backdrops: Image[];
  posters: Image[];
}

export interface PersonImages {
  id: number;
  profiles: Image[];
}

interface Image {
  aspectRatio: number;
  filePath: string;
  height: number;
  width: number;
}
