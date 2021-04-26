import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
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
  onSelectTryAgain?: () => void;
}

export const QueryContainer: React.FC<QueryContainerProps> = ({
  isLoading,
  isErrored,
  errorMessage,
  isRefreshing = false,
  onRefresh,
  onSelectTryAgain,
  children,
}) => {
  if (isLoading) return <LoadingIndicator />;

  if (isErrored)
    return (
      <Box style={styles.errorContainer}>
        <Text variant="captionHeadingRegular">
          {errorMessage ?? "Oops, something went wrong"}
        </Text>
        <Pressable style={styles.tryAgainButton} onPress={onSelectTryAgain}>
          <Text variant="body">Try again</Text>
        </Pressable>
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
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.SurfaceBackground,
  },
  tryAgainButton: {
    marginTop: Spacing.m,
    padding: Spacing.m,
    borderRadius: 4,
    backgroundColor: Colors.ActionNeutral,
  },
});
