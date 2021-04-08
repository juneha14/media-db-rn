import React, { useCallback } from "react";
import { StyleSheet, ViewStyle, StyleProp, Pressable } from "react-native";
import { CaptionImage } from "../../components/CaptionImage";
import { FavouriteIcon } from "../../components/Icons";
import { Rating } from "../../components/Rating";
import { useImageUrl } from "../../hooks";
import { useLayout } from "../../hooks/useLayout";

interface MediaCellProps {
  id: number;
  posterImgUrl: string | null;
  title: string;
  releaseDate: string;
  rating: number;
  width?: number;
  height?: number;
  onPress: (id: number) => void;
  onLikePress: (pressed: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export const MediaCell: React.FC<MediaCellProps> = React.memo(
  ({
    id,
    posterImgUrl,
    title,
    releaseDate,
    rating,
    width,
    height,
    onPress,
    onLikePress,
    style,
  }) => {
    const uri = useImageUrl("poster", "Medium", posterImgUrl);
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
            orientation="portrait"
            title={title}
            description={releaseDate}
            rightAccessory={<Rating rating={rating} />}
          />
        </Pressable>
        <FavouriteIcon
          style={{
            position: "absolute",
            top: cellSize ? cellSize.y + 5 : 0,
            left: cellSize ? cellSize.x + cellSize.width - 27 : 0,
          }}
          size="medium"
          onPress={onLikePress}
        />
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
});
