import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { QueryContainer } from "../../components/QueryContainer";
import { MediaDetailsView } from "./MediaDetailsView";
import { useMediaDetails } from "./useMediaDetails";
import { Colors } from "../../components/theme";
import { DiscoverParamList } from "../../navigation";
import { StackNavigationProp } from "@react-navigation/stack";

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
  } = useMediaDetails(id);

  const onSelectGenre = useCallback((genreId: number) => {
    console.log("==== Value of genreId:", genreId);
  }, []);

  const onSelectFavourite = useCallback(() => {
    console.log("========== File: MediaDetailsScreen.tsx, Line: 16 ==========");
  }, []);

  const onSelectPlayTrailer = useCallback(() => {
    console.log("========== File: MediaDetailsScreen.tsx, Line: 19 ==========");
  }, []);

  const onSelectCast = useCallback((castId: number) => {
    console.log("==== Value of castId:", castId);
  }, []);

  const onSelectRecommended = useCallback(
    (id: number) => {
      push("MediaDetails", { id });
    },
    [push]
  );

  const onSelectSeeAllCast = useCallback(() => {
    console.log("========== File: MediaDetailsScreen.tsx, Line: 28 ==========");
  }, []);

  const onSelectSeeAllRecommended = useCallback(() => {
    console.log("========== File: MediaDetailsScreen.tsx, Line: 31 ==========");
  }, []);

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
          onSelectFavourite={onSelectFavourite}
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
