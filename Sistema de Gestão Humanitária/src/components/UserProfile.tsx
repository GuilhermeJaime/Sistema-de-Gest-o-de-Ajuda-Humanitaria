import { useState } from "react";
import { Settings, LogOut, User, Shield, Mail, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useAuth } from "./AuthContext";
import { ThemeToggle } from "./ThemeToggle";

export function UserProfile() {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "administrador":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "coordenador":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "voluntário":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-3">
      {/* Theme Toggle */}
      <div className="flex justify-center">
        <ThemeToggle />
      </div>
      
      {/* User Profile */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3 p-2 h-auto w-full glass-button hover:glass-shine">
            <Avatar className="h-8 w-8 ring-2 ring-white/20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-white/20 text-white">{getUserInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left hidden md:block">
              <div className="text-sm font-medium text-white drop-shadow-lg">{user.name}</div>
              <div className="text-xs text-white/70">{user.email}</div>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Perfil do Usuário</DialogTitle>
            <DialogDescription>
              Informações da conta e configurações
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Avatar e Informações Básicas */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-lg">
                  {getUserInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge className={getRoleColor(user.role)}>
                  {user.role}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Informações Detalhadas */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Nome</p>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Função</p>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Último Acesso</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Ações */}
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Configurações da Conta
              </Button>
              
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair da Conta
              </Button>
            </div>

            {/* Informação sobre Demo */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Modo Demonstração</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs">
                  Esta é uma conta de demonstração. Os dados são fictícios e 
                  as alterações não são persistidas permanentemente.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}