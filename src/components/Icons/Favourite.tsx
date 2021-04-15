import React, { useCallback, useState } from "react";
import { StyleProp, ViewStyle, Pressable } from "react-native";
import { noop } from "lodash";
import { IconLabel } from "./IconLabel";
import { IconSize } from "./Icon";

interface FavouriteIconProps {
  iconSize: IconSize;
  encloseInBorder?: boolean;
  caption?: string;
  onPress?: (pressed: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export const FavouriteIcon: React.FC<FavouriteIconProps> = React.memo(
  ({ iconSize, encloseInBorder, caption, onPress, style }) => {
    const [pressed, setPressed] = useState(false);
    const onPressed = useCallback(() => {
      setPressed((pressed) => {
        onPress ? onPress(!pressed) : noop;
        return !pressed;
      });
    }, [onPress]);

    return (
      <Pressable style={style} onPress={onPressed}>
        <IconLabel
          name={pressed ? "heart" : "heart-outline"}
          size={iconSize}
          encloseInBorder={encloseInBorder}
          label={caption ?? ""}
          labelPosition="below"
        />
      </Pressable>
    );
  }
);
