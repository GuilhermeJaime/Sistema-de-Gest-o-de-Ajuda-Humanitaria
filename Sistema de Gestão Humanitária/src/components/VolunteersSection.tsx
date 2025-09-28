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
import { Plus, Search, Users, Phone, Mail, MapPin } from "lucide-react";

const volunteers = [
  {
    id: 1,
    name: "Carlos Eduardo",
    email: "carlos@email.com",
    phone: "(11) 99999-1234",
    skills: ["Logística", "Coordenação"],
    location: "São Paulo, SP",
    status: "ativo",
    joinDate: "2023-06-15",
    hoursContributed: 120
  },
  {
    id: 2,
    name: "Ana Beatriz",
    email: "ana@email.com",
    phone: "(21) 88888-5678",
    skills: ["Medicina", "Primeiros Socorros"],
    location: "Rio de Janeiro, RJ",
    status: "ativo",
    joinDate: "2023-08-22",
    hoursContributed: 95
  },
  {
    id: 3,
    name: "Roberto Lima",
    email: "roberto@email.com",
    phone: "(31) 77777-9012",
    skills: ["Construção", "Engenharia"],
    location: "Belo Horizonte, MG",
    status: "inativo",
    joinDate: "2023-05-10",
    hoursContributed: 180
  },
  {
    id: 4,
    name: "Fernanda Costa",
    email: "fernanda@email.com",
    phone: "(85) 66666-3456",
    skills: ["Educação", "Psicologia"],
    location: "Fortaleza, CE",
    status: "ativo",
    joinDate: "2023-09-05",
    hoursContributed: 75
  },
  {
    id: 5,
    name: "Lucas Oliveira",
    email: "lucas@email.com",
    phone: "(41) 55555-7890",
    skills: ["TI", "Comunicação"],
    location: "Curitiba, PR",
    status: "ativo",
    joinDate: "2023-07-18",
    hoursContributed: 140
  },
];

export function VolunteersSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === "all" || volunteer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Voluntários</h1>
          <p className="text-muted-foreground">
            Gerencie sua equipe de voluntários
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Voluntário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Voluntário</DialogTitle>
              <DialogDescription>
                Adicione um novo voluntário à equipe
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="volunteer-name">Nome Completo</Label>
                <Input id="volunteer-name" placeholder="Nome do voluntário" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="volunteer-email">Email</Label>
                <Input id="volunteer-email" type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="volunteer-phone">Telefone</Label>
                <Input id="volunteer-phone" placeholder="(00) 00000-0000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="volunteer-location">Localização</Label>
                <Input id="volunteer-location" placeholder="Cidade, Estado" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="volunteer-skills">Habilidades</Label>
                <Input id="volunteer-skills" placeholder="Separe por vírgulas" />
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
            <CardTitle className="text-sm">Total de Voluntários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.247</div>
            <p className="text-xs text-muted-foreground">
              +18 novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Voluntários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">
              71.5% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Horas Voluntárias</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.420</div>
            <p className="text-xs text-muted-foreground">
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Novas Inscrições</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Esta semana
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Volunteers List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Voluntários</CardTitle>
          <CardDescription>
            Gerencie informações e status dos voluntários
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email ou habilidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredVolunteers.map((volunteer) => (
              <div key={volunteer.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>{getInitials(volunteer.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{volunteer.name}</h4>
                      <Badge 
                        variant={volunteer.status === "ativo" ? "default" : "secondary"}
                      >
                        {volunteer.status === "ativo" ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {volunteer.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {volunteer.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {volunteer.location}
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {volunteer.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{volunteer.hoursContributed}h</div>
                  <div className="text-xs text-muted-foreground">
                    Desde {new Date(volunteer.joinDate).toLocaleDateString('pt-BR')}
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