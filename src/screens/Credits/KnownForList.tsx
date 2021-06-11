import React, { useCallback } from "react";
import { Dimensions, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Box } from "../../components/Box";
import { ContentPreview } from "../../components/Preview";
import { Rating } from "../../components/Rating";
import { Spacing } from "../../components/theme";
import { Carousel } from "../../components/Carousel";
import { KnownForMedia } from "./utils";
import { chunk } from "lodash";

const NUM_ROWS_IN_GROUP = 3;

interface KnownForListProps {
  media: KnownForMedia[];
  onSelectMedia: (id: number) => void;
  style?: StyleProp<ViewStyle>;
}

export const KnownForList: React.FC<KnownForListProps> = ({
  media,
  onSelectMedia,
  style,
}) => {
  const chunked = chunk(media, NUM_ROWS_IN_GROUP);

  const renderItem = useCallback(
    ({ item }: { item: KnownForMedia[] }) => {
      return (
        <Box
          style={[
            styles.contentPreviewGroup,
            {
              width:
                chunked.length > 1
                  ? 340
                  : Dimensions.get("window").width - Spacing.defaultMargin * 2,
            },
          ]}
        >
          {item.map(({ id, posterPath, title, releaseDate, voteAverage }) => {
            return (
              <ContentPreview
                style={{ marginVertical: 2 }}
                key={id}
                imgUrl={posterPath}
                title={title}
                description={releaseDate}
                rightAccessory={<Rating rating={voteAverage} />}
                onPress={() => onSelectMedia(id)}
              />
            );
          })}
        </Box>
      );
    },
    [onSelectMedia, chunked]
  );

  return (
    <Carousel
      style={style}
      keyExtractor={(_, index) => `chunked-media-${index}`}
      data={chunked}
      renderItem={renderItem}
      pagingEnabled
      snapToInterval={340 + Spacing.m}
    />
  );
};

const styles = StyleSheet.create({
  contentPreviewGroup: {
    marginRight: Spacing.m,
  },
});
