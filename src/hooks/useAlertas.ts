
import { useState } from "react";

// Altere esse array quando for integrar com backend real
const ALERTAS_MOCK = [
  {
    id: 1,
    title: "Vencimento próximo",
    description: "DAS para Tech Solutions Ltda vence em 3 dias.",
    type: "alerta" as "alerta",
  },
  {
    id: 2,
    title: "Nova obrigação criada",
    description: "Foi criada uma nova obrigação para DevCorp.",
    type: "info" as "info",
  },
  {
    id: 3,
    title: "Receita recebida",
    description: "Receita da CodeMaster foi marcada como paga.",
    type: "success" as "success",
  },
];

export type AlertaCRM = {
  id: number;
  title: string;
  description: string;
  type: "alerta" | "success" | "info";
};

export function useAlertas() {
  // Substitua por lógica de fetch (Supabase, API, etc) quando necessário
  const [alertas] = useState<AlertaCRM[]>(ALERTAS_MOCK);
  return alertas;
}
