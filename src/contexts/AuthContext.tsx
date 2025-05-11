import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import authService, { LoginCredentials, AuthResponse } from "@/api/authService";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  // Check if user is already authenticated on load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedAuth = sessionStorage.getItem("auth");

        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          setIsAuthenticated(authData.isAuthenticated);
          setUserRole(authData.userRole as UserRole);
          setUsername(authData.username);

          // Verify with backend if token is still valid
          const response = await authService.getCurrentUser();
          if (!response.success) {
            // If token is invalid, log user out
            logout();
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        logout();
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const credentials: LoginCredentials = { username, password };
      const response = await authService.login(credentials);

      if (response.success && response.token) {
        setIsAuthenticated(true);
        setUsername(username);
        setUserRole(response.userRole as UserRole);

        // Store auth data in session storage
        sessionStorage.setItem(
          "auth",
          JSON.stringify({
            isAuthenticated: true,
            userRole: response.userRole,
            username,
          })
        );

        return true;
      } else {
        toast({
          title: "Falha no login",
          description: response.message || "Credenciais inválidas",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um problema ao tentar fazer login",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear auth state even if API call fails
      setIsAuthenticated(false);
      setUserRole(null);
      setUsername(null);
      sessionStorage.removeItem("auth");
    }
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
