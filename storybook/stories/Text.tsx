import React from "react";
import { View } from "react-native";
import { Text } from "../../src/components/Text";

export const Typography: React.FC = () => {
  return (
    <View>
      <Text variant="pageHeading">Page Header</Text>
      <Text variant="sectionHeading">Section Header</Text>
      <Text variant="captionHeadingRegular">Regular Caption Header</Text>
      <Text variant="captionHeadingSmall">Small Caption Header</Text>
      <Text variant="body">Body text</Text>
    </View>
  );
};
