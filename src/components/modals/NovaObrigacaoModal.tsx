
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const NovaObrigacaoModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    cliente: '',
    tipo: '',
    vencimento: '',
    valor: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova obrigação:', formData);
    toast({
      title: "Obrigação cadastrada",
      description: "Obrigação foi cadastrada com sucesso!",
    });
    setOpen(false);
    setFormData({
      cliente: '',
      tipo: '',
      vencimento: '',
      valor: ''
    });
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
                <SelectItem value="tech-solutions">Tech Solutions LTDA</SelectItem>
                <SelectItem value="joao-silva">João Silva ME</SelectItem>
                <SelectItem value="digital-agency">Digital Agency</SelectItem>
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
