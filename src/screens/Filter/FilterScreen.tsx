import React, { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { NavigationBarItem } from "../../components/Navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Box } from "../../components/Box";
import { Caption } from "../../components/Caption";
import { CheckmarkIcon } from "../../components/Icons";
import { Colors, Spacing } from "../../components/theme";
import { Text } from "../../components/Typography";
import { useAppStackNavigation, useRouteParams } from "../../hooks";
import { SortOption } from "../../models";

export const FilterScreen: React.FC = () => {
  const { setOptions, pop, navigate } = useAppStackNavigation();
  const {
    params: { option },
  } = useRouteParams<"Filter">();

  const [selectedOption, setSelectedOption] = useState<SortOption>(
    option ?? "popular"
  );

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => (
        <NavigationBarItem
          title="Cancel"
          position="left"
          onPress={() => pop()}
        />
      ),
    });
  }, [setOptions, pop]);

  return (
    <>
      <ScrollView style={styles.container}>
        <OptionGroup
          options={[
            {
              option: "popular",
              selected: selectedOption === "popular",
              onPress: () => setSelectedOption("popular"),
            },
          ]}
        />
        <OptionGroup
          headerTitle="Rating"
          options={[
            {
              option: "rating_desc",
              selected: selectedOption === "rating_desc",
              onPress: () => setSelectedOption("rating_desc"),
            },
            {
              option: "rating_asc",
              selected: selectedOption === "rating_asc",
              onPress: () => setSelectedOption("rating_asc"),
            },
          ]}
        />
        <OptionGroup
          headerTitle="Release Date"
          options={[
            {
              option: "date_desc",
              selected: selectedOption === "date_desc",
              onPress: () => setSelectedOption("date_desc"),
            },
            {
              option: "date_asc",
              selected: selectedOption === "date_asc",
              onPress: () => setSelectedOption("date_asc"),
            },
          ]}
        />
      </ScrollView>
      <FooterActionButtons
        onClearAllPress={() => setSelectedOption("none")}
        onApplyPress={() =>
          navigate("GenreDetails", { sortOption: selectedOption })
        }
      />
    </>
  );
};

interface Option {
  option: SortOption;
  selected: boolean;
  onPress: () => void;
}

const OptionGroup = ({
  headerTitle,
  options,
}: {
  headerTitle?: string;
  options: Option[];
}) => {
  return (
    <Box style={styles.optionGroup}>
      {headerTitle && <Text variant="captionHeadingSmall">{headerTitle}</Text>}
      <Box
        style={{
          marginTop: headerTitle ? Spacing.s : undefined,
          borderRadius: 8,
          backgroundColor: Colors.SurfaceForeground,
        }}
      >
        {options.map(({ option, selected, onPress }, index) => {
          const title = titleForSortOption[option];
          return (
            <Box key={title + index}>
              <Pressable
                style={{ padding: Spacing.l }}
                key={title + index}
                onPress={onPress}
              >
                <Caption
                  title={title}
                  rightAccessory={
                    selected ? <CheckmarkIcon size="small" /> : undefined
                  }
                  rightAccessoryPosition="center"
                />
              </Pressable>
              {index < options.length - 1 && <Divider />}
            </Box>
          );
        })}
      </Box>
      <Box />
    </Box>
  );
};

const Divider = ({
  includeLeftMargin = true,
}: {
  includeLeftMargin?: boolean;
}) => (
  <Box
    style={[
      styles.divider,
      { marginLeft: includeLeftMargin ? Spacing.l : undefined }, // Same as paddingLeft on <Pressable ... />
    ]}
  />
);

const FooterActionButtons = ({
  onClearAllPress,
  onApplyPress,
}: {
  onClearAllPress: () => void;
  onApplyPress: () => void;
}) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <>
      <Divider includeLeftMargin={false} />
      <Box
        style={[
          styles.footerContainer,
          { paddingBottom: bottom + Spacing.m, paddingTop: Spacing.m },
        ]}
      >
        <Pressable onPress={onClearAllPress}>
          <Text variant="body">Clear all</Text>
        </Pressable>
        <Pressable style={styles.applyButton} onPress={onApplyPress}>
          <Text variant="body">Apply</Text>
        </Pressable>
      </Box>
    </>
  );
};

const titleForSortOption: Record<SortOption, string> = {
  popular: "Most popular",
  rating_asc: "Low → High",
  rating_desc: "High → Low",
  date_asc: "Oldest",
  date_desc: "Newest",
  none: "",
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.defaultMargin,
    paddingTop: Spacing.defaultMargin,
    flex: 1,
    backgroundColor: Colors.SurfaceBackground,
  },
  optionGroup: {
    marginVertical: Spacing.defaultMargin,
  },
  divider: {
    height: 0.5,
    backgroundColor: Colors.Border,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.defaultMargin,
    backgroundColor: Colors.SurfaceBackground,
  },
  applyButton: {
    padding: Spacing.l,
    borderRadius: 8,
    backgroundColor: Colors.SurfaceForeground,
  },
});
