import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Colors, Palette } from "../src/components/theme";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const ContentView = (fn: any): JSX.Element => {
  return <ContentViewWrapper>{fn()}</ContentViewWrapper>;
};

const ContentViewWrapper: React.FC = ({ children }) => {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.SurfaceBackground,
    // backgroundColor: Palette.White,
  },
});
