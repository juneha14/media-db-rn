import React from "react";
import { StyleProp, ViewStyle, Pressable } from "react-native";
import { Palette } from "../theme";
import { IconSize } from "./Icon";
import { IconLabel } from "./IconLabel";

interface StarIconProps {
  size?: IconSize;
  caption?: string;
  encloseInBorder?: boolean;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const StarIcon: React.FC<StarIconProps> = React.memo(
  ({
    size = "large",
    caption,
    encloseInBorder = false,
    selected = false,
    onPress,
    style,
  }) => {
    return (
      <Pressable style={style} onPress={onPress}>
        <IconLabel
          name={selected ? "ios-star" : "ios-star-outline"}
          size={size}
          label={caption}
          labelPosition="below"
          encloseInBorder={encloseInBorder}
          color={selected ? Palette.Yellow.L1 : Palette.White}
        />
      </Pressable>
    );
  }
);
