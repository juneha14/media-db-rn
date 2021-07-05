import React, { useCallback, useRef, useState } from "react";
import {
  Pressable,
  Keyboard,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInput,
} from "react-native";
import { Box } from "../../../components/Box";
import { Text } from "../../../components/Typography";
import { Icon } from "../../../components/Icons";
import { Spacing, Colors } from "../../../components/theme";

interface SearchBarProps {
  onSubmit: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ onSubmit, style }) => {
    const [active, setActive] = useState(false);
    const [text, setText] = useState("");

    const textInputRef = useRef<TextInput>(null);

    const onFocus = useCallback(() => setActive(true), []);
    const onChangeText = useCallback((text: string) => setText(text), []);

    const onClearTextPress = useCallback(() => {
      setText("");
      textInputRef.current?.clear();
    }, []);

    const onCancelPress = useCallback(() => {
      setText("");
      setActive(false);
      Keyboard.dismiss();
      textInputRef.current?.clear();
    }, []);

    const onSubmitValue = useCallback((text: string) => () => onSubmit(text), [
      onSubmit,
    ]);

    return (
      <Box style={[styles.container, style]}>
        <Box style={styles.searchBar}>
          <Icon name="ios-search-outline" size="small" />
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder="Search for movies, actors, etc."
            placeholderTextColor={Colors.TextNeutral}
            enablesReturnKeyAutomatically
            onFocus={onFocus}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitValue(text)}
          />
          {text.length > 0 && (
            <Pressable onPress={onClearTextPress}>
              <Icon name="ios-close-outline" size="small" />
            </Pressable>
          )}
          <Box />
        </Box>
        {active && (
          <Pressable style={styles.cancel} onPress={onCancelPress}>
            <Text variant="body">Cancel</Text>
          </Pressable>
        )}
      </Box>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: Spacing.m,
    paddingHorizontal: Spacing.m,
    backgroundColor: Colors.SurfaceBackgroundPressed,
  },
  searchBar: {
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.m,
    marginRight: Spacing.m,
    borderRadius: 4,
    backgroundColor: Colors.SurfaceNeutral,
  },
  textInput: {
    flex: 1,
    color: Colors.TextNeutral,
    marginLeft: Spacing.m,
  },
  cancel: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
