import React, { PropsWithChildren } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Box } from "../Box";
import { LoadingIndicator } from "../LoadingIndicator";
import { Colors, Spacing } from "../theme";
import { Text } from "../Typography";
import { RefreshControl, ScrollView } from "react-native";

type ContentContainerStyle = "wrapped" | "unwrapped";

interface QueryStatusProps<S> {
  wrapperStyle: S;
  isLoading: boolean;
  isErrored: boolean;
  errorMessage?: string;
  onRetryQuery?: () => void;
}

interface QueryRefreshableProps<S> extends QueryStatusProps<S> {
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

type QueryContainerProps<S extends ContentContainerStyle> = S extends "wrapped"
  ? QueryRefreshableProps<S>
  : QueryStatusProps<S>;

/**
 * Centralized container to display query states (loading, error, success)
 * Provide a `wrapped` style to wrap the content in a ScrollView
 * Provide an `unwrapped` style when using a FlatList as the container's child
 */
export function QueryContainer<S extends ContentContainerStyle>(
  props: PropsWithChildren<QueryContainerProps<S>>
): JSX.Element {
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

  if (props.wrapperStyle === "wrapped" && isRefreshableProps(props)) {
    return (
      <ScrollView
        style={styles.background}
        scrollIndicatorInsets={{ right: 1 }} // https://github.com/facebook/react-native/issues/26610#issuecomment-539843444
        refreshControl={
          props.isRefreshing !== undefined && props.onRefresh !== undefined ? (
            <RefreshControl
              refreshing={props.isRefreshing}
              onRefresh={props.onRefresh}
            />
          ) : undefined
        }
      >
        {props.children}
      </ScrollView>
    );
  }

  return <>{props.children}</>;
}

function isRefreshableProps<S>(
  props: QueryStatusProps<S> | QueryRefreshableProps<S>
): props is QueryRefreshableProps<S> {
  const refreshable = props as QueryRefreshableProps<S>;
  return refreshable !== undefined;
}

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
