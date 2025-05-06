import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
export default function Navbar() {
  const { isAuthenticated, userRole, logout } = useAuth();

  const logo = "/OIKOS.png";

  return (
    <header className="w-full py-4 px-4 md:px-8 flex items-center justify-between bg-background border-b border-border sticky top-0 z-50">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="OIKÓS Logo" className="h-10 w-auto mr-2" />
          <h1 className="font-bebas text-3xl tracking-wider hidden sm:block"></h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        {isAuthenticated ? (
          <>
            <Button variant="ghost" size="icon" onClick={logout} title="Sair">
              <LogOut className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <Link to="/login">
            <Button className="bg-oikos-gradient hover:opacity-90 transition-opacity">
              Entrar
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
