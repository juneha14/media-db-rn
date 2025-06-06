import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Box } from "../Box";
import { Text } from "../Typography/Text";
import { Colors, Spacing } from "../theme";

interface Section {
  title: string;
  accessoryTitle?: string;
  onAccessoryPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Section: React.FC<Section> = React.memo(
  ({ title, accessoryTitle, onAccessoryPress, children, style }) => {
    return (
      <Box style={style}>
        <Box style={styles.headingContainer}>
          <Text style={styles.title} variant="sectionHeading">
            {title}
          </Text>
          <Pressable style={styles.accessoryTitle} onPress={onAccessoryPress}>
            {accessoryTitle && (
              <Text variant="body" color={Colors.TextInteractive}>
                {accessoryTitle}
              </Text>
            )}
          </Pressable>
        </Box>
        {children}
      </Box>
    );
  }
);

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.m,
  },
  title: {
    flexShrink: 1,
  },
  accessoryTitle: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
});
