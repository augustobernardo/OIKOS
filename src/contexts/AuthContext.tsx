import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "encontrista" | "admin" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  username: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Simula uma API de autenticação
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    // Simulação de verificação
    // Em um caso real, isso seria uma chamada de API

    // Apenas para teste: Usuários predefinidos
    const isAdmin =
      username.startsWith("@casadeoikos") && password === "admin123";
    const isEncontrista =
      username.startsWith("@casade") && password === "encontrista123";

    if (isAdmin || isEncontrista) {
      setIsAuthenticated(true);
      setUsername(username);

      if (isAdmin) {
        setUserRole("admin");
      } else {
        setUserRole("encontrista");
      }

      // Armazena na sessão (não em localStorage por questões de segurança)
      sessionStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          userRole: isAdmin ? "admin" : "encontrista",
          username,
        })
      );

      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername(null);
    sessionStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, username, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
