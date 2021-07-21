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
import { useImageUri } from "../../hooks";
import { GalleryImage, ImageType } from "./utils";

const NUM_COLS = 3;

export const GalleryListScreen: React.FC = () => {
  const renderItem = useCallback(
    ({
      item: { path, type },
      index,
    }: {
      item: GalleryImage;
      index: number;
    }) => {
      const marginHorizontal = 1;
      const width = Dimensions.get("window").width / NUM_COLS;

      return (
        <Thumbnail
          style={{
            marginHorizontal:
              index % NUM_COLS === 1 ? marginHorizontal : undefined,
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

const images: GalleryImage[] = [
  {
    path: "/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg",
    width: 1200,
    height: 720,
    type: "backdrop",
    orientation: "landscape",
  },
  {
    path: "/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg",
    width: 1200,
    height: 720,
    type: "backdrop",
    orientation: "landscape",
  },
  {
    path: "/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg",
    width: 1200,
    height: 720,
    type: "backdrop",
    orientation: "landscape",
  },
  {
    path: "/9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg",
    width: 1200,
    height: 1800,
    type: "poster",
    orientation: "portrait",
  },
  {
    path: "/9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg",
    width: 1200,
    height: 1800,
    type: "poster",
    orientation: "portrait",
  },
];
