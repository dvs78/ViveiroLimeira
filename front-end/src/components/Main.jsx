import React from "react";
import ItemList from "./ItemList";
import { comprasArray } from "../assets/database/compras";

const Main = () => {
  return (
    <div className="main">
      {/* CARDS PRODUCTS, mudas produzidas, pedidos... */}
      {/* Aula 2, faltando 14 minutos tem o idpath */}
      <ItemList
        title="Mudas"
        items={5}
        itemsArray={comprasArray}
        pathClientes="/clientes"
        pathMudas="/mudas"
      />
    </div>
  );
};

export default Main;
