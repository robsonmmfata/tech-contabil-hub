
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmarRemoverClienteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: any | null;
  onConfirm: () => void;
}

export const ConfirmarRemoverClienteModal: React.FC<ConfirmarRemoverClienteModalProps> = ({
  open,
  onOpenChange,
  client,
  onConfirm,
}) => {
  if (!client) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Remover Cliente</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          Tem certeza que deseja remover o cliente <span className="font-semibold">{client.name}</span>?
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={() => { onConfirm(); onOpenChange(false); }}>
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
