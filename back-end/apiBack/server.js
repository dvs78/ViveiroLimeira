// API significa Application Programing interface
// POST, GET, PUT, DELETE
// CRUD - CREATE, READ, UPDATE e DELETE
// Endpoint
// Middleware, para resolver o problema do front e back que estão em portas diferentes, import cors from "cors";

import express from "express";
import cors from "cors";
import rotasClientes from "../crud/rotas/rotasClientes.js";
import path, { dirname } from "path";

const __dirname = path.resolve();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// app.get("/", async (request, response) => {
//   response.send("Por enquanto só estou com construindo endpoint '/clientes'");
// });

// app.get("/clientes", async (request, response) => {
//   response.send("Quero entregar meu json no endpoint '/clientes'");
// });

// app.get("/clientes", async (request, response) => {
//   response.send(clientesArray);
// });

// const clientes = (await pool.query("SELECT * FROM clientes")).rows;

// app.get("/clientes", async (request, response) => {
//   response.send(clientes);
// });
app.use("/api/clientes", rotasClientes);

app.use(express.static(path.join(__dirname, "../../front-end/dist")));

app.get("*any", (req, res) => {
  res.sendFile(path.join(__dirname, "../../front-end/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
