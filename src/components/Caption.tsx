import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Text } from "./Text";
import { Colors, Spacing } from "./theme";

export interface CaptionProps {
  title: string;
  description?: string;
  descriptionColor?: keyof typeof Colors;
  rightAccessory?: JSX.Element;
  rightAccessoryPosition?: "center" | "top-left";
  style?: StyleProp<ViewStyle>;
}

export const Caption: React.FC<CaptionProps> = React.memo(
  ({
    title,
    description,
    descriptionColor = Colors.TextSubdued,
    rightAccessory,
    rightAccessoryPosition = "top-left",
    style,
  }) => {
    return (
      <View
        style={[
          styles.container,
          {
            alignItems:
              rightAccessoryPosition === "center" ? "center" : "flex-start",
          },
          style,
        ]}
      >
        <View style={styles.leftContainer}>
          <Text variant="captionHeadingSmall">{title}</Text>
          {description ? (
            <Text
              variant="body"
              style={[{ color: descriptionColor }, styles.captionDescription]}
            >
              {description}
            </Text>
          ) : null}
        </View>
        {rightAccessory && (
          <View style={styles.rightContainer}>{rightAccessory}</View>
        )}
      </View>
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
