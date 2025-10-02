import React, { useState } from "react";
import Header from "../../components/Header";
import ModalMudas from "./ModalMudas";
import "./mudas.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Mudas = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  return (
    <>
      <Header titulo="Produção de Mudas" />
      <main className="main__mudas">
        <section className="cadastro__mudas">
          {!abrirModal && (
            <button
              type="button"
              className="botao__abrir-modal"
              onClick={() => setAbrirModal(true)}
              title="Cadastrar produção"
            >
              <FontAwesomeIcon className="icon__add" icon={faPlus} />
            </button>
          )}

          {abrirModal && <ModalMudas onClose={() => setAbrirModal(false)} />}
        </section>

        {/* <section className="cadastro__mudas">
          <h2>PRODUÇÃO</h2>
        </section> */}
      </main>
    </>
  );
};

export default Mudas;
