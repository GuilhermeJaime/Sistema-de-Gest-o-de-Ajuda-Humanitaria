import { StatsCard } from "./StatsCard";
import { GlassCard } from "./GlassCard";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  Heart, 
  Users, 
  Target, 
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const donationData = [
  { month: "Jan", amount: 45000 },
  { month: "Fev", amount: 52000 },
  { month: "Mar", amount: 48000 },
  { month: "Abr", amount: 61000 },
  { month: "Mai", amount: 55000 },
  { month: "Jun", amount: 67000 },
];

const projectData = [
  { name: "Alimentação", value: 35, color: "#8884d8" },
  { name: "Educação", value: 25, color: "#82ca9d" },
  { name: "Saúde", value: 20, color: "#ffc658" },
  { name: "Habitação", value: 20, color: "#ff7300" },
];

const recentProjects = [
  {
    id: 1,
    name: "Distribuição de Alimentos - Região Norte",
    status: "ativo",
    beneficiaries: 450,
    deadline: "2024-12-15",
    progress: 75
  },
  {
    id: 2,
    name: "Programa de Educação Infantil",
    status: "planejamento",
    beneficiaries: 200,
    deadline: "2024-11-30",
    progress: 30
  },
  {
    id: 3,
    name: "Assistência Médica de Emergência",
    status: "ativo",
    beneficiaries: 150,
    deadline: "2024-10-20",
    progress: 90
  },
  {
    id: 4,
    name: "Construção de Abrigos Temporários",
    status: "concluido",
    beneficiaries: 80,
    deadline: "2024-09-30",
    progress: 100
  },
];

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white drop-shadow-2xl mb-2">Dashboard</h1>
        <p className="text-white/80 text-lg drop-shadow-lg">
          Visão geral das atividades de ajuda humanitária
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Doações"
          value="R$ 328.000"
          description="Este mês"
          icon={DollarSign}
          trend={{ value: 12, label: "vs mês anterior" }}
        />
        <StatsCard
          title="Voluntários Ativos"
          value="1.247"
          description="Cadastrados"
          icon={Users}
          trend={{ value: 8, label: "novos esta semana" }}
        />
        <StatsCard
          title="Projetos Ativos"
          value="23"
          description="Em andamento"
          icon={Target}
          trend={{ value: -2, label: "vs mês anterior" }}
        />
        <StatsCard
          title="Pessoas Assistidas"
          value="5.432"
          description="Beneficiários"
          icon={Heart}
          trend={{ value: 15, label: "este mês" }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Trends */}
        <GlassCard variant="default" background="helping-hands" className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">Tendência de Doações</h3>
            <p className="text-white/80 text-sm">
              Valores arrecadados nos últimos 6 meses
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip 
                  formatter={(value) => [`R$ ${value.toLocaleString()}`, "Doações"]} 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="amount" fill="rgba(136, 132, 216, 0.8)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Project Distribution */}
        <GlassCard variant="default" background="volunteers" className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">Distribuição de Projetos</h3>
            <p className="text-white/80 text-sm">
              Por área de atuação
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Recent Projects */}
      <GlassCard variant="subtle" className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white drop-shadow-lg">Projetos Recentes</h3>
          <p className="text-white/80 text-sm">
            Acompanhe o progresso dos projetos em andamento
          </p>
        </div>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div key={project.id} className="glass-card p-4 rounded-lg hover:scale-[1.02] transition-transform duration-300">
              <div className="flex-1">
                <h4 className="font-medium text-white">{project.name}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {project.beneficiaries} beneficiários
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.deadline).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center justify-between text-sm mb-1 text-white/80">
                      <span>Progresso</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div>
                    <Badge 
                      variant={
                        project.status === "ativo" ? "default" :
                        project.status === "concluido" ? "secondary" :
                        "outline"
                      }
                      className="flex items-center gap-1 glass-button text-white border-white/20"
                    >
                      {project.status === "ativo" && <Clock className="w-3 h-3" />}
                      {project.status === "concluido" && <CheckCircle className="w-3 h-3" />}
                      {project.status === "planejamento" && <AlertTriangle className="w-3 h-3" />}
                      {project.status === "ativo" ? "Ativo" :
                       project.status === "concluido" ? "Concluído" :
                       "Planejamento"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}