import React, { useMemo } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Box } from "./Box";
import { Text } from "./Text";
import { Colors, Palette } from "./theme";
import { max } from "lodash";

interface RatingProps {
  rating: number;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const Rating: React.FC<RatingProps> = React.memo(
  ({ rating, size, style }) => {
    const borderSize = useMemo(() => {
      return max([size, 44]) ?? 44;
    }, [size]);

    return (
      <Box style={style}>
        <Box
          style={[
            styles.container,
            {
              width: borderSize,
              height: borderSize,
              borderRadius: borderSize / 2,
            },
          ]}
        >
          <Text variant="body" color={fontColorForRating(rating)}>
            {rating.toFixed(1)}
          </Text>
        </Box>
      </Box>
    );
  }
);

const fontColorForRating = (rating: number) => {
  if (rating <= 5) {
    return Palette.Red.L1;
  } else if (rating > 5 && rating < 8) {
    return Palette.Yellow.L1;
  } else {
    return Palette.Green.L1;
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.Border,
    borderWidth: 1,
  },
});
