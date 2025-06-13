
import React from 'react';
import { Users, FileText, Calendar, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const upcomingObligations = [
    { id: 1, client: "Tech Solutions LTDA", obligation: "DAS - Simples Nacional", dueDate: "15/06/2025", priority: "high" },
    { id: 2, client: "João Silva ME", obligation: "IRPJ - Lucro Presumido", dueDate: "20/06/2025", priority: "medium" },
    { id: 3, client: "Digital Agency", obligation: "Folha de Pagamento", dueDate: "25/06/2025", priority: "low" }
  ];

  const recentServices = [
    { id: 1, client: "Tech Solutions LTDA", service: "DAS Maio/2025", status: "concluido", date: "10/06/2025" },
    { id: 2, client: "DevCorp", service: "Folha Maio/2025", status: "processando", date: "09/06/2025" },
    { id: 3, client: "StartupXYZ", service: "IRPJ 1º Trimestre", status: "pendente", date: "08/06/2025" }
  ];

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral do seu negócio contábil</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Clientes"
          value={47}
          icon={Users}
          trend="+3 este mês"
          trendUp={true}
          color="blue"
        />
        <StatsCard
          title="Serviços Pendentes"
          value={12}
          icon={FileText}
          trend="-2 desde ontem"
          trendUp={true}
          color="yellow"
        />
        <StatsCard
          title="Obrigações Próximas"
          value={8}
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
            <Button variant="outline" size="sm">Ver Todas</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingObligations.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.client}</p>
                    <p className="text-sm text-gray-600">{item.obligation}</p>
                    <p className="text-xs text-gray-500 mt-1">Vence em: {item.dueDate}</p>
                  </div>
                  <Badge variant={getPriorityColor(item.priority)}>
                    {item.priority === 'high' ? 'Urgente' : 
                     item.priority === 'medium' ? 'Médio' : 'Baixo'}
                  </Badge>
                </div>
              ))}
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
            <Button variant="outline" size="sm">Ver Todos</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentServices.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.client}</p>
                    <p className="text-sm text-gray-600">{item.service}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status === 'concluido' ? 'Concluído' :
                     item.status === 'processando' ? 'Processando' : 'Pendente'}
                  </span>
                </div>
              ))}
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
            <Button className="h-20 flex flex-col space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span className="text-sm">Novo Cliente</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Novo Serviço</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Agendar Obrigação</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline">
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">Gerar Boleto</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
