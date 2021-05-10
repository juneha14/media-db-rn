import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "../components/Box";
import { Text } from "../components/Typography";
import { Colors } from "../components/theme";
import { DiscoverRoutes } from "./DiscoverRoutes";
import { FavouriteScreen } from "../screens/Favourite";

export type TabParamList = {
  Discover: undefined;
  Search: undefined;
  Favourite: undefined;
};

const Tabs = createBottomTabNavigator<TabParamList>();

export const TabRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: Colors.IconOnPrimary,
          inactiveTintColor: Colors.IconSubdued,
          style: { backgroundColor: Colors.SurfaceForeground },
        }}
      >
        <Tabs.Screen
          name="Discover"
          component={DiscoverRoutes}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-search-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-bookmark-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

const SearchScreen = () => {
  return (
    <Box
      style={{
        flex: 1,
        backgroundColor: Colors.SurfaceBackground,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="body">Search screen</Text>
    </Box>
  );
};
