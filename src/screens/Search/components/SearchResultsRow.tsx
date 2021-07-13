import React, { useCallback } from "react";
import { StyleProp, ViewStyle, StyleSheet, Pressable } from "react-native";
import { IconLabel } from "../../../components/Icons";
import { Colors, Spacing } from "../../../components/theme";
import { useAppStackNavigation } from "../../../hooks";
import { Movie, Person } from "../../../models";

export type SearchResponse = (Movie | Person) & {
  mediaType: MediaType;
};

type MediaType = "movie" | "person";

interface SearchResultsRowProps {
  searchResponse: SearchResponse;
  style?: StyleProp<ViewStyle>;
}

export const SearchResultsRow: React.FC<SearchResultsRowProps> = ({
  searchResponse,
  style,
}) => {
  const { push } = useAppStackNavigation();

  const onPress = useCallback(() => {
    if (searchResponse.mediaType === "movie") {
      push("MediaDetails", { id: searchResponse.id });
    } else {
      push("CreditDetails", { id: searchResponse.id });
    }
  }, [searchResponse, push]);

  let title;
  if (searchResponse.mediaType === "movie") {
    const movie = searchResponse as Movie;
    title = movie.title;
  } else {
    const person = searchResponse as Person;
    title = person.name;
  }

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <IconLabel
        name={
          searchResponse.mediaType === "movie"
            ? "ios-film-outline"
            : "ios-person-outline"
        }
        size="small"
        color={Colors.TextSubdued}
        label={title}
        labelPosition="right"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.defaultMargin,
    backgroundColor: Colors.SurfaceForeground,
  },
});
