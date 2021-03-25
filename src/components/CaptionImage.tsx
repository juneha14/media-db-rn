import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  ImageStyle,
} from "react-native";
import { Caption, CaptionProps } from "./Caption";
import { Colors, Spacing } from "./theme";

const aspectRatio = {
  portrait: 2 / 3,
  landscape: 16 / 9,
};
type Orientation = keyof typeof aspectRatio;

interface CaptionImageProps extends Omit<CaptionProps, "style" | "title"> {
  url: string;
  width?: number;
  height?: number;
  orientation?: Orientation;
  title?: string;
  style?: StyleProp<ViewStyle>;
}

export const CaptionImage: React.FC<CaptionImageProps> = React.memo(
  ({ url, width, height, orientation, title, description, style, ...rest }) => {
    const size = {
      width: width
        ? width
        : height && orientation
        ? height * aspectRatio[orientation]
        : undefined,
      height: height
        ? height
        : width && orientation
        ? width / aspectRatio[orientation]
        : undefined,
    };

    const imageBorderStyle: ImageStyle = {
      borderRadius: 4,
      borderBottomLeftRadius: title || description ? 0 : 4,
      borderBottomRightRadius: title || description ? 0 : 4,
    };

    return (
      <View style={[styles.container, { width: size.width }, style]}>
        <Image
          style={[{ ...size }, { ...imageBorderStyle }]}
          source={{ uri: url }}
          resizeMode="cover"
        />
        {title || description ? (
          <Caption
            style={styles.captionContainer}
            title={title ?? ""}
            description={description}
            {...rest}
          />
        ) : null}
      </View>
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
  text: {
    marginBottom: Spacing.s,
  },
});
