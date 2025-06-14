
-- Tabela de Clientes
CREATE TABLE public.clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('empresa', 'autonomo')),
  documento VARCHAR(32) NOT NULL,             -- CNPJ ou CPF
  regime VARCHAR(32),                         -- exemplo: Simples, Lucro Real
  contato VARCHAR(128),
  telefone VARCHAR(32),
  email VARCHAR(128),
  cnaes TEXT[],                               -- lista de CNAEs
  status VARCHAR(20) NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários autenticados podem ver clientes"
  ON public.clientes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem inserir clientes"
  ON public.clientes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar clientes"
  ON public.clientes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Tabela de Serviços
CREATE TABLE public.servicos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES public.clientes(id) ON DELETE CASCADE,
  type VARCHAR(64) NOT NULL,
  description TEXT,
  competence VARCHAR(32),
  due_date DATE,
  value NUMERIC(12,2),
  status VARCHAR(20) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'concluido', 'cancelado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.servicos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários autenticados podem ver serviços"
  ON public.servicos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem inserir serviços"
  ON public.servicos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar serviços"
  ON public.servicos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Tabela de Obrigações
CREATE TABLE public.obrigacoes (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES public.clientes(id) ON DELETE CASCADE,
  tipo VARCHAR(64) NOT NULL,
  vencimento DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'concluida', 'atrasada')),
  valor NUMERIC(12,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.obrigacoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários autenticados podem ver obrigacoes"
  ON public.obrigacoes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem inserir obrigacoes"
  ON public.obrigacoes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar obrigacoes"
  ON public.obrigacoes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Tabela de Documentos
CREATE TABLE public.documentos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES public.clientes(id) ON DELETE CASCADE,
  servico_id INTEGER REFERENCES public.servicos(id) ON DELETE SET NULL,
  nome VARCHAR(255) NOT NULL,
  tipo VARCHAR(32),
  categoria VARCHAR(32),
  tamanho VARCHAR(32),
  data_upload TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'processado' CHECK (status IN ('processado', 'pendente', 'erro')),
  caminho_arquivo TEXT,  -- opcional: caminho no bucket do Supabase Storage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários autenticados podem ver documentos"
  ON public.documentos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem inserir documentos"
  ON public.documentos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar documentos"
  ON public.documentos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Tabela de Transações Financeiras
CREATE TABLE public.transacoes_financeiras (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES public.clientes(id) ON DELETE CASCADE,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('receita', 'despesa')),
  descricao TEXT,
  categoria VARCHAR(64),
  valor NUMERIC(12,2) NOT NULL,
  data DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'atrasado', 'cancelado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.transacoes_financeiras ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários autenticados podem ver transacoes"
  ON public.transacoes_financeiras
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem inserir transacoes"
  ON public.transacoes_financeiras
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar transacoes"
  ON public.transacoes_financeiras
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

