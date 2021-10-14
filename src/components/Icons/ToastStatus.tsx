import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Colors } from "../theme";
import { Icon, IconName, IconSize } from "./Icon";

export type ToastType = "success" | "warning" | "error";

interface ToastStatusProps {
  type: ToastType;
  size?: IconSize;
  style?: StyleProp<ViewStyle>;
}

export const ToastStatusIcon: React.FC<ToastStatusProps> = React.memo(
  ({ type, size = "medium", style }) => {
    return (
      <Pressable style={style}>
        <Icon
          name={iconNameForType[type]}
          size={size}
          color={colorForType[type]}
        />
      </Pressable>
    );
  }
);

const iconNameForType: Record<ToastType, IconName> = {
  success: "ios-checkmark-circle-outline",
  warning: "ios-warning-outline",
  error: "ios-alert-circle-outline",
};

const colorForType: Record<ToastType, string> = {
  success: Colors.ActionSuccess,
  warning: Colors.ActionWarning,
  error: Colors.ActionCritical,
};
