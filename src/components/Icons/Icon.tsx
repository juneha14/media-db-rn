import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme";

export type IconSize = "small" | "medium" | "large";
export type IconName = keyof typeof Ionicons.glyphMap;

export interface IconProps {
  name: IconName;
  size: IconSize;
  color?: string;
  encloseInBorder?: boolean;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IconProps> = React.memo(
  ({
    name,
    size,
    color: fillColor = Colors.IconOnPrimary,
    encloseInBorder = false,
    borderColor = Colors.Border,
    style,
  }) => {
    const borderedStyle: ViewStyle = {
      justifyContent: "center",
      alignItems: "center",
      width: IconSizeValues[size] * 2,
      height: IconSizeValues[size] * 2,
      padding: IconSizeValues[size] / 2,
      borderRadius: IconSizeValues[size],
      borderWidth: 1,
      borderColor,
    };

    return (
      <View style={[encloseInBorder && { ...borderedStyle }, style]}>
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

const IconSizeValues: Record<IconSize, number> = {
  small: 18,
  medium: 22,
  large: 44,
};
