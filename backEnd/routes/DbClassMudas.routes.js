import DbClass from "./DbClass.routes.js";

class DbClassMudas extends DbClass {
  async getAll() {
    return super.getAll("mudas", [
      "id",
      "ano",
      "semente",
      "embalagem",
      "cultivar",
      "producao",
    ]);
  }
}

export default DbClassMudas;
