import React, { useCallback } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Colors, Spacing } from "../theme";
import { ContentPreview, ContentPreviewProps } from "./ContentPreview";

type Data = Omit<ContentPreviewProps, "style">;
interface PreviewListProps {
  data: Data[];
  style?: StyleProp<ViewStyle>;
}

export const PreviewList: React.FC<PreviewListProps> = React.memo(
  ({ data, style }) => {
    const keyExtractor = useCallback((item: Data) => String(item.imgUrl), []);
    const renderItem = useCallback(({ item }: { item: Data }) => {
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
