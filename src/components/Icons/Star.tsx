import React from "react";
import { StyleProp, ViewStyle, Pressable } from "react-native";
import { Palette } from "../theme";
import { Icon, IconSize } from "./Icon";

interface StarIconProps {
  size?: IconSize;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const StarIcon: React.FC<StarIconProps> = React.memo(
  ({ size = "large", selected = false, onPress, style }) => {
    return (
      <Pressable style={style} onPress={onPress}>
        <Icon
          name={selected ? "ios-star" : "ios-star-outline"}
          size={size}
          color={selected ? Palette.Yellow.L1 : Palette.White}
        />
      </Pressable>
    );
  }
);
