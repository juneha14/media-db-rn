import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./theme";

export type IconSize = "small" | "medium" | "large";
export type IconName = keyof typeof Ionicons.glyphMap;

interface IconProps {
  name?: IconName;
  size?: IconSize;
  fillColor?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IconProps> = React.memo(
  ({
    name,
    size = "small",
    fillColor = Colors.IconSubdued,
    borderColor = "red",
    style,
  }) => {
    return (
      <View style={[styles.container, style]}>
        <Ionicons
          style={[styles.container, style, { borderColor: borderColor }]}
          name={name}
          size={IconSizeValues[size]}
          color={fillColor}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const IconSizeValues: Record<IconSize, number> = {
  small: 18,
  medium: 22,
  large: 44,
};
