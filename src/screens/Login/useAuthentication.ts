import { useCallback, useState } from "react";
import { fetchRequest } from "../../api";
import { convertToCamelCase } from "../../utils";

interface State {
  authenticating: boolean;
  sessionId: string;
  error: string;
  login: (username: string, password: string) => Promise<void>;
}

interface RequestTokenResponse {
  success: boolean;
  expiresAt: string;
  requestToken: string;
}

interface SessionResponse {
  success: boolean;
  sessionId: string;
}

export const useAuthentication = (): State => {
  const [authenticating, setAuthenticating] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");

  const login = useCallback(async (username: string, password: string) => {
    setAuthenticating(true);

    // Authentication is a 3-step process
    // 1. Get a request_token
    // 2. Validate the request_token using username and password
    // 3. Create session_id using the request_token

    try {
      // 1. Get request_token
      const tokenJson = await fetchRequest(
        "AuthRequestToken",
        undefined
      ).fetch();
      const { success: tokenSuccess, requestToken } = convertToCamelCase(
        tokenJson
      ) as RequestTokenResponse;

      if (!tokenSuccess) throw new Error("Failed to get request token");

      // 2. Validate request_token
      const validateTokenJson = await fetchRequest("AuthValidateRequestToken", {
        username,
        password,
        requestToken,
      }).fetch();
      const {
        success: validateTokenSuccess,
        requestToken: validatedToken,
      } = convertToCamelCase(validateTokenJson) as RequestTokenResponse;

      if (!validateTokenSuccess)
        throw new Error("Failed to validate request token");

      // 3. Create session_id
      const sessionJson = await fetchRequest("AuthSessionId", {
        requestToken: validatedToken,
      }).fetch();
      const { success: sessionSuccess, sessionId } = convertToCamelCase(
        sessionJson
      ) as SessionResponse;

      if (!sessionSuccess) throw new Error("Failed to create session id");

      // Success
      setSessionId(sessionId);
      setAuthenticating(false);
    } catch (error) {
      setAuthenticating(false);
      setError(error.message);
      console.error(`Failed to authenticate due to error: ${error}`);
    }
  }, []);

  return {
    authenticating,
    sessionId,
    error,
    login,
  };
};
