
import React, { useState } from 'react';
import { BarChart3, PieChart, FileText, Download, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReceitasMensaisChart } from "@/components/charts/ReceitasMensaisChart";
import { ServicosPieChart } from "@/components/charts/ServicosPieChart";
import { useToast } from "@/hooks/use-toast";

const Relatorios = () => {
  const [periodo, setPeriodo] = useState("2024");
  const { toast } = useToast();

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

  const handleGerarRelatorio = (relatorioId: number) => {
    toast({
      title: "Gerando relatório",
      description: `Relatório ID ${relatorioId} está sendo gerado...`,
    });
  };

  const handleDownloadRelatorio = (relatorioId: number) => {
    toast({
      title: "Download iniciado",
      description: `Baixando relatório ID ${relatorioId}`,
    });
  };

  const handleExportarGrafico = (tipo: string) => {
    toast({
      title: "Exportando gráfico",
      description: `Gráfico ${tipo} está sendo exportado...`,
    });
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
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Período Personalizado</span>
          </Button>
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
            <Button variant="outline" size="sm" onClick={() => handleExportarGrafico('receitas')}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <ReceitasMensaisChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Serviços Mais Solicitados</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleExportarGrafico('servicos')}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
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
                      <Button size="sm" onClick={() => handleDownloadRelatorio(relatorio.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
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
                      <Button size="sm" onClick={() => handleDownloadRelatorio(relatorio.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
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
                      <Button size="sm" onClick={() => handleDownloadRelatorio(relatorio.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
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
