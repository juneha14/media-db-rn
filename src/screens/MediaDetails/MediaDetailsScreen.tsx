import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../components/theme";
import { MediaDetailsView } from "./MediaDetailsView";
import { useMediaDetails } from "./useMediaDetails";

export const MediaDetailsScreen: React.FC = () => {
  const { loading, error, details, cast, recommendations } = useMediaDetails(
    399566
  );

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

  const onSelectRecommended = useCallback((movieId: number) => {
    console.log("==== Value of movieId:", movieId);
  }, []);

  const onSelectSeeAllCast = useCallback(() => {
    console.log("========== File: MediaDetailsScreen.tsx, Line: 28 ==========");
  }, []);

  const onSelectSeeAllRecommended = useCallback(() => {
    console.log("========== File: MediaDetailsScreen.tsx, Line: 31 ==========");
  }, []);

  return (
    <MediaDetailsView
      style={styles.container}
      isLoading={loading}
      error={error}
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
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceBackground,
  },
});
