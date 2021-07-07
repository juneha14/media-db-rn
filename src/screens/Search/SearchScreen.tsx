import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../components/theme";
import { Browse } from "./components/Browse";
import { RecentSearches } from "./components/RecentSearches";
import { SearchBar } from "./components/SearchBar";

export const SearchScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <SearchBar
        style={{ paddingTop: top }}
        onSubmit={(text) => console.log("==== Value of text:", text)}
      />
      <ScrollView
        style={{
          backgroundColor: Colors.SurfaceBackground,
        }}
      >
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
    </>
  );
};
