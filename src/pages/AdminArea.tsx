import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import VideoUploadForm from "@/components/VideoUploadForm";
import EncontristaForm from "@/components/EncontristaForm";

export default function AdminArea() {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upload");

  // Verifica se o usuário está autenticado e tem permissão
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (userRole !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated, userRole, navigate]);

  if (!isAuthenticated || userRole !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bebas mb-8 text-center">
            Área <span className="oikos-gradient-text">Administrativa</span>
          </h1>

          <div className="bg-card rounded-xl border border-border p-6 shadow">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upload">Upload de Vídeo</TabsTrigger>
                <TabsTrigger value="register">
                  Cadastro de Encontrista
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="pt-2">
                <VideoUploadForm />
              </TabsContent>

              <TabsContent value="register" className="pt-2">
                <EncontristaForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
