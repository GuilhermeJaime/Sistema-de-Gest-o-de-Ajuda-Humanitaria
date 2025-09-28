import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  userType: "admin" | "donor";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  country: string;
  idNumber: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users para demonstração
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@humanitaria.org",
    role: "Administrador",
    userType: "admin",
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao@humanitaria.org",
    role: "Coordenador",
    userType: "admin",
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria@humanitaria.org",
    role: "Voluntário",
    userType: "admin",
  },
  {
    id: "4",
    name: "Carlos Mendes",
    email: "carlos@email.com",
    role: "Doador Premium",
    userType: "donor",
  },
  {
    id: "5",
    name: "Ana Silva",
    email: "ana@email.com",
    role: "Doador Regular",
    userType: "donor",
  },
  {
    id: "6",
    name: "Roberto Lima",
    email: "roberto@email.com",
    role: "Novo Doador",
    userType: "donor",
  },
];

// Mock credentials para demonstração
const mockCredentials = [
  { email: "admin@humanitaria.org", password: "admin123" },
  { email: "joao@humanitaria.org", password: "joao123" },
  { email: "maria@humanitaria.org", password: "maria123" },
  { email: "carlos@email.com", password: "carlos123" },
  { email: "ana@email.com", password: "ana123" },
  { email: "roberto@email.com", password: "roberto123" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem("humanitaria_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erro ao carregar usuário salvo:", error);
        localStorage.removeItem("humanitaria_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar credenciais
    const credentials = mockCredentials.find(
      cred => cred.email === email && cred.password === password
    );
    
    if (credentials) {
      const userData = mockUsers.find(u => u.email === email);
      if (userData) {
        setUser(userData);
        localStorage.setItem("humanitaria_user", JSON.stringify(userData));
        setIsLoading(false);
        return true;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar se o email já existe
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        setIsLoading(false);
        return false; // Email já existe
      }
      
      // Criar novo usuário
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        name: userData.fullName,
        email: userData.email,
        role: "Doador",
        userType: "donor",
      };
      
      // Adicionar às listas mock (em produção seria salvo no banco)
      mockUsers.push(newUser);
      mockCredentials.push({
        email: userData.email,
        password: userData.password
      });
      
      // Fazer login automático após registro
      setUser(newUser);
      localStorage.setItem("humanitaria_user", JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Erro no registro:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("humanitaria_user");
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}