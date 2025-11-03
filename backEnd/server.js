import express from "express";

// Colocar todas as funções do express na variável app
const app = express();

// Colocar o app para rodar, ou seja, receber pedidos ou enviar respostas
app.listen(3000, () => {
  console.log("Meu servidor está rodando na porta http://localhost:3000");
});
