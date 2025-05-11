import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function EncontristaForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    setUsername(value);

    const error = validateUsername(value);
    setUsernameError(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar o nome de usuário antes de enviar
    const error = validateUsername(username);
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
          placeholder="Usuário do Instagram sem @"
          value={username}
          onChange={handleUsernameChange}
          required
          disabled={isLoading}
          className={usernameError ? "border-destructive" : ""}
        />
        {usernameError && (
          <p className="text-sm text-destructive">{usernameError}</p>
        )}
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
          A senha deve ser a data de nascimento. E.x. 01011998
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-oikos-gradient hover:opacity-90 transition-opacity"
        disabled={isLoading || !!usernameError}
      >
        {isLoading ? "Cadastrando..." : "Cadastrar Encontrista"}
      </Button>
    </form>
  );
}
