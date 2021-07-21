import React, { useCallback } from "react";
import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "../../components/Image";
import { Colors } from "../../components/theme";
import { useImageUri, useRouteParams } from "../../hooks";
import { GalleryImage, ImageType } from "./utils";

const NUM_COLS = 3;

export const GalleryListScreen: React.FC = () => {
  const {
    params: { images },
  } = useRouteParams<"GalleryList">();

  const renderItem = useCallback(
    ({
      item: { path, type },
      index,
    }: {
      item: GalleryImage;
      index: number;
    }) => {
      const width = Dimensions.get("window").width / NUM_COLS;

      return (
        <Thumbnail
          style={{
            marginHorizontal: index % NUM_COLS === 1 ? 1 : undefined,
          }}
          imagePath={path}
          imageType={type}
          width={width}
          onPress={() =>
            console.log(
              "========== File: GalleryListScreen.tsx, Line: 22 =========="
            )
          }
        />
      );
    },
    []
  );

  return (
    <FlatList
      style={styles.container}
      keyExtractor={(item, index) => item.path + index}
      numColumns={NUM_COLS}
      data={images}
      renderItem={renderItem}
    />
  );
};

const Thumbnail = ({
  imagePath,
  imageType,
  width,
  onPress,
  style,
}: {
  imagePath: string;
  imageType: ImageType;
  width: number;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const uri = useImageUri(imageType, "Original", imagePath);

  return (
    <Pressable style={[styles.thumbail, style, { width }]} onPress={onPress}>
      <Image
        uri={uri}
        width={width}
        height={width}
        shouldRoundCorners={false}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceBackground,
  },
  thumbail: {
    marginBottom: 1,
  },
});
