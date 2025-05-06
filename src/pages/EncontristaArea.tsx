import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import { useAuth } from "@/contexts/AuthContext";

// Dados simulados de vídeos
const mockVideos = [
  {
    id: "1",
    title: "Mensagem especial",
    familyMember: "Maria (Mãe)",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    videoUrl: "#", // Em uma implementação real, seria a URL do vídeo
  },
  {
    id: "2",
    title: "Recordações",
    familyMember: "João (Pai)",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    videoUrl: "#",
  },
  {
    id: "3",
    title: "Lembranças",
    familyMember: "Ana (Irmã)",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    videoUrl: "#",
  },
  {
    id: "4",
    title: "Momentos juntos",
    familyMember: "Pedro (Irmão)",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    videoUrl: "#",
  },
  {
    id: "5",
    title: "Boas lembranças",
    familyMember: "Júlia (Avó)",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    videoUrl: "#",
  },
];

export default function EncontristaArea() {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState(mockVideos);

  // Verifica se o usuário está autenticado e tem permissão
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (userRole !== "encontrista") {
      navigate("/");
    }
  }, [isAuthenticated, userRole, navigate]);

  if (!isAuthenticated || userRole !== "encontrista") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bebas mb-8 text-center">
            Pessoas que te <span className="oikos-gradient-text">AMAM</span>
          </h1>

          <div className="bg-card rounded-xl border border-border p-6 shadow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-2">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  familyMember={video.familyMember}
                  thumbnailUrl={video.thumbnailUrl}
                  videoUrl={video.videoUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
