import { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within AppThemeProvider");
  }
  return context;
}

export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#dc004e",
          },
          background: {
            default: mode === "light" ? "#f8fafc" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
          divider: mode === "light" ? "#e0e0e0" : "#424242",
        },
        shape: {
          borderRadius: 10,
        },
        typography: {
          fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
          ].join(","),
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
