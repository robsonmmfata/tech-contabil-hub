
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Servico = {
  id: number;
  cliente_id: number | null;
  type: string;
  description: string | null;
  value: number | null;
  due_date: string | null;
  competence: string | null;
  status: string;
  created_at: string | null;
};

export function useServicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscar = async () => {
    setLoading(true);
    setErro(null);
    const { data, error } = await supabase.from("servicos").select("*").order("created_at", { ascending: false });
    if (error) setErro(error.message);
    else setServicos(data ?? []);
    setLoading(false);
  };

  useEffect(() => { buscar(); }, []);
  return { servicos, loading, erro, recarregar: buscar };
}
