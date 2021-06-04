import React from "react";
import { StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { ContentViewDark } from "../../../storybook/ContentView";
import { PageHeader } from "./PageHeader";
import { Box } from "../Box";
import { Text } from "./Text";
import { CollapsableText } from "./CollapsableText";

storiesOf("Typography", module)
  .addDecorator(ContentViewDark)
  .add("typography", () => (
    <Box>
      <Text style={styles.container} variant="pageHeading">
        Page Heading
      </Text>
      <Text style={styles.container} variant="sectionHeading">
        Section Heading
      </Text>
      <Text style={styles.container} variant="captionHeadingRegular">
        Caption Regular Heading
      </Text>
      <Text style={styles.container} variant="captionHeadingSmall">
        Caption Small Heading
      </Text>
      <Text style={styles.container} variant="body">
        Body: The quick brown fox ran down the slope
      </Text>
    </Box>
  ))
  .add("page header", () => (
    <Box>
      <PageHeader style={styles.container} title="Godzilla vs Kong" />
      <PageHeader
        style={styles.container}
        title="Godzilla vs Kong"
        subtitle="2020-03-30"
      />
    </Box>
  ))
  .add("collapsable text", () => (
    <Box>
      <CollapsableText
        style={styles.container}
        text="Godzilla vs King Kong. The Battle of the ages. In a distant world, the two monsters will battle it out on Earth to decide who is the real king"
        maxCollapsedLines={2}
      />
    </Box>
  ));

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
});
