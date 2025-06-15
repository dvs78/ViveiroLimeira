import pool from "../../apiBack/connect.js";

class DbClass {
  // PEGAR TUDO
  async getAll(tableName, columnsArray) {
    try {
      const query = `SELECT ${columnsArray.join(", ")} FROM ${tableName}`;
      console.log("🧾 Executando query:", query);
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Erro em getAll() de DbClass:", error);
      throw error;
    }
  }

  // INSERIR
  async insertOne(tabela, columnsArray, valuesArray) {
    const cliente = await pool.connect();
    try {
      let flagsArray = Array.from(new Array(columnsArray.length).keys()).map(
        (el) => `$${el + 1}`
      );

      const queryText = `INSERT INTO ${tabela} (${columnsArray.join()}) VALUES(${flagsArray.join()}) RETURNING *`;

      await cliente.query("BEGIN");
      const result = await cliente.query(queryText, valuesArray);
      await cliente.query("COMMIT");

      return result.rows[0];
    } catch (error) {
      await cliente.query("ROLLBACK");
      throw error;
    } finally {
      cliente.release();
    }
  }

  // EDITAR
  async updateById(tabela, columnsArray, id, valuesArray) {
    const cliente = await pool.connect();
    try {
      const setClause = columnsArray
        .map((col, idx) => `${col} = $${idx + 1}`)
        .join(", ");

      const queryText = `UPDATE ${tabela} SET ${setClause} WHERE id = $${
        columnsArray.length + 1
      }`;

      await cliente.query("BEGIN");
      await cliente.query(queryText, [...valuesArray, id]);
      await cliente.query("COMMIT");
    } catch (error) {
      await cliente.query("ROLLBACK");
      throw error;
    } finally {
      cliente.release();
    }
  }

  // DELETAR POR ID
  async deleteById(tabela, id) {
    try {
      const queryText = `DELETE FROM ${tabela} WHERE id = $1`;
      await pool.query(queryText, [id]);
    } catch (error) {
      throw error;
    }
  }
}

export default DbClass;
