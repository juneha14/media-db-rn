import React, { useCallback } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Colors, Spacing } from "../theme";
import { ContentPreview, ContentPreviewProps } from "./ContentPreview";

export type PreviewDataItem = Omit<ContentPreviewProps, "style">;
interface PreviewListProps {
  data?: PreviewDataItem[];
  style?: StyleProp<ViewStyle>;
}

export const PreviewList: React.FC<PreviewListProps> = React.memo(
  ({ data, style }) => {
    const keyExtractor = useCallback(
      (item: PreviewDataItem) => item.imgUrl + item.title + item.description,
      []
    );
    const renderItem = useCallback(({ item }: { item: PreviewDataItem }) => {
      return <ContentPreview style={styles.previewRow} {...item} />;
    }, []);

    return (
      <FlatList
        style={[styles.container, style]}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
      />
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceBackground,
  },
  previewRow: {
    padding: Spacing.m,
  },
});
