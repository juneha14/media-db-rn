import React, { useCallback, useState } from "react";
import { StyleProp, ViewStyle, Pressable } from "react-native";
import { noop } from "lodash";
import { IconLabel, IconSize } from ".";
import { Box } from "../Box";

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
