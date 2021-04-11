import React, { useCallback, useState } from "react";
import { StyleProp, ViewStyle, Pressable } from "react-native";
import { IconSize } from "./Icon";
import { IconLabel } from "./IconLabel";

interface PlayIconProps {
  iconSize: IconSize;
  caption?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const PlayIcon: React.FC<PlayIconProps> = React.memo(
  ({ iconSize, caption, onPress, style }) => {
    return (
      <Pressable style={style} onPress={onPress}>
        <IconLabel
          name="play-outline"
          size={iconSize}
          encloseInBorder
          label={caption ?? ""}
          labelPosition="below"
        />
      </Pressable>
    );
  }
);
