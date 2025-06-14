
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useClientes } from "@/hooks/useClientes";

export const NovoServicoModal = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    client: '',
    type: '',
    description: '',
    competence: '',
    dueDate: '',
    value: ''
  });
  const { toast } = useToast();
  const { clientes } = useClientes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Localiza o cliente pelo ID
    const selectedCliente = clientes.find(c =>
      String(c.id) === formData.client ||
      c.nome === formData.client // fallback para antigos valores mockados
    );
    const cliente_id = selectedCliente ? selectedCliente.id : null;

    const servicoInsert = {
      cliente_id,
      type: formData.type,
      description: formData.description,
      competence: formData.competence,
      due_date: formData.dueDate,
      value: formData.value ? Number(formData.value) : null,
      status: "pendente"
    };
    const { error } = await supabase.from('servicos').insert([servicoInsert]);
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
      title: "Serviço cadastrado",
      description: "Serviço foi cadastrado com sucesso!",
    });
    // Atualizar telas conectadas (exemplo: Serviços)
    window.dispatchEvent(new CustomEvent("servicos:recarregar"));
    setOpen(false);
    setFormData({
      client: '',
      type: '',
      description: '',
      competence: '',
      dueDate: '',
      value: ''
    });
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Serviço</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Serviço</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="client">Cliente</Label>
            <Select value={formData.client} onValueChange={(value) => setFormData({...formData, client: value})}>
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
            <Label htmlFor="type">Tipo de Serviço</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAS">DAS</SelectItem>
                <SelectItem value="IRPJ">IRPJ</SelectItem>
                <SelectItem value="Folha">Folha de Pagamento</SelectItem>
                <SelectItem value="Obrigação Acessória">Obrigação Acessória</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Descrição do serviço..."
              required
            />
          </div>
          <div>
            <Label htmlFor="competence">Competência</Label>
            <Input
              id="competence"
              value={formData.competence}
              onChange={(e) => setFormData({...formData, competence: e.target.value})}
              placeholder="Ex: 06/2025"
              required
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Data de Vencimento</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="value">Valor</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              value={formData.value}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
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
