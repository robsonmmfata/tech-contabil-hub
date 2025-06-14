
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AlertaCRM = {
  id: number;
  title: string;
  description: string;
  type: "alerta" | "success" | "info";
  created_at?: string | null;
};

type UseAlertasHookReturn = {
  alertas: AlertaCRM[];
  isLoading: boolean;
  erro: string | null;
  inserirAlerta: (novoAlerta: Omit<AlertaCRM, "id" | "created_at">) => Promise<void>;
  recarregar: () => void;
};

export function useAlertas(): UseAlertasHookReturn {
  const [alertas, setAlertas] = useState<AlertaCRM[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscarAlertas = async () => {
    setIsLoading(true);
    setErro(null);
    const { data, error } = await supabase
      .from("alertas_crm")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setErro(error.message);
    } else {
      setAlertas(
        (data ?? []).map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description || "",
          type: item.type as "alerta" | "success" | "info",
          created_at: item.created_at,
        }))
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    buscarAlertas();
  }, []);

  const inserirAlerta = async (novoAlerta: Omit<AlertaCRM, "id" | "created_at">) => {
    const { error } = await supabase.from("alertas_crm").insert([novoAlerta]);
    if (error) {
      setErro(error.message);
    } else {
      await buscarAlertas();
    }
  };

  const recarregar = () => {
    buscarAlertas();
  };

  return { alertas, isLoading, erro, inserirAlerta, recarregar };
}
