import React from "react";
import { AppRoutes } from "./src/navigation/AppRoutes";
import { SessionProvider } from "./src/screens/Login";

// export { default } from "./storybook";

const App: React.FC = () => {
  return (
    <SessionProvider>
      <AppRoutes />
    </SessionProvider>
  );
};
export default App;
