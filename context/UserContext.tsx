// context/UserContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define user type
type User = {
  username: string;
};

type UserContextType = {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
};

// ✅ Create the context
export const UserContext = createContext<UserContextType | undefined>(undefined);

// ✅ Create provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string) => setUser({ username });
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
