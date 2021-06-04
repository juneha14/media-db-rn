import React, { useCallback, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  TextLayoutEventData,
  ViewStyle,
} from "react-native";
import { Box } from "../Box";
import { Colors, Spacing, TextVariants } from "../theme";
import { Text } from "./Text";

interface CollapsableTextProps {
  text: string;
  variant?: keyof typeof TextVariants;
  maxCollapsedLines?: number;
  style?: StyleProp<ViewStyle>;
}

export const CollapsableText: React.FC<CollapsableTextProps> = React.memo(
  ({ text, variant = "body", maxCollapsedLines = 2, style }) => {
    const [collapsed, setCollapsed] = useState(true);
    const [numberOfLines, setNumberOfLines] = useState(0);
    const expandedLines = useRef<number>();

    const onShowMorePress = useCallback(() => {
      setCollapsed((collapsed) => {
        setNumberOfLines(collapsed ? 0 : maxCollapsedLines);
        return !collapsed;
      });
    }, [maxCollapsedLines]);

    const onTextLayout = useCallback(
      (event: NativeSyntheticEvent<TextLayoutEventData>) => {
        // Calculate the total non-collapsed number of lines only once
        if (!expandedLines.current) {
          expandedLines.current = event.nativeEvent.lines.length;
          setNumberOfLines(maxCollapsedLines);
        }
      },
      [maxCollapsedLines]
    );

    return (
      <Box style={style}>
        <Text
          onTextLayout={onTextLayout}
          variant={variant}
          numberOfLines={numberOfLines}
        >
          {text}
        </Text>
        {maxCollapsedLines !== expandedLines.current ? (
          <Pressable style={styles.showMore} onPress={onShowMorePress}>
            <Text variant="body" color={Colors.TextInteractive}>
              {collapsed ? "Show more" : "Show less"}
            </Text>
          </Pressable>
        ) : null}
      </Box>
    );
  }
);

const styles = StyleSheet.create({
  showMore: {
    marginTop: Spacing.m,
  },
});
