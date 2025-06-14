
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditarClienteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: any | null;
  onSave: (data: any) => void;
}

export const EditarClienteModal: React.FC<EditarClienteModalProps> = ({ open, onOpenChange, client, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'empresa',
    document: '',
    regime: '',
    contact: '',
    phone: ''
  });

  useEffect(() => {
    if (open && client) {
      setFormData({
        name: client.name || '',
        type: client.type || 'empresa',
        document: client.document || '',
        regime: client.regime || '',
        contact: client.contact || '',
        phone: client.phone || '',
      });
    }
  }, [open, client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Nome/Razão Social</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
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
              onChange={(e) => setFormData({ ...formData, document: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="regime">Regime Tributário</Label>
            <Select value={formData.regime} onValueChange={(value) => setFormData({ ...formData, regime: value })}>
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
              value={formData.contact}
              type="email"
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input 
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
