import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Icon, IconSize } from "./Icon";

interface RemoveProps {
  size: IconSize;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const RemoveIcon: React.FC<RemoveProps> = ({ size, onPress, style }) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <Icon name="ios-close-outline" size={size} />
    </Pressable>
  );
};
