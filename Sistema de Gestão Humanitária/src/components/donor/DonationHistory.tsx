import { useState } from "react";
import { Calendar, Download, Eye, Filter, Search, TrendingUp, Heart, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";

export function DonationHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDonation, setSelectedDonation] = useState<any>(null);

  const donations = [
    {
      id: "DOA001",
      project: "Centro de Educação Infantil",
      amount: 500,
      date: "2024-03-15T10:30:00",
      status: "processada",
      method: "Cartão de Crédito",
      receipt: "REC-2024-001",
      impact: "Contribuição para material escolar de 25 crianças",
      organization: "Instituto Esperança",
      message: "Espero que ajude no desenvolvimento das crianças!",
    },
    {
      id: "DOA002",
      project: "Água Potável - Nordeste",
      amount: 300,
      date: "2024-03-10T14:15:00",
      status: "processada",
      method: "PIX",
      receipt: "REC-2024-002",
      impact: "3 famílias com acesso à água tratada",
      organization: "Águas do Sertão",
      message: "",
    },
    {
      id: "DOA003",
      project: "Alimentação Escolar Rural",
      amount: 150,
      date: "2024-03-05T09:45:00",
      status: "processada",
      method: "Transferência Bancária",
      receipt: "REC-2024-003",
      impact: "15 refeições nutritivas fornecidas",
      organization: "Futuro Rural",
      message: "Que todas as crianças tenham acesso à alimentação adequada.",
    },
    {
      id: "DOA004",
      project: "Assistência Médica Móvel",
      amount: 800,
      date: "2024-02-28T16:20:00",
      status: "processada",
      method: "Cartão de Débito",
      receipt: "REC-2024-004",
      impact: "Atendimento médico para 40 pessoas",
      organization: "Saúde Sem Fronteiras",
      message: "",
    },
    {
      id: "DOA005",
      project: "Capacitação Profissional",
      amount: 250,
      date: "2024-02-20T11:10:00",
      status: "processada",
      method: "PIX",
      receipt: "REC-2024-005",
      impact: "Material de curso para 5 jovens",
      organization: "Juventude Ativa",
      message: "Investir na juventude é investir no futuro!",
    },
    {
      id: "DOA006",
      project: "Moradia Digna",
      amount: 1000,
      date: "2024-02-15T13:30:00",
      status: "processada",
      method: "Cartão de Crédito",
      receipt: "REC-2024-006",
      impact: "Materiais de construção para 1 família",
      organization: "Teto para Todos",
      message: "",
    },
    {
      id: "DOA007",
      project: "Centro de Educação Infantil",
      amount: 200,
      date: "2024-01-25T15:45:00",
      status: "processada",
      method: "PIX",
      receipt: "REC-2024-007",
      impact: "Livros e material didático",
      organization: "Instituto Esperança",
      message: "",
    },
    {
      id: "DOA008",
      project: "Programa Alimentação Sênior",
      amount: 175,
      date: "2024-01-18T08:20:00",
      status: "processada",
      method: "Transferência Bancária",
      receipt: "REC-2024-008",
      impact: "Cestas básicas para 7 idosos",
      organization: "Cuidar Sempre",
      message: "Nossos idosos merecem todo o carinho.",
    },
  ];

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const averageDonation = totalDonated / donations.length;

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.organization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPeriod = selectedPeriod === "all" || (() => {
      const donationDate = new Date(donation.date);
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
      const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

      switch (selectedPeriod) {
        case "30":
          return donationDate >= thirtyDaysAgo;
        case "60":
          return donationDate >= sixtyDaysAgo;
        case "90":
          return donationDate >= ninetyDaysAgo;
        default:
          return true;
      }
    })();

    const matchesStatus = selectedStatus === "all" || donation.status === selectedStatus;
    
    return matchesSearch && matchesPeriod && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processada":
        return <Badge className="bg-green-100 text-green-800">Processada</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "cancelada":
        return <Badge className="bg-red-100 text-red-800">Cancelada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const downloadReceipt = (donation: any) => {
    // Simular download do comprovante
    const element = document.createElement("a");
    const text = `COMPROVANTE DE DOAÇÃO\n\nID: ${donation.id}\nProjeto: ${donation.project}\nValor: ${formatCurrency(donation.amount)}\nData: ${formatDate(donation.date)}\nMétodo: ${donation.method}\nRecibo: ${donation.receipt}`;
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `comprovante-${donation.receipt}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1>Histórico de Doações</h1>
        <p className="text-muted-foreground">
          Acompanhe todas as suas contribuições e impactos gerados
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDonated)}</div>
            <p className="text-xs text-muted-foreground">
              Desde o início
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Doações</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donations.length}</div>
            <p className="text-xs text-muted-foreground">
              Contribuições realizadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doação Média</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageDonation)}</div>
            <p className="text-xs text-muted-foreground">
              Por contribuição
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Doações realizadas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar Doações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por projeto ou organização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="60">Últimos 60 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="processada">Processada</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Doações */}
      <Card>
        <CardHeader>
          <CardTitle>Suas Doações</CardTitle>
          <CardDescription>
            {filteredDonations.length} doação(ões) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projeto</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{donation.project}</div>
                      <div className="text-sm text-muted-foreground">
                        {donation.organization}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(donation.amount)}
                  </TableCell>
                  <TableCell>{formatDate(donation.date)}</TableCell>
                  <TableCell>{getStatusBadge(donation.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedDonation(donation)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalhes da Doação</DialogTitle>
                            <DialogDescription>
                              ID: {donation.id}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Projeto</Label>
                                <p className="text-sm">{donation.project}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Organização</Label>
                                <p className="text-sm">{donation.organization}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Valor</Label>
                                <p className="text-sm font-medium text-green-600">
                                  {formatCurrency(donation.amount)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Data</Label>
                                <p className="text-sm">{formatDate(donation.date)}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Método</Label>
                                <p className="text-sm">{donation.method}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Recibo</Label>
                                <p className="text-sm">{donation.receipt}</p>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <Label className="text-sm font-medium">Impacto Gerado</Label>
                              <p className="text-sm text-green-600 mt-1">
                                <Heart className="h-4 w-4 inline mr-1" />
                                {donation.impact}
                              </p>
                            </div>
                            
                            {donation.message && (
                              <div>
                                <Label className="text-sm font-medium">Sua Mensagem</Label>
                                <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                                  "{donation.message}"
                                </p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadReceipt(donation)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredDonations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhuma doação encontrada com os filtros aplicados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}