import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface TestButtonProps {}

export const TestButton: React.FC<TestButtonProps> = ({}) => {
  return (
    <TouchableOpacity>
      <Text>This is a button</Text>
    </TouchableOpacity>
  );
};
