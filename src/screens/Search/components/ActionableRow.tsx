import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { IconLabel } from "../../../components/Icons";
import { Icon, IconName } from "../../../components/Icons/Icon";
import { Colors, Spacing } from "../../../components/theme";

interface ActionableRowProps {
  title: string;
  leftIcon: IconName;
  action: "navigate" | "remove";
  onRowPress: () => void;
  onRightIconPress?: () => void;
}

export const ActionableRow: React.FC<ActionableRowProps> = ({
  title,
  leftIcon,
  action,
  onRowPress,
  onRightIconPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onRowPress}>
      <IconLabel
        style={styles.iconLabel}
        size="small"
        name={leftIcon}
        label={title}
        labelPosition="right"
      />
      <Pressable style={styles.rightIcon} onPress={onRightIconPress}>
        <Icon
          name={
            action === "navigate"
              ? "ios-chevron-forward-outline"
              : "ios-close-outline"
          }
          size="small"
        />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.l,
    backgroundColor: Colors.SurfaceForeground,
  },
  iconLabel: {
    flexGrow: 1,
    marginRight: Spacing.s,
  },
  rightIcon: {
    flexShrink: 1,
    alignItems: "flex-end",
  },
});
