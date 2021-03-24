import React from "react";
import { View } from "react-native";
import { Rating } from "../../../src/components/Rating";
import { spacing } from "../../../src/components/theme";

export const Ratings: React.FC = () => {
  return (
    <View>
      <Rating style={{ marginBottom: spacing(1) }} rating={1.4} />
      <Rating style={{ marginBottom: spacing(1) }} rating={7.8} />
      <Rating style={{ marginBottom: spacing(1) }} rating={9.5} />
    </View>
  );
};
