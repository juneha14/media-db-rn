import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MediaDetailsParamList,
  MediaDetailsRoutes,
} from "./MediaDetailsRoutes";
import { StackRouteParamList } from "./Routes";
import { FavouriteScreen } from "../screens/Favourite";
import { Colors } from "../components/theme";

type FavouriteParamList = Pick<StackRouteParamList, "FavouriteList"> &
  MediaDetailsParamList;

const Stack = createStackNavigator<FavouriteParamList>();

export const FavouriteRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "",
        headerTitleStyle: { color: Colors.TextOnSurfaceNeutral },
        headerStyle: { backgroundColor: Colors.SurfaceBackgroundPressed },
      }}
    >
      <Stack.Screen
        name="FavouriteList"
        component={FavouriteScreen}
        options={{
          headerLeft: () => null,
          headerTitle: "Favourites",
        }}
      />
      {MediaDetailsRoutes(Stack)}
    </Stack.Navigator>
  );
};
