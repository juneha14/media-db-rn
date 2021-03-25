import React, { useCallback } from "react";
import { StyleSheet, ViewStyle, StyleProp, Pressable } from "react-native";
import { CaptionImage } from "../../components/CaptionImage";
import { Rating } from "../../components/Rating";

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
  return (
    <Pressable style={[styles.container, style]} onPress={onPressed(id)}>
      <CaptionImage
        url={posterImgUrl}
        width={width}
        orientation="portrait"
        title={title}
        description={releaseDate}
        rightAccessory={<Rating rating={9.9} />}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
});
