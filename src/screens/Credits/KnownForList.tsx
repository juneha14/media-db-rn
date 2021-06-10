import React, { useCallback } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Box } from "../../components/Box";
import { ContentPreview } from "../../components/Preview";
import { Rating } from "../../components/Rating";
import { Colors, Spacing } from "../../components/theme";
import { Carousel } from "../../components/Carousel";
import { KnownForMedia } from "./utils";
import { chunk } from "lodash";

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
    ({ item }: { item: KnownForMedia[] }) => {
      return (
        <Box
          style={[
            styles.contentPreviewGroup,
            {
              flex: chunked.length > 1 ? undefined : 1,
              width: chunked.length > 1 ? 340 : undefined,
            },
          ]}
        >
          {item.map(
            ({ id, posterPath, title, releaseDate, voteAverage }, index) => {
              const indexInRange = index > 0 && index < item.length - 1;
              return (
                <ContentPreview
                  style={{
                    paddingVertical: indexInRange ? Spacing.m : undefined,
                  }}
                  key={id}
                  imgUrl={posterPath}
                  title={title}
                  description={releaseDate}
                  rightAccessory={<Rating rating={voteAverage} />}
                  onPress={() => onSelectMedia(id)}
                />
              );
            }
          )}
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
    borderRadius: 4,
    backgroundColor: Colors.SurfaceForeground,
  },
});
