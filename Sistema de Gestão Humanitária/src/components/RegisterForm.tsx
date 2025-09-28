import { useState } from "react";
import { Heart, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { useAuth, RegisterData } from "./AuthContext";

interface RegisterFormProps {
  onBackToLogin: () => void;
}

export function RegisterForm({ onBackToLogin }: RegisterFormProps) {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState<RegisterData>({
    fullName: "",
    email: "",
    password: "",
    country: "",
    idNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const countries = [
    "Angola",
    "Brasil",
    "Cabo Verde",
    "Guiné-Bissau",
    "Moçambique",
    "Portugal",
    "São Tomé e Príncipe",
    "Timor-Leste",
    "Outro"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validação
    if (!formData.fullName || !formData.email || !formData.password || !formData.country || !formData.idNumber) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Por favor, insira um email válido");
      return;
    }

    const success = await register(formData);
    if (!success) {
      setError("Este email já está registrado. Por favor, use outro email ou faça login.");
    } else {
      setSuccess(true);
      // O AuthContext já faz o login automático após o registro
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      country: value,
    }));
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

        {/* Formulário de Registro */}
        <Card className="glass-card border-white/20 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onBackToLogin}
                className="p-0 h-auto text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar
              </Button>
            </div>
            <CardTitle className="text-white">Criar nova conta</CardTitle>
            <CardDescription className="text-white/70">
              Preencha seus dados para se registrar como doador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-500/20 border-red-500/30 text-white">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-500/20 border-green-500/30 text-white">
                  <AlertDescription>Conta criada com sucesso! Redirecionando...</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">Nome Completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  disabled={isLoading}
                  className="glass-button border-white/20 text-white placeholder:text-white/50 bg-white/5"
                />
              </div>

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
                    placeholder="Mínimo 6 caracteres"
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

              <div className="space-y-2">
                <Label htmlFor="country" className="text-white">País</Label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  disabled={isLoading}
                  className="glass-button border-white/20 text-white placeholder:text-white/50 bg-white/5 w-full px-3 py-2 rounded-md"
                >
                  <option value="" className="bg-gray-800 text-white">
                    Selecione seu país
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country} className="bg-gray-800 text-white">
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber" className="text-white">Número do BI</Label>
                <Input
                  id="idNumber"
                  name="idNumber"
                  type="text"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  placeholder="Número do seu Bilhete de Identidade"
                  disabled={isLoading}
                  className="glass-button border-white/20 text-white placeholder:text-white/50 bg-white/5"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-black hover:text-white border border-white/20 transition-all duration-300 ease-in-out" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar Conta"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Rodapé */}
        <div className="text-center text-xs text-white/60">
          <p>© 2024 HumanitáriaApp. Todos os direitos reservados.</p>
          <p className="mt-1">Ao criar uma conta, você concorda com nossos termos de uso</p>
        </div>
      </div>
    </div>
  );
}