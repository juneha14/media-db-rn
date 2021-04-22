import React from "react";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Colors, Palette } from "../src/components/theme";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const ContentViewDark = (fn: any): JSX.Element => {
  return (
    <ContentViewWrapper style={{ backgroundColor: Colors.SurfaceBackground }}>
      {fn()}
    </ContentViewWrapper>
  );
};

export const ContentViewLight = (fn: any): JSX.Element => {
  return (
    <ContentViewWrapper style={{ backgroundColor: Palette.White }}>
      {fn()}
    </ContentViewWrapper>
  );
};

const ContentViewWrapper = ({
  children,
  style,
}: {
  children: JSX.Element;
  style: StyleProp<ViewStyle>;
}) => {
  return <ScrollView style={[style, styles.container]}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
