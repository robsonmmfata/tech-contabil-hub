import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, FileText, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FluxoCaixaChart } from "@/components/charts/FluxoCaixaChart";
import { NovaTransacaoModal } from "@/components/modals/NovaTransacaoModal";
import { useToast } from "@/hooks/use-toast";
import { ExportarFinanceiroModal } from "@/components/modals/ExportarFinanceiroModal";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const Financeiro = () => {
  const [selectedTab, setSelectedTab] = useState("receitas");
  const [modalExportarOpen, setModalExportarOpen] = useState(false);
  const { toast } = useToast();

  const receitas = [
    { id: 1, cliente: "Tech Solutions Ltda", servico: "DAS + Folha", valor: 1850.00, vencimento: "2024-01-15", status: "pago" },
    { id: 2, cliente: "DevCorp", servico: "IRPJ", valor: 3500.00, vencimento: "2024-01-20", status: "pendente" },
    { id: 3, cliente: "StartupXYZ", servico: "Consultoria", valor: 2200.00, vencimento: "2024-01-25", status: "atrasado" },
    { id: 4, cliente: "CodeMaster", servico: "Contabilidade Mensal", valor: 1200.00, vencimento: "2024-01-30", status: "pago" }
  ];

  const despesas = [
    { id: 1, descricao: "Software Contábil", categoria: "Tecnologia", valor: 450.00, data: "2024-01-05", status: "pago" },
    { id: 2, descricao: "Certificado Digital", categoria: "Certificações", valor: 180.00, data: "2024-01-10", status: "pago" },
    { id: 3, descricao: "Marketing Digital", categoria: "Marketing", valor: 800.00, data: "2024-01-15", status: "pendente" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pago':
        return <Badge variant="default" className="bg-green-50 text-green-700 border-green-200">Pago</Badge>;
      case 'pendente':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendente</Badge>;
      case 'atrasado':
        return <Badge variant="destructive">Atrasado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const totalReceitas = receitas.reduce((sum, receita) => sum + receita.valor, 0);
  const totalDespesas = despesas.reduce((sum, despesa) => sum + despesa.valor, 0);
  const lucroLiquido = totalReceitas - totalDespesas;
  const receitasPagas = receitas.filter(r => r.status === 'pago').reduce((sum, receita) => sum + receita.valor, 0);

  const handleExportar = (type?: "pdf" | "xls") => {
    if (!type) {
      setModalExportarOpen(true);
      return;
    }
    if (type === "pdf") {
      const doc = new jsPDF();
      // Receitas
      doc.text("Receitas", 10, 10);
      (doc as any).autoTable({
        head: [["Cliente", "Serviço", "Valor", "Vencimento", "Status"]],
        body: receitas.map(r => [r.cliente, r.servico, `R$ ${r.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, r.vencimento, r.status]),
        startY: 15
      });
      // Despesas
      let startY = (doc as any).lastAutoTable.finalY + 10;
      doc.text("Despesas", 10, startY);
      (doc as any).autoTable({
        head: [["Descrição", "Categoria", "Valor", "Data", "Status"]],
        body: despesas.map(d => [d.descricao, d.categoria, `R$ ${d.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, d.data, d.status]),
        startY: startY + 5
      });
      doc.save("financeiro.pdf");
      toast({title: "Exportação completa", description: "Arquivo PDF exportado com sucesso!"});
    }
    if (type === "xls") {
      const receitasSheet = receitas.map(r => ({
        Cliente: r.cliente, Serviço: r.servico, Valor: r.valor, Vencimento: r.vencimento, Status: r.status
      }));
      const despesasSheet = despesas.map(d => ({
        Descrição: d.descricao, Categoria: d.categoria, Valor: d.valor, Data: d.data, Status: d.status
      }));
      const wb = XLSX.utils.book_new();
      const wsReceitas = XLSX.utils.json_to_sheet(receitasSheet);
      const wsDespesas = XLSX.utils.json_to_sheet(despesasSheet);
      XLSX.utils.book_append_sheet(wb, wsReceitas, "Receitas");
      XLSX.utils.book_append_sheet(wb, wsDespesas, "Despesas");
      XLSX.writeFile(wb, "financeiro.xlsx");
      toast({title: "Exportação completa", description: "Arquivo Excel exportado com sucesso!"});
    }
    setModalExportarOpen(false);
  };

  const handleReceber = (receitaId: number) => {
    toast({
      title: "Receita recebida",
      description: `Receita ID ${receitaId} foi marcada como paga!`,
    });
  };

  const handleVisualizarDocumento = (id: number) => {
    toast({
      title: "Visualizar documento",
      description: `Abrindo documento ID: ${id}`,
    });
  };

  return (
    <div className="space-y-6">
      <ExportarFinanceiroModal
        open={modalExportarOpen}
        onClose={() => setModalExportarOpen(false)}
        onExport={handleExportar}
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-500 mt-1">Controle financeiro do seu escritório contábil</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2" onClick={() => handleExportar()}>
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <NovaTransacaoModal />
        </div>
      </div>

      {/* Cards de Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Receitas Totais</p>
                <p className="text-2xl font-bold text-green-600">R$ {totalReceitas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                <p className="text-sm text-green-600 mt-1">+12% vs mês anterior</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Receitas Recebidas</p>
                <p className="text-2xl font-bold text-blue-600">R$ {receitasPagas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                <p className="text-sm text-blue-600 mt-1">67% do total</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Despesas</p>
                <p className="text-2xl font-bold text-red-600">R$ {totalDespesas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                <p className="text-sm text-red-600 mt-1">-5% vs mês anterior</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Lucro Líquido</p>
                <p className={`text-2xl font-bold ${lucroLiquido >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  R$ {lucroLiquido.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </p>
                <p className="text-sm text-green-600 mt-1">Margem: {((lucroLiquido/totalReceitas)*100).toFixed(1)}%</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Fluxo de Caixa */}
      <Card>
        <CardHeader>
          <CardTitle>Fluxo de Caixa - Janeiro 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <FluxoCaixaChart />
        </CardContent>
      </Card>

      {/* Tabelas de Receitas e Despesas */}
      <Card>
        <CardHeader>
          <CardTitle>Movimentação Financeira</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="receitas">Receitas</TabsTrigger>
              <TabsTrigger value="despesas">Despesas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="receitas" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitas.map((receita) => (
                    <TableRow key={receita.id}>
                      <TableCell className="font-medium">{receita.cliente}</TableCell>
                      <TableCell>{receita.servico}</TableCell>
                      <TableCell>R$ {receita.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</TableCell>
                      <TableCell>{receita.vencimento}</TableCell>
                      <TableCell>{getStatusBadge(receita.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleVisualizarDocumento(receita.id)}>
                            <FileText className="h-4 w-4" />
                          </Button>
                          {receita.status !== 'pago' && (
                            <Button size="sm" onClick={() => handleReceber(receita.id)}>
                              Receber
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="despesas" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {despesas.map((despesa) => (
                    <TableRow key={despesa.id}>
                      <TableCell className="font-medium">{despesa.descricao}</TableCell>
                      <TableCell>{despesa.categoria}</TableCell>
                      <TableCell>R$ {despesa.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</TableCell>
                      <TableCell>{despesa.data}</TableCell>
                      <TableCell>{getStatusBadge(despesa.status)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => handleVisualizarDocumento(despesa.id)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
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

export default Financeiro;
