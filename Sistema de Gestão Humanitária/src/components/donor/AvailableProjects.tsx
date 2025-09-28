import { useState } from "react";
import { Heart, MapPin, Calendar, Users, Target, Search, Filter, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner@2.0.3";
import { PaymentMethods } from "../PaymentMethods";

export function AvailableProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [donationMessage, setDonationMessage] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const projects = [
    {
      id: "1",
      name: "Centro de Educação Infantil",
      description: "Construção de um centro educacional para 200 crianças em região carente",
      category: "Educação",
      location: "São Paulo, SP",
      goal: 50000,
      raised: 33500,
      progress: 67,
      daysLeft: 45,
      supporters: 89,
      urgency: "medium",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop",
      organization: "Instituto Esperança",
      impact: "Educação de qualidade para 200 crianças",
      updates: 12,
    },
    {
      id: "2",
      name: "Água Potável para Comunidades",
      description: "Instalação de sistemas de captação e purificação de água",
      category: "Saúde",
      location: "Ceará, CE",
      goal: 75000,
      raised: 45000,
      progress: 60,
      daysLeft: 30,
      supporters: 156,
      urgency: "high",
      image: "https://images.unsplash.com/photo-1581929985635-b86fc32a19f8?w=400&h=200&fit=crop",
      organization: "Águas do Sertão",
      impact: "Acesso à água limpa para 500 famílias",
      updates: 8,
    },
    {
      id: "3",
      name: "Alimentação Escolar Rural",
      description: "Programa de merenda escolar nutritiva para escolas rurais",
      category: "Alimentação",
      location: "Minas Gerais, MG",
      goal: 25000,
      raised: 22250,
      progress: 89,
      daysLeft: 12,
      supporters: 203,
      urgency: "high",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=200&fit=crop",
      organization: "Futuro Rural",
      impact: "Merenda para 150 crianças por 6 meses",
      updates: 15,
    },
    {
      id: "4",
      name: "Capacitação Profissional",
      description: "Cursos técnicos e profissionalizantes para jovens",
      category: "Educação",
      location: "Rio de Janeiro, RJ",
      goal: 40000,
      raised: 12000,
      progress: 30,
      daysLeft: 60,
      supporters: 45,
      urgency: "low",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
      organization: "Juventude Ativa",
      impact: "Qualificação de 80 jovens",
      updates: 5,
    },
    {
      id: "5",
      name: "Assistência Médica Móvel",
      description: "Unidade móvel para atendimento em comunidades isoladas",
      category: "Saúde",
      location: "Amazônia, AM",
      goal: 120000,
      raised: 85000,
      progress: 71,
      daysLeft: 25,
      supporters: 321,
      urgency: "medium",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
      organization: "Saúde Sem Fronteiras",
      impact: "Atendimento para 15 comunidades",
      updates: 20,
    },
    {
      id: "6",
      name: "Moradia Digna",
      description: "Reforma e construção de casas para famílias em situação vulnerável",
      category: "Habitação",
      location: "Salvador, BA",
      goal: 80000,
      raised: 15000,
      progress: 19,
      daysLeft: 90,
      supporters: 67,
      urgency: "low",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=200&fit=crop",
      organization: "Teto para Todos",
      impact: "Moradia para 10 famílias",
      updates: 3,
    },
  ];

  const categories = ["all", "Educação", "Saúde", "Alimentação", "Habitação"];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "Urgente";
      case "medium":
        return "Moderada";
      case "low":
        return "Baixa";
      default:
        return "Normal";
    }
  };

  const handleDonate = () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast.error("Por favor, insira um valor válido para a doação");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    toast.success(`Doação de ${formatCurrency(parseFloat(donationAmount))} realizada com sucesso!`);
    setSelectedProject(null);
    setDonationAmount("");
    setDonationMessage("");
    setShowPayment(false);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const suggestedAmounts = [50, 100, 200, 500];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1>Projetos Disponíveis</h1>
        <p className="text-muted-foreground">
          Escolha um projeto e faça a diferença na vida de pessoas
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.slice(1).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Resultados */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                <Badge className={`${getUrgencyColor(project.urgency)} text-xs px-2 py-1`}>
                  {getUrgencyLabel(project.urgency)}
                </Badge>
              </div>
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  {project.category}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="line-clamp-1">{project.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {project.location}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso: {project.progress}%</span>
                  <span>
                    {formatCurrency(project.raised)} / {formatCurrency(project.goal)}
                  </span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="text-center">
                  <div className="font-medium">{project.supporters}</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">Apoiadores</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{project.daysLeft}d</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">Restantes</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{project.updates}</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">Atualizações</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm">
                      Ver Detalhes
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{project.name}</DialogTitle>
                      <DialogDescription>
                        {project.organization}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <p>{project.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Meta:</span>
                          <span className="font-medium">{formatCurrency(project.goal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Arrecadado:</span>
                          <span className="font-medium">{formatCurrency(project.raised)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Impacto esperado:</span>
                          <span className="font-medium">{project.impact}</span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={selectedProject?.id === project.id} onOpenChange={(open) => !open && setSelectedProject(null)}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex-1 text-xs sm:text-sm" onClick={() => setSelectedProject(project)}>
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Doar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {showPayment ? "Pagamento da Doação" : "Fazer Doação"}
                      </DialogTitle>
                      <DialogDescription>
                        {showPayment ? "Selecione a forma de pagamento" : `Contribua para: ${project.name}`}
                      </DialogDescription>
                    </DialogHeader>
                    
                    {showPayment ? (
                      <PaymentMethods
                        amount={donationAmount}
                        onPaymentComplete={handlePaymentComplete}
                        onCancel={handlePaymentCancel}
                      />
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Valor da Doação</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="0,00"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                          />
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {suggestedAmounts.map((amount) => (
                              <Button
                                key={amount}
                                variant="outline"
                                size="sm"
                                onClick={() => setDonationAmount(amount.toString())}
                                className="text-xs sm:text-sm"
                              >
                                R$ {amount}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Mensagem (opcional)</Label>
                          <Textarea
                            id="message"
                            placeholder="Deixe uma mensagem de apoio..."
                            value={donationMessage}
                            onChange={(e) => setDonationMessage(e.target.value)}
                          />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <Button variant="outline" onClick={() => setSelectedProject(null)} className="order-2 sm:order-1">
                            Cancelar
                          </Button>
                          <Button onClick={handleDonate} className="order-1 sm:order-2">
                            Prosseguir para Pagamento
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhum projeto encontrado com os filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
}