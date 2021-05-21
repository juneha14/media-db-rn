import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Colors } from "../components/theme";
import { FavouriteScreen } from "../screens/Favourite";
import { MediaDetailsScreen } from "../screens/MediaDetails";

export type FavouriteParamList = {
  FavouriteList: undefined;
  MediaDetails: { id: number };
};

const Stack = createStackNavigator<FavouriteParamList>();

export const FavouriteRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavouriteList"
        component={FavouriteScreen}
        options={{
          headerTitle: "Favourites",
          headerTitleStyle: { color: Colors.TextOnSurfaceNeutral },
          headerStyle: { backgroundColor: Colors.SurfaceBackgroundPressed },
        }}
      />
      <Stack.Screen
        name="MediaDetails"
        component={MediaDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
