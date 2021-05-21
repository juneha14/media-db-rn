import React, { useCallback } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Box } from "../../components/Box";
import { FavouriteIcon, PlayIcon } from "../../components/Icons";
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
  hasVideo: boolean;
  tagline: string | null;
  overview: string | null;
  genres: Genre[];
  isLiked?: boolean;
  onSelectGenre: (id: number) => void;
  onSelectFavourite: () => void;
  onSelectPlayTrailer?: () => void;
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
  hasVideo,
  genres,
  isLiked = false,
  onSelectGenre,
  onSelectFavourite,
  onSelectPlayTrailer,
  style,
}) => {
  const infoText = runtime
    ? `${releaseDate} ∙ ${formatMinutesToHM(runtime)}`
    : releaseDate;

  const onGenrePress = useCallback(
    (id: number) => () => {
      onSelectGenre(id);
    },
    [onSelectGenre]
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
          onPress: onGenrePress(genre.id),
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
        {hasVideo ? (
          <PlayIcon
            iconSize="medium"
            caption="Play Trailer"
            onPress={onSelectPlayTrailer}
          />
        ) : null}
      </Box>
      <Section title="Overview">
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
