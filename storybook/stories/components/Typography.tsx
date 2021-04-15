import React from "react";
import { StyleSheet } from "react-native";
import { PageHeader } from "../../../src/components/PageHeader";
import { Text } from "../../../src/components/Text";

export const Typography: React.FC = () => {
  return (
    <>
      <PageHeader
        style={styles.margin}
        title="Page Header"
        description="Page header description"
      />
      <Text style={styles.margin} variant="sectionHeading">
        Section Header
      </Text>
      <Text style={styles.margin} variant="captionHeadingRegular">
        Regular Caption Header
      </Text>
      <Text style={styles.margin} variant="captionHeadingSmall">
        Small Caption Header
      </Text>
      <Text style={styles.margin} variant="body">
        Body text
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginBottom: 30,
  },
});
