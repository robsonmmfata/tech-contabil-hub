
import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  acceptedTypes?: string[];
  multiple?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  acceptedTypes = ['.pdf', '.xlsx', '.xls', '.csv'], 
  multiple = true 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      return acceptedTypes.includes(extension);
    });

    if (validFiles.length !== fileArray.length) {
      toast({
        title: "Arquivos inválidos",
        description: `Apenas arquivos ${acceptedTypes.join(', ')} são aceitos.`,
        variant: "destructive",
      });
    }

    if (validFiles.length > 0) {
      onFileUpload(validFiles);
      toast({
        title: "Upload realizado",
        description: `${validFiles.length} arquivo(s) enviado(s) com sucesso!`,
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
          dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleFileSelect}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Arraste e solte seus arquivos aqui
        </h3>
        <p className="text-gray-500 mb-4">ou clique para selecionar arquivos</p>
        <Button variant="outline">Selecionar Arquivos</Button>
        <p className="text-xs text-gray-400 mt-4">
          Suporte para {acceptedTypes.join(', ').toUpperCase()} (máx. 10MB por arquivo)
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={acceptedTypes.join(',')}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
    </div>
  );
};
