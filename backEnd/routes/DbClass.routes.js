import pool from "./connect.routes.js";

class DbClass {
  // PEGAR TUDO
  async getAll(tabela, colunas) {
    const cols = colunas.join(", ");
    // Obs.: nome de tabela/coluna não dá pra parametrizar com $1...
    // aqui confie apenas em nomes que você controla.
    const sql = `SELECT ${cols} FROM ${tabela}`;
    const { rows } = await pool.query(sql);
    return rows;
  }
}

export default DbClass;
