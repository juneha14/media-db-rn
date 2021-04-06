import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";

interface LoadingIndicatorProps {
  isFullScreen?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = React.memo(
  ({ isFullScreen = true, style }) => {
    return (
      <View style={[isFullScreen && { flex: 1 }, styles.container, style]}>
        <ActivityIndicator />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
