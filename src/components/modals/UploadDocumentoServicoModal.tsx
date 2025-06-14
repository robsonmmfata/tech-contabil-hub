
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UploadDocumentoServicoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  servico: any | null;
  onUpload: (file: File) => void;
}

export const UploadDocumentoServicoModal: React.FC<UploadDocumentoServicoModalProps> = ({
  open, onOpenChange, servico, onUpload
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  if (!servico) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[390px]">
        <DialogHeader>
          <DialogTitle>Upload de Documento</DialogTitle>
          <DialogDescription>
            Envie um arquivo relacionado ao serviço: <span className="font-semibold">{servico.description}</span>
          </DialogDescription>
        </DialogHeader>
        <input 
          type="file" 
          ref={fileInput}
          className="mt-2"
          onChange={(e) => {
            if (e.target.files && e.target.files.length) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <DialogFooter className="mt-4">
          <Button variant="outline" type="button" onClick={() => { setFile(null); onOpenChange(false); }}>
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={!file}
            onClick={() => {
              if (file) {
                onUpload(file);
                setFile(null);
                onOpenChange(false);
              }
            }}
          >
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
