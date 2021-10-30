import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
  ScrollView,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../../components/Box";
import { Icon } from "../../components/Icons";
import { Colors, Spacing, TextVariants } from "../../components/theme";
import { PageHeader } from "../../components/Typography";
import { Button } from "../../components/Button";
import { Toast } from "../../components/Toast";
import { useAppStackNavigation } from "../../hooks";
import { BackNavigationButton } from "../shared";
import { useAuthentication } from "./useAuthentication";
import { useSession } from "./SessionProvider";

export const TMDBLoginScreen: React.FC = () => {
  const { pop, push } = useAppStackNavigation();
  const { top } = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticating, sessionId, error, login } = useAuthentication();
  const { setSessionId } = useSession();

  useEffect(() => {
    if (sessionId && !error) {
      setSessionId(sessionId);
      push("Tabs");
      pop();
    }
  }, [push, pop, sessionId, error, setSessionId]);

  return (
    <>
      <BackNavigationButton
        type="cancel"
        respectsTopInset={false}
        onNavigateBack={() => pop()}
      />
      {error ? (
        <Toast
          title="The username or password is incorrect. Please try again."
          type="error"
          respectsTopInset={false}
        />
      ) : null}
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
          <Button
            style={styles.loginButton}
            title="Login"
            enabled={email.length > 0 && password.length > 0}
            loading={authenticating}
            onPress={() => {
              Keyboard.dismiss();
              login(email, password);
            }}
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
    marginTop: 30,
    borderRadius: 8,
  },
});
