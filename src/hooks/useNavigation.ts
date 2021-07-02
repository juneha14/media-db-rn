import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackRouteParamList, ModalRouteParamList } from "../navigation";

export function useAppStackNavigation(): StackNavigationProp<
  StackRouteParamList,
  keyof StackRouteParamList
> {
  const props = useNavigation<StackNavigationProp<StackRouteParamList>>();
  return props;
}

export function useAppModalNavigation(): StackNavigationProp<
  ModalRouteParamList,
  keyof ModalRouteParamList
> {
  const props = useNavigation<StackNavigationProp<ModalRouteParamList>>();
  return props;
}
