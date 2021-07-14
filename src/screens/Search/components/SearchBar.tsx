import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Icon, RemoveIcon } from "../../../components/Icons";
import { Spacing, Colors } from "../../../components/theme";

interface SearchBarProps {
  defaultQuery?: string;
  onSubmit: (text: string) => void;
  onClear: () => void;
  onCancel: () => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ defaultQuery, onSubmit, onClear, onCancel, style }) => {
    const [active, setActive] = useState(false);
    const [text, setText] = useState(defaultQuery ?? "");

    const textInputRef = useRef<TextInput>(null);

    const onFocus = useCallback(() => setActive(true), []);
    const onChangeText = useCallback((text: string) => setText(text), []);

    const onClearTextPress = useCallback(() => {
      setText("");
      textInputRef.current?.focus();
      onClear();
    }, [onClear]);

    const onCancelPress = useCallback(() => {
      setText("");
      setActive(false);
      Keyboard.dismiss();
      onCancel();
    }, [onCancel]);

    const onSubmitValue = useCallback((text: string) => () => onSubmit(text), [
      onSubmit,
    ]);

    // This is needed in order to update the search bar text whenever a new defaultQuery is passed in
    useEffect(() => {
      setText(defaultQuery ?? "");
      setActive(true);
    }, [defaultQuery]);

    return (
      <Box style={[styles.container, style]}>
        <Box style={styles.searchBar}>
          <Icon name="ios-search-outline" size="small" />
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            value={text}
            autoCorrect={false}
            placeholder="Search for movies, actors, etc."
            placeholderTextColor={Colors.TextNeutral}
            enablesReturnKeyAutomatically
            returnKeyType="search"
            onFocus={onFocus}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitValue(text)}
          />
          {text.length > 0 && (
            <RemoveIcon size="small" onPress={onClearTextPress} />
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
    borderRadius: 5,
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
