-- extensão p/ gerar UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tabela LOGIN
CREATE TABLE IF NOT EXISTS public.login (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome  TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

-- -- Tabela TAREFA
-- CREATE TABLE IF NOT EXISTS public.tarefa (
--   id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   usuario_id UUID NOT NULL REFERENCES public.login(id) ON DELETE CASCADE,
--   tarefa     TEXT NOT NULL
-- );

-- Inserir usuários
INSERT INTO public.login (senha, nome) VALUES
  ('0000', 'Daniel'),
  ('0001', 'Tais');

-- Inserir tarefas pegando o ID real de cada usuário pelo nome
INSERT INTO public.tarefa (usuario_id, tarefa)
SELECT l.id, x.tarefa
FROM (VALUES
  ('Daniel', 'Regar todas as plantas da estufa A'),
  ('Daniel', 'Correr'),
  ('Tais',   'Verificar nível de adubo nos viveiros')
) AS x(nome, tarefa)
JOIN public.login l ON l.nome = x.nome;

-- Conferir
SELECT * FROM public.login;
SELECT * FROM public.tarefa;
