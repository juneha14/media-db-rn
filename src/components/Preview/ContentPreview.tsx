import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Box } from "../Box";
import { Caption } from "../Caption";
import { Image } from "../Image";
import { Colors, Spacing } from "../theme";

interface ContentPreviewProps {
  imgUri: string;
  title: string;
  description?: string;
  rightAccessory?: JSX.Element;
  roundImage?: boolean;
  imgWidth?: number;
  imgHeight?: number;
  style?: StyleProp<ViewStyle>;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({
  imgUri,
  title,
  description,
  rightAccessory,
  imgWidth = 80,
  imgHeight = 80,
  roundImage = false,
  style,
}) => {
  return (
    <Box style={[styles.container, style]}>
      <Image
        imageStyle={{ borderRadius: roundImage ? imgWidth / 2 : undefined }}
        uri={imgUri}
        width={imgWidth}
        height={imgHeight}
        shouldRoundCorners={false}
      />
      <Caption
        style={styles.caption}
        title={title}
        description={description}
        numberOfTitleLines={1}
        numberOfDescriptionLines={2}
        rightAccessory={rightAccessory}
        rightAccessoryPosition="center"
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.SurfaceForeground,
  },
  caption: {
    flexShrink: 1,
    marginHorizontal: Spacing.m,
  },
});
