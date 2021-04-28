import React, { PropsWithChildren } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Box } from "../Box";
import { LoadingIndicator } from "../LoadingIndicator";
import { Colors, Spacing } from "../theme";
import { Text } from "../Typography";
import { RefreshControl, ScrollView } from "react-native";

interface QueryStatusProps {
  isLoading: boolean;
  isErrored: boolean;
  errorMessage?: string;
  onRetryQuery?: () => void;
}

interface QueryRefreshableProps extends QueryStatusProps {
  isRefreshing: boolean;
  onRefresh?: () => void;
}

type ContentContainerStyle = "wrapped" | "non-wrapped";
type QueryContainerProps<S extends ContentContainerStyle> = S extends "wrapped"
  ? QueryRefreshableProps
  : QueryStatusProps;

export function QueryContainer<S extends ContentContainerStyle>(
  props: PropsWithChildren<QueryContainerProps<S>>
): JSX.Element {
  console.log("========== File: QueryContainer.tsx, Line: 29 ==========");
  if (props.isLoading) return <LoadingIndicator style={styles.background} />;

  if (props.isErrored)
    return (
      <Box style={[styles.errorContainer, styles.background]}>
        <Text variant="captionHeadingRegular">
          {props.errorMessage ?? "Oops, something went wrong"}
        </Text>
        <TouchableOpacity
          style={styles.tryAgainButton}
          onPress={props.onRetryQuery}
        >
          <Text variant="body">Try again</Text>
        </TouchableOpacity>
      </Box>
    );

  if (isRefreshableProps(props)) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={props.isRefreshing}
            onRefresh={props.onRefresh}
          />
        }
      >
        {props.children}
      </ScrollView>
    );
  }

  return <>{props.children}</>;
}

const isRefreshableProps = (
  props: QueryStatusProps | QueryRefreshableProps
): props is QueryRefreshableProps => {
  const refreshable = props as QueryRefreshableProps;
  return refreshable.isRefreshing !== undefined;
};

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
