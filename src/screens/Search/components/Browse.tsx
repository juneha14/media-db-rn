import React from "react";
import { StyleSheet } from "react-native";
import { Box } from "../../../components/Box";
import { Spacing, Colors } from "../../../components/theme";
import { ActionableRow } from "./ActionableRow";

export const Browse: React.FC = () => {
  return (
    <Box style={styles.container}>
      <ActionableRow
        title="Browse People"
        leftIcon="ios-people-outline"
        action="navigate"
        onRowPress={() =>
          console.log("========== File: Browse.tsx, Line: 10 ==========")
        }
      />
      <ActionableRow
        title="Browse Genres"
        leftIcon="ios-tv-outline"
        action="navigate"
        onRowPress={() =>
          console.log("========== File: Browse.tsx, Line: 10 ==========")
        }
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.defaultMargin,
    marginTop: Spacing.l,
    backgroundColor: Colors.SurfaceForeground,
  },
});
