import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Box } from "../Box";
import { Text } from "../Typography";
import { Spacing } from "../theme";
import { Icon, IconProps } from "./Icon";

interface IconLabelProps extends Omit<IconProps, "style"> {
  label?: string;
  labelPosition: "below" | "right";
  style?: StyleProp<ViewStyle>;
}

export const IconLabel: React.FC<IconLabelProps> = React.memo(
  ({ label, labelPosition, style, ...iconProps }) => {
    return (
      <Box
        style={[
          {
            flexDirection: labelPosition === "right" ? "row" : "column",
            alignItems: "center",
          },
          style,
        ]}
      >
        <Icon {...iconProps} />
        {label ? (
          <Text
            style={{
              marginTop: labelPosition === "below" ? Spacing.s : undefined,
              marginLeft: labelPosition === "right" ? Spacing.m : undefined,
            }}
            variant="body"
          >
            {label}
          </Text>
        ) : null}
      </Box>
    );
  }
);
