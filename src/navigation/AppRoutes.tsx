import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { TabRoutes } from "./TabRoutes";
import { FilterScreen } from "../screens/Filter";
import { Colors } from "../components/theme";
import { Text } from "../components/Typography";

export type AppParamList = ModalParamList & { Tabs: undefined };

const Stack = createStackNavigator<AppParamList>();

export const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tabs"
        mode="modal"
        screenOptions={modalScreenOptions}
      >
        <Stack.Screen
          name="Tabs"
          component={TabRoutes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{ headerLeft: () => <Text variant="body">Hello</Text> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const modalScreenOptions: StackNavigationOptions = {
  ...TransitionPresets.ModalPresentationIOS,
  cardOverlayEnabled: true,
  headerStatusBarHeight: 12,
  headerTitleStyle: { color: Colors.TextOnSurfaceNeutral },
  headerStyle: {
    backgroundColor: Colors.SurfaceBackgroundPressed,
    shadowColor: Colors.Border, // Border underneath the navigation header
  },
};

type ModalParamList = {
  Filter: { onSelectSortOption: (option: string) => void };
};
