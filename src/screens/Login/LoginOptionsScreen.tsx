import React from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import Images from "../../assets";
import { Box } from "../../components/Box";
import { Colors, Spacing } from "../../components/theme";
import { PageHeader, Text } from "../../components/Typography";

export const LoginOptionsScreen: React.FC = () => {
  return (
    <Box style={styles.container}>
      <Image style={styles.backdropImage} source={Images.loginBackdropImage} />
      <PageHeader
        style={styles.pageHeader}
        title="MediaDB"
        subtitle="Browse thousands of movies and TV shows"
      />
      <Box style={styles.buttonsContainer}>
        <Button
          type="tmdb"
          onPress={() =>
            console.log(
              "========== File: LoginOptionsScreen.tsx, Line: 24 =========="
            )
          }
        />
        <Button
          type="guest"
          onPress={() =>
            console.log(
              "========== File: LoginOptionsScreen.tsx, Line: 24 =========="
            )
          }
        />
      </Box>
    </Box>
  );
};

const Button = ({
  type,
  onPress,
}: {
  type: "tmdb" | "guest";
  onPress: () => void;
}) => {
  const isTMDB = type === "tmdb";
  return (
    <Pressable
      style={[
        styles.button,
        {
          marginBottom: isTMDB ? Spacing.m : undefined,
          backgroundColor:
            type === "tmdb"
              ? Colors.ActionPrimaryPressed
              : Colors.TextOnSurfaceNeutral,
        },
      ]}
      onPress={onPress}
    >
      <Text
        variant="body"
        color={isTMDB ? Colors.TextOnSurfacePrimary : Colors.SurfaceBackground}
      >
        {isTMDB ? "Login with TMDB" : "Login as Guest"}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.SurfaceBackground,
  },
  backdropImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0.35,
  },
  pageHeader: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    marginTop: 40,
  },
  button: {
    width: 300,
    padding: Spacing.defaultMargin,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
});
