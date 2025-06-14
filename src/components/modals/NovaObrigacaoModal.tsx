
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useClientes } from "@/hooks/useClientes";

export const NovaObrigacaoModal = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cliente: '',
    tipo: '',
    vencimento: '',
    valor: ''
  });
  const { toast } = useToast();
  const { clientes } = useClientes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Localiza o cliente pelo ID
    const selectedCliente = clientes.find(c =>
      String(c.id) === formData.cliente ||
      c.nome === formData.cliente // fallback para antigos valores mockados
    );
    const cliente_id = selectedCliente ? selectedCliente.id : null;

    const obrigacaoInsert = {
      cliente_id,
      tipo: formData.tipo,
      valor: formData.valor ? Number(formData.valor) : null,
      vencimento: formData.vencimento,
      status: 'pendente'
    };
    const { error } = await supabase.from('obrigacoes').insert([obrigacaoInsert]);
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
      title: "Obrigação cadastrada",
      description: "Obrigação foi cadastrada com sucesso!",
    });
    window.dispatchEvent(new CustomEvent("obrigacoes:recarregar"));
    setOpen(false);
    setFormData({
      cliente: '',
      tipo: '',
      vencimento: '',
      valor: ''
    });
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nova Obrigação</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Obrigação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <Label htmlFor="tipo">Tipo de Obrigação</Label>
            <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAS">DAS</SelectItem>
                <SelectItem value="IRPJ">IRPJ</SelectItem>
                <SelectItem value="ICMS">ICMS</SelectItem>
                <SelectItem value="Folha de Pagamento">Folha de Pagamento</SelectItem>
                <SelectItem value="DEFIS">DEFIS</SelectItem>
                <SelectItem value="DIPJ">DIPJ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="vencimento">Data de Vencimento</Label>
            <Input
              id="vencimento"
              type="date"
              value={formData.vencimento}
              onChange={(e) => setFormData({...formData, vencimento: e.target.value})}
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
