import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Plus, Search, Users, MapPin, Calendar, Heart } from "lucide-react";

const beneficiaries = [
  {
    id: 1,
    name: "Maria Santos",
    age: 34,
    familySize: 4,
    location: "Região Norte",
    program: "Alimentação",
    status: "ativo",
    registrationDate: "2023-08-15",
    lastAssistance: "2024-01-10",
    needs: ["Alimentação", "Habitação"]
  },
  {
    id: 2,
    name: "João Silva",
    age: 45,
    familySize: 6,
    location: "Centro",
    program: "Educação Infantil",
    status: "ativo",
    registrationDate: "2023-09-22",
    lastAssistance: "2024-01-08",
    needs: ["Educação", "Alimentação"]
  },
  {
    id: 3,
    name: "Ana Costa",
    age: 28,
    familySize: 2,
    location: "Zona Sul",
    program: "Assistência Médica",
    status: "concluido",
    registrationDate: "2023-06-10",
    lastAssistance: "2023-12-15",
    needs: ["Saúde"]
  },
  {
    id: 4,
    name: "Carlos Eduardo",
    age: 52,
    familySize: 3,
    location: "Interior",
    program: "Habitação",
    status: "ativo",
    registrationDate: "2023-11-05",
    lastAssistance: "2024-01-12",
    needs: ["Habitação", "Saúde"]
  },
  {
    id: 5,
    name: "Fernanda Lima",
    age: 29,
    familySize: 5,
    location: "Zona Leste",
    program: "Capacitação Profissional",
    status: "aguardando",
    registrationDate: "2024-01-03",
    lastAssistance: null,
    needs: ["Educação", "Alimentação"]
  },
  {
    id: 6,
    name: "Roberto Oliveira",
    age: 38,
    familySize: 4,
    location: "Região Norte",
    program: "Alimentação",
    status: "ativo",
    registrationDate: "2023-07-18",
    lastAssistance: "2024-01-11",
    needs: ["Alimentação"]
  },
];

const needsColors = {
  "Alimentação": "bg-orange-100 text-orange-800",
  "Educação": "bg-blue-100 text-blue-800",
  "Saúde": "bg-red-100 text-red-800",
  "Habitação": "bg-green-100 text-green-800"
};

export function BeneficiariesSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProgram, setFilterProgram] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredBeneficiaries = beneficiaries.filter(beneficiary => {
    const matchesSearch = beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beneficiary.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || beneficiary.status === filterStatus;
    const matchesProgram = filterProgram === "all" || beneficiary.program === filterProgram;
    return matchesSearch && matchesStatus && matchesProgram;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ativo":
        return "default";
      case "concluido":
        return "secondary";
      case "aguardando":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Beneficiários</h1>
          <p className="text-muted-foreground">
            Gerencie informações dos beneficiários dos programas
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Beneficiário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Beneficiário</DialogTitle>
              <DialogDescription>
                Adicione um novo beneficiário aos programas
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="beneficiary-name">Nome Completo</Label>
                <Input id="beneficiary-name" placeholder="Nome do beneficiário" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="beneficiary-age">Idade</Label>
                  <Input id="beneficiary-age" type="number" placeholder="Idade" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="family-size">Tamanho da Família</Label>
                  <Input id="family-size" type="number" placeholder="Número de pessoas" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="beneficiary-location">Localização</Label>
                <Input id="beneficiary-location" placeholder="Endereço ou região" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="beneficiary-program">Programa</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o programa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="educacao">Educação Infantil</SelectItem>
                    <SelectItem value="saude">Assistência Médica</SelectItem>
                    <SelectItem value="habitacao">Habitação</SelectItem>
                    <SelectItem value="capacitacao">Capacitação Profissional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="beneficiary-needs">Necessidades</Label>
                <Input id="beneficiary-needs" placeholder="Separe por vírgulas" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Cadastrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total de Beneficiários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.432</div>
            <p className="text-xs text-muted-foreground">
              Cadastrados no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Ativos</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.127</div>
            <p className="text-xs text-muted-foreground">
              Recebendo assistência
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Famílias Atendidas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.287</div>
            <p className="text-xs text-muted-foreground">
              Núcleos familiares
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Novos Este Mês</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +23% vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Beneficiaries List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Beneficiários</CardTitle>
          <CardDescription>
            Visualize e gerencie informações dos beneficiários
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou localização..."
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
                <SelectItem value="aguardando">Aguardando</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterProgram} onValueChange={setFilterProgram}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Programa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os programas</SelectItem>
                <SelectItem value="Alimentação">Alimentação</SelectItem>
                <SelectItem value="Educação Infantil">Educação Infantil</SelectItem>
                <SelectItem value="Assistência Médica">Assistência Médica</SelectItem>
                <SelectItem value="Habitação">Habitação</SelectItem>
                <SelectItem value="Capacitação Profissional">Capacitação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredBeneficiaries.map((beneficiary) => (
              <div key={beneficiary.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>{getInitials(beneficiary.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{beneficiary.name}</h4>
                      <Badge variant={getStatusVariant(beneficiary.status)}>
                        {beneficiary.status === "ativo" ? "Ativo" :
                         beneficiary.status === "concluido" ? "Concluído" :
                         "Aguardando"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{beneficiary.age} anos</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {beneficiary.familySize} pessoas na família
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {beneficiary.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">Programa:</span>
                      <Badge variant="outline" className="text-xs">
                        {beneficiary.program}
                      </Badge>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {beneficiary.needs.map((need, index) => (
                        <span 
                          key={index} 
                          className={`text-xs px-2 py-1 rounded ${needsColors[need as keyof typeof needsColors] || 'bg-gray-100 text-gray-800'}`}
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">
                    Cadastrado em {new Date(beneficiary.registrationDate).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {beneficiary.lastAssistance ? 
                      `Última assistência: ${new Date(beneficiary.lastAssistance).toLocaleDateString('pt-BR')}` :
                      'Ainda não recebeu assistência'
                    }
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