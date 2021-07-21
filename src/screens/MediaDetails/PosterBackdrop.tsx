import React from "react";
import { StyleProp, ViewStyle, Dimensions, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "../../components/Image";
import { Spacing } from "../../components/theme";
import { useImageUri } from "../../hooks";

interface PosterBackdropProps {
  posterUrl: string | null;
  backdropUrl: string | null;
  onPress: () => void;
}

export const PosterBackdrop: React.FC<PosterBackdropProps> = React.memo(
  ({ posterUrl, backdropUrl, onPress }) => {
    const posterUri = useImageUri("poster", "Original", posterUrl);
    const backdropUri = useImageUri("backdrop", "Original", backdropUrl);
    const { top } = useSafeAreaInsets();

    if (!posterUrl && !backdropUrl) return null;

    const posterStyle: StyleProp<ViewStyle> = backdropUri
      ? {
          position: "absolute",
          left: 10,
          top: top,
          zIndex: 1,
        }
      : {
          marginVertical: Spacing.l,
          marginHorizontal: Spacing.m,
        };

    return (
      <Pressable onPress={onPress}>
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
            height={180 + top}
            shouldRoundCorners={false}
          />
        )}
      </Pressable>
    );
  }
);
