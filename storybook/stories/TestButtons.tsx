import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TestButton } from "../../src/components/TestButton";

export const TestButtons: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <TestButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
