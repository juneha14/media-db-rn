import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { PaginatedList } from "../../components/PaginatedList";
import { ContentPreview } from "../../components/Preview";
import { QueryContainer } from "../../components/QueryContainer";
import { Colors, Spacing } from "../../components/theme";
import { useAppStackNavigation, usePagination } from "../../hooks";
import { Person } from "../../models";

export const PeopleListScreen: React.FC = () => {
  const { push } = useAppStackNavigation();

  const {
    isLoading,
    isFetching,
    isRefreshing,
    errorMessage,
    nextPage,
    fetchNextPage,
    allData,
    refresh,
  } = usePagination<Person>("PopularPeople", { page: 1 });

  const onSelectPerson = useCallback(
    (id: number) => () => push("CreditDetails", { id }),
    [push]
  );

  const renderItem = useCallback(
    ({ item }: { item: Person }) => {
      const knownFor = item.knownFor
        .map((media) => media.title)
        .filter((media) => media !== undefined)
        .join(", ");

      return (
        <ContentPreview
          style={styles.row}
          imgUrl={item.profilePath}
          title={item.name}
          description={knownFor}
          onPress={onSelectPerson(item.id)}
        />
      );
    },
    [onSelectPerson]
  );

  return (
    <QueryContainer
      wrapperStyle="unwrapped"
      isLoading={isLoading}
      isErrored={errorMessage !== undefined}
      onRetryQuery={() => refresh(true)}
    >
      <PaginatedList
        style={styles.container}
        keyExtractor={(item) => String(item.id)}
        isFetching={isFetching}
        refreshing={isRefreshing}
        data={allData}
        renderItem={renderItem}
        onEndReached={() => fetchNextPage({ page: nextPage })}
        onRefresh={() => refresh(false)}
      />
    </QueryContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceBackground,
  },
  row: {
    paddingHorizontal: Spacing.defaultMargin,
    paddingVertical: Spacing.m,
  },
});
