import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Box } from "./Box";
import { LoadingIndicator } from "./LoadingIndicator";
import { Colors, Spacing } from "./theme";
import { Text } from "./Typography";

interface QueryContainerProps {
  isLoading: boolean;
  isErrored: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  errorMessage?: string;
  onRetryQuery?: () => void;
}

export const QueryContainer: React.FC<QueryContainerProps> = React.memo(
  ({
    isLoading,
    isErrored,
    errorMessage,
    isRefreshing = false,
    onRefresh,
    onRetryQuery,
    children,
  }) => {
    if (isLoading) return <LoadingIndicator style={styles.background} />;

    if (isErrored)
      return (
        <Box style={[styles.errorContainer, styles.background]}>
          <Text variant="captionHeadingRegular">
            {errorMessage ?? "Oops, something went wrong"}
          </Text>
          <TouchableOpacity
            style={styles.tryAgainButton}
            onPress={onRetryQuery}
          >
            <Text variant="body">Try again</Text>
          </TouchableOpacity>
        </Box>
      );

    return (
      <FlatList
        keyExtractor={(_, index) => String(index)}
        data={[children]}
        renderItem={({ item }) => <>{item}</>}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    );
  }
);

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.SurfaceBackground,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tryAgainButton: {
    marginTop: Spacing.m,
    padding: Spacing.m,
    borderRadius: 4,
    backgroundColor: Colors.ActionNeutral,
  },
});
