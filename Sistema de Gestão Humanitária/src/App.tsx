import { useState } from "react";
import {
  Home,
  DollarSign,
  Users,
  Target,
  Heart,
  Menu,
} from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet";
import { DashboardContent } from "./components/DashboardContent";
import { DonationsSection } from "./components/DonationsSection";
import { VolunteersSection } from "./components/VolunteersSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { BeneficiariesSection } from "./components/BeneficiariesSection";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { UserProfile } from "./components/UserProfile";
import { DonorApp } from "./components/DonorApp";
import { GlassButton } from "./components/GlassButton";
import { Toaster } from "./components/ui/sonner";

type Section =
  | "dashboard"
  | "donations"
  | "volunteers"
  | "projects"
  | "beneficiaries";

const navigation = [
  {
    name: "Dashboard",
    id: "dashboard" as Section,
    icon: Home,
  },
  {
    name: "Doações",
    id: "donations" as Section,
    icon: DollarSign,
  },
  {
    name: "Voluntários",
    id: "volunteers" as Section,
    icon: Users,
  },
  {
    name: "Projetos",
    id: "projects" as Section,
    icon: Target,
  },
  {
    name: "Beneficiários",
    id: "beneficiaries" as Section,
    icon: Heart,
  },
];

function AppContent() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-humanitarian bg-overlay">
        <div className="text-center glass-card p-8 rounded-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg glass-button mx-auto mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (showRegister) {
      return <RegisterForm onBackToLogin={() => setShowRegister(false)} />;
    }
    return <LoginForm onGoToRegister={() => setShowRegister(true)} />;
  }

  // Se for doador, renderizar interface específica
  if (user?.userType === "donor") {
    return <DonorApp />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "donations":
        return <DonationsSection />;
      case "volunteers":
        return <VolunteersSection />;
      case "projects":
        return <ProjectsSection />;
      case "beneficiaries":
        return <BeneficiariesSection />;
      default:
        return <DashboardContent />;
    }
  };

  const NavContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-white/20 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded glass-button">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-white">Help</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-all duration-300 ${
                activeSection === item.id
                  ? "glass-button text-white"
                  : "text-white/70 hover:text-white hover:glass-button"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-white/20 p-4">
        <UserProfile />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-humanitarian bg-overlay min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col glass-sidebar">
        <NavContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu de navegação</SheetTitle>
            <SheetDescription>
              Navegue pelas seções do sistema de gestão humanitária
            </SheetDescription>
          </SheetHeader>
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="glass border-b border-white/20 md:hidden">
          <div className="flex h-16 items-center px-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <GlassButton variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </GlassButton>
              </SheetTrigger>
            </Sheet>
            <div className="ml-4 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded glass-button">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-white">Help</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="glass-card rounded-2xl p-6 backdrop-blur-xl">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}