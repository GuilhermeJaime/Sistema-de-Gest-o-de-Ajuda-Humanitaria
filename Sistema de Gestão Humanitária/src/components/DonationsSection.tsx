import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Plus, Search, DollarSign, Calendar, User } from "lucide-react";

const donations = [
  {
    id: 1,
    donor: "Maria Silva",
    amount: 500,
    type: "monetaria",
    date: "2024-01-15",
    project: "Alimentação - Região Norte",
    status: "confirmada"
  },
  {
    id: 2,
    donor: "João Santos",
    amount: 1200,
    type: "monetaria",
    date: "2024-01-14",
    project: "Educação Infantil",
    status: "pendente"
  },
  {
    id: 3,
    donor: "Empresa ABC Ltda",
    amount: 5000,
    type: "monetaria",
    date: "2024-01-13",
    project: "Assistência Médica",
    status: "confirmada"
  },
  {
    id: 4,
    donor: "Ana Costa",
    amount: 800,
    type: "material",
    date: "2024-01-12",
    project: "Distribuição de Alimentos",
    status: "confirmada"
  },
  {
    id: 5,
    donor: "Supermercado XYZ",
    amount: 2500,
    type: "material",
    date: "2024-01-11",
    project: "Alimentação - Região Norte",
    status: "confirmada"
  },
];

export function DonationsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || donation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Doações</h1>
          <p className="text-muted-foreground">
            Gerencie doações monetárias e materiais
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Doação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nova Doação</DialogTitle>
              <DialogDescription>
                Adicione uma nova doação ao sistema
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="donor">Nome do Doador</Label>
                <Input id="donor" placeholder="Nome completo ou empresa" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">País</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AO">Angola (Kz)</SelectItem>
                    <SelectItem value="BR">Brasil (R$)</SelectItem>
                    <SelectItem value="PT">Portugal (€)</SelectItem>
                    <SelectItem value="MZ">Moçambique (MT)</SelectItem>
                    <SelectItem value="US">Estados Unidos ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Valor da Doação</Label>
                <Input id="amount" type="number" placeholder="0,00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de Doação</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monetaria">Monetária</SelectItem>
                    <SelectItem value="material">Material</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project">Projeto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentacao">Alimentação - Região Norte</SelectItem>
                    <SelectItem value="educacao">Educação Infantil</SelectItem>
                    <SelectItem value="saude">Assistência Médica</SelectItem>
                    <SelectItem value="habitacao">Construção de Abrigos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Registrar Doação
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Arrecadado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 328.000</div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Doações Este Mês</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Doadores Únicos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">423</div>
            <p className="text-xs text-muted-foreground">
              +8% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Doações</CardTitle>
          <CardDescription>
            Visualize e gerencie todas as doações recebidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por doador ou projeto..."
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
                <SelectItem value="confirmada">Confirmada</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doador</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.donor}</TableCell>
                    <TableCell>R$ {donation.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={donation.type === "monetaria" ? "default" : "secondary"}>
                        {donation.type === "monetaria" ? "Monetária" : "Material"}
                      </Badge>
                    </TableCell>
                    <TableCell>{donation.project}</TableCell>
                    <TableCell>{new Date(donation.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          donation.status === "confirmada" ? "default" :
                          donation.status === "pendente" ? "secondary" :
                          "destructive"
                        }
                      >
                        {donation.status === "confirmada" ? "Confirmada" :
                         donation.status === "pendente" ? "Pendente" :
                         "Cancelada"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}