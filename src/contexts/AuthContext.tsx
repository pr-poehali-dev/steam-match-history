import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState, User, LoginCredentials } from "@/types";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@cs-tracker.com",
    role: "admin",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    username: "user",
    email: "user@cs-tracker.com",
    role: "user",
    createdAt: new Date("2024-01-02"),
  },
];

const mockPasswords: Record<string, string> = {
  admin: "admin123",
  user: "user123",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem("user");
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find((u) => u.username === credentials.username);
    const isPasswordValid =
      mockPasswords[credentials.username] === credentials.password;

    if (user && isPasswordValid) {
      localStorage.setItem("user", JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      throw new Error("Неверный логин или пароль");
    }
  };

  const logout = (): void => {
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
