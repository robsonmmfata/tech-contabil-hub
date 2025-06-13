
import React, { useState } from 'react';
import { FileText, Upload, Download, Search, Filter, Folder, File, Eye, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Documentos = () => {
  const [selectedTab, setSelectedTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");

  const documentos = [
    {
      id: 1,
      nome: "DAS_TechSolutions_Jan2024.pdf",
      tipo: "PDF",
      categoria: "Impostos",
      cliente: "Tech Solutions Ltda",
      tamanho: "245 KB",
      dataUpload: "15/01/2024",
      status: "processado"
    },
    {
      id: 2,
      nome: "NotaFiscal_DevCorp_123.xml",
      tipo: "XML",
      categoria: "Notas Fiscais",
      cliente: "DevCorp",
      tamanho: "12 KB",
      dataUpload: "14/01/2024",
      status: "pendente"
    },
    {
      id: 3,
      nome: "Contrato_StartupXYZ.pdf",
      tipo: "PDF",
      categoria: "Contratos",
      cliente: "StartupXYZ",
      tamanho: "1.2 MB",
      dataUpload: "13/01/2024",
      status: "processado"
    },
    {
      id: 4,
      nome: "FolhaPagamento_CodeMaster_Jan.xlsx",
      tipo: "Excel",
      categoria: "Folha",
      cliente: "CodeMaster",
      tamanho: "89 KB",
      dataUpload: "12/01/2024",
      status: "processado"
    },
    {
      id: 5,
      nome: "Recibo_WebDesign_Servicos.pdf",
      tipo: "PDF",
      categoria: "Recibos",
      cliente: "WebDesign Pro",
      tamanho: "156 KB",
      dataUpload: "11/01/2024",
      status: "processado"
    }
  ];

  const categorias = [
    { nome: "Impostos", count: 15, cor: "blue" },
    { nome: "Notas Fiscais", count: 28, cor: "green" },
    { nome: "Contratos", count: 8, cor: "purple" },
    { nome: "Folha", count: 12, cor: "orange" },
    { nome: "Recibos", count: 22, cor: "pink" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processado':
        return <Badge variant="default" className="bg-green-50 text-green-700 border-green-200">Processado</Badge>;
      case 'pendente':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendente</Badge>;
      case 'erro':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'xml':
        return <File className="h-5 w-5 text-blue-500" />;
      case 'excel':
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const documentosFiltrados = documentos.filter(doc => {
    const matchSearch = doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       doc.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "todas" || doc.categoria === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documentos</h1>
          <p className="text-gray-500 mt-1">Central de documentos e arquivos dos clientes</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Upload de Documentos</span>
        </Button>
      </div>

      {/* Cards de Estatísticas de Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {categorias.map((categoria, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{categoria.nome}</p>
                  <p className="text-2xl font-bold text-gray-900">{categoria.count}</p>
                </div>
                <Folder className={`h-8 w-8 text-${categoria.cor}-600`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar documentos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as categorias</SelectItem>
                <SelectItem value="Impostos">Impostos</SelectItem>
                <SelectItem value="Notas Fiscais">Notas Fiscais</SelectItem>
                <SelectItem value="Contratos">Contratos</SelectItem>
                <SelectItem value="Folha">Folha</SelectItem>
                <SelectItem value="Recibos">Recibos</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Documentos Recentes</span>
            <Badge variant="outline">{documentosFiltrados.length} documentos</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentosFiltrados.map((documento) => (
              <div key={documento.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  {getTipoIcon(documento.tipo)}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{documento.nome}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">{documento.cliente}</span>
                      <Badge variant="outline" className="text-xs">
                        {documento.categoria}
                      </Badge>
                      <span className="text-sm text-gray-500">{documento.tamanho}</span>
                      <span className="text-sm text-gray-500">{documento.dataUpload}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(documento.status)}
                  <div className="flex space-x-1 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {documentosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum documento encontrado</p>
              <p className="text-sm text-gray-400 mt-1">Tente ajustar os filtros ou fazer upload de novos documentos</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Área de Upload (Drag & Drop) */}
      <Card>
        <CardContent className="p-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Arraste e solte seus arquivos aqui</h3>
            <p className="text-gray-500 mb-4">ou clique para selecionar arquivos</p>
            <Button variant="outline">Selecionar Arquivos</Button>
            <p className="text-xs text-gray-400 mt-4">
              Suporte para PDF, XML, Excel, Word (máx. 10MB por arquivo)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documentos;
