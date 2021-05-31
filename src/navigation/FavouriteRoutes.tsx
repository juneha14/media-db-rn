import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Colors } from "../components/theme";
import { FavouriteScreen } from "../screens/Favourite";
import {
  MediaDetailsParamList,
  MediaDetailsRoutes,
} from "./MediaDetailsRoutes";

export type FavouriteParamList = {
  FavouriteList: undefined;
} & MediaDetailsParamList;

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
          headerTitle: "Favourites",
        }}
      />
      {MediaDetailsRoutes(Stack)}
    </Stack.Navigator>
  );
};
