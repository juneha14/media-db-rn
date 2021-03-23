import React from "react";
import { Text as RNText } from "react-native";
import { Colors, TextVariants } from "./theme";

interface TextProps {
  variant: keyof typeof TextVariants;
  color?: keyof typeof Colors;
}

export const Text: React.FC<TextProps> = ({ variant, color, children }) => {
  return (
    <RNText
      style={[
        { ...TextVariants[variant] },
        { color: color ?? TextVariants[variant].color },
      ]}
    >
      {children}
    </RNText>
  );
};
