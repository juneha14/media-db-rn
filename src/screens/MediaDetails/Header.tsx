import React, { useCallback } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Box } from "../../components/Box";
import { FavouriteIcon, PlayIcon, StarIcon } from "../../components/Icons";
import { PageHeader, Text } from "../../components/Typography";
import { Rating } from "../../components/Rating";
import { TagList } from "../../components/Tags";
import { Section } from "../../components/Section";
import { Colors, Spacing } from "../../components/theme";
import { formatMinutesToHM } from "../../utils";
import { Genre } from "../../models";

interface HeaderProps {
  id: number;
  title: string;
  releaseDate: string;
  runtime: number | null;
  rating: number;
  ratingsCount: number;
  tagline: string | null;
  overview: string | null;
  genres: Genre[];
  trailer?: string;
  isLiked?: boolean;
  canAddRating?: boolean;
  onSelectGenre: (genre: Genre) => void;
  onSelectFavourite: () => void;
  onSelectPlayTrailer?: (url: string) => void;
  onSelectAddRating?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  releaseDate,
  runtime,
  rating,
  ratingsCount,
  tagline,
  overview,
  genres,
  trailer,
  isLiked = false,
  canAddRating = false,
  onSelectGenre,
  onSelectFavourite,
  onSelectPlayTrailer,
  onSelectAddRating,
  style,
}) => {
  const infoText = runtime
    ? `${releaseDate} ∙ ${formatMinutesToHM(runtime)}`
    : releaseDate;

  const onGenrePress = useCallback(
    (genre: Genre) => () => onSelectGenre(genre),
    [onSelectGenre]
  );

  const onPlayTrailer = useCallback(
    (url?: string) => () => {
      if (url && onSelectPlayTrailer) onSelectPlayTrailer(url);
    },
    [onSelectPlayTrailer]
  );

  return (
    <Box style={style}>
      <PageHeader
        style={styles.titleHeader}
        title={title}
        subtitle={infoText}
      />
      <TagList
        style={styles.genresContainer}
        tags={genres.map((genre) => ({
          title: genre.name,
          borderColor: Colors.ActionPrimary,
          onPress: onGenrePress(genre),
        }))}
      />
      <Box style={styles.buttonsContainer}>
        <Box style={{ alignItems: "center" }}>
          <Rating style={{ marginBottom: Spacing.s }} rating={rating} />
          <Text variant="body">{`${ratingsCount} reviews`}</Text>
        </Box>
        <FavouriteIcon
          iconSize="medium"
          encloseInBorder
          caption="Favourite"
          selected={isLiked}
          onPress={onSelectFavourite}
        />
        {trailer && (
          <PlayIcon
            iconSize="medium"
            caption="Play Trailer"
            onPress={onPlayTrailer(trailer)}
          />
        )}
        {canAddRating && (
          <StarIcon
            size="medium"
            encloseInBorder
            caption="Rate It"
            onPress={onSelectAddRating}
          />
        )}
      </Box>
      <Section title="Overview">
        {tagline && tagline.length > 0 ? (
          <Text
            style={{
              fontStyle: "italic",
              fontWeight: "500",
              marginBottom: Spacing.s,
            }}
            variant="body"
          >
            {tagline}
          </Text>
        ) : null}
        <Text variant="body">{overview}</Text>
      </Section>
    </Box>
  );
};

const styles = StyleSheet.create({
  titleHeader: {
    marginVertical: Spacing.m,
  },
  genresContainer: {
    marginBottom: Spacing.l,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: Spacing.xl,
  },
});
