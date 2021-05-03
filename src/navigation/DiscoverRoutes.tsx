import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { MediaScreen } from "../screens/Home/MediaScreen";
import { MediaDetailsScreen } from "../screens/MediaDetails/MediaDetailsScreen";

export type DiscoverParamList = {
  MediaList: undefined;
  MediaDetails: { id: number };
};

const Stack = createStackNavigator<DiscoverParamList>();

export const DiscoverRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MediaList"
      screenOptions={{ headerBackTitle: "" }}
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
    </Stack.Navigator>
  );
};
