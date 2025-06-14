
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Servico = {
  id: number;
  cliente_id: number | null;
  type: string;
  description: string | null;
  competence: string | null;
  due_date: string | null;
  value: number | null;
  status: string;
  created_at: string | null;
};

type UseServicosHookReturn = {
  servicos: Servico[];
  isLoading: boolean;
  erro: string | null;
  recarregar: () => void;
};

export function useServicos(): UseServicosHookReturn {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscarServicos = async () => {
    setIsLoading(true);
    setErro(null);
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setErro(error.message);
    } else {
      setServicos(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    buscarServicos();
  }, []);

  const recarregar = () => {
    buscarServicos();
  };

  return { servicos, isLoading, erro, recarregar };
}
