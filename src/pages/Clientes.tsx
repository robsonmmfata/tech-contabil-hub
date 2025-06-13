
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Building, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 1,
      name: "Tech Solutions LTDA",
      type: "empresa",
      document: "12.345.678/0001-90",
      regime: "Simples Nacional",
      contact: "contato@techsolutions.com",
      phone: "(11) 99999-9999",
      status: "ativo",
      cnaes: ["6201-5/00", "6204-0/00"]
    },
    {
      id: 2,
      name: "João Silva",
      type: "autonomo",
      document: "123.456.789-00",
      regime: "MEI",
      contact: "joao@email.com",
      phone: "(11) 88888-8888",
      status: "ativo",
      cnaes: ["6201-5/00"]
    },
    {
      id: 3,
      name: "Digital Agency Corp",
      type: "empresa",
      document: "98.765.432/0001-10",
      regime: "Lucro Presumido",
      contact: "financeiro@digitalagency.com",
      phone: "(11) 77777-7777",
      status: "inativo",
      cnaes: ["7311-4/00", "6201-5/00"]
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.includes(searchTerm) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getTypeIcon = (type: string) => {
    return type === 'empresa' ? Building : User;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">Gerencie seus clientes e suas informações fiscais</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Cliente</span>
        </Button>
      </div>

      {/* Filters */}
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

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
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
                const TypeIcon = getTypeIcon(client.type);
                return (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <TypeIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{client.name}</p>
                          <p className="text-sm text-gray-500">
                            {client.type === 'empresa' ? 'Empresa' : 'Autônomo'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{client.document}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{client.regime}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{client.contact}</p>
                        <p className="text-xs text-gray-500">{client.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clientes;
