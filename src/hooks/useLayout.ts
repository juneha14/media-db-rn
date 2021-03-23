import { useCallback, useState } from "react";
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from "react-native";

interface Layout {
  width: number;
  height: number;
  x: number;
  y: number;
}

export const useLayout = (): [
  layout: Layout | undefined,
  onLayout: (event: LayoutChangeEvent) => void
] => {
  const [layout, setLayout] = useState<Layout>();
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setLayout({
      width,
      height,
      x,
      y,
    });
  }, []);

  return [layout, onLayout];
};

export const useTextLayout = (): [
  layout: Layout | undefined,
  onTextLayout: (event: NativeSyntheticEvent<TextLayoutEventData>) => void
] => {
  const [layout, setLayout] = useState<Layout>();
  const onTextLayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      const width = event.nativeEvent.lines.reduce(
        (result: number, { width }) => {
          return (result += width);
        },
        0
      );
      const height = event.nativeEvent.lines.reduce(
        (result: number, { height }) => {
          return (result += height);
        },
        0
      );

      setLayout({
        width,
        height,
        x: event.nativeEvent.lines[0].x,
        y: event.nativeEvent.lines[0].y,
      });
    },
    []
  );

  return [layout, onTextLayout];
};
