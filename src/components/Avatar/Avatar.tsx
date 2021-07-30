import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Box } from "../Box";
import { Image } from "../Image";
import { useImageUri } from "../../hooks";
import { Spacing } from "../theme";
import { Caption } from "../Caption";

interface AvatarProps {
  url: string | null;
  size: number;
  title?: string;
  subtitle?: string;
  textPosition?: "right" | "bottom";
  onPressImage?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = React.memo(
  ({ url, size, title, subtitle, textPosition, onPressImage, style }) => {
    const uri = useImageUri("profile", "Original", url);

    return (
      <Box
        style={[
          {
            flexDirection: textPosition === "right" ? "row" : "column",
            justifyContent: "center",
            alignItems: "center",
          },
          style,
        ]}
      >
        <Pressable onPress={onPressImage}>
          <Image
            imageStyle={{
              marginBottom: textPosition === "bottom" ? Spacing.m : undefined,
              marginRight: textPosition === "right" ? Spacing.m : undefined,
            }}
            uri={uri}
            width={size}
            height={size}
            shouldRoundCorners={false}
            shouldRoundImage
          />
        </Pressable>
        <Box>
          {title && (
            <Caption
              textContainerStyle={{
                alignItems: textPosition === "bottom" ? "center" : "flex-start",
              }}
              title={title}
              description={subtitle}
            />
          )}
        </Box>
      </Box>
    );
  }
);
