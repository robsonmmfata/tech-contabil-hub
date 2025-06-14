
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const NovoClienteModal = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'empresa',
    document: '',
    regime: '',
    contact: '',
    phone: ''
  });
  const { toast } = useToast();

  // Função para inserir cliente no Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mapeia os campos do form para os campos do banco.
    const clienteInsert = {
      nome: formData.name,
      tipo: formData.type,
      documento: formData.document,
      regime: formData.regime || null,
      contato: formData.contact,
      telefone: formData.phone,
      email: formData.contact, // se desejar usar contact para email
      status: 'ativo'
    };
    const { error } = await supabase.from('clientes').insert([clienteInsert]);
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
      title: "Cliente cadastrado",
      description: "Cliente foi cadastrado com sucesso!",
    });
    // Dispara evento para atualização das telas conectadas (como Clientes)
    window.dispatchEvent(new CustomEvent("clientes:recarregar"));

    setOpen(false);
    setFormData({
      name: '',
      type: 'empresa',
      document: '',
      regime: '',
      contact: '',
      phone: ''
    });
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Cliente</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome/Razão Social</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="empresa">Empresa</SelectItem>
                <SelectItem value="autonomo">Autônomo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="document">CNPJ/CPF</Label>
            <Input
              id="document"
              value={formData.document}
              onChange={(e) => setFormData({...formData, document: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="regime">Regime Tributário</Label>
            <Select value={formData.regime} onValueChange={(value) => setFormData({...formData, regime: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Simples Nacional">Simples Nacional</SelectItem>
                <SelectItem value="Lucro Presumido">Lucro Presumido</SelectItem>
                <SelectItem value="Lucro Real">Lucro Real</SelectItem>
                <SelectItem value="MEI">MEI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="contact">E-mail</Label>
            <Input
              id="contact"
              type="email"
              value={formData.contact}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
