import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../../components/Box";
import { PaginatedList } from "../../components/PaginatedList";
import { QueryContainer } from "../../components/QueryContainer";
import { Colors } from "../../components/theme";
import { Text } from "../../components/Typography";
import { usePagination } from "../../hooks";
import { Browse } from "./components/Browse";
import { RecentSearches, useRecentSearches } from "./components/RecentSearches";
import { SearchBar } from "./components/SearchBar";
import {
  SearchResponse,
  SearchResultsRow,
} from "./components/SearchResultsRow";

export const SearchScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();

  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");

  const {
    isLoading,
    isFetching,
    errorMessage,
    nextPage,
    fetchNextPage,
    allData,
    refresh,
  } = useSearchQuery(query);

  const { recentSearches, addToRecent, removeFromRecent } = useRecentSearches();

  const onSubmitSearch = useCallback(
    (query: string) => {
      setSearching(true);
      setQuery(query);
      addToRecent(query);
    },
    [addToRecent]
  );

  const renderItem = useCallback(({ item }: { item: SearchResponse }) => {
    return <SearchResultsRow searchResponse={item} />;
  }, []);

  return (
    <>
      <SearchBar
        style={{ paddingTop: top }}
        defaultQuery={query}
        onSubmit={onSubmitSearch}
        onClear={() => setQuery("")}
        onCancel={() => {
          setSearching(false);
          setQuery("");
        }}
      />
      {searching ? (
        <QueryContainer
          wrapperStyle="unwrapped"
          isLoading={isLoading}
          isErrored={errorMessage !== undefined}
          onRetryQuery={() => refresh(true)}
        >
          <PaginatedList
            style={styles.background}
            contentContainerStyle={{ flexGrow: 1 }} // https://github.com/facebook/react-native/issues/17944#issuecomment-381724580
            keyExtractor={(item) => String(item.id)}
            isFetching={isFetching}
            data={allData ?? []}
            renderItem={renderItem}
            onEndReached={() => fetchNextPage({ page: nextPage })}
            ListEmptyComponent={<EmptySearchResults query={query} />}
          />
        </QueryContainer>
      ) : (
        <ScrollView style={styles.background}>
          <Browse />
          {recentSearches.length > 0 && (
            <RecentSearches
              searches={recentSearches}
              onSelectQuery={onSubmitSearch}
              onRemoveQuery={removeFromRecent}
            />
          )}
        </ScrollView>
      )}
    </>
  );
};

const EmptySearchResults = ({ query }: { query: string }) => {
  return (
    <Box
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="body">{`No results for "${query}"`}</Text>
    </Box>
  );
};

// Wrapper around `usePagination` hook
// This is needed so that we do not trigger a new search request when the query text is empty
const useSearchQuery = (text: string) => {
  const [query, setQuery] = useState(text);
  const response = usePagination<SearchResponse>("Search", { query, page: 1 });

  useEffect(() => {
    if (text.length > 0) setQuery(text);
  }, [text]);

  return response;
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.SurfaceBackground,
  },
});
