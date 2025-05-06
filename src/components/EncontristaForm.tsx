import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function EncontristaForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de cadastro
    setTimeout(() => {
      toast({
        title: "Encontrista cadastrado com sucesso!",
        description: `Usuário ${username} foi cadastrado.`,
        variant: "default",
      });

      // Reset form
      setUsername("");
      setPassword("");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="registerUsername">Usuário do Encontrista</Label>
        <Input
          id="registerUsername"
          placeholder="@casadepedro.nome.sobrenome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="registerPassword">Senha</Label>
        <Input
          id="registerPassword"
          type="password"
          placeholder="Senha para o encontrista"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          minLength={6}
        />
        <p className="text-xs text-muted-foreground">
          A senha deve ter pelo menos 6 caracteres.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-oikos-gradient hover:opacity-90 transition-opacity"
        disabled={isLoading}
      >
        {isLoading ? "Cadastrando..." : "Cadastrar Encontrista"}
      </Button>
    </form>
  );
}
