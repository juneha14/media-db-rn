import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MediaDetailsParamList,
  MediaDetailsRoutes,
} from "./MediaDetailsRoutes";
import { StackRouteParamList } from "./Routes";
import { Colors } from "../components/theme";
import { SearchScreen } from "../screens/Search";

type SearchParamList = Pick<StackRouteParamList, "Search"> &
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
      {MediaDetailsRoutes(Stack)}
    </Stack.Navigator>
  );
};
