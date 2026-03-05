import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import { LoginModalProvider } from "./contexts/LoginModalContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <LoginModalProvider>
        <SearchProvider>
          <AppThemeProvider>
            <CssBaseline />
            <App />
          </AppThemeProvider>
        </SearchProvider>
      </LoginModalProvider>
    </AuthProvider>
  </StrictMode>,
);
