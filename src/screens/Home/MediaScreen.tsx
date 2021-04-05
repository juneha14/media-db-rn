import React, { useCallback, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { Spacing } from "../../components/theme";
import { usePagination } from "../../hooks";
import { TMovie } from "../../models";
import { MediaCell } from "./MediaCell";

export const MediaScreen: React.FC = () => {
  const {
    isLoading,
    isFetching,
    errorMessage,
    page,
    fetchNextPage,
    allData,
  } = usePagination<TMovie>("NowPlayingMovies", { page: 1 });

  useEffect(() => {
    console.log("==== Value of allData:", allData);
  }, [allData]);

  const width = useMemo(() => {
    // (screenWidth / 2) - (paddingHorizontal / 2 + marginHorizontal / 2)
    return Dimensions.get("window").width / 2 - 15;
  }, []);

  const onSelectCell = useCallback((id: number) => {
    console.log("==== Value of id:", id);
  }, []);

  const onSelectLike = useCallback(
    (pressed: boolean) => {
      console.log("==== Value of pressed:", pressed);
      fetchNextPage({ page: page + 1 });
    },
    [fetchNextPage, page]
  );

  const renderItem = useCallback(
    ({
      item: { id, posterPath, title, releaseDate, voteAverage },
    }: {
      item: TMovie;
    }) => {
      return (
        <MediaCell
          style={styles.cellContainer}
          id={id}
          posterImgUrl={posterPath}
          title={title}
          releaseDate={releaseDate}
          rating={voteAverage}
          width={width}
          onPress={onSelectCell}
          onLikePress={onSelectLike}
        />
      );
    },
    [width, onSelectCell, onSelectLike]
  );

  if (isLoading) return <LoadingIndicator />;
  if (errorMessage) return <Text>{errorMessage}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        data={allData}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  cellContainer: {
    marginHorizontal: 5,
    marginBottom: Spacing.m,
  },
});
