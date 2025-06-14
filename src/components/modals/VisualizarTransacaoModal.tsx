
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type Receita = {
  id: number;
  cliente: string;
  servico: string;
  valor: number;
  vencimento: string;
  status: string;
};

type Despesa = {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  data: string;
  status: string;
};

type VisualizarTransacaoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transacao: Receita | Despesa | null;
  tipo: "receita" | "despesa";
};

export const VisualizarTransacaoModal: React.FC<VisualizarTransacaoModalProps> = ({
  open,
  onOpenChange,
  transacao,
  tipo
}) => {
  if (!transacao) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {tipo === "receita" ? "Detalhes da Receita" : "Detalhes da Despesa"}
          </DialogTitle>
          <DialogDescription>
            Veja informações detalhadas {tipo === "receita" ? "da receita" : "da despesa"} selecionada.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          {tipo === "receita" ? (
            <>
              <div><span className="font-semibold">Cliente:</span> {(transacao as Receita).cliente}</div>
              <div><span className="font-semibold">Serviço:</span> {(transacao as Receita).servico}</div>
              <div><span className="font-semibold">Valor:</span> R$ {(transacao as Receita).valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <div><span className="font-semibold">Vencimento:</span> {(transacao as Receita).vencimento}</div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                <Badge>
                  {(transacao as Receita).status.charAt(0).toUpperCase() + (transacao as Receita).status.slice(1)}
                </Badge>
              </div>
            </>
          ) : (
            <>
              <div><span className="font-semibold">Descrição:</span> {(transacao as Despesa).descricao}</div>
              <div><span className="font-semibold">Categoria:</span> {(transacao as Despesa).categoria}</div>
              <div><span className="font-semibold">Valor:</span> R$ {(transacao as Despesa).valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <div><span className="font-semibold">Data:</span> {(transacao as Despesa).data}</div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                <Badge>
                  {(transacao as Despesa).status.charAt(0).toUpperCase() + (transacao as Despesa).status.slice(1)}
                </Badge>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
