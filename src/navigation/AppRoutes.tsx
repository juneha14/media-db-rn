import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ModalRouteParamList } from "./Routes";
import { LoginRoutes } from "./LoginRoutes";

import { FilterScreen } from "../screens/Filter";
import { GalleryCarouselScreen } from "../screens/Gallery";
import { Colors } from "../components/theme";
import { TMDBLoginScreen } from "../screens/Login";
import { AddRatingScreen } from "../screens/Reviews";

type AppParamList = ModalRouteParamList & { Login: undefined; Tabs: undefined };
const Stack = createStackNavigator<AppParamList>();

export const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        mode="modal"
        screenOptions={modalScreenOptions}
      >
        <Stack.Screen
          name="Login"
          component={LoginRoutes}
          options={{ headerShown: false }}
        />

        {/* Modals */}

        <Stack.Screen
          name="TMDBLogin"
          component={TMDBLoginScreen}
          options={{
            ...modalScreenOptions,
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{ headerTitle: "Sort by" }}
        />
        <Stack.Screen
          name="GalleryCarousel"
          component={GalleryCarouselScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen
          name="AddRating"
          component={AddRatingScreen}
          options={{
            headerShown: false,
          }}
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
