import React from "react";
import { View } from "react-native";
import { Rating } from "../../src/components/Rating";

export const Ratings: React.FC = () => {
  return (
    <View>
      <Rating rating={1.4} />
    </View>
  );
};
