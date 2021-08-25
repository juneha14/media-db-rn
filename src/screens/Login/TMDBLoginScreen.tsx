import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
} from "react-native";
import Images from "../../assets";
import { Box } from "../../components/Box";
import { Colors, Spacing, TextVariants } from "../../components/theme";
import { PageHeader, Text } from "../../components/Typography";
import { BackNavigationButton } from "../shared";

export const TMDBLoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {/* <BackNavigationButton /> */}
      <KeyboardAvoidingView style={styles.container}>
        <Image
          style={styles.backdropImage}
          source={Images.loginBackdropImage}
        />
        <Pressable style={styles.contentContainer} onPress={Keyboard.dismiss}>
          <PageHeader
            style={{ marginTop: 50, marginBottom: 30 }}
            title="Welcome back!"
            subtitle="Login to your TMDB account to get started."
          />
          <LoginInput
            style={{ marginBottom: Spacing.m }}
            type="username"
            onChangeText={setEmail}
          />
          <LoginInput type="password" onChangeText={setPassword} />
          <LoginButton
            enabled={email.length > 0 && password.length > 0}
            onPress={() =>
              console.log(
                "========== File: TMDBLoginScreen.tsx, Line: 42 =========="
              )
            }
          />
        </Pressable>
      </KeyboardAvoidingView>
    </>
  );
};

const LoginInput = ({
  type,
  onChangeText,
  style,
}: {
  type: "username" | "password";
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const isUsername = type === "username";

  return (
    <Pressable style={[styles.loginInputContainer, style]}>
      <Text
        style={{ marginBottom: Spacing.m }}
        variant="body"
        color={Colors.TextOnSurfaceNeutral}
      >
        {type === "username" ? "Username" : "Password"}
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder={isUsername ? "Your username" : "Your password"}
        placeholderTextColor={Colors.TextDisabled}
        autoCorrect={false}
        autoCapitalize="none"
        enablesReturnKeyAutomatically
        returnKeyType={isUsername ? "next" : "done"}
        onChangeText={onChangeText}
        secureTextEntry={!isUsername}
      />
    </Pressable>
  );
};

const LoginButton = ({
  enabled,
  onPress,
}: {
  enabled: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      style={[
        styles.loginButton,
        {
          backgroundColor: enabled
            ? Colors.ActionPrimary
            : Colors.ActionNeutralPressed,
        },
      ]}
      onPress={onPress}
      disabled={!enabled}
    >
      <Text variant="captionHeadingSmall">Log in</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SurfaceBackground,
  },
  contentContainer: {
    flex: 1,
    padding: Spacing.defaultMargin,
  },
  backdropImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0.35,
  },
  loginInputContainer: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: Spacing.l,
    padding: Spacing.m,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.Border,
    backgroundColor: Colors.SurfaceForegroundPressed,
  },
  textInput: {
    ...TextVariants.body,
    fontStyle: "italic",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.defaultMargin,
    marginTop: 30,
    borderRadius: 4,
    backgroundColor: Colors.ActionPrimary,
  },
});
