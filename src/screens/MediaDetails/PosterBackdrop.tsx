import React from "react";
import { StyleProp, ViewStyle, Dimensions } from "react-native";
import { Image } from "../../components/Image";
import { Spacing } from "../../components/theme";
import { useImageUri } from "../../hooks";

interface PosterBackdropProps {
  posterUrl: string | null;
  backdropUrl: string | null;
}

export const PosterBackdrop: React.FC<PosterBackdropProps> = React.memo(
  ({ posterUrl, backdropUrl }) => {
    const posterUri = useImageUri("poster", "Medium", posterUrl);
    const backdropUri = useImageUri("backdrop", "Large", backdropUrl);

    if (!posterUrl && !backdropUrl) return null;

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
  }
);
