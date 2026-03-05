import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((userData) => {
    const userWithDefaults = {
      id: userData.id || "1",
      name: userData.name || userData.full_name || "Student",
      rollNumber: userData.rollNumber || userData.roll_number || "N/A",
      email: userData.email || "student@college.edu",
      role: (userData.role || userData.user_role || "student").toLowerCase(),
      ...userData,
    };
    setUser(userWithDefaults);
    localStorage.setItem("user", JSON.stringify(userWithDefaults));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isAdmin, login, logout, isLoading }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
