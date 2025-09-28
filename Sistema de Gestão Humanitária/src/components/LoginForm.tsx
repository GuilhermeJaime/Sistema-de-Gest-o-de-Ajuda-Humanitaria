import { useState } from "react";
import { Heart, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { useAuth } from "./AuthContext";

interface LoginFormProps {
  onGoToRegister: () => void;
}

export function LoginForm({ onGoToRegister }: LoginFormProps) {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    const success = await login(formData.email, formData.password);
    if (!success) {
      setError("Email ou senha incorretos");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const adminCredentials = [
    { label: "Administrador", email: "admin@humanitaria.org", password: "admin123" },
    { label: "Coordenador", email: "joao@humanitaria.org", password: "joao123" },
    { label: "Voluntário", email: "maria@humanitaria.org", password: "maria123" },
  ];

  const donorCredentials = [
    { label: "Doador Premium", email: "carlos@email.com", password: "carlos123" },
    { label: "Doador Regular", email: "ana@email.com", password: "ana123" },
    { label: "Novo Doador", email: "roberto@email.com", password: "roberto123" },
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setFormData({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-humanitarian bg-overlay py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo e Título */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg glass-button">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-white drop-shadow-lg">Help</h1>
          </div>
          <p className="text-white/80 drop-shadow">Sistema de Gestão de Ajuda Humanitária</p>
        </div>

        {/* Formulário de Login */}
        <Card className="glass-card border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Entrar na sua conta</CardTitle>
            <CardDescription className="text-white/70">
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-500/20 border-red-500/30 text-white">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  disabled={isLoading}
                  className="glass-button border-white/20 text-white placeholder:text-white/50 bg-white/5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Sua senha"
                    disabled={isLoading}
                    className="glass-button border-white/20 text-white placeholder:text-white/50 bg-white/5"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-white/70 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-white text-black border-white/20 hover:bg-black hover:text-white transition-colors duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>

              {/* Link para criar conta */}
              <div className="text-center text-sm">
                <span className="text-white/70">Não possui uma conta? </span>
                <Button
                  type="button"
                  variant="link"
                  onClick={onGoToRegister}
                  className="p-0 h-auto text-white hover:text-white/80 underline"
                  disabled={isLoading}
                >
                  Crie uma
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Credenciais de Demonstração */}
        <div className="space-y-4">
          <Card className="glass-card border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-sm text-white">Acesso Administrativo</CardTitle>
              <CardDescription className="text-xs text-white/70">
                Para gestores e voluntários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {adminCredentials.map((cred, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs h-8 glass-button border-white/20 text-white hover:bg-white/10"
                  onClick={() => fillDemoCredentials(cred.email, cred.password)}
                  disabled={isLoading}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{cred.label}</span>
                    <span className="text-white/70">{cred.email}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-sm text-white">Acesso de Doador</CardTitle>
              <CardDescription className="text-xs text-white/70">
                Para pessoas que desejam doar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {donorCredentials.map((cred, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs h-8 glass-button border-white/20 text-white hover:bg-white/10"
                  onClick={() => fillDemoCredentials(cred.email, cred.password)}
                  disabled={isLoading}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{cred.label}</span>
                    <span className="text-white/70">{cred.email}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Rodapé */}
        <div className="text-center text-xs text-white/60">
          <p>© 2025 Help. Todos os direitos reservados.</p>
          <p className="mt-1">Sistema de demonstração com dados fictícios</p>
        </div>
      </div>
    </div>
  );
}