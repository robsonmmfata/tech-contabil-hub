
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface VisualizarClienteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: any | null;
}

export const VisualizarClienteModal: React.FC<VisualizarClienteModalProps> = ({ open, onOpenChange, client }) => {
  if (!client) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader>
          <DialogTitle>Dados do Cliente</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-[15px]">
          <div><span className="font-semibold">Nome: </span>{client.name}</div>
          <div><span className="font-semibold">Tipo: </span>{client.type === "empresa" ? "Empresa" : "Autônomo"}</div>
          <div><span className="font-semibold">Documento: </span>{client.document}</div>
          <div><span className="font-semibold">Regime: </span><Badge>{client.regime}</Badge></div>
          <div><span className="font-semibold">E-mail: </span>{client.contact}</div>
          <div><span className="font-semibold">Telefone: </span>{client.phone}</div>
          <div>
            <span className="font-semibold">Status: </span>
            <span className={client.status === 'ativo' ? "text-green-700" : "text-red-700"}>{client.status === "ativo" ? "Ativo" : "Inativo"}</span>
          </div>
          <div>
            <span className="font-semibold">CNAEs: </span>
            {client.cnaes?.length ? client.cnaes.join(", ") : "-"}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
