import React, { useCallback } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { noop, isNull } from "lodash";
import { Section } from "../../components/Section";
import { Carousel } from "../../components/Carousel";
import { CaptionImage } from "../../components/CaptionImage";
import { Text } from "../../components/Typography";
import { Colors, Spacing } from "../../components/theme";
import { MediaCell } from "../shared";
import { Header } from "./Header";
import { PosterBackdrop } from "./PosterBackdrop";
import { Cast, MovieDetails, Movie, VideoLink, Genre } from "../../models";
import { useImageUri } from "../../hooks";
import { GalleryImage } from "../Gallery/utils";
import { RatedMedia } from "../Reviews";

interface MediaDetailsViewProps {
  infoDetails: MovieDetails & {
    isLiked?: boolean;
    canRate?: boolean;
    ratingDetails: RatedMedia | null;
  };
  cast?: Cast[];
  recommendations?: Movie[];
  videos?: VideoLink[];
  images?: GalleryImage[];
  onSelectGenre: (genre: Genre) => void;
  onSelectFavourite: () => void;
  onSelectPlayTrailer?: (url: string) => void;
  onSelectAddRating?: (
    id: number,
    title: string,
    url: string | null,
    ratingDetails: RatedMedia | null
  ) => void;
  onSelectCast: (id: number) => void;
  onSelectRecommended: (id: number) => void;
  onSelectSeeAllCast: () => void;
  onSelectSeeAllRecommended: () => void;
  onSelectPosterBackdrop: (images: GalleryImage[]) => void;
}

export const MediaDetailsView: React.FC<MediaDetailsViewProps> = ({
  infoDetails,
  cast,
  recommendations,
  videos,
  images,
  onSelectGenre,
  onSelectFavourite,
  onSelectPlayTrailer,
  onSelectAddRating,
  onSelectCast,
  onSelectRecommended,
  onSelectSeeAllCast,
  onSelectSeeAllRecommended,
  onSelectPosterBackdrop,
}) => {
  const renderCast = useCallback(
    ({ item }: { item: Cast }) => {
      return (
        <CastView
          style={{ marginRight: Spacing.m }}
          name={item.name}
          character={item.character}
          profilePath={item.profilePath}
          onPress={() => onSelectCast(item.id)}
        />
      );
    },
    [onSelectCast]
  );

  const renderRecommendations = useCallback(
    ({ item }: { item: Movie }) => {
      return (
        <MediaCell
          style={{ marginRight: Spacing.m }}
          id={item.id}
          title={item.title}
          releaseDate={item.releaseDate}
          rating={item.voteAverage}
          mediaImgType="backdrop"
          mediaImgUrl={item.backdropPath}
          width={260}
          onPress={() => onSelectRecommended(item.id)}
        />
      );
    },
    [onSelectRecommended]
  );

  const onPressAddRating = useCallback(
    (
      id: number,
      title: string,
      url: string | null,
      ratingDetails: RatedMedia | null
    ) => () =>
      onSelectAddRating
        ? onSelectAddRating(id, title, url, ratingDetails)
        : noop,
    [onSelectAddRating]
  );

  return (
    <>
      <PosterBackdrop
        posterUrl={infoDetails.posterPath}
        backdropUrl={infoDetails.backdropPath}
        onPress={() => (images ? onSelectPosterBackdrop(images) : noop)}
      />
      <Header
        style={{
          paddingHorizontal: Spacing.defaultMargin,
          paddingBottom: Spacing.l,
          backgroundColor: Colors.SurfaceForeground,
        }}
        id={infoDetails.id}
        title={infoDetails.title}
        releaseDate={infoDetails.releaseDate}
        runtime={infoDetails.runtime}
        rating={infoDetails.voteAverage}
        ratingsCount={infoDetails.voteCount}
        trailer={videos?.find((video) => video.type === "Trailer")?.url}
        tagline={infoDetails.tagline}
        overview={infoDetails.overview}
        genres={infoDetails.genres}
        isLiked={infoDetails.isLiked}
        canAddRating={infoDetails.canRate}
        isRated={!isNull(infoDetails.ratingDetails)}
        onSelectGenre={onSelectGenre}
        onSelectFavourite={onSelectFavourite}
        onSelectPlayTrailer={onSelectPlayTrailer}
        onSelectAddRating={onPressAddRating(
          infoDetails.id,
          infoDetails.title,
          infoDetails.posterPath,
          infoDetails.ratingDetails
        )}
      />
      <Section
        style={{
          paddingHorizontal: Spacing.defaultMargin,
          marginTop: Spacing.l,
        }}
        title="Cast"
        accessoryTitle={cast?.length ?? 0 > 0 ? "See all" : undefined}
        onAccessoryPress={onSelectSeeAllCast}
      >
        <Carousel
          keyExtractor={(item) => String(item.id)}
          data={cast}
          renderItem={renderCast}
          ListEmptyComponent={
            <Text variant="body">Cast information unavailable</Text>
          }
        />
      </Section>
      <Section
        style={{
          paddingHorizontal: Spacing.defaultMargin,
          marginTop: Spacing.l,
        }}
        title="Recommended"
        accessoryTitle={
          recommendations?.length ?? 0 > 0 ? "See all" : undefined
        }
        onAccessoryPress={onSelectSeeAllRecommended}
      >
        <Carousel
          keyExtractor={(item) => String(item.id)}
          data={recommendations}
          renderItem={renderRecommendations}
          ListEmptyComponent={
            <Text variant="body">Recommended movies unavailable</Text>
          }
        />
      </Section>
    </>
  );
};

const CastView = ({
  name,
  character,
  profilePath,
  onPress,
  style,
}: {
  name: string;
  character: string;
  profilePath: string | null;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}) => {
  const uri = useImageUri("profile", "Original", profilePath);
  return (
    <Pressable style={style} onPress={onPress}>
      <CaptionImage
        uri={uri}
        width={120}
        orientation="portrait"
        title={name}
        description={character}
      />
    </Pressable>
  );
};
