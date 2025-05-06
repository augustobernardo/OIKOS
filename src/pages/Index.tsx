import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1 space-y-6 text-center lg:text-left">
                <h1 className="text-5xl md:text-7xl font-bebas tracking-wide animate-fade-in">
                  <span className="oikos-gradient-text">OIKÓS</span>
                </h1>
                <p className="text-xl md:text-2xl font-light max-w-xl mx-auto lg:mx-0">
                  Um retiro espiritual para jovens da Igreja Católica Apostólica
                  Romana.
                </p>
                <p className="text-lg text-muted-foreground">
                  Encontre paz, comunidade e conexão espiritual.
                </p>
                <div className="pt-4">
                  <Link to="/login">
                    <Button className="bg-oikos-gradient hover:opacity-90 transition-opacity text-lg px-8 py-6">
                      Área do Encontrista
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex-1 w-full max-w-xl">
                <div className="video-container bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-border">
                  {/* Este div será substituído por um vídeo real no futuro */}
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-2xl font-bebas mb-2">
                      Espaço para Vídeo
                    </h3>
                    <p className="text-muted-foreground">
                      Um vídeo de boas-vindas será adicionado aqui.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl md:text-5xl font-bebas text-center mb-12">
              O que é o <span className="oikos-gradient-text">OIKÓS</span>?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-2xl font-bebas mb-4">Comunidade</h3>
                <p>
                  Um espaço para construir relacionamentos profundos e
                  significativos baseados na fé.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-2xl font-bebas mb-4">Espiritualidade</h3>
                <p>
                  Fortaleça sua conexão com Deus através de momentos de oração,
                  reflexão e adoração.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-2xl font-bebas mb-4">Crescimento</h3>
                <p>
                  Desenvolva-se pessoal e espiritualmente com experiências
                  transformadoras.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
