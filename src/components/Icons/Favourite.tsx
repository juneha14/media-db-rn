import React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Box } from "../Box";
import { PressableIcon, PressableIconProps } from "../PressableIcon";
import { Text } from "../Text";
import { Spacing } from "../theme";
import { noop } from "lodash";

interface FavouriteIconProps
  extends Pick<PressableIconProps, "size" | "encloseInBorder"> {
  caption?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (pressed: boolean) => void;
}

export const FavouriteIcon: React.FC<FavouriteIconProps> = React.memo(
  ({ size, encloseInBorder, caption, onPress, style }) => {
    return (
      <Box style={[{ alignItems: "center" }, style]}>
        <PressableIcon
          style={styles.icon}
          unfilledIconName="heart-outline"
          filledIconName="heart"
          size={size}
          encloseInBorder={encloseInBorder}
          onPress={onPress ? onPress : noop}
        />
        {caption ? (
          <Text style={{ marginTop: Spacing.s }} variant="body">
            {caption}
          </Text>
        ) : null}
      </Box>
    );
  }
);

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
