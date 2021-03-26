import React, { useCallback } from "react";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Pressable,
  View,
} from "react-native";
import { CaptionImage } from "../../components/CaptionImage";
import { Icon } from "../../components/Icon";
import { PressableIcon } from "../../components/PressableIcon";
import { Rating } from "../../components/Rating";
import { Spacing } from "../../components/theme";
import { useLayout } from "../../hooks/useLayout";

interface MediaCellProps {
  id: string;
  posterImgUrl: string;
  title: string;
  releaseDate: string;
  rating: number;
  width?: number;
  height?: number;
  onPress: (id: string) => void;
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
  style,
}) => {
  const onPressed = useCallback(
    (id: string) => () => {
      onPress(id);
    },
    [onPress]
  );
  const [cellSize, onCellLayout] = useLayout();

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
          top: cellSize?.y ? cellSize.y + 5 : 0,
          left:
            cellSize?.x && cellSize.width
              ? cellSize.x + cellSize.width - 27
              : 0,
        }}
        unfilledIconName="heart-outline"
        unfilledIconSize="medium"
        filledIconName="ios-heart"
        filledIconSize="medium"
        onPress={(pressed) => {
          console.log("==== Value of pressed:", pressed);
          console.log("========== File: MediaCell.tsx, Line: 71 ==========");
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});
