


-- CRIAÇÃO DA TABELA CLIENTES
CREATE TABLE IF NOT EXISTS public.clientes(
  id SERIAL PRIMARY KEY,  -- id UUID DEFAULT gen_random_uuid() PRIMARY KEY, 
  nome TEXT NOT NULL,
  sobrenome TEXT NOT NULL,
  nomecompleto TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT NOT NULL,
  cpf TEXT NOT NULL,
  inscricaoestadual TEXT NOT NULL, -- inscricaoEstadual TEXT UNIQUE NOT NULL,
  rua TEXT NOT NULL,
  bairro TEXT NOT NULL,
  cep TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL
);

-- CRIAÇÃO DA TABELA MUDAS
CREATE TABLE IF NOT EXISTS public.mudas(
  id SERIAL PRIMARY KEY,
  ano VARCHAR(100) NOT NULL,
  semente VARCHAR(255) NOT NULL,
  embalagem VARCHAR(100) NOT NULL,
  cultivar VARCHAR(100) NOT NULL,
  producao VARCHAR(100) NOT NULL
);

-- CRIAÇÃO DA TABELA CARRINHO
CREATE TABLE IF NOT EXISTS public.carrinho(
  id SERIAL PRIMARY KEY,
  idMuda INTEGER NOT NULL,
  ano VARCHAR (100) NOT NULL,
  cultivar VARCHAR (100) NOT NULL,
  semente VARCHAR (100) NOT NULL,
  embalagem VARCHAR (100) NOT NULL,
  precoMuda VARCHAR (100) NOT NULL,
  desconto VARCHAR (100) NOT NULL,
  precoMudaDesconto VARCHAR (100) NOT NULL,
  pedido VARCHAR (100) NOT NULL,
  precoMudaTotal VARCHAR (100) NOT NULL
);



-- DATE NOT NULL
-- CRIAÇÃO DA TABELA PEDIDO
CREATE TABLE IF NOT EXISTS public.pedidos(
  id SERIAL PRIMARY KEY,
  idCliente INTEGER NOT NULL,
  idMuda INTEGER NOT NULL,
  data VARCHAR (100) NOT NULL,
  precoMuda VARCHAR (100) NOT NULL,
  desconto VARCHAR (100) NOT NULL,
  precoMudaDesconto VARCHAR (100) NOT NULL,
  pedido VARCHAR (100) NOT NULL,
  precoMudaTotal VARCHAR (100) NOT NULL
);

-- CRIAÇÃO DA TABELA ENTREGAS
CREATE TABLE IF NOT EXISTS public.entregas(
  id SERIAL PRIMARY KEY,
  idCliente INTEGER NOT NULL,
  idMuda INTEGER NOT NULL,
  idPedido INTEGER NOT NULL,
  data VARCHAR (100) NOT NULL,
  veiculo VARCHAR (100) NOT NULL,
  motorista VARCHAR (100) NOT NULL,
  entrega VARCHAR (100) NOT NULL,
  qtdepessoas VARCHAR (100) NOT NULL
);

-- INSERIR 2 CLIENTES
INSERT INTO clientes (nome, sobrenome, telefone, email, cpf, inscricaoEstadual, rua, bairro, cep, cidade, estado) VALUES
('João', 'Silva', '11987654321', 'joao.silva@email.com', '12345678901', '001002003', 'sobe e desce, n°', 'centro', '37250000', 'nepomuceno', 'mg'),
('Maria', 'Oliveira', '21987654321', 'maria.oliveira@email.com', '98765432100', '004005006', 'da direita, n°', 'afastado', '37250000', 'nepomuceno', 'mg');

-- INSERIR OS PRODUTOS
INSERT INTO produtos (idProduto, nome, embalagem, producao, pedido, estoque) VALUES
('2025-1', 'Catucaí 24-137', 'Saquinho', '2000', '1000', '0'),
('2025-2', 'Catucaí 24-137', 'Tubete', '3000', '1000', '0'),
('2025-3', 'Catucaí 24-137', 'Paper Pot', '4000', '1000', '0');


-- INSERIR NOVAS COLUNAS
ALTER TABLE clientes
ADD incricaoEstadual CHAR(9) UNIQUE NOT NULL,
ADD rua TEXT NOT NULL,
ADD bairro TEXT NOT NULL,
ADD cep CHAR(10) NOT NULL,
ADD cidade TEXT NOT NULL,
ADD estado TEXT NOT NULL

-- ALTERAR COLUNA
-- Alterar a coluna telefone para 16 caracteres e altera o telefone do João para (011) 98765-4321 e da Maria para (021) 98765-4321
-- Alterar a coluna telefone para 16 caracteres
ALTER TABLE clientes ALTER COLUMN cep TYPE VARCHAR(16);

-- ATUALIZAR DADOS
-- Atualizar os telefones dos clientes
UPDATE clientes  
SET incricaoEstadual = '001002003', rua = 'sobe e desce, n°', bairro = 'centro', cep = '37.250-000', cidade = 'nepomuceno', estado = 'mg'
WHERE nome = 'João' AND sobrenome = 'Silva';

UPDATE clientes 
SET incricaoEstadual = '004005006', rua = 'da direita, n°', bairro = 'afastado', cep = '37.250-000', cidade = 'nepomuceno', estado = 'mg'
WHERE nome = 'Maria' AND sobrenome = 'Oliveira';

-- DELETE
-- Se quiser deletar clientes com base nos nomes:
DELETE FROM clientes WHERE nome = 'daniel'
DELETE FROM clientes WHERE nome = 'tais'

