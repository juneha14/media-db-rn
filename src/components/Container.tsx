import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "./Box";
import { BackArrow } from "./Icons";
import { Colors, Spacing } from "./theme";

interface ContainerProps {
  ignoreTopPadding?: boolean;
  ignoreBottomPadding?: boolean;
  onNavigateBack?: () => void;
}

/**
 * This component is a simple container that holds all the screen's view to provide consistent background color and padding throughout the app
 */
export const Container: React.FC<ContainerProps> = React.memo(
  ({
    ignoreTopPadding = false,
    ignoreBottomPadding = false,
    onNavigateBack,
    children,
  }) => {
    const { top, left } = useSafeAreaInsets();

    return (
      <>
        {onNavigateBack && (
          <BackArrow
            style={{ position: "absolute", left: left + 15, top, zIndex: 100 }}
            size="large"
            onPress={onNavigateBack}
          />
        )}
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
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceBackground,
  },
});
