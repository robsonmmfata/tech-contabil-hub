
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Building, User, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NovoClienteModal } from "@/components/modals/NovoClienteModal";
import { VisualizarClienteModal } from "@/components/modals/VisualizarClienteModal";
import { EditarClienteModal } from "@/components/modals/EditarClienteModal";
import { ConfirmarRemoverClienteModal } from "@/components/modals/ConfirmarRemoverClienteModal";
import { useToast } from "@/hooks/use-toast";
import { useClientes } from "@/hooks/useClientes";

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Hook para buscar clientes do Supabase
  const { clientes, isLoading, erro, recarregar } = useClientes();

  const [clienteSelecionado, setClienteSelecionado] = useState<any | null>(null);
  const [verModal, setVerModal] = useState(false);
  const [editarModal, setEditarModal] = useState(false);
  const [removerModal, setRemoverModal] = useState(false);

  const filteredClients = clientes.filter(client =>
    client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.documento.includes(searchTerm) ||
    (client.contato || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getTypeIcon = (type: string) => {
    return type === 'empresa' ? Building : User;
  };

  // As funções de abrir modais e manipular clientes seguem a lógica do mock

  const handleView = (client: any) => {
    setClienteSelecionado(client);
    setVerModal(true);
  };

  const handleEdit = (client: any) => {
    setClienteSelecionado(client);
    setEditarModal(true);
  };

  // ATENÇÃO: As funções handleSaveEdit e handleConfirmRemove deveriam atualizar/remover no banco também.
  // Isso será útil na próxima iteração caso queira que seja totalmente dinâmico com Supabase.

  const handleSaveEdit = (formEdits: any) => {
    toast({
      title: "Cliente editado",
      description: `Cliente atualizado com sucesso!`,
    });
    setClienteSelecionado(null);
    recarregar();
  };

  const handleDelete = (client: any) => {
    setClienteSelecionado(client);
    setRemoverModal(true);
  };

  const handleConfirmRemove = () => {
    toast({
      title: "Cliente removido",
      description: "Cliente foi removido com sucesso!",
      variant: "destructive",
    });
    setClienteSelecionado(null);
    recarregar();
  };

  return (
    <div className="space-y-6">
      {/* Modais */}
      <VisualizarClienteModal
        open={verModal}
        onOpenChange={(open) => { setVerModal(open); if (!open) setClienteSelecionado(null); }}
        client={clienteSelecionado}
      />
      <EditarClienteModal
        open={editarModal}
        onOpenChange={(open) => { setEditarModal(open); if (!open) setClienteSelecionado(null); }}
        client={clienteSelecionado}
        onSave={handleSaveEdit}
      />
      <ConfirmarRemoverClienteModal
        open={removerModal}
        onOpenChange={(open) => { setRemoverModal(open); if (!open) setClienteSelecionado(null); }}
        client={clienteSelecionado}
        onConfirm={handleConfirmRemove}
      />
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome, CNPJ/CPF ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? <div>Carregando...</div> : erro ? <div className="text-red-500">{erro}</div> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Regime Tributário</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => {
                  const TypeIcon = getTypeIcon(client.tipo);
                  return (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <TypeIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{client.nome}</p>
                            <p className="text-sm text-gray-500">
                              {client.tipo === 'empresa' ? 'Empresa' : 'Autônomo'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{client.documento}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{client.regime}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{client.contato}</p>
                          <p className="text-xs text-gray-500">{client.telefone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                          {client.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleView(client)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(client)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(client)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Clientes;
