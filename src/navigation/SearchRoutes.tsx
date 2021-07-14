import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MediaDetailsParamList,
  MediaDetailsRoutes,
} from "./MediaDetailsRoutes";
import { StackRouteParamList } from "./Routes";
import { Colors } from "../components/theme";
import { PeopleListScreen, SearchScreen } from "../screens/Search";
import { GenreListScreen } from "../screens/Genre";

type SearchParamList = Pick<
  StackRouteParamList,
  "Search" | "PeopleList" | "GenreList"
> &
  MediaDetailsParamList;

const Stack = createStackNavigator<SearchParamList>();

export const SearchRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerBackTitle: "",
        headerTitleStyle: { color: Colors.TextOnSurfaceNeutral },
        headerStyle: { backgroundColor: Colors.SurfaceBackgroundPressed },
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PeopleList"
        component={PeopleListScreen}
        options={{ headerTitle: "Trending People" }}
      />
      <Stack.Screen
        name="GenreList"
        component={GenreListScreen}
        options={{ headerTitle: "Genres" }}
      />
      {MediaDetailsRoutes(Stack)}
    </Stack.Navigator>
  );
};
