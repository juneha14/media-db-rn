import { noop } from "lodash";
import React, { useCallback, useState } from "react";
import { StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import { LoadingIndicator } from "../LoadingIndicator";
import { Colors, Spacing } from "../theme";
import { Text } from "../Typography";

interface ButtonProps {
  title: string;
  enabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = React.memo(
  ({ title, enabled = true, loading = false, onPress, color, style }) => {
    const [pressed, setPressed] = useState(false);

    const disabled = !enabled || loading;
    const backgroundColor = disabled
      ? Colors.ActionNeutralPressed
      : pressed
      ? color ?? Colors.ActionPrimaryPressed
      : Colors.ActionPrimary;

    const onPressed = useCallback(
      () => (!disabled && onPress ? onPress() : noop),
      [disabled, onPress]
    );

    return (
      <Pressable
        style={[styles.container, { backgroundColor }, style]}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={onPressed}
      >
        {loading ? (
          <LoadingIndicator isFullScreen={false} />
        ) : (
          <Text variant="captionHeadingSmall">{title}</Text>
        )}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: Colors.Border,
    padding: Spacing.defaultMargin,
  },
});
