import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { round } from "lodash";

/**
 * Gets the horizontal page index position
 * @param event The native onScroll callback event from ScrollView
 */
export function getCurrentScrollPagePosition(
  event: NativeSyntheticEvent<NativeScrollEvent>
): number {
  const offsetX = event.nativeEvent.contentOffset.x;
  const pageWidth = event.nativeEvent.layoutMeasurement.width;
  const position = round(offsetX / pageWidth);
  return position;
}
