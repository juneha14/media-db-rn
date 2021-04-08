import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
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
    borderColor,
    style,
  }) => {
    return (
      <View style={style}>
        <Ionicons
          style={{ borderColor: borderColor }}
          name={name}
          size={IconSizeValues[size]}
          color={fillColor}
        />
      </View>
    );
  }
);

export const IconSizeValues: Record<IconSize, number> = {
  small: 18,
  medium: 22,
  large: 44,
};
