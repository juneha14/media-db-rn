import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Box } from "./Box";
import { Tag, TagProps } from "./Tag";
import { Spacing } from "./theme";

interface TagListProps {
  tags: TagProps[];
  style?: StyleProp<ViewStyle>;
}

export const TagList: React.FC<TagListProps> = React.memo(({ tags, style }) => {
  return (
    <Box style={[styles.container, style]}>
      {tags.map((tagProps, index) => (
        <Tag key={index} {...tagProps} style={styles.tag} />
      ))}
    </Box>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    marginRight: Spacing.s,
    marginBottom: Spacing.s,
  },
});
