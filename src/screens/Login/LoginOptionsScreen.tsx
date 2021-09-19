import React from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import Images from "../../assets";
import { Box } from "../../components/Box";
import { Colors, Spacing } from "../../components/theme";
import { PageHeader, Text } from "../../components/Typography";
import { useAppModalNavigation, useAppStackNavigation } from "../../hooks";

// add authentication logic and hook

export const LoginOptionsScreen: React.FC = () => {
  const { push } = useAppStackNavigation();
  const { navigate } = useAppModalNavigation();

  return (
    <Box style={styles.container}>
      <Image style={styles.backdropImage} source={Images.loginBackdropImage} />
      <Box style={styles.contentContainer}>
        <PageHeader
          style={styles.pageHeader}
          title="MediaDB"
          subtitle="Browse thousands of movies and TV shows."
        />
        <>
          <Button type="tmdb" onPress={() => navigate("TMDBLogin")} />
          <Button type="guest" onPress={() => push("Tabs")} />
        </>
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
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: Spacing.defaultMargin,
    paddingBottom: 50,
  },
  pageHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  button: {
    width: "100%",
    padding: Spacing.defaultMargin,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
