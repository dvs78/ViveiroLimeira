import pool from "../../apiBack/connect.js";

class DbClass {
  // PEGAR TUDO
  async getAll(tabela, colunas) {
    try {
      const results = (
        await pool.query(`SELECT ${colunas.join()} FROM ${tabela}`)
      ).rows;
      return results;
    } catch (error) {
      throw error;
    }
  }

  // INSERIR
  async insertOne(tabela, columnsArray, valuesArray) {
    const cliente = await pool.connect(); // Criar uma conexão com o banco de dados
    try {
      let flagsArray = Array.from(new Array(columnsArray.length).keys()).map(
        (el) => `$${el + 1}`
      );

      // const queryText = `INSERT INTO ${tabela} (${columnsArray.join()}) VALUES(${flagsArray.join()}) RETURNING *`;
      // const result = await cliente.query(queryText, valuesArray);
      // await cliente.query("COMMIT"); // Comitar, validar
      // return result.rows[0]; // ✅ retorna o cliente inserido, incluindo o id

      // const queryText = `INSERT INTO ${tabela} (${columnsArray.join()}) VALUES(${flagsArray.join()})`;
      // await cliente.query("BEGIN TRANSACTION"); // Rodar a transaction
      // await cliente.query(queryText, valuesArray); // Inserir
      // await cliente.query("COMMIT"); // Comitar, validar
      const queryText = `INSERT INTO ${tabela} (${columnsArray.join()}) VALUES(${flagsArray.join()}) RETURNING *`;

      await cliente.query("BEGIN");
      const result = await cliente.query(queryText, valuesArray);
      await cliente.query("COMMIT");

      return result.rows[0]; // ✅ retorna o cliente com ID
    } catch (error) {
      await cliente.query("ROLLBACK"); // Se der algum problema, desfazer
      throw error;
    } finally {
      cliente.release(); // largar a conexão com banco de dados
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
