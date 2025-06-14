import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NovoServicoModal } from "@/components/modals/NovoServicoModal";
import { VisualizarServicoModal } from "@/components/modals/VisualizarServicoModal";
import { UploadDocumentoServicoModal } from "@/components/modals/UploadDocumentoServicoModal";
import { useToast } from "@/hooks/use-toast";
import { useServicos } from "@/hooks/useServicos";
import { useClientes } from "@/hooks/useClientes";

const Servicos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [visualizarModalOpen, setVisualizarModalOpen] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState<any | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { toast } = useToast();

  // Buscar serviços do Supabase
  const { servicos, loading: isLoadingServicos, erro: erroServicos, recarregar: recarregarServicos } = useServicos();
  const { clientes } = useClientes();

  // Filtros virtuais usando estado
  const filteredServices = servicos.filter(service => {
    // Busca por cliente
    const cliente = clientes.find(c => c.id === service.cliente_id);
    const searchStr = [
      cliente?.nome?.toLowerCase() || "",
      service.description?.toLowerCase() || "",
      service.type?.toLowerCase() || ""
    ].join(" ");
    const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pendente':
        return { color: 'bg-gray-100 text-gray-800', icon: Clock, label: 'Pendente' };
      case 'processando':
        return { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle, label: 'Processando' };
      case 'concluido':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Concluído' };
      case 'atrasado':
        return { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Atrasado' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: Clock, label: 'Pendente' };
    }
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'DAS': return 'bg-blue-100 text-blue-800';
      case 'IRPJ': return 'bg-purple-100 text-purple-800';
      case 'Folha': return 'bg-green-100 text-green-800';
      case 'Obrigação Acessória': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleView = (serviceId: number) => {
    const servico = servicos.find(s => s.id === serviceId);
    setServicoSelecionado(servico);
    setVisualizarModalOpen(true);
  };

  const handleUpload = (serviceId: number) => {
    const servico = servicos.find(s => s.id === serviceId);
    setServicoSelecionado(servico);
    setUploadModalOpen(true);
  };

  const handleUploadDocumento = (file: File) => {
    // Apenas mock, mostra um toast de sucesso
    toast({
      title: "Upload realizado",
      description: `Arquivo "${file.name}" enviado para o serviço "${servicoSelecionado?.description}".`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Serviços Contábeis</h1>
          <p className="text-gray-600 mt-1">Gerencie todos os serviços prestados aos seus clientes</p>
        </div>
        <NovoServicoModal />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-700">
                {servicos.filter(s => s.status === 'pendente').length}
              </p>
              <p className="text-sm text-gray-500">Pendentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {servicos.filter(s => s.status === 'processando').length}
              </p>
              <p className="text-sm text-gray-500">Processando</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {servicos.filter(s => s.status === 'concluido').length}
              </p>
              <p className="text-sm text-gray-500">Concluídos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {servicos.filter(s => s.status === 'atrasado').length}
              </p>
              <p className="text-sm text-gray-500">Atrasados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por cliente, tipo de serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendente">Pendentes</SelectItem>
                <SelectItem value="processando">Processando</SelectItem>
                <SelectItem value="concluido">Concluídos</SelectItem>
                <SelectItem value="atrasado">Atrasados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Serviços ({filteredServices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Competência</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingServicos ? <div>Carregando...</div> : erroServicos ? <div className="text-red-500">{erroServicos}</div> : (
                filteredServices.map((service) => {
                  const statusConfig = getStatusConfig(service.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{clientes.find(c => c.id === service.cliente_id)?.nome || "Desconhecido"}</p>
                          <p className="text-xs text-gray-500">Criado em {service.created_at}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge className={getServiceTypeColor(service.type)}>
                              {service.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{service.competence}</TableCell>
                      <TableCell>
                        <span className={`text-sm ${service.status === 'atrasado' ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                          {service.due_date}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        R$ {service.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusConfig.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            <span>{statusConfig.label}</span>
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleView(service.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {service.status === 'pendente' && (
                            <Button variant="ghost" size="sm" onClick={() => handleUpload(service.id)}>
                              <Upload className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modals */}
      <VisualizarServicoModal
        open={visualizarModalOpen}
        onOpenChange={(open) => {
          setVisualizarModalOpen(open);
          if (!open) setServicoSelecionado(null);
        }}
        servico={servicoSelecionado}
      />
      <UploadDocumentoServicoModal
        open={uploadModalOpen}
        onOpenChange={(open) => {
          setUploadModalOpen(open);
          if (!open) setServicoSelecionado(null);
        }}
        servico={servicoSelecionado}
        onUpload={handleUploadDocumento}
      />
    </div>
  );
};

export default Servicos;
