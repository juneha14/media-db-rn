import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
  LayoutChangeEvent,
} from "react-native";
import { useLayout } from "../../hooks";
import { Box } from "../Box";
import { Caption, CaptionProps } from "../Caption";
import { Image, ImageProps } from "../Image";
import { Colors, Spacing } from "../theme";

interface CaptionImageProps
  extends Omit<CaptionProps, "style" | "title">,
    Omit<ImageProps, "style" | "imageStyle" | "onLayout"> {
  title?: string;
  onViewLayout?: (event: LayoutChangeEvent) => void;
  style?: StyleProp<ViewStyle>;
}

export const CaptionImage: React.FC<CaptionImageProps> = React.memo(
  ({
    uri,
    width,
    height,
    orientation,
    title,
    description,
    onViewLayout,
    style,
    ...rest
  }) => {
    const [imageSize, onLayout] = useLayout();

    const imageBorderStyle: ImageStyle = {
      borderBottomLeftRadius: title || description ? 0 : 4,
      borderBottomRightRadius: title || description ? 0 : 4,
    };

    return (
      <Box
        style={[styles.container, { width: imageSize?.width }, style]}
        onLayout={onViewLayout}
      >
        <Image
          imageStyle={{ ...imageBorderStyle }}
          onLayout={onLayout}
          uri={uri}
          width={width}
          height={height}
          orientation={orientation}
        />
        {title || description ? (
          <Caption
            style={styles.captionContainer}
            title={title ?? ""}
            description={description}
            {...rest}
          />
        ) : null}
      </Box>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  captionContainer: {
    paddingLeft: Spacing.l,
    paddingRight: Spacing.m,
    paddingVertical: Spacing.m,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: Colors.SurfaceForeground,
  },
});
