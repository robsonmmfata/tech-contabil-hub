
import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, FileText, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Obrigacoes = () => {
  const [selectedTab, setSelectedTab] = useState("pendentes");

  const obrigacoesPendentes = [
    { id: 1, cliente: "Tech Solutions Ltda", tipo: "DAS", vencimento: "2024-01-15", status: "pendente", valor: "R$ 1.250,00" },
    { id: 2, cliente: "DevCorp", tipo: "IRPJ", vencimento: "2024-01-20", status: "atrasado", valor: "R$ 3.500,00" },
    { id: 3, cliente: "StartupXYZ", tipo: "Folha de Pagamento", vencimento: "2024-01-25", status: "pendente", valor: "R$ 850,00" },
    { id: 4, cliente: "CodeMaster", tipo: "ICMS", vencimento: "2024-01-30", status: "pendente", valor: "R$ 2.100,00" }
  ];

  const obrigacoesConcluidas = [
    { id: 5, cliente: "WebDesign Pro", tipo: "DAS", vencimento: "2024-01-05", status: "concluido", valor: "R$ 980,00" },
    { id: 6, cliente: "AppDev Inc", tipo: "ISS", vencimento: "2024-01-10", status: "concluido", valor: "R$ 1.500,00" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendente</Badge>;
      case 'atrasado':
        return <Badge variant="destructive">Atrasado</Badge>;
      case 'concluido':
        return <Badge variant="default" className="bg-green-50 text-green-700 border-green-200">Concluído</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const alertasProximos = [
    { cliente: "Tech Solutions Ltda", obrigacao: "DAS", dias: 3 },
    { cliente: "DevCorp", obrigacao: "IRPJ", dias: 8 },
    { cliente: "StartupXYZ", obrigacao: "Folha", dias: 12 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Obrigações Fiscais</h1>
          <p className="text-gray-500 mt-1">Gerencie prazos e obrigações dos seus clientes</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nova Obrigação</span>
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">4</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Atrasadas</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Concluídas</p>
                <p className="text-2xl font-bold text-green-600">2</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Este Mês</p>
                <p className="text-2xl font-bold text-blue-600">7</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas de Prazos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Alertas de Prazos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertasProximos.map((alerta, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <p className="font-medium text-gray-900">{alerta.cliente}</p>
                  <p className="text-sm text-gray-600">{alerta.obrigacao}</p>
                </div>
                <Badge variant="outline" className="bg-orange-100 text-orange-700">
                  {alerta.dias} dias
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabelas de Obrigações */}
      <Card>
        <CardHeader>
          <CardTitle>Controle de Obrigações</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
              <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pendentes" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {obrigacoesPendentes.map((obrigacao) => (
                    <TableRow key={obrigacao.id}>
                      <TableCell className="font-medium">{obrigacao.cliente}</TableCell>
                      <TableCell>{obrigacao.tipo}</TableCell>
                      <TableCell>{obrigacao.vencimento}</TableCell>
                      <TableCell>{obrigacao.valor}</TableCell>
                      <TableCell>{getStatusBadge(obrigacao.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button size="sm">Concluir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="concluidas" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {obrigacoesConcluidas.map((obrigacao) => (
                    <TableRow key={obrigacao.id}>
                      <TableCell className="font-medium">{obrigacao.cliente}</TableCell>
                      <TableCell>{obrigacao.tipo}</TableCell>
                      <TableCell>{obrigacao.vencimento}</TableCell>
                      <TableCell>{obrigacao.valor}</TableCell>
                      <TableCell>{getStatusBadge(obrigacao.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Obrigacoes;
