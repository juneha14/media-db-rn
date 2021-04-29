import React, { useCallback } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Section } from "../../components/Section";
import { Carousel } from "../../components/Carousel";
import { CaptionImage } from "../../components/CaptionImage";
import { Text } from "../../components/Typography";
import { Container } from "../../components/Container";
import { Spacing } from "../../components/theme";
import { Header } from "./Header";
import { PosterBackdrop } from "./PosterBackdrop";
import { MediaCell } from "../Home/MediaCell";
import { Cast, MovieDetails, Movie } from "../../models";
import { useImageUri } from "../../hooks";
import { Box } from "../../components/Box";

interface MediaDetailsViewProps {
  infoDetails: MovieDetails;
  cast?: Cast[];
  recommendations?: Movie[];
  onSelectGenre: (id: number) => void;
  onSelectFavourite: () => void;
  onSelectPlayTrailer?: () => void;
  onSelectCast: (id: number) => void;
  onSelectRecommended: (id: number) => void;
  onSelectSeeAllCast: () => void;
  onSelectSeeAllRecommended: () => void;
  style?: StyleProp<ViewStyle>;
}

export const MediaDetailsView: React.FC<MediaDetailsViewProps> = ({
  infoDetails,
  cast,
  recommendations,
  onSelectGenre,
  onSelectFavourite,
  onSelectPlayTrailer,
  onSelectCast,
  onSelectRecommended,
  onSelectSeeAllCast,
  onSelectSeeAllRecommended,
  style,
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

  return (
    <Box style={style}>
      <PosterBackdrop
        posterUrl={infoDetails.posterPath}
        backdropUrl={infoDetails.backdropPath}
      />
      <Container ignoreTopPadding>
        <Header
          style={{ marginBottom: Spacing.l }}
          id={infoDetails.id}
          title={infoDetails.title}
          releaseDate={infoDetails.releaseDate}
          runtime={infoDetails.runtime}
          rating={infoDetails.voteAverage}
          ratingsCount={infoDetails.voteCount}
          hasVideo={infoDetails.video}
          tagline={infoDetails.tagline}
          overview={infoDetails.overview}
          genres={infoDetails.genres}
          onSelectGenre={onSelectGenre}
          onSelectFavourite={onSelectFavourite}
          onSelectPlayTrailer={onSelectPlayTrailer}
        />
        <Section
          style={{ marginBottom: Spacing.l }}
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
      </Container>
    </Box>
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
