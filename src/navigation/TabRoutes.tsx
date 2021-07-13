import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DiscoverRoutes } from "./DiscoverRoutes";
import { FavouriteRoutes } from "./FavouriteRoutes";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../components/theme";
import { SearchRoutes } from "./SearchRoutes";

type TabParamList = {
  Discover: undefined;
  Search: undefined;
  Favourite: undefined;
};

const Tabs = createBottomTabNavigator<TabParamList>();

export const TabRoutes: React.FC = () => {
  return (
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
        component={SearchRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Favourite"
        component={FavouriteRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-bookmark-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
