import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ModalRouteParamList } from "./Routes";
import { TabRoutes } from "./TabRoutes";

import { FilterScreen } from "../screens/Filter";
import { GalleryCarouselScreen } from "../screens/Gallery";
import { Colors } from "../components/theme";

type AppParamList = ModalRouteParamList & { Tabs: undefined };
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
          options={{ headerTitle: "Sort by" }}
        />
        <Stack.Screen
          name="GalleryCarousel"
          component={GalleryCarouselScreen}
          options={{ headerShown: false }}
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
