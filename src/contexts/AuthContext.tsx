import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { IUser } from "@/types/user.types";
import { TOKEN_KEY } from "@/data/constants";
import { getUserFromToken } from "@/api/user";
import FullScreenSpinner from "@/components/full-screen-spinner";

interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
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
      const res = await getUserFromToken(token);
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

  const isAuthenticated = useMemo(() => !!user, [user]);

  const value: IAuthContext = {
    user,
    isAuthenticated,
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
