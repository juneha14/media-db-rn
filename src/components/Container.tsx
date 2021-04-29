import React from "react";
import { StyleSheet } from "react-native";
import { Box } from "./Box";
import { Colors, Spacing } from "./theme";

interface ContainerProps {
  ignoreTopPadding?: boolean;
  ignoreBottomPadding?: boolean;
}

/**
 * This component is a simple container that holds all the screen's view to provide consistent background color and padding throughout the app
 */
export const Container: React.FC<ContainerProps> = React.memo(
  ({ ignoreTopPadding = false, ignoreBottomPadding = false, children }) => {
    return (
      <Box
        style={[
          styles.container,
          {
            paddingTop: ignoreTopPadding ? undefined : Spacing.l,
            paddingBottom: ignoreBottomPadding ? undefined : Spacing.l,
            paddingHorizontal: Spacing.l,
          },
        ]}
      >
        {children}
      </Box>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceBackground,
  },
});
