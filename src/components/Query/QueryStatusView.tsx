import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Box } from "../Box";
import { LoadingIndicator } from "../LoadingIndicator";
import { Colors, Spacing } from "../theme";
import { Text } from "../Typography";

export interface QueryStatusViewProps {
  isLoading: boolean;
  isErrored: boolean;
  errorMessage?: string;
  onRetryQuery?: () => void;
}

export const QueryStatusView: React.FC<QueryStatusViewProps> = React.memo(
  ({ isLoading, isErrored, errorMessage, onRetryQuery, children }) => {
    if (isLoading) return <LoadingIndicator style={styles.background} />;

    if (isErrored)
      return (
        <Box style={[styles.container, styles.background]}>
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

    return <>{children}</>;
  }
);

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.SurfaceBackground,
  },
  container: {
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
