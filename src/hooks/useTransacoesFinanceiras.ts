
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type TransacaoFinanceira = {
  id: number;
  cliente_id: number | null;
  descricao: string | null;
  valor: number;
  data: string;
  categoria: string | null;
  tipo: "receita" | "despesa";
  status: string;
  created_at: string | null;
};

type UseTransacoesFinanceirasReturn = {
  transacoes: TransacaoFinanceira[];
  isLoading: boolean;
  erro: string | null;
  recarregar: () => void;
  atualizarStatus: (id: number, status: string) => Promise<void>;
};

export function useTransacoesFinanceiras(): UseTransacoesFinanceirasReturn {
  const [transacoes, setTransacoes] = useState<TransacaoFinanceira[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscarTransacoes = async () => {
    setIsLoading(true);
    setErro(null);
    const { data, error } = await supabase
      .from("transacoes_financeiras")
      .select("*")
      .order("data", { ascending: false });
    if (error) {
      setErro(error.message);
    } else {
      // Corrige o erro de tipagem: força para "receita" | "despesa"
      setTransacoes(
        (data ?? []).map((item: any) => ({
          ...item,
          tipo: item.tipo === "receita" ? "receita" : "despesa",
        }))
      );
    }
    setIsLoading(false);
  };

  const atualizarStatus = async (id: number, status: string) => {
    await supabase
      .from("transacoes_financeiras")
      .update({ status })
      .eq("id", id);
    buscarTransacoes();
  };

  useEffect(() => {
    buscarTransacoes();
  }, []);

  const recarregar = () => buscarTransacoes();

  return { transacoes, isLoading, erro, recarregar, atualizarStatus };
}
