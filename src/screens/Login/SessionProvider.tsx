import React, { createContext, useContext, useMemo, useState } from "react";

interface Session {
  sessionId?: string;
  setSessionId: (id: string) => void;
}

const SessionContext = createContext<Session | undefined>(undefined);

export const SessionProvider: React.FC = ({ children }) => {
  const [sessionId, setSessionId] = useState<string>();
  const value: Session = useMemo(
    () => ({
      sessionId,
      setSessionId,
    }),
    [sessionId]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = (): Session => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
