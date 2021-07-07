import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Box } from "../../components/Box";
import { Icon } from "../../components/Icons";
import { QueryContainer } from "../../components/QueryContainer";
import { Colors, Spacing } from "../../components/theme";
import { Text } from "../../components/Typography";
import { useAppStackNavigation, useFetch } from "../../hooks";
import { Genre } from "../../models";

type RemoteGenresList = { genres: Genre[] };

export const GenreListScreen: React.FC = () => {
  const { isLoading, error, data, refresh } = useFetch<RemoteGenresList>(
    "GenreMovieList"
  );
  const { push } = useAppStackNavigation();

  const renderItem = useCallback(
    ({ item }: { item: Genre }) => {
      return (
        <Pressable onPress={() => push("GenreDetails", { genre: item })}>
          <Box style={styles.row}>
            <Text variant="captionHeadingSmall">{item.name}</Text>
            <Icon name={"ios-chevron-forward-outline"} size="small" />
          </Box>
        </Pressable>
      );
    },
    [push]
  );

  return (
    <QueryContainer
      wrapperStyle="unwrapped"
      isLoading={isLoading}
      isErrored={error !== undefined}
      onRetryQuery={() => refresh()}
    >
      <FlatList
        style={styles.container}
        keyExtractor={(item) => String(item.id)}
        data={data?.genres}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
      />
    </QueryContainer>
  );
};

const Divider = () => {
  return <Box style={styles.divider} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceBackgroundPressed,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.defaultMargin,
  },
  divider: {
    height: 0.5,
    marginLeft: Spacing.defaultMargin,
    backgroundColor: Colors.Border,
  },
});
