import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Icon, IconSize } from "./Icon";

interface CancelIconProps {
  size: IconSize;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const CancelIcon: React.FC<CancelIconProps> = ({
  size,
  onPress,
  style,
}) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <Icon name="ios-close-circle-outline" size={size} />
    </Pressable>
  );
};
