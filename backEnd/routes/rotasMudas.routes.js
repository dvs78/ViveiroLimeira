// backEnd/routes/rotasMudas.routes.js
import { Router } from "express";
import DbClassMudas from "./DbClassMudas.routes.js";

const rotas = Router();
const db = new DbClassMudas();

/**
 * GET /mudas
 * Lista todas as mudas
 */
rotas.get("/", async (_req, res) => {
  try {
    const result = await db.getAll();
    res.status(200).json(result);
  } catch (err) {
    console.error("Erro ao buscar mudas:", err);
    res.status(500).json({ error: "Erro ao buscar mudas" });
  }
});

/**
 * GET /mudas/:id
 * Busca uma muda por id
 */
rotas.get("/:id", async (req, res) => {
  try {
    const muda = await db.getById(req.params.id);
    if (!muda) return res.status(404).json({ error: "Muda não encontrada" });
    res.status(200).json(muda);
  } catch (err) {
    console.error("Erro ao buscar muda:", err);
    res.status(500).json({ error: "Erro ao buscar muda" });
  }
});

/**
 * POST /mudas
 * Cria uma nova muda
 * body: { ano, semente, embalagem, cultivar, producao }
 */
rotas.post("/", async (req, res) => {
  try {
    const { ano, semente, embalagem, cultivar, producao } = req.body;

    // validação simples
    if (
      ano === undefined ||
      !semente ||
      !embalagem ||
      !cultivar ||
      producao === undefined
    ) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    const nova = await db.create({
      ano,
      semente,
      embalagem,
      cultivar,
      producao,
    });
    res.status(201).json(nova);
  } catch (err) {
    console.error("Erro ao inserir muda:", err);
    res.status(500).json({ error: "Erro ao inserir muda" });
  }
});

/**
 * PUT /mudas/:id
 * Atualiza totalmente/partes de uma muda
 * body: qualquer subset de { ano, semente, embalagem, cultivar, producao }
 */
rotas.put("/:id", async (req, res) => {
  try {
    const atualizada = await db.updateById(req.params.id, req.body);
    if (!atualizada)
      return res.status(404).json({ error: "Muda não encontrada" });
    res.status(200).json(atualizada);
  } catch (err) {
    console.error("Erro ao atualizar muda:", err);
    res.status(500).json({ error: "Erro ao atualizar muda" });
  }
});

/**
 * DELETE /mudas/:id
 * Remove uma muda
 */
rotas.delete("/:id", async (req, res) => {
  try {
    const apagada = await db.deleteById(req.params.id);
    if (!apagada) return res.status(404).json({ error: "Muda não encontrada" });
    res.status(200).json(apagada);
  } catch (err) {
    console.error("Erro ao excluir muda:", err);
    res.status(500).json({ error: "Erro ao excluir muda" });
  }
});

export default rotas;
