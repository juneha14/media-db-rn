export interface Images {
  id: number;
  backdrops: Image[];
  posters: Image[];
}

interface Image {
  aspectRatio: number;
  filePath: string;
  height: number;
  width: number;
}
