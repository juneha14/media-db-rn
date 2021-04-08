import React from "react";
import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
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
      <View style={[styles.container, style]}>
        <PressableIcon
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
