import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Box } from "../Box";
import { Text } from "../Text";
import { Spacing } from "../theme";
import { Icon, IconProps } from "./Icon";

interface IconLabelProps extends Omit<IconProps, "style"> {
  label: string;
  labelPosition?: "below" | "right";
  style?: StyleProp<ViewStyle>;
}

export const IconLabel: React.FC<IconLabelProps> = ({
  label,
  labelPosition,
  style,
  ...iconProps
}) => {
  return (
    <Box
      style={[
        {
          flexDirection: labelPosition === "right" ? "row" : "column",
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <Icon {...iconProps} />
      {label.length > 0 ? (
        <Text style={{ marginTop: Spacing.s }} variant="body">
          {label}
        </Text>
      ) : null}
    </Box>
  );
};
