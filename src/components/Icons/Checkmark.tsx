import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Icon, IconSize } from "./Icon";

interface CheckmarkProps {
  size: IconSize;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const CheckmarkIcon: React.FC<CheckmarkProps> = ({
  size,
  onPress,
  style,
}) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <Icon name="ios-checkmark" size={size} />
    </Pressable>
  );
};
