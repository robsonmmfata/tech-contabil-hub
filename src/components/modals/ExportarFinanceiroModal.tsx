
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type ExportarFinanceiroModalProps = {
  open: boolean;
  onClose: () => void;
  onExport: (type: "pdf" | "xls") => void;
};

export const ExportarFinanceiroModal = ({ open, onClose, onExport }: ExportarFinanceiroModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Exportar Dados Financeiros</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 py-2">
        <Button className="flex items-center gap-2" onClick={() => onExport("pdf")}>
          <Download className="h-4 w-4" /> Exportar como PDF
        </Button>
        <Button className="flex items-center gap-2" variant="outline" onClick={() => onExport("xls")}>
          <Download className="h-4 w-4" /> Exportar como Excel
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
