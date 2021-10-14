import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Icon, IconSize } from "./Icon";

interface CancelIconProps {
  size: IconSize;
  encloseInBorder?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const CancelIcon: React.FC<CancelIconProps> = React.memo(
  ({ size, encloseInBorder = true, onPress, style }) => {
    return (
      <Pressable style={style} onPress={onPress}>
        <Icon
          name={
            encloseInBorder ? "ios-close-circle-outline" : "ios-close-outline"
          }
          size={size}
        />
      </Pressable>
    );
  }
);
