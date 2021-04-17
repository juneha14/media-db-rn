import React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Box } from "../Box";
import { Text } from "./Text";
import { Spacing } from "../theme";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  style,
}) => {
  return (
    <Box style={style}>
      <Text style={styles.heading} variant="pageHeading">
        {title}
      </Text>
      {subtitle ? <Text variant="body">{subtitle}</Text> : null}
    </Box>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginBottom: Spacing.m,
  },
});
