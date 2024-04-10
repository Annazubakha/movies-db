import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { purple } from "@mui/material/colors";
import { Header } from "./Header/Header";
import { AuthContext, AuthInfo, anonymousUser } from "./AuthContext";
import { useState } from "react";

const defaultTheme = createTheme({
  palette: {
    primary: purple,
    secondary: {
      main: "#d0a4d8",
    },
  },
});

const fakeAuth: AuthInfo = {
  user: {
    name: "Anna",
  },
};

function App() {
  const [auth, setAuth] = useState<AuthInfo>({ user: anonymousUser });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthContext.Provider value={auth}>
        <Header
          onLogin={() => setAuth(fakeAuth)}
          onLogout={() => setAuth({ user: anonymousUser })}
        />
        <main>
          <Outlet />
        </main>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
