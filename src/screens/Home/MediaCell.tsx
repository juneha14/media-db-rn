import React, { useCallback } from "react";
import { ViewStyle, StyleProp, Pressable } from "react-native";
import { CaptionImage } from "../../components/CaptionImage";
import { FavouriteIcon } from "../../components/Icons";
import { Rating } from "../../components/Rating";
import { useImageUri, useLayout } from "../../hooks";

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
  onLikePress?: () => void;
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
    const uri = useImageUri(
      mediaImgType === "poster" ? "poster" : "backdrop",
      "Original",
      mediaImgUrl
    );
    const [cellSize, onCellLayout] = useLayout();
    const [imageSize, onImageLayout] = useLayout();
    const onPressed = useCallback(
      (id: number) => () => {
        onPress(id);
      },
      [onPress]
    );

    return (
      <>
        <Pressable
          style={[style, { width: imageSize?.width }]}
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
            onViewLayout={onImageLayout}
          />
        </Pressable>
        {onLikePress && (
          <FavouriteIcon
            style={{
              position: "absolute",
              top: cellSize ? cellSize.y + 5 : 0,
              left:
                cellSize && imageSize ? cellSize.x + imageSize.width - 27 : 0,
            }}
            iconSize="medium"
            onPress={onLikePress}
          />
        )}
      </>
    );
  }
);
