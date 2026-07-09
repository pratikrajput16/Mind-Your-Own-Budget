"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { User } from "@/types/auth";

import { useEffect } from "react";
import { getCurrentUser } from "@/services/auth.service";
import { getToken } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = getToken();

        if (!token) return;

        const response = await getCurrentUser();

        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to restore session", error);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
