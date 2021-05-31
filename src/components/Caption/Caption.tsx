import React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Box } from "../Box";
import { Text } from "../Typography";
import { Colors, Spacing } from "../theme";

export interface CaptionProps {
  title: string;
  description?: string;
  descriptionColor?: keyof typeof Colors;
  rightAccessory?: JSX.Element;
  rightAccessoryPosition?: "center" | "top-left";
  numberOfTitleLines?: number;
  numberOfDescriptionLines?: number;
  style?: StyleProp<ViewStyle>;
}

export const Caption: React.FC<CaptionProps> = React.memo(
  ({
    title,
    description,
    descriptionColor = Colors.TextSubdued,
    rightAccessory,
    rightAccessoryPosition = "top-left",
    numberOfTitleLines,
    numberOfDescriptionLines,
    style,
  }) => {
    return (
      <Box
        style={[
          styles.container,
          {
            alignItems:
              rightAccessoryPosition === "center" ? "center" : "flex-start",
          },
          style,
        ]}
      >
        <Box style={styles.leftContainer}>
          <Text
            variant="captionHeadingSmall"
            numberOfLines={numberOfTitleLines}
          >
            {title}
          </Text>
          {description ? (
            <Text
              variant="body"
              numberOfLines={numberOfDescriptionLines}
              style={[{ color: descriptionColor }, styles.captionDescription]}
            >
              {description}
            </Text>
          ) : null}
        </Box>
        {rightAccessory && (
          <Box style={styles.rightContainer}>{rightAccessory}</Box>
        )}
      </Box>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  leftContainer: {
    flexShrink: 1,
  },
  captionDescription: {
    marginTop: Spacing.m,
  },
  rightContainer: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
});
