import { useState } from "react";
import {
  Home,
  Heart,
  History,
  User,
  Menu,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { DonorDashboard } from "./donor/DonorDashboard";
import { AvailableProjects } from "./donor/AvailableProjects";
import { DonationHistory } from "./donor/DonationHistory";
import { UserProfile } from "./UserProfile";

type DonorSection = "dashboard" | "projects" | "history" | "profile";

const donorNavigation = [
  {
    name: "Início",
    id: "dashboard" as DonorSection,
    icon: Home,
  },
  {
    name: "Projetos",
    id: "projects" as DonorSection,
    icon: Heart,
  },
  {
    name: "Histórico",
    id: "history" as DonorSection,
    icon: History,
  },
];

export function DonorApp() {
  const [activeSection, setActiveSection] = useState<DonorSection>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DonorDashboard />;
      case "projects":
        return <AvailableProjects />;
      case "history":
        return <DonationHistory />;
      default:
        return <DonorDashboard />;
    }
  };

  const NavContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            <Heart className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Help</span>
            <span className="text-xs text-muted-foreground">Portal do Doador</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {donorNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                activeSection === item.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t p-4">
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
            <SheetTitle>Menu do doador</SheetTitle>
            <SheetDescription>
              Navegue pelas seções do portal do doador
            </SheetDescription>
          </SheetHeader>
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
          <div className="flex h-16 items-center px-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
            </Sheet>
            <div className="ml-4 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
                <Heart className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Help</span>
                <span className="text-xs text-muted-foreground">Portal do Doador</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}