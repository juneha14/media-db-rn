import React, { useCallback } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiscoverParamList } from "../../navigation";
import * as WebBrowser from "expo-web-browser";
import { QueryContainer } from "../../components/QueryContainer";
import { MediaDetailsView } from "./MediaDetailsView";
import { useMediaDetails } from "./useMediaDetails";
import { Favourite } from "../../models";
import { BackNavigationButton } from "../shared";

export const MediaDetailsScreen: React.FC = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<DiscoverParamList, "MediaDetails">>();
  const { push, pop } = useNavigation<StackNavigationProp<DiscoverParamList>>();

  const {
    loading,
    error,
    details,
    cast,
    recommendations,
    videos,
    refetch,
    onToggleLike,
  } = useMediaDetails(id);

  const onSelectGenre = useCallback(
    (genreId: number) =>
      push("GenreDetails", { genre: { id: genreId, name: "Action" } }),
    [push]
  );

  const onSelectFavourite = useCallback(
    (favourite: Favourite) => () => {
      onToggleLike(favourite);
    },
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
    (id: number) => {
      push("MediaDetails", { id });
    },
    [push]
  );

  const onSelectSeeAllCast = useCallback(() => {
    push("CreditList", { id });
  }, [push, id]);

  const onSelectSeeAllRecommended = useCallback(() => {
    push("RecommendedList", { id });
  }, [push, id]);

  const onNavigateBack = useCallback(() => {
    pop();
  }, [pop]);

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
          />
        )}
      </QueryContainer>
    </>
  );
};
