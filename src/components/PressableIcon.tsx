import React, { useCallback, useState } from "react";
import { StyleProp, ViewStyle, Pressable } from "react-native";
import { Icon, IconSize, IconName } from "./Icon";
import { Colors } from "./theme";

interface PressableIconProps {
  unfilledIconName?: IconName;
  unfilledIconSize?: IconSize;
  unfilledIconColor?: string;
  filledIconName?: IconName;
  filledIconSize?: IconSize;
  filledIconColor?: string;
  onPress: (pressed: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export const PressableIcon: React.FC<PressableIconProps> = React.memo(
  ({
    unfilledIconName,
    unfilledIconSize = "small",
    unfilledIconColor = Colors.IconOnPrimary,
    filledIconName,
    filledIconSize = "small",
    filledIconColor = Colors.IconOnPrimary,
    onPress,
    style,
  }) => {
    const [pressed, setPressed] = useState(false);
    const onPressed = useCallback(() => {
      onPress(!pressed);
      setPressed((pressed) => !pressed);
    }, [onPress, pressed]);

    return (
      <Pressable
        style={[style, { backgroundColor: undefined }]}
        onPress={onPressed}
      >
        {pressed ? (
          <Icon
            name={filledIconName}
            size={filledIconSize}
            fillColor={filledIconColor}
          />
        ) : (
          <Icon
            name={unfilledIconName}
            size={unfilledIconSize}
            fillColor={unfilledIconColor}
          />
        )}
      </Pressable>
    );
  }
);
