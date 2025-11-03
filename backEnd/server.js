import express from "express";
import cors from "cors";
import rotasMudas from "./routes/rotasMudas.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/mudas", rotasMudas);

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
