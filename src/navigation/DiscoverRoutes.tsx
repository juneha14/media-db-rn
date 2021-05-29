import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MediaScreen } from "../screens/Home";
import { Colors } from "../components/theme";
import {
  MediaDetailsParamList,
  MediaDetailsRoutes,
} from "./MediaDetailsRoutes";

export type DiscoverParamList = {
  MediaList: undefined;
} & MediaDetailsParamList;

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
      {MediaDetailsRoutes(Stack)}
    </Stack.Navigator>
  );
};
