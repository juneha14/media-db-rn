import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Box } from "../../../components/Box";
import { Text } from "../../../components/Typography";
import { Colors, Spacing } from "../../../components/theme";
import { ActionableRow } from "./ActionableRow";
import { usePersistedState } from "../../../hooks";

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

interface RecentSearchesState {
  recentSearches: string[];
  addToRecent: (query: string) => void;
  removeFromRecent: (query: string) => void;
  removeAll: () => void;
}

export function useRecentSearches(): RecentSearchesState {
  const [searches, setSearches] = usePersistedState<string[]>(
    "RecentSearches",
    []
  );

  const addToRecent = useCallback(
    (query: string) => {
      const trimmed = query.trim();

      if (searches?.includes(trimmed)) {
        const oldSearches = searches.filter((s) => s !== trimmed);
        const newSearches = [trimmed, ...oldSearches];
        setSearches(newSearches);
      } else {
        const newSearches = [trimmed, ...(searches ?? [])].slice(0, 20);
        setSearches(newSearches);
      }
    },
    [searches, setSearches]
  );

  const removeFromRecent = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      const newSearches = searches?.filter((s) => s !== trimmed) ?? [];
      setSearches(newSearches);
    },
    [searches, setSearches]
  );

  const removeAll = useCallback(() => {
    setSearches([]);
  }, [setSearches]);

  return {
    recentSearches: searches ?? [],
    addToRecent,
    removeFromRecent,
    removeAll,
  };
}
