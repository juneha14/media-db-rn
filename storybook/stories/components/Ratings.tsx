import React from "react";
import { View } from "react-native";
import { Rating } from "../../../src/components/Rating";
import { Spacing } from "../../../src/components/theme";

export const Ratings: React.FC = () => {
  return (
    <View>
      <Rating style={{ marginBottom: Spacing.l }} rating={1.4} />
      <Rating style={{ marginBottom: Spacing.l }} rating={7.8} />
      <Rating style={{ marginBottom: Spacing.l }} rating={9.5} />
      <Rating style={{ marginBottom: Spacing.l }} rating={1000} size={60} />
    </View>
  );
};
