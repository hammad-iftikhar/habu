import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { IUser } from "@/types/user.types";
import { TOKEN_KEY } from "@/data/constants";
import * as userApi from "@/api/user";
import FullScreenSpinner from "@/components/full-screen-spinner";

interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ status: boolean; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const checkIfLoggedIn = async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      return;
    }

    setLoading(true);

    let isInvalidToken = false;

    try {
      const res = await userApi.getUserFromToken(token);
      if (res) {
        setUser(res);
      } else {
        isInvalidToken = true;
      }
    } catch {
      isInvalidToken = true;
    } finally {
      if (isInvalidToken) {
        localStorage.removeItem(TOKEN_KEY);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const logout = async () => {};

  const login = async (email: string, password: string) => {
    const response = await userApi.login(email, password);
    if (response.status) {
      localStorage.setItem(TOKEN_KEY, response.token);
      // const userData = await getUserFromToken(response.token);
      setUser(response.user);
    }
    return { status: response.status, message: response.message };
  };

  const isAuthenticated = useMemo(() => !!user, [user]);

  const value: IAuthContext = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <FullScreenSpinner /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
