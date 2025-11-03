import { Router } from "express";
import DbClassMudas from "./DbClassMudas.routes.js";

const rotas = Router();

rotas.get("/", async (_req, res) => {
  try {
    const result = await new DbClassMudas().getAll();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar mudas" });
  }
});

export default rotas;
