import React, { useState } from 'react';
import { BarChart3, PieChart, FileText, Download, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReceitasMensaisChart } from "@/components/charts/ReceitasMensaisChart";
import { ServicosPieChart } from "@/components/charts/ServicosPieChart";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import type { DateRange } from "react-day-picker";

const receitasMensaisData = [
  { mes: 'Jan', valor: 28400 },
  { mes: 'Fev', valor: 31200 },
  { mes: 'Mar', valor: 29800 },
  { mes: 'Abr', valor: 33600 },
  { mes: 'Mai', valor: 35200 },
  { mes: 'Jun', valor: 32800 },
];

const servicosPieData = [
  { name: 'DAS', value: 35, color: '#3b82f6' },
  { name: 'IRPJ', value: 25, color: '#10b981' },
  { name: 'Folha', value: 20, color: '#f59e0b' },
  { name: 'Obrigações', value: 15, color: '#ef4444' },
  { name: 'Outros', value: 5, color: '#8b5cf6' },
];

const relatoriosDisponiveis = {
  financeiros: [
    { id: 1, nome: "Receitas vs Despesas", descricao: "Comparativo mensal", periodo: "Janeiro 2024" },
    { id: 2, nome: "Fluxo de Caixa", descricao: "Movimentação financeira", periodo: "Janeiro 2024" },
    { id: 3, nome: "Faturamento por Cliente", descricao: "Ranking de clientes", periodo: "Janeiro 2024" }
  ],
  obrigacoes: [
    { id: 4, nome: "Obrigações Cumpridas", descricao: "Status das obrigações", periodo: "Janeiro 2024" },
    { id: 5, nome: "Prazos em Atraso", descricao: "Obrigações pendentes", periodo: "Janeiro 2024" },
    { id: 6, nome: "Calendário Fiscal", descricao: "Próximos vencimentos", periodo: "Fevereiro 2024" }
  ],
  clientes: [
    { id: 7, nome: "Relatório de Clientes", descricao: "Lista completa de clientes", periodo: "Atual" },
    { id: 8, nome: "Clientes por Regime", descricao: "Distribuição por regime tributário", periodo: "Atual" },
    { id: 9, nome: "Histórico de Serviços", descricao: "Serviços prestados por cliente", periodo: "Janeiro 2024" }
  ]
};

