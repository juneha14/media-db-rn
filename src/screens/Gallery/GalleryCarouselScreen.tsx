import React, { useCallback, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { Box } from "../../components/Box";
import { Carousel } from "../../components/Carousel";
import { Image } from "../../components/Image";
import { Colors } from "../../components/theme";
import { Text } from "../../components/Typography";
import { useImageUri, useRouteParams } from "../../hooks";
import { getCurrentScrollPagePosition } from "../../utils";
import { GalleryImage } from "./utils";

const FULL_WIDTH = Dimensions.get("window").width;
const FULL_HEIGHT = Dimensions.get("window").height;

// Custom x button to pop gallery carousel screen
// empty screens for movies and favourite

export const GalleryCarouselScreen: React.FC = () => {
  const {
    params: { selectedPage, images },
  } = useRouteParams<"GalleryCarousel">();

  const [currentPage, setCurrentPage] = useState(selectedPage);

  const renderItem = useCallback(
    ({ item }: { item: GalleryImage }) => <FullScreenImage image={item} />,
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getItemLayout = useCallback((data: any, index: number) => {
    return {
      index,
      length: FULL_WIDTH,
      offset: index * FULL_WIDTH,
    };
  }, []);

  const onPaginate = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = getCurrentScrollPagePosition(event);
      setCurrentPage(index);
    },
    []
  );

  return (
    <>
      <Carousel
        style={styles.carouselContainer}
        keyExtractor={(item) => item.path}
        data={images}
        renderItem={renderItem}
        pagingEnabled
        getItemLayout={getItemLayout}
        snapToInterval={FULL_WIDTH}
        initialScrollIndex={selectedPage}
        onScroll={onPaginate}
      />
      <Indicator currentPage={currentPage + 1} totalPages={images.length} />
    </>
  );
};

const FullScreenImage = ({
  image: { type, width, orientation, path },
}: {
  image: GalleryImage;
}) => {
  const uri = useImageUri(type, "Original", path);

  return (
    <Box style={styles.fullScreenImageContainer}>
      <Image
        uri={uri}
        width={Math.min(width, FULL_WIDTH)}
        orientation={orientation}
      />
    </Box>
  );
};

const Indicator = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  return (
    <Box style={styles.indicator}>
      <Text variant="body">{`${currentPage} / ${totalPages}`}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    backgroundColor: Colors.SurfaceBackground,
  },
  fullScreenImageContainer: {
    width: FULL_WIDTH,
    height: FULL_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    overflow: "hidden",
    backgroundColor: Colors.SurfaceForeground,
  },
  indicator: {
    position: "absolute",
    left: FULL_WIDTH - 60,
    top: FULL_HEIGHT - 100,
  },
});
