import React, { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { QueryContainer } from "../../components/QueryContainer";
import { MediaDetailsView } from "./MediaDetailsView";
import { useMediaDetails } from "./useMediaDetails";
import { Favourite, Genre } from "../../models";
import { BackNavigationButton } from "../shared";
import { useAppStackNavigation, useRouteParams } from "../../hooks";
import { GalleryImage } from "../Gallery/utils";

export const MediaDetailsScreen: React.FC = () => {
  const {
    params: { id },
  } = useRouteParams<"MediaDetails">();
  const { push, pop } = useAppStackNavigation();

  const {
    loading,
    error,
    details,
    cast,
    recommendations,
    videos,
    images,
    refetch,
    onToggleLike,
  } = useMediaDetails(id);

  const onSelectGenre = useCallback(
    (genre: Genre) => push("GenreDetails", { genre }),
    [push]
  );

  const onSelectFavourite = useCallback(
    (favourite: Favourite) => () => onToggleLike(favourite),
    [onToggleLike]
  );

  const onSelectPlayTrailer = useCallback(
    (url: string) => WebBrowser.openBrowserAsync(url),
    []
  );

  const onSelectCast = useCallback(
    (castId: number) => push("CreditDetails", { id: castId }),
    [push]
  );

  const onSelectRecommended = useCallback(
    (id: number) => push("MediaDetails", { id }),
    [push]
  );

  const onSelectSeeAllCast = useCallback(() => push("CreditList", { id }), [
    push,
    id,
  ]);

  const onSelectSeeAllRecommended = useCallback(
    () => push("RecommendedList", { id }),
    [push, id]
  );

  const onSelectPosterBackdrop = useCallback(
    (images: GalleryImage[]) => push("GalleryList", { images }),
    [push]
  );

  const onNavigateBack = useCallback(() => pop(), [pop]);

  return (
    <>
      <BackNavigationButton onNavigateBack={onNavigateBack} />
      <QueryContainer
        wrapperStyle="wrapped"
        isLoading={loading}
        isErrored={error !== undefined || !details}
        onRetryQuery={refetch}
      >
        {details && (
          <MediaDetailsView
            infoDetails={details}
            cast={cast}
            recommendations={recommendations}
            videos={videos}
            images={images}
            onSelectGenre={onSelectGenre}
            onSelectFavourite={onSelectFavourite({
              id: details.id,
              title: details.title,
              posterPath: details.posterPath,
              backdropPath: details.backdropPath,
              releaseDate: details.releaseDate,
              voteAverage: details.voteAverage,
            })}
            onSelectPlayTrailer={onSelectPlayTrailer}
            onSelectCast={onSelectCast}
            onSelectRecommended={onSelectRecommended}
            onSelectSeeAllCast={onSelectSeeAllCast}
            onSelectSeeAllRecommended={onSelectSeeAllRecommended}
            onSelectPosterBackdrop={onSelectPosterBackdrop}
          />
        )}
      </QueryContainer>
    </>
  );
};
