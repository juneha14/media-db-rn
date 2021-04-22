import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { Colors, TextVariants } from "../theme";

interface TextProps extends RNTextProps {
  variant: keyof typeof TextVariants;
  color?: keyof typeof Colors | string;
}

export const Text: React.FC<TextProps> = React.memo(
  ({ variant, color, children, style, ...rest }) => {
    return (
      <RNText
        {...rest}
        style={[
          { ...TextVariants[variant] },
          { color: color ?? TextVariants[variant].color },
          style,
        ]}
      >
        {children}
      </RNText>
    );
  }
);
