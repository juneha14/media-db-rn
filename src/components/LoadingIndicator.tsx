import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Box } from "./Box";

interface LoadingIndicatorProps {
  isFullScreen?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = React.memo(
  ({ isFullScreen = true, style }) => {
    return (
      <Box style={[isFullScreen && { flex: 1 }, styles.container, style]}>
        <ActivityIndicator />
      </Box>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
