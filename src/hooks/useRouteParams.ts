import { Route, RouteProp, useRoute } from "@react-navigation/native";
import {
  StackRouteParamList,
  ModalRouteParamList,
  Screens,
} from "../navigation";

type RouteParamList = StackRouteParamList & ModalRouteParamList;

export function useRouteParams<T extends Screens>(): Route<
  Extract<T, string>,
  RouteParamList[T]
> {
  const params = useRoute<RouteProp<RouteParamList, T>>();
  return params;
}
