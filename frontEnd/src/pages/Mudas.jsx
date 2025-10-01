import React from "react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import {
  dbAnos,
  dbCultivares,
  dbRecipiente,
  dbSemente,
} from "../assets/dados/dbSelect";

const Mudas = () => {
  const anoAtual = new Date().getFullYear().toString();
  const [ano, setAno] = useState(anoAtual);

  return (
    <>
      <Header titulo="Produção de Mudas" />
      <main className="main__mudas">
        <section className="cadastro__mudas">
          <h2>CADASTRAR PRODUÇÃO</h2>
          <form action="">
            <div>
              <label htmlFor="ano">Ano:</label>
              <select
                id="ano"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
              >
                {dbAnos.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </section>

        <section className="cadastro__mudas">
          <h2>PRODUÇÃO</h2>
        </section>
      </main>
    </>
  );
};

export default Mudas;
