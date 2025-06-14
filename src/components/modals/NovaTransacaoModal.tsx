
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useClientes } from "@/hooks/useClientes";

export const NovaTransacaoModal = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    tipo: 'receita',
    descricao: '',
    valor: '',
    categoria: '',
    data: '',
    cliente: ''
  });
  const { toast } = useToast();
  const { clientes } = useClientes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let cliente_id: number | null = null;
    if (formData.tipo === "receita") {
      const selectedCliente = clientes.find(c =>
        String(c.id) === formData.cliente ||
        c.nome === formData.cliente
      );
      cliente_id = selectedCliente ? selectedCliente.id : null;
    }

    const transacaoInsert = {
      tipo: formData.tipo,
      descricao: formData.descricao,
      valor: formData.valor ? Number(formData.valor) : null,
      categoria: formData.categoria,
      data: formData.data,
      cliente_id: formData.tipo === "receita" ? cliente_id : null,
      status: 'pendente'
    };
    const { error } = await supabase.from('transacoes_financeiras').insert([transacaoInsert]);
    if (error) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    toast({
      title: "Transação cadastrada",
      description: "Transação foi cadastrada com sucesso!",
    });
    window.dispatchEvent(new CustomEvent("transacoes:recarregar"));
    setOpen(false);
    setFormData({
      tipo: 'receita',
      descricao: '',
      valor: '',
      categoria: '',
      data: '',
      cliente: ''
    });
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-20 flex flex-col space-y-2">
          <DollarSign className="h-6 w-6" />
          <span className="text-sm">Nova Transação</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Transação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tipo">Tipo</Label>
            <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="receita">Receita</SelectItem>
                <SelectItem value="despesa">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              placeholder="Descrição da transação..."
              required
            />
          </div>
          <div>
            <Label htmlFor="valor">Valor</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              value={formData.valor}
              onChange={(e) => setFormData({...formData, valor: e.target.value})}
              placeholder="0,00"
              required
            />
          </div>
          {formData.tipo === 'receita' && (
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Select value={formData.cliente} onValueChange={(value) => setFormData({...formData, cliente: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map(c => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <Label htmlFor="categoria">Categoria</Label>
            <Select value={formData.categoria} onValueChange={(value) => setFormData({...formData, categoria: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {formData.tipo === 'receita' ? (
                  <>
                    <SelectItem value="servicos-contabeis">Serviços Contábeis</SelectItem>
                    <SelectItem value="consultoria">Consultoria</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="certificacoes">Certificações</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="data">Data</Label>
            <Input
              id="data"
              type="date"
              value={formData.data}
              onChange={(e) => setFormData({...formData, data: e.target.value})}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
