import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useLayout } from "../../hooks";
import { Box } from "../Box";
import { Carousel } from "../Carousel";
import { Text } from "../Typography";
import { Colors, Spacing } from "../theme";
import { getCurrentScrollPagePosition } from "../../utils";

type PageData = {
  title: string;
  component: JSX.Element;
};

interface ViewPagerProps {
  pages: PageData[];
  style?: StyleProp<ViewStyle>;
}

export const ViewPager: React.FC<ViewPagerProps> = React.memo(
  ({ pages, style }) => {
    const [index, setIndex] = useState(0);
    const titles = useMemo(() => pages.map(({ title }) => title), [pages]);
    const components = useMemo(() => pages.map(({ component }) => component), [
      pages,
    ]);

    const [layout, onLayout] = useLayout();
    const carouselRef = useRef<FlatList<JSX.Element> | null>(null);
    const swipedToPaginate = useRef(false);

    const onSelectBar = useCallback((index: number) => {
      setIndex(index);
      carouselRef.current?.scrollToIndex({ index, animated: true });
      swipedToPaginate.current = false;
    }, []);

    const renderItem = useCallback(
      ({ item }: { item: JSX.Element }) => {
        return <Box style={{ width: layout?.width }}>{item}</Box>;
      },
      [layout]
    );

    const onBeginSwipeToPaginate = useCallback(
      () => (swipedToPaginate.current = true),
      []
    );

    const onPaginate = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (swipedToPaginate.current) {
          swipedToPaginate.current = false;
          const index = getCurrentScrollPagePosition(event);
          setIndex(index);
        }
      },
      []
    );

    const onEndSwipeToPaginate = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = getCurrentScrollPagePosition(event);
        setIndex(index);
      },
      []
    );

    return (
      <Box style={[style, { flex: 1 }]} onLayout={onLayout}>
        <TitleBar titles={titles} selectedIndex={index} onPress={onSelectBar} />
        <Carousel
          carouselRef={carouselRef}
          keyExtractor={(_, index) => String(index)}
          data={components}
          renderItem={renderItem}
          pagingEnabled
          snapToInterval={layout?.width}
          onMomentumScrollBegin={onBeginSwipeToPaginate}
          onScroll={onPaginate}
          onMomentumScrollEnd={onEndSwipeToPaginate}
        />
      </Box>
    );
  }
);

const TitleBar = ({
  titles,
  selectedIndex = 0,
  onPress,
}: {
  titles: string[];
  selectedIndex?: number;
  onPress: (index: number) => void;
}) => {
  const onIndexPress = useCallback((index: number) => () => onPress(index), [
    onPress,
  ]);

  return (
    <Box style={styles.titleBar}>
      {titles.map((title, index) => {
        return (
          <Box key={title + index} style={styles.barItem}>
            <Pressable style={styles.title} onPress={onIndexPress(index)}>
              <Text
                variant="captionHeadingSmall"
                color={
                  index === selectedIndex
                    ? Colors.TextNeutral
                    : Colors.TextSubdued
                }
              >
                {title}
              </Text>
            </Pressable>
            <Box
              style={{
                height: 2,
                backgroundColor:
                  index === selectedIndex ? Colors.TextSubdued : undefined,
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.SurfaceForeground,
  },
  barItem: {
    flex: 1,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.l,
  },
});
