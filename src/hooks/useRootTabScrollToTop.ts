import { MutableRefObject, useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigation";

export function useRootTabScrollToTop<T>(
  ref:
    | MutableRefObject<FlatList<T> | null>
    | MutableRefObject<ScrollView | null>
): void {
  const {
    dangerouslyGetParent,
    dangerouslyGetState,
    addListener,
  } = useNavigation();

  useEffect(() => {
    const unsubscribe = dangerouslyGetParent<
      BottomTabNavigationProp<TabParamList>
    >().addListener("tabPress", () => {
      const { index } = dangerouslyGetState();
      // We are in the root list screen. Scroll to the top when tab is pressed again.
      if (index === 0) {
        if (!ref?.current) return;

        if (isFlatList(ref.current)) {
          ref.current.scrollToOffset({ animated: true, offset: 0 });
        } else {
          ref.current.scrollTo({ y: 0, animated: true });
        }
      }
    });

    return unsubscribe;
  }, [addListener, dangerouslyGetParent, dangerouslyGetState, ref]);
}

function isFlatList<T>(ref: FlatList<T> | ScrollView): ref is FlatList<T> {
  return (ref as FlatList<T>) !== undefined;
}
