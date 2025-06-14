
-- Criação da tabela de alertas do CRM
CREATE TABLE public.alertas_crm (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('alerta', 'success', 'info')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilita Row Level Security
ALTER TABLE public.alertas_crm ENABLE ROW LEVEL SECURITY;

-- Política: Permite SELECT para todos os usuários autenticados
CREATE POLICY "Usuários autenticados podem ver alertas" 
  ON public.alertas_crm
  FOR SELECT
  TO authenticated
  USING (true);

-- Política: Permite INSERT para todos os usuários autenticados
CREATE POLICY "Usuários autenticados podem criar alertas" 
  ON public.alertas_crm
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
