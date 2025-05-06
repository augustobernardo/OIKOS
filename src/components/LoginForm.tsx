import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateUsername = (value: string) => {
    // Verificar se começa com @
    if (!value.startsWith("@")) {
      return "O usuário deve seguir o formato: @casade<casa>.nome.sobrenome";
    }

    // Verificar se começa com @casade
    if (!value.startsWith("@casade")) {
      return "O usuário deve começar com @casade";
    }

    // Verificar se é um admin (@casadeoikos)
    if (value.startsWith("@casadeoikos")) {
      // Verificar se tem pelo menos dois pontos para administrador
      const dots = value.split(".").length - 1;
      if (dots < 2) {
        return "O usuário de administrador deve conter pelo menos dois pontos (ex: @casadeoikos.admin.nome)";
      }
    }
    // Se for um encontrista (@casadepedro)
    else if (value.startsWith("@casadepedro")) {
      // Verificar se tem exatamente dois pontos
      const parts = value.split(".");
      if (parts.length !== 3) {
        return "O usuário deve seguir o formato @casadepedro.nome.sobrenome";
      }

      // Verificar se os campos após os pontos não estão vazios
      if (parts[1].trim() === "" || parts[2].trim() === "") {
        return "Nome e sobrenome não podem estar vazios";
      }
    } else {
      return "O usuário deve começar com @casade";
    }

    return ""; // Sem erro
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if (value) {
      const error = validateUsername(value);
      setUsernameError(error);
    } else {
      setUsernameError("");
    }
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

    try {
      const success = await login(username, password);

      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Você será redirecionado para sua área.",
          variant: "default",
        });

        // Redireciona baseado no tipo de usuário
        if (username.startsWith("@casadeoikos")) {
          navigate("/admin");
        } else {
          navigate("/encontrista");
        }
      } else {
        toast({
          title: "Erro ao realizar login",
          description: "Verifique suas credenciais e tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast({
        title: "Erro ao realizar login",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-6 animate-fade-in"
    >
      <div className="space-y-2">
        <Label htmlFor="username">Usuário</Label>
        <Input
          id="username"
          placeholder="@casadepedro.nome.sobrenome"
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
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-oikos-gradient hover:opacity-90 transition-opacity"
        disabled={isLoading || !!usernameError}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
