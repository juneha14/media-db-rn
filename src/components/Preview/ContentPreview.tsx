import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Caption } from "../Caption";
import { Image } from "../Image";
import { Colors, Spacing } from "../theme";
import { useImageUri } from "../../hooks";

export interface ContentPreviewProps {
  imgUrl: string | null;
  title: string;
  description?: string;
  rightAccessory?: JSX.Element;
  roundImage?: boolean;
  roundBorder?: boolean;
  imgWidth?: number;
  imgHeight?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ContentPreview: React.FC<ContentPreviewProps> = React.memo(
  ({
    imgUrl,
    title,
    description,
    rightAccessory,
    imgWidth = 80,
    imgHeight = 80,
    roundImage = false,
    roundBorder = true,
    onPress,
    style,
  }) => {
    const imgUri = useImageUri("poster", "Original", imgUrl);
    return (
      <Pressable
        style={[
          styles.container,
          { borderRadius: roundBorder ? 4 : undefined },
          style,
        ]}
        onPress={onPress}
      >
        <Image
          imageStyle={{ borderRadius: roundImage ? imgWidth / 2 : undefined }}
          uri={imgUri}
          width={imgWidth}
          height={imgHeight}
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
      </Pressable>
    );
  }
);

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
