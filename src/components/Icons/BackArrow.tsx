import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Icon, IconSize } from "./Icon";

interface BackArrowProps {
  size: IconSize;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const BackArrow: React.FC<BackArrowProps> = ({
  size,
  onPress,
  style,
}) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <Icon name="ios-arrow-back-circle-outline" size={size} />
    </Pressable>
  );
};
