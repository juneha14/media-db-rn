import React from "react";
import { StyleSheet, StyleProp, ViewStyle, Dimensions } from "react-native";
import { Box } from "../../components/Box";
import { FavouriteIcon, PlayIcon } from "../../components/Icons";
import { Image } from "../../components/Image";
import { PageHeader } from "../../components/PageHeader";
import { Rating } from "../../components/Rating";
import { Text } from "../../components/Text";
import { Colors, Spacing } from "../../components/theme";
import { useImageUrl } from "../../hooks";
import { noop } from "lodash";

interface HeaderProps {
  id: number;
  title: string;
  releaseDate: string;
  runtime: number | null;
  rating: number;
  ratingsCount: number;
  posterImgUrl: string | null;
  backdropImgUrl: string | null;
  tagline: string | null;
  overview: string | null;
  genres: string[];
  hasVideo: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Header: React.FC<HeaderProps> = ({
  id,
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
  hasVideo,
  style,
}) => {
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
        style={{ marginVertical: Spacing.l }}
        title={title}
        subtitle={releaseDate}
      />
      <Box
        id="buttons"
        style={{ flexDirection: "row", justifyContent: "space-evenly" }}
      >
        <Box id="ratings" style={{ alignItems: "center" }}>
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
          <PlayIcon
            iconSize="medium"
            caption="Play Trailer"
            onPress={() =>
              console.log("========== File: Header.tsx, Line: 75 ==========")
            }
          />
        ) : null}
      </Box>
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

const styles = StyleSheet.create({});
