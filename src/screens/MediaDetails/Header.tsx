import React, { useCallback } from "react";
import { StyleSheet, StyleProp, ViewStyle, Dimensions } from "react-native";
import { Box } from "../../components/Box";
import { FavouriteIcon, PlayIcon } from "../../components/Icons";
import { Image } from "../../components/Image";
import { PageHeader } from "../../components/PageHeader";
import { Rating } from "../../components/Rating";
import { Text } from "../../components/Text";
import { TagList } from "../../components/TagList";
import { Section } from "../../components/Section";
import { Colors, Spacing } from "../../components/theme";
import { useImageUrl } from "../../hooks";
import { noop } from "lodash";
import { formatMinutesToHM } from "../../utils";

interface HeaderProps {
  id: number;
  title: string;
  releaseDate: string;
  runtime: number | null;
  rating: number;
  ratingsCount: number;
  hasVideo: boolean;
  posterImgUrl: string | null;
  backdropImgUrl: string | null;
  tagline: string | null;
  overview: string | null;
  genres: string[];
  onSelectGenre: (genre: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  releaseDate,
  runtime,
  rating,
  ratingsCount,
  posterImgUrl,
  backdropImgUrl,
  tagline,
  overview,
  genres,
  onSelectGenre,
  hasVideo,
  style,
}) => {
  const infoText = runtime
    ? `${releaseDate} ∙ ${formatMinutesToHM(runtime)}`
    : releaseDate;

  const onGenrePress = useCallback(
    (genre: string) => () => {
      onSelectGenre(genre);
    },
    [onSelectGenre]
  );

  return (
    <Box
      style={[
        style,
        { flex: 1, backgroundColor: Colors.SurfaceForegroundPressed },
      ]}
    >
      <PosterBackdropContainer
        posterImgUrl={posterImgUrl}
        backdropImgUrl={backdropImgUrl}
      />
      <PageHeader
        style={styles.titleHeader}
        title={title}
        subtitle={infoText}
      />
      <TagList
        style={styles.genresContainer}
        tags={genres.map((genre) => ({
          title: genre,
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
          onPress={noop}
        />
        {hasVideo ? (
          <PlayIcon iconSize="medium" caption="Play Trailer" onPress={noop} />
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

const PosterBackdropContainer = ({
  posterImgUrl,
  backdropImgUrl,
}: {
  posterImgUrl: string | null;
  backdropImgUrl: string | null;
}) => {
  const posterUri = useImageUrl("poster", "Medium", posterImgUrl);
  const backdropUri = useImageUrl("backdrop", "Large", backdropImgUrl);

  if (!posterImgUrl && !backdropImgUrl) return null;

  const posterStyle: StyleProp<ViewStyle> = backdropUri
    ? {
        position: "absolute",
        left: 10,
        top: 15,
        zIndex: 1,
      }
    : {
        marginVertical: Spacing.l,
        marginHorizontal: Spacing.m,
      };

  return (
    <>
      {posterUri && (
        <Image
          style={posterStyle}
          uri={posterUri}
          height={150}
          orientation="portrait"
        />
      )}
      {backdropUri && (
        <Image
          style={{ opacity: 0.65 }}
          uri={backdropUri}
          width={Dimensions.get("window").width}
          height={180}
          shouldRoundCorners={false}
        />
      )}
    </>
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
