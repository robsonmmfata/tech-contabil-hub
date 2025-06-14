
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Documento = {
  id: number;
  nome: string;
  tipo: string | null;
  categoria: string | null;
  cliente_id: number | null;
  tamanho: string | null;
  data_upload: string | null;
  status: string | null;
  servico_id: number | null;
  caminho_arquivo: string | null;
  created_at: string | null;
};

type UseDocumentosHookReturn = {
  documentos: Documento[];
  isLoading: boolean;
  erro: string | null;
  recarregar: () => void;
};

export function useDocumentos(): UseDocumentosHookReturn {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscarDocumentos = async () => {
    setIsLoading(true);
    setErro(null);
    const { data, error } = await supabase
      .from("documentos")
      .select("*")
      .order("data_upload", { ascending: false });
    if (error) {
      setErro(error.message);
    } else {
      setDocumentos(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    buscarDocumentos();
  }, []);

  const recarregar = () => {
    buscarDocumentos();
  };

  return { documentos, isLoading, erro, recarregar };
}
