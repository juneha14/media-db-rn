import React from "react";
import { StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";
import { Text } from "../Typography";
import { Colors } from "../theme";

export interface TagProps {
  title: string;
  onPress?: () => void;
  fillColor?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
}

export const Tag: React.FC<TagProps> = React.memo(
  ({
    title,
    fillColor = Colors.ActionNeutral,
    borderColor = Colors.Border,
    onPress,
    style,
  }) => {
    return (
      <Pressable
        style={[
          styles.container,
          {
            borderColor,
            borderWidth: borderColor ? 1 : 0,
            backgroundColor: fillColor,
          },
          style,
        ]}
        onPress={onPress}
      >
        <Text variant="body">{title}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 8,
  },
});
