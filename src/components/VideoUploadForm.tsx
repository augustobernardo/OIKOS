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
  const [usernameError, setUsernameError] = useState("");
  const { toast } = useToast();

  const validateUsername = (value: string) => {
    // Regex para validar o padrão do Instagram sem iniciar com @
    const instagramUserRegex = /^[a-zA-Z0-9._]{1,30}$/;

    if (value.startsWith("@")) {
      return "O usuário não pode iniciar com @";
    }

    if (!instagramUserRegex.test(value)) {
      return "O usuário deve conter apenas letras, números, pontos e sublinhados, com no máximo 30 caracteres.";
    }

    return ""; // Sem erro
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEncontristaUsername(value);

    const error = validateUsername(value);
    setUsernameError(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar o nome de usuário antes de enviar
    const error = validateUsername(encontristaUsername);
    if (error) {
      setUsernameError(error);
      toast({
        title: "Formato de usuário inválido",
        description: error,
        variant: "destructive",
      });
      return;
    }

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
          placeholder="Usuário do Instagram sem @"
          value={encontristaUsername}
          onChange={handleUsernameChange}
          required
          disabled={isLoading}
          className={usernameError ? "border-destructive" : ""}
        />
        {usernameError && (
          <p className="text-sm text-destructive">{usernameError}</p>
        )}
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="familyMember">Nome do Familiar</Label>
        <Input
          id="familyMember"
          placeholder="Ex: Maria (Mãe)"
          value={familyMemberName}
          onChange={(e) => setFamilyMemberName(e.target.value)}
          required
          disabled={isLoading}
        />
      </div> */}

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
        disabled={isLoading || !!usernameError}
      >
        {isLoading ? "Enviando..." : "Enviar Vídeo"}
      </Button>
    </form>
  );
}
