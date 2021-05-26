import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Movie } from "../models";
import { MediaScreen } from "../screens/Home";
import { MediaDetailsScreen } from "../screens/MediaDetails";
import { RecommendedScreen } from "../screens/Recommended";
import { Colors } from "../components/theme";

export type DiscoverParamList = {
  MediaList: undefined;
  MediaDetails: { id: number };
  RecommendedList: { recommended: Movie[] };
};

const Stack = createStackNavigator<DiscoverParamList>();

export const DiscoverRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MediaList"
      screenOptions={{
        headerBackTitle: "", // empty string defaults to 'Back'
        headerTitleStyle: { color: Colors.TextOnSurfaceNeutral },
        headerStyle: { backgroundColor: Colors.SurfaceBackgroundPressed },
      }}
    >
      <Stack.Screen
        name="MediaList"
        component={MediaScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MediaDetails"
        component={MediaDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecommendedList"
        component={RecommendedScreen}
        options={{
          headerTitle: "Recommendations",
        }}
      />
    </Stack.Navigator>
  );
};
