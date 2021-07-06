import React from "react";
import { StyleSheet } from "react-native";
import { Box } from "../../../components/Box";
import { Text } from "../../../components/Typography";
import { Colors, Spacing } from "../../../components/theme";
import { ActionableRow } from "./ActionableRow";

interface RecentSearchesProps {
  searches: string[];
  onSelectQuery: (search: string) => void;
  onRemoveQuery: (search: string) => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSelectQuery,
  onRemoveQuery,
}) => {
  return (
    <Box style={styles.container}>
      <Text
        style={styles.sectionHeader}
        variant="body"
        color={Colors.TextNeutral}
      >
        Recent Searches
      </Text>
      {searches.map((search) => {
        return (
          <ActionableRow
            key={search}
            title={search}
            leftIcon="ios-time-outline"
            action="remove"
            onRowPress={() => onSelectQuery(search)}
            onRightIconPress={() => onRemoveQuery(search)}
          />
        );
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.defaultMargin,
    marginTop: Spacing.l,
    backgroundColor: Colors.SurfaceForeground,
  },
  sectionHeader: {
    marginLeft: -Spacing.s,
    marginVertical: Spacing.m,
  },
});
