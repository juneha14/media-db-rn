import React from "react";
import {
  Image as RNImage,
  ViewStyle,
  StyleProp,
  ImageStyle,
  LayoutChangeEvent,
} from "react-native";
import Images from "../assets";
import { Box } from "./Box";

const AspectRatio = {
  portrait: 2 / 3,
  landscape: 16 / 9,
};
type Orientation = keyof typeof AspectRatio;

export interface ImageProps {
  uri: string | null;
  width?: number;
  height?: number;
  orientation?: Orientation;
  shouldRoundImage?: boolean;
  shouldRoundCorners?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  imageStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
}

export const Image: React.FC<ImageProps> = React.memo(
  ({
    uri,
    width,
    height,
    orientation,
    shouldRoundImage = false,
    shouldRoundCorners = true,
    onLayout,
    imageStyle,
    style,
  }) => {
    const size = {
      width: width
        ? width
        : height && orientation
        ? height * AspectRatio[orientation]
        : undefined,
      height: height
        ? height
        : width && orientation
        ? width / AspectRatio[orientation]
        : undefined,
    };
    const imageBorderStyle: ImageStyle = {
      borderRadius: shouldRoundImage
        ? (size.width ?? 0) / 2
        : shouldRoundCorners
        ? 4
        : 0,
    };

    return (
      <Box style={style}>
        <RNImage
          style={[imageStyle, { ...size, ...imageBorderStyle }]}
          onLayout={onLayout}
          source={uri ? { uri } : Images.placeholderImage}
          resizeMode={uri ? "cover" : "center"}
        />
      </Box>
    );
  }
);
