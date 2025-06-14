
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Cliente = {
  id: number;
  nome: string;
  tipo: "empresa" | "autonomo";
  documento: string;
  regime: string | null;
  contato: string | null;
  telefone: string | null;
  email: string | null;
  cnaes: string[] | null;
  status: string;
  created_at: string | null;
};

type UseClientesHookReturn = {
  clientes: Cliente[];
  isLoading: boolean;
  erro: string | null;
  recarregar: () => void;
};

export function useClientes(): UseClientesHookReturn {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscarClientes = async () => {
    setIsLoading(true);
    setErro(null);
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setErro(error.message);
    } else {
      setClientes(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  const recarregar = () => {
    buscarClientes();
  };

  return { clientes, isLoading, erro, recarregar };
}
