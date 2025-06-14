
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface VisualizarServicoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  servico: any | null;
}

export const VisualizarServicoModal: React.FC<VisualizarServicoModalProps> = ({
  open, onOpenChange, servico
}) => {
  if (!servico) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Serviço</DialogTitle>
          <DialogDescription>
            Informações detalhadas do serviço
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <div><span className="font-semibold">Cliente:</span> {servico.client}</div>
          <div><span className="font-semibold">Tipo:</span> {servico.type}</div>
          <div><span className="font-semibold">Descrição:</span> {servico.description}</div>
          <div><span className="font-semibold">Competência:</span> {servico.competence}</div>
          <div><span className="font-semibold">Vencimento:</span> {servico.dueDate}</div>
          <div><span className="font-semibold">Valor:</span> R$ {servico.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          <div><span className="font-semibold">Status:</span> {servico.status}</div>
          <div><span className="font-semibold">Criado em:</span> {servico.createdAt}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
};
