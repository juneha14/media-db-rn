import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { QueryContainer } from "../../components/QueryContainer";
import { MediaDetailsView } from "./MediaDetailsView";
import { useMediaDetails } from "./useMediaDetails";
import { Colors } from "../../components/theme";
import { DiscoverParamList } from "../../navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { Favourite } from "../../models";

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
    refetch,
    onToggleLike,
  } = useMediaDetails(id);

  const onSelectGenre = useCallback((genreId: number) => {
    console.log("==== Value of genreId:", genreId);
  }, []);

  const onSelectFavourite = useCallback(
    (favourite: Favourite) => () => {
      onToggleLike(favourite);
    },
    [onToggleLike]
  );

  const onSelectPlayTrailer = useCallback(() => {
    console.log("========== File: MediaDetailsScreen.tsx, Line: 19 ==========");
  }, []);

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
    <QueryContainer
      wrapperStyle="wrapped"
      isLoading={loading}
      isErrored={error !== undefined || !details}
      onRetryQuery={refetch}
    >
      {details && (
        <MediaDetailsView
          style={styles.container}
          infoDetails={details}
          cast={cast}
          recommendations={recommendations}
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
          onNavigateBack={onNavigateBack}
        />
      )}
    </QueryContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceBackground,
  },
});
