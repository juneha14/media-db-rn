import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginOptionsScreen } from "../screens/Login";
import { StackRouteParamList } from "./Routes";
import { TabRoutes } from "./TabRoutes";

type LoginParamList = Pick<StackRouteParamList, "LoginOptions" | "Tabs">;

const Stack = createStackNavigator<LoginParamList>();

export const LoginRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginOptions"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginOptions" component={LoginOptionsScreen} />
      <Stack.Screen
        name="Tabs"
        component={TabRoutes}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  );
};
