import React, { useCallback } from "react";
import { StyleSheet, ViewStyle, StyleProp, Pressable } from "react-native";
import { CaptionImage } from "../../components/CaptionImage";
import { PressableIcon } from "../../components/PressableIcon";
import { Rating } from "../../components/Rating";
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

export const MediaCell: React.FC<MediaCellProps> = ({
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
          url={posterImgUrl}
          width={width}
          orientation="portrait"
          title={title}
          description={releaseDate}
          rightAccessory={<Rating rating={rating} />}
        />
      </Pressable>
      <PressableIcon
        style={{
          position: "absolute",
          top: cellSize ? cellSize.y + 5 : 0,
          left: cellSize ? cellSize.x + cellSize.width - 27 : 0,
        }}
        unfilledIconName="heart-outline"
        unfilledIconSize="medium"
        filledIconName="ios-heart"
        filledIconSize="medium"
        onPress={onLikePress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});
