
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Obrigacao {
  id: number;
  cliente: string;
  tipo: string;
  vencimento: string;
  status: string;
  valor: string;
}

interface VisualizarObrigacaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  obrigacao: Obrigacao | null;
}

export const VisualizarObrigacaoModal: React.FC<VisualizarObrigacaoModalProps> = ({
  open, onOpenChange, obrigacao
}) => {
  if (!obrigacao) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalhes da Obrigação</DialogTitle>
          <DialogDescription>
            Informações detalhadas da obrigação fiscal
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <div><span className="font-semibold">Cliente:</span> {obrigacao.cliente}</div>
          <div><span className="font-semibold">Tipo:</span> {obrigacao.tipo}</div>
          <div><span className="font-semibold">Vencimento:</span> {obrigacao.vencimento}</div>
          <div><span className="font-semibold">Valor:</span> {obrigacao.valor}</div>
          <div><span className="font-semibold">Status:</span> <Badge>{obrigacao.status}</Badge></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
