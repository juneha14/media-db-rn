import React, { useCallback, useState } from "react";
import { StyleProp, ViewStyle, Pressable, StyleSheet } from "react-native";
import { Icon, IconSize, IconName, IconSizeValues } from "./Icon";
import { Colors } from "./theme";

export interface PressableIconProps {
  unfilledIconName?: IconName;
  unfilledIconColor?: string;
  filledIconName?: IconName;
  filledIconColor?: string;
  size: IconSize;
  encloseInBorder?: boolean;
  onPress: (pressed: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export const PressableIcon: React.FC<PressableIconProps> = React.memo(
  ({
    unfilledIconName,
    unfilledIconColor = Colors.IconOnPrimary,
    filledIconName,
    filledIconColor = Colors.IconOnPrimary,
    size,
    encloseInBorder = false,
    onPress,
    style,
  }) => {
    const [pressed, setPressed] = useState(false);
    const onPressed = useCallback(() => {
      setPressed((pressed) => {
        onPress(!pressed);
        return !pressed;
      });
    }, [onPress]);

    return (
      <Pressable style={style} onPress={onPressed}>
        <Icon
          style={
            encloseInBorder
              ? { ...styles.enclosedBorder, borderRadius: IconSizeValues[size] }
              : undefined
          }
          name={pressed ? filledIconName : unfilledIconName}
          size={size}
          fillColor={pressed ? filledIconColor : unfilledIconColor}
        />
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  enclosedBorder: {
    padding: 7,
    borderColor: Colors.IconOnPrimary,
    borderWidth: 1,
  },
});
