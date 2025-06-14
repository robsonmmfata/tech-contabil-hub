
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Obrigacao = {
  id: number;
  cliente_id: number | null;
  tipo: string;
  valor: number | null;
  vencimento: string;
  status: string;
  created_at: string | null;
};

export function useObrigacoes() {
  const [obrigacoes, setObrigacoes] = useState<Obrigacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscar = async () => {
    setLoading(true);
    setErro(null);
    const { data, error } = await supabase.from("obrigacoes").select("*").order("vencimento", { ascending: false });
    if (error) setErro(error.message);
    else setObrigacoes(data ?? []);
    setLoading(false);
  };

  useEffect(() => { buscar(); }, []);
  return { obrigacoes, loading, erro, recarregar: buscar };
}
