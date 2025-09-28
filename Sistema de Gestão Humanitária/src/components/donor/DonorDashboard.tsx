import { TrendingUp, Heart, Calendar, Target, DollarSign, Award, Users, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useAuth } from "../AuthContext";

export function DonorDashboard() {
  const { user } = useAuth();

  // Mock data para o doador
  const donorStats = {
    totalDonated: 2850,
    projectsSupported: 8,
    peopleHelped: 156,
    donationsThisMonth: 3,
  };

  const recentDonations = [
    {
      id: "1",
      project: "Alimentação Escolar Rural",
      amount: 150,
      date: "2024-03-15",
      status: "processada",
      impact: "15 refeições fornecidas",
    },
    {
      id: "2",
      project: "Água Potável - Nordeste",
      amount: 300,
      date: "2024-03-10",
      status: "processada",
      impact: "3 famílias beneficiadas",
    },
    {
      id: "3",
      project: "Kits de Higiene",
      amount: 85,
      date: "2024-03-05",
      status: "processada",
      impact: "8 kits distribuídos",
    },
  ];

  const activeProjects = [
    {
      id: "1",
      name: "Centro de Educação Infantil",
      description: "Construção de novo centro educacional",
      progress: 67,
      goal: 50000,
      raised: 33500,
      daysLeft: 45,
      myContribution: 500,
    },
    {
      id: "2",
      name: "Programa Alimentação Sênior",
      description: "Distribuição de alimentos para idosos",
      progress: 89,
      goal: 25000,
      raised: 22250,
      daysLeft: 12,
      myContribution: 200,
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processada":
        return <Badge className="bg-green-100 text-green-800">Processada</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1>Bem-vindo de volta, {user?.name}!</h1>
        <p className="text-muted-foreground">
          Acompanhe o impacto das suas doações e descubra novos projetos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(donorStats.totalDonated)}</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Apoiados</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donorStats.projectsSupported}</div>
            <p className="text-xs text-muted-foreground">
              Desde o início da sua jornada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pessoas Ajudadas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donorStats.peopleHelped}</div>
            <p className="text-xs text-muted-foreground">
              Impacto direto das suas doações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donorStats.donationsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              Doações realizadas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Projetos Ativos */}
        <Card>
          <CardHeader>
            <CardTitle>Projetos que Você Apoia</CardTitle>
            <CardDescription>
              Acompanhe o progresso dos projetos que receberam suas doações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    <Clock className="h-3 w-3 mr-1" />
                    {project.daysLeft}d
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso: {project.progress}%</span>
                    <span>
                      {formatCurrency(project.raised)} / {formatCurrency(project.goal)}
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      Sua contribuição: {formatCurrency(project.myContribution)}
                    </p>
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
                
                {project.id !== activeProjects[activeProjects.length - 1].id && (
                  <Separator />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Histórico Recente */}
        <Card>
          <CardHeader>
            <CardTitle>Doações Recentes</CardTitle>
            <CardDescription>
              Suas últimas contribuições e seu impacto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDonations.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{donation.project}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{new Date(donation.date).toLocaleDateString("pt-BR")}</span>
                    {getStatusBadge(donation.status)}
                  </div>
                  <p className="text-xs text-green-600">
                    <Heart className="h-3 w-3 inline mr-1" />
                    {donation.impact}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(donation.amount)}</p>
                </div>
              </div>
            ))}
            
            <Separator />
            
            <div className="flex justify-center">
              <Button variant="outline" size="sm">
                Ver Histórico Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reconhecimento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Seu Impacto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <p className="text-sm text-muted-foreground">Pessoas diretamente beneficiadas</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">8</div>
              <p className="text-sm text-muted-foreground">Comunidades impactadas</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-600">24</div>
              <p className="text-sm text-muted-foreground">Meses de engajamento</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}