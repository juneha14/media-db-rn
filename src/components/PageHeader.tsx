import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Text } from "./Text";
import { Spacing } from "./theme";

interface PageHeaderProps {
  title: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  style,
}) => {
  return (
    <View style={style}>
      <Text style={styles.heading} variant="pageHeading">
        {title}
      </Text>
      {description ? <Text variant="body">{description}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginBottom: Spacing.m,
  },
});
