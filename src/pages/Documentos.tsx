
import React, { useRef, useState } from 'react';
import { FileText, Upload, Download, Search, Filter, Folder, File, Eye, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/FileUpload";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useDocumentos } from "@/hooks/useDocumentos";

const Documentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const { toast } = useToast();
  const uploadInputRef = useRef<HTMLInputElement>(null);

  // Hook para pegar documentos do Supabase
  const { documentos, isLoading, erro, recarregar } = useDocumentos();

  const [modalVisualizar, setModalVisualizar] = useState<null | typeof documentos[0]>(null);
  const [modalExcluir, setModalExcluir] = useState<number | null>(null);

  const categorias = [
    { nome: "Impostos", count: documentos.filter(d => d.categoria === "Impostos").length, cor: "blue" },
    { nome: "Notas Fiscais", count: documentos.filter(d => d.categoria === "Notas Fiscais").length, cor: "green" },
    { nome: "Contratos", count: documentos.filter(d => d.categoria === "Contratos").length, cor: "purple" },
    { nome: "Folha", count: documentos.filter(d => d.categoria === "Folha").length, cor: "orange" },
    { nome: "Recibos", count: documentos.filter(d => d.categoria === "Recibos").length, cor: "pink" }
  ];

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'processado':
        return <Badge variant="default" className="bg-green-50 text-green-700 border-green-200">Processado</Badge>;
      case 'pendente':
        return <Badge variant="default" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendente</Badge>;
      case 'erro':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="default">Desconhecido</Badge>;
    }
  };

  const getTipoIcon = (tipo: string | null) => {
    switch ((tipo || '').toLowerCase()) {
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
    const matchSearch = doc.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "todas" || doc.categoria === selectedCategory;
    return matchSearch && matchCategory;
  });

  // FileUpload não salvará mais no local, apenas dará um feedback (pode expandir depois com upload real)
  const handleFileUpload = (_files: File[]) => {
    toast({
      title: "Upload simulado",
      description: `Funcionalidade de upload real em breve!`,
    });
  };

  // MODAIS E FUNÇÕES DE AÇÃO
  function handleVisualizarDocumento(documentoId: number) {
    const doc = documentos.find(d => d.id === documentoId);
    setModalVisualizar(doc || null);
  }

  function handleDownloadDocumento(documentoId: number) {
    const doc = documentos.find(d => d.id === documentoId);
    if (!doc) return;
    // simulação de download
    const blob = new Blob([""], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = doc.nome;
    link.click();
    URL.revokeObjectURL(link.href);
    toast({
      title: "Download iniciado",
      description: `Baixando "${doc.nome}"...`,
      variant: "default",
    });
  }

  function handleDeletarDocumento(documentoId: number) {
    setModalExcluir(documentoId);
  }

  function handleConfirmarExcluir() {
    toast({
      title: "Funcionalidade futura",
      description: "Em breve será possível excluir de verdade do banco.",
      variant: "destructive",
    });
    setModalExcluir(null);
    // Futuramente: integrar com supabase para deletar!
  }

  // Adicionar referência ao FileUpload e um método para acionar o input
  const fileUploadRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documentos</h1>
          <p className="text-gray-500 mt-1">Central de documentos e arquivos dos clientes</p>
        </div>
        <Button
          className="flex items-center space-x-2"
          onClick={() => {
            if (fileUploadRef.current) {
              fileUploadRef.current.click();
            } else {
              toast({ title: "Erro", description: "Área de upload não encontrada." });
            }
          }}
        >
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
            <Badge variant="default">{documentosFiltrados.length} documentos</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <div className="text-gray-400 text-center py-12">Carregando documentos...</div>}
          {erro && <div className="text-red-500 text-center py-12">{erro}</div>}
          <div className="space-y-4">
            {documentosFiltrados.map((documento) => (
              <div key={documento.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  {getTipoIcon(documento.tipo)}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{documento.nome}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">Cliente ID: {documento.cliente_id ?? "N/A"}</span>
                      <Badge variant="default" className="text-xs">
                        {documento.categoria ?? "Sem categoria"}
                      </Badge>
                      <span className="text-sm text-gray-500">{documento.tamanho}</span>
                      <span className="text-sm text-gray-500">
                        {documento.data_upload ? new Date(documento.data_upload).toLocaleDateString() : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(documento.status)}
                  <div className="flex space-x-1 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVisualizarDocumento(documento.id)}
                      aria-label="Visualizar"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadDocumento(documento.id)}
                      aria-label="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeletarDocumento(documento.id)}
                      aria-label="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {documentosFiltrados.length === 0 && !isLoading && (
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
          <FileUpload
            onFileUpload={handleFileUpload}
            // @ts-ignore
            inputRef={fileUploadRef}
          />
        </CardContent>
      </Card>

      {/* Modal Visualizar Documento */}
      <Dialog open={!!modalVisualizar} onOpenChange={() => setModalVisualizar(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Visualizar Documento
            </DialogTitle>
            <DialogDescription>
              Informações detalhadas do documento.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <div><span className="font-semibold">Nome:</span> {modalVisualizar?.nome}</div>
            <div><span className="font-semibold">Cliente:</span> {modalVisualizar?.cliente_id}</div>
            <div><span className="font-semibold">Categoria:</span> {modalVisualizar?.categoria}</div>
            <div><span className="font-semibold">Tipo:</span> {modalVisualizar?.tipo}</div>
            <div><span className="font-semibold">Tamanho:</span> {modalVisualizar?.tamanho}</div>
            <div><span className="font-semibold">Data de Upload:</span> {modalVisualizar?.data_upload ? new Date(modalVisualizar.data_upload).toLocaleDateString() : ""}</div>
            <div><span className="font-semibold">Status:</span> {modalVisualizar && getStatusBadge(modalVisualizar.status)}</div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Fechar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Confirmar Exclusão */}
      <Dialog open={!!modalExcluir} onOpenChange={() => setModalExcluir(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja excluir este documento? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalExcluir(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleConfirmarExcluir}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documentos;
