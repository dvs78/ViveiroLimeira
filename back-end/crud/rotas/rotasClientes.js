import { Router } from "express";
import DbClassClientes from "../dbOnLine/DbClassClientes.js";

const rotas = Router();

// ROTA PARA PEGAR TODOS OS CLIENTES
rotas.get("/", async (req, res) => {
  try {
    const result = await new DbClassClientes().getAll();
    res.status(200).send(result);
  } catch (erro) {
    console.error("Erro na rota GET /clientes:", erro.message);
    res.status(500).send({ erro: "Erro ao buscar clientes" });
  }
});

// ROTA PARA INSERIR 1 CLIENTE
rotas.post("/", async (req, res) => {
  const { body } = req;

  const columnsArray = ["nome", "sobrenome", "nomecompleto"];

  try {
    // Validação básica: verifica campos obrigatórios
    for (const campo of columnsArray) {
      if (!body[campo]) {
        return res
          .status(400)
          .json({ mensagem: `Campo obrigatório ausente: ${campo}` });
      }
    }

    const valuesArray = columnsArray.map((coluna) => body[coluna]);

    const clienteCadastrado = await new DbClassClientes().insertOne(
      valuesArray
    );
    res.status(201).json(clienteCadastrado); // ✅ retorna objeto completo com ID
  } catch (erro) {
    console.error("Erro ao cadastrar cliente:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar cliente" });
  }
});

// ROTA PARA ATUALIZAR UM CLIENTE
rotas.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const columnsArray = ["nome", "sobrenome", "nomecompleto"];

  const valuesArray = columnsArray.map((col) => body[col]);

  await new DbClassClientes().updateById(id, valuesArray);
  res.status(200).send({ message: "Cliente atualizado com sucesso" });
});

// ROTA PARA DELETAR UM CLIENTE
rotas.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await new DbClassClientes().deleteById(id);
  res.status(200).send({ message: "Cliente excluído com sucesso" });
});

export default rotas;
