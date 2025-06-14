
-- Permite INSERT na tabela clientes para todos (mesmo anônimos) TEMPORARIAMENTE para testes
CREATE POLICY "Permitir insert clientes para todos" 
  ON public.clientes
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Permite SELECT na tabela clientes para todos
CREATE POLICY "Permitir select clientes para todos"
  ON public.clientes
  FOR SELECT
  TO public
  USING (true);
