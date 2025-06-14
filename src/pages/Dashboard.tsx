import React from 'react';
import { Users, FileText, Calendar, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NovoClienteModal } from "@/components/modals/NovoClienteModal";
import { NovoServicoModal } from "@/components/modals/NovoServicoModal";
import { NovaObrigacaoModal } from "@/components/modals/NovaObrigacaoModal";
import { NovaTransacaoModal } from "@/components/modals/NovaTransacaoModal";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useClientes } from "@/hooks/useClientes";
import { useServicos } from "@/hooks/useServicos";
import { useObrigacoes } from "@/hooks/useObrigacoes";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { clientes, isLoading: loadingClientes } = useClientes();
  const { servicos, loading: loadingServicos } = useServicos();
  const { obrigacoes, loading: loadingObrigacoes } = useObrigacoes();

  // Cards Stats
  const totalClientes = clientes.length;
  // Serviço pendente = status !== 'concluido'
  const servicosPendentes = servicos.filter(s => s.status !== 'concluido').length;
  // Obrigações próximas: próximos 7 dias e pendente ou atrasado
  const hoje = new Date();
  const addDays = (date: Date, days: number) => {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
  };
  const proximaSemana = addDays(hoje, 7);

  const obrigacoesProximas = obrigacoes
    .filter(
      (o) => {
        if (!o.vencimento) return false;
        const venc = new Date(o.vencimento);
        return (
          venc >= hoje &&
          venc <= proximaSemana &&
          (o.status === "pendente" || o.status === "atrasado")
        );
      }
    )
    .map((o) => ({
      ...o,
      // Determinar prioridade pelo número de dias até vencer
      diasRestantes: Math.ceil(
        (new Date(o.vencimento).getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
      ),
      priority:
        (o.status === "atrasado") ? "high"
        : (new Date(o.vencimento).getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24) <= 3 ? "high"
        : (new Date(o.vencimento).getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24) <= 7 ? "medium"
        : "low",
    }));

  // Recentes Serviços
  const recentServices = servicos
    .sort((a, b) => {
      if (!a.created_at || !b.created_at) return 0;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    .slice(0, 3)
    .map((s) => ({
      id: s.id,
      client: clientes.find(c => c.id === s.cliente_id)?.nome || "Cliente não encontrado",
      service: s.type + (s.competence ? ` ${s.competence}` : ""),
      status: s.status,
      date: s.created_at ? new Date(s.created_at).toLocaleDateString('pt-BR') : "",
    }));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'processando': return 'bg-yellow-100 text-yellow-800';
      case 'pendente': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGerarBoleto = () => {
    toast({
      title: "Boleto gerado",
      description: "Boleto foi gerado com sucesso!",
    });
  };

  // Cards de stats ajustados
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral do seu negócio contábil</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Clientes"
          value={loadingClientes ? "..." : totalClientes}
          icon={Users}
          trendUp={true}
          color="blue"
        />
        <StatsCard
          title="Serviços Pendentes"
          value={loadingServicos ? "..." : servicosPendentes}
          icon={FileText}
          trendUp={true}
          color="yellow"
        />
        <StatsCard
          title="Obrigações Próximas"
          value={loadingObrigacoes ? "..." : obrigacoesProximas.length}
          icon={Calendar}
          trend="Próximos 7 dias"
          color="red"
        />
        <StatsCard
          title="Receita Mensal"
          value="R$ 28.400"
          icon={DollarSign}
          trend="+12% vs mês anterior"
          trendUp={true}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Obligations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Obrigações Próximas</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/obrigacoes')}>
              Ver Todas
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(loadingObrigacoes || loadingClientes) ? (
                <div>Carregando...</div>
              ) : obrigacoesProximas.length === 0 ? (
                <div className="text-gray-500 text-sm">Nenhuma obrigação nas próximas semanas.</div>
              ) : (
                obrigacoesProximas.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {clientes.find(c => c.id === item.cliente_id)?.nome || "Cliente não encontrado"}
                      </p>
                      <p className="text-sm text-gray-600">{item.tipo}</p>
                      <p className="text-xs text-gray-500 mt-1">Vence em: {new Date(item.vencimento).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <Badge variant={getPriorityColor(item.priority)}>
                      {item.priority === 'high' ? 'Urgente' : 
                        item.priority === 'medium' ? 'Médio' : 'Baixo'}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Services */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Serviços Recentes</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/servicos')}>
              Ver Todos
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loadingServicos || loadingClientes ? (
                <div>Carregando...</div>
              ) : recentServices.length === 0 ? (
                <div className="text-gray-500 text-sm">Nenhum serviço recente.</div>
              ) : (
                recentServices.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.client}</p>
                      <p className="text-sm text-gray-600">{item.service}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status === 'concluido' ? 'Concluído' :
                        item.status === 'processando' ? 'Processando' : item.status === 'pendente' ? 'Pendente' : item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <NovoClienteModal />
            <NovoServicoModal />
            <NovaObrigacaoModal />
            <NovaTransacaoModal />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
