import React, { useMemo } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTextLayout } from "../hooks/useLayout";
import { Text } from "./Text";
import { Colors, Palette, Spacing } from "./theme";

interface RatingProps {
  rating: number;
  style?: StyleProp<ViewStyle>;
}

export const Rating: React.FC<RatingProps> = React.memo(({ rating, style }) => {
  const [layout, onLayout] = useTextLayout();
  const size = useMemo(() => {
    return Math.max(layout?.width ?? 0, layout?.height ?? 0) + 10;
  }, [layout?.width, layout?.height]);

  const outerContainerSize = useMemo(() => {
    const outerSize = size + Spacing.s;
    return {
      width: outerSize,
      height: outerSize,
      borderRadius: outerSize / 2,
    };
  }, [size]);
  const innerContainerSize = useMemo(() => {
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
    };
  }, [size]);

  return (
    <View style={[styles.outerContainer, outerContainerSize, style]}>
      <View style={[styles.innerContainer, innerContainerSize]}>
        <Text
          variant="body"
          color={fontColorForRating(rating)}
          onTextLayout={onLayout}
        >
          {rating.toFixed(1)}
        </Text>
      </View>
    </View>
  );
});

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
  outerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Border,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.SurfaceBackgroundPressed,
  },
});
