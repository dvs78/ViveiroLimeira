// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import rotasClientes from "./rotas/rotasClientes.js";
// import rotasCarrinho from "./rotas/rotasCarrinho.js";
// import rotasMudas from "./rotas/rotasMudas.js";
// import rotasPedidos from "./rotas/rotasPedidos.js";
// import rotasEntregas from "./rotas/rotasEntregas.js";

// // CRIAR A API - Conectar o Express ao Banco de dados
// const porta = 3000;
// const app = express();

// app.use(cors());
// app.use(express.json());

// // CONECTANDO O EXPRESS AO BANCO DE DADOS
// app.use("/clientes", rotasClientes);
// app.use("/carrinho", rotasCarrinho);
// app.use("/mudas", rotasMudas);
// app.use("/pedidos", rotasPedidos);
// app.use("/entregas", rotasEntregas);

// app.listen(porta, () => {
//   console.log(`API está online, na porta ${porta}!!!`);
// });

import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // necessário para usar __dirname em ESModules

// ROTAS
import rotasClientes from "./rotas/rotasClientes.js";
import rotasCarrinho from "./rotas/rotasCarrinho.js";
import rotasMudas from "./rotas/rotasMudas.js";
import rotasPedidos from "./rotas/rotasPedidos.js";
import rotasEntregas from "./rotas/rotasEntregas.js";

// CONFIG EXPRESS
const app = express();
const porta = process.env.PORT || 3000;

// CORS e JSON
app.use(cors());
app.use(express.json());

// ✅ CONFIGURAR __dirname em ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ SERVIR HTML, CSS, JS da pasta "public"
app.use(express.static(path.join(__dirname, "../public")));

// ✅ ROTA Fallback para frontend (caso acessem / direto)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// ROTAS DA API
app.use("/clientes", rotasClientes);
app.use("/carrinho", rotasCarrinho);
app.use("/mudas", rotasMudas);
app.use("/pedidos", rotasPedidos);
app.use("/entregas", rotasEntregas);

// INICIAR SERVIDOR
app.listen(porta, () => {
  console.log(`API está online, na porta ${porta}!!!`);
});
