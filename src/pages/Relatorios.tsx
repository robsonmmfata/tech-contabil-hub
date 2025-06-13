
import React, { useState } from 'react';
import { BarChart3, FileText, Download, Calendar, Filter, TrendingUp, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Relatorios = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("mes-atual");
  const [selectedTab, setSelectedTab] = useState("financeiros");

  const relatoriosFinanceiros = [
    {
      nome: "Receitas por Cliente",
      descricao: "Análise detalhada das receitas geradas por cada cliente",
      tipo: "Financeiro",
      periodo: "Mensal",
      ultimaAtualizacao: "01/01/2024"
    },
    {
      nome: "Fluxo de Caixa",
      descricao: "Relatório completo de entradas e saídas do período",
      tipo: "Financeiro",
      periodo: "Mensal",
      ultimaAtualizacao: "01/01/2024"
    },
    {
      nome: "Margem de Lucro por Serviço",
      descricao: "Análise da rentabilidade de cada tipo de serviço oferecido",
      tipo: "Financeiro",
      periodo: "Trimestral",
      ultimaAtualizacao: "01/01/2024"
    }
  ];

  const relatoriosObrigacoes = [
    {
      nome: "Obrigações Cumpridas",
      descricao: "Relatório de todas as obrigações fiscais cumpridas no período",
      tipo: "Fiscal",
      periodo: "Mensal",
      ultimaAtualizacao: "01/01/2024"
    },
    {
      nome: "Prazos em Atraso",
      descricao: "Listagem de obrigações que venceram e não foram cumpridas",
      tipo: "Fiscal",
      periodo: "Semanal",
      ultimaAtualizacao: "01/01/2024"
    },
    {
      nome: "Calendário Fiscal",
      descricao: "Cronograma completo de obrigações por cliente e período",
      tipo: "Fiscal",
      periodo: "Anual",
      ultimaAtualizacao: "01/01/2024"
    }
  ];

  const relatoriosClientes = [
    {
      nome: "Portfólio de Clientes",
      descricao: "Relatório completo com informações de todos os clientes ativos",
      tipo: "Gestão",
      periodo: "Mensal",
      ultimaAtualizacao: "01/01/2024"
    },
    {
      nome: "Serviços por Cliente",
      descricao: "Detalhamento dos serviços contratados por cada cliente",
      tipo: "Gestão",
      periodo: "Mensal",
      ultimaAtualizacao: "01/01/2024"
    },
    {
      nome: "Histórico de Relacionamento",
      descricao: "Timeline de interações e serviços prestados",
      tipo: "Gestão",
      periodo: "Semestral",
      ultimaAtualizacao: "01/01/2024"
    }
  ];

  const estatisticasRapidas = {
    totalClientes: 15,
    servicosRealizados: 48,
    receitaMensal: 25850.00,
    obrigacoesPendentes: 7
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-500 mt-1">Análises e relatórios gerenciais do seu escritório</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes-atual">Mês Atual</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="semestre">Semestre</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total de Clientes</p>
                <p className="text-2xl font-bold text-blue-600">{estatisticasRapidas.totalClientes}</p>
                <p className="text-sm text-green-600 mt-1">+3 este mês</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Serviços Realizados</p>
                <p className="text-2xl font-bold text-green-600">{estatisticasRapidas.servicosRealizados}</p>
                <p className="text-sm text-green-600 mt-1">+15% vs mês anterior</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Receita Mensal</p>
                <p className="text-2xl font-bold text-purple-600">
                  R$ {estatisticasRapidas.receitaMensal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </p>
                <p className="text-sm text-green-600 mt-1">+8% vs mês anterior</p>
              </div>
              <PieChart className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Obrigações Pendentes</p>
                <p className="text-2xl font-bold text-orange-600">{estatisticasRapidas.obrigacoesPendentes}</p>
                <p className="text-sm text-red-600 mt-1">2 em atraso</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos (Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Receitas por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Gráfico de receitas mensais</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Serviços Mais Solicitados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Gráfico de distribuição de serviços</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="financeiros">Financeiros</TabsTrigger>
              <TabsTrigger value="obrigacoes">Obrigações</TabsTrigger>
              <TabsTrigger value="clientes">Clientes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="financeiros" className="mt-6">
              <div className="grid gap-4">
                {relatoriosFinanceiros.map((relatorio, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{relatorio.nome}</h3>
                      <p className="text-sm text-gray-600 mt-1">{relatorio.descricao}</p>
                      <div className="flex space-x-4 mt-2">
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{relatorio.tipo}</span>
                        <span className="text-xs text-gray-600">Atualizado: {relatorio.ultimaAtualizacao}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>Exportar</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="obrigacoes" className="mt-6">
              <div className="grid gap-4">
                {relatoriosObrigacoes.map((relatorio, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{relatorio.nome}</h3>
                      <p className="text-sm text-gray-600 mt-1">{relatorio.descricao}</p>
                      <div className="flex space-x-4 mt-2">
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">{relatorio.tipo}</span>
                        <span className="text-xs text-gray-600">Atualizado: {relatorio.ultimaAtualizacao}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>Exportar</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="clientes" className="mt-6">
              <div className="grid gap-4">
                {relatoriosClientes.map((relatorio, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{relatorio.nome}</h3>
                      <p className="text-sm text-gray-600 mt-1">{relatorio.descricao}</p>
                      <div className="flex space-x-4 mt-2">
                        <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">{relatorio.tipo}</span>
                        <span className="text-xs text-gray-600">Atualizado: {relatorio.ultimaAtualizacao}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>Exportar</span>
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
