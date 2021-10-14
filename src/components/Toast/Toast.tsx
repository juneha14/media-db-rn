import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Box } from "../Box";
import { Text } from "../Typography";
import { Colors, Spacing } from "../theme";
import { CancelIcon, ToastStatusIcon, ToastType } from "../Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ToastProps {
  title: string;
  subtitle?: string;
  type: ToastType;
  onDismiss?: () => void;
  respectsTopInset?: boolean;
  style?: StyleProp<ViewStyle>;
}

// TODO: Make Toast global so that we can call `Toast.dismiss()` similar to how `Keyboard.dismiss()` works
export const Toast: React.FC<ToastProps> = React.memo(
  ({ title, subtitle, type, onDismiss, respectsTopInset = true, style }) => {
    const { top } = useSafeAreaInsets();

    return (
      <Box
        style={[
          styles.container,
          {
            backgroundColor: backgroundColorForType[type],
            borderLeftColor: borderColorForType[type],
          },
          {
            top: respectsTopInset ? top : 0,
            left: 0,
            zIndex: 100,
          },
          style,
        ]}
      >
        <ToastStatusIcon type={type} size="medium" />
        <Box style={styles.textContainer}>
          <Text variant="body" color={Colors.TextOnSurfacePrimary}>
            {title}
          </Text>
          {subtitle && (
            <Text
              variant="body"
              color={Colors.TextOnSurfacePrimary}
              style={{ marginTop: Spacing.s }}
            >
              {subtitle}
            </Text>
          )}
        </Box>
        <CancelIcon size="medium" encloseInBorder={false} onPress={onDismiss} />
      </Box>
    );
  }
);

const backgroundColorForType: Record<ToastType, string> = {
  success: Colors.IconSuccess,
  warning: Colors.IconWarning,
  error: Colors.IconCritical,
};

const borderColorForType: Record<ToastType, string> = {
  success: Colors.ActionSuccess,
  warning: Colors.ActionWarning,
  error: Colors.ActionCritical,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.m,
    marginHorizontal: Spacing.l,
    borderRadius: 8,
    borderLeftWidth: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: Spacing.l,
    marginRight: Spacing.m,
  },
});
