
import React, { useState, useMemo } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NovaObrigacaoModal } from "@/components/modals/NovaObrigacaoModal";
import { VisualizarObrigacaoModal } from "@/components/modals/VisualizarObrigacaoModal";
import { ConfirmarConcluirObrigacaoModal } from "@/components/modals/ConfirmarConcluirObrigacaoModal";
import { useToast } from "@/hooks/use-toast";
import { useObrigacoes } from "@/hooks/useObrigacoes";
import { useClientes } from "@/hooks/useClientes";

const Obrigacoes = () => {
  const { toast } = useToast();
  const { obrigacoes, isLoading: loadingObrigacoes, erro } = useObrigacoes();
  const { clientes, isLoading: loadingClientes } = useClientes();

  const [selectedTab, setSelectedTab] = useState("pendentes");
  const [modalVisualizarOpen, setModalVisualizarOpen] = useState(false);
  const [obrigacaoSelecionada, setObrigacaoSelecionada] = useState<any | null>(null);
  const [modalConcluirOpen, setModalConcluirOpen] = useState(false);

  // Separar obrigações por status
  const obrPend = useMemo(
    () => obrigacoes.filter(o => o.status === "pendente" || o.status === "atrasado"),
    [obrigacoes]
  );
  const obrConc = useMemo(
    () => obrigacoes.filter(o => o.status === "concluido"),
    [obrigacoes]
  );

  // Para alertas: considerar obrigações com data próxima ao vencimento e pendentes/atrasadas (próximos 14 dias)
  const alertasProximos = useMemo(() => {
    const hoje = new Date();
    return obrPend
      .filter(o => {
        const venc = new Date(o.vencimento);
        const diffDias = (venc.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24);
        return diffDias <= 14 && diffDias >= 0;
      })
      .map(o => {
        const cliente = clientes.find(c => c.id === o.cliente_id);
        const diffDias = Math.ceil((new Date(o.vencimento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return {
          cliente: cliente ? cliente.nome : "Cliente não encontrado",
          obrigacao: o.tipo,
          dias: diffDias,
        }
      });
  }, [obrPend, clientes]);

  // Resumos
  const totalPendentes = obrPend.length;
  const totalAtrasadas = obrPend.filter(o => o.status === "atrasado").length;
  const totalConcluidas = obrConc.length;
  const totalEsteMes = useMemo(() => {
    const mesAtual = new Date().getMonth();
    return obrigacoes.filter(o => new Date(o.vencimento).getMonth() === mesAtual).length;
  }, [obrigacoes]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendente</Badge>;
      case 'atrasado':
        return <Badge variant="destructive">Atrasado</Badge>;
      case 'concluido':
        return <Badge variant="default" className="bg-green-50 text-green-700 border-green-200">Concluído</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const handleConcluir = (obrigacaoId: number) => {
    const obrigacao = obrPend.find((o) => o.id === obrigacaoId);
    setObrigacaoSelecionada(obrigacao || null);
    setModalConcluirOpen(true);
  };

  const handleConfirmarConcluir = () => {
    toast({
      title: "Obrigação concluída (mock)",
      description: "Funcionalidade de conclusão ainda não implementada para atualizar status no banco.",
    });
    setModalConcluirOpen(false);
    setObrigacaoSelecionada(null);
  };

  const handleVisualizarDocumento = (obrigacaoId: number) => {
    const obrigacao = obrigacoes.find((o) => o.id === obrigacaoId);
    if (!obrigacao) return;
    const cliente = clientes.find(c => c.id === obrigacao.cliente_id);
    setObrigacaoSelecionada({
      id: obrigacao.id,
      cliente: cliente ? cliente.nome : "Cliente não encontrado",
      tipo: obrigacao.tipo,
      vencimento: new Date(obrigacao.vencimento).toLocaleDateString("pt-BR"),
      status: obrigacao.status,
      valor: obrigacao.valor ? `R$ ${Number(obrigacao.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "—"
    });
    setModalVisualizarOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Obrigações Fiscais</h1>
          <p className="text-gray-500 mt-1">Gerencie prazos e obrigações dos seus clientes</p>
        </div>
        <NovaObrigacaoModal />
      </div>
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{loadingObrigacoes ? "..." : totalPendentes}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Atrasadas</p>
                <p className="text-2xl font-bold text-red-600">{loadingObrigacoes ? "..." : totalAtrasadas}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Concluídas</p>
                <p className="text-2xl font-bold text-green-600">{loadingObrigacoes ? "..." : totalConcluidas}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Este Mês</p>
                <p className="text-2xl font-bold text-blue-600">{loadingObrigacoes ? "..." : totalEsteMes}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Alertas de Prazos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Alertas de Prazos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertasProximos.length === 0 ? (
              <div className="text-gray-500">Sem alertas de obrigações para os próximos 14 dias.</div>
            ) : (
              alertasProximos.map((alerta, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <p className="font-medium text-gray-900">{alerta.cliente}</p>
                    <p className="text-sm text-gray-600">{alerta.obrigacao}</p>
                  </div>
                  <Badge variant="outline" className="bg-orange-100 text-orange-700">
                    {alerta.dias} dias
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      {/* Tabelas de Obrigações */}
      <Card>
        <CardHeader>
          <CardTitle>Controle de Obrigações</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
              <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
            </TabsList>
            <TabsContent value="pendentes" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingObrigacoes || loadingClientes ? (
                    <TableRow>
                      <TableCell colSpan={6}>Carregando...</TableCell>
                    </TableRow>
                  ) : obrPend.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-gray-500 text-center">
                        Nenhuma obrigação pendente encontrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    obrPend.map((obrigacao) => {
                      const cliente = clientes.find(c => c.id === obrigacao.cliente_id);
                      return (
                        <TableRow key={obrigacao.id}>
                          <TableCell className="font-medium">{cliente ? cliente.nome : 'Cliente não encontrado'}</TableCell>
                          <TableCell>{obrigacao.tipo}</TableCell>
                          <TableCell>{new Date(obrigacao.vencimento).toLocaleDateString("pt-BR")}</TableCell>
                          <TableCell>
                            {obrigacao.valor ? `R$ ${Number(obrigacao.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "—"}
                          </TableCell>
                          <TableCell>{getStatusBadge(obrigacao.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleVisualizarDocumento(obrigacao.id)}>
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button size="sm" onClick={() => handleConcluir(obrigacao.id)}>
                                Concluir
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="concluidas" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingObrigacoes || loadingClientes ? (
                    <TableRow>
                      <TableCell colSpan={5}>Carregando...</TableCell>
                    </TableRow>
                  ) : obrConc.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-gray-500 text-center">
                        Nenhuma obrigação concluída encontrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    obrConc.map((obrigacao) => {
                      const cliente = clientes.find(c => c.id === obrigacao.cliente_id);
                      return (
                        <TableRow key={obrigacao.id}>
                          <TableCell className="font-medium">{cliente ? cliente.nome : 'Cliente não encontrado'}</TableCell>
                          <TableCell>{obrigacao.tipo}</TableCell>
                          <TableCell>{new Date(obrigacao.vencimento).toLocaleDateString("pt-BR")}</TableCell>
                          <TableCell>
                            {obrigacao.valor ? `R$ ${Number(obrigacao.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "—"}
                          </TableCell>
                          <TableCell>{getStatusBadge(obrigacao.status)}</TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <VisualizarObrigacaoModal
        open={modalVisualizarOpen}
        onOpenChange={setModalVisualizarOpen}
        obrigacao={obrigacaoSelecionada}
      />
      <ConfirmarConcluirObrigacaoModal
        open={modalConcluirOpen}
        onOpenChange={setModalConcluirOpen}
        onConfirm={handleConfirmarConcluir}
      />
    </div>
  );
};

export default Obrigacoes;

