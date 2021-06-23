import React, { useCallback, useState } from "react";
import { StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";
import { Icon, IconName } from "../Icons/Icon";
import { Colors, Spacing } from "../theme";
import { Text } from "../Typography";

interface NavigationBarItemProps {
  title?: string;
  iconName?: IconName;
  iconColor?: string;
  position: "left" | "right";
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const NavigationBarItem: React.FC<NavigationBarItemProps> = ({
  title,
  iconName,
  iconColor = Colors.SystemBlue,
  position,
  onPress,
  style,
}) => {
  const [pressedIn, setPressedIn] = useState(false);
  const onPressIn = useCallback(() => setPressedIn(true), []);
  const onPressOut = useCallback(() => setPressedIn(false), []);

  return (
    <Pressable
      style={[
        styles.container,
        {
          marginLeft: position === "left" ? 15 : undefined,
          marginRight: position === "right" ? 15 : undefined,
        },
        style,
      ]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      {iconName && (
        <Icon
          style={styles.icon}
          name={iconName}
          size="small"
          color={pressedIn ? Colors.ActionNeutral : iconColor}
        />
      )}
      {title && (
        <Text
          style={{ fontWeight: "normal" }}
          variant="captionHeadingSmall"
          color={pressedIn ? Colors.ActionNeutral : Colors.SystemBlue}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Transparent,
  },
  icon: {
    marginRight: Spacing.m,
  },
});
