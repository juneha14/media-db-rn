import { useEffect, useRef } from "react";

const PosterSize = {
  XSmall: "w92",
  Small: "w154",
  Medium: "w185",
  Large: "w342",
  XLarge: "w500",
  Original: "original",
} as const;

const BackdropSize = {
  Small: "w300",
  Medium: "w780",
  Large: "w1280",
  Original: "original",
} as const;

const ProfileSize = {
  Small: "w45",
  Medium: "w185",
  Large: "h632",
  Original: "original",
} as const;

const ImageSize = {
  poster: PosterSize,
  backdrop: BackdropSize,
  profile: ProfileSize,
};
type ImageType = keyof typeof ImageSize;

const baseUrl = "https://image.tmdb.org/t/p/";

export function useImageUrl<
  T extends ImageType,
  S extends keyof typeof ImageSize[T]
>(type: T, size: S, path: string): string {
  const url = useRef("");

  useEffect(() => {
    const sizePath = ImageSize[type][size];
    url.current = baseUrl + sizePath + path;
  }, [type, size, path]);

  return url.current;
}
