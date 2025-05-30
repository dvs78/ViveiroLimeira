import "dotenv/config";
import express from "express";
import cors from "cors";
import rotasClientes from "./rotas/rotasClientes.js";
import rotasCarrinho from "./rotas/rotasCarrinho.js";
import rotasMudas from "./rotas/rotasMudas.js";
import rotasPedidos from "./rotas/rotasPedidos.js";
import rotasEntregas from "./rotas/rotasEntregas.js";

// CRIAR A API - Conectar o Express ao Banco de dados
const porta = 3000;
const app = express();

app.use(cors());
app.use(express.json());

// CONECTANDO O EXPRESS AO BANCO DE DADOS
app.use("/clientes", rotasClientes);
app.use("/carrinho", rotasCarrinho);
app.use("/mudas", rotasMudas);
app.use("/pedidos", rotasPedidos);
app.use("/entregas", rotasEntregas);

app.listen(porta, () => {
  console.log(`API está online, na porta ${porta}!!!`);
});
