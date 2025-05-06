import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function VideoUploadForm() {
  const [encontristaUsername, setEncontristaUsername] = useState("");
  const [familyMemberName, setFamilyMemberName] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de upload
    setTimeout(() => {
      toast({
        title: "Vídeo enviado com sucesso!",
        description: `Vídeo para ${encontristaUsername} de ${familyMemberName} foi enviado.`,
        variant: "default",
      });

      // Reset form
      setEncontristaUsername("");
      setFamilyMemberName("");
      setVideoFile(null);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Usuário do Encontrista</Label>
        <Input
          id="username"
          placeholder="@casadepedro.nome.sobrenome"
          value={encontristaUsername}
          onChange={(e) => setEncontristaUsername(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="familyMember">Nome do Familiar</Label>
        <Input
          id="familyMember"
          placeholder="Ex: Maria (Mãe)"
          value={familyMemberName}
          onChange={(e) => setFamilyMemberName(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="video">Vídeo</Label>
        <Input
          id="video"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          required
          disabled={isLoading}
          className="cursor-pointer"
        />
        {videoFile && (
          <p className="text-sm text-muted-foreground">
            Arquivo selecionado: {videoFile.name}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-oikos-gradient hover:opacity-90 transition-opacity"
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Enviar Vídeo"}
      </Button>
    </form>
  );
}
