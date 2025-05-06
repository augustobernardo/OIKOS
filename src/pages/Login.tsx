import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
export default function Login() {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const logo = "/OIKOS.png";

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "encontrista") {
        navigate("/encontrista");
      }
    }
  }, [isAuthenticated, userRole, navigate]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card shadow-lg rounded-xl border border-border p-8">
            <div className="text-center mb-8">
              <img
                src={logo}
                alt="OIKÓS Logo"
                className="h-16 w-auto mx-auto mb-4"
              />

              <p className="text-muted-foreground">
                Deus preparou mais uma surpresa para você, entre para ver
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