const Relatorios = () => {
  const [periodo, setPeriodo] = useState("2025");
  const { toast } = useToast();
  const [exportLoading, setExportLoading] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleGerarRelatorio = (relatorioId: number) => {
    toast({
      title: "Gerando relatório",
      description: `Relatório ID ${relatorioId} está sendo gerado...`,
    });
  };

  const handleDownloadRelatorio = (relatorioId: number, tipo: "pdf" | "xls" = "pdf") => {
    const relatorio = [
      ...relatoriosDisponiveis.financeiros, 
      ...relatoriosDisponiveis.obrigacoes, 
      ...relatoriosDisponiveis.clientes
    ].find(r => r.id === relatorioId);

    if (!relatorio) {
      toast({ title: "Relatório não encontrado", variant: "destructive" });
      return;
    }

    if (tipo === "pdf") {
      const doc = new jsPDF();
      doc.text(relatorio.nome, 10, 10);
      autoTable(doc, {
        head: [["Nome", "Descrição", "Período"]],
        body: [[relatorio.nome, relatorio.descricao, relatorio.periodo]],
        startY: 20
      });
      doc.save(relatorio.nome.replace(/\s/g, '_').toLowerCase() + ".pdf");
      toast({
        title: "Download iniciado",
        description: `Relatório "${relatorio.nome}" exportado como PDF!`,
      });
    } else if (tipo === "xls") {
      const sheetData = [
        { Nome: relatorio.nome, Descrição: relatorio.descricao, Período: relatorio.periodo }
      ];
      const ws = XLSX.utils.json_to_sheet(sheetData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Relatório");
      XLSX.writeFile(wb, relatorio.nome.replace(/\s/g, '_').toLowerCase() + ".xlsx");
      toast({
        title: "Download iniciado",
        description: `Relatório "${relatorio.nome}" exportado como Excel!`,
      });
    }
  };

  const handleExportarGrafico = async (tipo: "receitas" | "servicos", formato: "pdf" | "xls") => {
    setExportLoading(`${tipo}-${formato}`);
    if (tipo === "receitas") {
      if (formato === "pdf") {
        const doc = new jsPDF();
        doc.text("Receitas por Mês", 10, 10);
        autoTable(doc, {
          head: [["Mês", "Valor"]],
          body: receitasMensaisData.map(d => [d.mes, `R$ ${d.valor.toLocaleString('pt-BR')}`]),
          startY: 20
        });
        doc.save("receitas_por_mes.pdf");
        toast({ title: "Exportação completa", description: "Gráfico exportado em PDF!" });
      } else {
        const ws = XLSX.utils.json_to_sheet(receitasMensaisData.map(d => ({
          Mês: d.mes, Valor: d.valor
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "ReceitasMensais");
        XLSX.writeFile(wb, "receitas_por_mes.xlsx");
        toast({ title: "Exportação completa", description: "Gráfico exportado em Excel!" });
      }
    } else if (tipo === "servicos") {
      if (formato === "pdf") {
        const doc = new jsPDF();
        doc.text("Serviços Mais Solicitados", 10, 10);
        autoTable(doc, {
          head: [["Serviço", "Quantidade"]],
          body: servicosPieData.map(s => [s.name, s.value]),
          startY: 20
        });
        doc.save("servicos_mais_solicitados.pdf");
        toast({ title: "Exportação completa", description: "Gráfico exportado em PDF!" });
      } else {
        const ws = XLSX.utils.json_to_sheet(servicosPieData.map(s => ({
          Serviço: s.name, Quantidade: s.value
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "ServicosMaisSolicitados");
        XLSX.writeFile(wb, "servicos_mais_solicitados.xlsx");
        toast({ title: "Exportação completa", description: "Gráfico exportado em Excel!" });
      }
    }
    setExportLoading(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-500 mt-1">Análises e relatórios do seu negócio contábil</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                className="flex items-center space-x-2"
                variant="outline"
                type="button"
              >
                <CalendarIcon className="h-4 w-4" />
                <span>Período Personalizado</span>
                {dateRange.from && dateRange.to && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range as DateRange);
                  if ((range as DateRange)?.from && (range as DateRange)?.to) {
                    setCalendarOpen(false);
                  }
                }}
                numberOfMonths={2}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Dashboard Analítico */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Receita Total</p>
                <p className="text-2xl font-bold text-green-600">R$ 186.400</p>
                <p className="text-sm text-green-600 mt-1">+12% vs período anterior</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Serviços Prestados</p>
                <p className="text-2xl font-bold text-blue-600">147</p>
                <p className="text-sm text-blue-600 mt-1">+8% vs período anterior</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Obrigações Cumpridas</p>
                <p className="text-2xl font-bold text-purple-600">98%</p>
                <p className="text-sm text-purple-600 mt-1">Excelente desempenho</p>
              </div>
              <PieChart className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Clientes Ativos</p>
                <p className="text-2xl font-bold text-orange-600">47</p>
                <p className="text-sm text-orange-600 mt-1">+3 novos clientes</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Receitas por Mês</CardTitle>
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                disabled={exportLoading === "receitas-pdf"}
                onClick={() => handleExportarGrafico('receitas', 'pdf')}
              >
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={exportLoading === "receitas-xls"}
                onClick={() => handleExportarGrafico('receitas', 'xls')}
              >
                <Download className="h-4 w-4 mr-2" />
                Excel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ReceitasMensaisChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Serviços Mais Solicitados</CardTitle>
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                disabled={exportLoading === "servicos-pdf"}
                onClick={() => handleExportarGrafico('servicos', 'pdf')}
              >
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={exportLoading === "servicos-xls"}
                onClick={() => handleExportarGrafico('servicos', 'xls')}
              >
                <Download className="h-4 w-4 mr-2" />
                Excel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ServicosPieChart />
          </CardContent>
        </Card>
      </div>

      {/* Relatórios Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="financeiros">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="financeiros">Financeiros</TabsTrigger>
              <TabsTrigger value="obrigacoes">Obrigações</TabsTrigger>
              <TabsTrigger value="clientes">Clientes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="financeiros" className="mt-6">
              <div className="space-y-4">
                {relatoriosDisponiveis.financeiros.map((relatorio) => (
                  <div key={relatorio.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{relatorio.nome}</h3>
                      <p className="text-sm text-gray-600">{relatorio.descricao}</p>
                      <p className="text-xs text-gray-500 mt-1">Período: {relatorio.periodo}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleGerarRelatorio(relatorio.id)}>
                        Gerar
                      </Button>
                      <Button size="sm" onClick={() => handleDownloadRelatorio(relatorio.id, "pdf")}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadRelatorio(relatorio.id, "xls")}>
                        <Download className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="obrigacoes" className="mt-6">
              <div className="space-y-4">
                {relatoriosDisponiveis.obrigacoes.map((relatorio) => (
                  <div key={relatorio.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{relatorio.nome}</h3>
                      <p className="text-sm text-gray-600">{relatorio.descricao}</p>
                      <p className="text-xs text-gray-500 mt-1">Período: {relatorio.periodo}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleGerarRelatorio(relatorio.id)}>
                        Gerar
                      </Button>
                      <Button size="sm" onClick={() => handleDownloadRelatorio(relatorio.id, "pdf")}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadRelatorio(relatorio.id, "xls")}>
                        <Download className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="clientes" className="mt-6">
              <div className="space-y-4">
                {relatoriosDisponiveis.clientes.map((relatorio) => (
                  <div key={relatorio.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{relatorio.nome}</h3>
                      <p className="text-sm text-gray-600">{relatorio.descricao}</p>
                      <p className="text-xs text-gray-500 mt-1">Período: {relatorio.periodo}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleGerarRelatorio(relatorio.id)}>
                        Gerar
                      </Button>
                      <Button size="sm" onClick={() => handleDownloadRelatorio(relatorio.id, "pdf")}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadRelatorio(relatorio.id, "xls")}>
                        <Download className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
