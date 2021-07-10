import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PaginatedList } from "../../components/PaginatedList";
import { QueryContainer } from "../../components/QueryContainer";
import { Colors } from "../../components/theme";
import { Text } from "../../components/Typography";
import { usePagination } from "../../hooks";
import { Movie, Person } from "../../models";
import { Browse } from "./components/Browse";
import { RecentSearches } from "./components/RecentSearches";
import { SearchBar } from "./components/SearchBar";

// UI row
// Request to use unique id instead of incrementing number
// useImgUri should be dependent on type of image (i.e. poster, backdrop, profile)

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
  } = usePagination<SearchResponse>("Search", { query, page: 1 });

  const onSubmitSearch = useCallback((query: string) => {
    setSearching(true);
    setQuery(query);
  }, []);

  const renderItem = useCallback(({ item }: { item: SearchResponse }) => {
    return (
      <>
        <Text variant="body">{item.id}</Text>
        <Text variant="body">{item.mediaType}</Text>
      </>
    );
  }, []);

  return (
    <>
      <SearchBar
        style={{ paddingTop: top }}
        onSubmit={onSubmitSearch}
        onCancel={() => setSearching(false)}
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
            keyExtractor={(item) => String(item.id)}
            isFetching={isFetching}
            data={allData}
            renderItem={renderItem}
            onEndReached={() => fetchNextPage({ page: nextPage })}
          />
        </QueryContainer>
      ) : (
        <ScrollView style={styles.background}>
          <Browse />
          <RecentSearches
            searches={[
              "Bradl",
              "Cooper",
              "Godzilla",
              "Emily",
              "Harry Potter and the Prisoner of the Azakaban asdfadfkljad  asdaf.",
            ]}
            onSelectQuery={(query) =>
              console.log("==== Value of added query:", query)
            }
            onRemoveQuery={(query) =>
              console.log("==== Value of removed query:", query)
            }
          />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.SurfaceBackground,
  },
});

type SearchResponse = (Movie | Person) & {
  mediaType: "movie" | "tv" | "person";
};
