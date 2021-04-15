import React, { useCallback } from "react";
import { StyleSheet, ViewStyle, StyleProp, Pressable } from "react-native";
import { CaptionImage } from "../../components/CaptionImage";
import { FavouriteIcon } from "../../components/Icons";
import { Rating } from "../../components/Rating";
import { useImageUrl } from "../../hooks";
import { useLayout } from "../../hooks/useLayout";

interface MediaCellProps {
  id: number;
  mediaImgType: "poster" | "backdrop";
  mediaImgUrl: string | null;
  title: string;
  releaseDate: string;
  rating: number;
  width?: number;
  height?: number;
  onPress: (id: number) => void;
  onLikePress?: (pressed: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export const MediaCell: React.FC<MediaCellProps> = React.memo(
  ({
    id,
    mediaImgType,
    mediaImgUrl,
    title,
    releaseDate,
    rating,
    width,
    height,
    onPress,
    onLikePress,
    style,
  }) => {
    const uri = useImageUrl(
      mediaImgType === "poster" ? "poster" : "backdrop",
      "Medium",
      mediaImgUrl
    );
    const [cellSize, onCellLayout] = useLayout();
    const onPressed = useCallback(
      (id: number) => () => {
        onPress(id);
      },
      [onPress]
    );

    return (
      <>
        <Pressable
          style={[styles.container, style]}
          onPress={onPressed(id)}
          onLayout={onCellLayout}
        >
          <CaptionImage
            uri={uri}
            width={width}
            height={height}
            orientation={mediaImgType === "poster" ? "portrait" : "landscape"}
            title={title}
            description={releaseDate}
            rightAccessory={<Rating rating={rating} />}
          />
        </Pressable>
        {onLikePress && (
          <FavouriteIcon
            style={{
              position: "absolute",
              top: cellSize ? cellSize.y + 5 : 0,
              left: cellSize ? cellSize.x + cellSize.width - 27 : 0,
            }}
            iconSize="medium"
            onPress={onLikePress}
          />
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
});
