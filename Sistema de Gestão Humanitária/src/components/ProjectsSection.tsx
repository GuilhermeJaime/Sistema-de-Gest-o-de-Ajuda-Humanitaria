import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  Plus, 
  Search, 
  Target, 
  Calendar, 
  Users, 
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Pause
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Distribuição de Alimentos - Região Norte",
    description: "Programa de distribuição de cestas básicas para famílias em situação de vulnerabilidade",
    category: "Alimentação",
    status: "ativo",
    priority: "alta",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    budget: 150000,
    spent: 112500,
    beneficiaries: 450,
    volunteers: 25,
    progress: 75,
    location: "Região Norte"
  },
  {
    id: 2,
    name: "Programa de Educação Infantil",
    description: "Atividades educacionais e recreativas para crianças em comunidades carentes",
    category: "Educação",
    status: "planejamento",
    priority: "media",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    budget: 80000,
    spent: 24000,
    beneficiaries: 200,
    volunteers: 15,
    progress: 30,
    location: "Centro"
  },
  {
    id: 3,
    name: "Assistência Médica de Emergência",
    description: "Atendimento médico básico em áreas de difícil acesso",
    category: "Saúde",
    status: "ativo",
    priority: "alta",
    startDate: "2024-01-10",
    endDate: "2024-10-20",
    budget: 200000,
    spent: 180000,
    beneficiaries: 150,
    volunteers: 12,
    progress: 90,
    location: "Interior"
  },
  {
    id: 4,
    name: "Construção de Abrigos Temporários",
    description: "Construção e manutenção de abrigos para pessoas em situação de rua",
    category: "Habitação",
    status: "concluido",
    priority: "alta",
    startDate: "2023-11-01",
    endDate: "2024-09-30",
    budget: 300000,
    spent: 285000,
    beneficiaries: 80,
    volunteers: 30,
    progress: 100,
    location: "Zona Sul"
  },
  {
    id: 5,
    name: "Capacitação Profissional",
    description: "Cursos de capacitação profissional para jovens e adultos",
    category: "Educação",
    status: "pausado",
    priority: "baixa",
    startDate: "2024-03-01",
    endDate: "2024-08-30",
    budget: 60000,
    spent: 18000,
    beneficiaries: 120,
    volunteers: 8,
    progress: 20,
    location: "Zona Leste"
  },
];

export function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    const matchesCategory = filterCategory === "all" || project.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ativo":
        return <Clock className="w-4 h-4" />;
      case "concluido":
        return <CheckCircle className="w-4 h-4" />;
      case "pausado":
        return <Pause className="w-4 h-4" />;
      case "planejamento":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ativo":
        return "default";
      case "concluido":
        return "default"; // Mudado de "secondary" para "default" para melhor visibilidade
      case "pausado":
        return "destructive";
      case "planejamento":
        return "outline";
      default:
        return "outline";
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "alta":
        return "destructive";
      case "media":
        return "default";
      case "baixa":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projetos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os projetos humanitários
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Projeto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar Novo Projeto</DialogTitle>
              <DialogDescription>
                Adicione um novo projeto humanitário
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="project-name">Nome do Projeto</Label>
                <Input id="project-name" placeholder="Nome do projeto" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-description">Descrição</Label>
                <Textarea id="project-description" placeholder="Descreva o projeto..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-category">Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alimentacao">Alimentação</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                      <SelectItem value="saude">Saúde</SelectItem>
                      <SelectItem value="habitacao">Habitação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-priority">Prioridade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-start">Data de Início</Label>
                  <Input id="project-start" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-end">Data de Término</Label>
                  <Input id="project-end" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-budget">Orçamento (R$)</Label>
                <Input id="project-budget" type="number" placeholder="0,00" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Criar Projeto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total de Projetos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              Todos os projetos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Projetos Ativos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Em andamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Orçamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.2M</div>
            <p className="text-xs text-muted-foreground">
              Todos os projetos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Beneficiários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.432</div>
            <p className="text-xs text-muted-foreground">
              Total atendido
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Projetos</CardTitle>
          <CardDescription>
            Gerencie e acompanhe todos os projetos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="pausado">Pausado</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="planejamento">Planejamento</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Alimentação">Alimentação</SelectItem>
                <SelectItem value="Educação">Educação</SelectItem>
                <SelectItem value="Saúde">Saúde</SelectItem>
                <SelectItem value="Habitação">Habitação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="p-6 border rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{project.name}</h3>
                      <Badge 
                        variant={getStatusVariant(project.status)} 
                        className={`flex items-center gap-1 ${
                          project.status === "ativo" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-700" 
                            : project.status === "concluido"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-700"
                            : ""
                        }`}
                      >
                        {getStatusIcon(project.status)}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                      <Badge 
                        variant={getPriorityVariant(project.priority)}
                        className={`${
                          project.priority === "media"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700"
                            : project.priority === "baixa"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600"
                            : ""
                        }`}
                      >
                        Prioridade {project.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(project.startDate).toLocaleDateString('pt-BR')} - {new Date(project.endDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span>R$ {project.spent.toLocaleString()} / R$ {project.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{project.beneficiaries} beneficiários</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{project.volunteers} voluntários</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Progresso do Projeto</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex justify-between items-center">
                  <Badge 
                    variant="outline"
                    className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                  >
                    {project.category}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Visualizar
                    </Button>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}