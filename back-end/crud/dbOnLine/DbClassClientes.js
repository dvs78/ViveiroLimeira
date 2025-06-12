import DbClass from "./DbClass.js";

class DbClassClientes extends DbClass {
  // BUSCAR TUDO
  async getAll() {
    try {
      const results = await super.getAll("clientes", [
        "id",
        "nome",
        "sobrenome",
        "nomecompleto",
      ]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // INSERIR ITEM
  async insertOne(valuesArray) {
    try {
      return await super.insertOne(
        "clientes",
        ["nome", "sobrenome", "nomecompleto"],
        valuesArray
      ); // ✅ retorna para o controller
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, valuesArray) {
    try {
      await super.updateById(
        "clientes",
        ["nome", "sobrenome", "nomecompleto"],
        id,
        valuesArray
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      await super.deleteById("clientes", id);
    } catch (error) {
      throw error;
    }
  }
}

export default DbClassClientes;
