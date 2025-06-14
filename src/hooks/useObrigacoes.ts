
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Obrigacao = {
  id: number;
  cliente_id: number | null;
  tipo: string;
  vencimento: string;   // Supabase retorna como ISO string ('YYYY-MM-DD')
  status: string;
  valor: number | null;
  created_at: string | null;
};

type UseObrigacoesHookReturn = {
  obrigacoes: Obrigacao[];
  isLoading: boolean;
  erro: string | null;
  recarregar: () => void;
};

export function useObrigacoes(): UseObrigacoesHookReturn {
  const [obrigacoes, setObrigacoes] = useState<Obrigacao[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscarObrigacoes = async () => {
    setIsLoading(true);
    setErro(null);
    const { data, error } = await supabase
      .from("obrigacoes")
      .select("*")
      .order("vencimento", { ascending: true });
    if (error) {
      setErro(error.message);
    } else {
      setObrigacoes(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    buscarObrigacoes();
  }, []);

  const recarregar = () => {
    buscarObrigacoes();
  };

  return { obrigacoes, isLoading, erro, recarregar };
}
