import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  ImageStyle,
} from "react-native";
import { Text } from "./Text";
import { Colors, Spacing } from "./theme";

const aspectRatio = {
  portrait: 2 / 3,
  landscape: 16 / 9,
};
type Orientation = keyof typeof aspectRatio;

interface CaptionImageProps {
  url: string;
  width?: number;
  height?: number;
  orientation?: Orientation;
  title?: string;
  description?: string;
  tertiaryInfo?: string;
  style?: StyleProp<ViewStyle>;
}

export const CaptionImage: React.FC<CaptionImageProps> = React.memo(
  ({
    url,
    width,
    height,
    orientation,
    title,
    description,
    tertiaryInfo,
    style,
  }) => {
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
      borderBottomLeftRadius: title || description || tertiaryInfo ? 0 : 4,
      borderBottomRightRadius: title || description || tertiaryInfo ? 0 : 4,
    };

    return (
      <View style={[styles.container, { width: size.width }, style]}>
        <Image
          style={[{ ...size }, { ...imageBorderStyle }]}
          source={{ uri: url }}
          resizeMode="cover"
        />
        {title || description || tertiaryInfo ? (
          <View style={styles.captionContainer}>
            {title && (
              <Text variant="captionHeadingSmall" style={styles.text}>
                {title}
              </Text>
            )}
            {description && (
              <Text variant="body" style={styles.text}>
                {description}
              </Text>
            )}
            {tertiaryInfo && (
              <Text variant="body" style={{ color: Colors.TextSubdued }}>
                {tertiaryInfo}
              </Text>
            )}
          </View>
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
    paddingHorizontal: Spacing.l,
    paddingVertical: Spacing.m,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: Colors.SurfaceForeground,
  },
  text: {
    marginBottom: Spacing.s,
  },
});
