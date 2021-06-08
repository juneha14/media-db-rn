import React, { useCallback } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Box } from "../../components/Box";
import { ContentPreview } from "../../components/Preview";
import { Rating } from "../../components/Rating";
import { Spacing } from "../../components/theme";
import { Carousel } from "../../components/Carousel";
import { chunk } from "lodash";
import { KnownForMedia } from "./utils";

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
  const chunked = chunk(media, 3);

  const renderItem = useCallback(
    ({ item, index }: { item: KnownForMedia[]; index: number }) => {
      return (
        <Box
          style={[
            styles.contentPreviewGroup,
            { marginLeft: index === 0 ? Spacing.m : undefined },
          ]}
        >
          {item.map(({ id, posterPath, title, releaseDate, voteAverage }) => {
            return (
              <ContentPreview
                style={[styles.contentPreviewRow]}
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
    [onSelectMedia]
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
    width: 340,
    marginRight: Spacing.m,
  },
  contentPreviewRow: {
    paddingVertical: Spacing.m,
  },
});
