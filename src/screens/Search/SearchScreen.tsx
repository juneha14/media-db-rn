import React, { useState } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../../components/Box";
import { IconLabel } from "../../components/Icons";
import { Icon, IconName } from "../../components/Icons/Icon";
import { Colors, Spacing } from "../../components/theme";
import { Text } from "../../components/Typography";

// Create search bar component
// Add search bar component to navigation header
// People list screen
// Genre list screen

export const SearchScreen: React.FC = () => {
  return (
    <>
      <SearchBar />
      <ScrollView
        style={{
          backgroundColor: Colors.SurfaceBackground,
        }}
      >
        <Browse
          onPressPeople={() =>
            console.log(
              "========== File: SearchScreen.tsx, Line: 20 =========="
            )
          }
          onPressGenres={() =>
            console.log(
              "========== File: SearchScreen.tsx, Line: 20 =========="
            )
          }
        />
        <RecentSearches
          searches={[
            "Bradl",
            "Cooper",
            "Godzilla",
            "Emily",
            "Harry Potter and the Prisoner of the Azakaban asdfadfkljad  asdaf.",
          ]}
        />
      </ScrollView>
    </>
  );
};

const SearchBar = () => {
  const { top } = useSafeAreaInsets();
  const [active, setActive] = useState(false);

  return (
    <Box
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingTop: top,
        paddingBottom: Spacing.m,
        paddingHorizontal: Spacing.m,
        backgroundColor: Colors.SurfaceNeutral,
      }}
    >
      <Box
        style={{
          flexGrow: 1,
          flexDirection: "row",
          alignItems: "center",
          padding: Spacing.m,
          marginRight: Spacing.m,
          borderRadius: 4,
          backgroundColor: Colors.SurfaceForeground,
        }}
      >
        <Icon name="ios-search-outline" size="small" />
        <TextInput
          style={{ color: Colors.TextNeutral, marginLeft: Spacing.m }}
          placeholder="Search for movies, actors, etc."
          placeholderTextColor={Colors.TextNeutral}
          enablesReturnKeyAutomatically
        />
        <Box />
      </Box>
      <Pressable style={{ flexShrink: 1, justifyContent: "flex-end" }}>
        <Text variant="body">Cancel</Text>
      </Pressable>
    </Box>
  );
};

const Browse = ({
  onPressPeople,
  onPressGenres,
}: {
  onPressPeople: () => void;
  onPressGenres: () => void;
}) => {
  return (
    <Box style={styles.sectionContainer}>
      <ActionableRow
        icon="ios-people-outline"
        title="Browse People"
        action="navigate"
        onPress={onPressPeople}
      />
      <ActionableRow
        icon="ios-tv-outline"
        title="Browse Genres"
        action="navigate"
        onPress={onPressGenres}
      />
    </Box>
  );
};

const RecentSearches = ({ searches }: { searches: string[] }) => {
  return (
    <Box style={[styles.sectionContainer, styles.recentSearches]}>
      <Text
        style={{ marginVertical: Spacing.m, marginLeft: -Spacing.s }}
        variant="body"
      >
        Recent Searches
      </Text>
      {searches.map((search) => {
        return (
          <ActionableRow
            key={search}
            icon="ios-time-outline"
            title={search}
            action="delete"
            onPress={() =>
              console.log(
                "========== File: SearchScreen.tsx, Line: 61 =========="
              )
            }
          />
        );
      })}
    </Box>
  );
};

const ActionableRow = ({
  icon,
  title,
  action,
  onPress,
  style,
}: {
  icon: IconName;
  title: string;
  action: "navigate" | "delete";
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Pressable style={[styles.row, style]} onPress={onPress}>
      <IconLabel
        style={{
          flexShrink: 1,
          marginRight: Spacing.s,
        }}
        name={icon}
        size="small"
        label={title}
        labelPosition="right"
      />
      <Icon
        style={{ flexGrow: 1, alignItems: "flex-end" }}
        name={
          action === "navigate"
            ? "ios-chevron-forward-outline"
            : "ios-close-outline"
        }
        size="small"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.defaultMargin,
    backgroundColor: Colors.SurfaceForeground,
  },
  recentSearches: {
    marginVertical: Spacing.l,
  },
  sectionContainer: {
    paddingHorizontal: Spacing.defaultMargin,
    backgroundColor: Colors.SurfaceForeground,
  },
});
