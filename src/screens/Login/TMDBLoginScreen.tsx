import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../../components/Box";
import { Icon } from "../../components/Icons";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { Colors, Spacing, TextVariants } from "../../components/theme";
import { PageHeader, Text } from "../../components/Typography";
import { useAppStackNavigation } from "../../hooks";
import { BackNavigationButton } from "../shared";

export const TMDBLoginScreen: React.FC = () => {
  const { pop } = useAppStackNavigation();
  const { top } = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  return (
    <>
      <BackNavigationButton
        type="cancel"
        respectsTopInset={false}
        onNavigateBack={() => pop()}
      />
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView
          style={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <PageHeader
            style={{ marginTop: 50 + top, marginBottom: 50 }}
            title="Welcome back"
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
            authenticating={loggingIn}
            onPress={() =>
              console.log(
                "========== File: TMDBLoginScreen.tsx, Line: 42 =========="
              )
            }
          />
        </ScrollView>
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
    <Box style={[styles.loginInputContainer, style]}>
      <Icon
        style={{ marginRight: Spacing.m }}
        name={isUsername ? "ios-person-outline" : "ios-lock-closed-outline"}
        size="small"
        color={Colors.IconNeutral}
      />
      <TextInput
        style={styles.textInput}
        placeholder={isUsername ? "Username" : "Password"}
        placeholderTextColor={Colors.TextDisabled}
        autoCorrect={false}
        autoCapitalize="none"
        enablesReturnKeyAutomatically
        returnKeyType={isUsername ? "next" : "done"}
        onChangeText={onChangeText}
        secureTextEntry={!isUsername}
      />
    </Box>
  );
};

const LoginButton = ({
  enabled,
  authenticating,
  onPress,
}: {
  enabled: boolean;
  authenticating: boolean;
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
      disabled={!enabled || authenticating}
    >
      {authenticating ? (
        <LoadingIndicator isFullScreen={false} />
      ) : (
        <Text variant="captionHeadingSmall">Login</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SurfaceBackgroundPressed,
  },
  contentContainer: {
    flex: 1,
    padding: Spacing.defaultMargin,
  },
  loginInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.l,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.Border,
    backgroundColor: Colors.SurfaceForegroundPressed,
  },
  textInput: {
    ...TextVariants.body,
    flex: 1,
    height: 60,
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.defaultMargin,
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: Colors.ActionPrimary,
  },
});
