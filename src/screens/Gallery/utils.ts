export type ImageType = "profile" | "poster" | "backdrop";

export interface GalleryImage {
  path: string;
  width: number;
  height: number;
  type: ImageType;
  orientation: "portrait" | "landscape";
}
