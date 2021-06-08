/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { MediaDetailsScreen } from "../screens/MediaDetails";
import { RecommendedScreen } from "../screens/Recommended";
import { CreditsDetailsScreen, CreditsScreen } from "../screens/Credits";

export type MediaDetailsParamList = {
  MediaDetails: { id: number };
  RecommendedList: { id: number };
  CreditList: { id: number };
  CreditDetails: { id: number };
};

type RouteConfig = { component: React.FC; options: StackNavigationOptions };

const mediaDetailsScreens: Record<keyof MediaDetailsParamList, RouteConfig> = {
  MediaDetails: {
    component: MediaDetailsScreen,
    options: { headerShown: false },
  },
  RecommendedList: {
    component: RecommendedScreen,
    options: { headerTitle: "Recommendations" },
  },
  CreditList: {
    component: CreditsScreen,
    options: { headerTitle: "Credits" },
  },
  CreditDetails: {
    component: CreditsDetailsScreen,
    options: { headerShown: false },
  },
};

export const MediaDetailsRoutes = (Stack: any): JSX.Element[] => {
  return Object.entries(mediaDetailsScreens).map(
    ([name, { component, options }]) => {
      return (
        <Stack.Screen
          key={name}
          name={name as keyof MediaDetailsParamList}
          component={component}
          options={options}
        />
      );
    }
  );
};
